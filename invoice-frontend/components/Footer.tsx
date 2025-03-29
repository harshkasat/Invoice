import React from 'react'
import Link from 'next/link'
import { X, Linkedin, Github  } from 'lucide-react';


const Footer = () => {
  return (
    <footer className="border-t border-gray-800 bg-gray-900/50 py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8 grid gap-8 md:grid-cols-2 lg:grid-cols-5">
            <div>
              <h3 className="mb-4 text-lg font-bold">TallyMate</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/soon/About Us" className="text-sm text-gray-400 hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/soon/Careers" className="text-sm text-gray-400 hover:text-white">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/soon/Press" className="text-sm text-gray-400 hover:text-white">
                    Press
                  </Link>
                </li>
                <li>
                  <Link href="/soon/News" className="text-sm text-gray-400 hover:text-white">
                    News
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-bold">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/soon/Blog" className="text-sm text-gray-400 hover:text-white">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/soon/Documentation" className="text-sm text-gray-400 hover:text-white">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/soon/Community" className="text-sm text-gray-400 hover:text-white">
                    Community
                  </Link>
                </li>
                <li>
                  <Link href="/soon/Webinars" className="text-sm text-gray-400 hover:text-white">
                    Webinars
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-bold">Support & Contact</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/soon/Help Center" className="text-sm text-gray-400 hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/soon/Contact Sales" className="text-sm text-gray-400 hover:text-white">
                    Contact Sales
                  </Link>
                </li>
                <li>
                  <Link href="/soon/Status" className="text-sm text-gray-400 hover:text-white">
                    Status
                  </Link>
                </li>
                <li>
                  <Link href="/soon/Security" className="text-sm text-gray-400 hover:text-white">
                    Security
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-bold">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/soon/Partners" className="text-sm text-gray-400 hover:text-white">
                    Partners
                  </Link>
                </li>
                <li>
                  <Link href="/soon/Investors" className="text-sm text-gray-400 hover:text-white">
                    Investors
                  </Link>
                </li>
                <li>
                  <Link href="/soon/Terms" className="text-sm text-gray-400 hover:text-white">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="/soon/Privacy" className="text-sm text-gray-400 hover:text-white">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-bold">Connect</h3>
                <div className="flex space-x-4">
                <Link href="https://x.com/harsh__kasat" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <X/>
                </Link>
                <Link href="https://www.linkedin.com/in/harshkasat/" className="text-gray-400 hover:text-white">
                  <span className="sr-only">LinkedIn</span>
                  <Linkedin/>
                </Link>
                <Link href="https://github.com/harshkasat/" className="text-gray-400 hover:text-white">
                  <span className="sr-only">GitHub</span>
                  <Github/>
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between border-t border-gray-800 pt-8 md:flex-row">
            <div className="flex flex-col items-center space-y-2 md:flex-row md:space-y-0 md:space-x-4">
              <p className="text-sm text-gray-500">© 2025 TallyMate. All rights reserved.</p>
              <p className="text-sm text-gray-500">Built with 🤍 by Harsh</p>
            </div>
            <div className="flex space-x-6">
              <Link href="#" className="text-xs text-gray-500 hover:text-gray-400">
                Privacy Policy
              </Link>
              <Link href="#" className="text-xs text-gray-500 hover:text-gray-400">
                Terms of Service
              </Link>
              <Link href="#" className="text-xs text-gray-500 hover:text-gray-400">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>
  )
}

export default Footer