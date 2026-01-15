import { cn } from "@/utils";
import { Search, X } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../ui/input-group";

type TProps = {
  props?: {
    div?: React.ComponentProps<"div">;
    input?: React.ComponentProps<"input">;
    button?: React.ComponentProps<"button">;
  };
  onSearch?: () => void;
  onClear?: () => void;
};

export default function AppSearch({ props, onSearch, onClear }: TProps) {
  const hasValue = props?.input?.value && String(props.input.value).length > 0;

  return (
    <InputGroup className={cn("w-full max-w-sm", props?.div?.className)}>
      <InputGroupInput
        placeholder="Search..."
        {...props?.input}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSearch?.();
          }
          props?.input?.onKeyDown?.(e);
        }}
      />
      {hasValue && (
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            size="icon-xs"
            onClick={onClear}
            aria-label="Clear search"
          >
            <X size={14} />
          </InputGroupButton>
        </InputGroupAddon>
      )}
      <InputGroupAddon align="inline-end">
        <InputGroupButton
          size="icon-xs"
          onClick={onSearch}
          aria-label="Search"
          {...props?.button}
        >
          <Search size={14} />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
}
