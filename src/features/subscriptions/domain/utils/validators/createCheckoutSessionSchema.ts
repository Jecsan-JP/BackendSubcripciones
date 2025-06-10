import Joi from "joi";

export const createCheckoutSessionSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.base": "El nombre debe ser un texto.",
    "string.empty": "El nombre es obligatorio.",
    "any.required": "El nombre es obligatorio.",
  }),
  email: Joi.string().email().required().messages({
    "string.base": "El correo debe ser un texto.",
    "string.email": "El correo debe tener un formato válido. Ejemplo: ejemplo@gmail.com",
    "string.empty": "El correo es obligatorio.",
    "any.required": "El correo es obligatorio.",
  }),
  priceId: Joi.string().required().messages({
    "string.base": "El priceId debe ser un texto.",
    "string.empty": "El priceId es obligatorio.",
    "any.required": "El priceId es obligatorio.",
  }),
  successUrl: Joi.string().uri().required().messages({
    "string.base": "La successUrl debe ser un texto.",
    "string.uri": "La successUrl debe ser una URL válida.",
    "string.empty": "La successUrl es obligatoria.",
    "any.required": "La successUrl es obligatoria.",
  }),
  cancelUrl: Joi.string().uri().required().messages({
    "string.base": "La cancelUrl debe ser un texto.",
    "string.uri": "La cancelUrl debe ser una URL válida.",
    "string.empty": "La cancelUrl es obligatoria.",
    "any.required": "La cancelUrl es obligatoria.",
  }),
});
