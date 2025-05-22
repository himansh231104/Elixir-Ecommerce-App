const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobileNumber: { type: Number, required: true },
    isAdmin: { type: Boolean, default: false },
    address: { type: String },
    profileImage: { type: String, default: "/default-avatar.png" },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// 🔒 Pre-save middleware to hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// 🔑 Method to compare hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// 💬 Virtual: Link to wishlist (one-to-one)
userSchema.virtual("wishlist", {
  ref: "Wishlist",
  localField: "_id",
  foreignField: "user",
  justOne: true,
});

// 📦 Virtual: Link to orders (one-to-many)
userSchema.virtual("orders", {
  ref: "Order",
  localField: "_id",
  foreignField: "user",
  justOne: false,
});

module.exports = mongoose.model("User", userSchema);
