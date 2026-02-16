"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import {
  LayoutDashboard,
  BookOpen,
  ClipboardList,
  LogOut,
  BarChart3,
  ChevronRight,
  Shield,
  ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/slides/day1", icon: BookOpen, label: "Day 1 Slides" },
  { href: "/slides/day2", icon: BookOpen, label: "Day 2 Slides" },
  { href: "/quizzes", icon: ClipboardList, label: "Quizzes" },
];

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const { user, profile, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return;
    if (!user) router.replace("/login");
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen brand-bg flex items-center justify-center">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-violet-500 to-purple-500 animate-pulse-slow" />
      </div>
    );
  }

  // Admins viewing slides get a lightweight bar instead of the student sidebar
  if (profile?.role === "admin") {
    return (
      <div className="min-h-screen brand-bg">
        <div className="sticky top-0 z-30 border-b border-white/5 bg-black/30 backdrop-blur-xl px-4 py-3 flex items-center justify-between">
          <Link
            href="/admin"
            className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Admin
          </Link>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/15 border border-violet-500/25">
            <Shield className="w-3 h-3 text-violet-400" />
            <span className="text-violet-300 text-xs font-semibold">Lecturer View</span>
          </div>
        </div>
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen brand-bg flex">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col fixed inset-y-0 left-0 border-r border-white/5 bg-black/20 backdrop-blur-xl z-30">
        {/* Logo */}
        <div className="flex items-center gap-3 p-6 border-b border-white/5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
            <BarChart3 className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-white font-bold text-sm leading-none">SMA Course</p>
            <p className="text-white/30 text-xs mt-0.5">Analytics Platform</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(({ href, icon: Icon, label }) => {
            const active = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group",
                  active
                    ? "bg-violet-500/20 text-violet-300 border border-violet-500/30"
                    : "text-white/50 hover:text-white hover:bg-white/5"
                )}
              >
                <Icon className={cn("w-4 h-4", active ? "text-violet-400" : "text-white/40 group-hover:text-white/70")} />
                {label}
                {active && <ChevronRight className="w-3 h-3 ml-auto text-violet-400" />}
              </Link>
            );
          })}
        </nav>

        {/* User profile at bottom */}
        <div className="p-4 border-t border-white/5 space-y-3">
          <div className="glass rounded-xl p-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
              {profile?.name?.[0]?.toUpperCase() || "S"}
            </div>
            <div className="min-w-0">
              <p className="text-white text-sm font-medium truncate">{profile?.name || "Student"}</p>
              <p className="text-white/40 text-xs truncate">{profile?.studentId || ""}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-3 py-2 w-full rounded-xl text-white/40 hover:text-red-400 hover:bg-red-500/10 text-sm transition-all duration-200"
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-30 border-b border-white/5 bg-black/20 backdrop-blur-xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
            <BarChart3 className="w-4 h-4 text-white" />
          </div>
          <span className="text-white font-bold text-sm">SMA Course</span>
        </div>
        <button onClick={logout} className="text-white/40 hover:text-red-400 transition-colors">
          <LogOut className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile bottom nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 border-t border-white/5 bg-black/20 backdrop-blur-xl px-2 py-2 flex justify-around">
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-medium transition-all",
                active ? "text-violet-400" : "text-white/40"
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="hidden xs:block">{label.split(" ")[0]}</span>
            </Link>
          );
        })}
      </div>

      {/* Main content */}
      <main className="flex-1 md:ml-64 pt-16 md:pt-0 pb-20 md:pb-0 min-h-screen">
        {children}
      </main>
    </div>
  );
}
