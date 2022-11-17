const { comparePassword, generateToken } = require("../helpers/authHelper");
const {
    RegisterService,
    FindService,
    checkEmailAndCodeForChangePassword,
    checkVerificationCodeService,
    updateProfileService,
    FindAdnUpdateService,
} = require("../services/UserService");
const bcrypt = require("bcryptjs");

exports.RegisterController = async (req, res) => {
    try {
        const user = await RegisterService(req.body);
        if (user) {
            res.status(200).json({
                status: "Success",
                data: user,
                message: "User Successfully Registered",
            });
        } else {
            res.status(200).json({
                status: "Failed",
                data: user,
                message: "User Regitration Failed",
            });
        }
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            data: error,
            message: error.message,
        });
    }
};

exports.LoginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(401).json({
                status: "Failed",
                error: "Please provide valid email or password",
            });
        }

        const user = await FindService({ email });

        if (!user) {
            return res.status(401).json({
                status: "Failed",
                error: "No user found in this email address",
            });
        }

        const isPasswordValid = comparePassword(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                status: "Failed",
                error: "Password does not match",
            });
        }

        const token = generateToken(user);

        res.status(200).json({
            status: "Success",
            message: "Successfully Loged In",
            data: { token, user },
        });
    } catch (error) {
        res.status(500).json({
            status: "Failed to Log in ",
            message: error.message,
        });
    }
};

exports.ChangePasswordController = async (req, res) => {
    try {
        const { email, password, updatepass } = req.body;

        const checkEmail = await FindService({ email: email });
        const checkPass = comparePassword(password, checkEmail.password);

        if (!checkEmail && !checkPass) {
            res.status(500).json({
                status: "failed",
                message: "Invalid Emial or Password",
            });
        }

        const hashPass = bcrypt.hashSync(updatepass);

        const data = await FindAdnUpdateService(
            { email: email },
            { password: hashPass }
        );

        console.log(data);

        // if (data) {
        //     res.status(200).json({
        //         status: "success",
        //         message: "password change and update",
        //         data: data,
        //     });
        // } else {
        //     res.status(500).json({
        //         status: "failed",
        //         message: "Failed to hash password",
        //         data: err,
        //     });
        // }
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: error,
        });
    }
};
