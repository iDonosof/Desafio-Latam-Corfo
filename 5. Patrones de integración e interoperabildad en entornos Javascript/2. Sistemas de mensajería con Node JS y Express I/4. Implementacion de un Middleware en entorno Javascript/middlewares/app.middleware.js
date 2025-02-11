const appMiddleware = (req, res, next) => {
    // console.log(`Request from ${req.ip} to ${req.path}`);
    next();
};

module.exports = appMiddleware;
