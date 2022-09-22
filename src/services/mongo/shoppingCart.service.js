import {ShoppingCart} from "../../models/mongo/ShoppingCart.js";
import {Product} from "../../models/mongo/Product.js";

export default class ShoppingCartService {

    getAllShoppingCarts(req, res) {
        ShoppingCart.find()
            .then((product) => {
            res.status(200).json({product});
        }).catch((error) => {
            console.log({message: error.message})
        })
    }

    getProductsByShoppingCart(req, res) {
        const {id} = req.params;
        ShoppingCart.findById(id)
            .then((products) => {
                res.status(200).json({products});
            }).catch((error) => {
            console.log({message: error.message})
        });
    }

    createShoppingCart(req, res) {
        const timestamp = Date.now();
        const {name, description, code, picture, price, stock} = req.body;
        const product = new Product({timestamp, name, description, code, picture, price, stock});
        const shoppingCart = new ShoppingCart({timestamp, product});
        shoppingCart.save()
            .then((data) => {
                res.status(200).json({data});
            })
            .then(() => console.log('ShoppingCart created successfully'))
            .catch((error) => {
                console.log({message: error.message})
            });
    }

    addProductToShoppingCart(req, res) {
        const timestamp = Date.now();
        const {name, description, code, picture, price, stock} = req.body;
        const product = new Product({timestamp, name, description, code, picture, price, stock});
        product.save()
            .then((response) => {
                res.status(201).json({response});
            }).catch((error) => console.log({message: error.message}))
    }

    updateProductFromShoppingCart(req, res) {
        const {id} = req.params;
        const {name, description, code, picture, price, stock} = req.body;
        Product.findByIdAndUpdate(id, {
            $set: {name, description, code, picture, price, stock}
        }).then(() => {
            res.status(200).json({message: 'Product updated successfully'});
        }).catch((error) => {
            res.status(400).json('Product not found');
            console.log({message: error})
        });
    }

    getProductByIdFromShoppingCart(req, res) {
        const {id} = req.params;
        Product.findById(id)
            .then((product) => {
                res.status(200).json({product});
            }).catch((error) => {
            res.status(400).json('Product not found');
            console.log({message: error})
        })
    }

    deleteProductByIdFromShoppingCart(req, res) {
        const {id} = req.params;
        Product.findByIdAndDelete(id)
            .then(() => {
                res.status(204).json({id});
            }).catch((error) => {
            res.status(400).json('Product not found');
            console.log({message: error})
        })
    }

}