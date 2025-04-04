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
            How quickly will I receive my converted Excel invoice?
            </h3>
            <p className="text-gray-400">
            Our system is designed for speed and efficiency. In most cases, you 
            will receive your converted Excel invoice in your email inbox within 
            a few minutes of uploading your PDF. The exact processing time may 
            vary slightly depending on the size and complexity of the invoice.
            </p>
          </div>

          {/* FAQ Item */}
          <div className="rounded-lg border border-gray-800 bg-gray-900/30 p-6">
            <h3 className="mb-4 text-lg font-medium">What kind of information from the PDF invoice will be extracted into the Excel sheet?</h3>
            <p className="text-gray-400">
            Our service is designed to extract all the key information you need 
            from your invoices, including the invoice number, date, vendor details,
            customer details, line items (description, quantity, unit price, total),
            subtotal, tax, and total amount. We strive for accurate and comprehensive data extraction.
            </p>
          </div>

          {/* FAQ Item */}
          <div className="rounded-lg border border-gray-800 bg-gray-900/30 p-6">
            <h3 className="mb-4 text-lg font-medium">Is my uploaded invoice data secure?</h3>
            <p className="text-gray-400">
            Yes, the security of your data is our top priority. We utilize secure protocols 
            for file uploads and processing. Your files are only used for the purpose of 
            conversion and are not stored permanently on our servers after the conversion process is complete.
            </p>
          </div>
        </div>
    </section>
  )
}

export default FAQ