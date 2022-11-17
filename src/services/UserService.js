const User = require("../models/UserModel");

exports.RegisterService = async (data) => {
    return await User.create(data);
};

exports.FindService = async (find) => {
    return await User.findOne(find);
};

exports.FindAdnUpdateService = async (find, update) => {
    return await User.findOneAndUpdate(find, update);
};
