import HomeNavbar from "@/components/layout/HomeNavbar";
import Hero from "@/components/landing/Hero";
import Services from "@/components/landing/Services";
import HowItWorks from "@/components/landing/HowItWorks";
import FeaturedFreelancers from "@/components/landing/FeaturedFreelancers";
import WhyChooseUs from "@/components/landing/WhyChooseUs";
import Pricing from "@/components/landing/Pricing";
import Review from "@/components/landing/Reviews";
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
      <Review />
      <Footer />
    </>
  );
}
