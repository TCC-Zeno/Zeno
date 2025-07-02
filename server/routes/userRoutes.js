import express from "express";
import {
  addUser,
  fetchUsers,
  fetchUserById,
  fetchUserByEmail,
  modifyUser,
  removeUser,
  findUsers,
} from "../controllers/userController.js";

const router = express.Router();

 router.post ("/users", addUser);
 router.get ("/users", fetchUsers)
 router.get("/users/search", findUsers)
 router.get("/users/:id", fetchUserById);
router.put("/users/:id", modifyUser);
router.delete("/users/:id", removeUser);
router.get("/users/email/:email", fetchUserByEmail);

export default router;