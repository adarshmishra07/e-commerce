const Category = require("../models/Category");

exports.getCategoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, cat) => {
        if (err || !cat) {
            return res.status(400).json({
                error: "Category not found in DB"
            });
        }
        req.category = cat;
        next();
    });
};

exports.getCategory = (req, res) => {
    return res.json(req.category);
};
  

exports.createCategory = (req, res) => {
    const category = new Category(req.body);
    category.save((err, category) => {
        if (err || !category) {
            return res.status(400).json({
                error: "Category was not saved"
            });
        }
        res.json(category);
    });
};

exports.getCategories = (req, res) => {
    Category.find().exec((err, categories) => {
        if (err || !categories) {
            return res.status(400).json({
                error: "No Categories found"
            });
        }
        res.json(categories);
    });
};

exports.updateCategory = (req, res) => {
    const category = req.category;
    category.name = req.body.name;

    category.save((err, updatedCategory) => {
        if (err || !updatedCategory) {
            return res.status(400).json({
                error: "Category was not Updated"
            });
        }
        res.json(updatedCategory);
    });
};

exports.removeCategory = (req, res) => {
    const category = req.category;
    category.remove((err, category) => {
        if (err) {
            return res.status(400).json({
                error: `Failed to remove ${category.name}`
            });
        }
        res.json({
            message: `Successfully deleted ${category.name}`
        });
    });
};
