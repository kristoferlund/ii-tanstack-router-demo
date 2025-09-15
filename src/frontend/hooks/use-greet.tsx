import { useMutation } from "@tanstack/react-query";
import { useBackend } from "@/lib/use-backend";

export default function useGreet(onSuccess: (data: string) => void) {
  const { actor: backend } = useBackend();
  return useMutation({
    mutationFn: (name: string) => {
      if (!backend) throw new Error("backend hook not initialized");
      return backend.greet(name);
    },
    onSuccess,
  });
}
