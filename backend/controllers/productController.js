const express = require('express');
const Product = require('../models/Product');

const createProduct = async (req, res) => {
    const { title, description, category, price, stock, moq, image } = req.body;
    try {
        const product = await Product.create({
            name: title,
            description,
            category,
            price,
            stock,
            moq,
            image,
            seller: req.user._id
        });
        res.status(201).json({
            message: 'Product created successfully',
            product: {
                _id: product._id,
                name: product.name,
                description: product.description,
                category: product.category,
                price: product.price,
                stock: product.stock,
                moq: product.moq,
                image: product.image,
                seller: product.seller
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getProducts = async (req, res) => {
    try {
        const products = await Product.find({ seller: req.user._id }).lean();

        const transformedProducts = products.map(product => ({ //this function changes the data sent, instead of sending name
            ...product,                                        // it will send title, so the funftion in frontend can take the right parameter
            title: product.name,
            status: product.stock > product.moq ? 'Active' : 'Out of Stock'
        }));

        res.json({ products: transformedProducts });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getProductById = async (req, res) => {
    res.status(501).json({ message: 'Not implemented yet' });
}

const updateProduct = async (req, res) => {
    res.status(501).json({ message: 'Not implemented yet' });
}

const deleteProduct = async (req, res) => {
    try {
        const product_id = req.params.id;

        const product = await Product.findById(product_id);

        if (!product) {
            return res.status(404).json({ message: 'could not find the product' });
        }

        if (product.seller.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'You cannot delete this product' });
        }

        await Product.deleteOne({ _id: product_id });

        res.json({ message: 'deleted' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
};
