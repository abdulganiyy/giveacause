import { Button } from "@/components/ui/button";
import NavBar from "@/components/custom/NavBar";
import Hero from "@/components/custom/Hero";
import Campaigns from "@/components/custom/Campaigns";
import Categories from "@/components/custom/Categories";
import Footer from "@/components/custom/Footer";

export default function Home() {
  return (
    <div>
      <NavBar />
      <Hero />
      <Campaigns />
      <Categories />
      <Footer />
    </div>
  );
}
