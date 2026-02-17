const express = require('express');
const Cart = require('../models/Cart');

const getCarts = async (req, res) => {
    res.status(501).json({ message: 'Not implemented yet' });
}

const addToCart = async (req, res) => {
    res.status(501).json({ message: 'Not implemented yet' });
}

const updateQuantity = async (req, res) => {
    res.status(501).json({ message: 'Not implemented yet' });
}

const removeFromCart = async (req, res) => {
    res.status(501).json({ message: 'Not implemented yet' });
}

module.exports = {
    getCarts,
    addToCart,
    updateQuantity,
    removeFromCart
};