document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       LOADER
    ========================= */

    window.addEventListener("load", () => {
        const loader = document.querySelector(".loader");

        setTimeout(() => {
            if (loader) {
                loader.classList.add("hide");
            }
        }, 800);
    });


    /* =========================
       NAVBAR SCROLL EFFECT
    ========================= */

    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

    });


    /* =========================
       MOBILE MENU
    ========================= */

    const menuBtn = document.querySelector(".menu-btn");
    const navLinks = document.querySelector(".nav-links");

    if (menuBtn && navLinks) {

        menuBtn.addEventListener("click", () => {

            navLinks.classList.toggle("active");

            if (navLinks.classList.contains("active")) {
                menuBtn.textContent = "✕";
                menuBtn.setAttribute("aria-label", "Close navigation");
            } else {
                menuBtn.textContent = "☰";
                menuBtn.setAttribute("aria-label", "Open navigation");
            }

        });


        /* Close menu after clicking a link */

        navLinks.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("active");

                menuBtn.textContent = "☰";
                menuBtn.setAttribute("aria-label", "Open navigation");

            });

        });

    }


    /* =========================
       SMOOTH SCROLL
    ========================= */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    /* =========================
       SCROLL REVEAL
    ========================= */

    const revealElements = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("active");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );


    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    /* =========================
       COUNTDOWN
    ========================= */

    const eventDate = new Date(
        "2026-09-27T10:00:00+05:30"
    ).getTime();

    const daysElement = document.getElementById("days");
    const hoursElement = document.getElementById("hours");
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");


    function updateCountdown() {

        const now = new Date().getTime();

        const distance = eventDate - now;


        if (distance <= 0) {

            if (daysElement) daysElement.textContent = "00";
            if (hoursElement) hoursElement.textContent = "00";
            if (minutesElement) minutesElement.textContent = "00";
            if (secondsElement) secondsElement.textContent = "00";

            return;
        }


        const days = Math.floor(
            distance / (1000 * 60 * 60 * 24)
        );

        const hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24))
            / (1000 * 60 * 60)
        );

        const minutes = Math.floor(
            (distance % (1000 * 60 * 60))
            / (1000 * 60)
        );

        const seconds = Math.floor(
            (distance % (1000 * 60))
            / 1000
        );


        if (daysElement) {
            daysElement.textContent =
                String(days).padStart(2, "0");
        }

        if (hoursElement) {
            hoursElement.textContent =
                String(hours).padStart(2, "0");
        }

        if (minutesElement) {
            minutesElement.textContent =
                String(minutes).padStart(2, "0");
        }

        if (secondsElement) {
            secondsElement.textContent =
                String(seconds).padStart(2, "0");
        }

    }


    updateCountdown();

    setInterval(updateCountdown, 1000);


    /* =========================
       PARTICLES
    ========================= */

    function createParticles() {

        const particleCount = 35;

        for (let i = 0; i < particleCount; i++) {

            const particle = document.createElement("div");

            particle.classList.add("particle");

            particle.style.left =
                Math.random() * 100 + "%";

            particle.style.animationDuration =
                (Math.random() * 10 + 8) + "s";

            particle.style.animationDelay =
                (Math.random() * 8) + "s";

            particle.style.opacity =
                Math.random() * 0.35 + 0.1;

            document.body.appendChild(particle);

        }

    }


    createParticles();


    /* =========================
       EVENT CARD 3D EFFECT
    ========================= */

    const eventCards =
        document.querySelectorAll(".event-card");


    eventCards.forEach(card => {

        card.addEventListener("mousemove", event => {

            const rect = card.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;


            const centerX = rect.width / 2;
            const centerY = rect.height / 2;


            const rotateX =
                ((y - centerY) / centerY) * -4;

            const rotateY =
                ((x - centerX) / centerX) * 4;


            card.style.transform =
                `perspective(900px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-5px)`;

        });


        card.addEventListener("mouseleave", () => {

            card.style.transform =
                "perspective(900px) rotateX(0) rotateY(0) translateY(0)";

        });

    });


    /* =========================
       CHARACTER IMAGE EFFECT
    ========================= */

    const characters =
        document.querySelectorAll(".character");


    characters.forEach(character => {

        const image =
            character.querySelector("img");


        character.addEventListener("mousemove", event => {

            if (!image) return;

            const rect =
                character.getBoundingClientRect();


            const x =
                ((event.clientX - rect.left) / rect.width - 0.5) * 8;

            const y =
                ((event.clientY - rect.top) / rect.height - 0.5) * 8;


            image.style.transform =
                `scale(1.08) translate(${x}px, ${y}px)`;

        });


        character.addEventListener("mouseleave", () => {

            if (!image) return;

            image.style.transform =
                "scale(1) translate(0, 0)";

        });

    });


    /* =========================
       REGISTRATION FORM
    ========================= */

    const registrationForm =
        document.getElementById("registrationForm");


    if (registrationForm) {

        registrationForm.addEventListener("submit", event => {

            event.preventDefault();


            const name =
                document.getElementById("name").value.trim();

            const email =
                document.getElementById("email").value.trim();

            const college =
                document.getElementById("college").value.trim();


            if (!name || !email || !college) {

                alert(
                    "Please complete all fields before registering."
                );

                return;
            }


            alert(
                `Welcome to the Assembly, ${name}! ⚡\n\n` +
                "Your registration has been received."
            );


            registrationForm.reset();

        });

    }


    /* =========================
       BUTTON RIPPLE EFFECT
    ========================= */

    const buttons =
        document.querySelectorAll(".btn");


    buttons.forEach(button => {

        button.addEventListener("click", event => {

            const ripple =
                document.createElement("span");

            ripple.classList.add("ripple");


            const rect =
                button.getBoundingClientRect();


            const size =
                Math.max(rect.width, rect.height);


            ripple.style.width = size + "px";
            ripple.style.height = size + "px";


            ripple.style.left =
                (event.clientX - rect.left - size / 2) + "px";

            ripple.style.top =
                (event.clientY - rect.top - size / 2) + "px";


            button.appendChild(ripple);


            setTimeout(() => {
                ripple.remove();
            }, 600);

        });

    });


    /* =========================
       ACTIVE NAVIGATION
    ========================= */

    const sections =
        document.querySelectorAll("section[id]");

    const navigationLinks =
        document.querySelectorAll(".nav-links a");


    function updateActiveNav() {

        let currentSection = "";


        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 150;

            const sectionHeight =
                section.offsetHeight;


            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navigationLinks.forEach(link => {

            link.classList.remove("active");

            const href =
                link.getAttribute("href");


            if (href === `#${currentSection}`) {
                link.classList.add("active");
            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveNav
    );


    updateActiveNav();


    /* =========================
       ESCAPE KEY
    ========================= */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            if (
                navLinks &&
                navLinks.classList.contains("active")
            ) {

                navLinks.classList.remove("active");

                menuBtn.textContent = "☰";

            }

        }

    });


    /* =========================
       RIPPLE CSS
    ========================= */

    const rippleStyle =
        document.createElement("style");


    rippleStyle.textContent = `
        .btn {
            position: relative;
            overflow: hidden;
        }

        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.35);
            transform: scale(0);
            animation: rippleEffect 0.6s linear;
            pointer-events: none;
        }

        @keyframes rippleEffect {
            to {
                transform: scale(12);
                opacity: 0;
            }
        }

        .nav-links a.active {
            color: #e62429;
        }

        .nav-links a.active::after {
            width: 100%;
        }
    `;


    document.head.appendChild(rippleStyle);


    /* =========================
       CONSOLE MESSAGE
    ========================= */

    console.log(
        "%c⚡ MARVEL × GFG | HEROES OF CODE",
        "color:#e62429;font-size:18px;font-weight:bold;"
    );

    console.log(
        "%cBuilt for GeeksForGeeks Student Chapter × Bennett University",
        "color:#888;font-size:12px;"
    );

});