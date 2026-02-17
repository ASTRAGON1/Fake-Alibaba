const express = require('express');
const Order = require('../models/Order');

const placeOrder = async (req, res) => {
    res.status(501).json({ message: 'Not implemented yet' });
}

const getOrders = async (req, res) => {
    res.status(501).json({ message: 'Not implemented yet' });
}

const getOrderById = async (req, res) => {
    res.status(501).json({ message: 'Not implemented yet' });
}

const updateOrder = async (req, res) => {
    res.status(501).json({ message: 'Not implemented yet' });
}

const deleteOrder = async (req, res) => {
    res.status(501).json({ message: 'Not implemented yet' });
}

module.exports = {
    placeOrder,
    getOrders,
    getOrderById,
    updateOrder,
    deleteOrder
};