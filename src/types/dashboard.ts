export interface DashboardStats {
  totalRevenue: number;
  totalUsers: number;
  totalOrders: number;
  conversionRate: number;

  revenueChange: number;
  usersChange: number;
  ordersChange: number;
  conversionChange: number;
}

export interface RevenueData {
  month: string;
  revenue: number;
}

export interface Activity {
  id: string;
  name: string;
  action: string;
  time: string;
}

export interface DashboardData {
  stats: DashboardStats;
  revenueData: RevenueData[];
  activities: Activity[];
}