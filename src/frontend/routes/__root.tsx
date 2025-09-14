import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import MenuBar from "@/components/menu-bar";
import { AuthGuard } from "@/components/auth-guard";

export const Route = createRootRoute({
  component: () => (
    <main className="dark">
      <div className="flex flex-col gap-14 items-center w-[400px]">
        <AuthGuard />
        <MenuBar />
        <Outlet />
        <TanStackRouterDevtools />
      </div>
    </main>
  ),
});
