import express from "express";
import {
  createProduct,
  createSupplier,
  readProduct,
  updateProductById,
  deleteProductById,
  readSupplier,
  updateSupplierById,
  deleteSupplierById,
  readSupplierWithID,
  readCategorysOfProducts,
  getAlerts,
} from "../controllers/stockController.js";
import multer from "multer";

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post("/createProduct", upload.single("image"), createProduct);
router.post("/createSupplier", createSupplier);
router.post("/readProduct", readProduct);
router.post("/updateProductById", updateProductById);
router.post("/deleteProductById", deleteProductById);
router.post("/readSupplier", readSupplier);
router.post("/readSupplierWithID", readSupplierWithID);
router.post("/updateSupplierById", updateSupplierById);
router.post("/deleteSupplierById", deleteSupplierById);
router.post("/readCategorysOfProducts", readCategorysOfProducts);
router.post("/getAlerts", getAlerts);

export default router;
