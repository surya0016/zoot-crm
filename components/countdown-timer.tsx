"use client"

import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Clock } from 'lucide-react';

interface CountDownProps {
  entryId: string;
  tagName: string;
}

const CountDown: React.FC<CountDownProps> = ({ entryId, tagName }) => {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return; // Only run timer logic on client

    let interval: NodeJS.Timeout;

    const fetchInitialTime = async () => {
      if (!tagName) {
        setTimeLeft(0);
        return;
      }
      try {
        const response = await axios.post("/api/client/get/tag", { entryId, tagName });
        const tagTimer = response.data.tagTimerVar;
        if (!tagTimer || !tagTimer.startTime || tagTimer.countDownSec == null) {
          setTimeLeft(0);
          return;
        }
        // Calculate seconds elapsed since start
        const start = new Date(tagTimer.startTime).getTime();
        const now = Date.now();
        const elapsed = Math.floor((now - start) / 1000);
        const remaining = tagTimer.countDownSec - elapsed;
        setTimeLeft(remaining > 0 ? remaining : 0);
      } catch (error) {
        console.error("Error fetching tag timer:", error);
        setTimeLeft(0);
      }
    };

    fetchInitialTime();

    interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [entryId, tagName, mounted]);

  const hours = String(Math.floor(timeLeft / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((timeLeft % 3600) / 60)).padStart(2, '0');
  const seconds = String(timeLeft % 60).padStart(2, '0');

  return (
    <div className={cn(
      "flex items-center justify-center flex-row font-semibold",
      timeLeft === 0
        ? "text-gray-500 dark:text-gray-400"
        : timeLeft < 1800
        ? "text-red-600 dark:text-red-400"
        : "text-blue-600 dark:text-blue-400"
    )}>
      <Clock className='font-semibold mr-1' size={14}/>
      {hours}:{minutes}:{seconds}
    </div>
  );
};

export default CountDown;