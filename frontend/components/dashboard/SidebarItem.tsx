import Link from "next/link";

export default function SidebarItem({
  href,
  icon,
  label,
  active,
  collapsed,
  onClick,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  collapsed?: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      title={collapsed ? label : undefined}
      className={`flex items-center gap-3 px-4 py-2 rounded-lg
                  text-sm transition
                  ${
                    active
                      ? "bg-indigo-500/15 text-indigo-400"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }
                  ${collapsed ? "justify-center" : ""}`}
    >
      {icon}
      {!collapsed && label}
    </Link>
  );
}
