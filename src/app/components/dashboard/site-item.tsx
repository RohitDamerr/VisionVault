"use client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deleteSite } from "@/lib/actions/page";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Globe, Clock, ExternalLink } from "lucide-react";
import { formatTimeAgo } from "@/lib/utils";
import { Page } from "@prisma/client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { getLink } from "@/lib/getLink";

function PageItem({ site }: { site: Page }) {
  const router = useRouter();

  const handleDelete = async (siteId: string) => {
    const result = await deleteSite(siteId);
    if (result.success) {
      toast.success("Success", { description: "Site deleted successfully" });
    } else {
      toast.error("Error", { description: "Failed to delete site" });
    }

    router.refresh();
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0 group">
        <div className="flex-1">
          <Link
            href={getLink({ subdomain: "editor", pathName: site.id })}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1"
          >
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold transition-colors group-hover:text-primary">
                {site.title}
              </h2>
              <ExternalLink className="w-4 h-4 opacity-0 transition-opacity group-hover:opacity-50" />
            </div>
          </Link>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 hover:bg-accent/50"
            >
              <MoreHorizontal className="w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center gap-2 text-destructive"
              onClick={() => handleDelete(site.id)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row items-start sm:items-center text-sm gap-x-6 gap-y-2 sm:gap-y-0 text-muted-foreground">
          <div className="flex items-center gap-2 group hover:cursor-pointer">
            <Globe className="flex-shrink-0 w-4 h-4 mt-1 group-hover:text-primary" />
            <Link
              href={getLink({ subdomain: site.subdomain })}
              target="_blank"
              rel="noopener noreferrer"
              className="group-hover:text-primary"
            >
              {site.subdomain}.visionvault.site
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="flex-shrink-0 w-4 h-4 mt-1" />
            <span>Updated {formatTimeAgo(Number(site.updatedAt))}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default PageItem;
