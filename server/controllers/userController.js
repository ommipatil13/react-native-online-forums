const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
var { expressjwt: jwts } = require("express-jwt")
require('dotenv').config()

//middleware
const requireSignIn = jwts({
    secret: process.env.SECRETKEY,
    algorithms: ["HS256"],
});


const userRegister = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        if (!name || !email || !password || password.length < 6 || password.length > 60) {
            return res.status(400).send({
                success: false,
                message: "please fill all details and password should be above 6 char and below 60 char"
            })
        }

        const existingUser = await userModel.findOne({ email: email })  // 1st email is database email and 2nd is body email
        if (existingUser) {
            return res.status(500).send({
                success: false,
                message: "already user register",
                existingUser: existingUser.email
            })
        }

        const salt = await bcrypt.genSalt(10);
        const securePWD = await bcrypt.hash(password, salt);

        const user = await userModel({ name, email, password: securePWD }).save();
        return res.status(201).send({
            success: true,
            message: "user register success",
            user: user
        })


    } catch (error) {
        console.log(error)
        return res.status(404).send({
            success: false,
            message: "error in register api",
            error
        })
    }
}

const userLogin = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: "please fill all details"
            })
        }

        const user = await userModel.findOne({ email })

        if (!user) {
            return res.status(500).send({
                success: false,
                message: "user email not found please register",
            })
        }

        const comparePassword = await bcrypt.compare(password, user.password)

        if (!comparePassword) {
            return res.status(500).send({
                success: false,
                message: "password not match"
            })
        }

        user.password = undefined;

        const token = await jwt.sign({ _id: user._id }, process.env.SECRETKEY, { expiresIn: "7d" })


        return res.status(200).send({
            success: true,
            message: "login success",
            token,
            user,
        })


    } catch (error) {
        console.log(error)
        return res.status(404).send({
            success: false,
            message: "error in login api",
            error
        })
    }
}


const userUpdate = async (req, res) => {

    try {
        const { name, email, password } = req.body;

        //user find
        const user = await userModel.findOne({ email })

        //password validate
        if (password && password.length < 6) {
            return res.status(400).send({
                success: false,
                message: "password is req and should be 6 char long",
            })
        }

        if (password) {
            const salt = await bcrypt.genSalt(10);
            var securePWD = await bcrypt.hash(password, salt)
        }
        else {
            var securePWD = undefined
        }

        // const salt = await bcrypt.genSalt(10);
        // const securePWD = await bcrypt.hash(password, salt)

        // const hashedPassword = password ? securePWD : undefined

        const updatedUser = await userModel.findOneAndUpdate({ email },
            {
                name: name || user.name,
                password: securePWD || user.password
            },
            { new: true })

        updatedUser.password = undefined;

        return res.status(200).send({
            success: true,
            message: "update user success",
            updatedUser
        })

    } catch (error) {
        console.log(error)
        return res.status(404).send({
            success: false,
            message: "error in update api",
            error: error
        })
    }

}









module.exports = { userRegister, userLogin, userUpdate, requireSignIn };