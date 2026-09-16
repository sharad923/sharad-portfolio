const body = document.body;
const toggle = document.getElementById("themeToggle");
const progress = document.getElementById("progress");
const glow = document.getElementById("cursorGlow");

toggle.addEventListener("click", () => {
  body.classList.toggle("light");
  toggle.textContent = body.classList.contains("light") ? "☾" : "☼";
});

window.addEventListener("scroll", () => {
  const top = window.scrollY;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${height ? (top / height) * 100 : 0}%`;
});

window.addEventListener("pointermove", (e) => {
  if (window.innerWidth > 900) {
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  }
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

document.querySelectorAll(".magnetic").forEach((el) => {
  el.addEventListener("mousemove", (e) => {
    if (window.innerWidth < 900) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * 0.12;
    const y = (e.clientY - r.top - r.height / 2) * 0.12;
    el.style.transform = `translate(${x}px, ${y}px)`;
  });
  el.addEventListener("mouseleave", () => {
    el.style.transform = "";
  });
});
