// Custom Cursor
const dot = document.getElementById("cursorDot");
const outline = document.getElementById("cursorOutline");
let mouseX = 0, mouseY = 0, outX = 0, outY = 0;

document.addEventListener("mousemove", e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  dot.style.left = mouseX + "px";
  dot.style.top = mouseY + "px";
});

function animateOutline() {
  outX += (mouseX - outX) * 0.15;
  outY += (mouseY - outY) * 0.15;
  outline.style.left = outX + "px";
  outline.style.top = outY + "px";
  requestAnimationFrame(animateOutline);
}
animateOutline();

// Show cursor on page load immediately
dot.style.opacity = "1";
outline.style.opacity = "1";

document.querySelectorAll("a, button, .project-card, .skill-category, .ach-card, .contact-item").forEach(el => {
  el.addEventListener("mouseenter", () => {
    outline.style.width = "56px";
    outline.style.height = "56px";
    outline.style.borderColor = "rgba(99,102,241,0.9)";
    dot.style.transform = "translate(-50%,-50%) scale(1.5)";
  });
  el.addEventListener("mouseleave", () => {
    outline.style.width = "36px";
    outline.style.height = "36px";
    outline.style.borderColor = "rgba(99,102,241,0.6)";
    dot.style.transform = "translate(-50%,-50%) scale(1)";
  });
});

// Floating Particles
const bg = document.getElementById("particles-bg");
for (let i = 0; i < 35; i++) {
  const p = document.createElement("div");
  p.classList.add("particle");
  const size = Math.random() * 4 + 2;
  p.style.cssText = `
    width:${size}px; height:${size}px;
    left:${Math.random() * 100}%;
    animation-duration:${Math.random() * 15 + 8}s;
    animation-delay:${Math.random() * 10}s;
    background: ${Math.random() > 0.5 ? "#6366f1" : "#a855f7"};
  `;
  bg.appendChild(p);
}

// Navbar scroll
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 50);
});

// Hamburger
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});
navLinks.querySelectorAll(".nav-link").forEach(l => {
  l.addEventListener("click", () => navLinks.classList.remove("open"));
});

// Typewriter
const words = [
  "end-to-end AI systems.",
  "Computer Vision models.",
  "NLP pipelines.",
  "RL agents.",
  "Explainable AI.",
  "GAN architectures.",
  "published research."
];
let wordIdx = 0, charIdx = 0, deleting = false;
const tw = document.getElementById("typewriter");

function typeLoop() {
  const word = words[wordIdx];
  if (!deleting) {
    tw.textContent = word.slice(0, charIdx + 1);
    charIdx++;
    if (charIdx === word.length) {
      setTimeout(() => deleting = true, 1800);
      setTimeout(typeLoop, 100);
    } else {
      setTimeout(typeLoop, 80);
    }
  } else {
    tw.textContent = word.slice(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) {
      deleting = false;
      wordIdx = (wordIdx + 1) % words.length;
      setTimeout(typeLoop, 400);
    } else {
      setTimeout(typeLoop, 45);
    }
  }
}
typeLoop();

// Scroll Reveal
const revealEls = document.querySelectorAll(".section, .project-card, .skill-category, .ach-card, .stat-card, .timeline-item, .contact-item");
revealEls.forEach(el => el.classList.add("reveal"));
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add("visible"), i * 80);
    }
  });
}, { threshold: 0.1 });
revealEls.forEach(el => revealObserver.observe(el));

// Project Filters
const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");
filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.dataset.filter;
    projectCards.forEach(card => {
      const cats = card.dataset.category || "";
      if (filter === "all" || cats.includes(filter)) {
        card.classList.remove("hidden");
      } else {
        card.classList.add("hidden");
      }
    });
  });
});

// Active nav highlight on scroll
const sections = document.querySelectorAll("section[id]");
window.addEventListener("scroll", () => {
  const y = window.scrollY + 100;
  sections.forEach(sec => {
    const link = document.querySelector(`.nav-link[href="#${sec.id}"]`);
    if (!link) return;
    if (y >= sec.offsetTop && y < sec.offsetTop + sec.offsetHeight) {
      link.style.color = "var(--accent)";
    } else {
      link.style.color = "";
    }
  });
});
