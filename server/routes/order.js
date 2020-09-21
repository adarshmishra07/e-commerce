const express = require("express");
const router = express.Router();
const {
    getOrderById,
    createOrder,
    getOrders,
    getOrderStatus,
    updateOrderStatus
} = require("../controllers/order");
const { check } = require("express-validator");
const { getUserById, pushOrderInPurchaseList } = require("../controllers/user");
const { isSignedIn, isAdmin, isAuthenticated } = require("../controllers/auth");
const { updateStock } = require("../controllers/product");

router.param("orderId", getOrderById);
router.param("userId", getUserById);

router.post(
    "/order/create/:userId",
    isSignedIn,
    isAuthenticated,
    pushOrderInPurchaseList,
    updateStock,
    createOrder
);
//read
router.get(
    "/order/all/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    getOrders
);

//status of order
router.get(
    "/order/status/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    getOrderStatus
);
router.put(
    "/order/:orderId/status/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    updateOrderStatus
);

module.exports = router;
