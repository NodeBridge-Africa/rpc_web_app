import { useQuery } from "@tanstack/react-query";
import { chainUseCase } from "../usecases/chain.usecase";

// Query Keys
export const CHAIN_KEYS = {
  all: ["chains"] as const,
  available: () => [...CHAIN_KEYS.all, "available"] as const,
};

export const useAvailableChains = () => {
  return useQuery({
    queryKey: CHAIN_KEYS.available(),
    queryFn: () => chainUseCase.getAvailableChains(),
  });
};
