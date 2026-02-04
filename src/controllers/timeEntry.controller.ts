import Project from "#models/project.model.js";
import TimeEntry from "#models/timeEntry.model.js";
import { Request, Response } from "express";

export const startTimeEntry = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { projectId } = req.params;
    const { description } = req.body;

    // input validation
    if (!description) {
      res.status(400).json({
        message: "Please provide description to the time entry",
        success: false,
      });
      return;
    }

    // checking if project exists or not before starting its time entry
    const projectCheck = await Project.findOne({
      _id: projectId,
      userId,
    });

    if (!projectCheck) {
      res.status(404).json({
        message: "Project not found !",
        success: false,
      });
      return;
    }

    let timeEntry = await TimeEntry.findOne({
      projectId: projectId as any,
      userId,
    }).sort({ createdAt: -1 });

    if (timeEntry !== null) {
      if (timeEntry.status === "running" || timeEntry.status === "break") {
        res.status(400).json({
          message: `Timer is already in ${timeEntry.status} state`,
          success: false,
        });
        return;
      }

      // if project is completed, create fresh entry
      if (timeEntry.status === "completed") {
        timeEntry = new TimeEntry({
          projectId: projectId,
          userId,
          description,
          startTime: new Date(),
          date: new Date(),
          status: "running",
        });
      }
      await timeEntry.save();

      res.status(200).json({
        message: `Time Entry started for ${projectCheck.projectName}`,
        success: true,
        timeEntry,
      });
      return;
    } else {
      // create new entry
      timeEntry = new TimeEntry({
        projectId: projectId,
        userId,
        description,
        startTime: new Date(),
        date: new Date(),
        status: "running",
      });

      await timeEntry.save();

      res.status(200).json({
        message: `Time Entry started for ${projectCheck.projectName}`,
        success: true,
        timeEntry,
      });
      return;
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error starting time entry for the project",
      success: false,
    });
    return;
  }
};

export const stopTimeEntry = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { timeEntryId } = req.params;

    const timeEntry = await TimeEntry.findOne({
      _id: timeEntryId,
      userId,
    });

    if (!timeEntry) {
      res.status(404).json({
        message: "No Time Entries found for this project",
        success: false,
      });
      return;
    }

    // calculating the total time
    if (timeEntry.status === "running") {
      const sessionEntTime = new Date();
      const sessionDuration = Math.floor(
        (sessionEntTime.getTime() - timeEntry.startTime.getTime()) / 60000,
      );

      timeEntry.sessions.push({
        type: "work",
        startTime: timeEntry.startTime,
        endTime: sessionEntTime,
        duration: sessionDuration,
      });
    }

    // sum of all sessions present inside the array
    timeEntry.totalTime = timeEntry.sessions
      .filter((session) => session.type === "work")
      .reduce((sum, session) => sum + session.duration, 0);
    timeEntry.status = "stopped";
    await timeEntry.save();

    res.status(200).json({
      message: `Timer stopped ! Total Time: ${timeEntry.totalTime} Minutes`,
      timeEntry,
      success: true,
    });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error Stopping the timer for the project",
      success: false,
    });
    return;
  }
};

export const applyBreakToTimer = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { timeEntryId } = req.params;

    const timeEntry = await TimeEntry.findOne({
      _id: timeEntryId,
      userId,
    });
    if (!timeEntry) {
      res.status(404).json({
        message: "No time entries found for this project",
        success: false,
      });
      return;
    }

    // Can only take break if currently running
    if (timeEntry.status !== "running") {
      res.status(400).json({
        message: "Timer is not running",
        success: false,
      });
      return;
    }

    // save current work session
    const sessionEndTime = new Date();
    const sessionDuration = Math.floor(
      (sessionEndTime.getTime() - timeEntry.startTime.getTime()) / 60000,
    );

    timeEntry.sessions.push({
      type: "work",
      startTime: timeEntry.startTime,
      endTime: sessionEndTime,
      duration: sessionDuration,
    });

    // starting the break time
    timeEntry.startTime = new Date();
    timeEntry.status = "break";
    await timeEntry.save();

    res.status(200).json({
      message: "Break Started !",
      success: true,
      timeEntry,
    });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error Applying break to the project",
      success: false,
    });
    return;
  }
};

export const resumeTimer = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { timeEntryId } = req.params;

    const timeEntry = await TimeEntry.findOne({
      _id: timeEntryId,
      userId,
    });
    if (!timeEntry) {
      res.status(404).json({
        message: "No breaks found for this time entry",
        success: false,
      });
      return;
    }

    // can only resume if there is break
    if (timeEntry.status !== "break") {
      res.status(400).json({
        message: "No breaks found on this timer",
        success: false,
      });
      return;
    }

    // save break session
    const sessionEndTime = new Date();
    const sessionDuration = Math.floor(
      (sessionEndTime.getTime() - timeEntry.startTime.getTime()) / 60000,
    );

    timeEntry.sessions.push({
      type: "break",
      startTime: timeEntry.startTime,
      endTime: sessionEndTime,
      duration: sessionDuration,
    });

    // start new work session
    timeEntry.startTime = new Date();
    timeEntry.status = "running";
    await timeEntry.save();

    res.status(200).json({
      message: "Resumed work session",
      success: true,
      timeEntry,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error Resuming break to the project",
      success: false,
    });
    return;
  }
};

export const completeTimeEntry = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { timeEntryId } = req.params;

    const timeEntry = await TimeEntry.findOne({
      _id: timeEntryId,
      userId,
    });
    if (!timeEntry) {
      res.status(404).json({
        message: "No time entry found",
        success: false,
      });
      return;
    }

    // save final work session if running
    if (timeEntry.status === "running") {
      const sessionEndTime = new Date();
      const sessionDuration = Math.floor(
        (sessionEndTime.getTime() - timeEntry.startTime.getTime()) / 60000,
      );

      timeEntry.sessions.push({
        type: "work",
        startTime: timeEntry.startTime,
        endTime: sessionEndTime,
        duration: sessionDuration,
      });
    }

    // calculating the final total time
    timeEntry.totalTime = timeEntry.sessions
      .filter((session) => session.type === "work")
      .reduce((sum, session) => sum + session.duration, 0);

    timeEntry.status = "completed";
    await timeEntry.save();

    res.status(200).json({
      message: `Time Entery Marked as Completed! Total Time: ${timeEntry.totalTime} Minutes`,
      success: true,
      timeEntry,
    });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error Completing the time project",
      success: false,
    });
    return;
  }
};
