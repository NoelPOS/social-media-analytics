"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { getAllQuizzes, getUserAttempts, Quiz, Attempt } from "@/lib/firestore";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  ClipboardList,
  Trophy,
  Clock,
  Lock,
  CheckCircle2,
  ArrowRight,
  Zap,
  TrendingUp,
  Target,
  Hand,
  Sun,
  Moon,
  BarChart,
  LineChart,
} from "lucide-react";

interface QuizWithAttempts {
  quiz: Quiz;
  attempts: Attempt[];
}

export default function DashboardPage() {
  const { user, profile } = useAuth();
  const [quizData, setQuizData] = useState<QuizWithAttempts[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const quizzes = await getAllQuizzes();
      const sorted = quizzes.sort((a, b) => {
        if (a.day !== b.day) return a.day - b.day;
        return a.type === "morning" ? -1 : 1;
      });
      const withAttempts = await Promise.all(
        sorted.map(async (quiz) => {
          const attempts = await getUserAttempts(user.uid, quiz.id);
          return { quiz, attempts };
        })
      );
      setQuizData(withAttempts);
      setLoading(false);
    })();
  }, [user]);

  const totalScore = quizData.reduce((acc, { attempts }) => {
    const best = attempts.reduce((b, a) => Math.max(b, a.score), 0);
    return acc + best;
  }, 0);

  const totalPossible = quizData.reduce((acc, { quiz }) => acc + quiz.questions.length, 0);

  const completedQuizzes = quizData.filter(({ attempts }) => attempts.length > 0).length;

  const daySlides = [
    { day: 1, label: "Day 1", description: "Introduction to Social Media Analytics", icon: <BarChart className="w-8 h-8 text-blue-500" /> },
    { day: 2, label: "Day 2", description: "Platform Analytics & Advanced Strategies", icon: <LineChart className="w-8 h-8 text-purple-500" /> },
    { day: 4, label: "Day 4", description: "Multi-Touch Attribution in Marketing", icon: <TrendingUp className="w-8 h-8 text-emerald-500" /> },
  ];

  return (
    <div className="p-6 space-y-8 animate-fade-in">
      {/* Welcome header */}
      <div className="relative overflow-hidden rounded-2xl p-6 bg-blue-600 border border-blue-500 shadow-xl shadow-blue-900/5">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <p className="text-blue-100 text-sm font-medium mb-1 flex items-center gap-2">
                Welcome back <Hand className="w-4 h-4 text-amber-300" />
              </p>
              <h1 className="text-3xl font-black text-white">
                {profile?.name || "Student"}
              </h1>
              <p className="text-blue-100/80 mt-1">
                Keep learning · {profile?.favoriteSocialMedia && (
                  <span className="text-white font-medium">{profile.favoriteSocialMedia} enthusiast</span>
                )}
              </p>
            </div>
            <div className="flex gap-4">
              <div className="text-center bg-white/10 backdrop-blur-md rounded-xl px-5 py-3 border border-white/20">
                <p className="text-2xl font-black text-white">{completedQuizzes}</p>
                <p className="text-blue-100 text-xs">Quizzes Done</p>
              </div>
              <div className="text-center bg-white/10 backdrop-blur-md rounded-xl px-5 py-3 border border-white/20">
                <p className="text-2xl font-black text-white">
                  {totalPossible > 0 ? Math.round((totalScore / totalPossible) * 100) : 0}%
                </p>
                <p className="text-blue-100 text-xs">Avg Score</p>
              </div>
              
              <Link 
                href="/leaderboard"
                className="text-center bg-white/10 backdrop-blur-md rounded-xl px-5 py-3 flex flex-col items-center justify-center hover:bg-white/20 transition-colors border border-white/20"
                title="View Leaderboard"
              >
                <Trophy className="w-6 h-6 text-amber-300 mb-1" />
                <p className="text-blue-100 text-xs">Leaderboard</p>
              </Link>
            </div>
          </div>

          {/* Overall progress bar */}
          {totalPossible > 0 && (
            <div className="mt-4 space-y-1.5">
              <div className="flex justify-between text-xs text-white/40">
                <span>Overall Progress</span>
                <span>{totalScore} / {totalPossible} points</span>
              </div>
              <Progress value={(totalScore / totalPossible) * 100} className="h-1.5" />
            </div>
          )}

        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { icon: Target, label: "Total Score", value: `${totalScore}/${totalPossible}`, color: "text-blue-600", bg: "bg-blue-50" },
          { icon: Trophy, label: "Best Attempt", value: quizData.length > 0 ? `${Math.round((totalScore / Math.max(totalPossible, 1)) * 100)}%` : "—", color: "text-amber-500", bg: "bg-amber-50" },
          { icon: ClipboardList, label: "Quizzes", value: `${completedQuizzes}/${quizData.length}`, color: "text-purple-600", bg: "bg-purple-50" },
        ].map(({ icon: Icon, label, value, color, bg }) => (
          <Card key={label} className="p-4 border-border shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-lg ${bg} flex items-center justify-center ${color}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div>
                <p className="text-foreground font-bold text-lg leading-none">{value}</p>
                <p className="text-muted-foreground text-xs mt-0.5">{label}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Slide Decks */}
      <div>
        <h2 className="text-foreground font-bold text-lg mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-600" />
          Lecture Slides
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {daySlides.map(({ day, label, description, icon }) => (
            <Link key={day} href={`/slides/day${day}`}>
              <Card className="p-5 hover:border-blue-200 hover:shadow-md transition-all duration-200 cursor-pointer group border-border bg-card">
                <div className="flex items-center gap-4">
                  <div className="text-3xl grayscale group-hover:grayscale-0 transition-all">{icon}</div>
                  <div className="flex-1">
                    <h3 className="text-foreground font-semibold group-hover:text-blue-600 transition-colors">{label}</h3>
                    <p className="text-muted-foreground text-sm mt-0.5">{description}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground/30 group-hover:text-blue-600 transition-colors" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Quizzes */}
      <div>
        <h2 className="text-foreground font-bold text-lg mb-4 flex items-center gap-2">
          <ClipboardList className="w-5 h-5 text-blue-600" />
          Quizzes
        </h2>

        {loading ? (
          <div className="grid md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-28 rounded-2xl shimmer" />
            ))}
          </div>
        ) : quizData.length === 0 ? (
          <Card className="p-8 text-center border-dashed border-border shadow-none bg-transparent">
            <Zap className="w-8 h-8 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-muted-foreground">No quizzes available yet. Check back soon!</p>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {quizData.map(({ quiz, attempts }) => {
              const bestScore = attempts.reduce((b, a) => Math.max(b, a.score), 0);
              const attemptsLeft = 2 - attempts.length;
              const isCompleted = attempts.length >= 2;
              const canTake = quiz.active && !isCompleted;

              return (
                <Card key={quiz.id} className={`p-5 transition-all duration-200 ${canTake ? "hover:border-blue-500/30 hover:bg-white/[0.06]" : ""}`}>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <Badge className={`${quiz.type === "morning" ? "bg-amber-500 hover:bg-amber-600" : "bg-indigo-500 hover:bg-indigo-600"} text-white border-0 flex items-center gap-1`}>
                          Day {quiz.day} · {quiz.type === "morning" ? "Morning" : "Afternoon"}
                        </Badge>
                        {quiz.active ? (
                          <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white border-0">Open</Badge>
                        ) : (
                          <Badge variant="secondary" className="bg-slate-200 hover:bg-slate-300 text-slate-700">Closed</Badge>
                        )}
                      </div>
                      <h3 className="text-foreground font-semibold text-sm">{quiz.title}</h3>
                    </div>
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-1" />
                    ) : !quiz.active ? (
                      <Lock className="w-5 h-5 text-muted-foreground/30 flex-shrink-0 mt-1" />
                    ) : null}
                  </div>



                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {Math.floor(quiz.timeLimit / 60)} min limit
                    </span>
                    <span>{quiz.questions.length} questions</span>
                    <span>
                      {attempts.length > 0
                        ? `${attempts.length}/2 attempt${attempts.length > 1 ? "s" : ""}`
                        : "No attempts"}
                    </span>
                  </div>

                  {attempts.length > 0 && (
                    <div className="mb-3 space-y-1">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Best Score</span>
                        <span className="text-blue-600 font-semibold">
                          {bestScore} / {quiz.questions.length} (
                          {Math.round((bestScore / quiz.questions.length) * 100)}%)
                        </span>
                      </div>
                      <Progress value={(bestScore / quiz.questions.length) * 100} className="h-1 bg-slate-100" />
                    </div>
                  )}

                  {canTake ? (
                    <Link href={`/quiz/${quiz.id}`}>
                      <Button variant="default" size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                        {attempts.length === 0 ? "Start Quiz" : "2nd Attempt"}{" "}
                        <ArrowRight className="w-3 h-3" />
                      </Button>
                    </Link>
                  ) : isCompleted ? (
                    <div className="text-center text-xs text-muted-foreground py-1">
                      All attempts used · Best: {bestScore}/{quiz.questions.length}
                    </div>
                  ) : (
                    <div className="text-center text-xs text-muted-foreground py-1 flex items-center justify-center gap-1">
                      <Lock className="w-3 h-3" /> Quiz is currently closed
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
