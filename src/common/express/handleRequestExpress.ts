import { Request, Response } from "express";
import { UseCase } from "../interfaces/UseCase";
import { BaseResponse } from "../utils/response.util";
import { expressSendResponse } from "./expressSendResponse";

// El handler recibe el usecase, la request, los datos y la response
export function handleRequestExpress<T, R>(
  usecase: UseCase<T, R>,
  req: Request,
  params: T,
  res: Response
) {
  let inputData: any = params || req.body;

  usecase
    .execute(inputData)
    .then((result) => {
      expressSendResponse(res, new BaseResponse(result).build());
    })
    .catch((error) => {
      console.log("handleRequest Exception: ", error);
      expressSendResponse(
        res,
        new BaseResponse(undefined).setError(error).build()
      );
    });
}
