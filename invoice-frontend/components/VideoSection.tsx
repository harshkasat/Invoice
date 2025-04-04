'use client'
import React from 'react'
import { useVideo } from '../contexts/VideoContext'

const VideoSection = () => {
  const { isPlaying, setIsPlaying } = useVideo();

  return (
    <section id="video-section" className="container mx-auto mb-24 px-4">
      <div className="relative mx-auto overflow-hidden rounded-xl">
        {!isPlaying ? (
          // Thumbnail with Play Button
          <div 
            className="relative cursor-pointer"
            onClick={() => setIsPlaying(true)}
          >
            {/* Thumbnail Image */}
            <img
              src="/assets/thumbnail.png" // Replace with your actual thumbnail
              alt="Video Thumbnail"
              className="w-full h-full rounded-xl object-cover"
            />
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <button className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="white"
                  className="w-8 h-8"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 3l14 9-14 9V3z" />
                </svg>
              </button>
            </div>
          </div>
        ) : (
          // Video Element (Only Shown After Click)
          <video
            className="w-full h-full rounded-xl object-cover"
            controls
            autoPlay
            muted
            loop
            src="https://res.cloudinary.com/debxcs6le/video/upload/v1743768089/invoice-assets/ykhtjjzf9cretddnqin9.mp4" // Ensure this path is correct
          />
        )}
      </div>
    </section>
  )
}

export default VideoSection