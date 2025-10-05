import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: "Client", required: true },
  products: [{ name: String, quantity: Number, price: Number }],
  total: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
