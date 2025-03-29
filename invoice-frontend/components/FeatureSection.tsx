import React from 'react'
import Image from 'next/image'

const FeatureSection = () => {
  return (
    <section className="container mx-auto mb-24">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">Key Features and Capabilities</h2>
              <p className="mx-auto max-w-2xl text-gray-400">
                Discover how our platform can transform your business with powerful analytics and insights
              </p>
            </div>
    
            <div className="space-y-24">
              {/* Feature 1 */}
              <div className="grid gap-8 md:grid-cols-2 md:items-center">
                <div>
                  <h3 className="mb-4 text-2xl font-bold">Navigate with Confidence through Precise Predictions</h3>
                  <p className="mb-6 text-gray-400">
                    Our advanced AI algorithms analyze historical data and market trends to provide accurate forecasts,
                    helping you make informed decisions with confidence.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <span className="mr-2 h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                      <span className="text-sm text-gray-400">Predictive analytics with 95% accuracy</span>
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2 h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                      <span className="text-sm text-gray-400">Real-time market insights</span>
                    </li>
                  </ul>
                </div>
                <div className="rounded-lg bg-blue-900/20 p-6">
                  <Image
                    src="/placeholder.svg?height=300&width=500"
                    alt="Precise Predictions"
                    width={500}
                    height={300}
                    className="rounded-lg"
                  />
                </div>
              </div>
    
              {/* Feature 2 */}
              <div className="grid gap-8 md:grid-cols-2 md:items-center">
                <div className="order-2 md:order-1 rounded-lg bg-blue-900/20 p-6">
                  <Image
                    src="/placeholder.svg?height=300&width=500"
                    alt="Real-Time Data"
                    width={500}
                    height={300}
                    className="rounded-lg"
                  />
                </div>
                <div className="order-1 md:order-2">
                  <h3 className="mb-4 text-2xl font-bold">Empower Your Forecasts with the Pulse of Real-Time Data</h3>
                  <p className="mb-6 text-gray-400">
                    Access live data streams and instant analytics to stay ahead of market changes and capitalize on
                    emerging opportunities before your competitors.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <span className="mr-2 h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                      <span className="text-sm text-gray-400">Live data processing</span>
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2 h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                      <span className="text-sm text-gray-400">Instant alerts and notifications</span>
                    </li>
                  </ul>
                </div>
              </div>
    
              {/* Feature 3 */}
              <div className="grid gap-8 md:grid-cols-2 md:items-center">
                <div>
                  <h3 className="mb-4 text-2xl font-bold">Visualize Insights through Intuitive Dashboards</h3>
                  <p className="mb-6 text-gray-400">
                    Transform complex data into clear, actionable insights with our customizable dashboards designed for
                    both technical and non-technical users.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <span className="mr-2 h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                      <span className="text-sm text-gray-400">Drag-and-drop interface</span>
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2 h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                      <span className="text-sm text-gray-400">Customizable visualization options</span>
                    </li>
                  </ul>
                </div>
                <div className="rounded-lg bg-blue-900/20 p-6">
                  <Image
                    src="/placeholder.svg?height=300&width=500"
                    alt="Intuitive Dashboards"
                    width={500}
                    height={300}
                    className="rounded-lg"
                  />
                </div>
              </div>
    
              {/* Feature 4 */}
              <div className="grid gap-8 md:grid-cols-2 md:items-center">
                <div className="order-2 md:order-1 rounded-lg bg-blue-900/20 p-6">
                  <Image
                    src="/placeholder.svg?height=300&width=500"
                    alt="Integration"
                    width={500}
                    height={300}
                    className="rounded-lg"
                  />
                </div>
                <div className="order-1 md:order-2">
                  <h3 className="mb-4 text-2xl font-bold">Seamlessly Integrate and Synchronize Your Analytics Ecosystem</h3>
                  <p className="mb-6 text-gray-400">
                    Connect with your existing tools and data sources to create a unified analytics environment that
                    eliminates silos and enhances collaboration.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <span className="mr-2 h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                      <span className="text-sm text-gray-400">200+ pre-built integrations</span>
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2 h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                      <span className="text-sm text-gray-400">API access for custom connections</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
  )
}

export default FeatureSection