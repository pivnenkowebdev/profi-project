import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

// ===== HERO SECTION =====
document.fonts.ready.then(() => {
  const tlHero = gsap.timeline();
  const list = new SplitText("#heroList", { type: "lines" });

  tlHero
    .from("#mainTitle", {
      x: -100,
      opacity: 0,
      stagger: 0.05,
      duration: 0.6,
      ease: "power2.out",
    })
    .from("#heroSubtitle", {
      x: -100,
      opacity: 0,
      stagger: 0.1,
      duration: 0.5,
      ease: "power2.out",
    })
    .from(list.lines, {
      x: -100,
      opacity: 0,
      stagger: 0.1,
      duration: 0.5,
      ease: "power2.out",
    })
    .from("#heroLink", {
      opacity: 0,
      stagger: { amount: 0.5, from: "random" },
      duration: 0.8,
      ease: "power2.out",
    });
});

// ===== ABOUT SECTION =====
gsap
  .timeline({
    scrollTrigger: {
      trigger: "#aboutMeSection",
      start: "top 60%",
      end: "60% 70%",
      scrub: 2,
    },
  })
  .from("#aboutMeTitle", { x: "200%" })
  .from("#aboutMeSubtitle", { x: "200%" }, ">")
  .from("#listAbout", { x: "200%" }, ">");

const mm = gsap.matchMedia();

// DESKTOP
mm.add("(min-width: 769px)", () => {
  gsap
    .timeline({
      scrollTrigger: {
        trigger: "#garancySection",
        start: "top bottom",
        end: "50% 70%",
        scrub: 2,
      },
    })
    .from("#garancyTitle", { x: "150%" })
    .from("#garancySubtitle", { x: "150%" }, ">");

  gsap
    .timeline({
      scrollTrigger: {
        trigger: "#programmsSection",
        start: "top 90%",
        end: "50% 70%",
        scrub: 2,
      },
    })
    .to("body", {
      backgroundColor: "rgba(0, 8, 20, 1)",
      color: "#fff",
      duration: 0.5,
    })
    .to(
      "#header",
      {
        backgroundColor: "rgba(0, 8, 20, 0.8)",
        duration: 0.1,
      },
      "<",
    )
    .from("#programmTitle", { x: "150%" })
    .from("#programmSubtitle", { x: "150%" }, ">");

  gsap.from("[data-programm]", {
    scrollTrigger: {
      trigger: "#programmsSection",
      start: "top 70%",
      end: "60% 60%",
      scrub: 2,
    },
    y: "100%",
    opacity: 0,
    stagger: 0.6,
    duration: 1,
  });

  gsap.from("#programmLink", {
    scrollTrigger: {
      trigger: "#programmsSection",
      start: "top 95%",
      end: "bottom 90%",
      scrub: 2,
    },
    y: "100%",
    opacity: 0,
    stagger: 0.6,
  });

  gsap.from("[data-garancy-card]", {
    scrollTrigger: {
      trigger: "#garancySection",
      start: "top 70%",
      end: "60% 60%",
      scrub: 2,
    },
    y: "100%",
    opacity: 0,
    stagger: 0.6,
    duration: 1,
  });

  gsap.from("#garancyLink", {
    scrollTrigger: {
      trigger: "#garancySection",
      start: "top 95%",
      end: "bottom 90%",
      scrub: 2,
    },
    y: "100%",
    opacity: 0,
    stagger: 0.6,
  });
});

// ===== ICONS =====
const iconAnimations = [
  { id: "#rockIcon", trigger: "#rockIcon", start: "top 80%" },
  { id: "#manIcon", trigger: "#aboutMeSubtitle", start: "top 70%" },
  { id: "#womanIcon", trigger: "#listAbout", start: "top 60%" },
  { id: "#fireIcon", trigger: "#listAbout", start: "top 60%" },
];

iconAnimations.forEach(({ id, trigger, start }) => {
  gsap.from(id, {
    scrollTrigger: {
      trigger,
      start,
      end: "bottom bottom",
      toggleActions: "play none reverse none",
    },
    scale: 0,
    ease: "bounce.inOut",
    duration: 1,
  });
});

// ===== PROGRAMMS SECTION — MOBILE =====
mm.add(
  {
    isMobile: "(max-width: 768px)",
  },
  () => {
    gsap.from("#garancyTitle", {
      scrollTrigger: {
        trigger: "#garancySection",
        start: "top bottom",
        end: "20% 80%",
        scrub: 2,
      },
      x: "150%",
    });

    gsap.from("#garancySubtitle", {
      scrollTrigger: {
        trigger: "#garancySection",
        start: "top 90%",
        end: "20% 70%",
        scrub: 2,
      },
      x: "150%",
    });

    // Карточки
    gsap.from("[data-garancy-card]", {
      scrollTrigger: {
        trigger: "#garancySection",
        start: "top 50%",
        end: "60% 70%",
        scrub: 2,
      },
      y: "100%",
      opacity: 0,
      stagger: 0.6,
      duration: 1,
    });

    // Ссылка
    gsap.from("#garancyLink", {
      scrollTrigger: {
        trigger: "#garancySection",
        start: "40% 50%",
        end: "60% 70%",
        scrub: 2,
      },
      y: "100%",
      opacity: 0,
      stagger: 0.6,
    });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#programmsSection",
          start: "top 80%",
          end: "60% 90%",
          scrub: 2,
        },
      })
      .to("body", {
        backgroundColor: "#000814",
        color: "#fff",
        duration: 0.5,
      })
      .to(
        "#header",
        {
          backgroundColor: "rgba(255, 255, 255, 0)",
          duration: 0.5,
        },
        "<",
      );

    gsap.from("#programmTitle", {
      scrollTrigger: {
        trigger: "#programmsSection",
        start: "top bottom",
        end: "20% 70%",
        scrub: 2,
      },
      x: "150%",
    });

    gsap.from("#programmSubtitle", {
      scrollTrigger: {
        trigger: "#programmsSection",
        start: "top 60%",
        end: "20% 70%",
        scrub: 2,
      },
      x: "150%",
    });

    // Карточки
    gsap.from("[data-programm]", {
      scrollTrigger: {
        trigger: "#programmsSection",
        start: "top 50%",
        end: "60% 70%",
        scrub: 2,
      },
      y: "100%",
      opacity: 0,
      stagger: 0.6,
      duration: 1,
    });

    gsap.from("#programmLink", {
      scrollTrigger: {
        trigger: "#programmsSection",
        start: "40% 50%",
        end: "60% 70%",
        scrub: 2,
      },
      y: "100%",
      opacity: 0,
      stagger: 0.6,
    });
  },
);

// MOBILE MENU BG
mm.add("(max-width: 1300px)", () => {
  gsap.to("#menuList", {
    backgroundColor: "#000814",
    duration: 0.3,
    scrollTrigger: {
      trigger: "#programmsSection",
      start: "top center",
      toggleActions: "play none none reverse",
    },
  });
});
