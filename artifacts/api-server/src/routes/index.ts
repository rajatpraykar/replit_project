import { Router, type IRouter } from "express";
import healthRouter from "./health";
import transcribeRouter from "./transcribe";
import shopifyRouter from "./shopify";
import enhanceImageRouter from "./enhance-image";

const router: IRouter = Router();

router.use(healthRouter);
router.use(transcribeRouter);
router.use(shopifyRouter);
router.use(enhanceImageRouter);

export default router;
