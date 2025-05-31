import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { authUseCase } from "@/app/dashboard/usecases/auth.usecase";
import {
  UpdatePasswordRequest,
  UpdateEmailRequest,
} from "@/lib/types/backend.types";

export const useUpdatePassword = () => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: UpdatePasswordRequest) => authUseCase.updatePassword(data),
    onSuccess: (data) => {
      toast({
        title: "Success",
        description: data.data.message,
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to update password",
        variant: "destructive",
      });
    },
  });
};

export const useUpdateEmail = () => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: UpdateEmailRequest) => authUseCase.updateEmail(data),
    onSuccess: (data) => {
      toast({
        title: "Success",
        description: data.data.message,
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to update email",
        variant: "destructive",
      });
    },
  });
};

export const useExportData = () => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: () => authUseCase.exportUserData(),
    onSuccess: (data) => {
      // Create a JSON file and download it
      const exportData = JSON.stringify(data.data, null, 2);
      const blob = new Blob([exportData], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `nodebridge-export-${new Date().toISOString().split("T")[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "Success",
        description: "Your data has been exported successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to export data",
        variant: "destructive",
      });
    },
  });
};