import { fetchAllProjects, fetchAllTimeEntries, fetchSpecificEntries, fetchTimeEntriesOfAProject, generateSummaryReport, } from "../services/export.service.js";
import { formatCSV } from "../utils/csvFormatter.js";
import path from "node:path";
import fs from "fs";
import { formatXLSX } from "../utils/excelFormatter.js";
export const exportProjectCSV = async (req, res) => {
    try {
        const userId = req.user.id;
        // fetchinfg data from service
        const data = await fetchAllProjects(userId);
        // convert to csv
        const { csv, filename, mimetype } = formatCSV(data, "projects");
        // saving the file to exports folder
        const filepath = path.join(process.cwd(), "src/exports", filename);
        fs.writeFileSync(filepath, csv);
        // send file as response
        res.setHeader("Content-Type", mimetype);
        res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
        res.send(csv);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error converting projects to CSV",
            success: false,
        });
    }
};
// export all projects as excel
export const exportProjectsExcel = async (req, res) => {
    try {
        const userId = req.user.id;
        const data = await fetchAllProjects(userId);
        const { buffer, filename, mimetype } = formatXLSX(data, "Projects", "projects");
        // saving the file
        const filepath = path.join(process.cwd(), "src/exports", filename);
        fs.writeFileSync(filepath, buffer);
        // sending file as response
        res.setHeader("Content-Type", mimetype);
        res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
        res.send(buffer);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error converting Projects to Excel",
        });
        return;
    }
};
// export all time entries as csv
export const exportTimeEntriesCSV = async (req, res) => {
    try {
        const userId = req.user.id;
        // 1. Fetchind Data
        const data = await fetchAllTimeEntries(userId);
        // 2. Converting the data
        const { filename, csv, mimetype } = formatCSV(data, "time_entries");
        // 3. Saving the file
        const filepath = path.join(process.cwd(), "src/exports", filename);
        fs.writeFileSync(filepath, csv);
        // 4. Sending the file as response
        res.setHeader("Content-Type", mimetype);
        res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
        res.send(csv);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error converting Time Entries to CSV",
        });
        return;
    }
};
// export time entries as excel
export const exportTimeEntriesExcel = async (req, res) => {
    try {
        const userId = req.user.id;
        // 1. fetching the data
        const data = await fetchAllTimeEntries(userId);
        // 2. Format data to excel
        const { buffer, filename, mimetype } = formatXLSX(data, "Time Entries", "time_entries");
        // 3. saving the file
        const filepath = path.join(process.cwd(), "src/exports", filename);
        fs.writeFileSync(filepath, buffer);
        // 4. sending file as response
        res.setHeader("Content-Type", mimetype);
        res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
        res.send(buffer);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error converting Time Entries to Excel",
        });
        return;
    }
};
// exporting project specific time entries as CSV
export const exportProjectTimeEntryCSV = async (req, res) => {
    try {
        const userId = req.user.id;
        const { projectId } = req.params;
        // 1. Fetching data
        const data = await fetchTimeEntriesOfAProject(userId, projectId);
        // 2. formatting the data to csv
        const projectName = data[0]?.["Project Name"] || "project";
        const { csv, filename, mimetype } = formatCSV(data, `project_${projectName}_time_entries`);
        // 3. savingn the file
        const filepath = path.join(process.cwd(), "src/exports", filename);
        fs.writeFileSync(filepath, csv);
        // 4. sending file as response
        res.setHeader("Content-Type", mimetype);
        res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
        res.send(csv);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error converting Project Time Entries to CSV",
        });
        return;
    }
};
// export project specific time entries as excel
export const exportProjectTimeEntryExcel = async (req, res) => {
    try {
        const userId = req.user.id;
        const { projectId } = req.params;
        // 1. fetching data
        const data = await fetchTimeEntriesOfAProject(userId, projectId);
        // 2. formatting to excel
        const projectName = data[0]?.["Project Name"] || "project";
        const sheetName = `project_${projectName}_time_entries`.substring(0, 31);
        const { buffer, filename, mimetype } = formatXLSX(data, sheetName, `${projectName}_time_entries`);
        // 3. saving the file
        const filepath = path.join(process.cwd(), "src/exports", filename);
        fs.writeFileSync(filepath, buffer);
        // 4. sendinf file as response
        res.setHeader("Content-Type", mimetype);
        res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
        res.send(buffer);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error converting Project Time Entries to Excel",
        });
        return;
    }
};
// generating summary report in csv
export const exportSummaryReportCSV = async (req, res) => {
    try {
        const userId = req.user.id;
        // 1. fetchinf data
        const data = await generateSummaryReport(userId);
        // 2. formatting to csv
        const { csv, filename, mimetype } = formatCSV(data, "Summary Report");
        // 3. saving the file
        const filepath = path.join(process.cwd(), "src/exports", filename);
        fs.writeFileSync(filepath, csv);
        // 4. sending file as response
        res.setHeader("Content-Type", mimetype);
        res.setHeader("Content-Disposition", `filename; filename="${filename}"`);
        res.send(csv);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error Exporting Summary to CSV",
        });
        return;
    }
};
// generating summary report in excel
export const exportSummaryReportExcel = async (req, res) => {
    try {
        const userId = req.user.id;
        // 1. fetching the data
        const data = await generateSummaryReport(userId);
        // 2. formatting the data
        const { buffer, filename, mimetype } = formatXLSX(data, "Summary Report", "summary_report");
        // 3. saving the file
        const fielepath = path.join(process.cwd(), "src/exports", filename);
        fs.writeFileSync(fielepath, buffer);
        // 4. sending file as response
        res.setHeader("Content-Type", mimetype);
        res.setHeader("Content-Disposition", `attachment; filename=${filename}`);
        res.send(buffer);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error Exporting Summary to CSV",
        });
        return;
    }
};
// exporting time entries by date
export const exportTimeEntryByDateExcel = async (req, res) => {
    try {
        const userId = req.user.id;
        const { startDate, endDate } = req.params;
        // 1. fetching the data
        const data = await fetchSpecificEntries(userId, startDate, endDate);
        // 2. formatting the data
        const { buffer, filename, mimetype } = formatXLSX(data, "Time Entries By Date", "time_entries_by_date");
        // 3. savnig the file
        const filepath = path.join(process.cwd(), "src/exports", filename);
        fs.writeFileSync(filepath, buffer);
        // 4. sending file as response
        res.setHeader("Content-Type", mimetype);
        res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
        res.send(buffer);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error Exporting Time Entries by Date",
        });
        return;
    }
};
