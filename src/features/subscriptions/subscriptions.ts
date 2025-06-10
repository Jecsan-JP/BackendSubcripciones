import { Router } from "express";
import {
  createCheckoutSessionUseCase,
  getSubscriptionStatusUseCase,
  getUserByCustomerIdUseCase,
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

router.get("/user/:customerId", (req, res) => {
  handleRequestExpress(
    getUserByCustomerIdUseCase(),
    req,
    { customerId: req.params.customerId },
    res
  );
});

export default router;
