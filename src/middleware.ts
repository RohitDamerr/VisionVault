import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const config = {
  matcher: ["/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)"],
};

export default clerkMiddleware(async (auth, req) => {
  const url = req.nextUrl;
  const hostname = req.headers.get("host")!;
  const path = url.pathname;

  // Determine the base domain we should treat as the "root" app host.
  // Prefer NEXT_PUBLIC_ROOT_DOMAIN when set, otherwise fall back to
  // the Vercel-provided URL so previews and production both work.
  const envRootDomain =
    process.env.NEXT_PUBLIC_ROOT_DOMAIN || process.env.NEXT_PUBLIC_VERCEL_URL;

  const rootDomain = envRootDomain
    ? envRootDomain.replace(/^https?:\/\//, "").replace(/\/$/, "")
    : null;

  // If we cannot determine a root domain, just let Next handle routing
  // without any multi-tenant rewrites.
  if (!rootDomain) {
    return NextResponse.next();
  }

  // Editor subdomain: editor.<rootDomain>
  if (hostname === `editor.${rootDomain}`) {
    await auth.protect();
    return NextResponse.rewrite(
      new URL(`/editor${path === "/" ? "" : path}`, req.url),
    );
  }

  // Application dashboard subdomain: app.<rootDomain>
  if (hostname === `app.${rootDomain}`) {
    await auth.protect();
    return NextResponse.rewrite(
      new URL(`/dashboard${path === "/" ? "" : path}`, req.url),
    );
  }

  // Legacy/extra dashboard.<rootDomain> -> redirect to app.<rootDomain>
  if (hostname === `dashboard.${rootDomain}`) {
    return NextResponse.redirect(`https://app.${rootDomain}`);
  }

  // Root domain (no subdomain) should serve the dashboard (for now).
  if (hostname === rootDomain) {
    // TODO: Redirect to /landing once the page is built
    return NextResponse.rewrite(
      new URL(`/dashboard${path === "/" ? "" : path}`, req.url),
    );
  }

  // Handle custom subdomains: <siteSubdomain>.<rootDomain>
  const subdomain = hostname.split(".")[0];
  return NextResponse.rewrite(new URL(`/${subdomain}${path}`, req.url));
});
