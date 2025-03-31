import React from 'react'
import { Play } from 'lucide-react'

const VideoSection = () => {
  return (
    <section className="container mx-auto mb-24 px-4">
        <div className="relative mx-auto overflow-hidden rounded-xl bg-blue-900/20 p-12 md:p-16">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=1200')] bg-cover bg-center "></div>
          <div className="grid place-items-center">
            <button className="group relative flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white transition-all hover:bg-blue-700">
              <Play className="h-6 w-6" />
              <span className="absolute inset-0 animate-ping rounded-full bg-blue-600 opacity-75"></span>
            </button>
            <p className="mt-4 text-center text-sm font-medium text-gray-300">Watch introduction video</p>
          </div>
          {/* Grid overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
        </div>
      </section>
  )
}

export default VideoSection