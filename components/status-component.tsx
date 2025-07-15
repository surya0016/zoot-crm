import { useClientContext } from '@/context/clientContext';
import { Status } from '@prisma/client'
import axios from 'axios'
import { get } from 'http';
import { Check, ClockAlert, Cross, Hourglass, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'

interface StatusComponentProps {
  entryId: string;
  tagName: string;
}

const StatusComponent = ({entryId, tagName}: StatusComponentProps) => {
  const { getTagTimer, clientData } = useClientContext();
  const [status, setStatus] = useState<Status>('none')
  const fetchStatus = async () => {
    clientData.map((client)=>{
      client.entry.tagTimers?.map((tagTimer)=>{
        if(tagTimer.clientEntryId === entryId && tagTimer.tagValue === tagName){
          if(tagTimer.tagStatus === Status.completed){
            setStatus(Status.completed)
          } else if(tagTimer.tagStatus === Status.overdue){
            setStatus(Status.overdue)
          } else {
            setStatus(Status.in_progress)
          }
        }
      })
    })
  }
  useEffect(() => {
    fetchStatus();
  }, [entryId, tagName, clientData]);
  return (
    <div className='flex items-center justify-center h-full'>
      {status === Status.completed && (
        <span className="text-green-500 font-bold">
          Completed ✔
        </span>
      )}
      {status === Status.overdue && (
        <span className="text-red-400 font-bold">
          Overdue ❌
        </span>
      )}
      {status === Status.in_progress && (
        <span className="text-blue-500 font-bold">
          Pending <Hourglass className='inline' size={14}/> 
        </span>
      )}
      {status === 'none' && (
        <span className="text-gray-500 font-bold"> 
          No Status
        </span>
      )}
    </div>
  )
}

export default StatusComponent