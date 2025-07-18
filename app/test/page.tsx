import { getClientData } from '@/actions/get-client-data'
import ClientDataTable from '@/components/client-data-table'
import NoteRender from '@/components/note-render'
import React from 'react'

const Page = async() => {
  return (
    <div className='flex justify-between items-center w-full'>
      <div className="">Jagdish</div>
      <div className="">Surya</div>
    </div>
  )
}

export default Page