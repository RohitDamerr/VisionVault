"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  ClerkLoading,
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import {
  ChartLine,
  Github,
  Globe,
  LayoutDashboard,
  Lightbulb,
  LogOut,
  Moon,
  MoveUpRight,
  Settings,
  SquareDashedMousePointer,
} from "lucide-react";
import { useTheme } from "next-themes";

const items = [
  { title: "Overview", url: "#", icon: LayoutDashboard },
  { title: "Sites", url: "#", icon: Globe },
  { title: "Analytics", url: "#", icon: ChartLine },
  { title: "Settings", url: "#", icon: Settings },
];

const externalLinks = [
  {
    title: "Star on Github",
    href: "https://github.com/belastrittmatter/vision-vault",
    icon: Github,
  },
];

const AppSidebar = () => {
  const { theme, setTheme } = useTheme();
  return (
    <Sidebar className="w-[16rem]">
      <SidebarHeader>
        <SidebarGroup>
          <div className="flex justify-between">
            <div className="flex flex-row space-x-2">
              <div className="bg-gradient-to-tr from-cyan-400 via-purple-500 to-blue-500 text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg glow-cyan">
                <SquareDashedMousePointer className="size-6" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">Vision Vault</span>
                <span className="truncate text-xs">Dashboard</span>
              </div>
            </div>
            <div>
              {theme === "light" ? (
                <Button
                  onClick={() => setTheme("dark")}
                  variant="outline"
                  size="icon"
                >
                  <Moon />
                </Button>
              ) : (
                <Button
                  onClick={() => setTheme("light")}
                  variant="secondary"
                  size="icon"
                >
                  <Lightbulb />
                </Button>
              )}
            </div>
          </div>
        </SidebarGroup>
      </SidebarHeader>
      <SidebarContent className="justify-between px-2">
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {externalLinks.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="justify-between w-full"
                      data-umami-event="social-GitHub"
                    >
                      <div className="flex items-center space-x-3">
                        <item.icon className="w-4 h-4" />
                        <span>{item.title}</span>
                      </div>
                      <MoveUpRight />
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="px-4">
        <Separator />
        <SidebarMenu>
          <SidebarMenuItem>
            <ClerkLoading>
              <div className="flex items-center p-2 gap-2">
                <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
                <div className="flex-1 space-y-1">
                  <div className="w-24 h-4 rounded bg-muted animate-pulse" />
                  <div className="w-16 h-3 rounded bg-muted animate-pulse" />
                </div>
              </div>
            </ClerkLoading>
            <SignedIn>
              <div className="flex items-center justify-between w-full space-x-2">
                <div className="max-w-full truncate pr-2 rounded-lg">
                  <UserButton
                    appearance={{
                      baseTheme: theme === "dark" ? dark : undefined,
                      elements: {
                        userButtonBox:
                          "flex-row-reverse hover:bg-muted rounded-lg p-2",
                      },
                    }}
                    showName
                  />
                </div>
                <SignOutButton>
                  <Button variant={"ghost"} className="px-2 py-6">
                    <LogOut />
                  </Button>
                </SignOutButton>
              </div>
            </SignedIn>
            <SignedOut>
              <SignInButton mode="redirect">
                <Button className="w-full">Sign in</Button>
              </SignInButton>
            </SignedOut>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
