import { Check, ClockAlert, Cross, Hourglass, X } from 'lucide-react'
import React from 'react'

const StatusComponent = () => {
  return (
    <div className='flex items-center justify-center h-full'>
      {/* <span className="text-green-500 font-bold">
        Completed ✔
      </span> */}
      {/* <span className="text-red-400 font-bold">
        Overdue ❌
      </span> */}
      <span className="text-blue-500 font-bold">
        Pending <Hourglass className='inline' size={14}/> 
      </span>
    </div>
  )
}

export default StatusComponent