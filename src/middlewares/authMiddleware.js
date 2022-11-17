const { expressjwt } = require("express-jwt");

exports.isAuthenticated = expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
});
