"use client";

import {
  ArrowLeft,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  GraduationCap,
  Lightbulb,
  Pencil,
  Printer,
  School,
  Target,
  User,
  Users,
  BookMarked,
  FileText,
  ListChecks,
} from "lucide-react";

export default function LessonNotePage() {
  // Example fallback data
  const data = {
    schoolName: "MySchool Academy",
    teacherName: "John Doe",
    session: "2025/2026",
    term: "First Term",
    class: "Basic 5",
    subject: "Mathematics",
    week: 4,
    topic: "Fractions",
    subTopic: "Adding and Subtracting Fractions",
    learningObjectives:
      "By the end of the lesson, pupils should be able to identify fractions, add fractions with the same denominator, and solve simple fraction problems.",
    lessonContent:
      "A fraction represents a part of a whole. Fractions consist of a numerator and a denominator. To add fractions with the same denominator, add the numerators and keep the denominator unchanged.",
    teachingActivities:
      "The teacher introduces fractions using real-life examples. The teacher demonstrates addition of fractions on the board. Pupils work through examples individually and in groups.",
    evaluation:
      "1. What is a fraction?\n2. Add 2/5 + 1/5.\n3. Add 3/8 + 2/8.",
    assignment:
      "1. Add 2/7 + 3/7.\n2. Add 1/4 + 2/4.\n3. Explain what the numerator of a fraction represents.",
    status: "published",
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Header */}
      <header className="bg-[#0b2a4a] text-white">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <button
                type="button"
                className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10 transition hover:bg-white/20"
              >
                <ArrowLeft size={20} />
              </button>

              <div>
                <div className="mb-1 flex items-center gap-2 text-blue-200">
                  <BookOpen size={17} />
                  <span className="text-sm font-medium">
                    Lesson Note
                  </span>
                </div>

                <h1 className="text-2xl font-bold sm:text-3xl">
                  {data.topic}
                </h1>

                <p className="mt-1 text-sm text-blue-100">
                  {data.subject} • {data.class} • Week {data.week}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => window.print()}
                className="flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-medium transition hover:bg-white/20"
              >
                <Printer size={17} />
                Print
              </button>

              <button
                type="button"
                className="flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-[#0b2a4a] transition hover:bg-blue-50"
              >
                <Pencil size={17} />
                Edit
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* School / Lesson Information */}
        <section className="mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-5 py-4 sm:px-6">
            <div className="flex items-center gap-2">
              <FileText size={19} className="text-[#0b2a4a]" />
              <h2 className="font-semibold text-slate-900">
                Lesson Information
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 divide-y divide-slate-200 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-y-0">
            <InfoItem
              icon={School}
              label="School"
              value={data.schoolName}
            />

            <InfoItem
              icon={User}
              label="Teacher"
              value={data.teacherName || "Not assigned"}
            />

            <InfoItem
              icon={CalendarDays}
              label="Session / Term"
              value={`${data.session || "—"} • ${data.term}`}
            />

            <InfoItem
              icon={Users}
              label="Class"
              value={data.class}
            />
          </div>

          <div className="grid grid-cols-1 border-t border-slate-200 divide-y divide-slate-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            <InfoItem
              icon={BookOpen}
              label="Subject"
              value={data.subject}
            />

            <InfoItem
              icon={CalendarDays}
              label="Week"
              value={`Week ${data.week}`}
            />

            <InfoItem
              icon={CheckCircle2}
              label="Status"
              value={data.status}
              status
            />
          </div>
        </section>

        {/* Topic */}
        <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0b2a4a]/10 text-[#0b2a4a]">
              <BookMarked size={20} />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Lesson Topic
              </p>
              <h2 className="mt-1 text-xl font-bold text-slate-900">
                {data.topic}
              </h2>
            </div>
          </div>

          {data.subTopic && (
            <div className="rounded-xl bg-slate-50 px-4 py-4">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Sub-topic
              </p>

              <p className="font-medium text-slate-800">
                {data.subTopic}
              </p>
            </div>
          )}
        </section>

        {/* Main Lesson Content */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Main column */}
          <div className="space-y-6 lg:col-span-2">
            <LessonSection
              icon={Target}
              title="Learning Objectives"
              content={data.learningObjectives}
            />

            <LessonSection
              icon={BookOpen}
              title="Lesson Content"
              content={data.lessonContent}
              large
            />

            <LessonSection
              icon={GraduationCap}
              title="Teaching Activities"
              content={data.teachingActivities}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <LessonSection
              icon={ClipboardCheck}
              title="Evaluation"
              content={data.evaluation}
              compact
            />

            <LessonSection
              icon={ListChecks}
              title="Assignment"
              content={data.assignment}
              compact
            />

            {/* Lesson Summary Card */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="bg-[#0b2a4a] px-5 py-4 text-white">
                <div className="flex items-center gap-2">
                  <Lightbulb size={19} />
                  <h3 className="font-semibold">
                    Lesson Summary
                  </h3>
                </div>
              </div>

              <div className="space-y-4 p-5">
                <SummaryItem
                  label="Subject"
                  value={data.subject}
                />

                <SummaryItem
                  label="Class"
                  value={data.class}
                />

                <SummaryItem
                  label="Term"
                  value={data.term}
                />

                <SummaryItem
                  label="Week"
                  value={`Week ${data.week}`}
                />

                <SummaryItem
                  label="Status"
                  value={data.status}
                  status
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 border-t border-slate-200 pt-5">
          <div className="flex flex-col gap-2 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <p>
              Lesson note prepared by{" "}
              <span className="font-medium text-slate-700">
                {data.teacherName || "Teacher"}
              </span>
            </p>

            <p>
              {data.schoolName}
            </p>
          </div>
        </div>
      </main>

      {/* Print styles */}
      <style jsx global>{`
        @media print {
          body {
            background: white !important;
          }

          header button,
          header .flex.items-center.gap-3 {
            display: none !important;
          }

          header {
            color: black !important;
            background: white !important;
            border-bottom: 2px solid #0b2a4a;
          }

          header h1 {
            color: #0b2a4a !important;
          }

          header p,
          header span {
            color: #475569 !important;
          }

          main {
            max-width: none !important;
          }

          section,
          .shadow-sm {
            box-shadow: none !important;
          }

          .bg-slate-50 {
            background: white !important;
          }
        }
      `}</style>
    </div>
  );
}

