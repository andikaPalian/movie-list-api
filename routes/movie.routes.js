const express = require("express");
const validateToken = require("../middleware/authMiddleware");
const { getMovies, addMovie, getSingleMovie, updateMovie, deleteMovie } = require("../controllers/movie.controllers");
const router = express.Router();

router.use(validateToken);
router.get("/get", getMovies);
router.post("/add", addMovie);
router.get("/get/:id", getSingleMovie);
router.put("/update/:id", updateMovie);
router.delete("/delete/:id", deleteMovie);

module.exports = router;