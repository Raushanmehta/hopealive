import siteData from "@/data/site.json";

// Root schema types definition
export type RawSiteData = typeof siteData;
export type HopeAliveSchema = typeof siteData.HopeAlive;
export type HopeAliveSections = HopeAliveSchema["sections"];
export type HopeAliveTemplateComponents = HopeAliveSchema["templateComponents"];

// Aliases matching reference schema conventions
export type ServicesSchema = HopeAliveSchema;
export type ServicesSections = HopeAliveSections;
export type ServicesTemplateComponents = HopeAliveTemplateComponents;

// Universal section props interface
export interface SectionProps<T = unknown> {
  data?: T;
  className?: string;
  contentClassName?: string;
  variant?: string;
  isEditable?: boolean;
  onUpdate?: (newData: Partial<T>) => void;
}

// Section variant data models
export type HopeAliveNavbarData = HopeAliveSections["navbar"]["variants"]["HopeAliveNavbar1"];
export type HopeAliveHeroData = HopeAliveSections["hero"]["variants"]["HopeAliveHero1"];
export type HopeAliveAboutData = HopeAliveSections["about"]["variants"]["HopeAliveAbout1"];
export type HopeAliveMissionVisionData = HopeAliveSections["missionVision"]["variants"]["HopeAliveMissionVision1"];
export type HopeAliveWhyChooseUsData = HopeAliveSections["whyChooseUs"]["variants"]["HopeAliveWhyChooseUs1"];
export type HopeAliveCausesData = HopeAliveSections["causes"]["variants"]["HopeAliveCauses1"];
export type HopeAliveProjectsData = HopeAliveSections["projects"]["variants"]["HopeAliveProjects1"];
export type HopeAliveTestimonialsData = HopeAliveSections["testimonials"]["variants"]["HopeAliveTestimonials1"];
export type HopeAliveFaqsData = HopeAliveSections["faqs"]["variants"]["HopeAliveFaqs1"];
export type HopeAliveTeamData = HopeAliveSections["team"]["variants"]["HopeAliveTeam1"];
export type HopeAliveBlogData = HopeAliveSections["blog"]["variants"]["HopeAliveBlog1"];
export type HopeAliveContactData = HopeAliveSections["contact"]["variants"]["HopeAliveContact1"];
export type HopeAliveThankYouData = HopeAliveSections["thankYou"]["variants"]["HopeAliveThankYou1"];
export type HopeAliveNotFoundData = HopeAliveSections["notFound"]["variants"]["HopeAliveNotFound1"];
export type HopeAliveFooterData = HopeAliveSections["footer"]["variants"]["HopeAliveFooter1"];

// Inferred subitem data models
export type TeamMember = HopeAliveTeamData["membersList"][number];
export type BlogPost = HopeAliveBlogData["blogPosts"][number];
export type BlogPostItem = BlogPost;
export type CauseItem = HopeAliveCausesData["items"][number];
export type ProjectItem = HopeAliveProjectsData["projectsList"][number];
export type TestimonialItem = HopeAliveTestimonialsData["items"][number];
export type FaqItem = HopeAliveFaqsData["faqsList"][number];
export type NavItem = HopeAliveNavbarData["links"][number];

// Convenience types and aliases
export type NavbarData = HopeAliveNavbarData;
export type HeroData = HopeAliveHeroData;
export type AboutData = HopeAliveAboutData;
export type MissionVisionData = HopeAliveMissionVisionData;
export type WhyChooseUsData = HopeAliveWhyChooseUsData;
export type CausesData = HopeAliveCausesData;
export type ProjectsData = HopeAliveProjectsData;
export type TestimonialsData = HopeAliveTestimonialsData;
export type FaqsData = HopeAliveFaqsData;
export type TeamData = HopeAliveTeamData;
export type BlogData = HopeAliveBlogData;
export type ContactData = HopeAliveContactData;
export type ThankYouData = HopeAliveThankYouData;
export type NotFoundData = HopeAliveNotFoundData;
export type FooterData = HopeAliveFooterData;

// Default unified site data
const sec = siteData.HopeAlive.sections;

export const site = {
  navbar: sec.navbar.variants.HopeAliveNavbar1,
  hero: sec.hero.variants.HopeAliveHero1,
  about: sec.about.variants.HopeAliveAbout1,
  missionVision: sec.missionVision.variants.HopeAliveMissionVision1,
  whyChooseUs: sec.whyChooseUs.variants.HopeAliveWhyChooseUs1,
  causes: sec.causes.variants.HopeAliveCauses1,
  projects: sec.projects.variants.HopeAliveProjects1,
  testimonials: sec.testimonials.variants.HopeAliveTestimonials1,
  faqs: sec.faqs.variants.HopeAliveFaqs1,
  team: sec.team.variants.HopeAliveTeam1,
  blog: sec.blog.variants.HopeAliveBlog1,
  contact: sec.contact.variants.HopeAliveContact1,
  thankYou: sec.thankYou.variants.HopeAliveThankYou1,
  notFound: sec.notFound.variants.HopeAliveNotFound1,
  footer: sec.footer.variants.HopeAliveFooter1,

  // Root schema structure references
  HopeAlive: siteData.HopeAlive,
  Services: siteData.HopeAlive,
};

export type SiteData = typeof site;
export default siteData;
