import express from "express";
import{ addServicesform, servicesId, editServicesForm, servicesDelete } from "../controllers/servicesController.js";
const router = express.Router();

router.post("/addServicesform", addServicesform);
router.post("/servicesId", servicesId);
router.post("/editServicesForm", editServicesForm);
router.post("/servicesDelete", servicesDelete);
export default router;