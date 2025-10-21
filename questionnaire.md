questionnaire.md

this is psuedocode

i'm asking about this
Employee said:

Ahh I see — you’re asking specifically about the evolution into adaptive mode and whether that will require major rewrites. Let’s go step by step:
1. Batch Mode (starting point)

    Server returns a list of all questions:

    {
      "questions": [
        { "id": 1, "text": "How do you handle stress?", "type": "multiple-choice" },
        { "id": 2, "text": "Do you prefer working alone or in a team?", "type": "scale" }
      ]
    }

    Frontend: just loops through and renders them.

    Submission: sends answers at once or in sections.

2. Adaptive Mode (evolved)

    Instead of returning all questions upfront, the API gives the next question(s) depending on answers.

    Example flow:

        GET /questions?sessionId=abc → returns first question.

        User answers → POST /answers.

        Server uses logic/AI → returns next question.

Will you need to change many things?

Not if you plan well now ✅

    Frontend:

        If you design it as a “question renderer” (render whatever question object it gets), it doesn’t care where the questions come from (batch or one-by-one).

        Only change: instead of looping through a fixed array, you’ll fetch new questions on demand.

    Backend:

        This is where the main change happens.

        Batch mode = return static JSON list.

        Adaptive mode = add logic/AI to choose the next question.

    Data model:

        Keep questions in the DB now (not hardcoded).

        Store user sessions & answers.

        Later, you just add a “decision engine” that selects the next question based on state.

⚡ Smart move now

If you:

    Serve questions from the backend (even in batch mode).

    Render questions dynamically in the frontend.

👉 Then evolving into adaptive mode will be mostly backend-only work. No heavy rewrites in the frontend.

Would you like me to sketch a minimal frontend flow (batch) and then show the tiny tweaks needed to evolve into adaptive so you can see how small the change really is?
You said:
yes, 
Employee said:

Perfect 👌 let’s do this step by step. I’ll keep it minimal but production-minded, so you see clearly how the flow changes from batch → adaptive.
1. Batch Mode (starting point)
Backend API

// GET /questions
{
  "questions": [
    { "id": 1, "text": "How do you handle stress?", "type": "multiple-choice", "options": ["Calm", "Anxious", "Avoidant"] },
    { "id": 2, "text": "Do you prefer working alone or in a team?", "type": "scale", "scaleMin": 1, "scaleMax": 5 }
  ]
}

// POST /answers
// frontend sends all answers at once
{
  "userId": "123",
  "answers": [
    { "questionId": 1, "answer": "Calm" },
    { "questionId": 2, "answer": 4 }
  ]
}

Frontend Flow

// pseudo-React flow
const [questions, setQuestions] = useState([]);

useEffect(() => {
  fetch("/questions")
    .then(res => res.json())
    .then(data => setQuestions(data.questions));
}, []);

return (
  <>
    {questions.map(q => <Question key={q.id} {...q} />)}
    <button onClick={submitAllAnswers}>Submit</button>
  </>
);

    ✅ All questions loaded at once.

    ✅ Submit all answers when user clicks “Send”.

    ❌ Not adaptive (everyone gets the same set).

2. Adaptive Mode (evolved)
Backend API

// GET /questions?sessionId=abc
// server decides what to send next
{
  "question": {
    "id": 3,
    "text": "When under pressure, do you seek support?",
    "type": "multiple-choice",
    "options": ["Yes", "No", "Sometimes"]
  }
}

// POST /answers
// frontend sends answer as user progresses
{
  "sessionId": "abc",
  "questionId": 3,
  "answer": "Yes"
}

Frontend Flow

const [currentQuestion, setCurrentQuestion] = useState(null);
const [sessionId, setSessionId] = useState("abc"); // from backend on start

useEffect(() => {
  fetch(`/questions?sessionId=${sessionId}`)
    .then(res => res.json())
    .then(data => setCurrentQuestion(data.question));
}, []);

