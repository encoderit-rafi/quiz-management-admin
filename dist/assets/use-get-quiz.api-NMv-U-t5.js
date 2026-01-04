import{z as t,t as a}from"./index-C0O9Q7MJ.js";const u=e=>t({queryKey:["get-quiz",e],queryFn:async()=>(await a.get(`/quizzes/${e}`)).data?.data,enabled:!!e});export{u};
