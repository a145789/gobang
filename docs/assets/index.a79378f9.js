var E=Object.defineProperty,M=Object.defineProperties;var R=Object.getOwnPropertyDescriptors;var w=Object.getOwnPropertySymbols;var S=Object.prototype.hasOwnProperty,B=Object.prototype.propertyIsEnumerable;var j=(e,t,r)=>t in e?E(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,v=(e,t)=>{for(var r in t||(t={}))S.call(t,r)&&j(e,r,t[r]);if(w)for(var r of w(t))B.call(t,r)&&j(e,r,t[r]);return e},C=(e,t)=>M(e,R(t));import{j as P,r as m,R as I,a as $}from"./vendor.b3130453.js";const q=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))h(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&h(i)}).observe(document,{childList:!0,subtree:!0});function r(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerpolicy&&(a.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?a.credentials="include":o.crossorigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function h(o){if(o.ep)return;o.ep=!0;const a=r(o);fetch(o.href,a)}};q();const p=P.exports.jsx,F=P.exports.jsxs,b=Array.from({length:20}),A=()=>{const e=Array.from({length:21});return e.map((t,r)=>e.map((h,o)=>({position:[o,r],style:{top:r*27-6,left:o*27-6,opacity:x.hide,backgroundColor:d.white}})))};var d;(function(e){e.white="white",e.black="black"})(d||(d={}));var x;(function(e){e[e.hide=0]="hide",e[e.show=1]="show"})(x||(x={}));function K(){const[e,t]=m.exports.useState(!0),[r,h]=m.exports.useState(d.white),[o,a]=m.exports.useState([0,0]),[i,k]=m.exports.useState(A),D=m.exports.useMemo(()=>p("table",{children:p("tbody",{children:b.map((s,c)=>p("tr",{children:b.map((l,f)=>p("td",{},f))},c))})}),[]),y=s=>s.opacity===1&&s.backgroundColor===r,L=()=>{const[s,c]=o;let l=s-4<0?0:s-4,f=s+4>20?20:s+4,u=0;for(let n=l;n<=f;n++)if(y(i[c][n].style)){if(++u==5)return!0}else u=0;u=0;let g=c-4<0?0:c-4;for(let n=l;n<=f;n++)if(!(!i[g]||!i[g][n]))if(y(i[g++][n].style)){if(++u==5)return!0}else u=0;l=c-4<0?0:c-4,f=c+4>20?20:c+4,u=0;for(let n=l;n<=f;n++)if(y(i[n][s].style)){if(++u==5)return!0}else u=0;u=0;let O=s+4>20?20:s+4;for(let n=l;n<=f;n++)if(!(!i[n]||!i[n][n]))if(y(i[n][O--].style)){if(++u==5)return!0}else u=0;return!1},N=s=>{t(!1);const[c,l]=s;i[l][c].style.opacity!==1&&(i[l][c].style=C(v({},i[l][c].style),{opacity:1,backgroundColor:r}),k([...i]),a(s))};return m.exports.useEffect(()=>{e||(L()?(t(!0),h(d.white),k(A()),setTimeout(()=>{alert(`${r}\u8D62\u4E86`)})):h(r===d.white?d.black:d.white))},[i]),F("div",{className:"container",children:[b.map((s,c)=>i[c].map(({position:l,style:f})=>p("div",{className:"piece",style:f,onClick:()=>N(l)},l[0]+l[1]))),D]})}I.render(p($.StrictMode,{children:p(K,{})}),document.getElementById("root"));