import { Request, Response } from "express";
import { CartModel } from "../model/cart.model";
export const removeProductFromCart = async (req: any, res: Response) => {
  try {
    const userId = req.user.userId;          // correct user field
    const productId = req.params.id;         // get from params

    const cart = await CartModel.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found"
      });
    }

    // Remove product from cartProducts
    await CartModel.updateOne(
      { userId },
      { $pull: { cartProducts: { productId } } }
    );

    return res.status(200).json({
      success: true,
      message: "Product removed from cart"
    });

  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Server error"
    });
  }
};
