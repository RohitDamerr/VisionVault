"use client";

import { useEditor } from "@/app/providers/editor-provider";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import SettingsTab from "./tabs/settings-tab";
import { Settings, Paintbrush } from "lucide-react";
import Link from "next/link";

const RightSidebar = () => {
  const { state } = useEditor();

  if (state.editor.previewMode) return null;

  return (
    <SidebarProvider open={state.editor.selectedElement.type !== null}>
      <Sidebar
        side="right"
        className={`mt-[65px] ${
          state.editor.selectedElement.type === null ? "translate-x-full" : ""
        }`}
      >
        <SidebarContent>
          <Tabs defaultValue="settings" className="flex flex-col flex-1">
            <SidebarGroup className="flex gap-4 p-2 border-b border-border">
              <TabsList className="flex items-center justify-start gap-4 bg-transparent">
                <TabsTrigger
                  value="settings"
                  className="w-auto h-10 p-0 data-[state=active]:bg-muted rounded-md hover:bg-muted/50 flex items-center gap-2 px-4 transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  <span className="text-xs">Settings</span>
                </TabsTrigger>
                <TabsTrigger
                  value="css"
                  className="w-auto h-10 p-0 data-[state=active]:bg-muted rounded-md flex items-center gap-2 px-4 hover:bg-muted/50 transition-colors"
                >
                  <Paintbrush className="w-4 h-4" />
                  <span className="text-xs">Editor</span>
                </TabsTrigger>
              </TabsList>
            </SidebarGroup>
            <SidebarGroup className="flex-1">
              <TabsContent value="settings" className="h-full">
                <SidebarGroupLabel className="px-4 py-2">
                  Settings
                </SidebarGroupLabel>
                <SidebarGroupContent className="px-2 max-h-[calc(100vh-160px)] overflow-y-auto">
                  <SettingsTab />
                </SidebarGroupContent>
              </TabsContent>
              <TabsContent value="css" className="h-full">
                <SidebarGroupLabel className="px-4 py-2">
                  CSS Editor
                </SidebarGroupLabel>
                <SidebarGroupContent className="p-4">
                  Whoops, this feature hasn&apos;t been built yet. Come back
                  later or{" "}
                  <Link
                    href="https://dub.sh/vision-vault"
                    className="text-blue-500 hover:underline"
                  >
                    build it yourself.
                  </Link>{" "}
                  ;)
                </SidebarGroupContent>
              </TabsContent>
            </SidebarGroup>
          </Tabs>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
};

export default RightSidebar;
