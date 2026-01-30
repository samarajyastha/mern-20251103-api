import bcrypt from "bcryptjs";

import ResetPassword from "../models/ResetPassword.js";
import User from "../models/User.js";
import config from "../config/config.js";
import sendEmail from "../utils/email.js";

const login = async (data) => {
  const user = await User.findOne({
    $or: [{ email: data?.email }, { phone: data?.phone }],
  });

  if (!user)
    throw {
      status: 404,
      message: "User not found.",
    };

  if (!user.isActive)
    throw {
      status: 400,
      message: "User deactivated.",
    };

  const isPasswordMatch = bcrypt.compareSync(data.password, user.password);

  if (!isPasswordMatch)
    throw { status: 400, message: "Incorrect email or password." };

  return {
    _id: user._id,
    address: user.address,
    name: user.name,
    email: user.email,
    roles: user.roles,
    phone: user.phone,
    isActive: user.isActive,
  };
};

const register = async (data) => {
  const user = await User.findOne({
    $or: [{ email: data?.email }, { phone: data?.phone }],
  });

  if (user)
    throw {
      status: 409,
      message: "User already exists.",
    };

  if (!data.password)
    throw {
      status: 400,
      message: "Password is required.",
    };

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(data.password, salt);

  const createdUser = await User.create({
    name: data.name,
    email: data.email,
    phone: data.phone,
    address: data.address,
    password: hashedPassword,
  });

  return {
    _id: createdUser._id,
    address: createdUser.address,
    name: createdUser.name,
    email: createdUser.email,
    roles: createdUser.roles,
    phone: createdUser.phone,
    isActive: createdUser.isActive,
  };
};

const forgotPassword = async (email) => {
  const user = await User.findOne({ email });

  // Never send message saying if user is found.
  if (!user) throw { status: 404, message: "User not found." };

  const token = crypto.randomUUID();

  await ResetPassword.create({
    userId: user._id,
    token,
  });

  const resetPasswordLink = `${config.appUrl}/reset-password?userId=${user._id}&token=${token}`;

  await sendEmail(email, {
    subject: "Reset password link",
    html: `
      <div style="padding: 16px; font-family: sans-serif">
        <h1>Please click the link to reset your password.</h1>
        <a
          href="${resetPasswordLink}"
          style="
            background-color: dodgerblue;
            color: white;
            text-decoration: none;
            padding: 10px 32px;
            border-radius: 8px;
          "
        >
          Reset password
        </a>
      </div>
    `,
  });

  return { message: "Reset password link sent successfully." };
};

const resetPassword = async (userId, token, password) => {
  const data = await ResetPassword.findOne({
    userId,
    expiresAt: { $gt: Date.now() },
  }).sort({ createdAt: -1 });

  // verify user and token
  if (!data || data.token != token) {
    throw { status: 400, message: "Invalid or expired token." };
  }

  if (data.isUsed) {
    throw { status: 400, message: "Link already used." };
  }

  // reset password
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  await User.findByIdAndUpdate(userId, {
    password: hashedPassword,
  });

  await ResetPassword.findByIdAndUpdate(data._id, {
    isUsed: true,
  });

  return { message: "Password reset successful." };
};

export default { register, login, forgotPassword, resetPassword };
