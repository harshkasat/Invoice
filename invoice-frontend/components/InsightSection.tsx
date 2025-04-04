import React, { useState } from 'react'
import { Button } from './ui/button'

const InsightSection = () => {
  const [features, setFeatures] = useState({
    'Upload Your PDF Invoice': {
      description: 'Simply upload the invoice PDF you want to convert. Our system will handle the rest.'
    },
    'Receive Your Excel File': {
      description: 'Within minutes, receive a perfectly formatted Excel spreadsheet directly in your inbox, ready for analysis.'
    },
    'Analyze Your Finances Easily': {
      description: 'With your invoices in Excel format, you can easily organize, analyze, and gain valuable insights from your financial data.'
    },
    'Accurate Data Extraction': {
      description: 'Our advanced system ensures precise extraction of all crucial invoice details, from line items to totals.'
    },
    "Secure and Confidential": {
      description: 'Your uploaded invoices and converted Excel files are handled with the utmost security and confidentiality.'
    },
    'Your Data Anywhere': {
      description: 'Once in Excel format and in your email, your invoice data is easily accessible on any device, whenever you need it.'
    },
    'Simplicity Meets Power': {
      description: 'Enjoy a user-friendly interface while leveraging powerful conversion capabilities.'
    },
    'Let AI Do the Heavy Lifting': {
      description: 'Our AI-powered system handles complex data extraction, saving you hours of manual work.'
    },
    'Smart Automation': {
      description: 'Automate your invoice processing workflow with intelligent features and integrations.'
    }
  });

  return (
    <section className="container mx-auto mb-24">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Invoice to Excel Made Simple</h2>
          <p className="mx-auto max-w-2xl text-gray-400">
          Our service effortlessly transforms your PDF invoices into editable Excel spreadsheets, delivered straight to your email.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Feature Cards */}
            {
              (() => {
                return Object.entries(features).map(([title, { description }], i) => (
                  <div key={i} className="rounded-lg border border-gray-800 bg-gray-900/30 p-6">
                    <h3 className="mb-2 text-lg font-medium">{title}</h3>
                    <p className="text-sm text-gray-400">{description}</p>
                  </div>
                ));
              })()
            }
        </div>
        <div className="mt-8 text-center">
            <a href="/soon/Explore">
              <Button variant="link" className="text-blue-500 hover:text-blue-400">
                Explore more capabilities
              </Button>
            </a>
        </div>
      </section>
  )
}

export default InsightSection