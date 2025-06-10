import { Response } from "express";
import { BaseResponse } from '../utils/response.util';

export function expressSendResponse(
  res: Response,
  response: BaseResponse<any>
) {
  return res.status(response.statusCode).json(JSON.parse(response.body));
}
