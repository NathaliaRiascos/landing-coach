// Get references to the open and close buttons, and the main menu element
const openBtn = document.querySelector("#btn-open") as HTMLButtonElement | null;
const btnClose = document.querySelector(
  "#btn-close",
) as HTMLButtonElement | null;
const menu = document.querySelector("#main-menu");

// Function to update menu accessibility based on screen size
const updateNavbar = (e: MediaQueryList | MediaQueryListEvent) => {
  const isMobile = e.matches;
  if (isMobile) {
    // If it's mobile, disable interaction with the menu until opened
    menu?.setAttribute("inert", "");
  } else {
    // On desktop, always allow interaction
    menu?.removeAttribute("inert");
  }
};

// Setup media query listener for screen width less than 768px
const media = window.matchMedia("(width < 768px)");
media.addEventListener("change", updateNavbar);

// Handle menu open (mobile)
openBtn?.addEventListener("click", () => {
  // Show menu and play open animation
  menu?.classList.add("show", "scale-up-hor-right-normal");

  // Update aria attribute for accessibility
  openBtn.setAttribute("aria-expanded", "true");

  // Allow interaction with the menu
  menu?.removeAttribute("inert");

  // Move focus to the close button
  btnClose?.focus();
});

// Function to close the sidebar menu (only on mobile)
const closeSidebar = (): Promise<void> => {
  return new Promise((resolve) => {
    const isMobile = media.matches;
    if (!isMobile) {
      resolve();
      return;
    }

    // Play closing animation
    menu?.classList.add("scale-down-hor-right-normal");

    setTimeout(() => {
      const animationClasses = [
        "show",
        "scale-up-hor-right-normal",
        "scale-down-hor-right-normal",
      ];
      menu?.classList.remove(...animationClasses);

      openBtn?.setAttribute("aria-expanded", "false");
      menu?.setAttribute("inert", "");
      openBtn?.focus();

      resolve();
    }, 400);
  });
};

// Close the sidebar when the close button is clicked
btnClose?.addEventListener("click", async () => {
  await closeSidebar();
  // algo más aquí
});

// Get all navigation links
const navLinks = document.querySelectorAll("nav li a");

// Function to highlight the active navigation link based on URL hash
const highlightActiveLink = () => {
  const currentHash = window.location.hash;

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");

    // If the href matches the current hash, apply active styles
    if (href === currentHash) {
      link.classList.add("text-primary", "font-bold");
    } else {
      // Otherwise, remove active styles
      link.classList.remove("text-primary", "font-bold");
    }
  });
};

// Initialize navbar state on load
updateNavbar(media);
highlightActiveLink();

const goToHash = () => {
  const hash = window.location.hash;
  if (hash && history.pushState) {
    history.pushState(null, "", hash);
  } else if (hash) {
    window.location.hash = hash;
  }

  if (hash) {
    document.querySelector(hash)?.scrollIntoView({
      behavior: "smooth",
    });
  }
};
// Also handle link clicks: close sidebar and update active link immediately
navLinks.forEach((link) => {
  link.addEventListener("click", async (e) => {
    const isMobile = media.matches;
    if (isMobile) {
      e.preventDefault();
      await closeSidebar();
      goToHash();
    }
  });
});

window.addEventListener("hashchange", highlightActiveLink);
