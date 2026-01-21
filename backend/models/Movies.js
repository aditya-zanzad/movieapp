import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index: true
    },
    description: {
      type: String,
      required: true,
      index: 'text'
    },
    genre: {
      type: [String],
      required: true
    },
    rating: {
      type: Number,
      min: 0,
      max: 10,
      default: 0
    },
    duration: {
      type: Number, // minutes
      required: true
    },
    releaseDate: {
      type: Date,
      required: true,
      index: true
    },
    language: {
      type: String,
      required: true
    },
    cast: {
      type: [String]
    },
    director: {
      type: String
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true
  }
);

// For search by name & description
movieSchema.index({ name: 'text', description: 'text' });

export default mongoose.model('Movie', movieSchema);
