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

            const token = generateAccessToken(newUser); //generate token

            res.status(201).json({
                token,
                user: {
                    id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                    role: newUser.role,
                    companyName: newUser.companyName || '',
                    phoneNumber: newUser.phoneNumber || '',
                    address: newUser.address || ''
                }
            })
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

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = generateAccessToken(user); //generate token

        res.json({
            token,
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                role: user.role,
                companyName: user.companyName,
                phoneNumber: user.phoneNumber,
                address: user.address
            }
        });


    } catch (error) {
        res.status(500).json({ message: error.message }); //server error if there is en error here 
    }
}


const getUserProfile = async (req, res) => {
    res.status(501).json({ message: 'Not implemented yet' });
}

const updateProfile = async (req, res) => {

    try {
        const { name, email, phoneNumber, companyName, address } = req.body;
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        } else {
            user.name = name || user.name;
            user.email = email || user.email;
            user.phoneNumber = phoneNumber || user.phoneNumber;
            user.companyName = companyName || user.companyName;
            user.address = address || user.address;

            const updateUser = await user.save();
            res.json({
                message: 'Profile updated successfully',
                user: {
                    id: updateUser._id,
                    email: updateUser.email,
                    name: updateUser.name,
                    role: updateUser.role,
                    companyName: updateUser.companyName,
                    phoneNumber: updateUser.phoneNumber,
                    address: updateUser.address
                }
            })
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    updateProfile
};