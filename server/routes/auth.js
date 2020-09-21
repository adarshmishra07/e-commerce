const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { signout, signup, signin, isSignedIn } = require("../controllers/auth");

router.post(
    "/signup",
    [
        check("name", "Name should be atleast 3 Characters").isLength({
            min: 3
        }),
        check("email", "Email is Required").isEmail(),
        check("password", "Password should be alteast 5 Characters").isLength({
            min: 5
        })
    ],
    signup
);

router.post(
    "/signin",
    [
        check("email", "Email is Required").isEmail(),
        check("password", "Password field is Required").isLength({
            min: 1
        })
    ],
    signin
);

router.get("/signout", signout); 

module.exports = router;
