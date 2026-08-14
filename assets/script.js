/* =========================================================
   PREMIUM INTERACTION ENGINE
   Ranjit Sharma Portfolio 2.0
========================================================= */

document.addEventListener('DOMContentLoaded', () => {

    // 1. MOUSE GLOW EFFECT (GLOBAL)
    const body = document.body;
    window.addEventListener('mousemove', (e) => {
        body.style.setProperty('--mouse-x', `${e.clientX}px`);
        body.style.setProperty('--mouse-y', `${e.clientY}px`);
    });


    // 2. HERO TEXT ROTATOR
    const rotatingWord = document.querySelector('.rotating-word');
    if (rotatingWord) {
        const words = JSON.parse(rotatingWord.getAttribute('data-words'));
        let currentIndex = 0;

        setInterval(() => {
            rotatingWord.classList.add('word-exit');
            
            setTimeout(() => {
                currentIndex = (currentIndex + 1) % words.length;
                rotatingWord.textContent = words[currentIndex];
                rotatingWord.classList.remove('word-exit');
                rotatingWord.classList.add('word-enter');
                
                setTimeout(() => {
                    rotatingWord.classList.remove('word-enter');
                }, 450);
            }, 300);
        }, 3500);
    }


    // 3. PROJECT SPOTLIGHT EFFECT
    const spotlightCards = document.querySelectorAll('.project-card, .building-card');
    spotlightCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--spot-x', `${x}px`);
            card.style.setProperty('--spot-y', `${y}px`);
        });
    });


    // 4. SCROLL REVEAL SYSTEM
    const revealElements = document.querySelectorAll('section, .impact-card, .timeline-item, .skill-group, .project-card, .profile-link-card');
    revealElements.forEach(el => el.classList.add('reveal'));

    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.85;
        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            if (elTop < triggerBottom) {
                el.classList.add('visible');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check


    // 5. TIMELINE PROGRESS TRACKER
    const timeline = document.querySelector('.timeline');
    if (timeline) {
        const progress = document.createElement('div');
        progress.className = 'timeline-progress';
        timeline.appendChild(progress);

        window.addEventListener('scroll', () => {
            const rect = timeline.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (rect.top < windowHeight && rect.bottom > 0) {
                const totalHeight = rect.height;
                const visibleHeight = windowHeight - rect.top;
                const progressPercentage = Math.min(Math.max((visibleHeight / totalHeight) * 100, 0), 100);
                progress.style.height = `${progressPercentage}%`;
            }
        });
    }


    // 6. PREMIUM NAV & ACTIVE STATE
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a');
    const header = document.querySelector('header');
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('mobile-open');
            menuToggle.innerHTML = mainNav.classList.contains('mobile-open') 
                ? '<i class="fas fa-xmark"></i>' 
                : '<i class="fas fa-bars"></i>';
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('mobile-open');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }

    window.addEventListener('scroll', () => {
        // Header background transition
        if (window.scrollY > 50) {
            header.style.background = "rgba(5, 11, 20, 0.92)";
            header.style.boxShadow = "0 10px 40px rgba(0,0,0,0.3)";
        } else {
            header.style.background = "rgba(5, 11, 20, 0.78)";
            header.style.boxShadow = "none";
        }

        // Active link tracking
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 120) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });


    // 7. COUNTER ANIMATION
    const counters = document.querySelectorAll('.impact-card strong');
    const animateCounters = () => {
        counters.forEach(counter => {
            const target = parseFloat(counter.innerText.replace(/[^0-9.]/g, ''));
            const suffix = counter.innerText.replace(/[0-9.]/g, '');
            let count = 0;
            const speed = 2000 / target;

            const updateCount = () => {
                const increment = target / 100;
                if (count < target) {
                    count += increment;
                    counter.innerText = Math.ceil(count) + suffix;
                    setTimeout(updateCount, 1);
                } else {
                    counter.innerText = target + suffix;
                }
            };

            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    updateCount();
                    observer.unobserve(counter);
                }
            }, { threshold: 0.5 });

            observer.observe(counter);
        });
    };
    animateCounters();


    // 8. SMOOTH SCROLLING (ENHANCED)
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

});
