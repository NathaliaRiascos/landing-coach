const trigger = document.getElementById("trigger");
const options = document.getElementById("options");
const optionItems = options?.querySelectorAll("li");
const selectedLabel = document.getElementById("selected-label") as HTMLElement;
const hiddenInput = document.getElementById("hidden-input") as HTMLInputElement;
const errorSpan = document.querySelector(
  `[data-error="${hiddenInput?.name}"]`,
) as Element;

if (optionItems && optionItems.length > 0) {
  const firstItem = optionItems[0];
  selectedLabel.textContent = firstItem.textContent;
  hiddenInput.value = firstItem.dataset.value ?? "";
}

function updateErrorVisibleAttribute() {
  if (!trigger || !errorSpan) return;
  const isErrorVisible = !errorSpan.classList.contains("hidden");
  trigger.setAttribute("data-error-visible", isErrorVisible.toString());
}

const observer = new MutationObserver(updateErrorVisibleAttribute);
observer.observe(errorSpan, { attributes: true, attributeFilter: ["class"] });

trigger?.addEventListener("click", () => {
  const expanded = trigger.getAttribute("aria-expanded") === "true";
  trigger.setAttribute("aria-expanded", String(!expanded));
  options?.classList.toggle("hidden");
});

optionItems?.forEach((item) => {
  item.addEventListener("click", () => {
    selectedLabel.textContent = item.textContent;
    hiddenInput.value = item.dataset.value ?? "";
    options?.classList.add("hidden");
    trigger?.setAttribute("aria-expanded", "false");
  });
});

document.addEventListener("click", (e) => {
  if (
    trigger &&
    options &&
    !trigger.contains(e.target as Node) &&
    !options.contains(e.target as Node)
  ) {
    options.classList.add("hidden");
    trigger.setAttribute("aria-expanded", "false");
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    options?.classList.add("hidden");
    trigger?.setAttribute("aria-expanded", "false");
  }
});
