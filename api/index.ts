import type { Request, Response } from "express";
import app from "../dist/config/app.js";
import DBConnect from "../dist/config/DBConnect.js";

// Ensure database connection for serverless environment
let isConnected = false;

const ensureDBConnection = async () => {
  if (!isConnected) {
    await DBConnect();
    isConnected = true;
  }
};

// Vercel serverless function handler
export default async function handler(req: Request, res: Response): Promise<void> {
  await ensureDBConnection();
  app(req, res);
}
