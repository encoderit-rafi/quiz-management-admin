import{K as a,E as t}from"./index-CDJ7DgKs.js";const s=e=>a({queryKey:["result-page",e],queryFn:async()=>(await t.get(`/result-pages/${e}`)).data?.data,enabled:!!e});export{s as u};
