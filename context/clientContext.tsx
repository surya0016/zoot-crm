"use client"

import { ClientData, TagUpdateProps } from "@/lib/types"
import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import axios from "axios"

interface ClientContextProps {
  clientData: ClientData[]
  loading: boolean
  dataLoading: boolean
  error: string | null
  fetchClientData: () => void
  addClient: (clientName: string) => void
  updateClient?: (clientId: string, updatedData: Partial<ClientData>) => void
  addNote?: (clientId: string, note: string) => void
  updateTag: ({ entryId, tagIndex, tag }: TagUpdateProps) => void
  deleteNote?: (clientId: string, noteId: string) => void
  getTagTimer: ({ entryId, tagName }: {
    entryId: string;  
    tagName: string;
  }) => void
}

const ClientContext = createContext<ClientContextProps | null>(null)

export function ClientContextProvider({children}:{children: ReactNode}){
  const [clientData, setClientData] = useState<ClientData[]>()
  const [loading, setLoading] = useState(false)
  const [dataLoading, setDataLoading] = useState(false)
  const [error, setError] = useState<string|null>(null)

  const fetchClientData = async () => {
    try {
      const response = await axios.get('/api/client')
      if (response.status === 200) {
        console.log("Client Data Fetched: ", response.data.clients) 
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
      await fetchClientData(); // Always refresh from backend
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
      console.log("Tag updated successfully: ", response.data)
      await fetchClientData() // Refresh client data after update
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
      const response = await axios.post('/api/client/getTag', {
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
    fetchClientData()
  },[])

  const value: ClientContextProps = {
    clientData: clientData || [], 
    loading,
    error,
    dataLoading,
    fetchClientData,
    addClient,
    updateTag,
    getTagTimer,
  }

  return (
    <ClientContext.Provider value={value}>
      {children}
    </ClientContext.Provider>
  )
}

export const useClientContext = () => {
  const context = useContext(ClientContext)
  if (!context) {
    throw new Error("useClientContext must be used within a ClientContextProvider")
  }
  return context
}