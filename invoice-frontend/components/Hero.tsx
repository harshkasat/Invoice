'use client'
import React from 'react'
import { Button } from './ui/button'
import { useVideo } from '../contexts/VideoContext'

const Hero = () => {
  const { setIsPlaying } = useVideo();
  
  return (
    <section className="container mx-auto py-8 px-4 text-center sm:py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          <div className="mb-4 sm:mb-6 inline-flex items-center rounded-full border border-gray-700 bg-gray-800/50 px-3 sm:px-4 py-1 text-[10px] sm:text-xs">
            <span className="mr-2 h-2 w-2 rounded-full bg-blue-500"></span>
            Transform Your Invoices with AI-Powered Automation
          </div>
          <h1 className="mb-4 sm:mb-6 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
          Seamlessly Convert PDFs to Excel and Get Them Delivered to Your Email
          </h1>
          <p className="mb-6 sm:mb-8 text-sm sm:text-base text-gray-400 md:text-lg">
          Our smart AI-powered tool extracts data from invoices, organizes it into an Excel sheet, and sends it straight to your inbox-saving you time and effort.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:gap-4 sm:flex-row">
            <Button 
              className="w-full rounded-full px-6 sm:px-8 py-5 sm:py-6 bg-blue-600 text-sm sm:text-base hover:bg-blue-700 sm:w-auto"
              onClick={() => {
                setIsPlaying(true);
                // Scroll to video section
                document.querySelector('#video-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Request a Demo
            </Button>
            <Button
              className="w-full rounded-full px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base bg-white sm:w-auto text-black hover:bg-blue-700 hover:text-white"
            >
              Learn More
            </Button>
          </div>
        </div>
    </section>
  )
}

export default Hero