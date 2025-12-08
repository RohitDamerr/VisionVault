import { SidebarTrigger } from "@/components/ui/sidebar";
import NewSiteModal from "./new-site-modal";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import PageItem from "./site-item";

async function SiteList() {
  const { userId } = await auth();
  const sites = await db.page.findMany({
    where: { userId: userId || "" },
    orderBy: { updatedAt: "desc" },
  });

  return (
    <div className="w-full p-6">
      <SidebarTrigger className="w-12 h-12 mb-4" />
      <div className="container flex flex-col items-center mx-auto">
        <div className="flex flex-col w-full max-w-4xl space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Sites</h1>
            <NewSiteModal />
          </div>

          <div className="grid grid-cols-1 gap-4">
            {sites.length >= 1 ? (
              sites.map((site) => <PageItem key={site.id} site={site} />)
            ) : (
              <p className="mt-4 text-center text-muted-foreground">
                It&apos;s pretty empty in here, create a site to get started.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SiteList;
