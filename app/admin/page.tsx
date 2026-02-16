"use client";

import { useEffect, useState, useCallback } from "react";
import {
  getAllQuizzes,
  getAllStudents,
  getAllAttempts,
  updateQuizStatus,
  resetUserAttempts,
  seedQuizzes,
  deleteAllQuizzes,
  deleteAllAttempts,
  setAttendance,
  getAllAttendance,
  deleteStudent,
  Attendance,
  Quiz,
  UserProfile,
  Attempt,
} from "@/lib/firestore";
import { MOCK_QUIZZES } from "@/lib/quiz-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import {
  Users,
  ClipboardList,
  ToggleLeft,
  ToggleRight,
  RefreshCw,
  Database,
  Trophy,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  Search,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";

interface StudentRow {
  profile: UserProfile;
  attempts: Attempt[];
}

export default function AdminDashboard() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [studentRows, setStudentRows] = useState<StudentRow[]>([]);
  const [allAttempts, setAllAttempts] = useState<Attempt[]>([]);
  const [allAttendance, setAllAttendance] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState<string | null>(null);
  const [seeding, setSeeding] = useState(false);
  const [resetting, setResetting] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedStudent, setExpandedStudent] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"quizzes" | "students" | "attendance">("quizzes");

  const load = useCallback(async () => {
    setLoading(true);
    const [qs, students, attempts, attendance] = await Promise.all([
      getAllQuizzes(),
      getAllStudents(),
      getAllAttempts(),
      getAllAttendance(),
    ]);

    const sorted = qs.sort((a, b) => {
      if (a.day !== b.day) return a.day - b.day;
      return a.type === "morning" ? -1 : 1;
    });
    setQuizzes(sorted);
    setAllAttempts(attempts);
    setAllAttendance(attendance);

    const rows: StudentRow[] = students.map((p) => ({
      profile: p,
      attempts: attempts.filter((a) => a.userId === p.uid),
    }));
    rows.sort((a, b) => (a.profile.name || "").localeCompare(b.profile.name || ""));
    setStudentRows(rows);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const toggleQuiz = async (quiz: Quiz) => {
    setToggling(quiz.id);
    await updateQuizStatus(quiz.id, !quiz.active);
    setQuizzes((prev) =>
      prev.map((q) => (q.id === quiz.id ? { ...q, active: !q.active } : q))
    );
    setToggling(null);
  };

  const handleSeed = async () => {
    if (
      !confirm(
        "⚠️ WARNING: This will DELETE ALL EXISTING QUIZZES AND ATTEMPTS and reset them to the default state.\n\nAre you sure you want to continue?"
      )
    )
      return;
    setSeeding(true);
    await deleteAllAttempts();
    await deleteAllQuizzes();
    await seedQuizzes(MOCK_QUIZZES);
    await load();
    setSeeding(false);
  };

  const handleReset = async (userId: string, quizId: string, userName: string, quizTitle: string) => {
    if (!confirm(`Reset all attempts for ${userName} on "${quizTitle}"?`)) return;
    setResetting(`${userId}-${quizId}`);
    await resetUserAttempts(userId, quizId);
    await load();
    setResetting(null);
  };

  const handleDeleteStudent = async (userId: string, userName: string) => {
    if (
      !confirm(
        `⚠️ DANGER: Delete student "${userName}"?\n\nThis will permanently delete their profile, quiz history, and attendance. This cannot be undone.`
      )
    )
      return;
    setDeleting(userId);
    await deleteStudent(userId);
    await load();
    setDeleting(null);
  };

  const handleAttendanceChange = async (userId: string, date: string, session: "morning" | "afternoon", present: boolean) => {
    // Optimistic update
    setAllAttendance((prev) => {
      if (present) {
        return [...prev, { userId, date, session, present: true }];
      } else {
        return prev.filter(
          (a) => !(a.userId === userId && a.date === date && a.session === session)
        );
      }
    });
    await setAttendance(userId, date, session, present);
    // Silent reload to sync
    const [_, __, ___, newAttendance] = await Promise.all([
      Promise.resolve(),
      Promise.resolve(),
      Promise.resolve(),
      getAllAttendance(),
    ]);
    setAllAttendance(newAttendance);
  };

  // Stats
  const totalStudents = studentRows.length;
  const activeQuizzes = quizzes.filter((q) => q.active).length;
  const totalAttempts = allAttempts.length;
  const avgScore =
    allAttempts.length > 0
      ? Math.round(
          allAttempts.reduce((acc, a) => {
            const quiz = quizzes.find((q) => q.id === a.quizId);
            return quiz ? acc + (a.score / quiz.questions.length) * 100 : acc;
          }, 0) / allAttempts.length
        )
      : 0;

  const filteredStudents = studentRows.filter(
    (r) =>
      r.profile.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.profile.studentId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.profile.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-black text-white">Admin Dashboard</h1>
          <p className="text-white/40 mt-1">Manage quizzes and monitor student progress</p>
        </div>
        <div className="flex gap-3 flex-wrap">
          <Link href="/leaderboard">
            <Button variant="outline" size="sm" className="gap-2">
              <Trophy className="w-4 h-4" />
              Leaderboard
            </Button>
          </Link>
          <Button variant="outline" onClick={load} size="sm">
            <RefreshCw className="w-4 h-4" /> Refresh
          </Button>
          <Button onClick={handleSeed} disabled={seeding} variant="default" size="sm">
            {seeding ? (
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Resetting...
              </span>
            ) : (
              <>
                <Database className="w-4 h-4" /> Reset & Seed Data
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Lecture Slides */}
      <div>
        <h2 className="text-white font-bold text-base mb-3 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-violet-400" />
          Lecture Slides
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { day: "day1", label: "Day 1", description: "Introduction to Social Media Analytics" },
            { day: "day2", label: "Day 2", description: "Platform Analytics & Advanced Strategies" },
          ].map(({ day, label, description }) => (
            <Link key={day} href={`/slides/${day}`}>
              <Card className="p-4 hover:border-violet-500/30 hover:bg-white/[0.06] transition-all duration-200 cursor-pointer group flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-violet-500/15 border border-violet-500/20 flex items-center justify-center text-lg flex-shrink-0">
                  📊
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold text-sm">{label}</p>
                  <p className="text-white/40 text-xs truncate">{description}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-violet-400 transition-colors flex-shrink-0" />
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: Users, label: "Total Students", value: totalStudents, color: "text-blue-400", bg: "from-blue-900/30 to-blue-900/10 border-blue-500/20" },
          { icon: ClipboardList, label: "Active Quizzes", value: `${activeQuizzes}/${quizzes.length}`, color: "text-violet-400", bg: "from-violet-900/30 to-violet-900/10 border-violet-500/20" },
          { icon: Trophy, label: "Total Attempts", value: totalAttempts, color: "text-amber-400", bg: "from-amber-900/30 to-amber-900/10 border-amber-500/20" },
          { icon: TrendingUp, label: "Avg. Score", value: `${avgScore}%`, color: "text-emerald-400", bg: "from-emerald-900/30 to-emerald-900/10 border-emerald-500/20" },
        ].map(({ icon: Icon, label, value, color, bg }) => (
          <div key={label} className={`rounded-2xl p-5 bg-gradient-to-br border ${bg}`}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center ${color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-white font-black text-xl leading-none">{value}</p>
                <p className="text-white/40 text-xs mt-0.5">{label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tab switcher */}
      <div className="flex gap-1 p-1 rounded-xl bg-white/5 w-fit">
        {(["quizzes", "students", "attendance"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 capitalize ${
              activeTab === tab
                ? "bg-violet-500 text-white shadow-lg shadow-violet-500/25"
                : "text-white/40 hover:text-white"
            }`}
          >
            {tab === "quizzes" ? `Quizzes (${quizzes.length})` : tab === "students" ? `Students (${totalStudents})` : `Attendance`}
          </button>
        ))}
      </div>

      {/* QUIZ CONTROL TAB */}
      {activeTab === "quizzes" && (
        <div className="space-y-4">
          {loading ? (
            <div className="grid md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-32 rounded-2xl shimmer" />
              ))}
            </div>
          ) : quizzes.length === 0 ? (
            <Card className="p-12 text-center">
              <Database className="w-10 h-10 text-white/10 mx-auto mb-4" />
              <p className="text-white/40 mb-2">No quizzes in database yet.</p>
              <p className="text-white/20 text-sm">Click "Seed Quiz Data" to add mock quizzes.</p>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {quizzes.map((quiz) => {
                const quizAttempts = allAttempts.filter((a) => a.quizId === quiz.id);
                const uniqueStudents = new Set(quizAttempts.map((a) => a.userId)).size;
                const avgQuizScore =
                  quizAttempts.length > 0
                    ? Math.round(
                        quizAttempts.reduce((acc, a) => acc + (a.score / quiz.questions.length) * 100, 0) /
                          quizAttempts.length
                      )
                    : null;

                return (
                  <Card key={quiz.id} className={`p-5 border transition-all ${quiz.active ? "border-emerald-500/20 bg-emerald-500/[0.03]" : "border-white/8"}`}>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <Badge variant={quiz.type === "morning" ? "info" : "warning"}>
                            Day {quiz.day} · {quiz.type === "morning" ? "☀️ Morning" : "🌙 Afternoon"}
                          </Badge>
                          {quiz.active ? (
                            <Badge variant="success">● Live</Badge>
                          ) : (
                            <Badge variant="secondary">Closed</Badge>
                          )}
                        </div>
                        <h3 className="text-white font-semibold text-sm truncate">{quiz.title}</h3>
                        <p className="text-white/30 text-xs mt-0.5">
                          {quiz.questions.length} questions · {Math.floor(quiz.timeLimit / 60)} min
                        </p>
                      </div>

                      {/* Toggle switch */}
                      <button
                        onClick={() => toggleQuiz(quiz)}
                        disabled={toggling === quiz.id}
                        className={`flex-shrink-0 transition-all duration-300 ${toggling === quiz.id ? "opacity-50" : "hover:scale-105"}`}
                        title={quiz.active ? "Click to close quiz" : "Click to open quiz"}
                      >
                        {quiz.active ? (
                          <ToggleRight className="w-8 h-8 text-emerald-400" />
                        ) : (
                          <ToggleLeft className="w-8 h-8 text-white/30" />
                        )}
                      </button>
                    </div>

                    {/* Analytics row */}
                    <div className="flex items-center gap-4 text-xs text-white/40">
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {uniqueStudents} students attempted
                      </span>
                      {avgQuizScore !== null && (
                        <span className="flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          Avg: {avgQuizScore}%
                        </span>
                      )}
                    </div>

                    {avgQuizScore !== null && (
                      <div className="mt-2">
                        <Progress value={avgQuizScore} className="h-1" />
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* STUDENTS TAB */}
      {activeTab === "students" && (
        <div className="space-y-4">
          {/* Search */}
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <Input
              placeholder="Search students..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 rounded-2xl shimmer" />
              ))}
            </div>
          ) : filteredStudents.length === 0 ? (
            <Card className="p-12 text-center">
              <Users className="w-10 h-10 text-white/10 mx-auto mb-4" />
              <p className="text-white/40">
                {searchQuery ? "No students match your search." : "No students registered yet."}
              </p>
            </Card>
          ) : (
            <div className="space-y-3">
              {filteredStudents.map(({ profile, attempts }) => {
                const isExpanded = expandedStudent === profile.uid;
                const totalScore = attempts.reduce((acc, a) => {
                  const quiz = quizzes.find((q) => q.id === a.quizId);
                  return quiz ? acc + a.score : acc;
                }, 0);
                const totalPossible = attempts.reduce((acc, a) => {
                  const quiz = quizzes.find((q) => q.id === a.quizId);
                  return quiz ? acc + quiz.questions.length : acc;
                }, 0);
                const avgPct = totalPossible > 0 ? Math.round((totalScore / totalPossible) * 100) : null;

                // Group attempts by quiz, show best attempt per quiz
                const attemptsByQuiz = quizzes.map((quiz) => {
                  const quizAttempts = attempts.filter((a) => a.quizId === quiz.id);
                  const best = quizAttempts.reduce(
                    (b, a) => (a.score > b.score ? a : b),
                    quizAttempts[0]
                  );
                  return { quiz, attempts: quizAttempts, best };
                });

                return (
                  <Card key={profile.uid} className="overflow-hidden">
                    {/* Summary row */}
                    <button
                      onClick={() => setExpandedStudent(isExpanded ? null : profile.uid)}
                      className="w-full p-4 flex items-center gap-4 hover:bg-white/[0.02] transition-colors text-left"
                    >
                      {/* Avatar */}
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
                        {profile.name?.[0]?.toUpperCase() || "S"}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-white font-semibold text-sm">{profile.name}</p>
                          <Badge variant="secondary" className="text-xs">{profile.studentId}</Badge>
                          <Badge variant="outline" className="text-xs hidden sm:inline-flex">
                            {profile.favoriteSocialMedia}
                          </Badge>
                        </div>
                        <p className="text-white/30 text-xs truncate">{profile.email}</p>
                      </div>

                      <div className="flex items-center gap-3 flex-shrink-0">
                        <div className="text-right hidden sm:block">
                          <p className="text-white font-semibold text-sm">
                            {attempts.length} attempts
                          </p>
                          {avgPct !== null && (
                            <p className="text-white/40 text-xs">Avg {avgPct}%</p>
                          )}
                        </div>
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteStudent(profile.uid, profile.name);
                          }}
                          disabled={deleting === profile.uid}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-white/20 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                          title="Delete Student"
                        >
                          {deleting === profile.uid ? (
                              <span className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin block" />
                          ) : (
                              <span className="text-lg leading-none">×</span> // Using a simple X, could import Trash if wanted
                          )}
                        </button>

                        {isExpanded
                          ? <ChevronUp className="w-4 h-4 text-white/30" />
                          : <ChevronDown className="w-4 h-4 text-white/30" />
                        }
                      </div>
                    </button>

                    {/* Expanded details */}
                    {isExpanded && (
                      <div className="border-t border-white/5 p-4 space-y-3 bg-white/[0.01]">
                        <p className="text-white/40 text-xs font-semibold uppercase tracking-wider">
                          Quiz Performance
                        </p>

                        {attemptsByQuiz.map(({ quiz, attempts: qAttempts, best }) => (
                          <div
                            key={quiz.id}
                            className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5"
                          >
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <Badge variant={quiz.type === "morning" ? "info" : "warning"} className="text-xs">
                                  D{quiz.day} {quiz.type === "morning" ? "AM" : "PM"}
                                </Badge>
                                <p className="text-white/60 text-xs truncate">{quiz.title}</p>
                              </div>
                              {best ? (
                                <div className="space-y-1">
                                  <div className="flex justify-between text-xs">
                                    <span className="text-white/40">
                                      {qAttempts.length}/2 attempts · Best: {best.score}/{quiz.questions.length}
                                    </span>
                                    <span className="text-violet-300 font-semibold">
                                      {Math.round((best.score / quiz.questions.length) * 100)}%
                                    </span>
                                  </div>
                                  <Progress
                                    value={(best.score / quiz.questions.length) * 100}
                                    className="h-1"
                                  />
                                </div>
                              ) : (
                                <p className="text-white/20 text-xs">No attempts</p>
                              )}
                            </div>

                            {/* Reset button */}
                            {qAttempts.length > 0 && (
                              <button
                                onClick={() => handleReset(profile.uid, quiz.id, profile.name, quiz.title)}
                                disabled={resetting === `${profile.uid}-${quiz.id}`}
                                className="flex-shrink-0 p-1.5 rounded-lg text-white/20 hover:text-red-400 hover:bg-red-500/10 transition-all"
                                title="Reset attempts"
                              >
                                {resetting === `${profile.uid}-${quiz.id}` ? (
                                  <span className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin block" />
                                ) : (
                                  <RefreshCw className="w-3.5 h-3.5" />
                                )}
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ATTENDANCE TAB */}
      {activeTab === "attendance" && (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/[0.02] text-white/40 border-b border-white/5">
                <tr>
                  <th className="p-4 font-medium">Student</th>
                  {[1, 2, 3].map(day => (
                    <th key={day} colSpan={2} className="p-4 font-medium text-center border-l border-white/5">
                      Day {day}
                    </th>
                  ))}
                  <th className="p-4 font-medium text-right">Total</th>
                </tr>
                <tr>
                  <th className="p-2"></th>
                  {[1, 2, 3].map(day => (
                    <>
                      <th key={`${day}-am`} className="p-2 text-center text-xs text-white/20 border-l border-white/5">AM</th>
                      <th key={`${day}-pm`} className="p-2 text-center text-xs text-white/20">PM</th>
                    </>
                  ))}
                  <th className="p-2"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {studentRows.map(({ profile }) => {
                  const schedule = [
                    { day: 1, type: "morning" }, { day: 1, type: "afternoon" },
                    { day: 2, type: "morning" }, { day: 2, type: "afternoon" },
                    { day: 3, type: "morning" }, { day: 3, type: "afternoon" },
                  ] as const;

                  const presentCount = allAttendance.filter(a => a.userId === profile.uid && a.present).length;

                  return (
                    <tr key={profile.uid} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-4">
                        <div className="font-semibold text-white">{profile.name}</div>
                        <div className="text-xs text-white/40">{profile.studentId}</div>
                      </td>
                      {schedule.map(({ day, type }) => {
                        const dateKey = `Day ${day}`; // Simple key for now, could be real date
                        const record = allAttendance.find(
                          a => a.userId === profile.uid && a.date === dateKey && a.session === type
                        );
                        const isPresent = record?.present || false;

                        return (
                          <td key={`${day}-${type}`} className="p-4 text-center border-l border-white/5">
                            <input
                              type="checkbox"
                              checked={isPresent}
                              onChange={(e) => handleAttendanceChange(profile.uid, dateKey, type, e.target.checked)}
                              className="w-4 h-4 rounded border-white/20 bg-white/5 text-violet-500 focus:ring-violet-500 focus:ring-offset-0"
                            />
                          </td>
                        );
                      })}
                      <td className="p-4 text-right font-mono text-white/60">
                         {presentCount} / 6
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
