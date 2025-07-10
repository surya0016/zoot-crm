import { getClientData } from '@/actions/get-client-data'
import React from 'react'

const Page = async() => {
  const data = await getClientData()
  console.log("Client Data:", data)
  return (
    <div>
      <main className="flex-1 p-4 lg:p-6 overflow-auto">
        <button className='border border-white p-3 mr-3'>
          Click Me
        </button>
        <button className='border border-white p-3'>
          Click Me
        </button>
      </main>
    </div>
  )
}

export default Page