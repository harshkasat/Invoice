import React from 'react'

const ExperienceSection = () => {
  return (
    <section className="container mx-auto mb-24">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">The TallyMate Experience</h2>
          <p className="mx-auto max-w-2xl text-gray-400">
            See why businesses choose our platform for seamless invoice automation.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Card 1 */}
          <div className="rounded-xl border border-gray-800 bg-gray-900/30 p-8">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500/10 text-yellow-500">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="mb-4 text-xl font-bold">Automated Invoice Processing</h3>
            <p className="text-gray-400">
              OSay goodbye to manual data entry! Our AI-powered tool extracts invoice details and structures them into Excel automatically.
            </p>
          </div>

          {/* Card 2 */}
          <div className="rounded-xl border border-gray-800 bg-gray-900/30 p-8">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500/10 text-yellow-500">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="mb-4 text-xl font-bold">Instant Email Notifications</h3>
            <p className="text-gray-400">
            No delays! Receive your processed invoices in your inbox within minutes—stay updated in real-time.
            </p>
          </div>

          {/* Card 3 */}
          <div className="rounded-xl border border-gray-800 bg-gray-900/30 p-8">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500/10 text-yellow-500">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="mb-4 text-xl font-bold">Secure and Scalable</h3>
            <p className="text-gray-400">From small businesses to enterprises, our platform scales effortlessly while keeping your data secure.</p>
          </div>
        </div>
      </section>
  )
}

export default ExperienceSection