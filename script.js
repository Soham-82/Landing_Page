document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector("[data-nav-links]");
  const bookingForm = document.querySelector("#bookingForm");
  const modelSelect = document.querySelector("#modelSelect");
  const reserveButtons = document.querySelectorAll("[data-car]");
  const visitSection = document.querySelector("#visit");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.addEventListener("click", (event) => {
      if (event.target.matches("a")) {
        navLinks.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  reserveButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (modelSelect) {
        modelSelect.value = button.dataset.car;
      }

      if (visitSection) {
        visitSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  if (bookingForm) {
    bookingForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(bookingForm);
      const name = formData.get("name").toString().trim() || "Guest";
      const model = formData.get("model");
      const message = bookingForm.querySelector(".form-message");

      if (message) {
        message.textContent = `Thanks, ${name}. Your private ${model} appointment request is ready.`;
      }

      bookingForm.reset();
    });
  }

  const revealTargets = document.querySelectorAll(
    ".intro, .section-heading, .car-card, .experience-image, .experience-copy, .gallery-grid img, .visit-copy, .booking-form"
  );

  revealTargets.forEach((target) => target.classList.add("reveal"));

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16 }
    );

    revealTargets.forEach((target) => observer.observe(target));
  } else {
    revealTargets.forEach((target) => target.classList.add("is-visible"));
  }
});
