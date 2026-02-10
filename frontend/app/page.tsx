import HomeNavbar from "@/components/layout/HomeNavbar";
import Hero from "@/components/landing/Hero";
import Services from "@/components/landing/Services";
import HowItWorks from "@/components/landing/HowItWorks";
import FeaturedFreelancers from "@/components/landing/FeaturedFreelancers";
import WhyChooseUs from "@/components/landing/WhyChooseUs";
import Pricing from "@/components/landing/Pricing";
import Footer from "@/components/landing/Footer";

export default function HomePage() {
  return (
    <>
    <HomeNavbar />
      <Hero />
      <Services />
      <HowItWorks />
      <FeaturedFreelancers />
      <WhyChooseUs />
      <Pricing />
      <Footer />
    </>
  );
}
