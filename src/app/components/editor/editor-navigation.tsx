"use client";
import { upsertSite } from "@/lib/actions/page";
import { DeviceTypes, useEditor } from "@/app/providers/editor-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Page } from "@prisma/client";
import {
  ArrowUpRightFromSquare,
  ChevronLeft,
  Eye,
  Laptop,
  Loader2,
  Redo2,
  Smartphone,
  Tablet,
  Undo2,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FocusEventHandler, useEffect, useState } from "react";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { getLink } from "@/lib/getLink";

type Props = {
  siteDetails: Page;
};

const EditorNavigation = ({ siteDetails }: Props) => {
  const router = useRouter();
  const { state, dispatch } = useEditor();
  const [titleLoading, setTitleLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    dispatch({ type: "SET_SITE_ID", payload: { siteId: siteDetails.id } });
  }, [siteDetails, dispatch]);

  if (isMobile) return null;

  const handleOnBlurTitleChange: FocusEventHandler<HTMLInputElement> = async (
    event
  ) => {
    if (event.target.value && event.target.value !== siteDetails.title) {
      setTitleLoading(true);
      const res = await upsertSite({
        title: event.target.value,
        id: siteDetails.id,
      });

      if (res.success === false) {
        toast("Error", { description: res.msg });
      } else if (res.site) {
        toast("Success", {
          description: `Name of this site changed to '${res.site.title}'`,
        });
        router.refresh();
      }
      setTitleLoading(false);
    }
  };

  const handlePreviewClick = () => {
    dispatch({ type: "TOGGLE_PREVIEW_MODE" });
    dispatch({ type: "TOGGLE_LIVE_MODE", payload: { value: true } });
  };

  const handleUndo = () => {
    dispatch({ type: "UNDO" });
  };

  const handleRedo = () => {
    dispatch({ type: "REDO" });
  };

  const handleSwitchToggle = async (checked: boolean) => {
    dispatch({
      type: "TOGGLE_VISIBILITY_STATUS",
      payload: { value: checked },
    });

    const res = await upsertSite({
      visible: checked,
      id: siteDetails.id,
    });

    if (res.success === false) {
      toast("Error", { description: res.msg });
      dispatch({
        type: "TOGGLE_VISIBILITY_STATUS",
        payload: { value: !checked },
      });
    } else if (res.site) {
      toast("Success", {
        description: res.site.visible
          ? "Your site is now visible to the whole wide world!"
          : "Your site is only accessible to you now.",
      });
    }
  };

  const handleOnSave = async () => {
    setIsSaving(true);
    const res = await upsertSite({
      id: siteDetails.id,
      content: JSON.stringify(state.editor.elements),
    });
    if (!res.success) {
      toast("Error", { description: res.msg });
    } else {
      toast("Success", { description: "Your changes have been saved." });
    }
    setIsSaving(false);
  };

  return (
    <nav
      className={`border-b-[1px] border-primary/20 flex items-center justify-between py-2 px-6 gap-2 transition-all w-screen bg-background/80 backdrop-blur-sm ${
        state.editor.previewMode ? "!h-0 !p-0 !overflow-hidden" : ""
      }`}
    >
      <aside className="flex items-center gap-4 max-w-[260px] w-[300px]">
        <Link href={getLink({})}>
          <Button variant={"ghost"} size={"icon"}>
            <ChevronLeft />
          </Button>
        </Link>
        <div className="flex flex-col w-full">
          <div className="flex items-center">
            <Input
              defaultValue={siteDetails.title}
              className="border-none max-w-[7rem] p-0 h-5 m-0 text-lg"
              onBlur={handleOnBlurTitleChange}
              type="text"
            ></Input>
            <Loader2
              className={titleLoading ? "animate-spin h-4 w-4" : "hidden"}
            />
          </div>
          <Link
            href={getLink({ subdomain: siteDetails.subdomain })}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-sm gap-2 text-muted-foreground w-fit group"
          >
            {siteDetails.subdomain}.{process.env.NEXT_PUBLIC_ROOT_DOMAIN}
            <ArrowUpRightFromSquare className="hidden w-4 h-4 group-hover:block" />
          </Link>
        </div>
      </aside>
      <aside>
        <Tabs
          defaultValue="Desktop"
          className="w-fit"
          value={state.editor.device}
          onValueChange={(value) => {
            dispatch({
              type: "CHANGE_DEVICE",
              payload: { device: value as DeviceTypes },
            });
          }}
        >
          <TabsList className="w-full bg-transparent grid grid-cols-3 h-fit">
            <TabsTrigger
              value="Desktop"
              className="w-10 h-10 p-0 data-[state=active]:bg-muted"
            >
              <Laptop />
            </TabsTrigger>

            <TabsTrigger
              value="Tablet"
              className="w-10 h-10 p-0 data-[state=active]:bg-muted"
            >
              <Tablet />
            </TabsTrigger>

            <TabsTrigger
              value="Mobile"
              className="w-10 h-10 p-0 data-[state=active]:bg-muted"
            >
              <Smartphone />
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </aside>
      <aside className="flex items-center gap-2">
        <Button variant={"ghost"} size={"icon"} onClick={handlePreviewClick}>
          <Eye />
        </Button>
        <Button
          disabled={!(state.history.currentIndex > 0)}
          onClick={handleUndo}
          variant="ghost"
          size="icon"
        >
          <Undo2 />
        </Button>
        <Button
          disabled={
            !(state.history.currentIndex < state.history.history.length - 1)
          }
          onClick={handleRedo}
          variant="ghost"
          size="icon"
        >
          <Redo2 />
        </Button>
        <div className="flex flex-row items-center mx-4 gap-4">
          Draft{" "}
          <Switch
            defaultChecked={false}
            checked={state.editor.visible}
            onCheckedChange={handleSwitchToggle}
          />{" "}
          Public
        </div>
        <Button onClick={handleOnSave} disabled={isSaving} className="w-[67px]">
          {isSaving ? <Loader2 className="animate-spin" /> : "Save"}
        </Button>
      </aside>
    </nav>
  );
};

export default EditorNavigation;