/* ----------------------------------
   Info Item
----------------------------------- */

function InfoItem({icon: Icon, label, value, status = false,}) {
  return (
    <div className="flex items-center gap-3 px-5 py-4 sm:px-6">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#0b2a4a]/10 text-[#0b2a4a]">
        <Icon size={17} />
      </div>

      <div className="min-w-0">
        <p className="text-xs font-medium text-slate-500">
          {label}
        </p>

        {status ? (
          <span className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold capitalize text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            {value}
          </span>
        ) : (
          <p className="mt-0.5 truncate text-sm font-semibold text-slate-800">
            {value}
          </p>
        )}
      </div>
    </div>
  );
}

/* ----------------------------------
   Lesson Section
----------------------------------- */

function LessonSection({icon: Icon,   title, content, large = false,   compact = false,}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center gap-3 border-b border-slate-200 px-5 py-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0b2a4a]/10 text-[#0b2a4a]">
          <Icon size={18} />
        </div>

        <h2 className="font-semibold text-slate-900">
          {title}
        </h2>
      </div>

      <div
        className={`px-5 py-5 sm:px-6 ${
          large ? "min-h-[280px]" : compact ? "min-h-[140px]" : ""
        }`}
      >
        {content ? (
          <div className="whitespace-pre-line text-[15px] leading-7 text-slate-700">
            {content}
          </div>
        ) : (
          <p className="text-sm italic text-slate-400">
            No content provided.
          </p>
        )}
      </div>
    </section>
  );
}

/* ----------------------------------
   Summary Item
----------------------------------- */

function SummaryItem({
  label,
  value,
  status = false,
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm text-slate-500">
        {label}
      </span>

      {status ? (
        <span className="flex items-center gap-1.5 text-sm font-semibold capitalize text-emerald-600">
          <CheckCircle2 size={15} />
          {value}
        </span>
      ) : (
        <span className="text-right text-sm font-semibold text-slate-800">
          {value}
        </span>
      )}
    </div>
  );
}