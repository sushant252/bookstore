
const User = require('../../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function addUser(req, res) {
    try {
        const user = await User.findOne({
            email: req.body.email,
            userType: 'user'
        });
        if (user) {
            return res.status(400).send({
                success: false,
                message: "User already exists"
            });
        }
        const password = await bcrypt.hash(req.body.password, 10);
        const newUser = new User(req.body);
        newUser.password = password;
        await newUser.save();
        return res.status(200).send({
            success: true,
            message: "Welcome to our Platform. Please Login first"
        });

    } catch (err) {
        console.error(err);

        if (res.headersSent) return;

        return res.status(500).send({
            success: false,
            message: "Something went wrong"
        });
    }
}

async function doUserLogin(req, res) {
    try {
        const user = await User.findOne({
            email: req.body.email
        });
        if (!user) {
            return res.status(401).send({
                success: false,
                message: "Invalid email or password"
            });
        }

        const validUser = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (!validUser) {
            return res.status(401).send({
                success: false,
                message: "Invalid email or password"
            });
        }

        user.lastLogin = new Date();
        await user.save();

        const secret_key = process.env.JWT_SECRET;

        if (!secret_key) {
            throw new Error("JWT_SECRET is not configured");
        }

        const token = jwt.sign(
            {
                _id: user._id,
                email: user.email
            },
            secret_key,
            {
                expiresIn: '3h'
            }
        );

        const data = {
            email: user.email,
            name: user.firstName,
            token: token
        };

        // Sirf ek baar response send hoga
        return res.status(200).send({
            success: true,
            message: "Login successfully",
            data: data
        });

    } catch (err) {
        console.error(err);

        if (res.headersSent) return;

        return res.status(500).send({
            success: false,
            message: "Something went wrong"
        });
    }
}

module.exports = {
    addUser,
    doUserLogin
};
