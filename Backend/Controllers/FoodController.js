import foodModel from "../Models/FoodModel.js";
import fs from "fs";

// add food item

const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;
  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });
  try {
    await food.save();
    res.json({ success: true, message: "Food added Successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};
//remove food item

const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    if (food) {
      fs.unlink(`Uploads/${food.image}`, () => {});
      await foodModel.findByIdAndDelete(req.body.id);
      res.json({ success: true, message: "food is removed" });
    } else {
      res.json({ success: false, message: "food not found" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error" });
  }
};
//all food list
const listFood = async (req, res) => {
  try {
    const food = await foodModel.find({});
    res.json({ success: true, data: food });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error" });
  }
};
export { addFood, listFood, removeFood };
