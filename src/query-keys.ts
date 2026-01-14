export const QUERY_KEYS = {
  GET_AUTH_PROFILE: ["auth-profile"],
  GET_ALL_QUIZZES: (...params: any[]) => ["get-all-quizzes", ...params],
  GET_QUIZ: (id: string | number) => ["get-quiz", id],
  GET_LEAD_SETTINGS: (id: string | number) => ["get-lead-settings", id],
};
