/* ============================================================
   RANJIT SHARMA — PREMIUM PORTFOLIO INTERACTION SYSTEM
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

  /* ==========================================================
     PREMIUM LOADER
     ========================================================== */

  const loader =
    document.getElementById("premiumLoader");

  if (loader) {
    const progress =
      document.getElementById("loaderProgress");

    const percent =
      document.getElementById("loaderPercent");

    let value = 0;

    const timer = setInterval(() => {

      value += Math.floor(Math.random() * 12) + 4;

      if (value >= 100) {
        value = 100;
        clearInterval(timer);

        setTimeout(() => {

          loader.classList.add("loader-hidden");

          document.body.classList.add("site-loaded");

          setTimeout(() => {
            loader.remove();
          }, 800);

        }, 350);
      }

      if (progress) {
        progress.style.width = `${value}%`;
      }

      if (percent) {
        percent.textContent = `${value}%`;
      }

    }, 80);
  }


  /* ==========================================================
     NAVIGATION
     ========================================================== */

  const navbar =
    document.getElementById("navbar");

  const navToggle =
    document.getElementById("navToggle");

  const navMenu =
    document.getElementById("navMenu");

  if (navToggle && navMenu) {

    navToggle.addEventListener("click", () => {

      const active =
        navMenu.classList.toggle("active");

      navToggle.setAttribute(
        "aria-expanded",
        active ? "true" : "false"
      );

    });

    navMenu
      .querySelectorAll("a")
      .forEach(link => {

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
     NAVBAR SCROLL
     ========================================================== */

  const handleNavbar = () => {

    if (!navbar) return;

    navbar.classList.toggle(
      "navbar-scrolled",
      window.scrollY > 30
    );

  };

  handleNavbar();

  window.addEventListener(
    "scroll",
    handleNavbar,
    { passive: true }
  );


  /* ==========================================================
     SCROLL PROGRESS
     ========================================================== */

  let progressBar =
    document.querySelector(".scroll-progress");

  if (!progressBar) {

    progressBar =
      document.createElement("div");

    progressBar.className =
      "scroll-progress";

    document.body.appendChild(progressBar);

  }

  const updateProgress = () => {

    const scrollTop =
      window.scrollY ||
      document.documentElement.scrollTop;

    const scrollHeight =
      document.documentElement.scrollHeight -
      window.innerHeight;

    const progress =
      scrollHeight > 0
        ? (scrollTop / scrollHeight) * 100
        : 0;

    progressBar.style.width =
      `${progress}%`;

  };

  updateProgress();

  window.addEventListener(
    "scroll",
    updateProgress,
    { passive: true }
  );


  /* ==========================================================
     ROTATING HERO WORDS
     ========================================================== */

  const rotatingWord =
    document.getElementById("rotatingWord");

  const words = [
    "Customer Success",
    "Business Growth",
    "High-Performance Teams",
    "Customer Experience",
    "Revenue Operations",
    "Digital Products",
    "AI Solutions"
  ];

  let wordIndex = 0;

  if (rotatingWord) {

    setInterval(() => {

      rotatingWord.style.opacity = "0";

      rotatingWord.style.transform =
        "translateY(8px)";

      setTimeout(() => {

        wordIndex =
          (wordIndex + 1) % words.length;

        rotatingWord.textContent =
          words[wordIndex];

        rotatingWord.style.opacity = "1";

        rotatingWord.style.transform =
          "translateY(0)";

      }, 220);

    }, 2300);

  }


  /* ==========================================================
     ANIMATED METRICS
     ========================================================== */

  const metricNumbers =
    document.querySelectorAll(
      ".metric-number"
    );

  const animateMetric = element => {

    if (element.dataset.animated === "true")
      return;

    element.dataset.animated = "true";

    const original =
      element.textContent.trim();

    const match =
      original.match(
        /^([\d.]+)(.*)$/
      );

    if (!match) return;

    const target =
      parseFloat(match[1]);

    const suffix =
      match[2];

    const decimal =
      match[1].includes(".")
        ? match[1].split(".")[1].length
        : 0;

    const duration = 1400;

    const start =
      performance.now();

    const update = now => {

      const elapsed =
        now - start;

      const progress =
        Math.min(
          elapsed / duration,
          1
        );

      const eased =
        1 -
        Math.pow(
          1 - progress,
          3
        );

      const current =
        target * eased;

      element.textContent =
        current.toFixed(decimal) +
        suffix;

      if (progress < 1) {

        requestAnimationFrame(
          update
        );

      } else {

        element.textContent =
          original;

      }

    };

    requestAnimationFrame(update);

  };


  if ("IntersectionObserver" in window) {

    const metricObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (
              entry.isIntersecting
            ) {

              animateMetric(
                entry.target
              );

              metricObserver.unobserve(
                entry.target
              );

            }

          });

        },
        {
          threshold: .6
        }
      );

    metricNumbers.forEach(metric => {

      metricObserver.observe(metric);

    });

  } else {

    metricNumbers.forEach(
      animateMetric
    );

  }


  /* ==========================================================
     SCROLL REVEAL
     ========================================================== */

  const revealElements =
    document.querySelectorAll(
      ".section, .metric-card, .timeline-item, .skill-card, .project-card, .highlight-item, .contact-card"
    );

  if ("IntersectionObserver" in window) {

    const revealObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (
              entry.isIntersecting
            ) {

              entry.target.classList.add(
                "reveal-visible"
              );

              revealObserver.unobserve(
                entry.target
              );

            }

          });

        },
        {
          threshold: .08,
          rootMargin:
            "0px 0px -50px 0px"
        }
      );

    revealElements.forEach(element => {

      element.classList.add(
        "reveal"
      );

      revealObserver.observe(
        element
      );

    });

  } else {

    revealElements.forEach(element => {

      element.classList.add(
        "reveal-visible"
      );

    });

  }


  /* ==========================================================
     PREMIUM CARD TILT
     ========================================================== */

  const tiltCards =
    document.querySelectorAll(
      ".project-card, .skill-card, .metric-card"
    );

  const isTouchDevice =
    window.matchMedia(
      "(hover: none)"
    ).matches;

  if (!isTouchDevice) {

    tiltCards.forEach(card => {

      card.addEventListener(
        "mousemove",
        event => {

          const rect =
            card.getBoundingClientRect();

          const x =
            event.clientX -
            rect.left;

          const y =
            event.clientY -
            rect.top;

          const centerX =
            rect.width / 2;

          const centerY =
            rect.height / 2;

          const rotateX =
            ((y - centerY) /
              centerY) * -2.5;

          const rotateY =
            ((x - centerX) /
              centerX) * 2.5;

          card.style.transform =
            `perspective(900px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-6px)`;

        }
      );

      card.addEventListener(
        "mouseleave",
        () => {

          card.style.transform =
            "";

        }
      );

    });

  }


  /* ==========================================================
     CURSOR GLOW
     ========================================================== */

  if (!isTouchDevice) {

    let glow =
      document.querySelector(
        ".premium-cursor-glow"
      );

    if (!glow) {

      glow =
        document.createElement("div");

      glow.className =
        "premium-cursor-glow";

      document.body.appendChild(
        glow
      );

    }

    let mouseX = 0;
    let mouseY = 0;

    let currentX = 0;
    let currentY = 0;

    document.addEventListener(
      "mousemove",
      event => {

        mouseX =
          event.clientX;

        mouseY =
          event.clientY;

      },
      { passive: true }
    );

    const animateGlow = () => {

      currentX +=
        (mouseX - currentX) *
        .12;

      currentY +=
        (mouseY - currentY) *
        .12;

      glow.style.transform =
        `translate3d(
          ${currentX - 150}px,
          ${currentY - 150}px,
          0
        )`;

      requestAnimationFrame(
        animateGlow
      );

    };

    animateGlow();

  }


  /* ==========================================================
     ACTIVE NAVIGATION
     ========================================================== */

  const sections =
    document.querySelectorAll(
      "main section[id]"
    );

  const navLinks =
    document.querySelectorAll(
      ".nav-link"
    );

  if (
    sections.length &&
    navLinks.length &&
    "IntersectionObserver" in window
  ) {

    const sectionObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (
              !entry.isIntersecting
            )
              return;

            const id =
              entry.target.getAttribute(
                "id"
              );

            navLinks.forEach(link => {

              link.classList.remove(
                "active"
              );

              if (
                link.getAttribute(
                  "href"
                ) === `#${id}`
              ) {

                link.classList.add(
                  "active"
                );

              }

            });

          });

        },
        {
          rootMargin:
            "-30% 0px -55% 0px"
        }
      );

    sections.forEach(section => {

      sectionObserver.observe(
        section
      );

    });

  }


  /* ==========================================================
     SMOOTH ANCHORS
     ========================================================== */

  document
    .querySelectorAll(
      'a[href^="#"]'
    )
    .forEach(link => {

      link.addEventListener(
        "click",
        event => {

          const targetId =
            link.getAttribute(
              "href"
            );

          if (
            !targetId ||
            targetId === "#"
          )
            return;

          const target =
            document.querySelector(
              targetId
            );

          if (!target) return;

          event.preventDefault();

          const offset =
            navbar
              ? navbar.offsetHeight
              : 0;

          const position =
            target.getBoundingClientRect()
              .top +
            window.scrollY -
            offset -
            15;

          window.scrollTo({
            top: position,
            behavior: "smooth"
          });

        }
      );

    });


  /* ==========================================================
     MAGNETIC BUTTONS
     ========================================================== */

  if (!isTouchDevice) {

    document
      .querySelectorAll(
        ".btn, .link-btn"
      )
      .forEach(button => {

        button.addEventListener(
          "mousemove",
          event => {

            const rect =
              button.getBoundingClientRect();

            const x =
              event.clientX -
              rect.left -
              rect.width / 2;

            const y =
              event.clientY -
              rect.top -
              rect.height / 2;

            button.style.transform =
              `translate(
                ${x * .08}px,
                ${y * .08}px
              )`;

          }
        );

        button.addEventListener(
          "mouseleave",
          () => {

            button.style.transform =
              "";

          }
        );

      });

  }


  /* ==========================================================
     PROFILE IMAGE FALLBACK
     ========================================================== */

  const profileImg =
    document.getElementById(
      "profileImg"
    );

  if (profileImg) {

    profileImg.addEventListener(
      "error",
      () => {

        profileImg.style.display =
          "none";

        const ring =
          profileImg.closest(
            ".image-ring"
          );

        if (ring) {

          ring.classList.add(
            "image-missing"
          );

        }

      }
    );

  }


  /* ==========================================================
     ESCAPE MOBILE MENU
     ========================================================== */

  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Escape" &&
        navMenu &&
        navToggle
      ) {

        navMenu.classList.remove(
          "active"
        );

        navToggle.setAttribute(
          "aria-expanded",
          "false"
        );

      }

    }
  );
/* ==========================================================
   BACK TO TOP
   ========================================================== */

const backToTop =
  document.createElement("button");

backToTop.className =
  "back-to-top";

backToTop.type =
  "button";

backToTop.setAttribute(
  "aria-label",
  "Back to top"
);

backToTop.innerHTML =
  '<i class="fa-solid fa-arrow-up"></i>';

document.body.appendChild(
  backToTop
);

const updateBackToTop = () => {

  if (window.scrollY > 600) {

    backToTop.classList.add(
      "visible"
    );

  } else {

    backToTop.classList.remove(
      "visible"
    );

  }

};

updateBackToTop();

window.addEventListener(
  "scroll",
  updateBackToTop,
  { passive: true }
);

backToTop.addEventListener(
  "click",
  () => {

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }
);

  /* ==========================================================
     PAGE READY
     ========================================================== */

  document.body.classList.add(
    "portfolio-ready"
  );

});