/* ================= HEADER HIDE/SHOW ON SCROLL ================= let lastScroll = 0;
const header = document.querySelector(".main-header");

window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > lastScroll) {
        // scrolling down → hide header
        header.classList.add("header-hidden");
    } else {
        // scrolling up → show header
        header.classList.remove("header-hidden");
    }

    lastScroll = currentScroll;
}); */



/* ================= MOBILE MENU ================= */

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

/* ================= ABOUT SECTION TABS ================= */

const tabBtns = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {

        // Remove active states
        tabBtns.forEach(b => b.classList.remove("active"));
        tabContents.forEach(content => content.classList.remove("active"));

        // Set active
        btn.classList.add("active");
        document.getElementById(btn.dataset.tab).classList.add("active");
    });
});

/* ================= STATS COUNTER ================= */

const counters = document.querySelectorAll(".stat-number");
const statsSection = document.querySelector(".stats-section");

function startCounters() {
  counters.forEach((counter) => {
    const target = Number(counter.getAttribute("data-target"));
    const duration = 1500; // total animation time in ms
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.floor(progress * target);
      const prefix = counter.getAttribute("data-prefix") || "";
      counter.textContent = prefix + value.toLocaleString("en-US");



      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  });
}

if (statsSection && "IntersectionObserver" in window) {
  let statsStarted = false;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !statsStarted) {
          statsStarted = true;
          startCounters();
          observer.unobserve(statsSection);
        }
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(statsSection);
} else if (counters.length) {
  // Fallback if IntersectionObserver is not supported
  startCounters();
}
