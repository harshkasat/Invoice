import React from 'react'
import Image from 'next/image'

const FeatureSection = () => {
  return (
    <section className="container mx-auto px-4 mb-16 sm:mb-24">
            <div className="mb-12 sm:mb-16 text-center">
              <h2 className="mb-3 sm:mb-4 text-2xl sm:text-3xl font-bold md:text-4xl">Key Features and Capabilities</h2>
              <p className="mx-auto max-w-2xl text-sm sm:text-base text-gray-400">
              Discover how our platform simplifies invoice management with cutting-edge AI and automation.
              </p>
            </div>
    
            <div className="space-y-16 sm:space-y-24">
              {/* Feature 1 */}
              <div className="grid gap-6 sm:gap-8 md:grid-cols-2 md:items-center">
                <div>
                  <h3 className="mb-3 sm:mb-4 text-xl sm:text-2xl font-bold">Effortless PDF to Excel Conversion</h3>
                  <p className="mb-4 sm:mb-6 text-sm sm:text-base text-gray-400">
                  Our AI extracts key invoice details and structures them into a clean Excel format—no manual entry needed.
                  </p>
                  <ul className="space-y-1.5 sm:space-y-2">
                    <li className="flex items-center">
                      <span className="mr-2 h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                      <span className="text-sm sm:text-base text-gray-400">Accurate data extraction</span>
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2 h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                      <span className="text-sm sm:text-base text-gray-400">Automated formatting</span>
                    </li>
                  </ul>
                </div>
                <div className="rounded-lg bg-blue-900/20 p-3 sm:p-6">
                  <Image
                    src="/assets/effortless-pdf-excel.jpeg"
                    alt="Precise Predictions"
                    width={500}
                    height={300}
                    className="rounded-lg w-full"
                  />
                </div>
              </div>
    
              {/* Feature 2 */}
              <div className="grid gap-6 sm:gap-8 md:grid-cols-2 md:items-center">
                <div className="order-2 md:order-1 rounded-lg bg-blue-900/20 p-3 sm:p-6">
                  <Image
                    src="/assets/seamless-email-delivery.jpeg"
                    alt="Real-Time Data"
                    width={500}
                    height={300}
                    className="rounded-lg w-full"
                  />
                </div>
                <div className="order-1 md:order-2">
                  <h3 className="mb-3 sm:mb-4 text-xl sm:text-2xl font-bold">Seamless Email Delivery</h3>
                  <p className="mb-4 sm:mb-6 text-sm sm:text-base text-gray-400">
                  Receive your processed Excel invoices directly in your inbox within minutes.
                  </p>
                  <ul className="space-y-1.5 sm:space-y-2">
                    <li className="flex items-center">
                      <span className="mr-2 h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                      <span className="text-sm sm:text-base text-gray-400">Instant email notifications</span>
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2 h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                      <span className="text-sm sm:text-base text-gray-400">Secure and hassle-free</span>
                    </li>
                  </ul>
                </div>
              </div>
    
              {/* Feature 3 */}
              <div className="grid gap-6 sm:gap-8 md:grid-cols-2 md:items-center">
                <div>
                  <h3 className="mb-3 sm:mb-4 text-xl sm:text-2xl font-bold">Multi-Format Support</h3>
                  <p className="mb-4 sm:mb-6 text-sm sm:text-base text-gray-400">
                  Our tool supports a wide range of invoice formats and templates.
                  </p>
                  <ul className="space-y-1.5 sm:space-y-2">
                    <li className="flex items-center">
                      <span className="mr-2 h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                      <span className="text-sm sm:text-base text-gray-400">PDF, PNG, and scanned invoices</span>
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2 h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                      <span className="text-sm sm:text-base text-gray-400">Intelligent adaptability</span>
                    </li>
                  </ul>
                </div>
                <div className="rounded-lg bg-blue-900/20 p-3 sm:p-6">
                  <Image
                    src="/assets/multi-format-support.jpeg"
                    alt="Intuitive Dashboards"
                    width={500}
                    height={300}
                    className="rounded-lg w-full"
                  />
                </div>
              </div>
            </div>
          </section>
  )
}

export default FeatureSection