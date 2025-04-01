"use client"

import type React from "react"
import { UserButton } from "@clerk/nextjs"

import { useEffect, useState } from "react"
import { Search, Bell, ChevronLeft, ChevronRight, Upload, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
// import { useAuth } from "@clerk/nextjs"

export default function ContentRepositoryDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [activeTab, setActiveTab] = useState("repository")
  // const { getToken } = useAuth()

  // Use the token in an async function when needed
  // const handleUpload = async () => {
  //   try {
  //     const token = await getToken()
  //     // Use the token for API calls here
  //   } catch (error) {
  //     console.error('Error getting token:', error)
  //   }
  // }
  const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const createUserID = async () => {
    await fetch(`${BASE_URL}/api/create-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: 'include' // Add this to send cookies
    })
  }

  const getListPdf = async () => {
    await fetch (`${BASE_URL}/api/list-pdf`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: 'include' // Add this to send cookies
    })
  }

  const createPdf = async () => {
    if (!selectedFile) {
      console.error('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch(`${BASE_URL}/api/create-pdf`, {
        method: "POST",
        body: formData,
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to upload file');
      }

      const result = await response.json();
      console.log('Upload successful:', result);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }

  useEffect(() => {
    createUserID();
    getListPdf()
  }, []);

  // Mock data for the file repository
  const files = [
    {
      id: 1,
      folder: "Documents",
      name: "companies_demo_export.xlsx",
      created: "2021-11-04 11:54",
    },
    {
      id: 2,
      folder: "Download Center",
      name: "demo_image.jpg",
      created: "2021-11-03 22:00",
    },
    {
      id: 3,
      folder: "Report",
      name: "sample_demo_export.xlsx",
      created: "2021-11-02 11:09",
    },
    {
      id: 4,
      folder: "Other",
      name: "visit_demo_export.xlsx",
      created: "2021-10-31 17:24",
    },
  ]

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0])
    }
  }

  return (
    <div className="min-h-screen bg-[#0e1120]">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-12 bg-[#111827] flex flex-col items-center py-4 shadow-sm">
        <div className="w-8 h-8 rounded-md bg-[#3b82f6] text-white flex items-center justify-center mb-8">
          <span>≡</span>
        </div>
        <div className="mt-auto mb-4">
          <UserButton/>
        </div>
        <div className="w-8 h-8 rounded-md bg-[#1f2937] flex items-center justify-center text-[#3b82f6]">
          <span>?</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-12">
        {/* Header */}
        <header className="bg-[#111827] p-4 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <button className="text-gray-400">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex space-x-4">
              <button
                className={`text-[#3b82f6] font-medium pb-1 ${activeTab === "repository" ? "border-b-2 border-[#3b82f6]" : ""}`}
                onClick={() => setActiveTab("repository")}
              >
                Content Repository
              </button>
              <button
                className={`text-gray-400 font-medium pb-1 ${activeTab === "gallery" ? "border-b-2 border-[#3b82f6]" : ""}`}
                onClick={() => setActiveTab("gallery")}
              >
                Gallery
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Input
                placeholder="Search"
                className="w-64 pl-10 pr-4 py-2 rounded-full border border-gray-700 bg-[#1f2937] text-white focus:outline-none focus:ring-1 focus:ring-[#3b82f6]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            <button className="text-gray-400">
              <Bell className="h-5 w-5" />
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-6">
          <div className="bg-[#111827] rounded-xl shadow-sm p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium text-white">Repository</h2>
              <div className="flex items-center text-xs text-gray-400">
                <span>FILE DETAILS</span>
                <ChevronDown className="h-4 w-4 ml-1" />
              </div>
            </div>

            {/* Files Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-400 border-b border-gray-700">
                    <th className="pb-2 w-12"></th>
                    <th className="pb-2 w-40">Folder</th>
                    <th className="pb-2">Name</th>
                    <th className="pb-2">
                      Created <span className="text-xs">↑</span>
                    </th>
                    <th className="pb-2">Download</th>
                    <th className="pb-2">Edit</th>
                    <th className="pb-2">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {files.map((file, index) => (
                    <tr key={file.id} className={index % 2 === 0 ? "bg-[#111827]" : "bg-[#1a2235]"}>
                      <td className="py-3 text-[#3b82f6] font-medium">{file.id}</td>
                      <td className="py-3">
                        <div className="flex items-center">
                          <div className="w-6 h-6 rounded bg-[#3b82f6] flex items-center justify-center mr-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 text-white"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <span className="text-[#3b82f6]">{file.folder}</span>
                        </div>
                      </td>
                      <td className="py-3 text-white">{file.name}</td>
                      <td className="py-3 text-gray-400">{file.created}</td>
                      <td className="py-3">
                        <button className="bg-[#3b82f6] text-white text-sm py-1 px-4 rounded-md">Download</button>
                      </td>
                      <td className="py-3">
                        <button className="w-8 h-8 rounded-full bg-[#1f2937] flex items-center justify-center text-[#3b82f6]">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                          </svg>
                        </button>
                      </td>
                      <td className="py-3">
                        <button className="w-8 h-8 rounded-full bg-[#1f2937] flex items-center justify-center text-red-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Add File Section */}
          <div className="bg-[#111827] rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-medium text-white mb-6">Add file to repository:</h2>

            <div className="grid grid-cols-3 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-1 text-gray-300">Choose folder:</label>
                  <div className="relative">
                    <select className="w-full p-2 border border-gray-700 rounded-md appearance-none bg-[#1f2937] text-white focus:outline-none focus:ring-1 focus:ring-[#3b82f6]">
                      <option>Documents</option>
                      <option>Download Center</option>
                      <option>Report</option>
                      <option>Other</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-1 text-gray-300">Set permission:</label>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="private"
                      className="border-gray-600 data-[state=checked]:bg-[#3b82f6] data-[state=checked]:border-[#3b82f6]"
                    />
                    <label htmlFor="private" className="text-sm text-gray-300">
                      set file as private
                    </label>
                  </div>
                </div>
              </div>

              <div className="col-span-2">
                <div
                  className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center h-32 flex flex-col items-center justify-center"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <div className="mb-2">
                    <div className="w-10 h-10 rounded-full bg-[#1f2937] mx-auto flex items-center justify-center text-[#3b82f6]">
                      <Upload className="h-5 w-5" />
                    </div>
                  </div>
                  <p className="text-sm text-gray-300">Select a file or drag and drop here</p>
                  <p className="text-xs text-gray-500 mt-1">JPG, XLSX or PDF, file size no more than 10MB</p>

                  <div className="mt-3">
                    <label className="cursor-pointer">
                      <span className="bg-[#1f2937] text-[#3b82f6] py-1 px-4 rounded-md text-sm">SELECT FILE</span>
                      <input type="file" className="hidden" onChange={handleFileChange} accept=".jpg,.xlsx,.pdf" />
                    </label>
                  </div>
                </div>

                {selectedFile && (
                  <div className="mt-4 border border-gray-700 p-3 rounded-md flex items-center justify-between bg-[#1a2235]">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-[#1f2937] rounded flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-[#3b82f6]"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-sm text-white">{selectedFile.name}</span>
                    </div>
                    <div className="text-xs text-gray-400">{(selectedFile.size / (1024 * 1024)).toFixed(1)}MB</div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-[#1f2937]">
                Cancel
              </Button>
              <Button className="bg-[#3b82f6] hover:bg-[#2563eb] text-white" onClick={createPdf}>
                <Upload className="h-4 w-4 mr-2" /> Upload
              </Button>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center mt-6 text-sm text-gray-300">
            <span className="mr-2">Page</span>
            <button className="w-6 h-6 flex items-center justify-center rounded-md mr-1 text-gray-400">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button className="w-6 h-6 flex items-center justify-center rounded-md bg-[#3b82f6] text-white mr-1">
              1
            </button>
            <button className="w-6 h-6 flex items-center justify-center rounded-md mr-4 text-gray-400">
              <ChevronRight className="h-4 w-4" />
            </button>
            <span>30</span>
          </div>
        </main>
      </div>
    </div>
  )
}

