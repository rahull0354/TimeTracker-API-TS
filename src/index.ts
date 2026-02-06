import type { Request, Response } from "express";
import DBConnect from "#config/DBConnect.js";
import app from "#config/app.js";

const port = process.env.PORT ?? "9000";

// Ensure database connection for serverless environment
let isDBConnected = false;

const connectDB = async () => {
  if (!isDBConnected) {
    await DBConnect();
    isDBConnected = true;
  }
};

// For local development only
if (process.env.NODE_ENV !== "production") {
  // Initialize database connection for local dev
  connectDB().then(() => {
    app.listen(port, () => {
      console.log(`Server started on http://localhost:${port}`);
    });
  });
}

// Export for Vercel serverless deployment
// This is the primary export that Vercel looks for
export default async (req: Request, res: Response) => {
  await connectDB();
  return app(req, res);
};
