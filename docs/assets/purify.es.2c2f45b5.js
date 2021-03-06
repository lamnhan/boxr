/*! @license DOMPurify 2.3.4 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/2.3.4/LICENSE */function Nt(a){if(Array.isArray(a)){for(var n=0,o=Array(a.length);n<a.length;n++)o[n]=a[n];return o}else return Array.from(a)}var Dt=Object.hasOwnProperty,Ke=Object.setPrototypeOf,Lt=Object.isFrozen,Mt=Object.getPrototypeOf,wt=Object.getOwnPropertyDescriptor,T=Object.freeze,R=Object.seal,Ct=Object.create,Ze=typeof Reflect!="undefined"&&Reflect,Q=Ze.apply,ge=Ze.construct;Q||(Q=function(n,o,s){return n.apply(o,s)});T||(T=function(n){return n});R||(R=function(n){return n});ge||(ge=function(n,o){return new(Function.prototype.bind.apply(n,[null].concat(Nt(o))))});var It=_(Array.prototype.forEach),Je=_(Array.prototype.pop),B=_(Array.prototype.push),ee=_(String.prototype.toLowerCase),Qe=_(String.prototype.match),D=_(String.prototype.replace),xt=_(String.prototype.indexOf),kt=_(String.prototype.trim),A=_(RegExp.prototype.test),et=Ft(TypeError);function _(a){return function(n){for(var o=arguments.length,s=Array(o>1?o-1:0),c=1;c<o;c++)s[c-1]=arguments[c];return Q(a,n,s)}}function Ft(a){return function(){for(var n=arguments.length,o=Array(n),s=0;s<n;s++)o[s]=arguments[s];return ge(a,o)}}function l(a,n){Ke&&Ke(a,null);for(var o=n.length;o--;){var s=n[o];if(typeof s=="string"){var c=ee(s);c!==s&&(Lt(n)||(n[o]=c),s=c)}a[s]=!0}return a}function L(a){var n=Ct(null),o=void 0;for(o in a)Q(Dt,a,[o])&&(n[o]=a[o]);return n}function te(a,n){for(;a!==null;){var o=wt(a,n);if(o){if(o.get)return _(o.get);if(typeof o.value=="function")return _(o.value)}a=Mt(a)}function s(c){return console.warn("fallback value for",c),null}return s}var tt=T(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","section","select","shadow","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),ye=T(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","filter","font","g","glyph","glyphref","hkern","image","line","lineargradient","marker","mask","metadata","mpath","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),be=T(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Pt=T(["animate","color-profile","cursor","discard","fedropshadow","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Se=T(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover"]),Ut=T(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),rt=T(["#text"]),at=T(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","face","for","headers","height","hidden","high","href","hreflang","id","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","pattern","placeholder","playsinline","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","xmlns","slot"]),Re=T(["accent-height","accumulate","additive","alignment-baseline","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","targetx","targety","transform","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),nt=T(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),re=T(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Ht=R(/\{\{[\s\S]*|[\s\S]*\}\}/gm),zt=R(/<%[\s\S]*|[\s\S]*%>/gm),Gt=R(/^data-[\-\w.\u00B7-\uFFFF]/),Bt=R(/^aria-[\-\w]+$/),Wt=R(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),$t=R(/^(?:\w+script|data):/i),Yt=R(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),W=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(a){return typeof a}:function(a){return a&&typeof Symbol=="function"&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a};function g(a){if(Array.isArray(a)){for(var n=0,o=Array(a.length);n<a.length;n++)o[n]=a[n];return o}else return Array.from(a)}var Vt=function(){return typeof window=="undefined"?null:window},jt=function(n,o){if((typeof n=="undefined"?"undefined":W(n))!=="object"||typeof n.createPolicy!="function")return null;var s=null,c="data-tt-policy-suffix";o.currentScript&&o.currentScript.hasAttribute(c)&&(s=o.currentScript.getAttribute(c));var $="dompurify"+(s?"#"+s:"");try{return n.createPolicy($,{createHTML:function(Y){return Y}})}catch{return console.warn("TrustedTypes policy "+$+" could not be created."),null}};function it(){var a=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Vt(),n=function(e){return it(e)};if(n.version="2.3.4",n.removed=[],!a||!a.document||a.document.nodeType!==9)return n.isSupported=!1,n;var o=a.document,s=a.document,c=a.DocumentFragment,$=a.HTMLTemplateElement,M=a.Node,Y=a.Element,ae=a.NodeFilter,Oe=a.NamedNodeMap,ot=Oe===void 0?a.NamedNodeMap||a.MozNamedAttrMap:Oe,lt=a.HTMLFormElement,st=a.DOMParser,ut=a.trustedTypes,V=Y.prototype,ft=te(V,"cloneNode"),mt=te(V,"nextSibling"),ct=te(V,"childNodes"),ne=te(V,"parentNode");if(typeof $=="function"){var ie=s.createElement("template");ie.content&&ie.content.ownerDocument&&(s=ie.content.ownerDocument)}var O=jt(ut,o),Ne=O&&K?O.createHTML(""):"",j=s,oe=j.implementation,pt=j.createNodeIterator,dt=j.createDocumentFragment,vt=j.getElementsByTagName,ht=o.importNode,De={};try{De=L(s).documentMode?s.documentMode:{}}catch{}var E={};n.isSupported=typeof ne=="function"&&oe&&typeof oe.createHTMLDocument!="undefined"&&De!==9;var le=Ht,se=zt,Tt=Gt,At=Bt,_t=$t,Le=Yt,ue=Wt,p=null,Me=l({},[].concat(g(tt),g(ye),g(be),g(Se),g(rt))),m=null,we=l({},[].concat(g(at),g(Re),g(nt),g(re))),f=Object.seal(Object.create(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),q=null,fe=null,Ce=!0,me=!0,Ie=!1,w=!1,C=!1,ce=!1,pe=!1,I=!1,X=!1,K=!1,xe=!0,de=!0,H=!1,x={},k=null,ke=l({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),Fe=null,Pe=l({},["audio","video","img","source","image","track"]),ve=null,Ue=l({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),he="http://www.w3.org/1998/Math/MathML",Te="http://www.w3.org/2000/svg",N="http://www.w3.org/1999/xhtml",Z=N,Ae=!1,F=void 0,Et=["application/xhtml+xml","text/html"],gt="text/html",P=void 0,U=null,yt=s.createElement("form"),He=function(e){return e instanceof RegExp||e instanceof Function},_e=function(e){U&&U===e||((!e||(typeof e=="undefined"?"undefined":W(e))!=="object")&&(e={}),e=L(e),p="ALLOWED_TAGS"in e?l({},e.ALLOWED_TAGS):Me,m="ALLOWED_ATTR"in e?l({},e.ALLOWED_ATTR):we,ve="ADD_URI_SAFE_ATTR"in e?l(L(Ue),e.ADD_URI_SAFE_ATTR):Ue,Fe="ADD_DATA_URI_TAGS"in e?l(L(Pe),e.ADD_DATA_URI_TAGS):Pe,k="FORBID_CONTENTS"in e?l({},e.FORBID_CONTENTS):ke,q="FORBID_TAGS"in e?l({},e.FORBID_TAGS):{},fe="FORBID_ATTR"in e?l({},e.FORBID_ATTR):{},x="USE_PROFILES"in e?e.USE_PROFILES:!1,Ce=e.ALLOW_ARIA_ATTR!==!1,me=e.ALLOW_DATA_ATTR!==!1,Ie=e.ALLOW_UNKNOWN_PROTOCOLS||!1,w=e.SAFE_FOR_TEMPLATES||!1,C=e.WHOLE_DOCUMENT||!1,I=e.RETURN_DOM||!1,X=e.RETURN_DOM_FRAGMENT||!1,K=e.RETURN_TRUSTED_TYPE||!1,pe=e.FORCE_BODY||!1,xe=e.SANITIZE_DOM!==!1,de=e.KEEP_CONTENT!==!1,H=e.IN_PLACE||!1,ue=e.ALLOWED_URI_REGEXP||ue,Z=e.NAMESPACE||N,e.CUSTOM_ELEMENT_HANDLING&&He(e.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(f.tagNameCheck=e.CUSTOM_ELEMENT_HANDLING.tagNameCheck),e.CUSTOM_ELEMENT_HANDLING&&He(e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(f.attributeNameCheck=e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),e.CUSTOM_ELEMENT_HANDLING&&typeof e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(f.allowCustomizedBuiltInElements=e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),F=Et.indexOf(e.PARSER_MEDIA_TYPE)===-1?F=gt:F=e.PARSER_MEDIA_TYPE,P=F==="application/xhtml+xml"?function(t){return t}:ee,w&&(me=!1),X&&(I=!0),x&&(p=l({},[].concat(g(rt))),m=[],x.html===!0&&(l(p,tt),l(m,at)),x.svg===!0&&(l(p,ye),l(m,Re),l(m,re)),x.svgFilters===!0&&(l(p,be),l(m,Re),l(m,re)),x.mathMl===!0&&(l(p,Se),l(m,nt),l(m,re))),e.ADD_TAGS&&(p===Me&&(p=L(p)),l(p,e.ADD_TAGS)),e.ADD_ATTR&&(m===we&&(m=L(m)),l(m,e.ADD_ATTR)),e.ADD_URI_SAFE_ATTR&&l(ve,e.ADD_URI_SAFE_ATTR),e.FORBID_CONTENTS&&(k===ke&&(k=L(k)),l(k,e.FORBID_CONTENTS)),de&&(p["#text"]=!0),C&&l(p,["html","head","body"]),p.table&&(l(p,["tbody"]),delete q.tbody),T&&T(e),U=e)},ze=l({},["mi","mo","mn","ms","mtext"]),Ge=l({},["foreignobject","desc","title","annotation-xml"]),J=l({},ye);l(J,be),l(J,Pt);var Ee=l({},Se);l(Ee,Ut);var bt=function(e){var t=ne(e);(!t||!t.tagName)&&(t={namespaceURI:N,tagName:"template"});var r=ee(e.tagName),u=ee(t.tagName);if(e.namespaceURI===Te)return t.namespaceURI===N?r==="svg":t.namespaceURI===he?r==="svg"&&(u==="annotation-xml"||ze[u]):Boolean(J[r]);if(e.namespaceURI===he)return t.namespaceURI===N?r==="math":t.namespaceURI===Te?r==="math"&&Ge[u]:Boolean(Ee[r]);if(e.namespaceURI===N){if(t.namespaceURI===Te&&!Ge[u]||t.namespaceURI===he&&!ze[u])return!1;var d=l({},["title","style","font","a","script"]);return!Ee[r]&&(d[r]||!J[r])}return!1},y=function(e){B(n.removed,{element:e});try{e.parentNode.removeChild(e)}catch{try{e.outerHTML=Ne}catch{e.remove()}}},Be=function(e,t){try{B(n.removed,{attribute:t.getAttributeNode(e),from:t})}catch{B(n.removed,{attribute:null,from:t})}if(t.removeAttribute(e),e==="is"&&!m[e])if(I||X)try{y(t)}catch{}else try{t.setAttribute(e,"")}catch{}},We=function(e){var t=void 0,r=void 0;if(pe)e="<remove></remove>"+e;else{var u=Qe(e,/^[\r\n\t ]+/);r=u&&u[0]}F==="application/xhtml+xml"&&(e='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+e+"</body></html>");var d=O?O.createHTML(e):e;if(Z===N)try{t=new st().parseFromString(d,F)}catch{}if(!t||!t.documentElement){t=oe.createDocument(Z,"template",null);try{t.documentElement.innerHTML=Ae?"":d}catch{}}var v=t.body||t.documentElement;return e&&r&&v.insertBefore(s.createTextNode(r),v.childNodes[0]||null),Z===N?vt.call(t,C?"html":"body")[0]:C?t.documentElement:v},$e=function(e){return pt.call(e.ownerDocument||e,e,ae.SHOW_ELEMENT|ae.SHOW_COMMENT|ae.SHOW_TEXT,null,!1)},St=function(e){return e instanceof lt&&(typeof e.nodeName!="string"||typeof e.textContent!="string"||typeof e.removeChild!="function"||!(e.attributes instanceof ot)||typeof e.removeAttribute!="function"||typeof e.setAttribute!="function"||typeof e.namespaceURI!="string"||typeof e.insertBefore!="function")},z=function(e){return(typeof M=="undefined"?"undefined":W(M))==="object"?e instanceof M:e&&(typeof e=="undefined"?"undefined":W(e))==="object"&&typeof e.nodeType=="number"&&typeof e.nodeName=="string"},b=function(e,t,r){!E[e]||It(E[e],function(u){u.call(n,t,r,U)})},Ye=function(e){var t=void 0;if(b("beforeSanitizeElements",e,null),St(e)||Qe(e.nodeName,/[\u0080-\uFFFF]/))return y(e),!0;var r=P(e.nodeName);if(b("uponSanitizeElement",e,{tagName:r,allowedTags:p}),!z(e.firstElementChild)&&(!z(e.content)||!z(e.content.firstElementChild))&&A(/<[/\w]/g,e.innerHTML)&&A(/<[/\w]/g,e.textContent)||r==="select"&&A(/<template/i,e.innerHTML))return y(e),!0;if(!p[r]||q[r]){if(de&&!k[r]){var u=ne(e)||e.parentNode,d=ct(e)||e.childNodes;if(d&&u)for(var v=d.length,h=v-1;h>=0;--h)u.insertBefore(ft(d[h],!0),mt(e))}return!q[r]&&je(r)&&(f.tagNameCheck instanceof RegExp&&A(f.tagNameCheck,r)||f.tagNameCheck instanceof Function&&f.tagNameCheck(r))?!1:(y(e),!0)}return e instanceof Y&&!bt(e)||(r==="noscript"||r==="noembed")&&A(/<\/no(script|embed)/i,e.innerHTML)?(y(e),!0):(w&&e.nodeType===3&&(t=e.textContent,t=D(t,le," "),t=D(t,se," "),e.textContent!==t&&(B(n.removed,{element:e.cloneNode()}),e.textContent=t)),b("afterSanitizeElements",e,null),!1)},Ve=function(e,t,r){if(xe&&(t==="id"||t==="name")&&(r in s||r in yt))return!1;if(!(me&&!fe[t]&&A(Tt,t))){if(!(Ce&&A(At,t))){if(!m[t]||fe[t]){if(!(je(e)&&(f.tagNameCheck instanceof RegExp&&A(f.tagNameCheck,e)||f.tagNameCheck instanceof Function&&f.tagNameCheck(e))&&(f.attributeNameCheck instanceof RegExp&&A(f.attributeNameCheck,t)||f.attributeNameCheck instanceof Function&&f.attributeNameCheck(t))||t==="is"&&f.allowCustomizedBuiltInElements&&(f.tagNameCheck instanceof RegExp&&A(f.tagNameCheck,r)||f.tagNameCheck instanceof Function&&f.tagNameCheck(r))))return!1}else if(!ve[t]){if(!A(ue,D(r,Le,""))){if(!((t==="src"||t==="xlink:href"||t==="href")&&e!=="script"&&xt(r,"data:")===0&&Fe[e])){if(!(Ie&&!A(_t,D(r,Le,"")))){if(r)return!1}}}}}}return!0},je=function(e){return e.indexOf("-")>0},qe=function(e){var t=void 0,r=void 0,u=void 0,d=void 0;b("beforeSanitizeAttributes",e,null);var v=e.attributes;if(!!v){var h={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:m};for(d=v.length;d--;){t=v[d];var S=t,G=S.name,Xe=S.namespaceURI;if(r=kt(t.value),u=P(G),h.attrName=u,h.attrValue=r,h.keepAttr=!0,h.forceKeepAttr=void 0,b("uponSanitizeAttribute",e,h),r=h.attrValue,!h.forceKeepAttr&&(Be(G,e),!!h.keepAttr)){if(A(/\/>/i,r)){Be(G,e);continue}w&&(r=D(r,le," "),r=D(r,se," "));var Ot=P(e.nodeName);if(!!Ve(Ot,u,r))try{Xe?e.setAttributeNS(Xe,G,r):e.setAttribute(G,r),Je(n.removed)}catch{}}}b("afterSanitizeAttributes",e,null)}},Rt=function i(e){var t=void 0,r=$e(e);for(b("beforeSanitizeShadowDOM",e,null);t=r.nextNode();)b("uponSanitizeShadowNode",t,null),!Ye(t)&&(t.content instanceof c&&i(t.content),qe(t));b("afterSanitizeShadowDOM",e,null)};return n.sanitize=function(i,e){var t=void 0,r=void 0,u=void 0,d=void 0,v=void 0;if(Ae=!i,Ae&&(i="<!-->"),typeof i!="string"&&!z(i)){if(typeof i.toString!="function")throw et("toString is not a function");if(i=i.toString(),typeof i!="string")throw et("dirty is not a string, aborting")}if(!n.isSupported){if(W(a.toStaticHTML)==="object"||typeof a.toStaticHTML=="function"){if(typeof i=="string")return a.toStaticHTML(i);if(z(i))return a.toStaticHTML(i.outerHTML)}return i}if(ce||_e(e),n.removed=[],typeof i=="string"&&(H=!1),!H)if(i instanceof M)t=We("<!---->"),r=t.ownerDocument.importNode(i,!0),r.nodeType===1&&r.nodeName==="BODY"||r.nodeName==="HTML"?t=r:t.appendChild(r);else{if(!I&&!w&&!C&&i.indexOf("<")===-1)return O&&K?O.createHTML(i):i;if(t=We(i),!t)return I?null:Ne}t&&pe&&y(t.firstChild);for(var h=$e(H?i:t);u=h.nextNode();)u.nodeType===3&&u===d||Ye(u)||(u.content instanceof c&&Rt(u.content),qe(u),d=u);if(d=null,H)return i;if(I){if(X)for(v=dt.call(t.ownerDocument);t.firstChild;)v.appendChild(t.firstChild);else v=t;return m.shadowroot&&(v=ht.call(o,v,!0)),v}var S=C?t.outerHTML:t.innerHTML;return w&&(S=D(S,le," "),S=D(S,se," ")),O&&K?O.createHTML(S):S},n.setConfig=function(i){_e(i),ce=!0},n.clearConfig=function(){U=null,ce=!1},n.isValidAttribute=function(i,e,t){U||_e({});var r=P(i),u=P(e);return Ve(r,u,t)},n.addHook=function(i,e){typeof e=="function"&&(E[i]=E[i]||[],B(E[i],e))},n.removeHook=function(i){E[i]&&Je(E[i])},n.removeHooks=function(i){E[i]&&(E[i]=[])},n.removeAllHooks=function(){E={}},n}var Xt=it();export{Xt as default};
