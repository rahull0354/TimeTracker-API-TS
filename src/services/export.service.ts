import Project from "#models/project.model.js";
import TimeEntry from "#models/timeEntry.model.js";

// fetching all the projects of a user
export const fetchAllProjects = async (userId: string): Promise<any[]> => {
  const projects = (await Project.find({ userId: userId as any })
    .select("projectName description clientName hourlyRate status createdAt")
    .lean()) as any[];

  return projects.map((project: any) => ({
    "Project Name": project.projectName,
    Description: project.description,
    "Client Name": project.clientName,
    "Hourly Rate": project.hourlyRate,
    Status: project.status,
    "Created On": new Date(project.createdAt).toLocaleString(),
  }));
};

// fetching all time entries of a user
export const fetchAllTimeEntries = async (userId: string): Promise<any[]> => {
  const timeEntry = (await TimeEntry.find({ userId: userId as any })
    .populate("projectId", "projectName")
    .lean()) as any[];

  return timeEntry.map((entry) => ({
    "Project Name": entry.projectId?.projectName || "",
    Description: entry.description,
    Date: new Date(entry.date).toLocaleDateString(),
    "Start Time": new Date(entry.startTime).toLocaleTimeString(),
    "End Time": entry.endTime
      ? new Date(entry.endTime).toLocaleTimeString()
      : "Running",
    "Total Minutes": entry.totalTime || 0,
    Status: entry.status,
  }));
};

// fetch time entries for a specific project
export const fetchTimeEntriesOfAProject = async (
  userId: string,
  projectId: string,
): Promise<any[]> => {
  const timeEntry = (await TimeEntry.find({
    userId: userId as any,
    projectId: projectId as any,
  })
    .populate("projectId", "projectName")
    .lean()) as any[];

  return timeEntry.map((entry) => ({
    "Project Name": entry.projectId?.projectName || "",
    Description: entry.description,
    Date: new Date(entry.date).toLocaleString(),
    "Start Time": new Date(entry.startTime).toLocaleTimeString(),
    "End Time": entry.endTime
      ? new Date(entry.endTime).toLocaleTimeString()
      : "Running",
    "Total Minutes": entry.totalTime || 0,
    Status: entry.status,
  }));
};

// fetch time entries within a specific time range
export const fetchSpecificEntries = async (
  userId: string,
  startDate: Date,
  endDate: Date,
): Promise<any[]> => {
  const timeEntry = (await TimeEntry.find({
    userId: userId as any,
    date: {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    },
  })
    .populate("projectId", "projectName")
    .lean()) as any[];

  return timeEntry.map((entry) => ({
    "Project Name": entry.projectId?.projectName,
    Description: entry.description,
    Date: new Date(entry.date).toLocaleString(),
    "Start Time": new Date(entry.startTime).toLocaleTimeString(),
  }));
};

// generate summary report
export const generateSummaryReport = async (userId: string): Promise<any[]> => {
  const projects = (await Project.find({
    userId: userId as any,
  }).lean()) as any[];

  const reports = [];

  for (const project of projects) {
    const timeEntries = (await TimeEntry.find({
      projectId: project._id as any,
    }).lean()) as any[];

    const totalSessions = timeEntries.reduce(
      (sum, entry) => sum + (entry.sessions?.length || 0),
      0,
    );
    const totalTime = timeEntries.reduce(
      (sum, entry) => sum + (entry.totalTime || 0),
      0,
    );

    reports.push({
      "Project Name": project.projectName,
      Description: project.description || "",
      "Total Sessions": totalSessions,
      "Total Minutes": totalTime,
      "Total Hours": (totalTime / 60).toFixed(2),
    });
  }

  return reports;
};
