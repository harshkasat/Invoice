'use client'

import { useState } from 'react'
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, 
    SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider } from "@/components/ui/sidebar"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import UploadDocument from '@/components/uploadDocument'
import TaskStatus from '@/components/taskStatus'

export default function DocumentUploadSystem() {
  const [activeTab, setActiveTab] = useState<'upload' | 'status'>('upload')

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gray-100">
        <Sidebar className="w-64 bg-white shadow-md">
          <SidebarContent>
            <div className="p-4">
              <h2 className="text-2xl font-bold text-primary">BillTrackr</h2>
            </div>
            <SidebarGroup>
              <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      onClick={() => setActiveTab('upload')}
                      isActive={activeTab === 'upload'}
                    >
                      Upload Documents
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      onClick={() => setActiveTab('status')}
                      isActive={activeTab === 'status'}
                    >
                      Check Task Status
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <div className="flex-1 flex flex-col">
          <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
              <h1 className="text-2xl font-semibold text-gray-900">
                {activeTab === 'upload' ? 'Document Upload' : 'Task Status'}
              </h1>
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon">
                  <Bell className="h-5 w-5" />
                </Button>
                <Avatar>
                  <AvatarImage src="" alt="User" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-y-auto p-6">
            <div className="max-w-7xl mx-auto">
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-6">
                  {activeTab === 'upload' ? (
                    <UploadDocument setActiveTab={setActiveTab} />
                  ) : (
                    <TaskStatus setActiveTab={setActiveTab} />
                  )}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}