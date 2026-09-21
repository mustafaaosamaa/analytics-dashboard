"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import DashboardLayout from "@/components/layout/DashboardLayout";
import StatsCard from "@/components/dashboard/StatsCard";

import { useAppSelector } from "@/store/hooks";

export default function DashboardPage() {
  const router = useRouter();

  const { user, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-7xl space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Good morning, {user?.name?.split(" ")[0]} 👋
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Here's what's happening with your business today.
          </p>
        </div>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatsCard
            title="Total Revenue"
            value="$24,500"
            change="+12.5%"
            changeLabel="vs last month"
            icon="💰"
          />

          <StatsCard
            title="Total Users"
            value="1,284"
            change="+8.2%"
            changeLabel="vs last month"
            icon="👥"
          />

          <StatsCard
            title="Total Orders"
            value="3,642"
            change="+5.7%"
            changeLabel="vs last month"
            icon="🛒"
          />

          <StatsCard
            title="Conversion Rate"
            value="4.8%"
            change="-1.2%"
            changeLabel="vs last month"
            icon="📊"
            positive={false}
          />
        </section>

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm xl:col-span-2">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Revenue Overview
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Revenue performance over the last 7 months
              </p>
            </div>

            <div className="flex h-72 items-center justify-center rounded-xl bg-gray-50">
              <p className="text-sm text-gray-400">
                Chart coming next...
              </p>
            </div>
          </div>

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
              {[
                {
                  name: "Ahmed Hassan",
                  action: "completed an order",
                  time: "5 min ago",
                },
                {
                  name: "Sara Mohamed",
                  action: "created an account",
                  time: "18 min ago",
                },
                {
                  name: "Omar Ali",
                  action: "updated his profile",
                  time: "32 min ago",
                },
                {
                  name: "Mariam Adel",
                  action: "completed an order",
                  time: "1 hour ago",
                },
              ].map((activity) => (
                <div
                  key={`${activity.name}-${activity.time}`}
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
      </div>
    </DashboardLayout>
  );
}