import { CardDescription, CardTitle } from "../ui/card";

type TProps = {
  title: string;
  description: string;
};
export default function AppCardHeaderWithBackButton({
  title,
  description,
}: TProps) {
  return (
    <div className="flex-1 flex items-center gap-2 ">
      <CardTitle>{title}</CardTitle>
      <CardDescription className="line-clamp-1">{description}</CardDescription>
    </div>
  );
}
