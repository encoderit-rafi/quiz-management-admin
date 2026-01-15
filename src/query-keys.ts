export const QUERY_KEYS = {
  GET_AUTH_PROFILE: ["auth-profile"],
  GET_ALL_QUIZZES: (...params: any[]) => ["get-all-quizzes", ...params],
  GET_QUIZ: (id: string | number) => ["get-quiz", id],
  GET_LEAD_SETTINGS: (id: string | number) => ["get-lead-settings", id],
  GET_RESULT_DELIVERY_SETTINGS: (id: string | number) => [
    "get-result-delivery-settings",
    id,
  ],
  GET_RESULT_PAGES: (params: any) => ["get-result-pages", params],
  GET_RESULT_PAGE: (id: string | number) => ["get-result-page", id],
  GET_QUESTIONS: (quizId: string | number) => ["get-questions", quizId],
  GET_QUESTION: (id: string | number) => ["get-question", id],
  GET_QUIZ_QUESTIONS: (quizId: string | number, params?: any) => [
    "get-quiz-questions",
    quizId,
    params,
  ],
};
