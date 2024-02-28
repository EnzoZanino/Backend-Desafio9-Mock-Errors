import { productsService } from "../services/service.js";

import CustomError from "../services/errors/CustomError.js";
import ErrorsEnum from "../services/errors/errors-enum.js";
import { generateProducts } from "../utils/productsgen.js";
import { generateProductErrorInfo } from "../services/errors/messages/product-creation-error.message.js";

export const generateMockProductsController = async (req, res) => {
  try {
    let products = generateProducts();
    res.send({ status: "success", payload: products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProductsController = async (req, res) => {
  const { limit, page, sort } = req.query;
  try {
    let products = await productsService.getAll(limit, page, sort);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProductController = async (req, res) => {
  try {
    let pid = req.params.pid;
    let product = await productsService.getOne(pid);
    if (!product) {
      return res.status(404).send("No product found");
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const postProductController = async (req, res) => {
  try {
    const {title, description, code, price, status, stock, category, thumbnails} = req.body;
      if (!title || !description || !code || !price || !stock || !category || !thumbnails) {
        CustomError.createError({ name: "Product creation error", cause: generateProductErrorInfo(
        {title, description, code, price, status, stock, category, thumbnails,}),
        message: "Error creating product",
        code: ErrorsEnum.INVALID_TYPES_ERROR,
      });
    }
    const product = {title, description, code, price, status, stock, category, thumbnails, };
    await productsService.create(product);
    res.json(product);
  } catch (error) {
    console.log(error.cause);
    res.status(500).json({ error: error.message });
  }
};

export const putProductController = async (req, res) => {
  const pid = req.params.pid;
  const product = req.body;
  try {
    await productsService.update(pid, product);
    if (!product) return res.status(404).send("No product found");
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteProductController = async (req, res) => {
  const pid = req.params.pid;
  try {
    let product = await productsService.getOne(pid);
    if (!product) return res.status(404).send("No product found");
    await productsService.delete(pid);
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
