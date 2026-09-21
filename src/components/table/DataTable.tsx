"use client";

import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from "@tanstack/react-table";

import { useEffect, useMemo, useState } from "react";
import TableFilters from "@/components/table/TableFilters";

import {
    DashboardUser,
    UserStatus,
} from "@/types/user";

interface DataTableProps {
    data: DashboardUser[];
}

const statusStyles: Record<UserStatus, string> = {
    Active:
        "bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20",

    Inactive:
        "bg-gray-100 text-gray-600 ring-1 ring-inset ring-gray-500/20",

    Pending:
        "bg-yellow-50 text-yellow-700 ring-1 ring-inset ring-yellow-600/20",
};

export default function DataTable({
    data,
}: DataTableProps) {
    const [sorting, setSorting] =
        useState<SortingState>([]);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("All");
    const [role, setRole] = useState("All");

    const filteredData = useMemo(() => {
        const normalizedSearch = search.toLowerCase().trim();

        return data.filter((user) => {
            const matchesSearch =
                normalizedSearch === "" ||
                user.name.toLowerCase().includes(normalizedSearch) ||
                user.email.toLowerCase().includes(normalizedSearch);

            const matchesStatus =
                status === "All" || user.status === status;

            const matchesRole =
                role === "All" || user.role === role;

            return (
                matchesSearch &&
                matchesStatus &&
                matchesRole
            );
        });
    }, [data, search, status, role]);

    const columns = [
        {
            accessorKey: "name",
            header: "User",
            cell: ({
                row,
            }: {
                row: { original: DashboardUser };
            }) => (
                <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-bold text-blue-600">
                        {row.original.name.charAt(0)}
                    </div>

                    <div className="min-w-0">
                        <p className="truncate font-medium text-gray-900">
                            {row.original.name}
                        </p>

                        <p className="truncate text-xs text-gray-500">
                            {row.original.email}
                        </p>
                    </div>
                </div>
            ),
        },

        {
            accessorKey: "role",
            header: "Role",
        },

        {
            accessorKey: "status",
            header: "Status",
            cell: ({
                row,
            }: {
                row: { original: DashboardUser };
            }) => (
                <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[row.original.status]
                        }`}
                >
                    {row.original.status}
                </span>
            ),
        },

        {
            accessorKey: "orders",
            header: "Orders",
        },

        {
            accessorKey: "totalSpent",
            header: "Total Spent",
            cell: ({
                row,
            }: {
                row: { original: DashboardUser };
            }) => (
                <span className="font-medium text-gray-900">
                    ${row.original.totalSpent.toLocaleString()}
                </span>
            ),
        },

        {
            accessorKey: "joinedAt",
            header: "Joined",
        },
    ];

    const table = useReactTable({
        data: filteredData,

        columns,

        state: {
            sorting,
        },

        onSortingChange: setSorting,

        getCoreRowModel: getCoreRowModel(),

        getSortedRowModel: getSortedRowModel(),

        getPaginationRowModel:
            getPaginationRowModel(),

        initialState: {
            pagination: {
                pageSize: 10,
            },
        },
    });

    useEffect(() => {
        table.setPageIndex(0);
    }, [search, status, role]);

    return (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

            {/* Table Header */}
            <div className="border-b border-gray-200 p-5">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                        Users
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                        Manage and monitor your users
                    </p>

                    <p className="mt-3 text-sm text-gray-500">
                        Showing{" "}
                        <span className="font-semibold text-gray-900">
                            {filteredData.length}
                        </span>{" "}
                        {filteredData.length === 1 ? "user" : "users"}
                    </p>

                </div>
            </div>

            <TableFilters
                search={search}
                status={status}
                role={role}
                onSearchChange={setSearch}
                onStatusChange={setStatus}
                onRoleChange={setRole}
                onClear={() => {
                    setSearch("");
                    setStatus("All");
                    setRole("All");
                }}
            />

            {/* Responsive Table */}
            <div className="overflow-x-auto">
                <table className="min-w-[800px] w-full text-left text-sm">

                    <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                        {table.getHeaderGroups().map(
                            (headerGroup) => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map(
                                        (header) => {
                                            const canSort =
                                                header.column.getCanSort();

                                            return (
                                                <th
                                                    key={header.id}
                                                    className="px-5 py-4 font-semibold"
                                                >
                                                    {header.isPlaceholder ? null : (
                                                        <button
                                                            type="button"
                                                            onClick={
                                                                canSort
                                                                    ? header.column.getToggleSortingHandler()
                                                                    : undefined
                                                            }
                                                            className={`flex items-center gap-2 ${canSort
                                                                ? "cursor-pointer hover:text-gray-900"
                                                                : "cursor-default"
                                                                }`}
                                                        >
                                                            {flexRender(
                                                                header.column
                                                                    .columnDef.header,
                                                                header.getContext()
                                                            )}

                                                            {canSort && (
                                                                <span className="text-gray-400">
                                                                    {{
                                                                        asc: "↑",
                                                                        desc: "↓",
                                                                    }[
                                                                        header.column.getIsSorted() as string
                                                                    ] ?? "↕"}
                                                                </span>
                                                            )}
                                                        </button>
                                                    )}
                                                </th>
                                            );
                                        }
                                    )}
                                </tr>
                            )
                        )}
                    </thead>

                    <tbody className="divide-y divide-gray-100">
                        {table.getRowModel().rows.length > 0 ? (
                            table.getRowModel().rows.map((row) => (
                                <tr
                                    key={row.id}
                                    className="transition hover:bg-gray-50"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <td
                                            key={cell.id}
                                            className="px-5 py-4 text-gray-600"
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="px-5 py-16 text-center"
                                >
                                    <div className="mx-auto max-w-sm">
                                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-xl">
                                            🔍
                                        </div>

                                        <h4 className="mt-4 font-semibold text-gray-900">
                                            No users found
                                        </h4>

                                        <p className="mt-1 text-sm text-gray-500">
                                            Try adjusting your search or filters.
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>

                </table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col gap-4 border-t border-gray-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                    <p className="text-sm text-gray-500">
                        Page{" "}
                        <span className="font-medium text-gray-900">
                            {table.getState().pagination.pageIndex + 1}
                        </span>{" "}
                        of{" "}
                        <span className="font-medium text-gray-900">
                            {table.getPageCount()}
                        </span>
                    </p>

                    <div className="flex items-center gap-2">
                        <label
                            htmlFor="page-size"
                            className="text-sm text-gray-500"
                        >
                            Rows
                        </label>

                        <select
                            id="page-size"
                            value={table.getState().pagination.pageSize}
                            onChange={(event) => {
                                table.setPageSize(Number(event.target.value));
                                table.setPageIndex(0);
                            }}
                            className="rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-sm outline-none focus:border-blue-500"
                        >
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={30}>30</option>
                            <option value={50}>50</option>
                        </select>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        Previous
                    </button>

                    <button
                        type="button"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}