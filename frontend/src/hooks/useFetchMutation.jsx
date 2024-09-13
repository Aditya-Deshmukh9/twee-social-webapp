import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useFetchMutation = ({
  url,
  method = "POST",
  successMessage = "Operation successful!",
  queryKey,
  onSuccessCallback,
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (body) => {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }
      return data;
    },

    onSuccess: (data) => {
      toast.success(successMessage);
      if (queryKey) {
        queryClient.invalidateQueries({ queryKey });
      }
      if (onSuccessCallback) {
        onSuccessCallback(data);
      }
    },

    onError: (err) => {
      toast.error(err.message || "Operation failed.");
    },
  });
};
