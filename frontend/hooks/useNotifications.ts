"use client";

import { useEffect, useState } from "react";

export function useNotifications() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch("/api/notifications");
        const data = await res.json();
        setNotifications(data);
        setUnread(data.filter((n: any) => !n.read).length);
      } catch {}
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 10000); // polling
    return () => clearInterval(interval);
  }, []);

  return { notifications, unread };
}
