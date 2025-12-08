import React from "react";
import AppSidebar from "../components/dashboard/sidebar";
import SiteList from "../components/dashboard/site-list";
import { SidebarProvider } from "@/components/ui/sidebar";

const Dashboard = async () => {
  return (
    <SidebarProvider>
      <div className="flex w-screen h-screen">
        <AppSidebar />
        <SiteList />
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
