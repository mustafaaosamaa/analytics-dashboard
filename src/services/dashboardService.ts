import { mockDashboardData } from "@/data/mockData";
import { DashboardData } from "@/types/dashboard";

export const dashboardService = {
  getDashboardData: async (): Promise<DashboardData> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    return mockDashboardData;
  },
};