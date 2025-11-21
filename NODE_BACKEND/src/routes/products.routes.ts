import { Router } from "express";
import { getAllProducts } from "../controllers/products.controller";
import { verifyAccessToken } from "../middleware/verifyToken";

const productRouter = Router();

productRouter.get("/",verifyAccessToken ,getAllProducts);

export default productRouter;
