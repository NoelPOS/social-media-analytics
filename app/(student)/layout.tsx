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
  // { href: "/slides/day2", icon: BookOpen, label: "Day 2 Slides" },
  // { href: "/quizzes", icon: ClipboardList, label: "Quizzes" },
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
        <div className="w-10 h-10 rounded-full bg-blue-600 animate-pulse-slow" />
      </div>
    );
  }

  // Admins viewing slides get a lightweight bar instead of the student sidebar
  if (profile?.role === "admin") {
    return (
      <div className="min-h-screen brand-bg">
        <div className="sticky top-0 z-30 border-b border-border bg-white/50 backdrop-blur-xl px-4 py-3 flex items-center justify-between">
          <Link
            href="/admin"
            className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Admin
          </Link>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 border border-blue-200">
            <Shield className="w-3 h-3 text-blue-600" />
            <span className="text-blue-700 text-xs font-semibold">Lecturer View</span>
          </div>
        </div>
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen brand-bg flex">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col fixed inset-y-0 left-0 border-r border-border bg-white/50 backdrop-blur-xl z-30">
        {/* Logo */}
        <div className="flex items-center gap-3 p-6 border-b border-border">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <BarChart3 className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-foreground font-bold text-sm leading-none">SMA Course</p>
            <p className="text-muted-foreground text-xs mt-0.5">Analytics Platform</p>
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
                    ? "bg-blue-50 text-blue-600 border border-blue-100"
                    : "text-muted-foreground hover:text-foreground hover:bg-black/5"
                )}
              >
                <Icon className={cn("w-4 h-4", active ? "text-blue-600" : "text-muted-foreground group-hover:text-foreground")} />
                {label}
                {active && <ChevronRight className="w-3 h-3 ml-auto text-blue-600" />}
              </Link>
            );
          })}
        </nav>

        {/* User profile at bottom */}
        <div className="p-4 border-t border-border space-y-3">
          <div className="glass rounded-xl p-3 flex items-center gap-3 shadow-sm">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
              {profile?.name?.[0]?.toUpperCase() || "S"}
            </div>
            <div className="min-w-0">
              <p className="text-foreground text-sm font-medium truncate">{profile?.name || "Student"}</p>
              <p className="text-muted-foreground text-xs truncate">{profile?.studentId || ""}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-3 py-2 w-full rounded-xl text-muted-foreground hover:text-red-600 hover:bg-red-50 text-sm transition-all duration-200"
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-30 border-b border-border bg-white/80 backdrop-blur-xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <BarChart3 className="w-4 h-4 text-white" />
          </div>
          <span className="text-foreground font-bold text-sm">SMA Course</span>
        </div>
        <button onClick={logout} className="text-muted-foreground hover:text-red-600 transition-colors">
          <LogOut className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile bottom nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 border-t border-border bg-white/80 backdrop-blur-xl px-2 py-2 flex justify-around">
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-medium transition-all",
                active ? "text-blue-600" : "text-muted-foreground"
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
