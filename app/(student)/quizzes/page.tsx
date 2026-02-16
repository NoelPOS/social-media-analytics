"use client";

import { redirect } from "next/navigation";

// Redirect to dashboard where quizzes are listed
export default function QuizzesPage() {
  redirect("/dashboard");
}
