const Product = require("../models/Product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const { fromPairs, sortBy } = require("lodash");
const { ProductCart } = require("../models/Order");
const { validationResult } = require("express-validator");

exports.getProductById = (req, res, next, id) => {
    Product.findById(id)
        .populate("category")
        .exec((err, product) => {
            if (err || !product) {
                return res.status(400).json({
                    error: "No Product Found"
                });
            }
            req.product = product;
            next();
        });
};

exports.createProduct = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: errors.array()[0].msg
        });
    }
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({
                error: "Image is not of required format"
            });
        }

        const { name, price, description, category, stock } = fields;

        if (!name || !price || !description || !price || !category || !stock) {
            return res.status(400).json({
                error: "All fields are compulsory"
            });
        }

        let product = new Product(fields);

        //handling files
        if (file.photo) {
            if (file.photo.size > 4 * 1024 * 1024) {
                return res.status(400).json({
                    error: "File size is too large"
                });
            }
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type;
        }

        // Saving product to db

        product.save((err, product) => {
            if (err || !product) {
                return res.status(400).json({
                    error: "Unable to add Product"
                });
            }
            res.json(product);
        });
    });
};

exports.getProduct = (req, res) => {
    req.product.photo = undefined;
    res.json(req.product);
};

//to send photo after the data and make app faster
exports.photo = (req, res, next) => {
    if (req.product.photo.data) {
        res.set("Content-Type", req.product.photo.contentType);
        res.send(req.product.photo.data);
    }
    next();
};

exports.updateProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({
                error: "Image is not of required format"
            });
        }

        //Updation code
        let product = req.product;
        product = _.extend(product, fields);

        //handling files
        if (file.photo) {
            if (file.photo.size > 4 * 1024 * 1024) {
                return res.status(400).json({
                    error: "File size is too large"
                });
            }
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type;
        }

        // Saving product to db

        product.save((err, product) => {
            if (err || !product) {
                return res.status(400).json({
                    error: "Unable to Update Product"
                });
            }
            res.json(product);
        });
    });
};

exports.deleteProduct = (req, res) => {
    let product = req.product;
    product.remove((err, deletedProduct) => {
        if (err) {
            return res.status(400).json({
                error: `Failed to delete ${deletedProduct.name}`
            });
        }
        res.json({
            message: `Successfully deleted ${deletedProduct.name}`
        });
    });
};

exports.getProducts = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 12;
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

    Product.find()
        .populate("category")
        .sort([[sortBy, "asc"]])
        .select("-photo")
        .limit(limit)
        .exec((err, allProducts) => {
            if (err || !allProducts) {
                return res.status(400).json({
                    error: "No products found"
                });
            }
            res.json(allProducts);
        });
};


exports.getUniqueCategories = (req,res)=>{
    Product.distinct("category",{},(err,categories)=>{
        if(err || !categories){
            return res.status(400).json({
                error : "No Categories Found"
            })
        }
        res.json(categories)
    })
}

exports.updateStock = (req, res, next) => {
    let myOperations = req.body.order.products.map(item => {
        return {
            updateOne: {
                filter: { _id: item._id },
                update: { $inc: { stock: -item.count, sold: item.count } }
            }
        };
    });
    Product.bulkWrite(myOperations, {}, (err, results) => {
        if (err) {
            return res.status(400).json({
                error: "Bulk Operation failed"
            });
        }
        next();
    });
};
