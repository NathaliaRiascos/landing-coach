const openBtn = document.querySelector("#btn-open") as HTMLButtonElement | null;
const btnClose = document.querySelector(
  "#btn-close",
) as HTMLButtonElement | null;
const menu = document.querySelector("#main-menu");

const updateNavbar = (e: MediaQueryList | MediaQueryListEvent) => {
  const isMobile = e.matches;
  if (isMobile) {
    menu?.setAttribute("inert", "");
  } else {
    menu?.removeAttribute("inert");
  }
};

const media = window.matchMedia("(width < 768px)");
media.addEventListener("change", updateNavbar);

openBtn?.addEventListener("click", () => {
  menu?.classList.add("show", "scale-up-hor-right-normal");
  openBtn.setAttribute("aria-expanded", "true");
  menu?.removeAttribute("inert");
  btnClose?.focus();
});

const closeSidebar = () => {
  const isMobile = media.matches;
  if (!isMobile) return;
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
  }, 400);
};
btnClose?.addEventListener("click", closeSidebar);

const navLinks = document.querySelectorAll("nav li a");
navLinks.forEach((link) => {
  link.addEventListener("click", closeSidebar);
});
updateNavbar(media);
