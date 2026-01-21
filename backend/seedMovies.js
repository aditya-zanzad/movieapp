import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Movie from './models/Movies.js';
import User from './models/User.js';

dotenv.config();

const seedData = [
    {
        name: "The Shawshank Redemption",
        description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
        genre: ["Drama"],
        rating: 9.3,
        duration: 142,
        releaseDate: new Date("1994-09-22"),
        language: "English",
        cast: ["Tim Robbins", "Morgan Freeman"],
        director: "Frank Darabont"
    },
    {
        name: "The Godfather",
        description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
        genre: ["Crime", "Drama"],
        rating: 9.2,
        duration: 175,
        releaseDate: new Date("1972-03-24"),
        language: "English",
        cast: ["Marlon Brando", "Al Pacino"],
        director: "Francis Ford Coppola"
    },
    {
        name: "The Dark Knight",
        description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
        genre: ["Action", "Crime", "Drama"],
        rating: 9.0,
        duration: 152,
        releaseDate: new Date("2008-07-18"),
        language: "English",
        cast: ["Christian Bale", "Heath Ledger"],
        director: "Christopher Nolan"
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB for seeding...");

        // Find an existing admin or create a dummy user to be the owner
        let user = await User.findOne({ role: 'admin' });
        if (!user) {
            console.log("No admin found, creating a dummy seed user...");
            user = await User.create({
                name: "Seed Admin",
                email: "admin@seed.com",
                password: "password123", // Note: In production use hashed passwords
                role: "admin"
            });
        }

        const moviesWithUser = seedData.map(movie => ({
            ...movie,
            createdBy: user._id
        }));

        await Movie.deleteMany({}); // Clear existing movies
        await Movie.insertMany(moviesWithUser);

        console.log("Database seeded successfully with 3 movies!");
        process.exit();
    } catch (err) {
        console.error("Error seeding database:", err);
        process.exit(1);
    }
};

seedDB();
