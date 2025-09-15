import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/error")({
  component: Error,
});

function Error() {
  return (
    <div className="w-full flex flex-col p-10 rounded-xl items-center text-white gap-5 bg-radial-[at_25%_25%] from-red-600 to-red-800 to-75%">
      <h2>Error</h2>
      <div className="text-center">
        This is an example error page. If you got here, there was some error with the sign in process most likely. Check the developer tools console for more info.
      </div>
    </div>
  );
}
