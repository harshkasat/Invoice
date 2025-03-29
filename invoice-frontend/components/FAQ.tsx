import React from 'react'

const FAQ = () => {
  return (
    <section className="container mx-auto mb-24">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Frequently asked questions</h2>
          <p className="mx-auto max-w-2xl text-gray-400">Find answers to common questions about our platform</p>
        </div>

        <div className="mx-auto max-w-3xl space-y-6">
          {/* FAQ Item */}
          <div className="rounded-lg border border-gray-800 bg-gray-900/30 p-6">
            <h3 className="mb-4 text-lg font-medium">
              What is Neuros and what does it offer other analytics platforms?
            </h3>
            <p className="text-gray-400">
              Neuros is an AI-powered analytics platform that combines advanced machine learning algorithms with
              intuitive user interfaces to provide actionable insights from your data. Unlike other platforms, Neuros
              offers real-time processing, predictive analytics, and seamless integration with your existing tools.
            </p>
          </div>

          {/* FAQ Item */}
          <div className="rounded-lg border border-gray-800 bg-gray-900/30 p-6">
            <h3 className="mb-4 text-lg font-medium">Can Neuros integrate with my existing business tools?</h3>
            <p className="text-gray-400">
              Yes, Neuros offers over 200 pre-built integrations with popular business tools and platforms. Our API also
              allows for custom integrations with your proprietary systems.
            </p>
          </div>

          {/* FAQ Item */}
          <div className="rounded-lg border border-gray-800 bg-gray-900/30 p-6">
            <h3 className="mb-4 text-lg font-medium">Is my data secure with Neuros?</h3>
            <p className="text-gray-400">
              Absolutely. We implement enterprise-grade security measures including end-to-end encryption, regular
              security audits, and compliance with industry standards like GDPR, HIPAA, and SOC 2.
            </p>
          </div>
        </div>
    </section>
  )
}

export default FAQ