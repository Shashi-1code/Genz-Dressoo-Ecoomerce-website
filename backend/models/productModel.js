import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true},
    price: { type: Number, required: true},
    description: { type: String, required: true },
    images: { type: [String], required: true },
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    sizes: { type: Array, required: true },
    bestseller : { type: Boolean},
    date: { type: Number, required: true }
})
{/* Check if the model already exists to avoid OverwriteModelError */}
const productModel =mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;