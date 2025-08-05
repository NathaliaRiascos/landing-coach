import { defineAction } from "astro:actions";
import { z } from "astro:schema";

export const server = {
  sendEmail: defineAction({
    accept: "form",
    input: z.object({
      name: z.string({
        required_error: "El nombre es obligatorio",
        invalid_type_error: "El nombre debe ser texto",
      }),
      email: z
        .string({
          required_error: "El correo es obligatorio",
        })
        .email("Ingresa un correo válido"),
      service: z.string({
        required_error: "Debes seleccionar un servicio",
      }),
      message: z
        .string({
          required_error: "El mensaje es obligatorio",
        })
        .min(6, "El mensaje debe tener al menos 6 caracteres"),
    }),
    handler: async (input) => {
      //console.log("send...", input)
      return {
        success: true,
        message: "Tu mensaje ha sido enviado con éxito.",
      };
    },
  }),
};
