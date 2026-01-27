import { FeedbackList } from "@/components/employee/feedback-list"

export default function EmployeeFeedbacksPage() {
  return (
    <section className="flex h-[calc(100vh-6rem)] flex-1 flex-col overflow-hidden">
      <div className="bg-white/70 px-1 pb-4">
        <h1 className="text-xl font-semibold text-slate-900">Feedbacks from admin</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-1">
        <FeedbackList />
      </div>
    </section>
  )
}
