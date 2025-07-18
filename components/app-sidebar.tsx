"use client";

import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import DateList from "./date-list"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export function AppSidebar() {
  const [dates, setDates] = useState<string[]>([]);
  const router = useRouter();
  
  useEffect(() => {
    async function fetchDates() {
      const res = await axios.get("/api/client/get/date");
      console.log("Fetched dates [app-sidebar.tsx]: ", res.data.dates);
      setDates(res.data.dates);
    }
    fetchDates();
  }, []);
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Daily Logs</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <DateList/>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}   