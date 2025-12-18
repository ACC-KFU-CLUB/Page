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


/* ================= PAGE LOADING LOGO INDICATOR ================= */

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");

    // Ignore empty or hash-only links
    if (!href || href === "#") return;

    const loader = document.querySelector(".logo img");
    if (!loader) return;

    // Prevent instant navigation
    e.preventDefault();

    // Create overlay loader (transparent for internal navigation)
    const overlay = document.createElement("div");
    overlay.className = "page-loader-overlay";
    overlay.appendChild(loader.cloneNode()); // clone logo.png
    document.body.appendChild(overlay);

    // Navigate after small delay so animation is visible
    setTimeout(() => {
      window.location.href = href;
    }, 600);
  });
});

/* ================= SHOW LOADER ON FIRST PAGE LOAD ================= */

let initialLoaderOverlay = null;

// Create the first-load loader as soon as this script runs
(function showInitialLoaderOnce() {
  // Only show solid loader once per session (first site open)
  if (sessionStorage.getItem("hasSeenInitialLoader")) return;

  const logo = document.querySelector(".logo img");
  if (!logo) return;

  initialLoaderOverlay = document.createElement("div");
  // solid background for very first load
  initialLoaderOverlay.className = "page-loader-overlay page-loader-overlay-initial";
  initialLoaderOverlay.appendChild(logo.cloneNode());
  document.body.appendChild(initialLoaderOverlay);

  sessionStorage.setItem("hasSeenInitialLoader", "true");
})();

// Remove the initial loader after page fully loads
window.addEventListener("load", () => {
  if (!initialLoaderOverlay) return;

  setTimeout(() => {
    initialLoaderOverlay.remove();
  }, 1200);
});


/* ================= REPEATABLE LIGHT SCROLL REVEAL EFFECT ================= */

const revealItems = document.querySelectorAll(".reveal-on-scroll");

if ("IntersectionObserver" in window && revealItems.length) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        } else {
          // OPTIONAL: reset it so it animates again when visible
          entry.target.classList.remove("is-visible");
          entry.target.classList.add("reset");
          void entry.target.offsetWidth; // trigger reflow
          entry.target.classList.remove("reset");
        }
      });
    },
    { threshold: 0.15 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else if (revealItems.length) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}




