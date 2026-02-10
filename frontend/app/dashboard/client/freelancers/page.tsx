"use client";

import React from "react";
import { useEffect, useState } from "react";

type ClientProfile = {
  id: number;
  name: string;
  email: string;
  company?: string;
  createdAt: string;
};

export default function ClientPage() {
  const [client, setClient] = useState<ClientProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        setClient({
          id: 1,
          name: "Demo Client",
          email: "client@example.com",
          company: "StockVerse Pvt Ltd",
          createdAt: new Date().toISOString(),
        });
        setLoading(false);
      } catch {
        setError("Failed to load client");
        setLoading(false);
      }
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-gray-500 text-sm">
        Loading client details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-500 text-sm">
        {error}
      </div>
    );
  }

  if (!client) return null;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Client Dashboard</h1>

      <div className="rounded-lg border bg-white p-4 space-y-2">
        <div>
          <span className="text-gray-500 text-sm">Name</span>
          <p className="font-medium">{client.name}</p>
        </div>

        <div>
          <span className="text-gray-500 text-sm">Email</span>
          <p className="font-medium">{client.email}</p>
        </div>

        {client.company && (
          <div>
            <span className="text-gray-500 text-sm">Company</span>
            <p className="font-medium">{client.company}</p>
          </div>
        )}

        <div>
          <span className="text-gray-500 text-sm">Joined</span>
          <p className="font-medium">
            {new Date(client.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}