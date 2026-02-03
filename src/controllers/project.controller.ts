import Project from "#models/project.model.js";
import { Request, Response } from "express";

export const createProject = async (req: Request, res: Response) => {
    try {
        const {projectName, description, clientName, hourlyRate} = req.body
        const userId = (req as any).user.id

        if(!projectName || !description || !clientName || !hourlyRate) {
            res.status(400).json({
                message: "Please fill in all the fields",
                success: false
            })
            return
        }

        const newProject = new Project({
            projectName,
            description,
            clientName,
            hourlyRate,
            userId
        })
        await newProject.save()

        res.status(201).json({
            message: `${projectName} Created !`,
            success: true,
            newProject
        })
        return 
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Error creating the project !",
            success: false
        })
        return
    }
}