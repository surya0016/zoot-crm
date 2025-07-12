import { getClientData } from '@/actions/get-client-data'
import ClientDataTable from '@/components/client-data-table'
import React from 'react'

const Page = async() => {
  const data = await getClientData()
  console.log("Client Data:", data)
  return (
    <div>
      <main className="flex-1 p-4 lg:p-6 overflow-auto">
        <ClientDataTable/>
      </main>
    </div>
  )
}

export default Page