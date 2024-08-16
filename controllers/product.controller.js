import product from "../Models/product.js";
import { AppError } from '../middlewares/appError.js';
import productSchema from '../validation/product.js';
const getAllProducts = async (req, res) => {
  try {
    const allProducts = await product.findAll();
    res.status(200)
      .json({
        "Status": "Success",
        "Message": "All Products",
        "data": allProducts
      });
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
}
const getOneProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return next(new AppError('fail to find Prodcut,Please provide a product Id'))
    }
    const oneProduct = await product.findByPk(id);
    res.status(200)
      .json({
        "Status": "Success",
        "Message": "One Products",
        "data": oneProduct
      });
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
}
const editProduct = async (req, res) => {
  try {
    if (req.user.role != 'admin' || 'supervisor') {
      return next(new AppError('you must be admin'))
    }
    const { id } = req.params;
    if (!id) {
      return next(new AppError('fail to find Prodcut,Please provide a product Id'))
    }
    const existingProduct = await product.findOne({ where: { id } });
    if (!existingProduct) {
      return next(new AppError('fail to find Prodcut'))
    }

    const { error } = productSchema.validate(req.body);
    if (error) {
      return res.status(403).json({
        Status: "Error",
        Message: error.message,
      });
    }
    const {
      product_name,
      price,
      imagePath,
      description } = req.body;

    const updatedProduct = await product.update(
      {
        product_name,
        price,
        imagePath,
        description,
      },
      { where: { id } }
    );
    const newProduct = await product.findOne({ where: { id } });
    res.status(200).json({
      Status: "Success",
      Message: "Product updated Successfully",
      data: newProduct,
    });
  } catch (err) {
    res.status(500).json({
      Status: "Error",
      Message: err.message,
    });
  }
};
const addProduct = async (req, res) => {
  try {
    if (req.user.role != 'admin') {
      return next(new AppError('you must be admin'))
    }
    const { error } = productSchema.validate(req.body);
    if (error) {
      return res.status(403).json({
        Status: "Error",
        Message: error.details[0].message,
      });
    }
    const {
      product_name,
      price,
      imagePath,
      description, } =
      req.body;
    const product = await product.create({
      product_name,
      price,
      imagePath,
      description,
    });
    res.status(201).json({
      Status: "Success",
      Message: "Product Added Succesfully",
      data: product,
    });
  } catch (err) {
    res.status(500).json({
      Status: "Error",
      Message: err,
    });
  }
};
const deleteProduct = async (req, res) => {
  try {
    if (req.user.role != 'admin') {
      return next(new AppError('you must be admin'))
    }
    const { id } = req.params;
    if (!id) {
      return res.status(403).json({
        Status: "Error",
        Message: "Product Id is Required",
      });
    }
    const existingProduct = await product.findOne({ where: { id } });
    if (!existingProduct) {
      return res.status(404).json({
        Status: "Error",
        Message: "Product Not Found",
      });
    }
    await Product.destroy({ where: { id } });
    res.status(200).json({
      Status: "Success",
      Message: "Product Deleted Successfully",
    });
  } catch (err) {
    res.status(500).json({
      Status: "Error",
      Message: err,
    });
  }
};
export default {
  getAllProducts,
  getOneProduct,
  editProduct,
  addProduct,
  deleteProduct
}