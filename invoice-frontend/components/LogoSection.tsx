import React from 'react'

import { InfiniteSlider } from "@/components/ui/infiniteSlider";

function InfiniteSliderBasic() {
  return (
    <InfiniteSlider gap={24} reverse className="w-full h-full">
      <img
        src="/assets/google.png"
        alt="Google Logo"
        className="h-[120px] w-auto"
      />
      <img
        src="/assets/discord.png"
        alt="Discord logo"
        className="h-[120px] w-auto"
      />
      <img
        src="/assets/nvidia.png"
        alt="Nvidia logo"
        className="h-[120px] w-auto"
      />
      <img
        src="/assets/amazon.png"
        alt="Amazon logo"
        className="h-[131px] w-auto"
      />
      <img
        src="/assets/microsoft.png"
        alt="Microsoft logo"
        className="h-[120px] w-auto"
      />
    </InfiniteSlider>
  );
}

const LogoSection = () => {
  return (
    <section className="container mx-auto mb-24">
      <p className="mb-8 text-center text-sm text-gray-500">
        TRUSTED BY COMPANIES LARGE AND SMALL FROM AROUND THE WORLD
      </p>
      <InfiniteSliderBasic />
    </section>
  )
}

export default LogoSection