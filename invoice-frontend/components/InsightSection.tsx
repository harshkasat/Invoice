import React from 'react'
import { Button } from './ui/button'

const InsightSection = () => {
  return (
    <section className="container mx-auto mb-24">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Insights and predictions made easy</h2>
          <p className="mx-auto max-w-2xl text-gray-400">
            Our platform simplifies complex data analysis to deliver actionable insights
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Feature Cards */}
          {[
            "Predictive Power",
            "Connect with Data",
            "Visualize Your Business",
            "Stay Updated, Always",
            "Your Data's Safe Haven",
            "Collaborate and Conquer",
            "Simplicity Meets Power",
            "Let AI Do the Heavy Lifting",
            "Collaborate and Conquer",
          ].map((title, i) => (
            <div key={i} className="rounded-lg border border-gray-800 bg-gray-900/30 p-6">
              <h3 className="mb-2 text-lg font-medium">{title}</h3>
              <p className="text-sm text-gray-400">
                Our platform provides powerful analytics tools that make it easy to understand your data and make
                informed decisions.
              </p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button variant="link" className="text-blue-500 hover:text-blue-400">
            Explore more capabilities
          </Button>
        </div>
      </section>
  )
}

export default InsightSection