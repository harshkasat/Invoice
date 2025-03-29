'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { BackgroundPaths } from '@/components/ui/background-path'
import { useParams } from 'next/navigation'

const ComingSoon = () => {
  const params = useParams<{slug:string}>()
  console.log(params)
  return (
    <div className="relative min-h-screen bg-[#0d1121] text-white pt-[72px]">
      <div className="fixed inset-0 z-0">
        <BackgroundPaths stripOpacity={0.01} stripSpeed={40}/>
      </div>
      <div className="relative z-10">
        <div className="max-w-6xl mx-auto px-4">
          <section className="container mx-auto py-16 text-center md:py-24">
            <div className="mx-auto max-w-3xl">
              <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                {params.slug} Page is coming soon 
              </h1>
              <a href="/">
                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Button className="w-full rounded-full px-8 py-6 bg-blue-600 text-base hover:bg-blue-700 sm:w-auto">
                    Redirect to Home
                  </Button>
                </div>
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default ComingSoon