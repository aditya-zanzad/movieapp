import express from 'express';
import { protect } from "../middleware/auth.js";
import { isAdmin } from "../middleware/role.js";
import { createMovie } from "../controller/MovieFunction.js";
import { UpdateMovie } from '../controller/MovieFunction.js';
import { deleteMovie } from '../controller/MovieFunction.js';
const router = express.Router();

router.post("/movies", protect, isAdmin, createMovie);

router.put("/movies/:id", protect, isAdmin, UpdateMovie);

router.delete("/movies/:id", protect, isAdmin, deleteMovie);
export default router