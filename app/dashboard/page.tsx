"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import RevenueChart from "@/components/dashboard/RevenueChart";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatsCard from "@/components/dashboard/StatsCard";
import DashboardSkeleton from "@/components/ui/DashboardSkeleton";
import DataTable from "@/components/table/DataTable";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchDashboardData,
  fetchUsers,
} from "@/store/slices/dashboardSlice";

export default function DashboardPage() {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const { user, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );

  const {
    data,
    users,
    isLoading,
    isUsersLoading,
    error,
  } = useAppSelector(
    (state) => state.dashboard
  );

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }

    dispatch(fetchDashboardData());
    dispatch(fetchUsers());
  }, [
    isAuthenticated,
    router,
    dispatch,
  ]);

  if (!isAuthenticated) {
    return null;
  }

  if (isLoading || !data) {
    return (
      <DashboardLayout>
        <DashboardSkeleton />
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <h2 className="font-semibold text-red-700">
            Failed to load dashboard
          </h2>

          <p className="mt-1 text-sm text-red-600">
            {error}
          </p>

          <button
            type="button"
            onClick={() => dispatch(fetchDashboardData())}
            className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
          >
            Try again
          </button>
        </div>
      </DashboardLayout>
    );
  }

  const {
    stats,
    revenueData,
    activities,
  } = data;

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-7xl space-y-6">

        {/* Page Header */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Good morning, {user?.name?.split(" ")[0]} 👋
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Here's what's happening with your business today.
          </p>
        </div>

        {/* Statistics */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

          <StatsCard
            title="Total Revenue"
            value={`$${stats.totalRevenue.toLocaleString()}`}
            change={`+${stats.revenueChange}%`}
            changeLabel="vs last month"
            icon="💰"
          />

          <StatsCard
            title="Total Users"
            value={stats.totalUsers.toLocaleString()}
            change={`+${stats.usersChange}%`}
            changeLabel="vs last month"
            icon="👥"
          />

          <StatsCard
            title="Total Orders"
            value={stats.totalOrders.toLocaleString()}
            change={`+${stats.ordersChange}%`}
            changeLabel="vs last month"
            icon="🛒"
          />

          <StatsCard
            title="Conversion Rate"
            value={`${stats.conversionRate}%`}
            change={`${stats.conversionChange}%`}
            changeLabel="vs last month"
            icon="📊"
            positive={false}
          />

        </section>

        {/* Main Content */}
        <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">

          {/* Revenue */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm xl:col-span-2">

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Revenue Overview
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Revenue performance over the last 7 months
              </p>
            </div>

            <RevenueChart data={revenueData} />

          </div>

          {/* Recent Activity */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Recent Activity
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Latest user activity
              </p>
            </div>

            <div className="space-y-5">

              {activities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-bold text-blue-600">
                    {activity.name.charAt(0)}
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold text-gray-900">
                        {activity.name}
                      </span>{" "}
                      {activity.action}
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}

            </div>

          </div>

        </section>

        <section>
          {isUsersLoading ? (
            <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-gray-200 bg-white">
              <p className="text-sm text-gray-500">
                Loading users...
              </p>
            </div>
          ) : (
            <DataTable data={users} />
          )}
        </section>

      </div>
    </DashboardLayout>
  );
}