import express from "express";
const router = express.Router();
import authController from "../controllers/authControllers.js";
import checkIsUserAuthenticated from "../middleware/authMiddleware.js";
import orderDataController from "../controllers/orderDataController.js";

router.post("/register", authController.userRegister);
router.post("/login", authController.userLogin);
router.post(
  "/change-password",
  checkIsUserAuthenticated,
  authController.changePassword
);

router.post("/orderData", orderDataController.orderData);

export default router;
