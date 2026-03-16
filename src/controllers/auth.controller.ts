import PasswordResetToken from "#models/passwordResetToken.model.js";
import User from "#models/user.model.js";
import { Request, Response } from "express";
import crypto from "crypto";
import {
  sendPasswordResetConfirmationEmail,
  sendPasswordResetEmail,
} from "#config/email.config.js";
import bcrypt from "bcryptjs";

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      res.status(400).json({
        message: "Email is required",
        success: false,
      });
      return;
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(200).json({
        message:
          "If an account exists with this email, a password reset link has been sent.",
        success: true,
      });
      return;
    }
    await PasswordResetToken.deleteMany({ userId: user._id } as any);
    const resetToken = crypto.randomBytes(32).toString("hex");

    const expiresAt = new Date(
      Date.now() + parseInt(process.env.RESET_TOKEN_EXPIRY || "3600") * 1000,
    );

    const passwordResetToken = new PasswordResetToken({
      userId: user._id,
      token: resetToken,
      expiresAt,
    });
    await passwordResetToken.save();

    await sendPasswordResetEmail(user.email, resetToken, user.username);

    res.status(200).json({
      message:
        "If an account exists with this email, a password reset link has been sent.",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error processing password reset request",
      success: false,
    });
  }
};

export const verifyResetToken = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;

    if (!token) {
      res.status(400).json({
        message: "Token is required.",
        success: false,
      });
      return;
    }

    const resetToken = await PasswordResetToken.findOne({
      token,
      expiresAt: { $gt: new Date() },
    });

    if (!resetToken) {
      res.status(400).json({
        message: "Invalid or expired reset token.",
        success: false,
      });
      return;
    }

    res.status(200).json({
      message: "Token is valid",
      success: true,
      valid: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error verifying reset token",
      success: false,
    });
    return;
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      res.status(400).json({
        message: "Token and new password are required",
        success: false,
      });
      return;
    }

    if (newPassword.length < 6) {
      res.status(400).json({
        message: "Password must be at least 6 characters long",
        success: false,
      });
      return;
    }

    const resetToken = await PasswordResetToken.findOne({
      token,
      expiresAt: { $gt: new Date() },
    });

    if (!resetToken) {
      res.status(400).json({
        message: "Invalid or expired reset token",
        success: false,
      });
      return;
    }

    const user = await User.findById(resetToken.userId);
    if (!user) {
      res.status(404).json({
        message: "User not found",
        success: false,
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    await PasswordResetToken.deleteOne({ _id: resetToken._id } as any);
    await PasswordResetToken.deleteMany({ userId: user._id } as any);

    await sendPasswordResetConfirmationEmail(user.email, user.username);

    res.status(200).json({
      message: "Password has been reset successfully",
      success: true,
    });
  } catch (error) {
    console.error("Reset Password Error:", error);
    res.status(500).json({
      message: "Error resetting password",
      success: false,
    });
    return;
  }
};
