import { site } from "@/data";
import Breadcrumb from "@/components/common/Breadcrumb";
import TeamSection from "@/sections/TeamSection";

export default function TeamPage() {
  return (
    <main className="bg-[#f8f6f0]">
      <Breadcrumb pageTitle="Our Team" subTitle="Leadership & Field Crew" />
      <TeamSection data={site.team} />
    </main>
  );
}