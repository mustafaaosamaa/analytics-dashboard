"use client";

interface TableFiltersProps {
  search: string;
  status: string;
  role: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onRoleChange: (value: string) => void;
  onClear: () => void;
}

export default function TableFilters({
  search,
  status,
  role,
  onSearchChange,
  onStatusChange,
  onRoleChange,
  onClear,
}: TableFiltersProps) {
  const hasFilters =
    search !== "" || status !== "All" || role !== "All";

  return (
    <div className="border-b border-gray-200 p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
        {/* Search */}
        <div className="flex-1">
          <label
            htmlFor="user-search"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Search users
          </label>

          <input
            id="user-search"
            type="text"
            value={search}
            onChange={(event) =>
              onSearchChange(event.target.value)
            }
            placeholder="Search by name or email..."
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Status */}
        <div className="w-full lg:w-44">
          <label
            htmlFor="status-filter"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Status
          </label>

          <select
            id="status-filter"
            value={status}
            onChange={(event) =>
              onStatusChange(event.target.value)
            }
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="All">All statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Pending">Pending</option>
          </select>
        </div>

        {/* Role */}
        <div className="w-full lg:w-44">
          <label
            htmlFor="role-filter"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Role
          </label>

          <select
            id="role-filter"
            value={role}
            onChange={(event) =>
              onRoleChange(event.target.value)
            }
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="All">All roles</option>
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
            <option value="User">User</option>
          </select>
        </div>

        {/* Clear */}
        {hasFilters && (
          <button
            type="button"
            onClick={onClear}
            className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50 hover:text-gray-900"
          >
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
}