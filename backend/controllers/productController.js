const express = require('express');
const Product = require('../models/Product');

const createProduct = async (req, res) => {
    res.status(501).json({ message: 'Not implemented yet' });
}

const getProducts = async (req, res) => {
    res.status(501).json({ message: 'Not implemented yet' });
}

const getProductById = async (req, res) => {
    res.status(501).json({ message: 'Not implemented yet' });
}

const updateProduct = async (req, res) => {
    res.status(501).json({ message: 'Not implemented yet' });
}

const deleteProduct = async (req, res) => {
    res.status(501).json({ message: 'Not implemented yet' });
}

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
};
