import { fetchAllProjects } from "#services/export.service.js";
import { formatCSV } from "#utils/csvFormatter.js";
import { Request, Response } from "express";
import path from "node:path";
import fs from "fs";

export const exportProjectCSV = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;

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
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error converting projects to CSV",
      success: false,
    });
  }
};
