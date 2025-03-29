import React from 'react'
import { Button } from './ui/button'


const Hero = () => {
  return (
    <section className="container mx-auto py-16 text-center md:py-24">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 inline-flex items-center rounded-full border border-gray-700 bg-gray-800/50 px-4 py-1 text-xs">
            <span className="mr-2 h-2 w-2 rounded-full bg-blue-500"></span>
            Trusted by finance companies and leaders in fintech
          </div>
          <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
            Revolutionizing Business Decisions with AI-Powered Analytics
          </h1>
          <p className="mb-8 text-gray-400 md:text-lg">
            Our intuitive platform puts powerful analytics in your hands. Make data-driven decisions with ease and stay
            ahead of the curve.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button className="w-full rounded-full bg-blue-600 px-8 py-6 text-base hover:bg-blue-700 sm:w-auto">
              Request a Demo
            </Button>
            <Button
              variant="outline"
              className="w-full rounded-full border-gray-700 px-8 py-6 text-base hover:bg-gray-800 sm:w-auto"
            >
              Learn More
            </Button>
          </div>
        </div>
    </section>
  )
}

export default Hero