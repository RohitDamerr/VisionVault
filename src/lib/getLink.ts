export function getLink({
  subdomain,
  pathName = "",
  method = true,
}: {
  subdomain?: string;
  pathName?: string;
  method?: boolean;
}): string {
  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN;
  if (!rootDomain) {
    throw new Error("NEXT_PUBLIC_ROOT_DOMAIN is not defined");
  }

  const formattedSubdomain = subdomain ? `${subdomain}.` : "";
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  return `${method ? protocol + "://" : ""}${formattedSubdomain}${rootDomain}/${pathName}`;
}
