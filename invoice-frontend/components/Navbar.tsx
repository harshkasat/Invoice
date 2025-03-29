import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

const Navbar = () => {
  return (
<header className="border-b border-gray-800">
        <div className="container mx-auto flex items-center justify-between py-4">
          <div className="flex items-center gap-12">
            <Link href="/" className="text-xl font-bold">
              Neuros
            </Link>
            <nav className="hidden md:block">
              <ul className="flex space-x-8">
                <li>
                  <Link href="#" className="text-sm text-gray-400 hover:text-white">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-400 hover:text-white">
                    Use Cases
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-400 hover:text-white">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-400 hover:text-white">
                    Applications
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Link href="#" className="hidden text-sm text-gray-400 hover:text-white md:block">
              Sign in
            </Link>
            <Button className="rounded-full bg-blue-600 px-6 hover:bg-blue-700">Get Started</Button>
          </div>
        </div>
      </header>
  )
}

export default Navbar