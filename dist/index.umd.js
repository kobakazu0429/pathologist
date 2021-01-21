!function(r,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("svg-parser"),require("svgpath")):"function"==typeof define&&define.amd?define(["exports","svg-parser","svgpath"],t):t((r||self).pathologist={},r.svgParser,r.svgpath)}(this,function(r,t,e){function n(r){return r&&"object"==typeof r&&"default"in r?r:{default:r}}var o=n(e),i=Object.assign||function(r){[].slice.call(arguments,1).forEach(function(t){Object.keys(t).forEach(function(e){r[e]=t[e]})})};function a(r,t){var e={};return Object.keys(r).forEach(function(n){~t.indexOf(n)||(e[n]=r[n])}),e}function s(r){for(var t="",e="M",n=0;n<r.length;n+=2)t+=""+e+r[n]+","+r[n+1],e=" ";return t}var c={ellipse:function(r){var t=r.cx||0,e=r.cy||0,n=r.rx||0,o=r.ry||0,i=a(r,["cx","cy","rx","ry"]);return i.d="M"+(t-n)+","+e+"a"+n+","+o+" 0 1,0 "+2*n+",0a"+n+","+o+" 0 1,0 "+-2*n+",0",i},circle:function(r){var t=r.cx||0,e=r.cy||0,n=r.r||0,o=a(r,["cx","cy","r"]);return o.d="M"+(t-n)+","+e+"a"+n+","+n+" 0 1,0 "+2*n+",0a"+n+","+n+" 0 1,0 "+-2*n+",0",o},polygon:function(r){var t=c.polyline(r);return t.d+="Z",t},polyline:function(r){var t=a(r,"points");return t.d=s(r.points.trim().split(/[\s,]+/)),t},rect:function(r){var t=+r.x||0,e=+r.y||0,n=+r.width||0,o=+r.height||0,i=a(r,["x","y","width","height","rx","ry"]);return i.d="m"+t+","+e+" "+n+",0 0,"+o+" "+-n+",0Z",i},line:function(r){var t=a(r,["x1","y1","x2","y2"]);return t.d=s([r.x1||0,r.y1||0,r.x2||0,r.y2||0]),t}};function u(r,t){r.properties=i(t,r.properties)}function f(r,t){r.properties.class&&(t=i({},t),r.properties.class.split(" ").filter(Boolean).forEach(function(r){return t[r]=!0}));var e=Object.keys(t).join(" ");e&&(r.properties.class=e)}function p(r,t){r.properties.transform&&(t=t.concat(r.properties.transform),delete r.properties.transform);var e=t.join(" ");"path"===r.tagName?r.properties.d=o.default(r.properties.d).transform(e).round(10).toString():e&&(r.properties.transform=e)}var l=["defs","title"],h=["id","class","style","transform"];function g(r,t,e,n,o){if("svg"===r.tagName){var s=e.slice();r.children.forEach(function(r){g(r,t,s,i({},n),i({},o))})}else"g"===r.tagName?(e=r.properties.transform?e.concat(r.properties.transform):e,r.properties.class&&r.properties.class.split(" ").filter(Boolean).forEach(function(r){return n[r]=!0}),r.children.forEach(function(s){var c=i({},n),u=i(a(o,h),a(r.properties,h));g(s,t,e,c,u)})):~l.indexOf(r.tagName)?(u(r,o),f(r,n),p(r,e),t.push(r)):(u(r,o),f(r,n),"path"!==r.tagName&&(r=function(r){var t=c[r.tagName];if(t)return{tagName:"path",properties:t(r.properties)};throw new Error("TODO <"+r.tagName+">")}(r)),p(r,e),t.push(r))}function d(r,t){(null==t||t>r.length)&&(t=r.length);for(var e=0,n=new Array(t);e<t;e++)n[e]=r[e];return n}function y(r,t){if("string"==typeof r)return r;var e=function(r){return Object.keys(r).map(function(t){return" "+t+'="'+r[t]+'"'}).join("")}(r.properties),n=t+"<"+r.tagName+e;if(r.children&&r.children.length){n+=">";for(var o,i="\n",a=function(r,t){var e;if("undefined"==typeof Symbol||null==r[Symbol.iterator]){if(Array.isArray(r)||(e=function(r,t){if(r){if("string"==typeof r)return d(r,t);var e=Object.prototype.toString.call(r).slice(8,-1);return"Object"===e&&r.constructor&&(e=r.constructor.name),"Map"===e||"Set"===e?Array.from(r):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?d(r,t):void 0}}(r))){e&&(r=e);var n=0;return function(){return n>=r.length?{done:!0}:{done:!1,value:r[n++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}return(e=r[Symbol.iterator]()).next.bind(e)}(r.children);!(o=a()).done;){var s=o.value;"string"==typeof s?(n+=s,i=""):"text"===s.type?(n+=s.value,i=""):(n+=i+y(s,t+"\t"),i="\n")}i&&(i+=t),n+=i+"</"+r.tagName+">"}else n+=r.value?">"+r.value+"</"+r.tagName+">":"/>";return n}var m=function(){function r(r){this.source=t.parse(r).children[0],this.target={tagName:this.source.tagName,properties:Object.assign({},this.source.properties),children:[]},g(this.source,this.target.children,[],{},{})}return r.prototype.toString=function(){return y(this.target,"")},r}();r.parse=function(r){var t=new m(r);return{paths:t.target.children.filter(function(r){return"path"===r.tagName}).map(function(r){return r.properties}),toString:function(){return t.toString()}}},r.transform=function(r){return new m(r).toString()}});
//# sourceMappingURL=index.umd.js.map
