
import TodoGenerate from "@/app/todos/new/page";
import TodosPage from "@/app/todos/page";

export default function Home() {
  return (
    <div
    className="p-6 max-w-xl mx-auto space-y-3 bg-sky-100 min-h-screen min-w-screen">
      <TodosPage />
    </div>
  )
}