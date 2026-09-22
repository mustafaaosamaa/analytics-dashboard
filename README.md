# AnalyticsHub Dashboard

A responsive sales and users analytics dashboard built with Next.js, React, TypeScript, Tailwind CSS, Redux Toolkit, Recharts, and TanStack Table.

The project was developed as a frontend take-home assignment with a focus on clean component architecture, state management, responsive UI, dynamic data handling, table functionality, data export, and Dockerized deployment.

---

## Features

### Authentication

- Mock authentication flow
- Login validation
- Loading and error states
- Persistent login session using localStorage
- Protected dashboard route
- Logout functionality

### Dashboard

- Responsive dashboard layout
- Sidebar navigation
- Responsive mobile navigation
- KPI/statistics cards
- Revenue analytics chart
- Recent activity section
- Loading skeleton
- Error state with retry functionality

### Users Table

- Dynamic user data
- Search by name or email
- Filter by status
- Filter by role
- Combined search and filters
- Column sorting
- Pagination
- Configurable page size
- Result count
- Empty state
- Responsive horizontal scrolling

### Data Export

- Export filtered users to PDF
- Export filtered users to Excel
- Exported data reflects the currently applied search and filters

### Deployment

- Production Next.js build
- Multi-stage Docker image
- Docker Compose configuration
- Standalone Next.js output

---

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Redux Toolkit
- React Redux
- Recharts
- TanStack Table
- jsPDF
- jsPDF AutoTable
- SheetJS / xlsx
- Docker
- Git

---

## Project Structure

```text
src/
├── app/
│   ├── login/
│   │   └── page.tsx
│   ├── dashboard/
│   │   └── page.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
├── components/
│   ├── auth/
│   │   └── AuthInitializer.tsx
│   │
│   ├── dashboard/
│   │   ├── RevenueChart.tsx
│   │   └── StatsCard.tsx
│   │
│   ├── layout/
│   │   ├── DashboardLayout.tsx
│   │   ├── Navbar.tsx
│   │   └── Sidebar.tsx
│   │
│   ├── table/
│   │   ├── DataTable.tsx
│   │   ├── ExportButtons.tsx
│   │   └── TableFilters.tsx
│   │
│   └── ui/
│       └── DashboardSkeleton.tsx
│
├── data/
│   ├── mockData.ts
│   └── usersData.ts
│
├── lib/
│   ├── exportExcel.ts
│   └── exportPdf.ts
│
├── services/
│   ├── authService.ts
│   └── dashboardService.ts
│
├── store/
│   ├── hooks.ts
│   ├── index.ts
│   ├── provider.tsx
│   └── slices/
│       ├── authSlice.ts
│       └── dashboardSlice.ts
│
└── types/
    ├── auth.ts
    ├── dashboard.ts
    └── user.ts