import { CartModel } from "../model/cart.model";
export const addToCart = async (req: any, res: any) => {
  try {
   // const userId = req.user._id;   // <<-- FIXED
     const userId = req.user.userId; 
     console.log(userId)
    const { productId } = req.body;

    let cart = await CartModel.findOne({ userId });

    if (!cart) {
      cart = await CartModel.create({
        userId,
        cartProducts: [{ productId }]
      });
      return res.status(201).json({ success: true, message: "Added to cart" ,cart});
    }

    const exists = cart.cartProducts.some(
      item => item.productId.toString() === productId
    );

    if (!exists) {
      cart.cartProducts.push({ productId });
      await cart.save();
    }

    res.status(200).json({ success: true, message: "Cart updated",cart });

  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
