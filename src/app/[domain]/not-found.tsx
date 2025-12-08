import { Button } from "@/components/ui/button";
import { getLink } from "@/lib/getLink";
import Image from "next/image";
import Link from "next/link";

export default async function NotFound() {
  return (
    // TODO: Custom 404 Not found pages

    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <h1 className="text-4xl font-cal">404</h1>
      <Image
        alt="missing site"
        src="https://illustrations.popsy.co/gray/timed-out-error.svg"
        width={400}
        height={400}
      />
      <div className="flex flex-col items-center gap-y-4">
        <p className="text-lg">
          Oops! You found a site that does not exist (yet)!
        </p>
        <Button asChild>
          <Link href={getLink({})}>Dashboard</Link>
        </Button>
      </div>
    </div>
  );
}
