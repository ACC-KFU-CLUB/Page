/* ================= HEADER HIDE/SHOW ON SCROLL ================= */

let lastScroll = 0;
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
});

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
