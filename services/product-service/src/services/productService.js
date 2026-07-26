const logger = require("../utils/logger");
const productRepository = require("../repositories/productRepository");

// Create Product
const createProduct = async (body) => {
  const product = await productRepository.createProduct({
    name: body.name,
    description: body.description,
    price: body.price,
    stock: body.stock,
    category: body.category,
    imageUrl: body.imageUrl,
  });

  logger.info(`Product created: ${product.name}`);

  return {
    message: "Product created successfully",
    product,
  };
};

// Get All Products
const getAllProducts = async () => {
  return await productRepository.getAllProducts();
};

// Get Product By ID
const getProductById = async (id) => {
  const product = await productRepository.getProductById(Number(id));

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};

// Update Product
const updateProduct = async (id, body) => {
  await getProductById(id);

  const updatedProduct = await productRepository.updateProduct(Number(id), {
    name: body.name,
    description: body.description,
    price: body.price,
    stock: body.stock,
    category: body.category,
    imageUrl: body.imageUrl,
  });

  logger.info(`Product updated: ${updatedProduct.name}`);

  return {
    message: "Product updated successfully",
    product: updatedProduct,
  };
};

// Delete Product
const deleteProduct = async (id) => {
  const product = await getProductById(id);

  await productRepository.deleteProduct(Number(id));

  logger.info(`Product deleted: ${product.name}`);

  return {
    message: "Product deleted successfully",
  };
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
