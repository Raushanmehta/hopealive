import Breadcrumb from "@/components/common/Breadcrumb";
import AboutSection from "@/sections/home/AboutSection";
import MissionAndVisionSection from "@/sections/MissionAndVisionSection";
import WhyChooseUsSection from "@/sections/WhyChooseUsSection";

export default function AboutPage() {
    return (
        <main className="bg-[#f8f6f0]">
            <Breadcrumb pageTitle="About Us" subTitle="About Us" />
            <AboutSection showCta={false} />
            <MissionAndVisionSection />
            <WhyChooseUsSection />
        </main>
    )
}