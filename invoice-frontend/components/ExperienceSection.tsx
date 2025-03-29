import React from 'react'

const ExperienceSection = () => {
  return (
    <section className="container mx-auto mb-24">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">The Neuros Experience</h2>
          <p className="mx-auto max-w-2xl text-gray-400">
            See why businesses choose our platform for their analytics needs
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Card 1 */}
          <div className="rounded-xl border border-gray-800 bg-gray-900/30 p-8">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500/10 text-yellow-500">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="mb-4 text-xl font-bold">Project management is simplified</h3>
            <p className="text-gray-400">
              Our intuitive interface streamlines workflows to provide a clear view of projects and goals at a glance.
            </p>
          </div>

          {/* Card 2 */}
          <div className="rounded-xl border border-gray-800 bg-gray-900/30 p-8">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500/10 text-yellow-500">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="mb-4 text-xl font-bold">Access to real-time data for faster insights</h3>
            <p className="text-gray-400">
              No more waiting for reports. Get immediate insights to make data-driven decisions.
            </p>
          </div>

          {/* Card 3 */}
          <div className="rounded-xl border border-gray-800 bg-gray-900/30 p-8">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500/10 text-yellow-500">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="mb-4 text-xl font-bold">Real-time data processing with advanced AI algorithms</h3>
            <p className="text-gray-400">Our AI-powered platform processes data instantly for up-to-date insights.</p>
          </div>
        </div>
      </section>
  )
}

export default ExperienceSection