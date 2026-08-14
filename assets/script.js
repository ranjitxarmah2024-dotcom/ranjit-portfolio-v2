/* ============================================================
   RANJIT SHARMA — PREMIUM PORTFOLIO INTERACTION SYSTEM
   ============================================================ */

"use strict";

document.addEventListener("DOMContentLoaded", () => {

  /* ==========================================================
     MOBILE NAVIGATION
     ========================================================== */

  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");

  if (navToggle && navMenu) {

    navToggle.addEventListener("click", () => {

      const isOpen = navMenu.classList.toggle("active");

      navToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

    });


    navMenu.querySelectorAll("a").forEach((link) => {

      link.addEventListener("click", () => {

        navMenu.classList.remove("active");

        navToggle.setAttribute(
          "aria-expanded",
          "false"
        );

      });

    });

  }


  /* ==========================================================
     ROTATING HERO TEXT
     ========================================================== */

  const rotatingWord =
    document.getElementById("rotatingWord");

  if (rotatingWord) {

    const words = [
      "Customer Success",
      "Business Development",
      "Sales Leadership",
      "VIP Account Management",
      "Gaming Operations",
      "Team Leadership",
      "AI & Automation",
      "Product Building"
    ];

    let index = 0;

    setInterval(() => {

      rotatingWord.style.opacity = "0";
      rotatingWord.style.transform = "translateY(8px)";

      setTimeout(() => {

        index = (index + 1) % words.length;

        rotatingWord.textContent =
          words[index];

        rotatingWord.style.opacity = "1";
        rotatingWord.style.transform =
          "translateY(0)";

      }, 220);

    }, 2600);

    rotatingWord.style.transition =
      "opacity 220ms ease, transform 220ms ease";

  }


  /* ==========================================================
     NAVBAR SCROLL EFFECT
     ========================================================== */

  const navbar =
    document.getElementById("navbar");

  if (navbar) {

    const updateNavbar = () => {

      if (window.scrollY > 25) {

        navbar.classList.add("navbar-scrolled");

      } else {

        navbar.classList.remove("navbar-scrolled");

      }

    };

    updateNavbar();

    window.addEventListener(
      "scroll",
      updateNavbar,
      { passive: true }
    );

  }


  /* ==========================================================
     ACTIVE NAVIGATION LINK
     ========================================================== */

  const navLinks =
    document.querySelectorAll(".nav-link");

  const sections =
    document.querySelectorAll("main section[id]");

  if (navLinks.length && sections.length) {

    const sectionObserver =
      new IntersectionObserver(
        (entries) => {

          entries.forEach((entry) => {

            if (!entry.isIntersecting) {
              return;
            }

            navLinks.forEach((link) => {

              link.classList.remove("active");

              const target =
                link.getAttribute("href");

              if (
                target === `#${entry.target.id}`
              ) {

                link.classList.add("active");

              }

            });

          });

        },
        {
          rootMargin: "-35% 0px -55% 0px"
        }
      );

    sections.forEach((section) => {
      sectionObserver.observe(section);
    });

  }


  /* ==========================================================
     SCROLL REVEAL
     ========================================================== */

  const revealElements = document.querySelectorAll(
    ".metric-card, " +
    ".highlight-item, " +
    ".timeline-item, " +
    ".skill-card, " +
    ".project-card, " +
    ".contact-card"
  );

  if (
    revealElements.length &&
    !window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
  ) {

    revealElements.forEach((element) => {

      element.classList.add("reveal");

    });


    const revealObserver =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach((entry) => {

            if (!entry.isIntersecting) {
              return;
            }

            entry.target.classList.add(
              "reveal-visible"
            );

            observer.unobserve(entry.target);

          });

        },
        {
          threshold: 0.08,
          rootMargin: "0px 0px -50px 0px"
        }
      );


    revealElements.forEach((element) => {

      revealObserver.observe(element);

    });

  }


  /* ==========================================================
     METRIC COUNTERS
     ========================================================== */

  const metricNumbers =
    document.querySelectorAll(".metric-number");

  if (
    metricNumbers.length &&
    !window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
  ) {

    const animateMetric = (element) => {

      if (element.dataset.animated === "true") {
        return;
      }

      element.dataset.animated = "true";

      const original =
        element.textContent.trim();

      const match =
        original.match(/^([\d.]+)(.*)$/);

      if (!match) {
        return;
      }

      const target =
        parseFloat(match[1]);

      const suffix =
        match[2];

      const hasDecimal =
        match[1].includes(".");

      const duration = 1300;

      const start =
        performance.now();

      const easeOut = (value) =>
        1 - Math.pow(1 - value, 3);


      const frame = (now) => {

        const progress =
          Math.min(
            (now - start) / duration,
            1
          );

        const value =
          target * easeOut(progress);

        element.textContent =
          `${hasDecimal
            ? value.toFixed(1)
            : Math.floor(value)
          }${suffix}`;


        if (progress < 1) {

          requestAnimationFrame(frame);

        } else {

          element.textContent =
            original;

        }

      };

      requestAnimationFrame(frame);

    };


    const metricObserver =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach((entry) => {

            if (!entry.isIntersecting) {
              return;
            }

            animateMetric(entry.target);

            observer.unobserve(entry.target);

          });

        },
        {
          threshold: 0.6
        }
      );


    metricNumbers.forEach((metric) => {

      metricObserver.observe(metric);

    });

  }


  /* ==========================================================
     SMOOTH ANCHOR SCROLLING
     ========================================================== */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach((link) => {

      link.addEventListener("click", (event) => {

        const targetId =
          link.getAttribute("href");

        if (
          !targetId ||
          targetId === "#"
        ) {
          return;
        }

        const target =
          document.querySelector(targetId);

        if (!target) {
          return;
        }

        event.preventDefault();

        const navbarHeight =
          navbar
            ? navbar.offsetHeight
            : 0;

        const targetPosition =
          target.getBoundingClientRect().top +
          window.scrollY -
          navbarHeight -
          15;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth"
        });

      });

    });


  /* ==========================================================
     EXPERIENCE CARD MICRO-INTERACTION
     ========================================================== */

  const timelineCards =
    document.querySelectorAll(
      ".timeline-content"
    );

  timelineCards.forEach((card) => {

    card.addEventListener(
      "mousemove",
      (event) => {

        if (
          window.innerWidth < 768 ||
          window.matchMedia(
            "(prefers-reduced-motion: reduce)"
          ).matches
        ) {
          return;
        }

        const rect =
          card.getBoundingClientRect();

        const x =
          event.clientX - rect.left;

        const y =
          event.clientY - rect.top;

        const rotateX =
          ((y / rect.height) - 0.5) * -2;

        const rotateY =
          ((x / rect.width) - 0.5) * 2;

        card.style.transform =
          `translateY(-5px) perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

      }
    );


    card.addEventListener(
      "mouseleave",
      () => {

        card.style.transform = "";

      }
    );

  });


  /* ==========================================================
     PROJECT CARD MICRO-INTERACTION
     ========================================================== */

  const projectCards =
    document.querySelectorAll(
      ".project-card"
    );

  projectCards.forEach((card) => {

    card.addEventListener(
      "mousemove",
      (event) => {

        if (
          window.innerWidth < 768 ||
          window.matchMedia(
            "(prefers-reduced-motion: reduce)"
          ).matches
        ) {
          return;
        }

        const rect =
          card.getBoundingClientRect();

        const x =
          event.clientX - rect.left;

        const y =
          event.clientY - rect.top;

        const px =
          (x / rect.width) * 100;

        const py =
          (y / rect.height) * 100;

        card.style.setProperty(
          "--mouse-x",
          `${px}%`
        );

        card.style.setProperty(
          "--mouse-y",
          `${py}%`
        );

      }
    );

  });


  /* ==========================================================
     PROFILE IMAGE FALLBACK
     ========================================================== */

  const profileImg =
    document.getElementById("profileImg");

  if (profileImg) {

    profileImg.addEventListener(
      "error",
      () => {

        profileImg.style.opacity = "0.35";

      },
      { once: true }
    );

  }


  /* ==========================================================
     EXTERNAL LINKS
     ========================================================== */

  document
    .querySelectorAll(
      'a[href^="http"]'
    )
    .forEach((link) => {

      link.addEventListener(
        "click",
        () => {

          link.setAttribute(
            "rel",
            "noopener noreferrer"
          );

          link.setAttribute(
            "target",
            "_blank"
          );

        }
      );

    });


  /* ==========================================================
     ESC KEY — CLOSE MOBILE MENU
     ========================================================== */

  document.addEventListener(
    "keydown",
    (event) => {

      if (event.key !== "Escape") {
        return;
      }

      if (
        navMenu &&
        navMenu.classList.contains("active")
      ) {

        navMenu.classList.remove("active");

        if (navToggle) {

          navToggle.setAttribute(
            "aria-expanded",
            "false"
          );

        }

      }

    }
  );


  /* ==========================================================
     PAGE READY
     ========================================================== */

  document.documentElement.classList.add(
    "js-ready"
  );

});