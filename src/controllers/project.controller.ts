import Project from "#models/project.model.js";
import { Request, Response } from "express";

export const createProject = async (req: Request, res: Response) => {
  try {
    const { projectName, description, clientName, hourlyRate } = req.body;
    const userId = (req as any).user.id;

    if (!projectName || !description || !clientName || !hourlyRate) {
      res.status(400).json({
        message: "Please fill in all the fields",
        success: false,
      });
      return;
    }

    const newProject = new Project({
      projectName,
      description,
      clientName,
      hourlyRate,
      userId,
    });
    await newProject.save();

    res.status(201).json({
      message: `${projectName} Created !`,
      success: true,
      newProject,
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error creating the project !",
      success: false,
    });
    return;
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { projectId } = req.params;

    const project = await Project.findOneAndDelete({
      _id: projectId,
      userId: userId,
    });
    if (!project) {
      res.status(404).json({
        message: "Project doesn't exist",
        success: false,
      });
      return;
    }

    res.status(200).json({
      message: `${project.projectName} Deleted!`,
      success: true,
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error deleting the project !",
      success: false,
    });
    return;
  }
};

export const updateProjectDetails = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { projectId } = req.params;
    const { projectName, description, clientName, hourlyRate } = req.body;

    const project = await Project.findOne({ _id: projectId, userId });
    if (!project) {
      res.status(404).json({
        message: "Project Not Found",
        success: false,
      });
      return;
    }

    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      { projectName, description, clientName, hourlyRate },
      { new: true },
    );

    res.status(200).json({
      message: `Details updated for ${project.projectName} updated !`,
      success: true,
      project: updatedProject,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error updating the project",
      success: false,
    });
  }
};

export const getAllProjectOfParticularUser = async (
  req: Request,
  res: Response,
) => {
  try {
    const userId = (req as any).user.id;

    const findProjects = await Project.find({ userId: userId });
    if (!findProjects) {
      res.status(404).json({
        message: "No project found for the user",
        success: false,
      });
      return;
    }

    res.status(200).json({
      message: "Project Details: ",
      success: true,
      findProjects,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error Fetching Details of Projects !",
      success: false,
    });
    return;
  }
};

export const getParticularProjectDetails = async (
  req: Request,
  res: Response,
) => {
  try {
    const userId = (req as any).user.id;
    const { projectId } = req.params;

    const projectDetails = await Project.findById({
      _id: projectId,
      userId: userId,
    });
    if (!projectDetails) {
      res.status(404).json({
        message: "No details found for the particular project",
        success: false,
      });
      return;
    }

    res.status(200).json({
      message: `Project details for ${projectDetails.projectName}`,
      success: true,
      projectDetails,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: "Error fetching details of particular project",
      success: false,
    });
    return;
  }
};
