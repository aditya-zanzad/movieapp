export const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    // Log the error for server-side debugging
    console.error(`Error: ${err.message}`);
    console.error(err.stack);

    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
};
