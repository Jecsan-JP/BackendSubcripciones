import { Request, Response, NextFunction } from "express";

import {
  ConflictError,
  DatabaseError,
  ForbiddenError,
  InternalServerError,
  NotFoundError,
  ServiceUnavailableError,
  TooManyRequestsError,
  UnauthorizedError,
  ValidationError,
} from "../errors/errors";
import { BaseResponse } from "../utils/response.util";
import mongoose from "mongoose";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("ErrorHandler:", err);
  // Si el error ya es una instancia de nuestros errores personalizados
  if (
    err instanceof ValidationError ||
    err instanceof UnauthorizedError ||
    err instanceof ForbiddenError ||
    err instanceof NotFoundError ||
    err instanceof ConflictError ||
    err instanceof DatabaseError ||
    err instanceof InternalServerError ||
    err instanceof ServiceUnavailableError ||
    err instanceof TooManyRequestsError
  ) {
    const response = new BaseResponse(undefined).setError(err).build();

    return res.status(response.statusCode).json(response);
  }
  // Errores de clave duplicada de MongoDB
  if ((err as any).code === 11000) {
    const duplicatedField = Object.keys((err as any).keyPattern || {})[0];
    const response = new BaseResponse(undefined)
      .setError(
        new ConflictError(
          duplicatedField
            ? `El campo '${duplicatedField}' ya está registrado.`
            : "Ya existe un registro con ese valor único en la base de datos."
        )
      )
      .build();
    return res.status(response.statusCode).json(response);
  }

  // Errores de validación de Mongoose
  if (err.name === "ValidationError") {
    const mongooseError = err as mongoose.Error.ValidationError;
    const response = new BaseResponse()
      .setError(
        new ValidationError({
          message: mongooseError.message,
          field: mongooseError.errors
            ? Object.keys(mongooseError.errors)[0]
            : undefined,
        })
      )
      .build();
    return res.status(response.statusCode).json(response);
  }

  // Otros errores de Mongoose/MongoDB
  if (err instanceof mongoose.Error) {
    const response = new BaseResponse()
      .setError(new DatabaseError(err.message))
      .build();
    return res.status(response.statusCode).json(response);
  }

  // Para cualquier otro error no manejado
  console.error("Error no manejado:", err);
  const response = new BaseResponse()
    .setError(new InternalServerError(err.message))
    .build();

  return res.status(response.statusCode).json(response);
};
