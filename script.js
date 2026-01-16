// ---------- Helpers ----------
const $ = (q) => document.querySelector(q);
const $$ = (q) => Array.from(document.querySelectorAll(q));

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  $("#themeIcon").textContent = theme === "light" ? "🌞" : "🌙";
}

// ---------- Theme ----------
const saved = localStorage.getItem("theme");
if (saved) setTheme(saved);

// Default theme: dark
if (!saved) setTheme("dark");

$("#themeBtn").addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme") || "dark";
  setTheme(current === "dark" ? "light" : "dark");
});

// ---------- Mobile menu ----------
$("#hamburger").addEventListener("click", () => {
  $("#mobileMenu").classList.toggle("show");
});

// Close mobile menu on click
$$(".mobile a").forEach(a => a.addEventListener("click", () => {
  $("#mobileMenu").classList.remove("show");
}));

// ---------- Scroll progress ----------
window.addEventListener("scroll", () => {
  const h = document.documentElement;
  const scrolled = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
  $("#progress").style.width = `${scrolled}%`;
});

// ---------- Scroll reveal ----------
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add("visible");
  });
}, { threshold: 0.12 });

$$(".reveal").forEach(el => io.observe(el));

// ---------- Footer year ----------
$("#year").textContent = new Date().getFullYear();

// ---------- Project filtering ----------
const chips = $$(".chip");
const cards = $$(".project");

chips.forEach(btn => {
  btn.addEventListener("click", () => {
    chips.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const f = btn.dataset.filter;
    cards.forEach(card => {
      const tags = card.dataset.tags || "";
      const show = f === "all" ? true : tags.includes(f);
      card.style.display = show ? "block" : "none";
    });
  });
});

// ---------- Contact: mailto ----------
function handleContact(e) {
  e.preventDefault();
  const data = new FormData(e.target);
  const name = data.get("name");
  const email = data.get("email");
  const message = data.get("message");

  const subject = encodeURIComponent(`Portfolio Contact — ${name}`);
  const body = encodeURIComponent(`From: ${name} (${email})\n\n${message}\n\n— Sent via portfolio site`);
  window.location.href = `mailto:rishabpnambiar@google.com?subject=${subject}&body=${body}`;
  return false;
}
window.handleContact = handleContact;
