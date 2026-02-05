export function getLink({
  subdomain,
  pathName = "",
  method = true,
}: {
  subdomain?: string;
  pathName?: string;
  method?: boolean;
}): string {
  // Prefer explicitly configured root domain, but gracefully fall back to
  // the Vercel-provided URL so links still work in deployments where
  // NEXT_PUBLIC_ROOT_DOMAIN is not set.
  const rootDomain =
    process.env.NEXT_PUBLIC_ROOT_DOMAIN || process.env.NEXT_PUBLIC_VERCEL_URL;

  if (!rootDomain) {
    // Last-resort fallback for local development.
    return `${method ? "http://" : ""}${
      subdomain ? `${subdomain}.` : ""
    }localhost:3000/${pathName}`;
  }

  const formattedSubdomain = subdomain ? `${subdomain}.` : "";
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const cleanedRoot = rootDomain
    .replace(/^https?:\/\//, "")
    .replace(/\/$/, "");

  return `${method ? protocol + "://" : ""}${formattedSubdomain}${cleanedRoot}/${pathName}`;
}
