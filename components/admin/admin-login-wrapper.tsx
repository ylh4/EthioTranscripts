"use client"

import dynamic from "next/dynamic"
import { AdminLoginSkeleton } from "./admin-login-skeleton"

const AdminLoginContainer = dynamic(
  () => import("./admin-login-container"),
  {
    loading: () => <AdminLoginSkeleton />,
    ssr: false
  }
)

export function AdminLoginWrapper() {
  return <AdminLoginContainer />
}