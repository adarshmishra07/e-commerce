const User = require("../models/User");
const Order = require("../models/Order");

exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "User not Found"
            });
        }
        req.profile = user;
        next();
    });
};

exports.getUser = (req, res) => {
    req.profile.salt = undefined;
    req.profile.encPassword = undefined;
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined;
    return res.json(req.profile);
};

exports.updateUser = (req, res) => {
    User.findByIdAndUpdate(
        { _id: req.profile._id },
        { $set: req.body },
        { new: true, useFindAndModify: false },
        (err, user) => {
            if (err) {
                return res.status(400).json({
                    error: "You are not Authorised"
                });
            }
            user.salt = undefined;
            user.encPassword = undefined;
            user.createdAt = undefined;
            user.updatedAt = undefined;
            res.json(user);
        }
    );
};

exports.userPurchaseList = (req, res) => {
    Order.find({ user: req.profile._id })
        .populate("user", "_id name")
        .exec((err, orders) => {
            if (err) {
                return res.status(400).json({
                    error: "No Orders in this Account"
                });
            }
            return res.json(orders);
        });
};

exports.pushOrderInPurchaseList = (req, res, next) => {
    let purchases = [];
    req.body.order.products.forEach(product => {
        purchases.push({
            _id: product._id,
            name: product.name,
            description: product.description,
            category: product.category,
            quantity: product.quantity,
            amount: req.body.order.amount,
            transactionId: req.body.order.transactionId
        });
    });

    //Storing in DB

    User.findOneAndUpdate(
        { _id: req.profile._id },
        { $push: { purchases: purchases } },
        { new: true },
        (err, purchases) => {
            if (err) {
                return res.status(400).json({
                    error: "Unable to save Purchase list"
                });
            }
            next();
        }
    );
};
