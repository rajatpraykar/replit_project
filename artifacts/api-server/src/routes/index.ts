import { Router, type IRouter } from "express";
import healthRouter from "./health";
import transcribeRouter from "./transcribe";
import enhanceImageRouter from "./enhance-image";
import catalogRouter from "./catalog";
import pricingRouter from "./pricing";
import ondcRouter from "./ondc";
import gemExportRouter from "./gem-export";
import productsRouter from "./products";
import inquiriesRouter from "./inquiries";
import analyticsRouter from "./analytics";
import authRouter from "./auth";
import shopifyRouter from "./shopify";

const router: IRouter = Router();

router.use(healthRouter);
router.use(transcribeRouter);
router.use(enhanceImageRouter);
router.use(catalogRouter);
router.use(pricingRouter);
router.use(ondcRouter);
router.use(gemExportRouter);
router.use(productsRouter);
router.use(inquiriesRouter);
router.use(analyticsRouter);
router.use(authRouter);
router.use(shopifyRouter);

export default router;
