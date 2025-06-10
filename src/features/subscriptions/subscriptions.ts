import { Router } from "express";
import { createCheckoutSessionUseCase } from "./presentation/usecases_modules";
import { handleRequestExpress } from "../../common/express/handleRequestExpress";

const router = Router();

router.post("/checkout-session", (req, res) => {
  handleRequestExpress(createCheckoutSessionUseCase(), req, req.body, res);
});

export default router;
