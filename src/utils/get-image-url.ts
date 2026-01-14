import { BASE_URL } from "@/consts";

export const getImageUrl = (url?: string | null) => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  if (url.startsWith("blob:")) return url;

  // Remove leading slash if present
  const cleanUrl = url.startsWith("/") ? url.slice(1) : url;

  return `${BASE_URL}/${cleanUrl}`;
};
