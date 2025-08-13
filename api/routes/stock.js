import express from "express";
import{createStock, createProduct, createSupplier}from "../controllers/stockController.js";

const router = express.Router();

router.post("/createStock", createStock);
router.post("/createProduct", createProduct);
router.post("/createSupplier", createSupplier);
/*
router.get("/readStocks", readStocks);
router.put("/updateStock", updateStockById);
router.delete("/deleteStock", deleteStockById);
*/

export default router;