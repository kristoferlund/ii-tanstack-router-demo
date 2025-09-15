import { canisterId, idlFactory } from "../../backend/declarations";
import { _SERVICE } from "../../backend/declarations/backend.did";
import { createActorHook } from "ic-use-actor";

export const useBackend = createActorHook<_SERVICE>({
  canisterId,
  idlFactory,
});
