import { toast } from "sonner";

export const useExportLeads = () => {
  const exportLeads = () => {
    // Simulate export delay
    toast.promise(new Promise((resolve) => setTimeout(resolve, 1500)), {
      loading: "Exporting leads...",
      success: "Leads exported successfully!",
      error: "Failed to export leads.",
    });
  };
  return exportLeads;
};
