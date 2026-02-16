"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllQuizzes, getAllStudents, getAllAttempts, Quiz, UserProfile, Attempt } from "@/lib/firestore";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Trophy, ChevronLeft, Medal, Timer } from "lucide-react";
import { cn } from "@/lib/utils";

interface LeaderboardEntry {
  student: UserProfile;
  score: number;
  totalPossible: number;
  percentage: number;
  attemptsCount: number;
}

export default function LeaderboardPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"overall" | string>("overall");
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const [qs, students, allAttempts] = await Promise.all([
          getAllQuizzes(),
          getAllStudents(),
          getAllAttempts(),
        ]);

        const sortedQuizzes = qs.sort((a, b) => {
          if (a.day !== b.day) return a.day - b.day;
          return a.type === "morning" ? -1 : 1;
        });
        setQuizzes(sortedQuizzes);

        // Calculate rankings based on active tab
        let data: LeaderboardEntry[] = [];

        if (activeTab === "overall") {
          data = students.map((student) => {
            let totalScore = 0;
            let totalPossible = 0;
            let attemptsCount = 0;

            sortedQuizzes.forEach((quiz) => {
              const quizAttempts = allAttempts.filter(
                (a) => a.userId === student.uid && a.quizId === quiz.id
              );
              if (quizAttempts.length > 0) {
                const bestScore = Math.max(...quizAttempts.map((a) => a.score));
                totalScore += bestScore;
                attemptsCount += quizAttempts.length;
              }
              totalPossible += quiz.questions.length;
            });

            return {
              student,
              score: totalScore,
              totalPossible,
              percentage: totalPossible > 0 ? (totalScore / totalPossible) * 100 : 0,
              attemptsCount,
            };
          });
        } else {
          // Specific quiz leaderboard
          const quiz = sortedQuizzes.find((q) => q.id === activeTab);
          if (quiz) {
            data = students.map((student) => {
              const quizAttempts = allAttempts.filter(
                (a) => a.userId === student.uid && a.quizId === quiz.id
              );
              const bestScore = quizAttempts.length > 0 
                ? Math.max(...quizAttempts.map((a) => a.score)) 
                : 0;

              return {
                student,
                score: bestScore,
                totalPossible: quiz.questions.length,
                percentage: (bestScore / quiz.questions.length) * 100,
                attemptsCount: quizAttempts.length,
              };
            });
          }
        }

        // Sort data: Score desc, then Name asc
        data.sort((a, b) => {
          if (b.score !== a.score) return b.score - a.score;
          return (a.student.name || "").localeCompare(b.student.name || "");
        });

        // Filter out students with 0 attempts if viewed in specific quiz, 
        // OR show everyone with 0 score? 
        // Let's show everyone for overall, but maybe only participants for specific?
        // Actually, seeing 0s is fine, motivates them.
        setLeaderboardData(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to load leaderboard:", error);
        setLoading(false);
      }
    })();
  }, [activeTab]);

  return (
    <div className="min-h-screen brand-bg text-gray-900 p-6 md:p-12 font-sans selection:bg-blue-500/30">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link 
                    href="/admin"
                    className="w-10 h-10 rounded-xl bg-white flex items-center justify-center hover:bg-white/80 shadow-sm border border-gray-200 transition-colors text-gray-500"
                >
                    <ChevronLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-3xl font-black text-gray-900">
                        Leaderboard
                    </h1>
                    <p className="text-gray-500 font-medium">See how you stack up against your peers</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
                <button
                    onClick={() => setActiveTab("overall")}
                    className={cn(
                        "px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all duration-200",
                        activeTab === "overall"
                            ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                            : "bg-white text-gray-500 border border-gray-200 hover:bg-gray-50 hover:text-gray-900"
                    )}
                >
                    Overall
                </button>
                {quizzes.map((quiz) => (
                     <button
                        key={quiz.id}
                        onClick={() => setActiveTab(quiz.id)}
                        className={cn(
                            "px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all duration-200",
                            activeTab === quiz.id
                                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                                : "bg-white text-gray-500 border border-gray-200 hover:bg-gray-50 hover:text-gray-900"
                        )}
                    >
                        Day {quiz.day} {quiz.type === "morning" ? "AM" : "PM"}
                    </button>
                ))}
            </div>

            {/* Leaderboard Table */}
            <Card className="bg-white border-gray-200 overflow-hidden shadow-sm">
                {loading ? (
                    <div className="p-8 space-y-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="h-16 rounded-xl bg-gray-100 animate-pulse" />
                        ))}
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="p-4 text-center w-16 text-gray-500 font-medium">Rank</th>
                                    <th className="p-4 text-gray-500 font-medium">Student</th>
                                    <th className="p-4 text-right text-gray-500 font-medium">Score</th>
                                    <th className="p-4 text-right text-gray-500 font-medium hidden sm:table-cell">Correct</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {leaderboardData.map((entry, index) => {
                                    const rank = index + 1;
                                    let rankColor = "text-gray-400";
                                    let rankIcon = null;

                                    if (rank === 1) {
                                        rankColor = "text-yellow-400";
                                        rankIcon = <Medal className="w-5 h-5 mx-auto" />;
                                    } else if (rank === 2) {
                                        rankColor = "text-slate-300";
                                        rankIcon = <Medal className="w-5 h-5 mx-auto" />;
                                    } else if (rank === 3) {
                                        rankColor = "text-amber-600";
                                        rankIcon = <Medal className="w-5 h-5 mx-auto" />;
                                    }

                                    return (
                                        <tr key={entry.student.uid} className="hover:bg-gray-50 transition-colors group">
                                            <td className={`p-4 text-center font-bold text-lg ${rankColor}`}>
                                                {rankIcon || rank}
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center font-bold text-blue-600">
                                                        {entry.student.name?.[0]?.toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                                            {entry.student.name}
                                                        </p>
                                                        <p className="text-xs text-gray-500 hidden sm:block">
                                                            {entry.student.favoriteSocialMedia || "Student"}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4 text-right">
                                                <span className="font-mono font-bold text-lg text-gray-900">
                                                    {entry.score}
                                                </span>
                                                <span className="text-sm text-gray-500 ml-1">
                                                    / {entry.totalPossible}
                                                </span>
                                            </td>
                                            <td className="p-4 text-right hidden sm:table-cell">
                                                <Badge variant={entry.percentage >= 80 ? "success" : entry.percentage >= 50 ? "warning" : "secondary"}>
                                                    {Math.round(entry.percentage)}%
                                                </Badge>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </Card>
        </div>
    </div>
  );
}
