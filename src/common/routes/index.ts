import { Router } from "express";
import subscriptionRoutes from "../../features/subscriptions/subscriptions";

const router = Router();

router.use("/subscriptions", subscriptionRoutes);

export default router;
