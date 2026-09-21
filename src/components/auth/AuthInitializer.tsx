"use client";

import { useEffect, useState } from "react";

import { restoreSession } from "@/store/slices/authSlice";
import { useAppDispatch } from "@/store/hooks";
import { User } from "@/types/auth";

interface AuthInitializerProps {
  children: React.ReactNode;
}

export function AuthInitializer({
  children,
}: AuthInitializerProps) {
  const dispatch = useAppDispatch();

  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("dashboard_user");

    if (storedUser) {
      try {
        const user: User = JSON.parse(storedUser);

        dispatch(restoreSession(user));
      } catch {
        localStorage.removeItem("dashboard_user");
      }
    }

    setIsInitialized(true);
  }, [dispatch]);

  if (!isInitialized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="text-gray-500">
          Loading...
        </div>
      </div>
    );
  }

  return <>{children}</>;
}