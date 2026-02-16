# Social Media Analytics Course System

Full-stack course platform: Next.js 14 + Firebase + Tailwind CSS.

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Setup Checklist

1. **Admin email** — Edit `.env.local`, set `NEXT_PUBLIC_ADMIN_EMAILS=your@email.com`
2. **Firebase Auth** — Enable Email/Password in Firebase Console
3. **Firestore** — Create database (test mode), apply security rules below
4. **Seed Quizzes** — Login as admin → click "Seed Quiz Data" button
5. **Add Slides** — Copy images to `public/slides/day1/1.png`, `2.png`... etc

## Firestore Rules

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## Slides Setup

```
public/slides/day1/1.png, 2.png ... 65.png
public/slides/day2/1.png, 2.png ... 48.png
```

Update slide counts in: `app/(student)/slides/[day]/page.tsx`
```ts
const SLIDES_PER_DAY = { day1: 65, day2: 48 };
```
