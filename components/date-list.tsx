"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function DateList() {
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
        <button
          key={date}
          className="px-3 py-1 rounded border bg-gray-100 hover:bg-blue-100"
          onClick={() => router.push(`/clients?date=${date}`)}
        >
          {date}
        </button>
      ))}
    </div>
  );
}