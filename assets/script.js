/* ============================================================
   RANJIT SHARMA — PREMIUM PORTFOLIO INTERACTION SYSTEM
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

  /* ==========================================================
     NAVIGATION
     ========================================================== */

  const navbar = document.getElementById("navbar");
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");

  if (navToggle && navMenu) {

    navToggle.addEventListener("click", () => {

      const active = navMenu.classList.toggle("active");

      navToggle.setAttribute(
        "aria-expanded",
        active ? "true" : "false"
      );

    });

    navMenu.querySelectorAll("a").forEach(link => {

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
     NAVBAR SCROLL EFFECT
     ========================================================== */

  const handleNavbar = () => {

    if (!navbar) return;

    if (window.scrollY > 30) {

      navbar.classList.add("navbar-scrolled");

    } else {

      navbar.classList.remove("navbar-scrolled");

    }

  };

  handleNavbar();

  window.addEventListener(
    "scroll",
    handleNavbar,
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

            if (entry.isIntersecting) {

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
          threshold: 0.08,
          rootMargin: "0px 0px -50px 0px"
        }
      );

    revealElements.forEach(element => {

      element.classList.add("reveal");

      revealObserver.observe(element);

    });

  } else {

    revealElements.forEach(element => {

      element.classList.add(
        "reveal-visible"
      );

    });

  }


  /* ==========================================================
     PREMIUM CARD MOUSE TILT
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
            event.clientX - rect.left;

          const y =
            event.clientY - rect.top;

          const centerX =
            rect.width / 2;

          const centerY =
            rect.height / 2;

          const rotateX =
            ((y - centerY) / centerY) * -2.5;

          const rotateY =
            ((x - centerX) / centerX) * 2.5;

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

          card.style.transform = "";

        }
      );

    });

  }


  /* ==========================================================
     CURSOR GLOW
     ========================================================== */

  if (!isTouchDevice) {

    const glow =
      document.createElement("div");

    glow.className =
      "premium-cursor-glow";

    document.body.appendChild(glow);

    let mouseX = 0;
    let mouseY = 0;

    let currentX = 0;
    let currentY = 0;

    document.addEventListener(
      "mousemove",
      event => {

        mouseX = event.clientX;
        mouseY = event.clientY;

      },
      { passive: true }
    );

    const animateGlow = () => {

      currentX +=
        (mouseX - currentX) * 0.12;

      currentY +=
        (mouseY - currentY) * 0.12;

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
     ACTIVE SECTION NAVIGATION
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

            if (!entry.isIntersecting)
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
                link.getAttribute("href") ===
                `#${id}`
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

      sectionObserver.observe(section);

    });

  }


  /* ==========================================================
     SMOOTH ANCHOR NAVIGATION
     ========================================================== */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

      link.addEventListener(
        "click",
        event => {

          const targetId =
            link.getAttribute("href");

          if (
            !targetId ||
            targetId === "#"
          ) {
            return;
          }

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
     IMAGE ERROR FALLBACK
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
     MAGNETIC BUTTON EFFECT
     ========================================================== */

  if (!isTouchDevice) {

    const buttons =
      document.querySelectorAll(
        ".btn, .link-btn"
      );

    buttons.forEach(button => {

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
              ${x * 0.08}px,
              ${y * 0.08}px
            )`;

        }
      );

      button.addEventListener(
        "mouseleave",
        () => {

          button.style.transform = "";

        }
      );

    });

  }


  /* ==========================================================
     KEYBOARD ACCESSIBILITY
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
     PREMIUM PAGE READY
     ========================================================== */

  document.body.classList.add(
    "portfolio-ready"
  );

});