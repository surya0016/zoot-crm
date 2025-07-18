import { Button } from '@/components/ui/button'
import { SidebarTrigger } from '@/components/ui/sidebar'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const HomeNavbar = () => {
  return (
    <nav className='fixed top-0 right-0 left-0 h-16 bg-white border-b border-gray-200 dark:border-zinc-800 dark:bg-zinc-950 flex items-center px-2 pr-5 z-50'>
      <div className="flex items-center gap-4 w-full justify-between">
        <div className="flex items-center flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="border-r-1 mr-2 pr-2">
              <SidebarTrigger/>
            </div>
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Users className="h-4 w-4 text-white" />
            </div>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-zinc-200">CRM Dashboard</h1>
          </div>
        </div>
        {/* Authentication button */}
        <div className="flex-shrink-0 items-center flex gap-4">
          <DarkMode/>
          <AuthButton/>
        </div>
      </div>
    </nav>
  )
}

export default HomeNavbar

import { Bell, Menu, Search, Settings, Users } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { DarkMode } from '@/components/ui/dark-mode-toggle'
import { AuthButton } from '@/components/auth/auth-button'

const Header = () => {
  return (
    <>
      <header className="bg-white border-b border-gray-200 dark:border-zinc-800 dark:bg-zinc-950 px-4 lg:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <div className="border-r-1 mr-2 pr-2">
              <SidebarTrigger/>
            </div>
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Users className="h-4 w-4 text-white" />
            </div>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-zinc-200">CRM Dashboard</h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2">
            <Search className="h-4 w-4 text-gray-400 " />
            <Input
              placeholder="Search clients..."
              className="w-64"
            />
          </div>          
          <DarkMode/>
        </div>
      </header>
    </>
  )
}