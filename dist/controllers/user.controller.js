import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const registerUser = async (req, res) => {
    try {
        const { username, email, password, fullname } = req.body;
        if (!username || !email || !password) {
            res.status(400).json({
                message: "Please fill in all the fields",
                success: false,
            });
            return;
        }
        const checkUser = await User.findOne({ email });
        if (checkUser) {
            res.status(400).json({
                message: "User with this email already exists !",
                success: false,
            });
            return;
        }
        // password hashing
        const hashPassword = await bcrypt.hash(password, 10);
        const user = new User({
            username,
            email,
            password: hashPassword,
            fullname: fullname || "",
        });
        await user.save();
        res.status(201).json({
            message: "User Registered !",
            success: true,
            user,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error registering the user !",
            success: false,
        });
        return;
    }
};
export const loginUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if ((!username && !email) || !password) {
            res.status(400).json({
                message: "Please input all the fields",
                success: false,
            });
            return;
        }
        const user = await User.findOne({ email });
        if (!user) {
            res.status(404).json({
                message: "User not found with this email",
                success: false,
            });
            return;
        }
        // password matching
        const inputPassword = await bcrypt.compare(password, user.password);
        if (!inputPassword) {
            res.status(400).json({
                message: "Incorrect password",
                success: false,
            });
            return;
        }
        // token creation
        const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET || "secret", { expiresIn: "7d" });
        res.status(200).json({
            message: `Hello ${user.username}`,
            success: true,
            accessToken,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error logging the user !",
            success: false,
        });
        return;
    }
};
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.user.id;
        const checkUser = await User.findByIdAndDelete(id);
        if (!checkUser) {
            res.status(404).json({
                message: "User not found",
                success: false,
            });
            return;
        }
        res.status(200).json({
            message: "User deleted !",
            success: true,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error deleting the user !",
            success: false,
        });
        return;
    }
};
export const updateUser = async (req, res) => {
    try {
        const { username, email, password, fullname } = req.body;
        const { id } = req.user.id;
        const user = await User.findById(id);
        if (!user) {
            res.status(404).json({
                message: "User does not exist",
                success: false,
            });
            return;
        }
        if (email && email !== user.email) {
            const emailExists = await User.findOne({ email });
            if (emailExists) {
                res.status(400).json({
                    message: "User with this email exists try using another !",
                    success: false,
                });
                return;
            }
        }
        const updatedData = {};
        if (username)
            updatedData.username = username;
        if (email)
            updatedData.email = email;
        if (password)
            updatedData.password = await bcrypt.hash(password, 10);
        const updatedUser = await User.findByIdAndUpdate(id, updatedData, {
            new: true,
        });
        res.status(200).json({
            message: "User updated !",
            success: true,
            user: updatedUser,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error deleting the user !",
            success: false,
        });
        return;
    }
};
export const getProfileDetails = async (req, res) => {
    try {
        const id = req.user.id;
        const userDetails = await User.findById(id);
        if (!userDetails) {
            res.status(404).json({
                message: "User not found",
                success: false,
            });
            return;
        }
        res.status(200).json({
            message: `Profile details for ${userDetails.username}`,
            userDetails: {
                id: userDetails._id,
                username: userDetails.username,
                email: userDetails.email,
            },
            success: true,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error deleting the user !",
            success: false,
        });
        return;
    }
};
