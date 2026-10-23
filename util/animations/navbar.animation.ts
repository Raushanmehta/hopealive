import gsap from "gsap";

export interface NavbarEntranceElements {
  container?: HTMLElement | null;
  logoIcon?: HTMLElement | null;
  logoText?: HTMLElement | null;
  linksContainer?: HTMLElement | null;
  ctaButton?: HTMLElement | null;
}

/**
 * GSAP entrance timeline for Navbar on page load
 */
export function animateNavbarEntrance(
  elements: NavbarEntranceElements,
  scope?: HTMLElement | null
) {
  const { container, logoIcon, logoText, linksContainer, ctaButton } = elements;

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  // 1. Navbar container slide down
  if (container) {
    tl.fromTo(
      container,
      { y: -20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        immediateRender: false,
        clearProps: "opacity,transform",
      }
    );
  }

  // 2. Logo Icon rotation & scale
  if (logoIcon) {
    tl.fromTo(
      logoIcon,
      { rotation: -90, scale: 0.6, opacity: 0 },
      {
        rotation: 0,
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: "back.out(1.7)",
        immediateRender: false,
        clearProps: "opacity,transform",
      },
      "-=0.3"
    );
  }

  // 3. Logo text reveal
  if (logoText) {
    tl.fromTo(
      logoText,
      { x: -10, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.45,
        immediateRender: false,
        clearProps: "opacity,transform",
      },
      "-=0.3"
    );
  }

  // 4. Nav links staggered reveal
  if (linksContainer) {
    const links = linksContainer.querySelectorAll(".nav-link-item");
    if (links.length > 0) {
      tl.fromTo(
        links,
        { y: -8, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.05,
          ease: "power2.out",
          immediateRender: false,
          clearProps: "opacity,transform",
        },
        "-=0.2"
      );
    }
  }

  // 5. CTA Button pop in
  if (ctaButton) {
    tl.fromTo(
      ctaButton,
      { scale: 0.85, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: "back.out(1.6)",
        immediateRender: false,
        clearProps: "opacity,transform",
      },
      "-=0.2"
    );
  }

  return tl;
}

/**
 * Micro-interaction: Logo sunburst spin on hover
 */
export function animateLogoHover(logoIcon: HTMLElement | null) {
  if (!logoIcon) return;
  return gsap.to(logoIcon, {
    rotation: "+=90",
    duration: 0.6,
    ease: "power2.out",
  });
}

/**
 * Micro-interaction: Button arrow diagonal shift on hover
 */
export function animateButtonArrowHover(arrow: SVGSVGElement | null) {
  if (!arrow) return;
  return gsap.to(arrow, {
    x: 3,
    y: -3,
    duration: 0.25,
    ease: "power2.out",
  });
}

/**
 * Micro-interaction: Button arrow reset on mouse leave
 */
export function animateButtonArrowLeave(arrow: SVGSVGElement | null) {
  if (!arrow) return;
  return gsap.to(arrow, {
    x: 0,
    y: 0,
    duration: 0.25,
    ease: "power2.out",
  });
}

/**
 * Mobile Drawer Menu Open Transition
 */
export function animateMobileMenuOpen(
  menuContainer: HTMLElement | null,
  itemsSelector = ".mobile-nav-item"
) {
  if (!menuContainer) return;

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.fromTo(
    menuContainer,
    { opacity: 0, y: -16, scale: 0.98 },
    { opacity: 1, y: 0, scale: 1, duration: 0.35 }
  );

  const items = menuContainer.querySelectorAll(itemsSelector);
  if (items.length > 0) {
    tl.fromTo(
      items,
      { opacity: 0, x: -10 },
      { opacity: 1, x: 0, duration: 0.3, stagger: 0.05, ease: "power2.out" },
      "-=0.2"
    );
  }

  return tl;
}

/**
 * GSAP Scroll Animation for Navbar
 * Fluidly morphs navbar between floating card and full-width sticky bar
 */
export function animateNavbarScroll(
  nav: HTMLElement | null,
  inner: HTMLElement | null,
  isScrolled: boolean,
  immediate: boolean = false
) {
  if (!nav) return;

  const targets = inner ? [nav, inner] : [nav];
  gsap.killTweensOf(targets);
  const dur = immediate ? 0 : 0.4;

  if (isScrolled) {
    // Outer Navbar expands to 100% full width sticky bar
    gsap.to(nav, {
      maxWidth: "100%",
      width: "100%",
      marginTop: 0,
      borderRadius: 0,
      borderTopColor: "transparent",
      borderLeftColor: "transparent",
      borderRightColor: "transparent",
      borderBottomColor: "rgba(255, 255, 255, 0.12)",
      backgroundColor: "rgba(31, 44, 22, 0.96)",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.55)",
      opacity: 1,
      y: 0,
      duration: dur,
      ease: "power2.out",
    });

    // Inner container expands from max-w-6xl (1152px) to max-w-7xl (1280px)
    // Logo shifts outward left, CTA button shifts outward right
    if (inner) {
      gsap.to(inner, {
        maxWidth: "1280px",
        duration: dur,
        ease: "power2.out",
      });
    }
  } else {
    // Outer Navbar shrinks to compact floating card (max-w-6xl = 1152px)
    gsap.to(nav, {
      maxWidth: "1152px",
      width: "calc(100% - 24px)",
      marginTop: 12,
      borderRadius: 14,
      borderTopColor: "rgba(255, 255, 255, 0.1)",
      borderLeftColor: "rgba(255, 255, 255, 0.1)",
      borderRightColor: "rgba(255, 255, 255, 0.1)",
      borderBottomColor: "rgba(255, 255, 255, 0.1)",
      backgroundColor: "#1f2c16",
      boxShadow: "0 12px 40px rgba(0, 0, 0, 0.45)",
      opacity: 1,
      y: 0,
      duration: dur,
      ease: "power2.out",
    });

    // Inner container shrinks back to max-w-6xl (1152px)
    // Logo and CTA button smoothly shift inward
    if (inner) {
      gsap.to(inner, {
        maxWidth: "1152px",
        duration: dur,
        ease: "power2.out",
      });
    }
  }
}

export const navbarAnimations = {
  entrance: animateNavbarEntrance,
  logoHover: animateLogoHover,
  arrowHover: animateButtonArrowHover,
  arrowLeave: animateButtonArrowLeave,
  mobileMenuOpen: animateMobileMenuOpen,
  scroll: animateNavbarScroll,
};

export default navbarAnimations;
