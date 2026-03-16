# Time Tracker API

A robust REST API for tracking time spent on projects, built with TypeScript, Express.js, and MongoDB. This API enables users to manage projects, track time entries with start/stop functionality, handle breaks, and export data in CSV and Excel formats.

## Features

### **User Management**
- User registration with email and username validation
- Secure authentication with JWT tokens (7-day expiry)
- User profile management (view, update)
- Account deletion capability
- Password hashing with bcryptjs
- Forgot password functionality with email reset links
- Secure password reset with time-limited tokens (1 hour expiry)

### **Project Management**
- Create and manage multiple projects
- Project types: `api_development`, `web_app`, `mobile_app`, `consulting`, `website_redesign`
- Track project details (name, description, client, hourly rate)
- Project status management: `active`, `completed`, `archived`, `hold`
- User-specific project isolation
- Update and delete projects

### **Time Tracking**
- Start/stop time entries for accurate tracking
- Break functionality with automatic session tracking
- Resume after breaks
- Complete time entries
- Automatic total time calculation (work sessions only)
- Work and break session tracking
- Time entry states: `running`, `stopped`, `break`, `completed`
- Delete completed time entries
- View time entries with pagination, sorting, and filtering

### **Data Export**
- Export all projects to CSV/Excel
- Export all time entries to CSV/Excel
- Export project-specific time entries to CSV/Excel
- Generate summary reports (aggregated project data)
- Date-range based exports
- Automatic file generation and download

### **API Features**
- RESTful API design
- JWT authentication middleware
- Input validation and sanitization
- Comprehensive error handling
- CORS enabled
- Serverless deployment ready (Vercel)

## Tech Stack

### **Backend Framework**
- **Express.js** (v5.2.1) - Web application framework
- **Node.js** - Runtime environment
- **TypeScript** (v5.9.3) - Type-safe JavaScript

### **Database & ODM**
- **MongoDB** - NoSQL database
- **Mongoose** (v9.1.5) - Object Data Modeling library

### **Authentication & Security**
- **bcryptjs** (v3.0.3) - Password hashing
- **jsonwebtoken** (v9.0.3) - JWT authentication

### **Email Service**
- **Nodemailer** (v8.0.2) - Email sending for password resets

### **Data Export**
- **json2csv** (v6.0.0) - CSV generation
- **xlsx** (v0.18.5) - Excel file creation

### **Development Tools**
- **tsx** (v4.21.0) - TypeScript execution engine
- **ESLint** (v9.39.2) - Code linting
- **Prettier** (v3.8.1) - Code formatting

## Prerequisites

Before running this project, ensure you have:

- **Node.js** (v22 or higher recommended)
- **npm** package manager
- **MongoDB** database (MongoDB Atlas or local instance)

## Getting Started

### **1. Clone the Repository**

```bash
git clone https://github.com/rahull0354/TimeTracker-API-TS.git
cd TimeTracker-API-TS
```

### **2. Install Dependencies**

```bash
npm install
```

### **3. Environment Setup**

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=3000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/TimeTracker?retryWrites=true&w=majority
ACCESS_TOKEN_SECRET=your-secret-key-here

# Email Configuration (for password reset)
EMAIL_SERVICE=gmail
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-specific-password
EMAIL_FROM=WorkLogix <your-email@gmail.com>

# Password Reset Token Configuration
RESET_TOKEN_EXPIRY=3600

# Frontend URL (for reset password link)
FRONTEND_URL=http://localhost:3000
```

### **4. Run Development Server**

```bash
npm run dev
```

The API will be available at `http://localhost:3000`

### **5. Build for Production**

```bash
npm run build
npm start
```

## Vercel Deployment

This project is configured for deployment on Vercel.

