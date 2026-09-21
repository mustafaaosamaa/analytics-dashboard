import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import { DashboardUser } from "@/types/user";

export function exportUsersToPdf(users: DashboardUser[]) {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Users Report", 14, 20);

  doc.setFontSize(10);
  doc.text(
    `Generated on ${new Date().toLocaleString()}`,
    14,
    28
  );

  autoTable(doc, {
    startY: 36,
    head: [
      [
        "Name",
        "Email",
        "Role",
        "Status",
        "Orders",
        "Total Spent",
        "Joined",
      ],
    ],
    body: users.map((user) => [
      user.name,
      user.email,
      user.role,
      user.status,
      user.orders.toString(),
      `$${user.totalSpent.toLocaleString()}`,
      user.joinedAt,
    ]),
    styles: {
      fontSize: 8,
      cellPadding: 3,
    },
    headStyles: {
      fontSize: 8,
      fontStyle: "bold",
    },
  });

  doc.save("users-report.pdf");
}