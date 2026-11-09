const { Schema } = require("mongoose");
const bcrypt = require("bcryptjs");

const UsersSchema = new Schema({
    email: {
        type: String,
        required: [true, "Your email address is required"],
        unique: true,
        lowercase: true,
        trim: true,
    },
    username: {
        type: String,
        required: [true, "Your username is required"],
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Your password is required"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Pre-save hook to hash password before saving
UsersSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Method to verify password
UsersSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

module.exports = UsersSchema;
