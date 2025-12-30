import { cn } from "@/utils";

type TImagePreviewProps = React.ComponentProps<"img">;

export const ImagePreview = ({
  src,
  alt = "Preview",
  className,
  ...props
}: TImagePreviewProps) => {
  return (
    <img
      src={src}
      alt={alt}
      className={cn(`h-full w-full object-cover object-center`, className)}
      {...props}
    />
  );
};
