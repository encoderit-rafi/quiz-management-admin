import { toast } from "sonner";
import { api } from "@/axios";

export const useExportLeads = (quizId?: string | number) => {
  return () => {
    const endpoint = quizId ? `/export/leads/${quizId}` : `/export/leads`;

    const p = api
      .get(endpoint, { responseType: "blob" })
      .then((response) => {
        const blob = new Blob([response.data], { type: "text/csv;charset=utf-8;" });
        const url = (window as any).URL.createObjectURL(blob);
        const a = document.createElement("a");
        const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
        const filename = `leads_${quizId ?? "all"}_${timestamp}.xlsx`;
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        (window as any).URL.revokeObjectURL(url);
      })
      .catch((err) => {
        // Re-throw so toast.promise shows error and callers can handle it
        throw err;
      });

    return toast.promise(p, {
      loading: "Exporting leads...",
      success: "Leads exported successfully!",
      error: "Failed to export leads.",
    });
  };
};
