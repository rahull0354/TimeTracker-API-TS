import DBConnect from "#config/DBConnect.js";
import app from "#config/app.js";

const port = process.env.PORT ?? "9000";

// Ensure database connection before handling requests (for serverless)
let isConnected = false;

app.use(async (req, res, next) => {
  if (!isConnected) {
    await DBConnect();
    isConnected = true;
  }
  next();
});

// For local development only
if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
  });
}

// Export for Vercel serverless deployment
// Vercel will automatically detect and use the Express app
export default app;
