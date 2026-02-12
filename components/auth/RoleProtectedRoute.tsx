"use client";

export default function RoleProtectedRoute({
  children,
}: {
  children: React.ReactNode;
  allowedRoles?: string[];
}) {
  return <>{children}</>;
}
