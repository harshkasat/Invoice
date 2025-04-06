'use client'
import Hero from "@/components/Hero"
import Navbar from "@/components/Navbar"
import VideoSection from "@/components/VideoSection"
import LogoSection from "@/components/LogoSection"
import FeatureSection from "@/components/FeatureSection"
import ExperienceSection from "@/components/ExperienceSection"
import InsightSection from "@/components/InsightSection"
import FAQ from "@/components/FAQ"
import { BackgroundPaths } from "@/components/ui/background-path"
import Footer from "@/components/Footer"
import { VideoProvider } from "../contexts/VideoContext"
import { useEffect } from "react"
import toast, { Toaster } from "react-hot-toast"


const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:8000/";

const checkBackendServerRunning = async () => {
  let attempts = 0;
  const maxAttempts = 40;
  
  const tryConnect = async () => {
    try {
      const response = await fetch(`${BASE_URL}`, {
        method: "GET",
        headers: {
          "accept": "application/json"
        },
      });
      
      if (!response.ok) {
        throw new Error(`Backend server error: ${response.status} ${response.statusText}`);
      }
      toast.success('Connected to backend server');
      return true;
    } catch (error) {
      attempts++;
      if (attempts >= maxAttempts) {
        if (error instanceof TypeError && error.message.includes('fetch')) {
          toast.error('Cannot connect to backend server after 40 seconds. Please ensure it is running.');
        } else {
          toast.error('Unexpected error connecting to backend');
        }
        console.error('Backend connection error:', error);
        return false;
      }
      await new Promise(resolve => setTimeout(resolve, 1000));
      return tryConnect();
    }
  };

  await tryConnect();
}

export default function Home() {

  // Check if the backend server is running
  useEffect(() => {
    checkBackendServerRunning();
  }, [])
  

  return (
    <div className="min-h-screen bg-[#0d1121] text-white pt-[72px]">
      <Toaster position="top-right" />
      <BackgroundPaths/>
      {/* Navigation */}
      <Navbar/>
      <div className="max-w-6xl mx-auto px-4">
        <VideoProvider>
          {/* Hero Section */}
          <Hero/>
          {/* Video Demo Section */}
          <VideoSection/>
        </VideoProvider>
        {/* Logos Section */}
        <LogoSection/>
        {/* Features Section */}
        <FeatureSection/>
        {/* Experience Section */}
        <ExperienceSection/>
        {/* Features Grid */}
        <InsightSection/>
        {/* FAQ Section */}
        <FAQ/>
      </div>
      {/* Footer */}
      <Footer/>
    </div>
  )
}
