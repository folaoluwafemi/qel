"use client";

import React from "react";
import { LandingNav } from "../components/landing/LandingNav";
import { HeroSection } from "../components/landing/HeroSection";
import { ProblemSection } from "../components/landing/ProblemSection";
import { FeaturesGrid } from "../components/landing/FeaturesGrid";
import { CTASection } from "../components/landing/CTASection";
import { LandingFooter } from "../components/landing/LandingFooter";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-canvas text-ink antialiased selection:bg-[#00d4a4]/30 selection:text-[#0a0a0a]">
      {/* Navigation */}
      <LandingNav />

      {/* Hero Section */}
      <HeroSection />

      {/* The Philosophy / Problem */}
      <ProblemSection />

      {/* 4 Core Pillars */}
      <FeaturesGrid />

      {/* Call to Action */}
      <CTASection />

      {/* Footer */}
      <LandingFooter />
    </div>
  );
}
