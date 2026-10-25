import React from "react";
import Breadcrumb from "@/components/common/Breadcrumb";
import ThankYouSection from "@/sections/ThankyouSection";
import { site } from "@/data";

export default function ThankYouPage() {
    return (
        <main className="bg-[#f8f6f0]">
            <Breadcrumb pageTitle="Thank You" subTitle="Message Received" />
            <ThankYouSection data={site.thankYou} />
        </main>
    );
}
