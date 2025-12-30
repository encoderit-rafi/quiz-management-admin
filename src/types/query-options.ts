import { type UseQueryOptions } from "@tanstack/react-query";

// export type TQueryOptions<TApiResponse> = Omit<
//   UseQueryOptions<TApiResponse, Error, TApiResponse>,
//   "queryKey" | "queryFn"
// >;
export type TQueryOptions = Omit<UseQueryOptions, "queryKey" | "queryFn">;
