export interface NavItem {
  id: string;
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface NavbarData {
  brand: {
    name: string;
    href: string;
  };
  links: NavItem[];
  cta: {
    label: string;
    href: string;
  };
}

export interface HeroData {
  badge: {
    text: string;
    dot?: boolean;
  };
  headline: {
    line1: string;
    line2?: string;
    line3?: string;
  };
  description: string;
  cta: {
    label: string;
    href: string;
  };
  backgroundImage: string;
}

export interface AboutData {
  badge: {
    text: string;
    dot?: boolean;
  };
  headline: {
    line1: string;
    line2?: string;
  };
  description: string;
  stats: {
    value: string;
    label: string;
  };
  cta: {
    label: string;
    href: string;
  };
  images: {
    planting: {
      src: string;
      alt: string;
    };
    seedling: {
      src: string;
      alt: string;
    };
  };
}

export interface CauseItem {
  id: string;
  title: string;
  icon: string;
  description: string;
  href?: string;
}

export interface CausesData {
  badge: {
    text: string;
    dot?: boolean;
  };
  headline: {
    line1: string;
    line2?: string;
  };
  description: string;
  items: CauseItem[];
}

export interface BlogPostItem {
  id: string;
  date: string;
  title: string;
  image: string;
  alt: string;
  href: string;
}

export interface BlogData {
  badge: {
    text: string;
    dot?: boolean;
  };
  headline: {
    line1: string;
    line2?: string;
  };
  description: string;
  posts: BlogPostItem[];
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  avatar: string;
  quote: string;
  rating?: number;
}

export interface TestimonialData {
  badge: {
    text: string;
    dot?: boolean;
  };
  headline: {
    line1: string;
    line2?: string;
  };
  description: string;
  items: TestimonialItem[];
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  category: string;
  ctaText: string;
  image: string;
  alt: string;
  href: string;
}

export interface ProjectData {
  badge: {
    text: string;
    dot?: boolean;
  };
  headline: {
    line1: string;
    line2?: string;
  };
  description: string;
  items: ProjectItem[];
}

export interface SocialLink {
  id: string;
  platform: string;
  href: string;
  label: string;
}

export interface FooterData {
  headline: {
    line1: string;
    line2?: string;
  };
  description: string;
  socials: SocialLink[];
  linksSection: {
    title: string;
    links: { label: string; href: string }[];
  };
  quickLinksSection?: {
    title: string;
    links: { label: string; href: string }[];
  };
  locationSection: {
    title: string;
    addressLines: string[];
    phones: string[];
    email?: string;
  };
  copyright: {
    line1: string;
  };
  watermark: string;
}
