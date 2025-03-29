import React from 'react'

const LogoSection = () => {
  return (
    <section className="container mx-auto mb-24">
        <p className="mb-8 text-center text-sm text-gray-500">
          TRUSTED BY COMPANIES LARGE AND SMALL FROM AROUND THE WORLD
        </p>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex items-center justify-center">
              <div className="h-6 w-24 rounded bg-gray-800"></div>
            </div>
          ))}
        </div>
    </section>
  )
}

export default LogoSection