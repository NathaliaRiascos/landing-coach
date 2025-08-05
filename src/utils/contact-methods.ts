import { EmailIcon, MapPinIcon, PhoneIcon } from "@/icons";

export const CONTACTMETHODS = [
  {
    label: "Teléfono",
    icon: PhoneIcon,
    value: "+54 11 1234-5678",
    desc: "Lunes a Viernes, 9:00 - 18:00",
  },
  {
    label: "Email",
    icon: EmailIcon,
    value: "consultas@legalcoach.com",
    desc: "Respuesta en 24 horas",
  },
  {
    label: "Ubicación",
    icon: MapPinIcon,
    value: "Buenos Aires, Argentina",
    desc: "Consultas presenciales y virtuales",
  },
];
