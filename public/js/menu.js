function toggleNav() {
  const nav = document.getElementById("sideNav");
  const overlay = document.getElementById("navOverlay");
  const isMobile = window.innerWidth <= 768;
  
  if (isMobile) {
    nav.classList.toggle("open");
    overlay.classList.toggle("visible");
  }
}

function toggleUpdate() {
  const menu = document.getElementById("updateMenu");
  const toggle = document.querySelector(".dropdown-toggle .icon");
  const isOpen = menu.classList.contains("open");
  menu.classList.toggle("open");
  toggle.textContent = isOpen ? "⮟" : "⮞";
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && window.innerWidth <= 768) {
    document.getElementById("sideNav").classList.remove("open");
    document.getElementById("navOverlay").classList.remove("visible");
    const updateMenu = document.getElementById("updateMenu");
    if (updateMenu.classList.contains("open")) {
      updateMenu.classList.remove("open");
      document.querySelector(".dropdown-toggle .icon").textContent = "⮟";
    }
  }
});

// Handle window resize to ensure correct nav state
window.addEventListener("resize", () => {
  const nav = document.getElementById("sideNav");
  const overlay = document.getElementById("navOverlay");
  if (window.innerWidth > 768) {
    nav.classList.add("open");
    overlay.classList.remove("visible");
  } else {
    nav.classList.remove("open");
    overlay.classList.remove("visible");
  }
});

// Set initial state on page load
document.addEventListener("DOMContentLoaded", () => {
  if (window.innerWidth > 768) {
    document.getElementById("sideNav").classList.add("open");
  }
});