// ==========================
// THEME TOGGLE (light/dark)
// ==========================
(function () {
  const root = document.documentElement;
  const key = "shiva-theme";
  const toggleBtn = document.getElementById("themeToggle");

  // Load saved theme from localStorage
  const saved = localStorage.getItem(key);
  if (saved === "dark" || saved === "light") {
    root.setAttribute("data-theme", saved);
  } else {
    // Default theme fallback
    root.setAttribute("data-theme", "light");
  }

  // Handle theme toggle button click
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      root.setAttribute("data-theme", next);
      localStorage.setItem(key, next);

      // Update icon
      toggleBtn.innerHTML = next === "dark"
        ? '<i class="fa-solid fa-sun"></i>'
        : '<i class="fa-solid fa-moon"></i>';
    });

    // Set initial icon
    toggleBtn.innerHTML = root.getAttribute("data-theme") === "dark"
      ? '<i class="fa-solid fa-sun"></i>'
      : '<i class="fa-solid fa-moon"></i>';
  }
})();

// AOS Initialization
document.addEventListener("DOMContentLoaded", function () {
  AOS.init({
    duration: 1000,         // Animation duration in ms
    once: false,            // Allow animation to trigger on scroll up too
    mirror: true,           // Animate while scrolling past
    easing: 'ease-in-out',  // Easing function
    offset: 100             // Offset (px) from the trigger point
  });
});

// =========================
// DOMContentLoaded Section
// =========================
document.addEventListener("DOMContentLoaded", () => {
  // ========== AOS INIT ==========
  if (window.AOS) {
    AOS.init({
      duration: 650,
      once: true,
      easing: "ease-out-cubic",
      offset: 60,
    });
  }

  // ========== GLightbox INIT ==========
  if (window.GLightbox) {
    GLightbox({
      selector: ".glightbox",
      touchNavigation: true,
      loop: true,
      closeOnOutsideClick: true,
    });
  }

  // ========== UPDATE FOOTER YEAR ==========
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ========== COLLAPSE NAVBAR ON LINK CLICK ==========
  const navLinks = document.querySelectorAll(".navbar .nav-link");
  const navCollapse = document.getElementById("mainNav");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
      if (bsCollapse && window.innerWidth < 992) {
        bsCollapse.hide();
      }
    });
  });

  // ========================
  // CONTACT FORM HANDLING
  // ========================
  const form = document.getElementById("contactForm");
  const statusText = document.querySelector(".form-status");

  if (form) {
    form.addEventListener("submit", async function (event) {
      event.preventDefault();
      event.stopPropagation();

      form.classList.add("was-validated");

      // Check for HTML5 validation (name, email, etc.)
      if (!form.checkValidity()) {
        return; // Do not submit if invalid
      }

      const formData = new FormData(form);

      try {
        const response = await fetch(form.action, {
          method: form.method,
          body: formData,
          headers: { Accept: "application/json" },
        });

        if (response.ok) {
          form.reset();
          form.classList.remove("was-validated");
          statusText.classList.remove("d-none", "text-danger");
          statusText.classList.add("text-success");
          statusText.textContent = "Thanks! We’ll reach out soon.";
        } else {
          statusText.classList.remove("d-none", "text-success");
          statusText.classList.add("text-danger");
          statusText.textContent = "Oops! Something went wrong.";
        }
      } catch (error) {
        statusText.classList.remove("d-none", "text-success");
        statusText.classList.add("text-danger");
        statusText.textContent = "Network error. Please try again.";
      }

      // Hide message after 4 seconds
      setTimeout(() => statusText.classList.add("d-none"), 4000);
    });
  }

  // ========================
  // HERO SECTION SLIDER
  // ========================
  const slides = document.querySelectorAll(".hero-bg");
  const dots = document.querySelectorAll(".dot");
  let current = 0;
  let slideInterval;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
    current = index;
  }

  function nextSlide() {
    const nextIndex = (current + 1) % slides.length;
    showSlide(nextIndex);
  }

  function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 3000);
  }

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const index = parseInt(dot.dataset.slide, 10);
      if (!isNaN(index)) {
        showSlide(index);
        resetInterval();
      }
    });
  });

  // Initialize hero slider
  if (slides.length > 0 && dots.length > 0) {
    showSlide(current);
    slideInterval = setInterval(nextSlide, 3000);
  }
});
