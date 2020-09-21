const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productCartSchema = new mongoose.Schema({
    product: {
        type: ObjectId,
        ref: "Product"
    },
    name: {
        type: String
    },
    count: Number,
    price: Number
});

const ProductCart = mongoose.model("ProductCart", productCartSchema);

const orderSchema = new mongoose.Schema(
    {
        products: [productCartSchema],
        transactionId: {},
        amount: {
            type: Number
        },
        address: {
            type: String
        },
        updated: Date,
        user: {
            type: ObjectId,
            ref: "User"
        },
        status: {
            type: String,
            default: "Received",
            enum: [
                "Cancelled",
                "Received",
                "Delivered",
                "Processing",
                "Shipped"
            ]
        }
    },
    { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = { Order, ProductCart };
