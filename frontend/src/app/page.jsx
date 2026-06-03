import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import SearchDoctors from '@/components/home/SearchDoctors';
import FeaturedDoctors from '@/components/home/FeaturedDoctors';
import ServicesSection from '@/components/home/ServicesSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import FAQSection from '@/components/home/FAQSection';
import ContactSection from '@/components/home/ContactSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SearchDoctors />
      <FeaturedDoctors />
      <ServicesSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
    </>
  );
}
