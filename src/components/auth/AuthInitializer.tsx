"use client";

import { useEffect } from "react";
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

  useEffect(() => {
    const storedUser = localStorage.getItem("dashboard_user");

    if (!storedUser) {
      return;
    }

    try {
      const user: User = JSON.parse(storedUser);
      dispatch(restoreSession(user));
    } catch {
      localStorage.removeItem("dashboard_user");
    }
  }, [dispatch]);

  return <>{children}</>;
}