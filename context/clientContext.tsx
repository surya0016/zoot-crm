"use client"

import { ClientData, TagUpdateProps } from "@/lib/types"
import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import axios from "axios"
import { createClient } from "@/utils/supabase/client"
import { useRouter } from "next/navigation"

interface ClientContextProps {
  clientData: ClientData[]
  loading: boolean
  dataLoading: boolean
  error: string | null
  fetchClientData: (date:string) => void
  addClient: (clientName: string) => void
  updateClient?: (clientId: string, updatedData: Partial<ClientData>) => void
  addNote?: (clientId: string, note: string) => void
  updateTag: ({ entryId, tagIndex, tag }: TagUpdateProps) => void
  deleteNote?: (clientId: string, noteId: string) => void
  getTagTimer: ({ entryId, tagName }: {
    entryId: string;  
    tagName: string;
  }) => void
  setSelectedDate: (date: string) => void
  selectedDate: string
}

const ClientContext = createContext<ClientContextProps | null>(null)

const supabase = createClient();
const { data, error } = await supabase.auth.getClaims();

export function ClientContextProvider({children}:{children: ReactNode}){
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().slice(0, 10)) // Default to today
  const [clientData, setClientData] = useState<ClientData[]>()
  const [loading, setLoading] = useState(false)
  const [dataLoading, setDataLoading] = useState(false)
  const [error, setError] = useState<string|null>(null)


  const fetchClientData = async (date:string) => {
    try {
      const response = await axios.get('/api/client', {
        params: {
          date: selectedDate
        }
      })
      if (response.status === 200) {
        console.log("Client Data Fetched") 
        setClientData(response.data.clients)
        setLoading(false)
        setError(null)
      } else {
        setError("Failed to fetch client data")
      }
    } catch (error) {
      console.error("Error in ClientContextProvider: ", error)
      setError("Failed to fetch client data")  
    }
  }

  const addClient = async (clientName: string) => {
    try {
      const response = await axios.post('/api/client/create', { name: clientName })
      await fetchClientData(selectedDate); // Always refresh from backend
    } catch (error) {
      console.error("Error in addClient: ", error)
      setError("Failed to add client")
    }
  }

  const updateTag = async({ entryId, tagIndex, tag }: TagUpdateProps) => {
    try {
      setDataLoading(true)
      setError(null)
      const response = await axios.put('/api/client/update/tag', {
        entryId,
        tagIndex,
        tag
      })
      console.log("Tag updated successfully")
      await fetchClientData(selectedDate) // Refresh client data after update
    } catch (error) {
      console.error("Error in updateTag: ", error)
      setError("Failed to update tag")
    } finally {
      setDataLoading(false)
    }
  }

    const getTagTimer = async({ entryId, tagName }: {
        entryId: string;
        tagName: string;
      }) => {
      try {
        setDataLoading(true)
        setError(null)
        const response = await axios.post('/api/client/get/tag', {
          entryId,
          tagName
        })
        console.log("TagTimer Data: ", response.data)
        return response.data.tagTimerVar;
      } catch (error) {
        console.error("Error in fetching TagTimer: ", error)
        setError("Failed to fetch tag timer")
      } finally {
        setDataLoading(false)
      }
    }


  useEffect(() => {
    setLoading(true)
    fetchClientData(selectedDate)
  },[selectedDate])

  useEffect(() => {
    const interval = setInterval(() => {
      fetchClientData(selectedDate);
    }, 60000); // every 60 seconds
    return () => clearInterval(interval);
  }, [selectedDate]);

  const value: ClientContextProps = {
    clientData: clientData || [], 
    loading,
    error,
    dataLoading,
    fetchClientData,
    addClient,
    updateTag,
    getTagTimer,
    setSelectedDate,
    selectedDate,
  }

  return (
    <ClientContext.Provider value={value}>
      {children}
    </ClientContext.Provider>
  )
}

export const useClientContext = () => {
  const route = useRouter()
  const context = useContext(ClientContext)
  if (!context) {
    throw new Error("useClientContext must be used within a ClientContextProvider")
  }

  if(!data || !data.claims.session_id) {
    route.push('/auth/login')
  }
  
  return context
}