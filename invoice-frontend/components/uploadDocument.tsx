'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"
import { Upload, HelpCircle, Clipboard, FileText } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Image from "next/image"
import documentIllustration from '../public/document illustration.jpg'

interface UploadDocumentProps {
  setActiveTab: (tab: 'upload' | 'status') => void;
}

export default function UploadDocument({ setActiveTab }: UploadDocumentProps) {
  const [email, setEmail] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [taskId, setTaskId] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file || !email) {
      toast({
        title: "Error",
        description: "Please select a file and enter an email address.",
        variant: "destructive",
      })
      return
    }
  
    const formData = new FormData()
    formData.append('file', file)
    formData.append('email', email)
  
    try {
      const response = await fetch(`https://invoice-r8mn.onrender.com/upload/upload_invoice?email=${formData.get('email')}`, {
        method: 'POST',
        body: formData,
        headers: {
          'accept': 'application/json',
        }
      })
  
      if (!response.ok) throw new Error('Failed to upload file')
  
      const data = await response.json()
      setTaskId(data.task_id)
      toast({
        title: "Success",
        description: data.message,
      })
      
      // Simulate upload progress
      let progress = 0
      const interval = setInterval(() => {
        progress += 10
        setUploadProgress(progress)
        if (progress >= 100) {
          clearInterval(interval)
        }
      }, 500)
    } catch (error) {
      toast({
        title: "Error",
        // description: error.message,
        variant: "destructive",
      })
    }
  }

  const copyTaskId = () => {
    if (taskId) {
      navigator.clipboard.writeText(taskId)
      toast({
        title: "Copied",
        description: "Task ID copied to clipboard",
      })
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Upload Document</CardTitle>
            <CardDescription>
              Upload your document and we will process it for you.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUploadSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <Label htmlFor="file">Upload Document</Label>
                <div className="flex items-center space-x-2">
                  <Input 
                    id="file" 
                    type="file" 
                    onChange={handleFileChange}
                    required
                  />
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="icon">
                          <HelpCircle className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Supported file types: PDF, DOCX, XLSX</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
              <Button type="submit" className="w-full">
                <Upload className="mr-2 h-4 w-4" />
                Upload Document
              </Button>
              {uploadProgress > 0 && uploadProgress < 100 && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Uploading...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} className="w-full" />
                </div>
              )}
              {taskId && (
                <div className="mt-4 p-4 bg-green-50 rounded-md">
                  <p className="text-green-800 font-semibold">Upload Successful!</p>
                  <p className="text-sm text-green-600">Task ID: {taskId}</p>
                  <Button onClick={copyTaskId} variant="outline" className="mt-2">
                    <Clipboard className="mr-2 h-4 w-4" />
                    Copy Task ID
                  </Button>
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
      <div className="hidden md:block">
        <Card>
          <CardHeader>
            <CardTitle>Document Processing</CardTitle>
            <CardDescription>How we handle your documents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="bg-primary text-primary-foreground rounded-full p-2">
                  <Upload className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-semibold">Upload</h3>
                  <p className="text-sm text-muted-foreground">Securely upload your document</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="bg-primary text-primary-foreground rounded-full p-2">
                  <FileText className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-semibold">Process</h3>
                  <p className="text-sm text-muted-foreground">AI-powered document analysis</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="bg-primary text-primary-foreground rounded-full p-2">
                  <FileText className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-semibold">Results</h3>
                  <p className="text-sm text-muted-foreground">Get insights and extracted data</p>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <Image
                src={documentIllustration}
                alt="Photo gallery preview"
                width={300}
                height={200}
                priority={false} // {false} | {true}
                className="rounded-l-2xl"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}