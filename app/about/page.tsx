import Breadcrumb from "@/components/common/Breadcrumb";
import AboutSection from "@/sections/home/AboutSection";
import MissionAndVisionSection from "@/sections/MissionAndVisionSection";
import WhyChooseUsSection from "@/sections/WhyChooseUsSection";

export default function AboutPage() {
    return (
        <main>
            <Breadcrumb pageTitle="About Us" subTitle="About Us" />
            <AboutSection />
            <MissionAndVisionSection />
            <WhyChooseUsSection />
        </main>
    )
}