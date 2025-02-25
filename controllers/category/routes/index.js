import { Router } from "express";
import multerMiddleware from "../../../middlewares/multer.js";
import authMiddleware from "../../../middlewares/auth.js";
import categoryController from "../controllers/index.js";

const categoryRouter = Router();

const isAuthenticatedVendor = authMiddleware.isAuthenticatedVendor;
const isAuthenticatedUser = authMiddleware.isAuthenticatedUser;

// Authorized Routes  -------------------------------------------------------------

categoryRouter.route("/get-all-categories")
    .get( isAuthenticatedVendor ,  categoryController.getAllCategories );

categoryRouter.route("/get-all-categories-user")
    .get( isAuthenticatedUser ,  categoryController.getAllCategories );


export default categoryRouter;
