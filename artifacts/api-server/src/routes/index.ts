import { Router, type IRouter } from "express";
import healthRouter from "./health";
import transcribeRouter from "./transcribe";
import shopifyRouter from "./shopify";

const router: IRouter = Router();

router.use(healthRouter);
router.use(transcribeRouter);
router.use(shopifyRouter);

export default router;
