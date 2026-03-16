import mongoose, { Document, Model } from "mongoose";

interface IPasswordResetToken extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  token: string;
  expiresAt: Date;
  createdAt: Date;
}

const passwordResetTokenSchema = new mongoose.Schema<IPasswordResetToken>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User Id is required"],
    },
    token: {
      type: String,
      required: [true, "Token is required"],
      unique: true,
    },
    expiresAt: {
      type: Date,
      required: [true, "Expiration date is required"],
      index: { expires: 0 },
    },
  },
  { timestamps: true },
);

const PasswordResetToken: Model<IPasswordResetToken> =
  mongoose.model<IPasswordResetToken>(
    "PasswordResetToken",
    passwordResetTokenSchema,
  );

export default PasswordResetToken;
