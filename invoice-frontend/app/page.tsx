import Hero from "@/components/Hero"
import Navbar from "@/components/Navbar"
import VideoSection from "@/components/VideoSection"
import LogoSection from "@/components/LogoSection"
import FeatureSection from "@/components/FeatureSection"
import ExperienceSection from "@/components/ExperienceSection"
import InsightSection from "@/components/InsightSection"
import FAQ from "@/components/FAQ"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0d1121] text-white pt-[72px]">
      {/* Navigation */}
      <Navbar/>
      <div className="max-w-6xl mx-auto px-4">
        {/* Hero Section */}
        <Hero/>
        {/* Video Demo Section */}
        <VideoSection/>
        {/* Logos Section */}
        <LogoSection/>
        {/* Features Section */}
        <FeatureSection/>
        {/* Experience Section */}
        <ExperienceSection/>
        {/* Features Grid */}
        <InsightSection/>
        {/* FAQ Section */}
        <FAQ/>
      </div>
      {/* Footer */}
      <Footer/>
    </div>
  )
}
