document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initScrollReveal();
  initContactForm();
});

function initNavigation() {
  const nav = document.querySelector(".nav");
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");

  if (!nav) return;
  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 10);
  });

  if (!toggle || !links) return;

  // Ensure the menu has an id so it can be referenced by aria-controls
  const menuId = links.id || "nav-links";
  if (!links.id) {
    links.id = menuId;
  }

  // Initialize ARIA attributes for accessibility
  toggle.setAttribute("aria-controls", menuId);
  toggle.setAttribute("aria-expanded", "false");

  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("open");
    toggle.classList.toggle("active", isOpen);
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  links.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      toggle.classList.remove("active");
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function initScrollReveal() {
  const elements = document.querySelectorAll(".reveal");

  if (!elements.length) return;

  if (!("IntersectionObserver" in window)) {
    elements.forEach((el) => el.classList.add("revealed"));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );

  elements.forEach((el) => observer.observe(el));
}

function initContactForm() {
  const form = document.querySelector(".contact-form");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const button = form.querySelector(".form-submit");
    const originalText = button.textContent;
    button.textContent = "Message Sent!";
    button.style.background = "#10B981";
    setTimeout(() => {
      button.textContent = originalText;
      button.style.background = "";
      form.reset();
    }, 2000);
  });
}
