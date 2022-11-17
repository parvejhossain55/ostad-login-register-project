const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.generateToken = (user) => {
    const payload = {
        _id: user._id,
        email: user.email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "1days"});
    return token;
};

exports.decodeToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
        return data._id;
    });
};

exports.comparePassword = (password, hash) => {
    return bcrypt.compareSync(password, hash);
};
