# Time Tracker API

A robust REST API for tracking time spent on projects, built with TypeScript, Express.js, and MongoDB. This API enables users to manage projects, track time entries with start/stop functionality, handle breaks, and export data in CSV and Excel formats.

## 🚀 Features

### **User Management**
- User registration with email validation
- Secure authentication with JWT tokens
- User profile management
- Account deletion

### **Project Management**
- Create and manage multiple projects
- Track project details (name, description, client)
- Set hourly rates for billing
- Project status management (active, completed, archived, hold)
- User-specific project isolation

### **Time Tracking**
- Start/stop time entries for accurate tracking
- Break functionality with automatic session tracking
- Resume after breaks
- Complete time entries
- Automatic total time calculation
- Work and break session tracking

### **Data Export**
- Export projects to CSV/Excel
- Export time entries to CSV/Excel
- Export project-specific time entries
- Generate summary reports
- Date-range based exports

## 🛠️ Tech Stack

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

### **Data Export**
- **json2csv** (v6.0.0) - CSV generation
- **xlsx** (v0.18.5) - Excel file creation

### **Development Tools**
- **tsx** (v4.21.0) - TypeScript execution engine
- **tsc-alias** (v1.8.16) - Path alias resolution
- **ESLint** (v9.39.2) - Code linting
- **Prettier** (v3.8.1) - Code formatting

## 📋 Prerequisites

Before running this project, ensure you have:

- **Node.js** (v22 or higher recommended)
- **npm** or **yarn** package manager
- **MongoDB** database (MongoDB Atlas or local instance)

## 🚦 Getting Started

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
PORT=3000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/TimeTracker?retryWrites=true&w=majority
ACCESS_TOKEN_SECRET=your-secret-key-here
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

## 📁 Project Structure

```
TimeTracker-API-TS/
├── src/
│   ├── config/
│   │   └── DBConnect.ts          # Database connection
│   ├── controllers/
│   │   ├── user.controller.ts    # User logic
│   │   ├── project.controller.ts # Project logic
│   │   ├── timeEntry.controller.ts # Time tracking logic
│   │   └── export.controller.ts  # Export functionality
│   ├── middlewares/
│   │   └── auth.middleware.ts    # JWT authentication
│   ├── models/
│   │   ├── user.model.ts         # User schema
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

## 🔌 API Endpoints

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
| GET | `/user/login` | Login user | ❌ No |
| GET | `/user/profile` | Get user profile | ✅ Yes |
| PUT | `/user/update` | Update user details | ✅ Yes |
| DELETE | `/user/delete` | Delete user account | ✅ Yes |

**Register User:**
```bash
POST /user/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "SecurePass123",
  "fullName": "John Doe"
}
```

**Login:**
```bash
GET /user/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123"
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
  "hourlyRate": 75
}
```

---

### **Time Entry Routes**

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/timeEntry/startTimeEntry/:projectId` | Start tracking time | ✅ Yes |
| POST | `/timeEntry/stopTimeEntry/:timeEntryId` | Stop tracking time | ✅ Yes |
| POST | `/timeEntry/break/:timeEntryId` | Apply break | ✅ Yes |
| POST | `/timeEntry/resume/:timeEntryId` | Resume from break | ✅ Yes |
| POST | `/timeEntry/complete/:timeEntryId` | Complete time entry | ✅ Yes |

**Start Time Entry:**
```bash
POST /timeEntry/startTimeEntry/:projectId
Authorization: Bearer <token>

{
  "description": "Working on homepage design"
}
```

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

---

## 📊 Data Models

### **User Model**
```typescript
{
  username: string;      // Unique username
  email: string;         // Unique email (lowercase)
  password: string;      // Hashed password
  fullName?: string;     // Optional full name
  createdAt: Date;
  updatedAt: Date;
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
  totalTime: number;         // Total time in minutes
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

## 🔐 Authentication Flow

1. **Register** a new user account
2. **Login** with email/password to receive JWT token
3. Include **token** in Authorization header for protected routes
4. Token is **valid for 7 days**

## 🛡️ Security Features

- **Password Hashing** - Using bcryptjs with salt rounds
- **JWT Authentication** - Secure token-based authentication
- **Protected Routes** - Auth middleware guards sensitive endpoints
- **User Isolation** - Users can only access their own data
- **Input Validation** - Mongoose schema validation

## 📝 Available Scripts

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

## 🔧 Configuration

### **TypeScript Configuration**
- Target: ES2022
- Module: ESNext
- Path aliases: `#/*` maps to `src/*`
- Strict mode enabled

### **Environment Variables**
- `PORT` - Server port (default: 3000)
- `MONGODB_URI` - MongoDB connection string
- `ACCESS_TOKEN_SECRET` - Secret key for JWT signing

## 🐛 Troubleshooting

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

## 👤 Author

**Rahul**

- GitHub: [@rahull0354](https://github.com/rahull0354)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

⭐ If you find this project useful, consider giving it a star!
