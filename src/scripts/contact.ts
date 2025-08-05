import Toastify from "toastify-js";

import { actions, isInputError } from "astro:actions";

const form = document.querySelector("form");
const btnSubmit = document.querySelector("#btn-submit") as HTMLButtonElement;

const addMessageToForm = (isError: boolean) => {
  if (isError) {
    Toastify({
      text: "Hubo un error al enviar el mensaje. Intenta de nuevo",
      duration: 3000,
      className: "error",
      style: {
        background: "#fecaca",
      },
      close: true,
    }).showToast();
  } else {
    Toastify({
      text: "Mensaje enviado correctamente.",
      duration: 10000,
      className: "success",
      style: {
        background: "#bbf7d0",
      },
      close: true,
    }).showToast();
    btnSubmit.innerHTML = "Enviado!";
  }
};

const showFieldErrors = (error: unknown) => {
  const errorSpans = document.querySelectorAll("[data-error]");

  // Oculta todos los errores previos
  errorSpans.forEach((el) => {
    el.textContent = "";
    el.classList.add("hidden");
  });

  if (isInputError(error)) {
    const fields = error.fields;

    Object.keys(fields).forEach((fieldName) => {
      const span = document.querySelector(
        `[data-error="${fieldName}"]`,
      ) as HTMLElement;
      if (span) {
        console.log(fields[fieldName]);
        span.textContent = fields[fieldName]?.join(", ") ?? "";
        span.classList.remove("hidden");
      }
    });
  }
};

form?.addEventListener("submit", async (event) => {
  event.preventDefault();
  btnSubmit.disabled = true;
  const formData = new FormData(form);

  const { error } = await actions.sendEmail(formData);

  addMessageToForm(!!error);

  if (error) {
    showFieldErrors(error);
  } else {
    form.reset();
  }
  btnSubmit.disabled = false;
});
