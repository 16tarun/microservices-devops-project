const express = require("express");

const router = express.Router();

const validate = require("../middleware/validate");

const { productSchema } = require("../validators/productValidator");

const controller = require("../controllers/productController");

router.post("/", validate(productSchema), controller.create);

router.get("/", controller.getAll);

router.get("/:id", controller.getOne);

router.put("/:id", validate(productSchema), controller.update);

router.delete("/:id", controller.remove);

module.exports = router;