### **Deploy Steps:**

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Ready for Vercel deployment"
   git push origin main
   ```

2. **Import Project on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository

3. **Configure Environment Variables**
   Add the following environment variables in Vercel project settings:
   ```
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/TimeTracker?retryWrites=true&w=majority
   ACCESS_TOKEN_SECRET=your-secret-key-here
   EMAIL_SERVICE=gmail
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_SECURE=false
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-specific-password
   EMAIL_FROM=WorkLogix <your-email@gmail.com>
   RESET_TOKEN_EXPIRY=3600
   FRONTEND_URL=https://your-frontend-domain.com
   ```
   - Note: `PORT` is not needed for Vercel deployment

4. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy your API

### **Vercel Configuration:**
- Build Command: `npm run build`
- Output Directory: `dist`
- Entry Point: `api/index.js`

### **Important Notes:**
- The project uses serverless functions on Vercel
- MongoDB connection is cached across function invocations
- Make sure your MongoDB Atlas whitelist allows Vercel's IPs (or allow all IPs for testing)

## Project Structure

```
TimeTracker-API-TS/
├── src/
│   ├── config/
│   │   ├── DBConnect.ts          # Database connection
│   │   └── email.config.ts       # Email service configuration
│   ├── controllers/
│   │   ├── user.controller.ts    # User logic
│   │   ├── auth.controller.ts    # Authentication logic (password reset)
│   │   ├── project.controller.ts # Project logic
│   │   ├── timeEntry.controller.ts # Time tracking logic
│   │   └── export.controller.ts  # Export functionality
│   ├── middlewares/
│   │   └── auth.middleware.ts    # JWT authentication
│   ├── models/
│   │   ├── user.model.ts         # User schema
│   │   ├── passwordResetToken.model.ts # Password reset token schema
│   │   ├── project.model.ts      # Project schema
│   │   └── timeEntry.model.ts    # TimeEntry schema
│   ├── routes/
│   │   ├── user.routes.ts        # User endpoints
│   │   ├── project.route.ts      # Project endpoints
│   │   ├── timeEntry.route.ts    # Time entry endpoints
│   │   └── export.route.ts       # Export endpoints
│   ├── services/
│   │   └── export.service.ts     # Export business logic
│   ├── utils/
│   │   ├── csvFormatter.ts       # CSV formatting utilities
│   │   └── excelFormatter.ts     # Excel formatting utilities
│   └── index.ts                  # App entry point
├── dist/                         # Compiled JavaScript (gitignored)
├── node_modules/                 # Dependencies (gitignored)
├── .env                          # Environment variables (gitignored)
├── .env.example                  # Environment template
├── package.json                  # Dependencies and scripts
├── tsconfig.json                 # TypeScript configuration
└── README.md                     # This file
```

## API Endpoints

### **Base URL**
```
http://localhost:3000
```

### **Authentication**
Most endpoints require a valid JWT token in the headers:
```
Authorization: Bearer <your-jwt-token>
```

---

### **User Routes**

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/user/register` | Register new user | ❌ No |
| POST | `/user/login` | Login user | ❌ No |
| GET | `/user/profile` | Get user profile | ✅ Yes |
| PUT | `/user/update` | Update user details | ✅ Yes |
| DELETE | `/user/delete` | Delete user account | ✅ Yes |
| POST | `/user/forgot-password` | Request password reset email | ❌ No |
| POST | `/user/verify-reset-token` | Verify reset token validity | ❌ No |
| POST | `/user/reset-password` | Reset password with token | ❌ No |

**Register User:**
```bash
POST /user/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "SecurePass123",
  "fullname": "John Doe"
}
```

**Login:**
```bash
POST /user/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Forgot Password:**
```bash
POST /user/forgot-password
Content-Type: application/json

{
  "email": "john@example.com"
}
```

**Verify Reset Token:**
```bash
POST /user/verify-reset-token
Content-Type: application/json

{
  "token": "abc123def456..."
}
```

**Reset Password:**
```bash
POST /user/reset-password
Content-Type: application/json

{
  "token": "abc123def456...",
  "newPassword": "NewSecurePassword123"
}
```

---

### **Project Routes**

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/project/create` | Create new project | ✅ Yes |
| GET | `/project/myProjects` | Get all user projects | ✅ Yes |
| GET | `/project/projectDetails/:projectId` | Get project details | ✅ Yes |
| PUT | `/project/update/:projectId` | Update project | ✅ Yes |
| PUT | `/project/changeStatus/:projectId` | Change project status | ✅ Yes |
| DELETE | `/project/delete/:projectId` | Delete project | ✅ Yes |

**Create Project:**
```bash
POST /project/create
Authorization: Bearer <token>
Content-Type: application/json

{
  "projectName": "Website Redesign",
  "description": "Redesign company website",
  "clientName": "Acme Corp",
  "hourlyRate": 75,
  "projectType": "web_app"
}
```

**Project Types:** `api_development`, `web_app`, `mobile_app`, `consulting`, `website_redesign`

**Project Statuses:** `active`, `completed`, `archived`, `hold`

---

