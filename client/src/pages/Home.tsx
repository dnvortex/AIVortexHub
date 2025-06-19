import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import PricingSection from "@/components/home/PricingSection";
import CoursesSection from "@/components/home/CoursesSection";
import ContactSection from "@/components/home/ContactSection";
import { useEffect } from "react";
import { useLocation } from "wouter";

const Home = () => {
  const [_, setLocation] = useLocation();

  // Handle smooth scroll to section when URL has hash
  useEffect(() => {
    const handleHashScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    // Add listener for hash changes
    window.addEventListener('hashchange', handleHashScroll);
    
    // Check for hash on initial load
    handleHashScroll();

    return () => window.removeEventListener('hashchange', handleHashScroll);
  }, []);

  return (
    <>
      <HeroSection />
      <ServicesSection />
      <PricingSection />
      <CoursesSection />
      <ContactSection />
    </>
  );
};

export default Home;
