import express from "express";
import { getMovies, getSortedMovies, getSearchMovies } from "../controller/MoviesDetails.js";
const router = express.Router();

router.get("/movies", getMovies);
router.get("/movies/sorted", getSortedMovies);
router.get("/movies/search", getSearchMovies);

export default router;
