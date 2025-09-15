import { requireAuth } from "@/lib/require-auth";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  beforeLoad: async () => requireAuth(),
  component: About,
});

function About() {
  return (
    <div className="w-full flex flex-col p-10 rounded-xl items-center text-white gap-5 bg-radial-[at_25%_25%] from-gray-600 to-gray-800 to-75%">
      <h2>About</h2>
      <div className="text-center">
        This template provides a batteries included setup for an ICP/React
        application with the latest versions of Vite, TypeScript, Tailwind CSS,
        SWC, Eslint, Tanstack Query and Tanstack Router.
      </div>
    </div>
  );
}
