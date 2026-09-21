export type UserStatus = "Active" | "Inactive" | "Pending";

export type UserRole = "Admin" | "Manager" | "User";

export interface DashboardUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  orders: number;
  totalSpent: number;
  joinedAt: string;
}