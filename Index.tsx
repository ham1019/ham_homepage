import SideNavigation from "@/components/SideNavigation";
import MobileNavigation from "@/components/MobileNavigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import LogSection from "@/components/LogSection";
import ExpertiseSection from "@/components/ExpertiseSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="relative">
      <SideNavigation />
      <MobileNavigation />
      <HeroSection />
      <AboutSection />
      <LogSection />
      <ExpertiseSection />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default Index;