function submitAnswer(answer) {
  fetch("/answers", {
    method: "POST",
    body: JSON.stringify({ sessionId, questionId: currentQuestion.id, answer })
  }).then(() => {
    // fetch the *next* question
    return fetch(`/questions?sessionId=${sessionId}`);
  }).then(res => res.json())
    .then(data => setCurrentQuestion(data.question));
}

return (
  <Question {...currentQuestion} onAnswer={submitAnswer} />
);

    ✅ Frontend still just renders what it’s given.

    ✅ Server controls sequence (can branch, skip, adapt).

    🔁 Same Question component works in both modes.

    ⚡ The only change is when/how questions are fetched.

3. Big Picture

    Batch = fetch all once, answers sent at end.

    Adaptive = fetch one (or few) at a time, answers sent continuously.

    The frontend rendering logic barely changes — just how data flows in/out.

    The backend evolves from static list → logic/AI deciding “next question”.

👉 With this design, evolving won’t be difficult. You won’t rewrite the frontend, just tweak fetch/submit logic.

Do you want me to also show you a database schema sketch (for questions, sessions, answers) that works for both batch and adaptive from day one?
You said:
yes, let me set everything now
Employee said:

Nice ⚡ — let’s set it up cleanly from day one so batch + adaptive both work. I’ll sketch a minimal DB schema, API endpoints, and how frontend fits in.
1. Database Schema (PostgreSQL + Prisma)

model Question {
  id        Int      @id @default(autoincrement())
  text      String
  type      String   // "multiple-choice", "scale", "text", etc.
  options   Json?    // e.g. ["Yes", "No", "Sometimes"] for multiple-choice
  order     Int?     // useful for batch mode (static order)
  createdAt DateTime @default(now())
}

model Session {
  id        String   @id @default(cuid())  // sessionId
  userId    String?  // optional, link to registered user
  status    String   @default("in-progress") // or "completed"
  createdAt DateTime @default(now())
}

model Answer {
  id         Int      @id @default(autoincrement())
  sessionId  String
  questionId Int
  answer     Json
  createdAt  DateTime @default(now())

  session    Session  @relation(fields: [sessionId], references: [id])
  question   Question @relation(fields: [questionId], references: [id])
}

✅ Works for both batch and adaptive.
✅ options and answer are Json → flexible for multiple types.
✅ Session lets you adaptively track where a user is.
2. API Endpoints
Batch Mode

    GET /questions → return all questions sorted by order.

    POST /answers → save all answers at once.

Adaptive Mode

    POST /sessions → create new session, return sessionId.

    GET /questions?sessionId=abc → return next question for that session.

        In batch, this can just walk through order.

        In adaptive, you plug in logic/AI to pick next.

    POST /answers → save single answer for session.

3. Frontend Flow

    Batch:

const { questions } = await fetch("/questions").then(r => r.json());
// render in order, collect answers, send at end

Adaptive:

    const { sessionId } = await fetch("/sessions", { method: "POST" }).then(r => r.json());
    const { question } = await fetch(`/questions?sessionId=${sessionId}`).then(r => r.json());
    // render question, submit each answer, loop

4. Migration Path

    Start with GET /questions (batch).

    Add Session table + POST /sessions.

    Switch frontend to request questions per session.

    Add adaptive logic (branching, AI).

No big rewrites — just incremental backend improvements ✅

👉 With this setup, you can seed questions in DB now, build the batch flow, and later turn on adaptive without touching the schema or frontend rendering.

Do you want me to go ahead and write the Prisma schema + Next.js API route stubs for you, so you can literally drop them into SELVE today?
You said:
yes
Employee said:

Perfect ⚡ let’s scaffold this so you can drop it into your SELVE Next.js project right away.

I’ll give you:

    Prisma schema (DB tables).

    Next.js API routes (batch + adaptive).

    Frontend integration stub (React hook).

