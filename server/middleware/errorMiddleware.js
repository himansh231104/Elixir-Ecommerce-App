const path = require("path");

// Not Found Handler
const notFound = (req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, "../client/src/Pages/404/index.js"));
  };
  
  // Error Handler Middleware
  const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
  
    res.json({
      message: err.message,
      stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
  };
  
  module.exports = { notFound, errorHandler };
  