import mongoose from "mongoose";
const timeEntrySchema = new mongoose.Schema({
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
}, { timestamps: true });
const TimeEntry = mongoose.model("TimeEntry", timeEntrySchema);
export default TimeEntry;
