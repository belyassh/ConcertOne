const SITE_CONFIG = {
  artist: "Gorilla Glue",
  guest: "Lil Nakur",
  headliner: "Gorilla Glue",
  city: "Санкт-Петербург",
  venue: "A2 Green Concert",
  eventDateISO: "2026-09-12T19:00:00+03:00",
  eventDateLabel: "12 сентября 2026",
  ticketUrl: "https://example.com/tickets",
  tickerText: "GORILLA GLUE • LIL NAKUR • SPECIAL LIVE SET • AFTERPARTY • VIP ZONE • "
};

function bindTextContent(config) {
  Object.entries(config).forEach(([key, value]) => {
    document.querySelectorAll(`[data-bind="${key}"]`).forEach((node) => {
      node.textContent = value;
    });

    document.querySelectorAll(`[data-bind-href="${key}"]`).forEach((node) => {
      node.setAttribute("href", value);
      node.setAttribute("target", "_blank");
      node.setAttribute("rel", "noopener noreferrer");
    });
  });
}

function updateCountdown(targetISO) {
  const ids = ["days", "hours", "minutes", "seconds"];
  const nodes = ids.map((id) => document.getElementById(id));

  function tick() {
    const now = Date.now();
    const target = new Date(targetISO).getTime();
    const diff = Math.max(0, target - now);

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    [days, hours, minutes, seconds].forEach((value, index) => {
      if (!nodes[index]) return;
      nodes[index].textContent = String(value).padStart(2, "0");
    });
  }

  tick();
  setInterval(tick, 1000);
}

function setupMobileMenu() {
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.getElementById("mobileMenu");
  const links = menu ? Array.from(menu.querySelectorAll("a")) : [];

  if (!toggle || !menu) return;

  function closeMenu() {
    menu.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
  }

  toggle.addEventListener("click", () => {
    const isOpen = !menu.hidden;
    menu.hidden = isOpen;
    toggle.setAttribute("aria-expanded", String(!isOpen));
  });

  links.forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
}

function setupRevealAnimation() {
  const sections = document.querySelectorAll(".section-reveal");
  if (!sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  sections.forEach((section, index) => {
    section.style.transitionDelay = `${index * 80}ms`;
    observer.observe(section);
  });
}

function init() {
  bindTextContent(SITE_CONFIG);
  updateCountdown(SITE_CONFIG.eventDateISO);
  setupMobileMenu();
  setupRevealAnimation();

  const yearNode = document.getElementById("year");
  if (yearNode) yearNode.textContent = String(new Date().getFullYear());
}

init();
