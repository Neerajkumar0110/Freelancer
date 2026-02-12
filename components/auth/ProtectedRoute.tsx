"use client";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
  allowedRoles?: string[];
}) {
  return <>{children}</>;
}
