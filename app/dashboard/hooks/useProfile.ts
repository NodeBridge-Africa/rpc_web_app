import { useQuery } from "@tanstack/react-query";
import { profileUseCase } from "../usecases/profile.usecase";

// Query Keys
export const PROFILE_KEYS = {
  all: ["profile"] as const,
  details: () => [...PROFILE_KEYS.all, "details"] as const,
};

export const useProfile = () => {
  return useQuery({
    queryKey: PROFILE_KEYS.details(),
    queryFn: () => profileUseCase.getProfile(),
  });
};
