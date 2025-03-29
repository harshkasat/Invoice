'use client'
import React, { useState } from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full border-b border-gray-800 bg-[#0d1121]/80 backdrop-blur-sm z-50">
      <div className="container mx-auto flex items-center justify-between py-4 px-4">
        <div className="flex items-center gap-12">
          <Link href="/" className="text-xl font-bold text-white">
            TallyMate
          </Link>
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li>
                <Link href="/soon/Features" className="text-sm text-gray-400 hover:text-white">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/soon/Use Cases" className="text-sm text-gray-400 hover:text-white">
                  Use Cases
                </Link>
              </li>
              <li>
                <Link href="/soon/Pricing" className="text-sm text-gray-400 hover:text-white">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/soon/Applications" className="text-sm text-gray-400 hover:text-white">
                  Applications
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        
        <div className="flex items-center gap-6">
          <Link href="#" className="hidden text-sm text-gray-400 hover:text-white md:block">
            Sign in
          </Link>
          <Button className="hidden md:block rounded-full bg-blue-600 px-6 hover:bg-blue-700">
            Get Started
          </Button>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-400 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Completely separated component */}
      {isMenuOpen && (
      <div className="absolute top-full left-0 w-full bg-[#0d1121] z-50 md:hidden">
        <div className="container mx-auto py-8 px-4">
          <nav className="flex flex-col space-y-6">
            <Link href="/soon/Features" className="text-gray-100 hover:text-white text-lg font-medium">Features</Link>
            <Link href="/soon/Use Cases" className="text-gray-100 hover:text-white text-lg font-medium">Use Cases</Link>
            <Link href="/soon/Pricing" className="text-gray-100 hover:text-white text-lg font-medium">Pricing</Link>
            <Link href="/soon/Applications" className="text-gray-100 hover:text-white text-lg font-medium">Applications</Link>
            <Link href="#" className="text-gray-100 hover:text-white text-lg font-medium">Sign in</Link>
            <Button className="w-full rounded-full bg-blue-600 px-6 py-4 text-lg font-medium hover:bg-blue-700">
              Get Started
            </Button>
          </nav>
        </div>
      </div>
    )}

    </header>
  )
}

export default Navbar