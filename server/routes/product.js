const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { getUserById } = require("../controllers/user");
const { isSignedIn, isAdmin, isAuthenticated } = require("../controllers/auth");
const {
    getProductById,
    createProduct,
    getProduct,
    photo,
    updateProduct,
    deleteProduct,
    getProducts,
    getUniqueCategories
} = require("../controllers/product");

router.param("userId", getUserById);
router.param("productId", getProductById);

router.post(
    "/product/create/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    createProduct
);

router.get("/product/:productId", getProduct);

router.get("/product/photo/:productId", photo);

router.put(
    "/product/:productId/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    updateProduct
);

router.delete(
    "/product/:productId/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    deleteProduct
);

router.get("/products", getProducts);

router.get("/products/categories", getUniqueCategories);

module.exports = router;

// validation for product not working rn
// [
//     check("name", "Name field is compulsory").notEmpty(),
//     check("description", "Description should be of min 10 Characters").isLength({
//         min: 10
//     }),
//     check("stock", "Stock field is compulsory").notEmpty().isNumeric(),
//     check("category", "Category field is compulsory").notEmpty(),
//     check("price", "Price field is compulsory").notEmpty().isNumeric(),
// ],
