"use client";

import { useState } from "react";
import { ArrowRight, FileSpreadsheet, Zap, Shield, Menu } from "lucide-react";
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

// Define props for FeatureCard
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-card text-card-foreground rounded-lg p-6 shadow-sm">
      <div className="mb-4 text-primary">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

const HomePage: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between h-16">
            <Link href="/" className="text-xl font-bold">
              BillTrackr
            </Link>
            
            <div className="hidden md:flex items-center space-x-4">
              <NavLinks />
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </nav>
        </div>
        
        {isMobileMenuOpen && (
          <div className="md:hidden border-t p-4">
            <nav className="flex flex-col space-y-4">
              <NavLinks />
            </nav>
          </div>
        )}
      </header>

      <main className="flex-grow container mx-auto px-4 py-16">
        <section className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Invoice to Excel Converter</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Effortlessly convert your invoices into Excel format for easy data management and analysis.
          </p>
          <Button size="lg" onClick={() => router.push('/dashboard')}>
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </section>

        <section className="grid md:grid-cols-3 gap-8 mb-16">
          <FeatureCard
            icon={<FileSpreadsheet className="h-10 w-10" />}
            title="Easy Conversion"
            description="Convert complex invoice data into clean, organized Excel files with just a few clicks."
          />
          <FeatureCard
            icon={<Zap className="h-10 w-10" />}
            title="Lightning Fast"
            description="Process multiple invoices quickly and efficiently, saving you valuable time."
          />
          <FeatureCard
            icon={<Shield className="h-10 w-10" />}
            title="Secure"
            description="Your data's security is our priority. All conversions are done locally on your device."
          />
        </section>

        <section className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Ready to simplify your invoice management?</h2>
          <Button size="lg" variant="outline">
            Learn More
          </Button>
        </section>
      </main>
    </div>
  );
};

const NavLinks: React.FC = () => {
  return (
    <>
      <Link href="/features" className="text-muted-foreground hover:text-foreground">
        Features
      </Link>
      <Link href="/contact" className="text-muted-foreground hover:text-foreground">
        Contact
      </Link>
    </>
  );
};

export default HomePage;
