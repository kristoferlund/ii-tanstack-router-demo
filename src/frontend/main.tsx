import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { InternetIdentityProvider } from "ic-use-internet-identity";

// Create a new Tanstack Query client instance
const queryClient = new QueryClient();

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

// Create a new Tanstack Router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <InternetIdentityProvider loginOptions={{
        identityProvider: process.env.DFX_NETWORK === "local"
          ? `http://${process.env.CANISTER_ID_INTERNET_IDENTITY || ""}.localhost:4943`
          : "https://identity.ic0.app"
      }}>
        <RouterProvider router={router} />
      </InternetIdentityProvider>
    </QueryClientProvider>
  </StrictMode>,
);
