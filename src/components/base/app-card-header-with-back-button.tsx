import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { CardDescription, CardTitle } from "../ui/card";
import { useRouter } from "@tanstack/react-router";
type TProps = {
  title: string;
  description: string;
};
export default function AppCardHeaderWithBackButton({
  title,
  description,
}: TProps) {
  const router = useRouter();

  const handleBack = () => {
    router.history.back();
  };
  return (
    <div className="flex-1 flex items-center gap-2 ">
      <Button variant="outline" size={"icon"} onClick={handleBack}>
        <ArrowLeft className="size-4" />
      </Button>
      <div className="flex flex-col flex-1">
        <CardTitle>{title}</CardTitle>
        <CardDescription className="line-clamp-1">
          {description}
        </CardDescription>
      </div>
    </div>
  );
}
