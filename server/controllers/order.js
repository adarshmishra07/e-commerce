const { Order, ProductCart } = require("../models/Order");

exports.getOrderById = (req, res, next, id) => {
    Order.findById(id)
        .populate("products.product", "name price")
        .exec((err, order) => {
            if (err || !order) {
                return res.status(400).json({
                    error: "No order found"
                });
            }
            req.order = order;
            next();
        });
};

exports.createOrder = (req, res) => {
    req.body.order.user = req.profile;
    const order = new Order(req.body.order);
    order.save((err, order) => {
        if (err || !order) {
            return res.status(400).json({
                error: "Order was not placed"
            });
        }
        res.json(order);
    });
};

exports.getOrders = (req, res) => {
    Order.find()
        .populate("user", "_id name email")
        .exec((err, orders) => {
            if (err || !orders) {
                return res.status(400).json({
                    error: "No Orders Found"
                });
            }
            res.json(orders);
        });
};

exports.getOrderStatus = (req,res)=>{
    res.json(Order.schema.paths("status").enumValues)
}

exports.updateOrderStatus = (req,res)=>{
    Order.update(
        {_id : req.body.orderId},
        {$set : {status : req.body.status}},
        (err,updatedStatus)=>{
            if(err || !updatedStatus){
                return res.status(400).json({
                    error : "Unable to update order status"
                })
            }
            res.json(updatedStatus)
        }
    )
}