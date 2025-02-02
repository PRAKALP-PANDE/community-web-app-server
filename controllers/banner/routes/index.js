import { Router } from "express";
import authMiddleware from "../../../middlewares/auth.js";
import bannerController from "../controllers/index.js";

const bannerRouter = Router();

const isAuthenticatedUser = authMiddleware.isAuthenticatedUser;

// Authenticated Routes -------------------------------------------------------

bannerRouter
  .route("/create-banner")
  .post(
    // isAuthenticatedUser,
    bannerController.createBanner
  );

bannerRouter
  .route("/get-all-banners")
  .get(
    isAuthenticatedUser,
    bannerController.getAllBanners
  );




export default bannerRouter;
