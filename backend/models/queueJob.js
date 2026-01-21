import mongoose from 'mongoose';

const queueJobSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['INSERT_MOVIE'],
      required: true
    },
    payload: {
      type: Object,
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'completed', 'failed'],
      default: 'pending',
      index: true
    },
    retryCount: {
      type: Number,
      default: 0
    },
    processedAt: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('QueueJob', queueJobSchema);
