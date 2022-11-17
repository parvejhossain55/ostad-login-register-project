const mongoose = require("mongoose");
const validator = require("validator");

const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "Please provide your first name"],
            trim: true,
            minLength: [3, "Name must be at least 3 characters"],
            maxLength: [100, "Name is too large"],
        },
        lastName: {
            type: String,
            required: [true, "Please provide your last name"],
            trim: true,
            minLength: [3, "Name must be at least 3 characters"],
            maxLength: [100, "Name is too large"],
        },
        email: {
            type: String,
            validate: [validator.isEmail, "Provide a valid Email Address"],
            trim: true,
            lowercase: true,
            unique: [true, "Please provide a unique email address"],
            required: [true, "Email address is required"],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            validate: {
                validator: (value) => {
                    validator.isStrongPassword(value, {
                        minLength: 6,
                        minLowercase: 3,
                        minNumbers: 1,
                        minUppercase: 1,
                        minSymbols: 1,
                    });
                },
                message: "Password {VALUE} is not strong enough",
            },
        },
        confirmPassword: {
            type: String,
            required: [true, "Please confirm your password"],
            validate: {
                validator: function (value) {
                    if (this.password === value) return;
                },
                message: "Passwords don't match!",
            },
        },
    },
    { timestamps: true, versionKey: false }
);

userSchema.pre("save", function (next) {
    if (!this.isModified("password")) {
        //  only run if password is modified, otherwise it will change every time we save the user!

        this.confirmPassword = undefined;
        return next();
    }

    const hashedPassword = bcrypt.hashSync(this.password);

    this.password = hashedPassword;
    this.confirmPassword = undefined;

    next();
});

const User = mongoose.model("users", userSchema);

module.exports = User;
