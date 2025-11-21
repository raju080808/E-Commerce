import { CartModel } from "../model/cart.model";

export const getUserCart = async (req: any, res: any) => {
  try {
    const userId = req.user.userId;

    let cart = await CartModel.findOne({ userId })
      .populate("cartProducts.productId", "name price image");

    // If no cart exists, create empty cart
    if (!cart) {
      cart = await CartModel.create({
        userId,
        cartProducts: []
      });
    }

    // Convert each cart product to frontend-friendly format
    const formattedCart = cart.cartProducts.map((cp: any) => ({
      product: cp.productId,  // populated product object
    }));

    res.status(200).json({
      success: true,
      totalCount: formattedCart.length,
      items: formattedCart
    });

  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
