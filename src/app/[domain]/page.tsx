import { getSiteByDomain } from "@/lib/actions/page";
import { notFound } from "next/navigation";
import EditorProvider from "../providers/editor-provider";
import SiteEditor from "../components/editor/site-editor";
import { Suspense } from "react";
import Script from "next/script";

function LoadingState() {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="w-8 h-8 border-b-2 border-gray-900 rounded-full animate-spin" />
    </div>
  );
}

async function Page({ params }: { params: Promise<{ domain: string }> }) {
  const { domain } = await params;

  const response = await getSiteByDomain(domain.toString());
  if (!response.success) return notFound();

  if (response.private) {
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        <h1 className="text-xl font-medium">{response.msg}</h1>
      </div>
    );
  }

  if (!response.site) return notFound();

  return (
    <div>
      <Script
        defer
        src={process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL}
        data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
        data-tag={domain}
      />
      <Suspense fallback={<LoadingState />}>
        <EditorProvider siteDetails={response.site} siteId={response.site.id}>
          <SiteEditor siteId={response.site.id} liveMode />
        </EditorProvider>
      </Suspense>
    </div>
  );
}

export default Page;
