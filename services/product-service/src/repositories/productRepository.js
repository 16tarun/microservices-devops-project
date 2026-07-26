const prisma = require("../config/prisma");

// Create Product
const createProduct = async (data) => {
  return prisma.product.create({
    data,
  });
};

// Get All Products
const getAllProducts = async () => {
  return prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

// Get Product By ID
const getProductById = async (id) => {
  return prisma.product.findUnique({
    where: {
      id,
    },
  });
};

// Update Product
const updateProduct = async (id, data) => {
  return prisma.product.update({
    where: {
      id,
    },
    data,
  });
};

// Delete Product
const deleteProduct = async (id) => {
  return prisma.product.delete({
    where: {
      id,
    },
  });
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
