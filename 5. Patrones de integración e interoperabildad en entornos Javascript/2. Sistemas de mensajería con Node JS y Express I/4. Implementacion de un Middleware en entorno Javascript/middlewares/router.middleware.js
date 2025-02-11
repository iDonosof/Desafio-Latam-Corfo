const routerMiddleware = (req, res, next) => {
    // console.log(`Request from router ${req.ip} to ${req.path}`);
    next();
};

module.exports = routerMiddleware;
