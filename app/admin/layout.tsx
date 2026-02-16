"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { BarChart3, LogOut, Shield } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, profile, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace("/login");
    } else if (profile && profile.role !== "admin") {
      router.replace("/dashboard");
    }
  }, [user, profile, loading, router]);

  if (loading || !user || !profile) {
    return (
      <div className="min-h-screen brand-bg flex items-center justify-center">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse-slow" />
      </div>
    );
  }

  if (profile.role !== "admin") return null;

  return (
    <div className="min-h-screen brand-bg">
      {/* Top nav */}
      <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/80 backdrop-blur-xl px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <BarChart3 className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-gray-900 font-bold text-sm">SMA Course</span>
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-100 border border-blue-200">
                  <Shield className="w-3 h-3 text-blue-600" />
                  <span className="text-blue-700 text-xs font-semibold">Admin</span>
                </div>
              </div>
              <p className="text-gray-500 text-xs">{profile.email}</p>
            </div>
          </div>

          <button
            onClick={logout}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-gray-500 hover:text-red-600 hover:bg-red-50 text-sm transition-all duration-200"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Sign out</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8">{children}</main>
    </div>
  );
}
