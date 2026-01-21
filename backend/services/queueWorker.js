import QueueJob from "../models/queueJob.js";
import Movie from "../models/Movies.js";

const processQueue = async () => {
    try {
        // Find next pending job
        const job = await QueueJob.findOneAndUpdate(
            { status: "pending" },
            { status: "processing" },
            { sort: { createdAt: 1 }, new: true }
        );

        if (!job) return; // No jobs to process

        console.log(`Processing job ${job._id} of type ${job.type}`);

        try {
            if (job.type === "INSERT_MOVIE") {
                await Movie.create(job.payload);
            }

            job.status = "completed";
            job.processedAt = new Date();
            await job.save();
            console.log(`Job ${job._id} completed`);

        } catch (error) {
            console.error(`Job ${job._id} failed:`, error);
            job.status = "failed";
            job.retryCount += 1;
            await job.save();
        }

    } catch (error) {
        console.error("Queue processor error:", error);
    }
};

export const startWorker = () => {
    console.log("Queue worker started...");
    // Poll every 5 seconds
    setInterval(processQueue, 5000);
};
