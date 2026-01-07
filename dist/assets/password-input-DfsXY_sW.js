import{c as l,r as o,j as s,ay as c,a as h,B as p,Z as w}from"./index-CDJ7DgKs.js";const y=[["path",{d:"M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",key:"ct8e1f"}],["path",{d:"M14.084 14.158a3 3 0 0 1-4.242-4.242",key:"151rxh"}],["path",{d:"M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",key:"13bj9a"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]],u=l("eye-off",y),m=o.forwardRef(({className:d,...e},r)=>{const[a,n]=o.useState(!1),t=e.value===""||e.value===void 0||e.disabled;return s.jsxs("div",{className:"relative",children:[s.jsx(c,{type:a?"text":"password",className:h("hide-password-toggle pr-10",d),ref:r,...e}),s.jsxs(p,{type:"button",variant:"ghost",size:"sm",className:"absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent",onClick:()=>n(i=>!i),disabled:t,children:[a&&!t?s.jsx(w,{className:"h-4 w-4","aria-hidden":"true"}):s.jsx(u,{className:"h-4 w-4","aria-hidden":"true"}),s.jsx("span",{className:"sr-only",children:a?"Hide password":"Show password"})]}),s.jsx("style",{children:`
					.hide-password-toggle::-ms-reveal,
					.hide-password-toggle::-ms-clear {
						visibility: hidden;
						pointer-events: none;
						display: none;
					}
				`})]})});m.displayName="PasswordInput";export{m as P};
