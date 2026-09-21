import * as XLSX from "xlsx";

import { DashboardUser } from "@/types/user";

export function exportUsersToExcel(users: DashboardUser[]) {
  const rows = users.map((user) => ({
    Name: user.name,
    Email: user.email,
    Role: user.role,
    Status: user.status,
    Orders: user.orders,
    "Total Spent": user.totalSpent,
    "Joined Date": user.joinedAt,
  }));

  const worksheet = XLSX.utils.json_to_sheet(rows);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Users"
  );

  XLSX.writeFile(workbook, "users-report.xlsx");
}