### **Time Entry Routes**

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/timeEntry/startTimeEntry/:projectId` | Start tracking time | ✅ Yes |
| POST | `/timeEntry/stopTimeEntry/:timeEntryId` | Stop tracking time | ✅ Yes |
| POST | `/timeEntry/break/:timeEntryId` | Apply break | ✅ Yes |
| POST | `/timeEntry/resume/:timeEntryId` | Resume from break | ✅ Yes |
| POST | `/timeEntry/complete/:timeEntryId` | Complete time entry | ✅ Yes |
| GET | `/timeEntry/getMyEntries` | Get all user time entries (paginated) | ✅ Yes |
| GET | `/timeEntry/projectEntries/:projectId` | Get time entries for specific project | ✅ Yes |
| DELETE | `/timeEntry/deleteEntry/:timeEntryId` | Delete a completed time entry | ✅ Yes |

**Start Time Entry:**
```bash
POST /timeEntry/startTimeEntry/:projectId
Authorization: Bearer <token>
Content-Type: application/json

{
  "description": "Working on homepage design"
}
```

**Get My Time Entries (with pagination):**
```bash
GET /timeEntry/getMyEntries?page=1&limit=10&sortBy=createdAt&order=desc&status=completed
Authorization: Bearer <token>
```

Query Parameters:
- `page` (default: 1) - Page number
- `limit` (default: 10) - Items per page
- `sortBy` (default: createdAt) - Field to sort by
- `order` (default: desc) - Sort order (asc/desc)
- `status` (optional) - Filter by status (running/stopped/break/completed)

**Time Entry States:**
- `running` - Timer is currently running
- `stopped` - Timer has been stopped
- `break` - User is on break
- `completed` - Time entry is completed

---

### **Export Routes**

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/export/project/csv` | Export all projects as CSV | ✅ Yes |
| GET | `/export/project/excel` | Export all projects as Excel | ✅ Yes |
| GET | `/export/timeEntry/csv` | Export all time entries as CSV | ✅ Yes |
| GET | `/export/timeEntry/excel` | Export all time entries as Excel | ✅ Yes |
| GET | `/export/projectEntries/:projectId/csv` | Export project time entries as CSV | ✅ Yes |
| GET | `/export/projectEntries/:projectId/excel` | Export project time entries as Excel | ✅ Yes |
| GET | `/export/summary/csv` | Export summary report as CSV | ✅ Yes |
| GET | `/export/summary/excel` | Export summary report as Excel | ✅ Yes |
| GET | `/export/entriesByDate/:startDate/:endDate/excel` | Export entries by date range | ✅ Yes |

**Export Examples:**
```bash
# Export all projects as CSV
GET /export/project/csv
Authorization: Bearer <token>

# Export project time entries as Excel
GET /export/projectEntries/507f1f77bcf86cd799439011/excel
Authorization: Bearer <token>

# Export entries by date range
GET /export/entriesByDate/2024-01-01/2024-12-31/excel
Authorization: Bearer <token>
```

---

## Data Models

### **User Model**
```typescript
{
  username: string;      // Unique username
  email: string;         // Unique email (lowercase)
  password: string;      // Hashed password
  fullname?: string;     // Optional full name
  createdAt: Date;
  updatedAt: Date;
}
```

### **PasswordResetToken Model**
```typescript
{
  userId: ObjectId;      // Reference to User
  token: string;         // Unique reset token
  expiresAt: Date;       // Token expiration time (1 hour)
  createdAt: Date;
}
```

### **Project Model**
```typescript
{
  projectName: string;       // Project name
  description: string;       // Project description
  clientName: string;        // Client/company name
  hourlyRate: number;        // Hourly billing rate
  status: string;            // active | completed | archived | hold
  projectType: string;       // api_development | web_app | mobile_app | consulting | website_redesign
  userId: ObjectId;          // Reference to User
  createdAt: Date;
  updatedAt: Date;
}
```

### **TimeEntry Model**
```typescript
{
  projectId: ObjectId;       // Reference to Project
  userId: ObjectId;          // Reference to User
  description: string;       // Work description
  startTime: Date;           // Start time
  endTime?: Date;            // End time
  date: Date;                // Entry date
  totalTime: number;         // Total time in minutes (work sessions only)
  status: string;            // running | stopped | break | completed
  sessions: Array<{
    type: "work" | "break";
    startTime: Date;
    endTime?: Date;
    duration: number;        // Duration in minutes
  }>;
  createdAt: Date;
  updatedAt: Date;
}
```

## Authentication Flow

1. **Register** a new user account
2. **Login** with email/password to receive JWT token
3. Include **token** in Authorization header for protected routes
4. Token is **valid for 7 days**

## Password Reset Flow

