import Project from "../models/project.model.js";
import TimeEntry from "../models/timeEntry.model.js";
// fetching all the projects of a user
export const fetchAllProjects = async (userId) => {
    const projects = (await Project.find({ userId: userId })
        .select("projectName description clientName hourlyRate status createdAt")
        .lean());
    return projects.map((project) => ({
        "Project Name": project.projectName,
        Description: project.description,
        "Client Name": project.clientName,
        "Hourly Rate": project.hourlyRate,
        Status: project.status,
        "Created On": new Date(project.createdAt).toLocaleString(),
    }));
};
// fetching all time entries of a user
export const fetchAllTimeEntries = async (userId) => {
    const timeEntry = (await TimeEntry.find({ userId: userId })
        .populate("projectId", "projectName")
        .lean());
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
export const fetchTimeEntriesOfAProject = async (userId, projectId) => {
    const timeEntry = (await TimeEntry.find({
        userId: userId,
        projectId: projectId,
    })
        .populate("projectId", "projectName")
        .lean());
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
export const fetchSpecificEntries = async (userId, startDate, endDate) => {
    // Normalize dates to include full day range
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);
    const timeEntries = (await TimeEntry.find({
        userId: userId,
        date: {
            $gte: start,
            $lte: end,
        },
    })
        .populate("projectId", "projectName")
        .lean());
    const result = [];
    for (const entry of timeEntries) {
        if (entry.sessions && entry.sessions.length > 0) {
            // add each session as a separate row
            for (const session of entry.sessions) {
                result.push({
                    "Project Name": entry.projectId?.projectName || "N/A",
                    Description: entry.description,
                    Session: session.type === "work" ? "Work Session" : "Break",
                    "Start Time": new Date(session.startTime).toLocaleString(),
                    "End Time": new Date(session.endTime).toLocaleString(),
                    "Duration (Minutes)": session.duration || 0,
                    Status: entry.status,
                });
            }
        }
        else {
            // Entry exits but no sesions yet
            result.push({
                "Project Name": entry.projectId?.projectName || "N/A",
                Description: entry.description,
                Session: "Work Session",
                "Start Time": new Date(entry.startTime).toLocaleString(),
                "End Time": "Running",
                "Duration (Minutes)": entry.totalTime || 0,
                Status: entry.status,
            });
        }
    }
    return result;
};
// generate summary report
export const generateSummaryReport = async (userId) => {
    const projects = (await Project.find({
        userId: userId,
    }).lean());
    const reports = [];
    for (const project of projects) {
        const timeEntries = (await TimeEntry.find({
            projectId: project._id,
        }).lean());
        const totalSessions = timeEntries.reduce((sum, entry) => sum + (entry.sessions?.length || 0), 0);
        const totalTime = timeEntries.reduce((sum, entry) => sum + (entry.totalTime || 0), 0);
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
