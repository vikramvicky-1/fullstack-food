import userModel from "../Models/UserModel.js";

// add items to user cart
const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findOne({ _id: req.body.userId });
    let cartData = await userData.cartData;
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: " Item Added to Cart" });
  } catch (error) {
    console.log("error");
    res.json({ success: false, message: "Error" });
  }
};

// remove from cart
const removeFromCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Item Removed from Cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//get cart details

const getCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    const userName = userData.name;
    let cartData = await userData.cartData;
    res.json({ success: true, cartData, userName });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error" });
  }
};

export { addToCart, removeFromCart, getCart };
