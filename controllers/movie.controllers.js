const Movie =  require("../models/movie.models");
const mongoose = require("mongoose");
const userModels = require("../models/user.models");

const getMovies = async (req, res) => {
    try {
        const {genre} = req.query;
        const filters = {user_id: req.user.id};
        if (genre) {
            filters.genre = {$in: genre.split(", ")};
        };
        const movies = await Movie.find(filters);
        if (!movies) {
            return res.status(404).json({message: "Movie not found"});
        };
        res.status(200).json({data: movies});
    } catch (error) {
        console.error("Error in getMovies controller:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message || "An unexpected error occurred",
        });
    };
};

const addMovie = async (req, res) => {
    try {
        const {title, description, release_date, runtime, genre, director, cast} = req.body;
        if (!title || !description || !release_date || !runtime || !genre || !director || !cast) {
            return res.status(400).json({message: "All fields are required"});
        };
        const movie = new Movie({
            title,
            description,
            release_date,
            runtime,
            genre,
            director,
            cast,
            user_id: req.user.id,
        });
        await movie.save();
        res.status(201).json({message: "Movie added successfully", data: movie});
    } catch (error) {
        console.error("Error in addMovie controller:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message || 'An unexpected error occurred',
        });
    };
};

const getSingleMovie = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({message: "Invalid ID"});
        }
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            return res.status(404).json({message: "Movie not found"});
        };
        res.status(200).json({data: movie});
    } catch (error) {
        console.error("Eerror in getSingleMovie conroller:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message || "An unexpected error occurred",
        });
    };
};

const updateMovie = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({message: 'Invalid ID'});
        };
        const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!movie) {
            return res.status(404).json({message: 'Movie not found'});
        };
        res.status(200).json({message: "Movie updated successfully", data: movie});
    } catch (error) {
        console.error("Error in updateMovie controller:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message || "An unexpected error occurred",
        });
    };
};

const deleteMovie = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({message: "Invalid ID"});
        };
        const movie = await Movie.findByIdAndDelete(req.params.id);
        if (!movie) {
            return res.status(404).json({message: "Movie not found"});
        };
        res.status(200).json({message: "Movie deleted successfully"});
    } catch (error) {
        console.error("Error in deleteMovie controller:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message || "An unexpected error occurred",
        });        
    };
};

module.exports = {getMovies, addMovie, getSingleMovie, updateMovie, deleteMovie};