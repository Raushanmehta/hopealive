import HeroSection from "@/sections/home/HeroSection";
import AboutSection from "@/sections/home/AboutSection";
import CausesSection from "@/sections/home/CausesSection";
import BlogSection from "@/sections/home/BlogSection";
import TestimonialSection from "@/sections/home/TestimonialSection";
import ProjectSection from "@/sections/home/ProjectSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <CausesSection />
      <ProjectSection />
      <TestimonialSection />
      <BlogSection />
    </main>
  );
}
