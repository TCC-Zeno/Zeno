import express from "express";
import{createProduct, createSupplier, readProduct, updateProductById, deleteProductById, readSupplier, updateSupplierById, deleteSupplierById,}from "../controllers/stockController.js";

const router = express.Router();

router.post("/createProduct", createProduct);
router.post("/createSupplier", createSupplier);
router.post("/readProduct",  readProduct);
router.post("/updateProductById", updateProductById);
router.post("/deleteProductById", deleteProductById);
router.post("/readSupplier", readSupplier);
router.post("/updateSupplierById", updateSupplierById);
router.post("/deleteSupplierById", deleteSupplierById);


export default router;