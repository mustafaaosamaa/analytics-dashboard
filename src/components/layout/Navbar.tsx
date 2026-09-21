"use client";

import { useRouter } from "next/navigation";

import { logout } from "@/store/slices/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

interface NavbarProps {
  onMenuClick: () => void;
}

export default function Navbar({
  onMenuClick,
}: NavbarProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.auth.user);

  const handleLogout = () => {
    localStorage.removeItem("dashboard_user");

    dispatch(logout());

    router.replace("/login");
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open menu"
          className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 lg:hidden"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <div>
          <h1 className="text-sm font-semibold text-gray-900 sm:text-base">
            Dashboard
          </h1>

          <p className="hidden text-xs text-gray-500 sm:block">
            Overview of your business
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-semibold text-gray-900">
            {user?.name}
          </p>

          <p className="text-xs capitalize text-gray-500">
            {user?.role}
          </p>
        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">
          {user?.name?.charAt(0).toUpperCase()}
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="hidden rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-900 sm:block"
        >
          Logout
        </button>
      </div>
    </header>
  );
}