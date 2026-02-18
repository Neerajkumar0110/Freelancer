"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import ClientSidebar from "./ClientSidebar";
import FreelancerSidebar from "./FreelancerSidebar";

export default function Sidebar() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => setIsOpen(false);

  if (!user)
    return (
      <div className="w-64 bg-[#020617] h-screen border-r border-white/5 animate-pulse" />
    );

  return user.role === "client" ? (
    <ClientSidebar isOpen={isOpen} onClose={handleClose} />
  ) : (
    <FreelancerSidebar isOpen={isOpen} onClose={handleClose} />
  );
}