1. Prisma Schema (prisma/schema.prisma)

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Question {
  id        Int      @id @default(autoincrement())
  text      String
  type      String   // "multiple-choice", "scale", "text", etc.
  options   Json?    // e.g. ["Yes", "No", "Sometimes"]
  order     Int?     // used for static/batch mode
  createdAt DateTime @default(now())

  answers   Answer[]
}

model Session {
  id        String   @id @default(cuid())
  userId    String?  // optional link to User
  status    String   @default("in-progress") // or "completed"
  createdAt DateTime @default(now())

  answers   Answer[]
}

model Answer {
  id         Int      @id @default(autoincrement())
  sessionId  String
  questionId Int
  answer     Json
  createdAt  DateTime @default(now())

  session    Session  @relation(fields: [sessionId], references: [id])
  question   Question @relation(fields: [questionId], references: [id])
}

Run after saving:

npx prisma migrate dev --name init_questionnaire

2. Next.js API Routes (App Router)
app/api/questions/route.ts → Batch Mode

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const questions = await prisma.question.findMany({
    orderBy: { order: "asc" },
  });
  return NextResponse.json({ questions });
}

app/api/sessions/route.ts → Create Session

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST() {
  const session = await prisma.session.create({
    data: {},
  });
  return NextResponse.json({ sessionId: session.id });
}

app/api/questions/[sessionId]/route.ts → Adaptive Mode

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface Params {
  params: { sessionId: string }
}

export async function GET(req: Request, { params }: Params) {
  const { sessionId } = params;

  // count answers so far
  const answeredCount = await prisma.answer.count({
    where: { sessionId },
  });

  // fetch the next question in order
  const nextQuestion = await prisma.question.findFirst({
    where: { order: answeredCount + 1 },
    orderBy: { order: "asc" },
  });

  if (!nextQuestion) {
    await prisma.session.update({
      where: { id: sessionId },
      data: { status: "completed" },
    });
    return NextResponse.json({ done: true });
  }

  return NextResponse.json({ question: nextQuestion });
}

app/api/answers/route.ts

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { sessionId, questionId, answer } = await req.json();

  const saved = await prisma.answer.create({
    data: {
      sessionId,
      questionId,
      answer,
    },
  });

  return NextResponse.json({ success: true, saved });
}

3. Frontend Hook Example

import { useState, useEffect } from "react";

export function useAdaptiveQuestionnaire() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);

  // create session
  useEffect(() => {
    fetch("/api/sessions", { method: "POST" })
      .then(r => r.json())
      .then(data => setSessionId(data.sessionId));
  }, []);

  // load first question when session is ready
  useEffect(() => {
    if (sessionId) {
      fetch(`/api/questions/${sessionId}`)
        .then(r => r.json())
        .then(data => setCurrentQuestion(data.question));
    }
  }, [sessionId]);

  async function submitAnswer(answer: any) {
    if (!sessionId || !currentQuestion) return;

    await fetch("/api/answers", {
      method: "POST",
      body: JSON.stringify({
        sessionId,
        questionId: currentQuestion.id,
        answer,
      }),
      headers: { "Content-Type": "application/json" },
    });

    const next = await fetch(`/api/questions/${sessionId}`).then(r => r.json());
    setCurrentQuestion(next.question || null);
  }

  return { currentQuestion, submitAnswer };
}

Usage in a page:

const { currentQuestion, submitAnswer } = useAdaptiveQuestionnaire();

if (!currentQuestion) return <p>Loading...</p>;

return (
  <div>
    <p>{currentQuestion.text}</p>
    {currentQuestion.options?.map((opt: string) => (
      <button key={opt} onClick={() => submitAnswer(opt)}>
        {opt}
      </button>
    ))}
  </div>
);

✅ With this, you can start in batch mode today (just use /api/questions).
✅ Switch to adaptive later by using /api/sessions + /api/questions/[sessionId].
✅ No schema changes required.
