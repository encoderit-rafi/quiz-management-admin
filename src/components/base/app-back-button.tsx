import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "@tanstack/react-router";

export default function AppBackButton() {
  const router = useRouter();

  const handleBack = () => {
    router.history.back();
  };
  return (
    <Button variant="ghost" size={"icon"} onClick={handleBack}>
      <ArrowLeft className="size-4" />
    </Button>
  );
}
