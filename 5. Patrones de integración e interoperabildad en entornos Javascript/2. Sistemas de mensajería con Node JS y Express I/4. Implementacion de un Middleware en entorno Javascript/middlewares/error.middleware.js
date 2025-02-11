const error_handling = (err, req, res, next) => {
    console.error(`Resource: ${req.path}, Ip: ${req.ip} - Error: ${err.message}`);
    res.status(500).send("Internal Server error");
};

module.exports = error_handling;