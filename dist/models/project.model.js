import mongoose from "mongoose";
const projectSchema = new mongoose.Schema({
    projectName: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    clientName: {
        type: String,
        required: true,
        trim: true,
    },
    hourlyRate: {
        type: Number,
        min: [0, "Hourly rate can't be negative"],
    },
    status: {
        type: String,
        enum: ["active", "completed", "archived", "hold"],
        default: "active",
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User Id is required"],
    },
}, { timestamps: true });
const Project = mongoose.model("Project", projectSchema);
export default Project;
