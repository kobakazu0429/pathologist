import{parse as t}from"svg-parser";import r from"svgpath";const e=Object.assign||function(t,...r){r.forEach(r=>{Object.keys(r).forEach(e=>{t[e]=r[e]})})};function n(t,r){let e={};return Object.keys(t).forEach(n=>{~r.indexOf(n)||(e[n]=t[n])}),e}function o(t){let r="",e="M";for(let n=0;n<t.length;n+=2)r+=`${e}${t[n]},${t[n+1]}`,e=" ";return r}const s={ellipse:t=>{const r=t.cx||0,e=t.cy||0,o=t.rx||0,s=t.ry||0,i=n(t,["cx","cy","rx","ry"]);return i.d=`M${r-o},${e}a${o},${s} 0 1,0 ${2*o},0a${o},${s} 0 1,0 ${-2*o},0`,i},circle:t=>{const r=t.cx||0,e=t.cy||0,o=t.r||0,s=n(t,["cx","cy","r"]);return s.d=`M${r-o},${e}a${o},${o} 0 1,0 ${2*o},0a${o},${o} 0 1,0 ${-2*o},0`,s},polygon:t=>{const r=s.polyline(t);return r.d+="Z",r},polyline:t=>{const r=n(t,"points");return r.d=o(t.points.trim().split(/[\s,]+/)),r},rect:t=>{const r=+t.x||0,e=+t.y||0,o=+t.width||0,s=+t.height||0,i=n(t,["x","y","width","height","rx","ry"]);return i.d=`m${r},${e} ${o},0 0,${s} ${-o},0Z`,i},line:t=>{const r=n(t,["x1","y1","x2","y2"]);return r.d=o([t.x1||0,t.y1||0,t.x2||0,t.y2||0]),r}};function i(t,r){t.properties=e(r,t.properties)}function c(t,r){t.properties.class&&(r=e({},r),t.properties.class.split(" ").filter(Boolean).forEach(t=>r[t]=!0));const n=Object.keys(r).join(" ");n&&(t.properties.class=n)}function a(t,e){t.properties.transform&&(e=e.concat(t.properties.transform),delete t.properties.transform);const n=e.join(" ");"path"===t.tagName?t.properties.d=r(t.properties.d).transform(n).round(10).toString():n&&(t.properties.transform=n)}const p=["defs","title"],l=["id","class","style","transform"];function f(t,r,o,h,u){if("svg"===t.tagName){const n=o.slice();t.children.forEach(t=>{f(t,r,n,e({},h),e({},u))})}else"g"===t.tagName?(o=t.properties.transform?o.concat(t.properties.transform):o,t.properties.class&&t.properties.class.split(" ").filter(Boolean).forEach(t=>h[t]=!0),t.children.forEach(s=>{const i=e({},h),c=e(n(u,l),n(t.properties,l));f(s,r,o,i,c)})):~p.indexOf(t.tagName)?(i(t,u),c(t,h),a(t,o),r.push(t)):(i(t,u),c(t,h),"path"!==t.tagName&&(t=function(t){const r=s[t.tagName];if(r)return{tagName:"path",properties:r(t.properties)};throw new Error(`TODO <${t.tagName}>`)}(t)),a(t,o),r.push(t))}function h(t,r){if("string"==typeof t)return t;const e=function(t){return Object.keys(t).map(r=>` ${r}="${t[r]}"`).join("")}(t.properties);let n=`${r}<${t.tagName}${e}`;if(t.children&&t.children.length){n+=">";let e="\n";for(let o of t.children)"string"==typeof o?(n+=o,e=""):"text"===o.type?(n+=o.value,e=""):(n+=e+h(o,r+"\t"),e="\n");e&&(e+=r),n+=`${e}</${t.tagName}>`}else n+=t.value?`>${t.value}</${t.tagName}>`:"/>";return n}class u{constructor(r){this.source=t(r).children[0],this.target={tagName:this.source.tagName,properties:Object.assign({},this.source.properties),children:[]},f(this.source,this.target.children,[],{},{})}toString(){return h(this.target,"")}}function g(t){return new u(t).toString()}function $(t){const r=new u(t);return{paths:r.target.children.filter(t=>"path"===t.tagName).map(t=>t.properties),toString:()=>r.toString()}}export{$ as parse,g as transform};
//# sourceMappingURL=index.modern.js.map