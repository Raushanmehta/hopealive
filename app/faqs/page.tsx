import Breadcrumb from "@/components/common/Breadcrumb";
import FaqSection from "@/sections/FaqSection";

export default function FaqsPage() {
    return (
        <main className="bg-[#f8f6f0]">
            <Breadcrumb pageTitle="FAQs" subTitle="FAQs" />
            <FaqSection />
        </main>
    );
}