1. **Request Password Reset** - User submits their email via `/user/forgot-password`
2. **Email Sent** - System sends a reset link with time-limited token (valid for 1 hour)
3. **Verify Token** - Frontend can verify token validity via `/user/verify-reset-token`
4. **Reset Password** - User submits new password with token via `/user/reset-password`
5. **Confirmation** - System sends password reset confirmation email
6. **Login** - User can login with new password

### Email Setup Guide

#### Gmail Setup (Development/Testing)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App-Specific Password:**
   - Go to [Google Account settings](https://myaccount.google.com)
   - Navigate to **Security** → **2-Step Verification** → **App passwords**
   - Select "Mail" and your device
   - Click "Generate" and copy the 16-character password
3. **Update `.env` file:**
   ```env
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_SECURE=false
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-specific-password
   ```

**Important:** Use the App-Specific Password, NOT your regular Gmail password.

#### Production Email Services

For production deployment, consider using professional email services:

- **SendGrid** - Free tier: 100 emails/day
- **Mailgun** - Free tier: 5,000 emails/month
- **AWS SES** - Pay-as-you-go, very cost-effective for high volume
- **Postmark** - Excellent deliverability, paid only

These services provide better deliverability, analytics, and reliability compared to Gmail.

## Security Features

- **Password Hashing** - Using bcryptjs with salt rounds
- **JWT Authentication** - Secure token-based authentication
- **Protected Routes** - Auth middleware guards sensitive endpoints
- **User Isolation** - Users can only access their own data
- **Input Validation** - Mongoose schema validation
- **CORS Enabled** - Cross-origin resource sharing

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Compile TypeScript to JavaScript |
| `npm start` | Run production build |
| `npm run type-check` | Check TypeScript types without compiling |
| `npm run lint` | Run ESLint code analysis |
| `npm run lint:fix` | Fix ESLint issues automatically |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check code formatting |

## Configuration

### **TypeScript Configuration**
- Target: ES2022
- Module: ESNext
- Path aliases: `#/*` maps to `src/*`
- Strict mode enabled

### **Environment Variables**
- `PORT` - Server port (default: 3000)
- `MONGODB_URI` - MongoDB connection string
- `ACCESS_TOKEN_SECRET` - Secret key for JWT signing
- `EMAIL_SERVICE` - Email service provider (e.g., gmail)
- `EMAIL_HOST` - SMTP host (e.g., smtp.gmail.com)
- `EMAIL_PORT` - SMTP port (587 for TLS)
- `EMAIL_SECURE` - Use SSL/TLS (true/false)
- `EMAIL_USER` - Email username
- `EMAIL_PASSWORD` - Email password or app-specific password
- `EMAIL_FROM` - Sender email address and name
- `RESET_TOKEN_EXPIRY` - Password reset token expiry in seconds (default: 3600)
- `FRONTEND_URL` - Frontend application URL for reset password link

## Troubleshooting

### **Common Issues**

**Issue: MongoDB Connection Error**
- Verify `MONGODB_URI` is correct in `.env`
- Check MongoDB Atlas whitelist includes your IP
- Ensure database user has correct permissions

**Issue: Module Not Found**
- Run `npm install` to install dependencies
- Delete `node_modules` and reinstall if persists

**Issue: Port Already in Use**
- Change `PORT` in `.env` file
- Kill process using the port

**Issue: Time Entry State Conflicts**
- Ensure no time entry is already running before starting a new one
- Complete or stop existing entries before creating new ones
- Check project status (active projects only accept new time entries)

**Issue: Emails Not Sending**
- Verify `EMAIL_USER` and `EMAIL_PASSWORD` are correct in `.env`
- For Gmail: Ensure 2-Factor Authentication is enabled
- For Gmail: Use App-Specific Password, not regular password
- Check firewall/network settings allow SMTP connections
- Verify SMTP port (587 for TLS, 465 for SSL)

**Issue: Gmail Authentication Failed**
- Ensure 2-Factor Authentication is enabled on your Google account
- Generate a new App-Specific Password (they expire)
- Make sure "Less secure app access" is disabled (not needed with App Passwords)
- Double-check email and password in `.env` file

**Issue: Password Reset Token Expired**
- Tokens expire after 1 hour (configurable via `RESET_TOKEN_EXPIRY`)
- User must request a new password reset email
- Check system time on server is correct

**Issue: Reset Link Not Working**
- Verify `FRONTEND_URL` in `.env` points to correct frontend domain
- Ensure frontend has a reset password page that accepts the token
- Check frontend URL format: `${FRONTEND_URL}/reset-password?token=xxx`

## Author

**Rahul**

- GitHub: [@rahull0354](https://github.com/rahull0354)

## Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

⭐ If you find this project useful, consider giving it a star!
