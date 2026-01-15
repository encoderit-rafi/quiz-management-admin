import { Link } from "@tanstack/react-router";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { DEFAULT_PAGINATION } from "@/consts";
import { useBreadcrumb } from "@/store/use-breadcrumb.store";

export default function AppBreadcrumb() {
  const { breadcrumb } = useBreadcrumb();

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/" search={DEFAULT_PAGINATION}>
              Quiz Management
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {/* <BreadcrumbSeparator /> */}
        {breadcrumb.map((item, index) => {
          // const isLastItem = index === breadcrumb.length - 1;
          return (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem key={index}>
                {Boolean(item?.path) ? (
                  <BreadcrumbLink href={item.path}>{item.name}</BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{item.name}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
              {/* {!isLastItem && <BreadcrumbSeparator />} */}
            </>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
