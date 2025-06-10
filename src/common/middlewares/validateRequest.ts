import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";
import { BaseResponse } from "../utils/response.util";
import { InternalServerError, ValidationError } from "../errors/errors";
import { expressSendResponse } from "../express/expressSendResponse";

export function validateRequest(schema: ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body);
    if (error) {
      expressSendResponse(
        res,
        new BaseResponse(undefined)
          .setCode(400)
          .setMessage(error.details[0].message)
          .build()
      );

      return;
    }
    next();
  };
}
