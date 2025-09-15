import GreetForm from "@/components/greet-form";
import { requireAuth } from "@/lib/require-auth";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: async () => requireAuth(),
  component: Index,
});

function Index() {
  return <div className="w-full flex flex-col p-10 rounded-xl items-center text-white gap-5 bg-radial-[at_25%_25%] from-gray-600 to-gray-800 to-75%">
    <div>Hello stranger, what&apos;s your name?</div>
    <GreetForm />
  </div>
}
