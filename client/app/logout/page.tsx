"use client";
import { useAuth } from "@/lib/context/AuthContext";
import { useEffect } from "react";

export default function page() {
  const { logout } = useAuth();
  useEffect(() => {
    logout();
  }, []);
}
