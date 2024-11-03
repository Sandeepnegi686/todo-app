import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
// import bcrypt from "bcryptjs";

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
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return;
  // const salt = process.env.BCRYPT_KEY || "";
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
});

userSchema.methods.createJWT = function () {
  // Generate a JWT
  const token = jwt.sign({ userId: this._id }, process.env.JWT_KEY, {
    expiresIn: "1d",
  });
  return token;
};

userSchema.methods.comparePassword = async function (loginPass) {
  const isCorrected = await bcrypt.compare(loginPass, this.password);
  return isCorrected;
};

const userModel = new mongoose.model("users", userSchema);

export default userModel;
