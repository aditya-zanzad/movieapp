import Movies from "../models/Movies.js";

export const getMovies = async (req, res, next) => {
    try {
        const movie = await Movies.find();
        res.json(movie);
    } catch (error) {
        next(error);
    }
}

export const getSearchMovies = async (req, res, next) => {
    try {
        const { query } = req.query;

        const movies = await Movies.find({
            $or: [
                { name: { $regex: query, $options: "i" } },
                { description: { $regex: query, $options: "i" } }
            ]
        });

        res.status(200).json(movies);
    } catch (error) {
        next(error);
    }
};


export const getSortedMovies = async (req, res, next) => {
    try {
        const { sortBy = "name", order = "asc" } = req.query;

        const allowedFields = ["name", "rating", "releaseDate", "duration"];

        if (!allowedFields.includes(sortBy)) {
            return res.status(400).json({
                success: false,
                message: "Invalid sort field"
            });
        }

        const sortOptions = {};
        sortOptions[sortBy] = order === "desc" ? -1 : 1;

        const movies = await Movies.find().sort(sortOptions);

        res.status(200).json({
            success: true,
            data: movies
        });
    } catch (error) {
        next(error);
    }
};
