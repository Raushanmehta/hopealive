import gsap from "gsap";

export interface FooterAnimationElements {
  headline?: HTMLElement | null;
  description?: HTMLElement | null;
  socialsContainer?: HTMLElement | null;
  linksColumn?: HTMLElement | null;
  quickLinksColumn?: HTMLElement | null;
  locationColumn?: HTMLElement | null;
  copyright?: HTMLElement | null;
  watermark?: HTMLElement | null;
}

/**
 * GSAP entrance animation for Footer
 */
export function animateFooterEntrance(
  elements: FooterAnimationElements,
  scope?: HTMLElement | null
) {
  const {
    headline,
    description,
    socialsContainer,
    linksColumn,
    quickLinksColumn,
    locationColumn,
    copyright,
    watermark,
  } = elements;

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  // 1. Headline reveal
  if (headline) {
    tl.fromTo(
      headline,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, clearProps: "opacity,transform" }
    );
  }

  // 2. Paragraph description
  if (description) {
    tl.fromTo(
      description,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, clearProps: "opacity,transform" },
      "-=0.4"
    );
  }

  // 3. Social buttons stagger pop-in
  if (socialsContainer) {
    const socialBtns = socialsContainer.querySelectorAll(".social-btn");
    if (socialBtns.length > 0) {
      tl.fromTo(
        socialBtns,
        { scale: 0.6, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: "back.out(1.8)",
          clearProps: "opacity,transform",
        },
        "-=0.3"
      );
    }
  }

  // 4. Links, Quick Links and Location columns
  const cols = [linksColumn, quickLinksColumn, locationColumn].filter(Boolean);
  if (cols.length > 0) {
    tl.fromTo(
      cols,
      { y: 25, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        clearProps: "opacity,transform",
      },
      "-=0.4"
    );
  }

  // 5. Copyright text
  if (copyright) {
    tl.fromTo(
      copyright,
      { opacity: 0 },
      { opacity: 1, duration: 0.6, clearProps: "opacity,transform" },
      "-=0.3"
    );
  }

  // 6. Giant watermark "HopeAlive" reveal
  if (watermark) {
    tl.fromTo(
      watermark,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.0,
        ease: "power2.out",
        clearProps: "opacity,transform",
      },
      "-=0.6"
    );
  }

  return tl;
}

/**
 * Micro-interaction: Social button hover bounce
 */
export function animateSocialHover(element: HTMLElement | null) {
  if (!element) return;
  return gsap.to(element, {
    scale: 1.14,
    rotation: 6,
    duration: 0.25,
    ease: "back.out(2)",
  });
}

/**
 * Micro-interaction: Social button mouse leave reset
 */
export function animateSocialLeave(element: HTMLElement | null) {
  if (!element) return;
  return gsap.to(element, {
    scale: 1,
    rotation: 0,
    duration: 0.25,
    ease: "power2.out",
  });
}

/**
 * Micro-interaction: Footer link hover slide
 */
export function animateFooterLinkHover(element: HTMLElement | null) {
  if (!element) return;
  return gsap.to(element, {
    x: 4,
    duration: 0.2,
    ease: "power1.out",
  });
}

/**
 * Micro-interaction: Footer link mouse leave reset
 */
export function animateFooterLinkLeave(element: HTMLElement | null) {
  if (!element) return;
  return gsap.to(element, {
    x: 0,
    duration: 0.2,
    ease: "power1.out",
  });
}

export const footerAnimations = {
  entrance: animateFooterEntrance,
  socialHover: animateSocialHover,
  socialLeave: animateSocialLeave,
  linkHover: animateFooterLinkHover,
  linkLeave: animateFooterLinkLeave,
};

export default footerAnimations;
