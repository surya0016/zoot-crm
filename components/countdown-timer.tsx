import { cn } from '@/lib/utils';
import { Clock } from 'lucide-react';
import { useEffect, useState } from 'react'

interface CountDownProps {
  initialTime: number;
}

const CountDown: React.FC<CountDownProps> = ({ initialTime }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime*60);
  const hours = String(Math.floor(timeLeft / 3600));
  const minutes = String(Math.floor((timeLeft % 3600) / 60));
  const seconds = String(timeLeft % 60).padStart(2, '0');
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 0) {
          return 0; // Stop the countdown at 0
        }
        return prevTime - 1; // Decrease time left by 1 second
      });
    },1000);
    return ()=> clearInterval(interval)
  },[])
  return (
    // <div className='text-blue-600 '>
    <div className={
      cn(
        "text-blue-600 flex items-center justify-center flex-row font-semibold",
        timeLeft <= 1800 ? "text-red-600 dark:text-red-400" : "text-blue-600 dark:text-blue-400",
      )
    }>
      <Clock className='mr-1 font-semibold' size={14}/>{hours}:{minutes}:{seconds}
    </div>
  )
}

export default CountDown