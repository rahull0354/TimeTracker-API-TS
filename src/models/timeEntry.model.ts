import mongoose, { Document, Model } from "mongoose";

interface ITimeEntry extends Document {
  projectId: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId;
  description: string;
  startTime: Date;
  endTime: Date | null;
  date: Date;
  totalTime: number;
  status: string;
  sessions: Array<{
    type: "work" | "break";
    startTime: Date;
    endTime: Date;
    duration: number;
  }>;
}

const timeEntrySchema = new mongoose.Schema<ITimeEntry>(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: [true, "Project Id is required"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User's Id is required"],
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
    },
    date: {
      type: Date,
      required: true,
    },
    totalTime: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["running", "stopped", "break", "completed"],
    },
    sessions: [
      {
        type: {
          type: String,
          enum: ["work", "break"],
          default: "work",
        },
        startTime: { type: Date },
        endTime: { type: Date },
        duration: { type: Number, default: 0 },
      },
    ],
  },
  { timestamps: true },
);

const TimeEntry: Model<ITimeEntry> = mongoose.model<ITimeEntry>(
  "TimeEntry",
  timeEntrySchema,
);

export default TimeEntry;
