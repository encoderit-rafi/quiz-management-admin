import { CardDescription, CardTitle } from "../ui/card";

import AppBackButton from "./app-back-button";
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
      <AppBackButton />
      <div className="flex flex-col flex-1">
        <CardTitle>{title}</CardTitle>
        <CardDescription className="line-clamp-1">
          {description}
        </CardDescription>
      </div>
    </div>
  );
}
