import { Router } from "express";
import { addToCart } from "../controllers/AddProductInCart.Controller";
import { getUserCart } from "../controllers/getCartProducts.controller";
import { removeProductFromCart } from "../controllers/removeCartProduct.controller";
import { verifyAccessToken } from "../middleware/verifyToken"

const cartRouter = Router();

cartRouter.post("/add", verifyAccessToken, addToCart);

cartRouter.get("/", verifyAccessToken, getUserCart);

cartRouter.delete("/remove/:id", verifyAccessToken, removeProductFromCart);

export default cartRouter;
