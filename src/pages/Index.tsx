import Navigation from "@/components/Navigation";
import SocialSidebar from "@/components/SocialSidebar";
import SoundToggle from "@/components/SoundToggle";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import WhatIDoSection from "@/components/WhatIDoSection";
import ExperienceSection from "@/components/ExperienceSection";
import ContactSection from "@/components/ContactSection";
import CustomCursor from "@/components/CustomCursor";
import SpiralTimeline from "@/components/SpiralTimeline";
import SpiralTimeline2 from "@/components/SpiralTimeline2";
import SkillsSection from "@/components/SkillsSection";
import AboutSection2 from "@/components/AboutSection2";
import MottoSection from "@/components/MottoSection";
import { Footer } from "react-day-picker";
import { Projector } from "lucide-react";
import ProjectsSection from "@/components/ProjectsSection";

const Index = () => {
  return (
    <div className="relative min-h-screen bg-black/50 text-foreground overflow-x-hidden cursor-none md:cursor-none">
      <CustomCursor />
      <Navigation />
      <SocialSidebar />
      <SoundToggle />
      <HeroSection />
      <AboutSection2 />
      <WhatIDoSection />
      <SpiralTimeline />
      <SkillsSection />
      <ProjectsSection />
      <MottoSection />
      <ContactSection />
    </div>
  );
};

export default Index;
