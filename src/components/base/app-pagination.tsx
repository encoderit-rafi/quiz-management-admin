import { useId } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { Label } from "@/components/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type TProps = {
  total: number;
  perPage: number;
  page: number;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: string) => void;
};

const AppPagination = ({
  total,
  perPage,
  page,
  onPageChange,
  onPerPageChange,
}: TProps) => {
  const id = useId();
  const totalPages = Math.ceil(total / perPage);

  // Generate page numbers to display
  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    for (
      let i = Math.max(2, page - delta);
      i <= Math.min(totalPages - 1, page + delta);
      i++
    ) {
      range.push(i);
    }

    if (page - delta > 2) {
      range.unshift("...");
    }
    if (page + delta < totalPages - 1) {
      range.push("...");
    }

    range.unshift(1);
    if (totalPages > 1) {
      range.push(totalPages);
    }

    return range;
  };

  const pageNumbers = getPageNumbers();

  const start = (page - 1) * perPage + 1;
  const end = Math.min(page * perPage, total);

  return (
    <div className="flex w-full flex-wrap items-center justify-between gap-6 max-sm:justify-center">
      <div className="flex shrink-0 items-center gap-3">
        <Label htmlFor={id}>Rows per page</Label>
        <Select value={String(perPage)} onValueChange={onPerPageChange}>
          <SelectTrigger id={id} className="w-fit whitespace-nowrap">
            <SelectValue placeholder="Select number of results" />
          </SelectTrigger>
          <SelectContent className="[&_*[role=option]]:pr-8 [&_*[role=option]]:pl-2 [&_*[role=option]>span]:right-2 [&_*[role=option]>span]:left-auto">
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="25">25</SelectItem>
            <SelectItem value="50">50</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="text-muted-foreground flex grow items-center justify-end whitespace-nowrap max-sm:justify-center">
        <p
          className="text-muted-foreground text-sm whitespace-nowrap"
          aria-live="polite"
        >
          Showing <span className="text-foreground">{start}</span> to{" "}
          <span className="text-foreground">{end}</span> of{" "}
          <span className="text-foreground">{total}</span> products
        </p>
      </div>
      <Pagination className="w-fit max-sm:mx-0">
        <PaginationContent>
          <PaginationItem>
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (page > 1) onPageChange(page - 1);
              }}
              aria-label="Go to previous page"
              size="icon"
              className={`rounded-md ${page === 1 ? "pointer-events-none opacity-50" : ""}`}
            >
              <ChevronLeftIcon className="size-4" />
            </PaginationLink>
          </PaginationItem>

          {pageNumbers.map((pageNumber, index) => (
            <PaginationItem key={index}>
              {pageNumber === "..." ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onPageChange(pageNumber as number);
                  }}
                  isActive={page === pageNumber}
                  className="rounded-md"
                >
                  {pageNumber}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (page < totalPages) onPageChange(page + 1);
              }}
              aria-label="Go to next page"
              size="icon"
              className={`rounded-md ${page === totalPages ? "pointer-events-none opacity-50" : ""}`}
            >
              <ChevronRightIcon className="size-4" />
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default AppPagination;
