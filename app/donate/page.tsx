import Breadcrumb from "@/components/common/Breadcrumb";
import DonationSection from "@/sections/DontationSection";

export default function DonatePage() {
    return (
        <main className="bg-[#f8f6f0]">
            <Breadcrumb pageTitle="Donate" subTitle="Donate" />
            <DonationSection />
        </main>
    )
}