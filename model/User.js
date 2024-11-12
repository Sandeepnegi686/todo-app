import mongoose from "mongoose";
import validator from "validator";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: { type: String, require: [true, "Please provide name"], trim: true },
  email: {
    type: String,
    require: [true, "Please provide email"],
    validate: {
      validator: validator.isEmail,
      message: (props) => `${props.value} is not a valid email!`,
    },
    unique: true,
  },
  password: {
    type: String,
    require: [true, "Please provide password"],
    minlength: 6,
    select: false,
  },
  profileImg: {
    type: String,
    default: "/uploads/demo-profile.jpg",
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return;
  const salt = bcryptjs.genSaltSync(10);
  const hashedPassword = bcryptjs.hashSync(this.password, salt);
  this.password = hashedPassword;
});

userSchema.methods.createJWT = function () {
  // Generate a JWT
  const token = jwt.sign({ userId: this._id }, process.env.JWT_KEY, {
    expiresIn: process.env.JWT_LIFETIME,
  });

  return token;
};

userSchema.methods.comparePasswords = async function (loginPass) {
  const isCorrectPassword = bcryptjs.compareSync(loginPass, this.password);
  return isCorrectPassword;
};

const userModel = new mongoose.model("users", userSchema);

export default userModel;
