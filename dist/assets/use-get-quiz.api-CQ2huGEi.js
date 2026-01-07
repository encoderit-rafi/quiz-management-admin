import{K as a,E as t}from"./index-CDJ7DgKs.js";const u=e=>a({queryKey:["get-quiz",e],queryFn:async()=>(await t.get(`/quizzes/${e}`)).data?.data,enabled:!!e});export{u};
