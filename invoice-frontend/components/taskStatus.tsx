'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"
import { ClipboardList, Check, FileText, AlertCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface TaskStatusProps {
  setActiveTab: (tab: 'upload' | 'status') => void;
}

export default function TaskStatus({ setActiveTab }: TaskStatusProps) {
  const [statusTaskId, setStatusTaskId] = useState('')
  const [fileStatus, setFileStatus] = useState<string | null>(null)

  const handleStatusSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!statusTaskId) {
      toast({
        title: "Error",
        description: "Please enter a task ID.",
        variant: "destructive",
      })
      return
    }
  
    try {
      const response = await fetch(`https://invoice-r8mn.onrender.com/task/task-status/${statusTaskId}`, {
        method: 'GET',
      })
  
      if (!response.ok) throw new Error('Failed to retrieve task status')
  
      const data = await response.json()
      setFileStatus(data.status)
      toast({
        title: "Status Retrieved",
        description: `File status: ${data.status}`,
      })
    } catch (error) {
      toast({
        title: "Error",
        // description: error.message,
        variant: "destructive",
      })
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Check Task Status</CardTitle>
            <CardDescription>
              Enter your task ID to check the status of your document.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleStatusSubmit} className="space-y-4">
              <div>
                <Label htmlFor="statusTaskId">Task ID</Label>
                <Input 
                  id="statusTaskId" 
                  value={statusTaskId} 
                  onChange={(e) => setStatusTaskId(e.target.value)} 
                  placeholder="Enter task ID"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                <ClipboardList className="mr-2 h-4 w-4" />
                Check Status
              </Button>
              {fileStatus && (
                <div className={`mt-4 p-4 rounded-md ${
                  fileStatus === "Completed" ? "bg-green-50" : "bg-yellow-50"
                }`}>
                  <div className="flex items-center">
                    {fileStatus === "Completed" ? (
                      <Check className="text-green-500 mr-2" />
                    ) : (
                      <AlertCircle className="text-yellow-500 mr-2" />
                    )}
                    <p className={`font-semibold ${
                      fileStatus === "Completed" ? "text-green-800" : "text-yellow-800"
                    }`}>
                      File Status: {fileStatus}
                    </p>
                  </div>
                  {fileStatus === "Completed" && (
                    <Button variant="outline" className="mt-2">
                      <FileText className="mr-2 h-4 w-4" />
                      View Results
                    </Button>
                  )}
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
