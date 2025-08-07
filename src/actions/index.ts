import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";
import { Resend } from "resend";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

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
      const { name, email, service, message } = input;

      const { data, error } = await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: ["delivered@resend.dev"],
        subject: `Nuevo mensaje de ${name} sobre ${service}`,
        html: `
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Correo:</strong> ${email}</p>
          <p><strong>Servicio:</strong> ${service}</p>
          <p><strong>Mensaje:</strong></p>
          <p>${message}</p>
        `,
      });

      if (error) {
        throw new ActionError({
          code: "BAD_REQUEST",
          message: error.message,
        });
      }

      return data;
    },
  }),
};
