"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Page } from "@prisma/client";
import { revalidateTag, unstable_cache } from "next/cache";

type SiteProps = {
  title: string;
  subdomain: string;
};

export async function createSite({ title, subdomain }: SiteProps) {
  const { userId } = await auth();

  if (!userId) return { success: false, msg: "User not signed in" };

  const existingSite = await db.page.findFirst({
    where: { subdomain: subdomain },
  });

  if (existingSite) {
    return { success: false, msg: "Subdomain is already in use" };
  }

  try {
    const site = await db.page.create({
      data: { userId: userId, title: title, subdomain: subdomain },
    });
    return { success: true, site: site };
  } catch (error) {
    return {
      success: false,
      msg: error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}

type UpsertProps = Partial<Page>;

export async function upsertSite({
  id,
  title,
  subdomain,
  previewImage,
  content,
  visible,
}: UpsertProps) {
  const { userId } = await auth();

  if (!userId) return { success: false, msg: "User not signed in" };

  const site = await db.page.update({
    where: { id: id, userId: userId },
    data: {
      id: id,
      title: title,
      subdomain: subdomain,
      previewImage: previewImage,
      content: content,
      visible: visible,
    },
  });

  revalidateTag(site.subdomain);

  return { success: true, site: site };
}

export async function deleteSite(siteId: string) {
  const { userId } = await auth();

  if (!userId) return { success: false, msg: "User not signed in" };

  try {
    const response = await db.page.delete({
      where: {
        id: siteId,
        userId: userId,
      },
    });

    revalidateTag(response.subdomain);

    return { success: true };
  } catch (error) {
    return {
      success: false,
      msg: error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}

export async function getSiteDetails(siteId: string) {
  try {
    const res = await db.page.findUnique({ where: { id: siteId } });
    if (!res) {
      throw new Error("Database Error");
    }
    return { success: true, content: res.content };
  } catch (error) {
    return {
      success: false,
      msg: error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}

export const getSiteByDomain = async (subdomainName: string) => {
  try {
    const response = await unstable_cache(
      async () => {
        const response = await db.page.findUnique({
          where: {
            subdomain: subdomainName,
          },
        });

        return response;
      },
      [subdomainName],
      {
        revalidate: 900, // 15 Minutes
        tags: [subdomainName],
      }
    )();

    if (!response) {
      return { success: false, msg: "Site not found" };
    }

    if (!response.visible) {
      const session = await auth();
      if (!(session.userId === response.userId))
        return {
          success: true,
          msg: "The requested site is private (for now), come back later!",
          private: true,
        };

      return { success: true, site: response };
    }

    return { success: true, site: response };
  } catch (error) {
    return {
      success: false,
      msg: error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
};
