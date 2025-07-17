"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { SidebarMenuButton } from "./ui/sidebar";
import { dateFormatter } from "@/lib/utils";
import { useClientContext } from "@/context/clientContext";

export default function DateList() {
  const { setSelectedDate } = useClientContext();
  const [dates, setDates] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchDates() {
      const res = await axios.get("/api/client/get/date");
      setDates(res.data.dates);
    }
    fetchDates();
  }, []);

  return (
    <div className="flex gap-2 flex-wrap">
        
      {dates.map(date => (
        <SidebarMenuButton
          key={date}
          onClick={() => setSelectedDate(date)}
          >
          {dateFormatter(date)}
        </SidebarMenuButton>
      ))}
    </div>
  );
}