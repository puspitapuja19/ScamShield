import HeroSection from "../components/landing/HeroSection";
import FeatureSection from "../components/landing/FeatureSection";
import HowItWorks from "../components/landing/HowItWorks";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-navy-950">
      <HeroSection />
      <FeatureSection />
      <HowItWorks />
    </div>
  );
}