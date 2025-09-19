![Project TrueGrit](https://raw.githubusercontent.com/cojovi/TrueGrit_cmac/blob/main/public/banner1.png)
# TrueGrit - Construction Management Platform

A comprehensive web application for residential roofing, framing, and windows contractors with professional project management capabilities.

This is still in really early stages, was kinda just fkn around when i got started on this....

## Features

### 🏗️ Core Business Management
- **Project Management**: Complete job lifecycle from estimate to completion
- **Scheduling**: Visual calendar with drag-and-drop job assignment
- **Crew Management**: Team organization with role-based access control
- **Estimate Generation**: Professional estimates with profit margin calculation

### 📊 Advanced Features
- **Communities & Floorplans**: Organize jobs by neighborhood and house types
- **Material Inventory**: Track stock levels with low-stock alerts
- **Photo Documentation**: Upload and organize job photos
- **Reporting & Analytics**: Business insights and performance metrics

### 🔐 Security & Access Control
- **Role-based permissions**: Admin, Manager, Crew Lead, and Crew Member roles
- **Secure authentication**: Email/password authentication via Supabase
- **Row-level security**: Users only see data relevant to their role and assignments

## Technology Stack

- **Frontend**: React 18 + TypeScript + Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Charts**: Recharts
- **Icons**: Lucide React
- **Build Tool**: Vite

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Supabase account and project

### Setup Instructions

1. **Clone and Install**
   ```bash
   npm install
   ```

2. **Database Setup**
   - Create a new Supabase project
   - Click "Connect to Supabase" button in the top-right corner
   - The database schema will be automatically applied

3. **Environment Variables**
   ```bash
   cp .env.example .env
   ```
   Update the `.env` file with your Supabase credentials (done automatically when connecting).

4. **Start Development Server**
   ```bash
   npm run dev
   ```

## Work Order Types

The application supports all standard residential construction work order types:

**Roofing**
- Metal Roof - Accent
- Measure/Dry in Metal - Accent
- Roof Deck
- Roof Final-must take pictures
- Shingles
- Dry-in
- Roof Inspection
- Re-Roof

**Flashing & Repair**
- U Channel/Z Flashing
- Counter Flashing
- After Roof Punch
- Metal or Flashing Repair
- Door Pan Flashing
- Leak Repair
- Warranty Work

**Service & Inspection**
- Builder Service
- Safety Inspection
- Roofer Inspection
- Training Service Tech

## User Roles & Permissions

### Admin
- Full system access
- Manage all users, communities, and system settings
- View all jobs and reports

### Manager
- Manage jobs, estimates, and crew assignments
- Create communities and floorplans
- Access to all reports and analytics

### Crew Lead
- View and update assigned jobs
- Upload photos and update job status
- Manage crew member assignments

### Crew Member
- View assigned jobs only
- Upload photos and time tracking
- Limited access to job details

## Database Schema

### Core Tables
- `profiles`: User information and roles
- `communities`: Construction neighborhoods/developments
- `floorplans`: House plans with specifications
- `jobs`: Work orders and project details
- `estimates`: Job estimates with line items
- `crew_assignments`: Team member job assignments
- `materials`: Inventory management
- `job_photos`: Photo documentation

### Security Features
- Row Level Security (RLS) enabled on all tables
- Role-based access policies
- Secure data isolation between different user roles

## Key Workflows

1. **Job Creation**: Manager creates job → assigns community/floorplan → schedules crew
2. **Estimation**: Generate estimate → calculate profit margin → send to client
3. **Execution**: Crew receives assignment → updates status → uploads photos
4. **Completion**: Mark complete → calculate actual costs → generate reports

## Mobile Responsiveness

The application is fully responsive and optimized for:
- **Desktop**: Full feature access with advanced layouts
- **Tablet**: Touch-friendly interface for office use
- **Mobile**: Field-optimized for crew members

## API Integration Ready

The application structure supports future integrations with:
- Builder portals (D.R. Horton VendorSuite, MarkSystems ITK)
- Accounting systems (QuickBooks, Sage)
- Material suppliers
- Time tracking systems

## Demo Data

Sample data includes:
- Pre-configured material inventory
- Work order types specific to residential construction
- Role-based demo accounts

---
still thinking of ideas for more features and workability.  --cody
