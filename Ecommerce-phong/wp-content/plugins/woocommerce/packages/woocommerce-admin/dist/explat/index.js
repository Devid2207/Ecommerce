/*! For license information please see index.js.LICENSE.txt */
this.wc=this.wc||{},this.wc.explat=function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=486)}({277:function(e,t,r){"use strict";t.parse=function(e,t){if("string"!=typeof e)throw new TypeError("argument str must be a string");for(var r={},o=t||{},a=e.split(i),c=o.decode||n,l=0;l<a.length;l++){var u=a[l],f=u.indexOf("=");if(!(f<0)){var p=u.substr(0,f).trim(),d=u.substr(++f,u.length).trim();'"'==d[0]&&(d=d.slice(1,-1)),null==r[p]&&(r[p]=s(d,c))}}return r},t.serialize=function(e,t,r){var n=r||{},i=n.encode||o;if("function"!=typeof i)throw new TypeError("option encode is invalid");if(!a.test(e))throw new TypeError("argument name is invalid");var s=i(t);if(s&&!a.test(s))throw new TypeError("argument val is invalid");var c=e+"="+s;if(null!=n.maxAge){var l=n.maxAge-0;if(isNaN(l)||!isFinite(l))throw new TypeError("option maxAge is invalid");c+="; Max-Age="+Math.floor(l)}if(n.domain){if(!a.test(n.domain))throw new TypeError("option domain is invalid");c+="; Domain="+n.domain}if(n.path){if(!a.test(n.path))throw new TypeError("option path is invalid");c+="; Path="+n.path}if(n.expires){if("function"!=typeof n.expires.toUTCString)throw new TypeError("option expires is invalid");c+="; Expires="+n.expires.toUTCString()}n.httpOnly&&(c+="; HttpOnly");n.secure&&(c+="; Secure");if(n.sameSite){switch("string"==typeof n.sameSite?n.sameSite.toLowerCase():n.sameSite){case!0:c+="; SameSite=Strict";break;case"lax":c+="; SameSite=Lax";break;case"strict":c+="; SameSite=Strict";break;case"none":c+="; SameSite=None";break;default:throw new TypeError("option sameSite is invalid")}}return c};var n=decodeURIComponent,o=encodeURIComponent,i=/; */,a=/^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;function s(e,t){try{return t(e)}catch(t){return e}}},28:function(e,t){e.exports=window.wp.hooks},32:function(e,t,r){"use strict";var n=r(62),o=r(63),i=r(39);e.exports={formats:i,parse:o,stringify:n}},39:function(e,t,r){"use strict";var n=String.prototype.replace,o=/%20/g,i="RFC1738",a="RFC3986";e.exports={default:a,formatters:{RFC1738:function(e){return n.call(e,o,"+")},RFC3986:function(e){return String(e)}},RFC1738:i,RFC3986:a}},45:function(e,t,r){"use strict";var n=r(39),o=Object.prototype.hasOwnProperty,i=Array.isArray,a=function(){for(var e=[],t=0;t<256;++t)e.push("%"+((t<16?"0":"")+t.toString(16)).toUpperCase());return e}(),s=function(e,t){for(var r=t&&t.plainObjects?Object.create(null):{},n=0;n<e.length;++n)void 0!==e[n]&&(r[n]=e[n]);return r};e.exports={arrayToObject:s,assign:function(e,t){return Object.keys(t).reduce((function(e,r){return e[r]=t[r],e}),e)},combine:function(e,t){return[].concat(e,t)},compact:function(e){for(var t=[{obj:{o:e},prop:"o"}],r=[],n=0;n<t.length;++n)for(var o=t[n],a=o.obj[o.prop],s=Object.keys(a),c=0;c<s.length;++c){var l=s[c],u=a[l];"object"==typeof u&&null!==u&&-1===r.indexOf(u)&&(t.push({obj:a,prop:l}),r.push(u))}return function(e){for(;e.length>1;){var t=e.pop(),r=t.obj[t.prop];if(i(r)){for(var n=[],o=0;o<r.length;++o)void 0!==r[o]&&n.push(r[o]);t.obj[t.prop]=n}}}(t),e},decode:function(e,t,r){var n=e.replace(/\+/g," ");if("iso-8859-1"===r)return n.replace(/%[0-9a-f]{2}/gi,unescape);try{return decodeURIComponent(n)}catch(e){return n}},encode:function(e,t,r,o,i){if(0===e.length)return e;var s=e;if("symbol"==typeof e?s=Symbol.prototype.toString.call(e):"string"!=typeof e&&(s=String(e)),"iso-8859-1"===r)return escape(s).replace(/%u[0-9a-f]{4}/gi,(function(e){return"%26%23"+parseInt(e.slice(2),16)+"%3B"}));for(var c="",l=0;l<s.length;++l){var u=s.charCodeAt(l);45===u||46===u||95===u||126===u||u>=48&&u<=57||u>=65&&u<=90||u>=97&&u<=122||i===n.RFC1738&&(40===u||41===u)?c+=s.charAt(l):u<128?c+=a[u]:u<2048?c+=a[192|u>>6]+a[128|63&u]:u<55296||u>=57344?c+=a[224|u>>12]+a[128|u>>6&63]+a[128|63&u]:(l+=1,u=65536+((1023&u)<<10|1023&s.charCodeAt(l)),c+=a[240|u>>18]+a[128|u>>12&63]+a[128|u>>6&63]+a[128|63&u])}return c},isBuffer:function(e){return!(!e||"object"!=typeof e)&&!!(e.constructor&&e.constructor.isBuffer&&e.constructor.isBuffer(e))},isRegExp:function(e){return"[object RegExp]"===Object.prototype.toString.call(e)},maybeMap:function(e,t){if(i(e)){for(var r=[],n=0;n<e.length;n+=1)r.push(t(e[n]));return r}return t(e)},merge:function e(t,r,n){if(!r)return t;if("object"!=typeof r){if(i(t))t.push(r);else{if(!t||"object"!=typeof t)return[t,r];(n&&(n.plainObjects||n.allowPrototypes)||!o.call(Object.prototype,r))&&(t[r]=!0)}return t}if(!t||"object"!=typeof t)return[t].concat(r);var a=t;return i(t)&&!i(r)&&(a=s(t,n)),i(t)&&i(r)?(r.forEach((function(r,i){if(o.call(t,i)){var a=t[i];a&&"object"==typeof a&&r&&"object"==typeof r?t[i]=e(a,r,n):t.push(r)}else t[i]=r})),t):Object.keys(r).reduce((function(t,i){var a=r[i];return o.call(t,i)?t[i]=e(t[i],a,n):t[i]=a,t}),a)}}},466:function(e,t,r){"use strict";r(467);var n=r(6),o=60103;if(t.Fragment=60107,"function"==typeof Symbol&&Symbol.for){var i=Symbol.for;o=i("react.element"),t.Fragment=i("react.fragment")}var a=n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,s=Object.prototype.hasOwnProperty,c={key:!0,ref:!0,__self:!0,__source:!0};function l(e,t,r){var n,i={},l=null,u=null;for(n in void 0!==r&&(l=""+r),void 0!==t.key&&(l=""+t.key),void 0!==t.ref&&(u=t.ref),t)s.call(t,n)&&!c.hasOwnProperty(n)&&(i[n]=t[n]);if(e&&e.defaultProps)for(n in t=e.defaultProps)void 0===i[n]&&(i[n]=t[n]);return{$$typeof:o,type:e,key:l,ref:u,props:i,_owner:a.current}}t.jsx=l,t.jsxs=l},467:function(e,t,r){"use strict";var n=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,i=Object.prototype.propertyIsEnumerable;function a(e){if(null==e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}e.exports=function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var t={},r=0;r<10;r++)t["_"+String.fromCharCode(r)]=r;if("0123456789"!==Object.getOwnPropertyNames(t).map((function(e){return t[e]})).join(""))return!1;var n={};return"abcdefghijklmnopqrst".split("").forEach((function(e){n[e]=e})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},n)).join("")}catch(e){return!1}}()?Object.assign:function(e,t){for(var r,s,c=a(e),l=1;l<arguments.length;l++){for(var u in r=Object(arguments[l]))o.call(r,u)&&(c[u]=r[u]);if(n){s=n(r);for(var f=0;f<s.length;f++)i.call(r,s[f])&&(c[s[f]]=r[s[f]])}}return c}},486:function(e,t,r){"use strict";r.r(t),r.d(t,"initializeExPlat",(function(){return k})),r.d(t,"loadExperimentAssignment",(function(){return D})),r.d(t,"dangerouslyGetExperimentAssignment",(function(){return I})),r.d(t,"useExperiment",(function(){return R})),r.d(t,"Experiment",(function(){return F})),r.d(t,"ProvideExperimentData",(function(){return L}));var n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(e,t)};function o(e,t,r,n){return new(r||(r=Promise))((function(o,i){function a(e){try{c(n.next(e))}catch(e){i(e)}}function s(e){try{c(n.throw(e))}catch(e){i(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(a,s)}c((n=n.apply(e,t||[])).next())}))}function i(e,t){var r,n,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function s(i){return function(s){return function(i){if(r)throw new TypeError("Generator is already executing.");for(;a;)try{if(r=1,n&&(o=2&i[0]?n.return:i[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,i[1])).done)return o;switch(n=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,n=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!(o=a.trys,(o=o.length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=t.call(e,a)}catch(e){i=[6,e],n=0}finally{r=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,s])}}}var a=Date.now();function s(){var e=Date.now();return a=a<e?e:a+1}function c(e){return s()<1e3*e.ttl+e.retrievedTimestamp}var l=function(e,t){return void 0===t&&(t=60),{experimentName:e,variationName:null,retrievedTimestamp:s(),ttl:Math.max(60,t),isFallbackExperimentAssignment:!0}};function u(e){return"object"==typeof e&&null!==e}function f(e){return"string"==typeof e&&""!==e}function p(e){if(!function(e){return u(e)&&f(e.experimentName)&&(f(e.variationName)||null===e.variationName)&&"number"==typeof e.retrievedTimestamp&&"number"==typeof e.ttl&&0!==e.ttl}(e))throw new Error("Invalid ExperimentAssignment");return e}var d="undefined"!=typeof window&&window.localStorage?window.localStorage:{_data:{},setItem:function(e,t){this._data[e]=t},getItem:function(e){return this._data.hasOwnProperty(e)?this._data[e]:void 0},removeItem:function(e){delete this._data[e]},clear:function(){this._data={}}};function m(e){if(function(e){return u(e)&&u(e.variations)&&"number"==typeof e.ttl&&0<e.ttl}(e))return e;throw new Error("Invalid FetchExperimentAssignmentResponse")}function y(e,t){return o(this,void 0,void 0,(function(){var r,n,a,u,f,y,h,v,g,w,b;return i(this,(function(x){switch(x.label){case 0:return r=s(),f=m,h=(y=e).fetchExperimentAssignment,b={},[4,(E=e.getAnonId,o(void 0,void 0,void 0,(function(){var e,t,r;return i(this,(function(n){switch(n.label){case 0:return[4,E()];case 1:return(e=n.sent())?(d.setItem("explat-last-anon-id",e),d.setItem("explat-last-anon-id-retrieval-time",String(s())),[2,e]):(t=d.getItem("explat-last-anon-id"),r=d.getItem("explat-last-anon-id-retrieval-time"),t&&r&&s()-parseInt(r,10)<864e5?[2,t]:[2,null])}}))})))];case 1:return[4,h.apply(y,[(b.anonId=x.sent(),b.experimentName=t,b)])];case 2:if(n=f.apply(void 0,[x.sent()]),a=n.variations,u=n.ttl,v=Math.max(60,u),(g=Object.entries(a).map((function(e){return{experimentName:e[0],variationName:e[1],retrievedTimestamp:r,ttl:v}})).map(p)).length>1)throw new Error("Received multiple experiment assignments while trying to fetch exactly one.");if(0===g.length)return[2,l(t,v)];if((w=g[0]).experimentName!==t)throw new Error("Newly fetched ExperimentAssignment's experiment name does not match request.");if(!c(w))throw new Error("Newly fetched experiment isn't alive.");return[2,w]}var E}))}))}var h=function(e){return"explat-experiment--"+e};function v(e){p(e);var t=g(e.experimentName);if(t&&e.retrievedTimestamp<t.retrievedTimestamp)throw new Error("Trying to store an older experiment assignment than is present in the store, likely a race condition.");d.setItem(h(e.experimentName),JSON.stringify(e))}function g(e){var t=d.getItem(h(e));if(t)return p(JSON.parse(t))}!function(e){function t(r){var n=e.call(this,r)||this;return Error.captureStackTrace&&Error.captureStackTrace(n,t),n.name="MissingExperimentAssignmentError",n}(function(e,t){function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)})(t,e)}(Error);var w="undefined"==typeof window?function(e){var t=this;return{loadExperimentAssignment:function(r){return o(t,void 0,void 0,(function(){return i(this,(function(t){return e.logError({message:"Attempting to load ExperimentAssignment in SSR context",experimentName:r}),[2,l(r)]}))}))},dangerouslyGetExperimentAssignment:function(t){return e.logError({message:"Attempting to dangerously get ExperimentAssignment in SSR context",experimentName:t}),l(t)},config:e}}:function(e){var t=this;if("undefined"==typeof window)throw new Error("Running outside of a browser context.");var r={},n=function(){for(var t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];try{e.logError.apply(e,t)}catch(e){}};return{loadExperimentAssignment:function(a){return o(t,void 0,void 0,(function(){var s,u,p,d;return i(this,(function(m){switch(m.label){case 0:if(m.trys.push([0,2,,3]),!f(a))throw new Error('Invalid experimentName: "'+a+'"');return(p=g(a))&&c(p)?[2,p]:(void 0===r[a]&&(r[a]=function(r){return n=function(){return o(t,void 0,void 0,(function(){var t;return i(this,(function(n){switch(n.label){case 0:return[4,y(e,r)];case 1:return v(t=n.sent()),[2,t]}}))}))},a=null,function(){return a||(a=n().finally((function(){a=null}))),a};var n,a}(a)),[4,(h=r[a](),w=1e4,Promise.race([h,new Promise((function(e,t){return setTimeout((function(){return t(new Error("Promise has timed-out."))}),w)}))]))]);case 1:if(!(s=m.sent()))throw new Error("Could not fetch ExperimentAssignment");return[2,s];case 2:return u=m.sent(),n({message:u.message,experimentName:a,source:"loadExperimentAssignment-initialError"}),[3,3];case 3:try{return(p=g(a))?[2,p]:(v(d=l(a)),[2,d])}catch(e){return n({message:e.message,experimentName:a,source:"loadExperimentAssignment-fallbackError"}),[2,l(a)]}return[2]}var h,w}))}))},dangerouslyGetExperimentAssignment:function(t){try{if(!f(t))throw new Error("Invalid experimentName: "+t);var r=g(t);if(!r)throw new Error("Trying to dangerously get an ExperimentAssignment that hasn't loaded.");return e.isDevelopmentMode&&r&&s()-r.retrievedTimestamp<1e3&&n({message:"Warning: Trying to dangerously get an ExperimentAssignment too soon after loading it.",experimentName:t,source:"dangerouslyGetExperimentAssignment"}),r}catch(e){return n({message:e.message,experimentName:t,source:"dangerouslyGetExperimentAssignment-error"}),l(t)}},config:e}},b=r(78),x=r(6);const E={isEligible:!0};const O=e=>{var t;const r=e=>{0};try{const{message:n,...o}=e,i={message:n,properties:{...o,context:"explat",explat_client:"woocommerce"}};{if(!(null===(t=window.wcTracks)||void 0===t?void 0:t.isEnabled))throw new Error("Tracking is disabled, can't send error to the server");const e=new window.FormData;e.append("error",JSON.stringify(i)),window.fetch("https://public-api.wordpress.com/rest/v1.1/js-error",{method:"POST",body:e}).catch(r)}}catch(e){r()}};var j=r(32),S=r(28);var N=r(277),A=r.n(N);let _=null;const P=async()=>{let e=0;return _=new Promise(t=>{const r=()=>{const n=A.a.parse(document.cookie).tk_ai||null;"string"!=typeof n||""===n?99<=e?t(null):(e+=1,setTimeout(r,50)):t(n)};r()}),_},k=()=>{var e;(null===(e=window.wcTracks)||void 0===e?void 0:e.isEnabled)&&P().catch(e=>O({message:e.message}))};k();const T=w({fetchExperimentAssignment:async e=>{let{experimentName:t,anonId:r}=e;var n,o,i,a,s,c,l,u;if(!(null===(n=window.wcTracks)||void 0===n?void 0:n.isEnabled))throw new Error("Tracking is disabled, can't fetch experimentAssignment");const f=Object(S.applyFilters)("woocommerce_explat_request_args",{experiment_name:t,anon_id:null!=r?r:void 0,woo_country_code:(null===(a=null===(i=null===(o=window.wcSettings)||void 0===o?void 0:o.preloadSettings)||void 0===i?void 0:i.general)||void 0===a?void 0:a.woocommerce_default_country)||(null===(u=null===(l=null===(c=null===(s=window.wcSettings)||void 0===s?void 0:s.admin)||void 0===c?void 0:c.preloadSettings)||void 0===l?void 0:l.general)||void 0===u?void 0:u.woocommerce_default_country)}),p=await window.fetch("https://public-api.wordpress.com/wpcom/v2/experiments/0.1.0/assignments/woocommerce?"+Object(j.stringify)(f));return await p.json()},getAnonId:async()=>{var e;return(null===(e=window.wcTracks)||void 0===e?void 0:e.isEnabled)?await _:null},logError:O,isDevelopmentMode:!1}),{loadExperimentAssignment:D,dangerouslyGetExperimentAssignment:I}=T,C=function(e){const t=function(t){let r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const n={...E,...r},[o]=Object(x.useState)(t),[i,a]=Object(x.useState)([!0,null]);return Object(x.useEffect)(()=>{let r=!0;return n.isEligible&&e.loadExperimentAssignment(t).then(e=>{r&&a([!1,e])}),()=>{r=!1}},[t,n.isEligible]),t===o||o.startsWith("explat_test")||e.config.logError({message:"[ExPlat] useExperiment: experimentName should never change between renders!"}),n.isEligible?i:[!1,null]};return{useExperiment:t,Experiment:e=>{let{defaultExperience:r,treatmentExperience:n,loadingExperience:o,name:i,options:a}=e;const[s,c]=t(i,a);return s?Object(b.jsx)(b.Fragment,{children:o},void 0):null!=c&&c.variationName?Object(b.jsx)(b.Fragment,{children:n},void 0):Object(b.jsx)(b.Fragment,{children:r},void 0)},ProvideExperimentData:e=>{let{children:r,name:n,options:o}=e;const[i,a]=t(n,o);return r(i,a)}}}(T),{useExperiment:R,Experiment:F,ProvideExperimentData:L}=C},6:function(e,t){e.exports=window.React},62:function(e,t,r){"use strict";var n=r(45),o=r(39),i=Object.prototype.hasOwnProperty,a={brackets:function(e){return e+"[]"},comma:"comma",indices:function(e,t){return e+"["+t+"]"},repeat:function(e){return e}},s=Array.isArray,c=Array.prototype.push,l=function(e,t){c.apply(e,s(t)?t:[t])},u=Date.prototype.toISOString,f=o.default,p={addQueryPrefix:!1,allowDots:!1,charset:"utf-8",charsetSentinel:!1,delimiter:"&",encode:!0,encoder:n.encode,encodeValuesOnly:!1,format:f,formatter:o.formatters[f],indices:!1,serializeDate:function(e){return u.call(e)},skipNulls:!1,strictNullHandling:!1},d=function e(t,r,o,i,a,c,u,f,d,m,y,h,v,g){var w,b=t;if("function"==typeof u?b=u(r,b):b instanceof Date?b=m(b):"comma"===o&&s(b)&&(b=n.maybeMap(b,(function(e){return e instanceof Date?m(e):e}))),null===b){if(i)return c&&!v?c(r,p.encoder,g,"key",y):r;b=""}if("string"==typeof(w=b)||"number"==typeof w||"boolean"==typeof w||"symbol"==typeof w||"bigint"==typeof w||n.isBuffer(b))return c?[h(v?r:c(r,p.encoder,g,"key",y))+"="+h(c(b,p.encoder,g,"value",y))]:[h(r)+"="+h(String(b))];var x,E=[];if(void 0===b)return E;if("comma"===o&&s(b))x=[{value:b.length>0?b.join(",")||null:void 0}];else if(s(u))x=u;else{var O=Object.keys(b);x=f?O.sort(f):O}for(var j=0;j<x.length;++j){var S=x[j],N="object"==typeof S&&void 0!==S.value?S.value:b[S];if(!a||null!==N){var A=s(b)?"function"==typeof o?o(r,S):r:r+(d?"."+S:"["+S+"]");l(E,e(N,A,o,i,a,c,u,f,d,m,y,h,v,g))}}return E};e.exports=function(e,t){var r,n=e,c=function(e){if(!e)return p;if(null!==e.encoder&&void 0!==e.encoder&&"function"!=typeof e.encoder)throw new TypeError("Encoder has to be a function.");var t=e.charset||p.charset;if(void 0!==e.charset&&"utf-8"!==e.charset&&"iso-8859-1"!==e.charset)throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");var r=o.default;if(void 0!==e.format){if(!i.call(o.formatters,e.format))throw new TypeError("Unknown format option provided.");r=e.format}var n=o.formatters[r],a=p.filter;return("function"==typeof e.filter||s(e.filter))&&(a=e.filter),{addQueryPrefix:"boolean"==typeof e.addQueryPrefix?e.addQueryPrefix:p.addQueryPrefix,allowDots:void 0===e.allowDots?p.allowDots:!!e.allowDots,charset:t,charsetSentinel:"boolean"==typeof e.charsetSentinel?e.charsetSentinel:p.charsetSentinel,delimiter:void 0===e.delimiter?p.delimiter:e.delimiter,encode:"boolean"==typeof e.encode?e.encode:p.encode,encoder:"function"==typeof e.encoder?e.encoder:p.encoder,encodeValuesOnly:"boolean"==typeof e.encodeValuesOnly?e.encodeValuesOnly:p.encodeValuesOnly,filter:a,format:r,formatter:n,serializeDate:"function"==typeof e.serializeDate?e.serializeDate:p.serializeDate,skipNulls:"boolean"==typeof e.skipNulls?e.skipNulls:p.skipNulls,sort:"function"==typeof e.sort?e.sort:null,strictNullHandling:"boolean"==typeof e.strictNullHandling?e.strictNullHandling:p.strictNullHandling}}(t);"function"==typeof c.filter?n=(0,c.filter)("",n):s(c.filter)&&(r=c.filter);var u,f=[];if("object"!=typeof n||null===n)return"";u=t&&t.arrayFormat in a?t.arrayFormat:t&&"indices"in t?t.indices?"indices":"repeat":"indices";var m=a[u];r||(r=Object.keys(n)),c.sort&&r.sort(c.sort);for(var y=0;y<r.length;++y){var h=r[y];c.skipNulls&&null===n[h]||l(f,d(n[h],h,m,c.strictNullHandling,c.skipNulls,c.encode?c.encoder:null,c.filter,c.sort,c.allowDots,c.serializeDate,c.format,c.formatter,c.encodeValuesOnly,c.charset))}var v=f.join(c.delimiter),g=!0===c.addQueryPrefix?"?":"";return c.charsetSentinel&&("iso-8859-1"===c.charset?g+="utf8=%26%2310003%3B&":g+="utf8=%E2%9C%93&"),v.length>0?g+v:""}},63:function(e,t,r){"use strict";var n=r(45),o=Object.prototype.hasOwnProperty,i=Array.isArray,a={allowDots:!1,allowPrototypes:!1,arrayLimit:20,charset:"utf-8",charsetSentinel:!1,comma:!1,decoder:n.decode,delimiter:"&",depth:5,ignoreQueryPrefix:!1,interpretNumericEntities:!1,parameterLimit:1e3,parseArrays:!0,plainObjects:!1,strictNullHandling:!1},s=function(e){return e.replace(/&#(\d+);/g,(function(e,t){return String.fromCharCode(parseInt(t,10))}))},c=function(e,t){return e&&"string"==typeof e&&t.comma&&e.indexOf(",")>-1?e.split(","):e},l=function(e,t,r,n){if(e){var i=r.allowDots?e.replace(/\.([^.[]+)/g,"[$1]"):e,a=/(\[[^[\]]*])/g,s=r.depth>0&&/(\[[^[\]]*])/.exec(i),l=s?i.slice(0,s.index):i,u=[];if(l){if(!r.plainObjects&&o.call(Object.prototype,l)&&!r.allowPrototypes)return;u.push(l)}for(var f=0;r.depth>0&&null!==(s=a.exec(i))&&f<r.depth;){if(f+=1,!r.plainObjects&&o.call(Object.prototype,s[1].slice(1,-1))&&!r.allowPrototypes)return;u.push(s[1])}return s&&u.push("["+i.slice(s.index)+"]"),function(e,t,r,n){for(var o=n?t:c(t,r),i=e.length-1;i>=0;--i){var a,s=e[i];if("[]"===s&&r.parseArrays)a=[].concat(o);else{a=r.plainObjects?Object.create(null):{};var l="["===s.charAt(0)&&"]"===s.charAt(s.length-1)?s.slice(1,-1):s,u=parseInt(l,10);r.parseArrays||""!==l?!isNaN(u)&&s!==l&&String(u)===l&&u>=0&&r.parseArrays&&u<=r.arrayLimit?(a=[])[u]=o:a[l]=o:a={0:o}}o=a}return o}(u,t,r,n)}};e.exports=function(e,t){var r=function(e){if(!e)return a;if(null!==e.decoder&&void 0!==e.decoder&&"function"!=typeof e.decoder)throw new TypeError("Decoder has to be a function.");if(void 0!==e.charset&&"utf-8"!==e.charset&&"iso-8859-1"!==e.charset)throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");var t=void 0===e.charset?a.charset:e.charset;return{allowDots:void 0===e.allowDots?a.allowDots:!!e.allowDots,allowPrototypes:"boolean"==typeof e.allowPrototypes?e.allowPrototypes:a.allowPrototypes,arrayLimit:"number"==typeof e.arrayLimit?e.arrayLimit:a.arrayLimit,charset:t,charsetSentinel:"boolean"==typeof e.charsetSentinel?e.charsetSentinel:a.charsetSentinel,comma:"boolean"==typeof e.comma?e.comma:a.comma,decoder:"function"==typeof e.decoder?e.decoder:a.decoder,delimiter:"string"==typeof e.delimiter||n.isRegExp(e.delimiter)?e.delimiter:a.delimiter,depth:"number"==typeof e.depth||!1===e.depth?+e.depth:a.depth,ignoreQueryPrefix:!0===e.ignoreQueryPrefix,interpretNumericEntities:"boolean"==typeof e.interpretNumericEntities?e.interpretNumericEntities:a.interpretNumericEntities,parameterLimit:"number"==typeof e.parameterLimit?e.parameterLimit:a.parameterLimit,parseArrays:!1!==e.parseArrays,plainObjects:"boolean"==typeof e.plainObjects?e.plainObjects:a.plainObjects,strictNullHandling:"boolean"==typeof e.strictNullHandling?e.strictNullHandling:a.strictNullHandling}}(t);if(""===e||null==e)return r.plainObjects?Object.create(null):{};for(var u="string"==typeof e?function(e,t){var r,l={},u=t.ignoreQueryPrefix?e.replace(/^\?/,""):e,f=t.parameterLimit===1/0?void 0:t.parameterLimit,p=u.split(t.delimiter,f),d=-1,m=t.charset;if(t.charsetSentinel)for(r=0;r<p.length;++r)0===p[r].indexOf("utf8=")&&("utf8=%E2%9C%93"===p[r]?m="utf-8":"utf8=%26%2310003%3B"===p[r]&&(m="iso-8859-1"),d=r,r=p.length);for(r=0;r<p.length;++r)if(r!==d){var y,h,v=p[r],g=v.indexOf("]="),w=-1===g?v.indexOf("="):g+1;-1===w?(y=t.decoder(v,a.decoder,m,"key"),h=t.strictNullHandling?null:""):(y=t.decoder(v.slice(0,w),a.decoder,m,"key"),h=n.maybeMap(c(v.slice(w+1),t),(function(e){return t.decoder(e,a.decoder,m,"value")}))),h&&t.interpretNumericEntities&&"iso-8859-1"===m&&(h=s(h)),v.indexOf("[]=")>-1&&(h=i(h)?[h]:h),o.call(l,y)?l[y]=n.combine(l[y],h):l[y]=h}return l}(e,r):e,f=r.plainObjects?Object.create(null):{},p=Object.keys(u),d=0;d<p.length;++d){var m=p[d],y=l(m,u[m],r,"string"==typeof e);f=n.merge(f,y,r)}return n.compact(f)}},78:function(e,t,r){"use strict";e.exports=r(466)}});