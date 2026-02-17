"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  getQuiz,
  getUserAttempts,
  submitAttempt,
  getQuizSession,
  startQuizSession,
  updateSessionAnswers,
  clearQuizSession,
  Quiz,
  Attempt,
} from "@/lib/firestore";
import { Timestamp } from "firebase/firestore";
import { formatTime } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Clock,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Trophy,
  ArrowLeft,
  Send,
  Lock,
  Sun,
  Moon,
  BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";

type QuizState = "loading" | "blocked" | "intro" | "active" | "submitted";

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const quizId = params.quizId as string;

  const [state, setState] = useState<QuizState>("loading");
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [pastAttempts, setPastAttempts] = useState<Attempt[]>([]);
  const [blockReason, setBlockReason] = useState("");

  // Active quiz state
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Result state
  const [result, setResult] = useState<{ score: number; total: number; answers: Record<number, number> } | null>(null);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Load quiz + check eligibility + resume any in-progress session
  useEffect(() => {
    if (!user) return;
    (async () => {
      const [q, attempts, session] = await Promise.all([
        getQuiz(quizId),
        getUserAttempts(user.uid, quizId),
        getQuizSession(user.uid, quizId),
      ]);

      if (!q) {
        setBlockReason("Quiz not found.");
        setState("blocked");
        return;
      }
      setQuiz(q);
      setPastAttempts(attempts);

      if (!q.active) {
        setBlockReason("This quiz is currently closed by the instructor.");
        setState("blocked");
        return;
      }
      if (attempts.length >= 2) {
        setBlockReason("You have used all 2 allowed attempts for this quiz.");
        setState("blocked");
        return;
      }

      // ── Resume or auto-submit an in-progress session ──────────────────────
      if (session) {
        const elapsed = Math.floor((Date.now() - session.startedAt.toMillis()) / 1000);
        const remaining = q.timeLimit - elapsed;

        // Restore answers (Firestore keys are strings; cast back to numbers)
        const restoredAnswers: Record<number, number> = {};
        Object.entries(session.answers).forEach(([k, v]) => {
          restoredAnswers[Number(k)] = v;
        });

        if (remaining <= 0) {
          // Time expired while the student was away — auto-submit immediately
          const score = q.questions.reduce(
            (acc, question, i) =>
              session.answers[String(i)] === question.correctIndex ? acc + 1 : acc,
            0
          );
          await clearQuizSession(user.uid, quizId);
          await submitAttempt({
            userId: user.uid,
            quizId,
            score,
            answers: session.answers,
            timestamp: Timestamp.now(),
            attemptNumber: session.attemptNumber,
            timeTaken: q.timeLimit,
          });
          setResult({ score, total: q.questions.length, answers: restoredAnswers });
          setState("submitted");
        } else {
          // Resume the quiz — timer continues from where it left off
          setCurrentQ(0);
          setAnswers(restoredAnswers);
          setTimeLeft(remaining);
          setStartTime(session.startedAt.toMillis());
          setState("active");
          timerRef.current = setInterval(() => {
            setTimeLeft((t) => {
              if (t <= 1) { stopTimer(); return 0; }
              return t - 1;
            });
          }, 1000);
        }
        return;
      }

      setState("intro");
    })();
  }, [user, quizId, stopTimer]);

  const startQuiz = () => {
    if (!quiz || !user) return;
    const attemptNum = (pastAttempts.length + 1) as 1 | 2;
    const now = Timestamp.now();

    // Persist session to Firestore — this records the server-side start time
    // so refreshing cannot reset the clock.
    startQuizSession({
      userId: user.uid,
      quizId,
      startedAt: now,
      attemptNumber: attemptNum,
      answers: {},
    }).catch(console.error);

    setCurrentQ(0);
    setAnswers({});
    setTimeLeft(quiz.timeLimit);
    setStartTime(now.toMillis());
    setState("active");

    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) { stopTimer(); return 0; }
        return t - 1;
      });
    }, 1000);
  };

  // Auto-submit when timer hits 0
  useEffect(() => {
    if (state === "active" && timeLeft === 0) {
      handleSubmit(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, state]);

  const handleSubmit = useCallback(
    async (autoSubmit = false) => {
      if (!quiz || !user || state !== "active") return;
      stopTimer();

      // Remove the in-progress session so a refresh no longer resumes the quiz
      await clearQuizSession(user.uid, quizId);

      const score = quiz.questions.reduce(
        (acc, q, i) => (answers[i] === q.correctIndex ? acc + 1 : acc),
        0
      );
      const timeTaken = Math.floor((Date.now() - startTime) / 1000);
      const attemptNumber = (pastAttempts.length + 1) as 1 | 2;

      const recordedAnswers: Record<string, number> = {};
      Object.entries(answers).forEach(([k, v]) => {
        recordedAnswers[k] = v;
      });

      await submitAttempt({
        userId: user.uid,
        quizId,
        score,
        answers: recordedAnswers,
        timestamp: Timestamp.now(),
        attemptNumber,
        timeTaken,
      });

      setResult({ score, total: quiz.questions.length, answers });
      setState("submitted");
    },
    [quiz, user, state, answers, pastAttempts, startTime, quizId, stopTimer]
  );

  // Cleanup timer
  useEffect(() => () => stopTimer(), [stopTimer]);

  // Warn before leaving during an active quiz — the timer keeps running server-side
  useEffect(() => {
    if (state !== "active") return;
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = ""; // Required by Chrome to show the dialog
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [state]);

  const selectAnswer = (qIdx: number, optIdx: number) => {
    const updated = { ...answers, [qIdx]: optIdx };
    setAnswers(updated);
    // Persist answers so they survive a refresh (fire-and-forget)
    if (user) {
      updateSessionAnswers(user.uid, quizId, updated as Record<string, number>).catch(console.error);
    }
  };

  const answeredCount = Object.keys(answers).length;
  const progress = quiz ? (answeredCount / quiz.questions.length) * 100 : 0;
  const timePercent = quiz ? (timeLeft / quiz.timeLimit) * 100 : 100;
  const isTimeWarning = timePercent < 25;
  const isTimeCritical = timePercent < 10;

  // ─── States ──────────────────────────────────────────────────────────────────

  if (state === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (state === "blocked") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="max-w-sm w-full space-y-4 text-center">
          <div className="w-16 h-16 rounded-2xl bg-red-100 border border-red-200 flex items-center justify-center mx-auto">
            <Lock className="w-7 h-7 text-red-600" />
          </div>
          <h2 className="text-gray-900 font-bold text-xl">Access Restricted</h2>
          <p className="text-gray-500 text-sm leading-relaxed">{blockReason}</p>

          {/* Show past attempts if they exist */}
          {pastAttempts.length > 0 && quiz && (
            <div className="bg-white rounded-2xl p-4 space-y-2 text-left shadow-sm border border-gray-200">
              <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-3">
                Your Attempts
              </p>
              {pastAttempts.map((a) => (
                <div key={a.id} className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Attempt {a.attemptNumber}</span>
                  <span className="text-blue-600 font-semibold">
                    {a.score} / {quiz.questions.length} (
                    {Math.round((a.score / quiz.questions.length) * 100)}%)
                  </span>
                </div>
              ))}
            </div>
          )}

          <Button variant="outline" onClick={() => router.push("/dashboard")} className="w-full border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  if (state === "intro" && quiz) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="max-w-lg w-full space-y-6 animate-fade-in">
          {/* Back */}
          <button
            onClick={() => router.push("/dashboard")}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Dashboard
          </button>

          {/* Card */}
          <div className="bg-white rounded-2xl p-8 space-y-6 border border-gray-200 shadow-xl">
            <div className="flex items-center gap-3">
              <Badge variant={quiz.type === "morning" ? "info" : "warning"} className="flex items-center gap-1">
                {quiz.type === "morning" ? <Sun className="w-3 h-3" /> : <Moon className="w-3 h-3" />}
                Day {quiz.day} · {quiz.type === "morning" ? "Morning" : "Afternoon"}
              </Badge>
              <Badge variant="success">Open</Badge>
            </div>

            <div>
              <h1 className="text-2xl font-black text-gray-900">{quiz.title}</h1>
              <p className="text-gray-500 mt-1 text-sm">
                Attempt {pastAttempts.length + 1} of 2
              </p>
            </div>

            {/* Rules */}
            <div className="space-y-3">
              {[
                {
                  icon: Clock,
                  label: "Time Limit",
                  value: `${Math.floor(quiz.timeLimit / 60)} minutes`,
                  color: "text-blue-600",
                  bg: "bg-blue-50",
                },
                {
                  icon: CheckCircle2,
                  label: "Questions",
                  value: `${quiz.questions.length} multiple choice`,
                  color: "text-emerald-600",
                  bg: "bg-emerald-50",
                },
                {
                  icon: AlertTriangle,
                  label: "Attempts",
                  value: `${pastAttempts.length + 1} / 2 — ${2 - pastAttempts.length - 1} remaining after this`,
                  color: "text-amber-600",
                  bg: "bg-amber-50",
                },
                {
                  icon: AlertTriangle,
                  label: "No Refresh Advantage",
                  value: "Refreshing will not reset your timer. Your session is tracked server-side.",
                  color: "text-red-600",
                  bg: "bg-red-50",
                },
              ].map(({ icon: Icon, label, value, color, bg }) => (
                <div key={label} className={`flex items-center gap-3 rounded-xl p-3 ${bg} border border-transparent`}>
                  <Icon className={`w-5 h-5 ${color} flex-shrink-0`} />
                  <div>
                    <p className="text-gray-500 text-xs">{label}</p>
                    <p className="text-gray-900 font-medium text-sm">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Previous attempt score */}
            {pastAttempts.length > 0 && (
              <div className="rounded-xl bg-blue-50 border border-blue-100 p-3 text-sm">
                <p className="text-blue-700">
                  Previous score:{" "}
                  <span className="font-bold">
                    {pastAttempts[0].score} / {quiz.questions.length}
                  </span>
                  {" "}({Math.round((pastAttempts[0].score / quiz.questions.length) * 100)}%)
                </p>
              </div>
            )}

            <div className="pt-2 space-y-2">
              <p className="text-gray-400 text-xs text-center">
                The timer starts when you click "Begin Quiz". Auto-submits when time runs out.
              </p>
              <Button onClick={startQuiz} className="w-full" size="lg">
                Begin Quiz <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (state === "active" && quiz) {
    const question = quiz.questions[currentQ];

    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Quiz header */}
        <div
          className={cn(
            "sticky top-0 z-20 px-4 md:px-6 py-3 border-b backdrop-blur-xl transition-colors",
            isTimeCritical
              ? "bg-red-50 border-red-200"
              : isTimeWarning
              ? "bg-amber-50 border-amber-200"
              : "bg-white/80 border-gray-200"
          )}
        >
          <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <Badge variant="secondary" className="flex-shrink-0">
                Q {currentQ + 1}/{quiz.questions.length}
              </Badge>
              <p className="text-gray-600 text-sm truncate hidden sm:block">{quiz.title}</p>
            </div>

            {/* Timer */}
            <div
              className={cn(
                "flex items-center gap-2 rounded-xl px-3 py-1.5 font-mono font-bold text-sm flex-shrink-0",
                isTimeCritical
                  ? "bg-red-100 text-red-600 animate-pulse"
                  : isTimeWarning
                  ? "bg-amber-100 text-amber-700"
                  : "bg-gray-100 text-gray-700"
              )}
            >
              <Clock className="w-4 h-4" />
              {formatTime(timeLeft)}
            </div>
          </div>

          {/* Time progress bar */}
          <div className="max-w-3xl mx-auto mt-2">
            <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
              <div
                className={cn(
                  "h-full rounded-full transition-all duration-1000",
                  isTimeCritical
                    ? "bg-red-500"
                    : isTimeWarning
                    ? "bg-amber-500"
                    : "bg-blue-600"
                )}
                style={{ width: `${timePercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Question area */}
        <div className="flex-1 max-w-3xl mx-auto w-full px-4 md:px-6 py-8 space-y-6">
          {/* Question progress dots */}
          <div className="flex gap-1.5 flex-wrap">
            {quiz.questions.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentQ(i)}
                className={cn(
                  "w-7 h-7 rounded-lg text-xs font-semibold transition-all duration-200",
                  i === currentQ
                    ? "bg-blue-500 text-white scale-110"
                    : answers[i] !== undefined
                    ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                    : "bg-white border border-gray-200 text-gray-400 hover:bg-gray-50 hover:text-gray-600"
                )}
              >
                {i + 1}
              </button>
            ))}
          </div>

          {/* Question card */}
          <Card className="p-6 md:p-8 slide-enter bg-white border-gray-200 shadow-sm">
            <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3">
              Question {currentQ + 1}
            </p>
            <h2 className="text-gray-900 text-lg md:text-xl font-semibold leading-relaxed mb-6">
              {question.text}
            </h2>

            {/* Options */}
            <div className="space-y-3">
              {question.options.map((option, optIdx) => {
                const selected = answers[currentQ] === optIdx;
                return (
                  <button
                    key={optIdx}
                    onClick={() => selectAnswer(currentQ, optIdx)}
                    className={cn(
                      "quiz-option w-full text-left rounded-xl border p-4 transition-all duration-200",
                      "flex items-center gap-4 group",
                      selected
                        ? "bg-blue-50 border-blue-500 text-blue-900 shadow-sm"
                        : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300"
                    )}
                  >
                    <div
                      className={cn(
                        "w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 transition-all",
                        selected
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
                      )}
                    >
                      {String.fromCharCode(65 + optIdx)}
                    </div>
                    <span className="text-sm leading-relaxed">{option}</span>
                    {selected && (
                      <CheckCircle2 className="w-4 h-4 text-blue-500 ml-auto flex-shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-between gap-3">
            <Button
              variant="outline"
              onClick={() => setCurrentQ((q) => Math.max(0, q - 1))}
              disabled={currentQ === 0}
              size="sm"
              className="border-gray-200 text-gray-700 hover:bg-gray-50"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </Button>

            <span className="text-gray-400 text-xs">
              {answeredCount}/{quiz.questions.length} answered
            </span>

            {currentQ < quiz.questions.length - 1 ? (
              <Button
                variant="default"
                onClick={() => setCurrentQ((q) => Math.min(quiz.questions.length - 1, q + 1))}
                size="sm"
              >
                Next <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                variant="success"
                onClick={() => handleSubmit(false)}
                size="sm"
                className="bg-emerald-600 text-white hover:bg-emerald-700"
              >
                Submit Quiz <Send className="w-4 h-4" />
              </Button>
            )}
          </div>

          {/* Submit all button */}
          {answeredCount === quiz.questions.length && currentQ < quiz.questions.length - 1 && (
            <Button
              variant="success"
              onClick={() => handleSubmit(false)}
              className="w-full bg-emerald-600 text-white hover:bg-emerald-700"
            >
              <Send className="w-4 h-4" /> Submit All Answers
            </Button>
          )}
        </div>
      </div>
    );
  }

  if (state === "submitted" && result && quiz) {
    const percentage = Math.round((result.score / result.total) * 100);
    const isPassing = percentage >= 60;

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="max-w-2xl w-full space-y-6 animate-fade-in">
          {/* Score card */}
          <div
            className={cn(
              "rounded-2xl p-8 text-center border shadow-sm",
              isPassing
                ? "bg-emerald-50 border-emerald-200"
                : "bg-red-50 border-red-200"
            )}
          >
            <div className={cn(
              "w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4",
              isPassing ? "bg-emerald-100" : "bg-red-100"
            )}>
              {isPassing ? <Trophy className="w-10 h-10 text-emerald-600" /> : <BookOpen className="w-10 h-10 text-red-600" />}
            </div>

            <h1 className="text-4xl font-black text-gray-900 mb-1">{percentage}%</h1>
            <p className={cn("text-lg font-bold mb-1", isPassing ? "text-emerald-700" : "text-red-700")}>
              {isPassing ? "Excellent Work!" : "Keep Practicing!"}
            </p>
            <p className="text-gray-500 text-sm">
              {result.score} out of {result.total} correct
            </p>

            {/* Score bar */}
            <div className="mt-6 space-y-2">
              <Progress
                value={percentage}
                indicatorClassName={isPassing ? "from-emerald-500 to-teal-500" : "from-red-500 to-rose-500"}
                className={cn("h-3", isPassing ? "bg-emerald-100" : "bg-red-100")}
              />
            </div>
          </div>

          {/* Answer review */}
          <div className="space-y-3">
            <h2 className="text-gray-900 font-bold text-lg flex items-center gap-2">
              <Trophy className="w-5 h-5 text-blue-600" /> Answer Review
            </h2>
            {quiz.questions.map((q, i) => {
              const userAns = result.answers[i];
              const correct = q.correctIndex;
              const isCorrect = userAns === correct;

              return (
                <Card key={i} className={cn(
                  "p-4 border",
                  isCorrect ? "border-emerald-200 bg-emerald-50" : "border-red-200 bg-red-50"
                )}>
                  <div className="flex items-start gap-3 mb-2">
                    {isCorrect
                      ? <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      : <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    }
                    <p className="text-gray-900 text-sm font-medium">{q.text}</p>
                  </div>

                  <div className="ml-8 space-y-1 text-xs">
                    {userAns !== undefined && userAns !== correct && (
                      <p className="text-red-600">
                        Your answer: {q.options[userAns]}
                      </p>
                    )}
                    <p className="text-emerald-700 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Correct: {q.options[correct]}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>

          <Button
            onClick={() => router.push("/dashboard")}
            className="w-full border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900 bg-white"
            variant="outline"
            size="lg"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return null;
}
