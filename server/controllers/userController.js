const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");

// Registration
const registerUser = async (req, res) => {
  const { name, email, password, mobileNumber } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = await User.create({ name, email, password, mobileNumber });

    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      mobileNumber: newUser.mobileNumber,
      isAdmin: newUser.isAdmin,
      address: newUser.address,
      profileImage: newUser.profileImage,
      joined: newUser.createdAt,
      token: generateToken(newUser._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete User
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      // Prevent admin from deleting themselves
      if (user._id.toString() === req.user._id.toString()) {
        return res.status(400).json({ message: "You can't delete yourself!" });
      }

      await user.remove();
      res.json({ message: "User removed successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error while deleting user" });
  }
};

// Login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && await user.matchPassword(password)) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        mobileNumber: user.mobileNumber,
        isAdmin: user.isAdmin,
        address: user.address,
        profileImage: user.profileImage,
        joined: user.createdAt,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get User Profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error while fetching user profile" });
  }
};

// Update User Profile
const updateUserProfile = async (req, res) => {
  const user = req.user;

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.mobileNumber = req.body.mobileNumber || user.mobileNumber;
    user.address = req.body.address || user.address;
    user.profileImage = req.body.profileImage || user.profileImage;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      mobileNumber: updatedUser.mobileNumber,
      isAdmin: updatedUser.isAdmin,
      address: updatedUser.address,
      profileImage: updatedUser.profileImage,
      joined: updatedUser.createdAt,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

// Get All Users
const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error while fetching users" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
};
