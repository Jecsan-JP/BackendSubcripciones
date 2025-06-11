import { Router } from "express";
import {
  createCheckoutSessionUseCase,
  getSubscriptionStatusUseCase,
  getUserByEmailUseCase,
} from "./presentation/usecases_modules";
import { handleRequestExpress } from "../../common/express/handleRequestExpress";
import { validateRequest } from "../../common/middlewares/validateRequest";
import { createCheckoutSessionSchema } from "./domain/utils/validators/createCheckoutSessionSchema";

const router = Router();

router.post(
  "/checkout-session",
  validateRequest(createCheckoutSessionSchema),
  (req, res) => {
    handleRequestExpress(createCheckoutSessionUseCase(), req, req.body, res);
  }
);

router.get("/status/:customerId", (req, res) => {
  handleRequestExpress(
    getSubscriptionStatusUseCase(),
    req,
    { customerId: req.params.customerId },
    res
  );
});

router.get("/user/:email", (req, res) => {
  handleRequestExpress(
    getUserByEmailUseCase(),
    req,
    { email: req.params.email },
    res
  );
});

export default router;
