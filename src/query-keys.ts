export const QUERY_KEYS = {
  GET_AUTH_PROFILE: ["auth-profile"],
  GET_ALL_QUIZZES: (...params: any[]) => ["get-all-quizzes", ...params],
};
