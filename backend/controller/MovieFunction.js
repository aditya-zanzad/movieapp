import Movie from "../models/Movies.js";
import QueueJob from "../models/queueJob.js";

export const createMovie = async (req, res, next) => {
    try {
        const { name, description, genre, rating, duration, releaseDate, language, cast, director } = req.body;

        // Lazy insertion via Queue
        const job = await QueueJob.create({
            type: 'INSERT_MOVIE',
            payload: {
                name,
                description,
                genre,
                rating,
                duration,
                releaseDate,
                language,
                cast,
                director,
                createdBy: req.user.id // Get from protect middleware
            }
        });

        res.status(202).json({
            success: true,
            message: "Movie creation queued",
            jobId: job._id
        });
    } catch (error) {
        next(error);
    }
};

export const UpdateMovie = async (req, res, next) => {
    try {
        const { id } = req.params;
        const movie = await Movie.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

        if (!movie) {
            return res.status(404).json({ success: false, message: "Movie not found" });
        }

        res.status(200).json({
            success: true,
            message: "Movie updated successfully",
            data: movie
        });
    } catch (error) {
        next(error);
    }
};

export const deleteMovie = async (req, res, next) => {
    try {
        const { id } = req.params;
        const movie = await Movie.findByIdAndDelete(id);

        if (!movie) {
            return res.status(404).json({ success: false, message: "Movie not found" });
        }

        res.status(200).json({
            success: true,
            message: "Movie deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};