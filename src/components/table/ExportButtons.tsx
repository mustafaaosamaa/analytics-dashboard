"use client";

import { exportUsersToPdf } from "@/lib/exportPdf";
import { exportUsersToExcel } from "@/lib/exportExcel";
import { DashboardUser } from "@/types/user";

interface ExportButtonsProps {
  users: DashboardUser[];
}

export default function ExportButtons({
  users,
}: ExportButtonsProps) {
  const handlePdfExport = () => {
    if (users.length === 0) {
      return;
    }

    exportUsersToPdf(users);
  };

  const handleExcelExport = () => {
    if (users.length === 0) {
      return;
    }

    exportUsersToExcel(users);
  };

  const disabled = users.length === 0;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={handlePdfExport}
        disabled={disabled}
        className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Export PDF
      </button>

      <button
        type="button"
        onClick={handleExcelExport}
        disabled={disabled}
        className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Export Excel
      </button>
    </div>
  );
}