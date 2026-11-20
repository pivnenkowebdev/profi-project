import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

const BG_DARK = "#0d0618";

// ===== HERO SECTION =====
document.fonts.ready.then(() => {
  const tlHero = gsap.timeline({ defaults: { ease: "power2.out" } });
  const list = new SplitText("#heroList", { type: "lines" });

  tlHero
    .from("#mainTitle", { x: -100, opacity: 0, duration: 0.9 })
    .from("#heroSubtitle", { x: -100, opacity: 0, duration: 0.8 }, "-=0.4")
    .from(list.lines, { x: -100, opacity: 0, stagger: 0.15, duration: 0.8 }, "-=0.4")
    .from("#heroLink", { opacity: 0, y: 20, duration: 0.9 }, "-=0.3");
});

// ===== ПЕРЕХОД НА ТЁМНУЮ ТЕМУ (начинается на секции «Программы обучения») =====
const header = document.querySelector("#header");

gsap
  .timeline({
    scrollTrigger: {
      trigger: "#programmsSection",
      start: "top 85%",
      end: "top 45%",
      scrub: 1,
      onEnter: () => header.classList.add("dark-mode"),
      onLeaveBack: () => header.classList.remove("dark-mode"),
    },
  })
  .to("body", { backgroundColor: BG_DARK, color: "#fff", ease: "none" });

// ===== ABOUT SECTION =====
gsap
  .timeline({
    scrollTrigger: {
      trigger: "#aboutMeSection",
      start: "top 85%",
      end: "40% 65%",
      scrub: 2,
    },
  })
  .from("#aboutMeTitle", { x: "200%" })
  .from("#aboutMeSubtitle", { x: "200%" }, ">")
  .from("#listAbout", { x: "200%" }, ">");

// ===== ICONS =====
const iconAnimations = [
  { id: "#rockIcon", trigger: "#rockIcon", start: "top 95%" },
  { id: "#manIcon", trigger: "#aboutMeSubtitle", start: "top 85%" },
  { id: "#womanIcon", trigger: "#listAbout", start: "top 80%" },
  { id: "#fireIcon", trigger: "#listAbout", start: "top 80%" },
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
    duration: 1.4,
  });
});

// Плавное появление каждой карточки по отдельности (для мобилок)
function revealEach(selector) {
  gsap.utils.toArray(selector).forEach((el) => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: "top 100%",
        end: "top 80%",
        scrub: 1.5,
      },
      y: 80,
      opacity: 0,
    });
  });
}

const mm = gsap.matchMedia();

// ===== DESKTOP =====
mm.add("(min-width: 769px)", () => {
  gsap
    .timeline({
      scrollTrigger: {
        trigger: "#garancySection",
        start: "top bottom",
        end: "40% 60%",
        scrub: 2,
      },
    })
    .from("#garancyTitle", { x: "150%" })
    .from("#garancySubtitle", { x: "150%" }, ">");

  gsap
    .timeline({
      scrollTrigger: {
        trigger: "#programmsSection",
        start: "top bottom",
        end: "35% 60%",
        scrub: 2,
      },
    })
    .from("#programmTitle", { x: "150%" })
    .from("[data-programm-subtitle='1']", { x: "150%" }, ">");

  gsap.from("[data-garancy-card]", {
    scrollTrigger: {
      trigger: "#garancySection",
      start: "top 90%",
      end: "60% 65%",
      scrub: 2,
    },
    y: "100%",
    opacity: 0,
    stagger: 0.6,
    duration: 1,
  });

  gsap.from("[data-programm]", {
    scrollTrigger: {
      trigger: "#programmsSection",
      start: "top 90%",
      end: "60% 65%",
      scrub: 2,
    },
    y: "100%",
    opacity: 0,
    stagger: 0.6,
    duration: 1,
  });

  gsap.from("#garancyLink", {
    scrollTrigger: {
      trigger: "#garancyLink",
      start: "top 100%",
      end: "top 85%",
      scrub: 2,
    },
    y: 60,
    opacity: 0,
  });
});

// ===== MOBILE =====
mm.add("(max-width: 768px)", () => {
  gsap.from("#garancyTitle", {
    scrollTrigger: { trigger: "#garancyTitle", start: "top 100%", end: "top 75%", scrub: 2 },
    x: "150%",
  });

  gsap.from("#garancySubtitle", {
    scrollTrigger: { trigger: "#garancySubtitle", start: "top 100%", end: "top 75%", scrub: 2 },
    x: "150%",
  });

  revealEach("[data-garancy-card]");
  revealEach("#garancyLink");


  gsap.from("#programmTitle", {
    scrollTrigger: { trigger: "#programmTitle", start: "top 100%", end: "top 75%", scrub: 2 },
    x: "150%",
  });

  gsap.from("[data-programm-subtitle='1']", {
    scrollTrigger: { trigger: "[data-programm-subtitle='1']", start: "top 100%", end: "top 75%", scrub: 2 },
    x: "150%",
  });

  revealEach("[data-programm]");
});

// MOBILE MENU BG
mm.add("(max-width: 1300px)", () => {
  gsap.to("#menuList", {
    backgroundColor: BG_DARK,
    duration: 0.3,
    scrollTrigger: {
      trigger: "#programmsSection",
      start: "top 60%",
      toggleActions: "play none none reverse",
    },
  });
});

// ===== PRICING =====
revealEach("[data-price]");
