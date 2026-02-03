import mongoose, { Document, Model } from "mongoose";

interface IProject extends Document {
    projectName: string,
    description: string,
    clientName: string,
    hourlyRate: number,
    status: string,
    userId: mongoose.Schema.Types.ObjectId
}

const projectSchema = new mongoose.Schema<IProject>(
    {
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
            trim: true
        },
        hourlyRate: {
            type: Number,
            min: [0, "Hourly rate can't be negative"]
        },
        status: {
            type: String,
            enum: ["active", "completed", "archived", "hold"],
            default: "active"
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "User Id is required"]
        }
    },
    {timestamps: true}
)

const Project: Model<IProject> = mongoose.model<IProject>("Project", projectSchema)

export default Project