const express = require('express');
const generateAccessToken = require('../utils/jwt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    try {
        let { name, password, email, role } = req.body;
        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ message: 'Email already exist' });
        } else {
            const newUser = await User.create({ name, email, password, role });

            const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' }); //generate token

            res.status(201).json({ token, user: { name, email, role } })
        }

    } catch (error) {
        res.status(500).json({ message: error.message }); //server error if there is en error here 
    }
}

const loginUser = async (req, res) => {

    try {
        let { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isMatch = await matchPassword(password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = generateAccessToken(user); //generate token

        res.json({
            token,
            user: {
                id: User.id,
                email: User.email,
                name: User.name,
                role: User.role
            }
        });


    } catch (error) {
        res.status(500).json({ message: error.message }); //server error if there is en error here 
    }
}

const logoutUser = async (req, res) => {
    res.status(501).json({ message: 'Not implemented yet' });
}

const getUserProfile = async (req, res) => {
    res.status(501).json({ message: 'Not implemented yet' });
}

const updateProfile = async (req, res) => {
    res.status(501).json({ message: 'Not implemented yet' });
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getUserProfile,
    updateProfile
};