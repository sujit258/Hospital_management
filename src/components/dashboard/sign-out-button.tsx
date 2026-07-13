"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export function DashboardSignOut({ iconOnly = false }: { iconOnly?: boolean }) {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/auth/login" })}
      className={
        iconOnly
          ? "flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-rose-50 hover:text-rose-600"
          : "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-slate-600 hover:bg-rose-50 hover:text-rose-600"
      }
    >
      <LogOut size={16} />
      {!iconOnly && <span>Sign out</span>}
    </button>
  );
}
