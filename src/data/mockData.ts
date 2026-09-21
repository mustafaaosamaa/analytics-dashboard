import { DashboardData } from "@/types/dashboard";

export const mockDashboardData: DashboardData = {
  stats: {
    totalRevenue: 24500,
    totalUsers: 1284,
    totalOrders: 3642,
    conversionRate: 4.8,

    revenueChange: 12.5,
    usersChange: 8.2,
    ordersChange: 5.7,
    conversionChange: -1.2,
  },

  revenueData: [
    {
      month: "Mar",
      revenue: 18500,
    },
    {
      month: "Apr",
      revenue: 21000,
    },
    {
      month: "May",
      revenue: 19800,
    },
    {
      month: "Jun",
      revenue: 23500,
    },
    {
      month: "Jul",
      revenue: 22000,
    },
    {
      month: "Aug",
      revenue: 26800,
    },
    {
      month: "Sep",
      revenue: 24500,
    },
  ],

  activities: [
    {
      id: "activity-1",
      name: "Ahmed Hassan",
      action: "completed an order",
      time: "5 min ago",
    },
    {
      id: "activity-2",
      name: "Sara Mohamed",
      action: "created an account",
      time: "18 min ago",
    },
    {
      id: "activity-3",
      name: "Omar Ali",
      action: "updated his profile",
      time: "32 min ago",
    },
    {
      id: "activity-4",
      name: "Mariam Adel",
      action: "completed an order",
      time: "1 hour ago",
    },
  ],
};