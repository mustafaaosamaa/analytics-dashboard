import { mockDashboardData } from "@/data/mockData";
import { mockUsers } from "@/data/usersData";
import { DashboardData } from "@/types/dashboard";
import { DashboardUser } from "@/types/user";

export const dashboardService = {
  getDashboardData: async (): Promise<DashboardData> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    return mockDashboardData;
  },

  getUsers: async (): Promise<DashboardUser[]> => {
    await new Promise((resolve) => setTimeout(resolve, 700));

    return mockUsers;
  },
};