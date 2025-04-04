"use client"

import type React from "react"
import { UserButton } from "@clerk/nextjs"

import { useEffect, useState } from "react"
import { Search, Bell, ChevronLeft, ChevronRight, Upload, ChevronDown, Menu, X, Download, Edit, Trash2, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

// Add this interface near the top of the file
interface PDF {
  id: string;
  name: string;
  folder: string;
  created_at: string;
  link: string;
}

export default function ContentRepositoryDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [activeTab, setActiveTab] = useState("repository")
  const [pdfList, setPdfList] = useState<PDF[]>([]);
  const [isUploading, setIsUploading] = useState(false)
  const [creditLeft, setCreditLeft] = useState<number>(5) // Default to 5 for initialization
  const [sidebarOpen, setSidebarOpen] = useState(false) // For mobile sidebar toggle
  const [searchOpen, setSearchOpen] = useState(false) // For mobile search toggle

  const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  
  const deletePdf = async (filename: string) => {
    try {
      const response = await fetch(`${BASE_URL}/api/delete-pdf/${filename}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to delete PDF');
      }

      // Refresh the PDF list after successful deletion
      getListPdf();
    } catch (error) {
      console.error('Error deleting PDF:', error);
    }
  }
  
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
    try {
      const response = await fetch(`${BASE_URL}/api/list-pdf`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: 'include' // Add this to send cookies
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch PDF list');
      }
      
      const data = await response.json();
      console.log('PDF list:', data);
      setPdfList(data);
    } catch (error) {
      console.error('Error fetching PDF list:', error);
    }
  }

  const createPdf = async () => {
    if (!selectedFile) {
      console.error('No file selected');
      return;
    }

    // Check if file is PDF
    if (selectedFile.type !== 'application/pdf') {
      alert('Please select a PDF file');
      return;
    }

    // Check if user has credits
    if (creditLeft <= 0) {
      alert('You have no credits left. Please contact us at dizznuts@gmail.com .');
      return;
    }

    setIsUploading(true);
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
      
      // Clear the selected file
      setSelectedFile(null);
      
      // Refresh the PDF list after successful upload
      getListPdf();
      // Check credits after upload
      getCheckCredit();
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setIsUploading(false);
    }
  }

  const getCheckCredit = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/check-credit`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: 'include' // Add this to send cookies
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch credit information');
      }
      
      const data = await response.json();
      console.log('Credit Left:', data);
      setCreditLeft(data.creditLeft || 0); // Assuming the API returns an object with creditLeft property
    } catch (error) {
      console.error('Error fetching Credit Left:', error);
    }
  }

  const handleDownload = (link: string, filename: string) => {
    const a = document.createElement('a');
    a.href = link;
    a.target = '_blank';
    a.download = filename; // Set suggested filename
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  useEffect(() => {
    createUserID();
    getListPdf();
    getCheckCredit();
  }, []);

  // Function to format date from ISO string
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).replace(',', '');
  }

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

  const handleUploadClick = () => {
    createPdf();
  }

  const getFileId = (file: any, index: number) => {
    return index + 1;
  }

  // Function to determine credit badge color
  const getCreditBadgeColor = () => {
    if (creditLeft <= 0) return "bg-red-600";
    if (creditLeft <= 2) return "bg-yellow-500";
    return "bg-green-500";
  }

  // Function to determine credit status text
  const getCreditStatusText = () => {
    if (creditLeft <= 0) return "No credits";
    if (creditLeft <= 2) return "Low credits";
    return "Credits OK";
  }

  return (
    <div className="min-h-screen bg-[#0e1120]">
      {/* Desktop Sidebar */}
      <div className="hidden md:fixed md:left-0 md:top-0 md:h-full md:w-12 md:bg-[#111827] md:flex md:flex-col md:items-center md:py-4 md:shadow-sm">
        <div className="w-8 h-8 rounded-md bg-[#3b82f6] text-white flex items-center justify-center mb-8">
          <span>≡</span>
        </div>
        <div className="mt-auto mb-4">
          <UserButton
          appearance={{
            elements:{
              userButtonPopoverActionButton__manageAccount: "hidden"
            }
          }}/>
        </div>
        <div className="w-8 h-8 rounded-md bg-[#1f2937] flex items-center justify-center text-[#3b82f6]">
          <span>?</span>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
           onClick={() => setSidebarOpen(false)}>
      </div>
      
      <div className={`fixed left-0 top-0 h-full w-64 bg-[#111827] z-50 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden`}>
        <div className="p-4 flex justify-between items-center border-b border-gray-700">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-md bg-[#3b82f6] text-white flex items-center justify-center">
              <span>≡</span>
            </div>
            <span className="ml-3 text-white font-medium">Dashboard</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="text-gray-400">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-4">
          <div className="mb-4">
            <button 
              className={`w-full text-left py-2 px-3 rounded-md ${activeTab === "repository" ? "bg-[#1f2937] text-[#3b82f6]" : "text-gray-300"}`}
              onClick={() => {
                setActiveTab("repository");
                setSidebarOpen(false);
              }}
            >
              Content Repository
            </button>
          </div>
          <div className="mb-4">
            <button 
              className={`w-full text-left py-2 px-3 rounded-md ${activeTab === "gallery" ? "bg-[#1f2937] text-[#3b82f6]" : "text-gray-300"}`}
              onClick={() => {
                setActiveTab("gallery");
                setSidebarOpen(false);
              }}
            >
              Gallery
            </button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
          <div className="flex items-center justify-between">
            <UserButton 
              appearance={{
                elements:{
                  userButtonPopoverActionButton__manageAccount: "hidden"
                }
              }} />``
            <div className="w-8 h-8 rounded-md bg-[#1f2937] flex items-center justify-center text-[#3b82f6]">
              <span>?</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="md:ml-12">
        {/* Mobile Header */}
        <header className="md:hidden bg-[#111827] p-4 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)} className="text-gray-400">
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex space-x-2">
            <button
              className={`text-sm ${activeTab === "repository" ? "text-[#3b82f6] font-medium" : "text-gray-400"}`}
              onClick={() => setActiveTab("repository")}
            >
              Repository
            </button>
            <button
              className={`text-sm ${activeTab === "gallery" ? "text-[#3b82f6] font-medium" : "text-gray-400"}`}
              onClick={() => setActiveTab("gallery")}
            >
              Gallery
            </button>
          </div>
          <div className="flex items-center">
            <button onClick={() => setSearchOpen(!searchOpen)} className="text-gray-400 mr-2">
              <Search className="h-5 w-5" />
            </button>
            <div className={`px-2 py-1 rounded-full text-white text-xs flex items-center ${getCreditBadgeColor()}`}>
              <span>{creditLeft}</span>
            </div>
          </div>
        </header>

        {/* Mobile Search */}
        <div className={`bg-[#111827] p-4 transition-all duration-300 ${searchOpen ? 'max-h-16' : 'max-h-0 overflow-hidden'} md:hidden`}>
          <form onSubmit={(e) => { e.preventDefault(); }} className="relative">
            <Input
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-700 bg-[#1f2937] text-white focus:outline-none focus:ring-1 focus:ring-[#3b82f6]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400">
              <ChevronRight className="h-4 w-4" />
            </button>
          </form>
        </div>

        {/* Desktop Header */}
        <header className="hidden md:flex bg-[#111827] p-4 items-center justify-between">
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
            {/* Credit Badge */}
            <div className={`px-3 py-1 rounded-full text-white text-xs flex items-center ${getCreditBadgeColor()}`}>
              <span className="font-medium mr-1">{creditLeft}</span>
              <span>{getCreditStatusText()}</span>
            </div>
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
        <main className="p-3 md:p-6">
          <div className="bg-[#111827] rounded-xl shadow-sm p-4 md:p-6 mb-6">
            <div className="flex justify-between items-center mb-4 md:mb-6">
              <h2 className="text-base md:text-lg font-medium text-white">PDF Repository</h2>
              <div className="flex items-center">
                <button className="md:hidden flex items-center justify-center w-8 h-8 rounded-full bg-[#1f2937] text-[#3b82f6]">
                  <Filter className="h-4 w-4" />
                </button>
                <div className="hidden md:flex items-center text-xs text-gray-400">
                  <span>FILE DETAILS</span>
                  <ChevronDown className="h-4 w-4 ml-1" />
                </div>
              </div>
            </div>

            {/* Desktop Files Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-400 border-b border-gray-700">
                    <th className="pb-2 w-12">ID</th>
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
                  {(pdfList || []).map((file, index) => (
                    <tr key={getFileId(file, index)} className={index % 2 === 0 ? "bg-[#111827]" : "bg-[#1a2235]"}>
                      <td className="py-3 text-[#3b82f6] font-medium">{getFileId(file, index)}</td>
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
                      <td className="py-3 text-gray-400">{new Date(file.created_at).toLocaleString()}</td>
                      <td className="py-3">
                        <button 
                          className="bg-[#3b82f6] text-white text-sm py-1 px-4 rounded-md"
                          onClick={() => handleDownload(file.link, file.name)}
                        >
                          Download
                        </button>
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
                        <button 
                          className="w-8 h-8 rounded-full bg-[#1f2937] flex items-center justify-center text-red-500"
                          onClick={() => deletePdf(file.name)}
                        >
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

            {/* Mobile Files List */}
            <div className="md:hidden">
              {(pdfList || []).length > 0 ? (
                <div className="space-y-3">
                  {(pdfList || []).map((file, index) => (
                    <div key={getFileId(file, index)} className="bg-[#1a2235] rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 rounded bg-[#3b82f6] flex items-center justify-center">
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
                          <span className="text-[#3b82f6] text-sm">{file.folder}</span>
                        </div>
                        <span className="text-xs text-gray-400">#{getFileId(file, index)}</span>
                      </div>
                      <h3 className="text-white text-sm font-medium mb-2 truncate">{file.name}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400">{new Date(file.created_at).toLocaleString()}</span>
                        <div className="flex space-x-1">
                          <button 
                            className="w-8 h-8 rounded-full bg-[#1f2937] flex items-center justify-center text-[#3b82f6]"
                            onClick={() => handleDownload(file.link, file.name)}
                          >
                            <Download className="h-4 w-4" />
                          </button>
                          <button className="w-8 h-8 rounded-full bg-[#1f2937] flex items-center justify-center text-[#3b82f6]">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button 
                            className="w-8 h-8 rounded-full bg-[#1f2937] flex items-center justify-center text-red-500"
                            onClick={() => deletePdf(file.name)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-gray-400">
                  <p>No PDFs found</p>
                </div>
              )}
            </div>
          </div>

          {/* Add File Section */}
          <div className="bg-[#111827] rounded-xl shadow-sm p-4 md:p-6">
            <div className="flex justify-between items-center mb-4 md:mb-6 flex-wrap">
              <h2 className="text-base md:text-lg font-medium text-white">Add PDF file to repository:</h2>
              {creditLeft <= 0 && (
                <div className="w-full mt-2 md:w-auto md:mt-0 bg-red-600/20 text-red-400 border border-red-600/30 rounded-md px-3 py-1 text-xs md:text-sm">
                  You need to upgrade your plan. Contact us at dizznuts@gmail.com
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-1 text-gray-300">Choose folder:</label>
                  <div className="relative">
                    <select className="w-full p-2 border border-gray-700 rounded-md appearance-none bg-[#1f2937] text-white focus:outline-none focus:ring-1 focus:ring-[#3b82f6]">
                      <option>Documents</option>
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

              <div className="md:col-span-2">
<div
  className={`border-2 border-dashed rounded-lg p-8 md:p-12 text-center h-40 md:h-64 flex flex-col items-center justify-center ${
    creditLeft <= 0 ? 'border-gray-700 bg-gray-800/30 opacity-60' : 'border-gray-700 hover:border-[#3b82f6]/50 hover:bg-[#1f2937]/50 transition-all duration-300'
  }`}
  onDragOver={creditLeft > 0 ? handleDragOver : (e) => e.preventDefault()}
  onDrop={creditLeft > 0 ? handleDrop : (e) => e.preventDefault()}
>
  <div className="mb-4">
    <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full mx-auto flex items-center justify-center ${
      creditLeft <= 0 ? 'bg-gray-700 text-gray-500' : 'bg-[#1f2937] text-[#3b82f6]'
    }`}>
      <Upload className="h-6 w-6 md:h-8 md:w-8" />
    </div>
  </div>
  <p className="text-sm md:text-base text-gray-300 font-medium">Select a PDF file or drag and drop here</p>
  <p className="text-xs md:text-sm text-gray-500 mt-2">PDF files only, file size no more than 10MB</p>
  
  <div className="flex items-center text-xs text-gray-500 mt-4 md:mt-6">
    <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 16V8M12 8L8 12M12 8L16 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    <span>Drop files here</span>
  </div>

  <div className="mt-4 md:mt-6">
    <label className={`cursor-pointer ${creditLeft <= 0 ? 'opacity-50 pointer-events-none' : ''}`}>
      <span className="bg-[#1f2937] text-[#3b82f6] py-2 px-5 md:px-6 rounded-md text-sm md:text-base hover:bg-[#3b82f6]/20 transition-colors duration-300">SELECT FILE</span>
      <input 
        type="file" 
        className="hidden" 
        onChange={handleFileChange} 
        accept=".pdf,application/pdf" 
        disabled={creditLeft <= 0}
      />
    </label>
  </div>
</div>

                {selectedFile && (
                  <div className="mt-4 border border-gray-700 p-2 md:p-3 rounded-md flex items-center justify-between bg-[#1a2235]">
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
                      <span className="text-xs md:text-sm text-white truncate max-w-32 md:max-w-full">{selectedFile.name}</span>
                    </div>
                    <div className="text-xs text-gray-400">{(selectedFile.size / (1024 * 1024)).toFixed(1)}MB</div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-4 md:mt-6">
              <Button 
                variant="outline" 
                className="border-gray-700 text-gray-300 hover:bg-[#1f2937] text-xs md:text-sm py-1.5 px-2 md:px-4 whitespace-nowrap"
                onClick={() => setSelectedFile(null)}
              >
                Cancel
              </Button>
              <Button 
                className={`${
                  creditLeft <= 0 
                    ? 'bg-gray-600 cursor-not-allowed' 
                    : 'bg-[#3b82f6] hover:bg-[#2563eb]'
                } text-white text-xs md:text-sm py-1.5 px-3 md:px-4 whitespace-nowrap`}
                onClick={handleUploadClick}
                disabled={!selectedFile || isUploading || creditLeft <= 0}
              >
                {isUploading ? (
                  <span>Uploading...</span>
                ) : (
                  <>
                    <Upload className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" /> 
                    <span className="hidden xs:inline">Upload</span>
                    <span className="xs:hidden">Upload</span>
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Pagination */}
          
        </main>
      </div>
    </div>
  )
}