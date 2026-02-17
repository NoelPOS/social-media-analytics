import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  addDoc,
  query,
  where,
  orderBy,
  Timestamp,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./firebase";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface UserProfile {
  uid: string;
  email: string;
  role: "admin" | "student";
  studentId: string;
  name: string;
  favoriteSocialMedia: string;
  createdAt?: Timestamp;
}

export interface Question {
  text: string;
  options: string[];
  correctIndex: number;
}

export interface Quiz {
  id: string;
  day: number;
  type: "morning" | "afternoon";
  active: boolean;
  timeLimit: number; // seconds
  questions: Question[];
  title: string;
}

export interface Attempt {
  id?: string;
  userId: string;
  quizId: string;
  score: number;
  answers: Record<string, number>;
  timestamp: Timestamp;
  attemptNumber: 1 | 2;
  timeTaken?: number;
}

// ─── User Operations ──────────────────────────────────────────────────────────

export async function createUserProfile(profile: UserProfile) {
  await setDoc(doc(db, "users", profile.uid), {
    ...profile,
    createdAt: Timestamp.now(),
  });
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? (snap.data() as UserProfile) : null;
}

export async function getAllStudents(): Promise<UserProfile[]> {
  const q = query(collection(db, "users"), where("role", "==", "student"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => d.data() as UserProfile);
}

// ─── Quiz Operations ──────────────────────────────────────────────────────────

export async function getAllQuizzes(): Promise<Quiz[]> {
  const snap = await getDocs(collection(db, "quizzes"));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Quiz));
}

export async function getQuiz(quizId: string): Promise<Quiz | null> {
  const snap = await getDoc(doc(db, "quizzes", quizId));
  return snap.exists() ? ({ id: snap.id, ...snap.data() } as Quiz) : null;
}

export async function updateQuizStatus(quizId: string, active: boolean) {
  await updateDoc(doc(db, "quizzes", quizId), { active });
}

export async function seedQuizzes(quizzes: Omit<Quiz, "id">[]) {
  for (const quiz of quizzes) {
    await addDoc(collection(db, "quizzes"), quiz);
  }
}

// ─── Attempt Operations ───────────────────────────────────────────────────────

export async function getUserAttempts(userId: string, quizId: string): Promise<Attempt[]> {
  const q = query(
    collection(db, "attempts"),
    where("userId", "==", userId),
    where("quizId", "==", quizId),
    orderBy("attemptNumber", "asc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Attempt));
}

export async function submitAttempt(attempt: Omit<Attempt, "id">): Promise<string> {
  const docRef = await addDoc(collection(db, "attempts"), {
    ...attempt,
    timestamp: Timestamp.now(),
  });
  return docRef.id;
}

export async function getAllAttempts(): Promise<Attempt[]> {
  const snap = await getDocs(collection(db, "attempts"));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Attempt));
}

export async function resetUserAttempts(userId: string, quizId: string) {
  const q = query(
    collection(db, "attempts"),
    where("userId", "==", userId),
    where("quizId", "==", quizId)
  );
  const snap = await getDocs(q);
  for (const d of snap.docs) {
    await deleteDoc(doc(db, "attempts", d.id));
  }
}

export async function deleteAllQuizzes() {
  const snap = await getDocs(collection(db, "quizzes"));
  for (const d of snap.docs) {
    await deleteDoc(doc(db, "quizzes", d.id));
  }
}

export async function deleteAllAttempts() {
  const snap = await getDocs(collection(db, "attempts"));
  for (const d of snap.docs) {
    await deleteDoc(doc(db, "attempts", d.id));
  }
}

// ─── Attendance Operations ────────────────────────────────────────────────────

export interface Attendance {
  userId: string;
  date: string; // YYYY-MM-DD
  session: "morning" | "afternoon";
  present: boolean;
}

export async function setAttendance(userId: string, date: string, session: "morning" | "afternoon", present: boolean) {
  const compositeId = `${userId}_${date}_${session}`;
  const docRef = doc(db, "attendance", compositeId);

  if (present) {
    await setDoc(docRef, {
      userId,
      date,
      session,
      present: true,
      timestamp: Timestamp.now(),
    });
  } else {
    await deleteDoc(docRef);
  }
}

export async function getAttendance(userId: string): Promise<Attendance[]> {
  const q = query(collection(db, "attendance"), where("userId", "==", userId));
  const snap = await getDocs(q);
  return snap.docs.map((d) => d.data() as Attendance);
}

export async function getAllAttendance(): Promise<Attendance[]> {
    const snap = await getDocs(collection(db, "attendance"));
    return snap.docs.map((d) => d.data() as Attendance);
}

// ─── Quiz Session (anti-cheat: tracks in-progress attempts) ──────────────────

export interface QuizSession {
  id?: string;
  userId: string;
  quizId: string;
  startedAt: Timestamp;
  attemptNumber: 1 | 2;
  answers: Record<string, number>;
}

/** Called when student clicks "Begin Quiz". Overwrites any stale session. */
export async function startQuizSession(session: Omit<QuizSession, "id">): Promise<void> {
  const id = `${session.userId}_${session.quizId}`;
  await setDoc(doc(db, "quizSessions", id), session);
}

/** Fetch an in-progress session (null if none). */
export async function getQuizSession(userId: string, quizId: string): Promise<QuizSession | null> {
  const snap = await getDoc(doc(db, "quizSessions", `${userId}_${quizId}`));
  return snap.exists() ? ({ id: snap.id, ...snap.data() } as QuizSession) : null;
}

/** Persist current answers so they survive a page refresh. */
export async function updateSessionAnswers(
  userId: string,
  quizId: string,
  answers: Record<string, number>
): Promise<void> {
  await updateDoc(doc(db, "quizSessions", `${userId}_${quizId}`), { answers });
}

/** Delete the session once the attempt has been submitted. */
export async function clearQuizSession(userId: string, quizId: string): Promise<void> {
  await deleteDoc(doc(db, "quizSessions", `${userId}_${quizId}`));
}

// ─── Student Operations ───────────────────────────────────────────────────────

// ─── Student Operations ───────────────────────────────────────────────────────

export async function deleteStudent(userId: string) {
  // 1. Delete user profile
  await deleteDoc(doc(db, "users", userId));

  // 2. Delete all attempts
  const attemptsQ = query(collection(db, "attempts"), where("userId", "==", userId));
  const attemptsSnap = await getDocs(attemptsQ);
  for (const d of attemptsSnap.docs) {
    await deleteDoc(doc(db, "attempts", d.id));
  }

  // 3. Delete all attendance records
  const attendanceQ = query(collection(db, "attendance"), where("userId", "==", userId));
  const attendanceSnap = await getDocs(attendanceQ);
  for (const d of attendanceSnap.docs) {
    await deleteDoc(doc(db, "attendance", d.id));
  }
}
