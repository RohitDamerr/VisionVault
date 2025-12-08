import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { getLink } from "./lib/getLink";

export const config = {
  matcher: ["/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)"],
};

export default clerkMiddleware(async (auth, req) => {
  const url = req.nextUrl;

  // Get hostname of request (e.g. demo.framely.site, demo.localhost:3000)
  const hostname = req.headers.get("host")!;

  // Get the pathname of the request (e.g. /, /about, /blog/first-post)
  const path = url.pathname;

  // Handle editor subdomain
  if (
    hostname === getLink({ subdomain: "editor", method: false }).slice(0, -1)
  ) {
    await auth.protect();
    return NextResponse.rewrite(
      new URL(`/editor${path === "/" ? "" : path}`, req.url),
    );
  }

  // Only allow app.framely.site for dashboard page, sounds better, more concise
  if (hostname === getLink({ subdomain: "app", method: false }).slice(0, -1)) {
    await auth.protect();
    return NextResponse.rewrite(
      new URL(`/dashboard${path === "/" ? "" : path}`, req.url),
    );
  }

  if (
    hostname === getLink({ subdomain: "dashboard", method: false }).slice(0, -1)
  ) {
    return NextResponse.redirect(getLink({ subdomain: "app" }));
  }

  if (hostname === getLink({ method: false }).slice(0, -1)) {
    // TODO: Redirect to /landing once the page is built
    return NextResponse.rewrite(new URL(`/dashboard${path}`, req.url));
  }

  // Handle custom subdomains
  const subdomain = hostname.split(".")[0];
  return NextResponse.rewrite(new URL(`/${subdomain}${path}`, req.url));
});
