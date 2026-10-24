import Breadcrumb from "@/components/common/Breadcrumb";
import ContactSection from "@/sections/ContactSection";

export default function ContactPage() {
    return (
        <main className="bg-[#f8f6f0]">
            <Breadcrumb pageTitle="Contact Us" subTitle="Contact Us" />
            <ContactSection />
        </main>
    )
}