"use strict";var SubwayGame=(()=>{var Cm=Object.defineProperty;var Pm=(s,e,t)=>e in s?Cm(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var H=(s,e,t)=>Pm(s,typeof e!="symbol"?e+"":e,t);var Jd=0,mh=1,Zd=2;var bo=1,nl=2,dr=3,Dn=0,gn=1,an=2,ys=0,fr=1,Xi=2,gh=3,xh=4,$d=5;var vs=100,jd=101,Qd=102,ef=103,tf=104,nf=200,sf=201,rf=202,of=203,_h=204,yh=205,af=206,lf=207,cf=208,hf=209,uf=210,df=211,ff=212,pf=213,mf=214,Ea=0,Ta=1,wa=2,Xs=3,Aa=4,Ra=5,Ca=6,Pa=7,il=0,gf=1,xf=2,ni=0,vh=1,Mh=2,bh=3,So=4,Sh=5,Eh=6,Th=7,nh="attached",_f="detached",wh=300,Ms=301,pr=302,sl=303,rl=304,jn=1e3,Cn=1001,qs=1002,Ft=1003,ol=1004;var bs=1005;var Bt=1006,mr=1007;var yn=1008;var vn=1009,Ah=1010,Rh=1011,gr=1012,al=1013,Xn=1014,Tn=1015,qn=1016,ll=1017,cl=1018,Ss=1020,Ch=35902,Ph=35899,Ih=1021,Lh=1022,Un=1023,gi=1026,Ti=1027,hl=1028,ul=1029,qi=1030,dl=1031;var fl=1033,Eo=33776,To=33777,wo=33778,Ao=33779,pl=35840,ml=35841,gl=35842,xl=35843,_l=36196,yl=37492,vl=37496,Ml=37488,bl=37489,Ro=37490,Sl=37491,El=37808,Tl=37809,wl=37810,Al=37811,Rl=37812,Cl=37813,Pl=37814,Il=37815,Ll=37816,Nl=37817,Dl=37818,Ul=37819,Ol=37820,Fl=37821,Bl=36492,Hl=36494,kl=36495,zl=36283,Gl=36284,Co=36285,Vl=36286,Wl=2200,yf=2201,vf=2202,ls=2300,cs=2301,ba=2302,ih=2303,ss=2400,rs=2401,Hr=2402,Xl=2500,Mf=2501,Nh=0,Po=1,xr=2,bf=3200;var Io=0,Sf=1,wi="",Pt="srgb",dn="srgb-linear",kr="linear",vt="srgb";var Sa=7680;var Ef=519,Tf=512,wf=513,Af=514,Dh=515,Rf=516,Cf=517,Uh=518,Oh=519,Fh=35044,ql=35048;var Bh="300 es",Pn=2e3,Ys=2001;function Im(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function Lm(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function Ks(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function Pf(){let s=Ks("canvas");return s.style.display="block",s}var id={},Js=null;function zr(...s){let e="THREE."+s.shift();Js?Js("log",e,...s):console.log(e,...s)}function If(s){let e=s[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=s[1];t&&t.isStackTrace?s[0]+=" "+t.getLocation():s[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return s}function Oe(...s){s=If(s);let e="THREE."+s.shift();if(Js)Js("warn",e,...s);else{let t=s[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...s)}}function Ye(...s){s=If(s);let e="THREE."+s.shift();if(Js)Js("error",e,...s);else{let t=s[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...s)}}function as(...s){let e=s.join(" ");e in id||(id[e]=!0,Oe(...s))}function Lf(s,e,t){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}var Nf={[Ea]:Ea,[wa]:Ca,[Aa]:Aa,[Xs]:Ra,[Ta]:Ta,[Ca]:wa,[Pa]:Pa,[Ra]:Xs},Wn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let i=n[e];if(i!==void 0){let r=i.indexOf(t);r!==-1&&i.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let i=n.slice(0);for(let r=0,o=i.length;r<o;r++)i[r].call(this,e);e.target=null}}},rn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],sd=1234567,Ur=Math.PI/180,hs=180/Math.PI;function Yn(){let s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(rn[s&255]+rn[s>>8&255]+rn[s>>16&255]+rn[s>>24&255]+"-"+rn[e&255]+rn[e>>8&255]+"-"+rn[e>>16&15|64]+rn[e>>24&255]+"-"+rn[t&63|128]+rn[t>>8&255]+"-"+rn[t>>16&255]+rn[t>>24&255]+rn[n&255]+rn[n>>8&255]+rn[n>>16&255]+rn[n>>24&255]).toLowerCase()}function rt(s,e,t){return Math.max(e,Math.min(t,s))}function Hh(s,e){return(s%e+e)%e}function Nm(s,e,t,n,i){return n+(s-e)*(i-n)/(t-e)}function Dm(s,e,t){return s!==e?(t-s)/(e-s):0}function Or(s,e,t){return(1-t)*s+t*e}function Um(s,e,t,n){return Or(s,e,1-Math.exp(-t*n))}function Om(s,e=1){return e-Math.abs(Hh(s,e*2)-e)}function Fm(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function Bm(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function Hm(s,e){return s+Math.floor(Math.random()*(e-s+1))}function km(s,e){return s+Math.random()*(e-s)}function zm(s){return s*(.5-Math.random())}function Gm(s){s!==void 0&&(sd=s);let e=sd+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Vm(s){return s*Ur}function Wm(s){return s*hs}function Xm(s){return s>0&&Number.isInteger(s)&&2**Math.round(Math.log2(s))===s}function qm(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function kh(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function Ym(s,e,t,n,i){let r=Math.cos,o=Math.sin,a=r(t/2),l=o(t/2),c=r((e+n)/2),h=o((e+n)/2),u=r((e-n)/2),d=o((e-n)/2),f=r((n-e)/2),p=o((n-e)/2);switch(i){case"XYX":s.set(a*h,l*u,l*d,a*c);break;case"YZY":s.set(l*d,a*h,l*u,a*c);break;case"ZXZ":s.set(l*u,l*d,a*h,a*c);break;case"XZX":s.set(a*h,l*p,l*f,a*c);break;case"YXY":s.set(l*f,a*h,l*p,a*c);break;case"ZYZ":s.set(l*p,l*f,a*h,a*c);break;default:Oe("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Yl(s){switch(s.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function zh(s,e){if(e.constructor===Float32Array)return s;let t=Yl(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(s/t,-1)}function Gh(s,e){if(e.constructor===Float32Array)return s;let t=Yl(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(s*t)}var Kl={DEG2RAD:Ur,RAD2DEG:hs,generateUUID:Yn,clamp:rt,euclideanModulo:Hh,mapLinear:Nm,inverseLerp:Dm,lerp:Or,damp:Um,pingpong:Om,smoothstep:Fm,smootherstep:Bm,randInt:Hm,randFloat:km,randFloatSpread:zm,seededRandom:Gm,degToRad:Vm,radToDeg:Wm,isPowerOfTwo:Xm,ceilPowerOfTwo:qm,floorPowerOfTwo:kh,setQuaternionFromProperEuler:Ym,normalize:Gh,denormalize:zh},Kh=class Kh{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=rt(this.x,e.x,t.x),this.y=rt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=rt(this.x,e,t),this.y=rt(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(rt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(rt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),i=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*i+e.x,this.y=r*i+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Kh.prototype.isVector2=!0;var ye=Kh,Ot=class{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,r,o,a){let l=n[i+0],c=n[i+1],h=n[i+2],u=n[i+3],d=r[o+0],f=r[o+1],p=r[o+2],y=r[o+3];if(u!==y||l!==d||c!==f||h!==p){let g=l*d+c*f+h*p+u*y;g<0&&(d=-d,f=-f,p=-p,y=-y,g=-g);let m=1-a;if(g<.9995){let b=Math.acos(g),T=Math.sin(b);m=Math.sin(m*b)/T,a=Math.sin(a*b)/T,l=l*m+d*a,c=c*m+f*a,h=h*m+p*a,u=u*m+y*a}else{l=l*m+d*a,c=c*m+f*a,h=h*m+p*a,u=u*m+y*a;let b=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=b,c*=b,h*=b,u*=b}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,r,o){let a=n[i],l=n[i+1],c=n[i+2],h=n[i+3],u=r[o],d=r[o+1],f=r[o+2],p=r[o+3];return e[t]=a*p+h*u+l*f-c*d,e[t+1]=l*p+h*d+c*u-a*f,e[t+2]=c*p+h*f+a*d-l*u,e[t+3]=h*p-a*u-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,i=e._y,r=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(i/2),u=a(r/2),d=l(n/2),f=l(i/2),p=l(r/2);switch(o){case"XYZ":this._x=d*h*u+c*f*p,this._y=c*f*u-d*h*p,this._z=c*h*p+d*f*u,this._w=c*h*u-d*f*p;break;case"YXZ":this._x=d*h*u+c*f*p,this._y=c*f*u-d*h*p,this._z=c*h*p-d*f*u,this._w=c*h*u+d*f*p;break;case"ZXY":this._x=d*h*u-c*f*p,this._y=c*f*u+d*h*p,this._z=c*h*p+d*f*u,this._w=c*h*u-d*f*p;break;case"ZYX":this._x=d*h*u-c*f*p,this._y=c*f*u+d*h*p,this._z=c*h*p-d*f*u,this._w=c*h*u+d*f*p;break;case"YZX":this._x=d*h*u+c*f*p,this._y=c*f*u+d*h*p,this._z=c*h*p-d*f*u,this._w=c*h*u-d*f*p;break;case"XZY":this._x=d*h*u-c*f*p,this._y=c*f*u-d*h*p,this._z=c*h*p+d*f*u,this._w=c*h*u+d*f*p;break;default:Oe("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],i=t[4],r=t[8],o=t[1],a=t[5],l=t[9],c=t[2],h=t[6],u=t[10],d=n+a+u;if(d>0){let f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(o-i)*f}else if(n>a&&n>u){let f=2*Math.sqrt(1+n-a-u);this._w=(h-l)/f,this._x=.25*f,this._y=(i+o)/f,this._z=(r+c)/f}else if(a>u){let f=2*Math.sqrt(1+a-n-u);this._w=(r-c)/f,this._x=(i+o)/f,this._y=.25*f,this._z=(l+h)/f}else{let f=2*Math.sqrt(1+u-n-a);this._w=(o-i)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(rt(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,i=e._y,r=e._z,o=e._w,a=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+o*a+i*c-r*l,this._y=i*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-i*a,this._w=o*h-n*a-i*l-r*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,i=e._y,r=e._z,o=e._w,a=this.dot(e);a<0&&(n=-n,i=-i,r=-r,o=-o,a=-a);let l=1-t;if(a<.9995){let c=Math.acos(a),h=Math.sin(c);l=Math.sin(l*c)/h,t=Math.sin(t*c)/h,this._x=this._x*l+n*t,this._y=this._y*l+i*t,this._z=this._z*l+r*t,this._w=this._w*l+o*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+i*t,this._z=this._z*l+r*t,this._w=this._w*l+o*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},Jh=class Jh{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(rd.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(rd.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*i,this.y=r[1]*t+r[4]*n+r[7]*i,this.z=r[2]*t+r[5]*n+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*i+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*i+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*i+r[14])*o,this}applyQuaternion(e){let t=this.x,n=this.y,i=this.z,r=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*i-a*n),h=2*(a*t-r*i),u=2*(r*n-o*t);return this.x=t+l*c+o*u-a*h,this.y=n+l*h+a*c-r*u,this.z=i+l*u+r*h-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i,this.y=r[1]*t+r[5]*n+r[9]*i,this.z=r[2]*t+r[6]*n+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=rt(this.x,e.x,t.x),this.y=rt(this.y,e.y,t.y),this.z=rt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=rt(this.x,e,t),this.y=rt(this.y,e,t),this.z=rt(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(rt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,i=e.y,r=e.z,o=t.x,a=t.y,l=t.z;return this.x=i*l-r*a,this.y=r*o-n*l,this.z=n*a-i*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Cc.copy(this).projectOnVector(e),this.sub(Cc)}reflect(e){return this.sub(Cc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(rt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Jh.prototype.isVector3=!0;var N=Jh,Cc=new N,rd=new Ot,Zh=class Zh{constructor(e,t,n,i,r,o,a,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,o,a,l,c)}set(e,t,n,i,r,o,a,l,c){let h=this.elements;return h[0]=e,h[1]=i,h[2]=a,h[3]=t,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],f=n[5],p=n[8],y=i[0],g=i[3],m=i[6],b=i[1],T=i[4],M=i[7],w=i[2],v=i[5],x=i[8];return r[0]=o*y+a*b+l*w,r[3]=o*g+a*T+l*v,r[6]=o*m+a*M+l*x,r[1]=c*y+h*b+u*w,r[4]=c*g+h*T+u*v,r[7]=c*m+h*M+u*x,r[2]=d*y+f*b+p*w,r[5]=d*g+f*T+p*v,r[8]=d*m+f*M+p*x,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8];return t*o*h-t*a*c-n*r*h+n*a*l+i*r*c-i*o*l}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=h*o-a*c,d=a*l-h*r,f=c*r-o*l,p=t*u+n*d+i*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let y=1/p;return e[0]=u*y,e[1]=(i*c-h*n)*y,e[2]=(a*n-i*o)*y,e[3]=d*y,e[4]=(h*t-i*l)*y,e[5]=(i*r-a*t)*y,e[6]=f*y,e[7]=(n*l-c*t)*y,e[8]=(o*t-n*r)*y,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,r,o,a){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-i*c,i*l,-i*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return as("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Pc.makeScale(e,t)),this}rotate(e){return as("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Pc.makeRotation(-e)),this}translate(e,t){return as("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Pc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};Zh.prototype.isMatrix3=!0;var Je=Zh,Pc=new Je,od=new Je().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ad=new Je().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Km(){let s={enabled:!0,workingColorSpace:dn,spaces:{},convert:function(i,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===vt&&(i.r=mi(i.r),i.g=mi(i.g),i.b=mi(i.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(i.applyMatrix3(this.spaces[r].toXYZ),i.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===vt&&(i.r=Ws(i.r),i.g=Ws(i.g),i.b=Ws(i.b))),i},workingToColorSpace:function(i,r){return this.convert(i,this.workingColorSpace,r)},colorSpaceToWorking:function(i,r){return this.convert(i,r,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===wi?kr:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,r=this.workingColorSpace){return i.fromArray(this.spaces[r].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,r,o){return i.copy(this.spaces[o].fromXYZ).multiply(this.spaces[r].toXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return s.define({[dn]:{primaries:e,whitePoint:n,transfer:kr,toXYZ:od,fromXYZ:ad,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Pt},outputColorSpaceConfig:{drawingBufferColorSpace:Pt}},[Pt]:{primaries:e,whitePoint:n,transfer:vt,toXYZ:od,fromXYZ:ad,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Pt}}}),s}var st=Km();function mi(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Ws(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}var Ps,Ia=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Ps===void 0&&(Ps=Ks("canvas")),Ps.width=e.width,Ps.height=e.height;let i=Ps.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=Ps}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Ks("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let i=n.getImageData(0,0,e.width,e.height),r=i.data;for(let o=0;o<r.length;o++)r[o]=mi(r[o]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(mi(t[n]/255)*255):t[n]=mi(t[n]);return{data:t,width:e.width,height:e.height}}else return Oe("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Jm=0,Zs=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Jm++}),this.uuid=Yn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width||0,t.height||0,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?r.push(Ic(i[o].image)):r.push(Ic(i[o]))}else r=Ic(i);n.url=r}return t||(e.images[this.uuid]=n),n}};function Ic(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Ia.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(Oe("Texture: Unable to serialize Texture."),{})}var Zm=0,Lc=new N,Wt=class s extends Wn{constructor(e=s.DEFAULT_IMAGE,t=s.DEFAULT_MAPPING,n=Cn,i=Cn,r=Bt,o=yn,a=Un,l=vn,c=s.DEFAULT_ANISOTROPY,h=wi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Zm++}),this.uuid=Yn(),this.name="",this.source=new Zs(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new ye(0,0),this.repeat=new ye(1,1),this.center=new ye(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Je,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(Lc).x}get height(){return this.source.getSize(Lc).y}get depth(){return this.source.getSize(Lc).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.mipmapsAutoUpdate=e.mipmapsAutoUpdate,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isPMREMTexture=e.isPMREMTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){Oe(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){Oe(`Texture.setValues(): property '${t}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==wh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case jn:e.x=e.x-Math.floor(e.x);break;case Cn:e.x=e.x<0?0:1;break;case qs:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case jn:e.y=e.y-Math.floor(e.y);break;case Cn:e.y=e.y<0?0:1;break;case qs:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Wt.DEFAULT_IMAGE=null;Wt.DEFAULT_MAPPING=wh;Wt.DEFAULT_ANISOTROPY=1;var $h=class $h{constructor(e=0,t=0,n=0,i=1){this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*i+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*i+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*i+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,r,l=e.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],p=l[9],y=l[2],g=l[6],m=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-y)<.01&&Math.abs(p-g)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+y)<.1&&Math.abs(p+g)<.1&&Math.abs(c+f+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let T=(c+1)/2,M=(f+1)/2,w=(m+1)/2,v=(h+d)/4,x=(u+y)/4,_=(p+g)/4;return T>M&&T>w?T<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(T),i=v/n,r=x/n):M>w?M<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(M),n=v/i,r=_/i):w<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(w),n=x/r,i=_/r),this.set(n,i,r,t),this}let b=Math.sqrt((g-p)*(g-p)+(u-y)*(u-y)+(d-h)*(d-h));return Math.abs(b)<.001&&(b=1),this.x=(g-p)/b,this.y=(u-y)/b,this.z=(d-h)/b,this.w=Math.acos((c+f+m-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=rt(this.x,e.x,t.x),this.y=rt(this.y,e.y,t.y),this.z=rt(this.z,e.z,t.z),this.w=rt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=rt(this.x,e,t),this.y=rt(this.y,e,t),this.z=rt(this.z,e,t),this.w=rt(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(rt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};$h.prototype.isVector4=!0;var bt=$h,La=class extends Wn{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Bt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new bt(0,0,e,t),this.scissorTest=!1,this.viewport=new bt(0,0,e,t),this.textures=[];let i=n.count;for(let r=0;r<i;r++)this.textures[r]=new Wt({width:e,height:t,depth:n.depth}),this.textures[r].isRenderTargetTexture=!0,this.textures[r].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:Bt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.mipmapsAutoUpdate!==void 0&&(t.mipmapsAutoUpdate=e.mipmapsAutoUpdate),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isData3DTexture!==!0&&(this.textures[i].isArrayTexture=this.textures[i].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let i=Object.assign({},e.textures[t].image);this.textures[t].source=new Zs(i)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;else this.depthTexture=null;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},Sn=class extends La{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Gr=class extends Wt{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Ft,this.minFilter=Ft,this.wrapR=Cn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Na=class extends Wt{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Ft,this.minFilter=Ft,this.wrapR=Cn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}};var tl=class tl{constructor(e,t,n,i,r,o,a,l,c,h,u,d,f,p,y,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,o,a,l,c,h,u,d,f,p,y,g)}set(e,t,n,i,r,o,a,l,c,h,u,d,f,p,y,g){let m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=i,m[1]=r,m[5]=o,m[9]=a,m[13]=l,m[2]=c,m[6]=h,m[10]=u,m[14]=d,m[3]=f,m[7]=p,m[11]=y,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new tl().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,i=1/Is.setFromMatrixColumn(e,0).length(),r=1/Is.setFromMatrixColumn(e,1).length(),o=1/Is.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,i=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){let d=o*h,f=o*u,p=a*h,y=a*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=f+p*c,t[5]=d-y*c,t[9]=-a*l,t[2]=y-d*c,t[6]=p+f*c,t[10]=o*l}else if(e.order==="YXZ"){let d=l*h,f=l*u,p=c*h,y=c*u;t[0]=d+y*a,t[4]=p*a-f,t[8]=o*c,t[1]=o*u,t[5]=o*h,t[9]=-a,t[2]=f*a-p,t[6]=y+d*a,t[10]=o*l}else if(e.order==="ZXY"){let d=l*h,f=l*u,p=c*h,y=c*u;t[0]=d-y*a,t[4]=-o*u,t[8]=p+f*a,t[1]=f+p*a,t[5]=o*h,t[9]=y-d*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){let d=o*h,f=o*u,p=a*h,y=a*u;t[0]=l*h,t[4]=p*c-f,t[8]=d*c+y,t[1]=l*u,t[5]=y*c+d,t[9]=f*c-p,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){let d=o*l,f=o*c,p=a*l,y=a*c;t[0]=l*h,t[4]=y-d*u,t[8]=p*u+f,t[1]=u,t[5]=o*h,t[9]=-a*h,t[2]=-c*h,t[6]=f*u+p,t[10]=d-y*u}else if(e.order==="XZY"){let d=o*l,f=o*c,p=a*l,y=a*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=d*u+y,t[5]=o*h,t[9]=f*u-p,t[2]=p*u-f,t[6]=a*h,t[10]=y*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose($m,e,jm)}lookAt(e,t,n){let i=this.elements;return Mn.subVectors(e,t),Mn.lengthSq()===0&&(Mn.z=1),Mn.normalize(),Ui.crossVectors(n,Mn),Ui.lengthSq()===0&&(Math.abs(n.z)===1?Mn.x+=1e-4:Mn.z+=1e-4,Mn.normalize(),Ui.crossVectors(n,Mn)),Ui.normalize(),Jo.crossVectors(Mn,Ui),i[0]=Ui.x,i[4]=Jo.x,i[8]=Mn.x,i[1]=Ui.y,i[5]=Jo.y,i[9]=Mn.y,i[2]=Ui.z,i[6]=Jo.z,i[10]=Mn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],f=n[13],p=n[2],y=n[6],g=n[10],m=n[14],b=n[3],T=n[7],M=n[11],w=n[15],v=i[0],x=i[4],_=i[8],P=i[12],R=i[1],C=i[5],D=i[9],q=i[13],I=i[2],z=i[6],Y=i[10],V=i[14],B=i[3],F=i[7],K=i[11],Z=i[15];return r[0]=o*v+a*R+l*I+c*B,r[4]=o*x+a*C+l*z+c*F,r[8]=o*_+a*D+l*Y+c*K,r[12]=o*P+a*q+l*V+c*Z,r[1]=h*v+u*R+d*I+f*B,r[5]=h*x+u*C+d*z+f*F,r[9]=h*_+u*D+d*Y+f*K,r[13]=h*P+u*q+d*V+f*Z,r[2]=p*v+y*R+g*I+m*B,r[6]=p*x+y*C+g*z+m*F,r[10]=p*_+y*D+g*Y+m*K,r[14]=p*P+y*q+g*V+m*Z,r[3]=b*v+T*R+M*I+w*B,r[7]=b*x+T*C+M*z+w*F,r[11]=b*_+T*D+M*Y+w*K,r[15]=b*P+T*q+M*V+w*Z,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],i=e[8],r=e[12],o=e[1],a=e[5],l=e[9],c=e[13],h=e[2],u=e[6],d=e[10],f=e[14],p=e[3],y=e[7],g=e[11],m=e[15],b=l*f-c*d,T=a*f-c*u,M=a*d-l*u,w=o*f-c*h,v=o*d-l*h,x=o*u-a*h;return t*(y*b-g*T+m*M)-n*(p*b-g*w+m*v)+i*(p*T-y*w+m*x)-r*(p*M-y*v+g*x)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],i=e[8],r=e[1],o=e[5],a=e[9],l=e[2],c=e[6],h=e[10];return t*(o*h-a*c)-n*(r*h-a*l)+i*(r*c-o*l)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=e[9],d=e[10],f=e[11],p=e[12],y=e[13],g=e[14],m=e[15],b=t*a-n*o,T=t*l-i*o,M=t*c-r*o,w=n*l-i*a,v=n*c-r*a,x=i*c-r*l,_=h*y-u*p,P=h*g-d*p,R=h*m-f*p,C=u*g-d*y,D=u*m-f*y,q=d*m-f*g,I=b*q-T*D+M*C+w*R-v*P+x*_;if(I===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let z=1/I;return e[0]=(a*q-l*D+c*C)*z,e[1]=(i*D-n*q-r*C)*z,e[2]=(y*x-g*v+m*w)*z,e[3]=(d*v-u*x-f*w)*z,e[4]=(l*R-o*q-c*P)*z,e[5]=(t*q-i*R+r*P)*z,e[6]=(g*M-p*x-m*T)*z,e[7]=(h*x-d*M+f*T)*z,e[8]=(o*D-a*R+c*_)*z,e[9]=(n*R-t*D-r*_)*z,e[10]=(p*v-y*M+m*b)*z,e[11]=(u*M-h*v-f*b)*z,e[12]=(a*P-o*C-l*_)*z,e[13]=(t*C-n*P+i*_)*z,e[14]=(y*T-p*w-g*b)*z,e[15]=(h*w-u*T+d*b)*z,this}scale(e){let t=this.elements,n=e.x,i=e.y,r=e.z;return t[0]*=n,t[4]*=i,t[8]*=r,t[1]*=n,t[5]*=i,t[9]*=r,t[2]*=n,t[6]*=i,t[10]*=r,t[3]*=n,t[7]*=i,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),i=Math.sin(t),r=1-n,o=e.x,a=e.y,l=e.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,h*a+n,h*l-i*o,0,c*l-i*a,h*l+i*o,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,r,o){return this.set(1,n,r,0,e,1,o,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){let i=this.elements,r=t._x,o=t._y,a=t._z,l=t._w,c=r+r,h=o+o,u=a+a,d=r*c,f=r*h,p=r*u,y=o*h,g=o*u,m=a*u,b=l*c,T=l*h,M=l*u,w=n.x,v=n.y,x=n.z;return i[0]=(1-(y+m))*w,i[1]=(f+M)*w,i[2]=(p-T)*w,i[3]=0,i[4]=(f-M)*v,i[5]=(1-(d+m))*v,i[6]=(g+b)*v,i[7]=0,i[8]=(p+T)*x,i[9]=(g-b)*x,i[10]=(1-(d+y))*x,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){let i=this.elements;e.x=i[12],e.y=i[13],e.z=i[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let o=Is.set(i[0],i[1],i[2]).length(),a=Is.set(i[4],i[5],i[6]).length(),l=Is.set(i[8],i[9],i[10]).length();r<0&&(o=-o),kn.copy(this);let c=1/o,h=1/a,u=1/l;return kn.elements[0]*=c,kn.elements[1]*=c,kn.elements[2]*=c,kn.elements[4]*=h,kn.elements[5]*=h,kn.elements[6]*=h,kn.elements[8]*=u,kn.elements[9]*=u,kn.elements[10]*=u,t.setFromRotationMatrix(kn),n.x=o,n.y=a,n.z=l,this}makePerspective(e,t,n,i,r,o,a=Pn,l=!1){let c=this.elements,h=2*r/(t-e),u=2*r/(n-i),d=(t+e)/(t-e),f=(n+i)/(n-i),p,y;if(l)p=r/(o-r),y=o*r/(o-r);else if(a===Pn)p=-(o+r)/(o-r),y=-2*o*r/(o-r);else if(a===Ys)p=-o/(o-r),y=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=y,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,i,r,o,a=Pn,l=!1){let c=this.elements,h=2/(t-e),u=2/(n-i),d=-(t+e)/(t-e),f=-(n+i)/(n-i),p,y;if(l)p=1/(o-r),y=o/(o-r);else if(a===Pn)p=-2/(o-r),y=-(o+r)/(o-r);else if(a===Ys)p=-1/(o-r),y=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=y,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};tl.prototype.isMatrix4=!0;var We=tl,Is=new N,kn=new We,$m=new N(0,0,0),jm=new N(1,1,1),Ui=new N,Jo=new N,Mn=new N,ld=new We,cd=new Ot,In=class s{constructor(e=0,t=0,n=0,i=s.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let i=e.elements,r=i[0],o=i[4],a=i[8],l=i[1],c=i[5],h=i[9],u=i[2],d=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(rt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-rt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(rt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-rt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(rt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-rt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:Oe("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return ld.makeRotationFromQuaternion(e),this.setFromRotationMatrix(ld,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return cd.setFromEuler(this),this.setFromQuaternion(cd,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};In.DEFAULT_ORDER="XYZ";var Vr=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Qm=0,hd=new N,Ls=new Ot,ci=new We,Zo=new N,Tr=new N,e0=new N,t0=new Ot,ud=new N(1,0,0),dd=new N(0,1,0),fd=new N(0,0,1),pd={type:"added"},n0={type:"removed"},Ns={type:"childadded",child:null},Nc={type:"childremoved",child:null},Rt=class s extends Wn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Qm++}),this.uuid=Yn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=s.DEFAULT_UP.clone();let e=new N,t=new In,n=new Ot,i=new N(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new We},normalMatrix:{value:new Je}}),this.matrix=new We,this.matrixWorld=new We,this.matrixAutoUpdate=s.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=s.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Vr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ls.setFromAxisAngle(e,t),this.quaternion.multiply(Ls),this}rotateOnWorldAxis(e,t){return Ls.setFromAxisAngle(e,t),this.quaternion.premultiply(Ls),this}rotateX(e){return this.rotateOnAxis(ud,e)}rotateY(e){return this.rotateOnAxis(dd,e)}rotateZ(e){return this.rotateOnAxis(fd,e)}translateOnAxis(e,t){return hd.copy(e).applyQuaternion(this.quaternion),this.position.add(hd.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(ud,e)}translateY(e){return this.translateOnAxis(dd,e)}translateZ(e){return this.translateOnAxis(fd,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ci.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Zo.copy(e):Zo.set(e,t,n);let i=this.parent;this.updateWorldMatrix(!0,!1),Tr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ci.lookAt(Tr,Zo,this.up):ci.lookAt(Zo,Tr,this.up),this.quaternion.setFromRotationMatrix(ci),i&&(ci.extractRotation(i.matrixWorld),Ls.setFromRotationMatrix(ci),this.quaternion.premultiply(Ls.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Ye("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(pd),Ns.child=e,this.dispatchEvent(Ns),Ns.child=null):Ye("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(n0),Nc.child=e,this.dispatchEvent(Nc),Nc.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ci.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ci.multiply(e.parent.matrixWorld)),e.applyMatrix4(ci),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(pd),Ns.child=e,this.dispatchEvent(Ns),Ns.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){let o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Tr,e,e0),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Tr,t0,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(e){e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,i=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*i,r[13]+=n-r[1]*t-r[5]*n-r[9]*i,r[14]+=i-r[2]*t-r[6]*n-r[10]*i}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,i.name=this.name,i.castShadow=this.castShadow,i.receiveShadow=this.receiveShadow,i.visible=this.visible,i.frustumCulled=this.frustumCulled,i.renderOrder=this.renderOrder,i.static=this.static,i.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.pivot!==null&&(i.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(i.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(i.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(a=>({...a})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let u=l[c];r(e.shapes,u)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(e.materials,this.material[l]));i.material=a}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];i.animations.push(r(e.animations,l))}}if(t){let a=o(e.geometries),l=o(e.materials),c=o(e.textures),h=o(e.images),u=o(e.shapes),d=o(e.skeletons),f=o(e.animations),p=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),p.length>0&&(n.nodes=p)}return n.object=i,n;function o(a){let l=[];for(let c in a){let h=a[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let i=e.children[n];this.add(i.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Rt.DEFAULT_UP=new N(0,1,0);Rt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Rt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Xe=class extends Rt{constructor(){super(),this.isGroup=!0,this.type="Group"}},i0={type:"move"},$s=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Xe,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Xe,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new N,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new N),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Xe,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new N,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new N,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,r=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(let y of e.hand.values()){let g=t.getJointPose(y,n),m=this._getHandJoint(c,y);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.quaternion,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}let h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,p=.005;c.inputState.pinching&&d>f+p?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-p&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.quaternion,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));a!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.quaternion,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(i0)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Xe;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Df={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Oi={h:0,s:0,l:0},$o={h:0,s:0,l:0};function Dc(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}var se=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Pt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,st.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=st.workingColorSpace){return this.r=e,this.g=t,this.b=n,st.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=st.workingColorSpace){if(e=Hh(e,1),t=rt(t,0,1),n=rt(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=Dc(o,r,e+1/3),this.g=Dc(o,r,e),this.b=Dc(o,r,e-1/3)}return st.colorSpaceToWorking(this,i),this}setStyle(e,t=Pt){function n(r){r!==void 0&&parseFloat(r)<1&&Oe("Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseFloat(r[1]))/100,Math.min(100,parseFloat(r[2]))/100,Math.min(100,parseFloat(r[3]))/100,t);break;case"hsl":case"hsla":if(r=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Oe("Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=i[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);Oe("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Pt){let n=Df[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Oe("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=mi(e.r),this.g=mi(e.g),this.b=mi(e.b),this}copyLinearToSRGB(e){return this.r=Ws(e.r),this.g=Ws(e.g),this.b=Ws(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Pt){return st.workingToColorSpace(on.copy(this),e),Math.round(rt(on.r*255,0,255))*65536+Math.round(rt(on.g*255,0,255))*256+Math.round(rt(on.b*255,0,255))}getHexString(e=Pt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=st.workingColorSpace){st.workingToColorSpace(on.copy(this),t);let n=on.r,i=on.g,r=on.b,o=Math.max(n,i,r),a=Math.min(n,i,r),l,c,h=(a+o)/2;if(a===o)l=0,c=0;else{let u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case n:l=(i-r)/u+(i<r?6:0);break;case i:l=(r-n)/u+2;break;case r:l=(n-i)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=st.workingColorSpace){return st.workingToColorSpace(on.copy(this),t),e.r=on.r,e.g=on.g,e.b=on.b,e}getStyle(e=Pt){st.workingToColorSpace(on.copy(this),e);let t=on.r,n=on.g,i=on.b;return e!==Pt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(Oi),this.setHSL(Oi.h+e,Oi.s+t,Oi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Oi),e.getHSL($o);let n=Or(Oi.h,$o.h,t),i=Or(Oi.s,$o.s,t),r=Or(Oi.l,$o.l,t);return this.setHSL(n,i,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,i=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*i,this.g=r[1]*t+r[4]*n+r[7]*i,this.b=r[2]*t+r[5]*n+r[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},on=new se;se.NAMES=Df;var Wr=class s{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new se(e),this.near=t,this.far=n}clone(){return new s(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},Xr=class extends Rt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new In,this.environmentIntensity=1,this.environmentRotation=new In,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),this.background=e.background!==null?e.background.clone():null,this.environment=e.environment!==null?e.environment.clone():null,this.fog=e.fog!==null?e.fog.clone():null,this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),this.overrideMaterial=e.overrideMaterial!==null?e.overrideMaterial.clone():null,this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},zn=new N,hi=new N,Uc=new N,ui=new N,Ds=new N,Us=new N,md=new N,Oc=new N,Fc=new N,Bc=new N,Hc=new bt,kc=new bt,zc=new bt,zi=class s{constructor(e=new N,t=new N,n=new N){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),zn.subVectors(e,t),i.cross(zn);let r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(e,t,n,i,r){zn.subVectors(i,t),hi.subVectors(n,t),Uc.subVectors(e,t);let o=zn.dot(zn),a=zn.dot(hi),l=zn.dot(Uc),c=hi.dot(hi),h=hi.dot(Uc),u=o*c-a*a;if(u===0)return r.set(0,0,0),null;let d=1/u,f=(c*l-a*h)*d,p=(o*h-a*l)*d;return r.set(1-f-p,p,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,ui)===null?!1:ui.x>=0&&ui.y>=0&&ui.x+ui.y<=1}static getInterpolation(e,t,n,i,r,o,a,l){return this.getBarycoord(e,t,n,i,ui)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,ui.x),l.addScaledVector(o,ui.y),l.addScaledVector(a,ui.z),l)}static getInterpolatedAttribute(e,t,n,i,r,o){return Hc.setScalar(0),kc.setScalar(0),zc.setScalar(0),Hc.fromBufferAttribute(e,t),kc.fromBufferAttribute(e,n),zc.fromBufferAttribute(e,i),o.setScalar(0),o.addScaledVector(Hc,r.x),o.addScaledVector(kc,r.y),o.addScaledVector(zc,r.z),o}static isFrontFacing(e,t,n,i){return zn.subVectors(n,t),hi.subVectors(e,t),zn.cross(hi).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return zn.subVectors(this.c,this.b),hi.subVectors(this.a,this.b),zn.cross(hi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return s.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return s.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,r){return s.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}containsPoint(e){return s.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return s.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,i=this.b,r=this.c,o,a;Ds.subVectors(i,n),Us.subVectors(r,n),Oc.subVectors(e,n);let l=Ds.dot(Oc),c=Us.dot(Oc);if(l<=0&&c<=0)return t.copy(n);Fc.subVectors(e,i);let h=Ds.dot(Fc),u=Us.dot(Fc);if(h>=0&&u<=h)return t.copy(i);let d=l*u-h*c;if(d<=0&&l>=0&&h<=0&&l-h>0)return o=l/(l-h),t.copy(n).addScaledVector(Ds,o);Bc.subVectors(e,r);let f=Ds.dot(Bc),p=Us.dot(Bc);if(p>=0&&f<=p)return t.copy(r);let y=f*c-l*p;if(y<=0&&c>=0&&p<=0)return a=c/(c-p),t.copy(n).addScaledVector(Us,a);let g=h*p-f*u;if(g<=0&&u-h>=0&&f-p>=0)return md.subVectors(r,i),a=(u-h)/(u-h+(f-p)),t.copy(i).addScaledVector(md,a);let m=1/(g+y+d);return o=y*m,a=d*m,t.copy(n).addScaledVector(Ds,o).addScaledVector(Us,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},fn=class{constructor(e=new N(1/0,1/0,1/0),t=new N(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Gn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Gn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Gn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0&&e.isBatchedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Gn):Gn.fromBufferAttribute(r,o),Gn.applyMatrix4(e.matrixWorld),this.expandByPoint(Gn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),jo.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),jo.copy(n.boundingBox)),jo.applyMatrix4(e.matrixWorld),this.union(jo)}let i=e.children;for(let r=0,o=i.length;r<o;r++)this.expandByObject(i[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Gn),Gn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(wr),Qo.subVectors(this.max,wr),Os.subVectors(e.a,wr),Fs.subVectors(e.b,wr),Bs.subVectors(e.c,wr),Fi.subVectors(Fs,Os),Bi.subVectors(Bs,Fs),es.subVectors(Os,Bs);let t=[0,-Fi.z,Fi.y,0,-Bi.z,Bi.y,0,-es.z,es.y,Fi.z,0,-Fi.x,Bi.z,0,-Bi.x,es.z,0,-es.x,-Fi.y,Fi.x,0,-Bi.y,Bi.x,0,-es.y,es.x,0];return!Gc(t,Os,Fs,Bs,Qo)||(t=[1,0,0,0,1,0,0,0,1],!Gc(t,Os,Fs,Bs,Qo))?!1:(ea.crossVectors(Fi,Bi),t=[ea.x,ea.y,ea.z],Gc(t,Os,Fs,Bs,Qo))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Gn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Gn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(di[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),di[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),di[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),di[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),di[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),di[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),di[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),di[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(di),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},di=[new N,new N,new N,new N,new N,new N,new N,new N],Gn=new N,jo=new fn,Os=new N,Fs=new N,Bs=new N,Fi=new N,Bi=new N,es=new N,wr=new N,Qo=new N,ea=new N,ts=new N;function Gc(s,e,t,n,i){for(let r=0,o=s.length-3;r<=o;r+=3){ts.fromArray(s,r);let a=i.x*Math.abs(ts.x)+i.y*Math.abs(ts.y)+i.z*Math.abs(ts.z),l=e.dot(ts),c=t.dot(ts),h=n.dot(ts);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}var Gt=new N,ta=new ye,s0=0,Zt=class extends Wn{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:s0++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Fh,this.updateRanges=[],this.gpuType=Tn,this.version=0,this._normalizationScale=e!==void 0?Yl(e):void 0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this._normalizationScale=e._normalizationScale,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)ta.fromBufferAttribute(this,t),ta.applyMatrix3(e),this.setXY(t,ta.x,ta.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Gt.fromBufferAttribute(this,t),Gt.applyMatrix3(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Gt.fromBufferAttribute(this,t),Gt.applyMatrix4(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Gt.fromBufferAttribute(this,t),Gt.applyNormalMatrix(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Gt.fromBufferAttribute(this,t),Gt.transformDirection(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=this._denormalize(n)),n}setComponent(e,t,n){return this.normalized&&(n=this._normalize(n)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=this._denormalize(t)),t}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=this._denormalize(t)),t}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=this._denormalize(t)),t}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=this._denormalize(t)),t}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),i=this._normalize(i)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),i=this._normalize(i),r=this._normalize(r)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(e){let t=this._normalizationScale;return t!==void 0?Math.max(e/t,-1):zh(e,this.array)}_normalize(e){let t=this._normalizationScale;return t!==void 0?Math.round(e*t):Gh(e,this.array)}};var qr=class extends Zt{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var Yr=class extends Zt{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var _t=class extends Zt{constructor(e,t,n){super(new Float32Array(e),t,n)}},r0=new fn,Ar=new N,Vc=new N,xn=class{constructor(e=new N,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):r0.setFromPoints(e).getCenter(n);let i=0;for(let r=0,o=e.length;r<o;r++)i=Math.max(i,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ar.subVectors(e,this.center);let t=Ar.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(Ar,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Vc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ar.copy(e.center).add(Vc)),this.expandByPoint(Ar.copy(e.center).sub(Vc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},o0=0,Rn=new We,Wc=new Rt,Hs=new N,bn=new fn,Rr=new fn,Jt=new N,Ut=class s extends Wn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:o0++}),this.uuid=Yn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Im(e)?Yr:qr)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Je().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Rn.makeRotationFromQuaternion(e),this.applyMatrix4(Rn),this}rotateX(e){return Rn.makeRotationX(e),this.applyMatrix4(Rn),this}rotateY(e){return Rn.makeRotationY(e),this.applyMatrix4(Rn),this}rotateZ(e){return Rn.makeRotationZ(e),this.applyMatrix4(Rn),this}translate(e,t,n){return Rn.makeTranslation(e,t,n),this.applyMatrix4(Rn),this}scale(e,t,n){return Rn.makeScale(e,t,n),this.applyMatrix4(Rn),this}lookAt(e){return Wc.lookAt(e),Wc.updateMatrix(),this.applyMatrix4(Wc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Hs).negate(),this.translate(Hs.x,Hs.y,Hs.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let i=0,r=e.length;i<r;i++){let o=e[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new _t(n,3))}else{let n=Math.min(e.length,t.count);for(let i=0;i<n;i++){let r=e[i];t.setXYZ(i,r.x,r.y,r.z||0)}e.length>t.count&&Oe("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new fn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ye("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new N(-1/0,-1/0,-1/0),new N(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){let r=t[n];bn.setFromBufferAttribute(r),this.morphTargetsRelative?(Jt.addVectors(this.boundingBox.min,bn.min),this.boundingBox.expandByPoint(Jt),Jt.addVectors(this.boundingBox.max,bn.max),this.boundingBox.expandByPoint(Jt)):(this.boundingBox.expandByPoint(bn.min),this.boundingBox.expandByPoint(bn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ye('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new xn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ye("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new N,1/0);return}if(e){let n=this.boundingSphere.center;if(bn.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){let a=t[r];Rr.setFromBufferAttribute(a),this.morphTargetsRelative?(Jt.addVectors(bn.min,Rr.min),bn.expandByPoint(Jt),Jt.addVectors(bn.max,Rr.max),bn.expandByPoint(Jt)):(bn.expandByPoint(Rr.min),bn.expandByPoint(Rr.max))}bn.getCenter(n);let i=0;for(let r=0,o=e.count;r<o;r++)Jt.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(Jt));if(t)for(let r=0,o=t.length;r<o;r++){let a=t[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Jt.fromBufferAttribute(a,c),l&&(Hs.fromBufferAttribute(e,c),Jt.add(Hs)),i=Math.max(i,n.distanceToSquared(Jt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&Ye('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Ye("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,i=t.normal,r=t.uv,o=this.getAttribute("tangent");(o===void 0||o.count!==n.count)&&(o=new Zt(new Float32Array(4*n.count),4),this.setAttribute("tangent",o));let a=[],l=[],c=new Uint8Array(n.count);for(let P=0;P<n.count;P++)a[P]=new N,l[P]=new N;let h=new N,u=new N,d=new N,f=new ye,p=new ye,y=new ye,g=new N,m=new N;function b(P,R,C){c[P]=c[R]=c[C]=1,h.fromBufferAttribute(n,P),u.fromBufferAttribute(n,R),d.fromBufferAttribute(n,C),f.fromBufferAttribute(r,P),p.fromBufferAttribute(r,R),y.fromBufferAttribute(r,C),u.sub(h),d.sub(h),p.sub(f),y.sub(f);let D=1/(p.x*y.y-y.x*p.y);isFinite(D)&&(g.copy(u).multiplyScalar(y.y).addScaledVector(d,-p.y).multiplyScalar(D),m.copy(d).multiplyScalar(p.x).addScaledVector(u,-y.x).multiplyScalar(D),a[P].add(g),a[R].add(g),a[C].add(g),l[P].add(m),l[R].add(m),l[C].add(m))}let T=this.groups;T.length===0&&(T=[{start:0,count:e.count}]);for(let P=0,R=T.length;P<R;++P){let C=T[P],D=C.start,q=C.count;for(let I=D,z=D+q;I<z;I+=3)b(e.getX(I+0),e.getX(I+1),e.getX(I+2))}let M=new N,w=new N,v=new N,x=new N;function _(P){v.fromBufferAttribute(i,P),x.copy(v);let R=a[P];M.copy(R),M.sub(v.multiplyScalar(v.dot(R))).normalize(),w.crossVectors(x,R);let D=w.dot(l[P])<0?-1:1;o.setXYZW(P,M.x,M.y,M.z,D)}for(let P=0,R=n.count;P<R;++P)c[P]&&_(P);this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new Zt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);let i=new N,r=new N,o=new N,a=new N,l=new N,c=new N,h=new N,u=new N;if(e)for(let d=0,f=e.count;d<f;d+=3){let p=e.getX(d+0),y=e.getX(d+1),g=e.getX(d+2);i.fromBufferAttribute(t,p),r.fromBufferAttribute(t,y),o.fromBufferAttribute(t,g),h.subVectors(o,r),u.subVectors(i,r),h.cross(u),a.fromBufferAttribute(n,p),l.fromBufferAttribute(n,y),c.fromBufferAttribute(n,g),a.add(h),l.add(h),c.add(h),n.setXYZ(p,a.x,a.y,a.z),n.setXYZ(y,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)i.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),h.subVectors(o,r),u.subVectors(i,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Jt.fromBufferAttribute(e,t),Jt.normalize(),e.setXYZ(t,Jt.x,Jt.y,Jt.z)}toNonIndexed(){function e(a,l){let c=a.array,h=a.itemSize,u=a.normalized,d=new c.constructor(l.length*h),f=0,p=0;for(let y=0,g=l.length;y<g;y++){a.isInterleavedBufferAttribute?f=l[y]*a.data.stride+a.offset:f=l[y]*h;for(let m=0;m<h;m++)d[p++]=c[f++]}return new Zt(d,h,u)}if(this.index===null)return Oe("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new s,n=this.index.array,i=this.attributes;for(let a in i){let l=i[a],c=e(l,n);t.setAttribute(a,c)}let r=this.morphAttributes;for(let a in r){let l=[],c=r[a];for(let h=0,u=c.length;h<u;h++){let d=c[h],f=e(d,n);l.push(f)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let c=n[l];e.data.attributes[l]=c.toJSON(e.data)}let i={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){let f=c[u];h.push(f.toJSON(e.data))}h.length>0&&(i[l]=h,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let i=e.attributes;for(let c in i){let h=i[c];this.setAttribute(c,h.clone(t))}let r=e.morphAttributes;for(let c in r){let h=[],u=r[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let c=0,h=o.length;c<h;c++){let u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},js=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Fh,this.updateRanges=[],this.version=0,this.uuid=Yn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,r=this.stride;i<r;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={});let t=gd(this.array);e.arrayBuffers[t]===void 0&&(e.arrayBuffers[t]=this.array.slice(0).buffer);let n=new this.array.constructor(e.arrayBuffers[t]),i=new this.constructor(n,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={});let t=gd(this.array);e.arrayBuffers[t]===void 0&&(e.arrayBuffers[t]=Array.from(new Uint32Array(this.array.slice(0).buffer)));let n={uuid:this.uuid,buffer:t,type:this.array.constructor.name,stride:this.stride};return n.usage=this.usage,n}};function gd(s){return s.buffer._uuid===void 0&&(s.buffer._uuid=Yn()),s.byteOffset===0&&s.byteLength===s.buffer.byteLength?s.buffer._uuid:s.buffer._uuid+":"+s.byteOffset+":"+s.byteLength}var un=new N,Qs=class s{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i,this._normalizationScale=e!==void 0?Yl(e.array):void 0}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)un.fromBufferAttribute(this,t),un.applyMatrix4(e),this.setXYZ(t,un.x,un.y,un.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)un.fromBufferAttribute(this,t),un.applyNormalMatrix(e),this.setXYZ(t,un.x,un.y,un.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)un.fromBufferAttribute(this,t),un.transformDirection(e),this.setXYZ(t,un.x,un.y,un.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=this._denormalize(n)),n}setComponent(e,t,n){return this.normalized&&(n=this._normalize(n)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=this._denormalize(t)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=this._denormalize(t)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=this._denormalize(t)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=this._denormalize(t)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n),i=this._normalize(i)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n),i=this._normalize(i),r=this._normalize(r)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=r,this}clone(e){if(e===void 0){zr("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return new Zt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new s(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){zr("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}_denormalize(e){let t=this._normalizationScale;return t!==void 0?Math.max(e/t,-1):zh(e,this.data.array)}_normalize(e){let t=this._normalizationScale;return t!==void 0?Math.round(e*t):Gh(e,this.data.array)}},Xc=new N,a0=new N,l0=new Je,Vn=class{constructor(e=new N(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let i=Xc.subVectors(n,t).cross(a0.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let i=e.delta(Xc),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let o=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(o<0||o>1)?null:t.copy(e.start).addScaledVector(i,o)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||l0.getNormalMatrix(e),i=this.coplanarPoint(Xc).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},c0=0,pn=class extends Wn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:c0++}),this.uuid=Yn(),this.name="",this.type="Material",this.blending=fr,this.side=Dn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=_h,this.blendDst=yh,this.blendEquation=vs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new se(0,0,0),this.blendAlpha=0,this.depthFunc=Xs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ef,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Sa,this.stencilZFail=Sa,this.stencilZPass=Sa,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){Oe(`Material: parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){Oe(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector2&&n&&n.isVector2||i&&i.isEuler&&n&&n.isEuler||i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(n.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(n.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(e).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){let o=[];for(let a in r){let l=r[a];delete l.metadata,o.push(l)}return o}if(t){let r=i(e.textures),o=i(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new se().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.diffuseRoughness!==void 0&&(this.diffuseRoughness=e.diffuseRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum),e.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=e.iridescenceThicknessRange[1]),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new Vn().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new ye().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new ye().fromArray(e.clearcoatNormalScale)),e.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=t[e.diffuseRoughnessMap]||null),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let i=t.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}};var fi=new N,qc=new N,na=new N,ia=new N,us=class{constructor(e=new N,t=new N(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,fi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=fi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(fi.copy(this.origin).addScaledVector(this.direction,t),fi.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){qc.copy(e).add(t).multiplyScalar(.5),na.copy(t).sub(e).normalize(),ia.copy(this.origin).sub(qc);let r=e.distanceTo(t)*.5,o=-this.direction.dot(na),a=ia.dot(this.direction),l=-ia.dot(na),c=ia.lengthSq(),h=Math.abs(1-o*o),u,d,f,p;if(h>0)if(u=o*l-a,d=o*a-l,p=r*h,u>=0)if(d>=-p)if(d<=p){let y=1/h;u*=y,d*=y,f=u*(u+o*d+2*a)+d*(o*u+d+2*l)+c}else d=r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d<=-p?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c):d<=p?(u=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(qc).addScaledVector(na,d),f}intersectSphere(e,t){if(e.radius<0)return null;fi.subVectors(e.center,this.origin);let n=fi.dot(this.direction),i=fi.dot(fi)-n*n,r=e.radius*e.radius;if(i>r)return null;let o=Math.sqrt(r-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,r,o,a,l,c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,i=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,i=(e.min.x-d.x)*c),h>=0?(r=(e.min.y-d.y)*h,o=(e.max.y-d.y)*h):(r=(e.max.y-d.y)*h,o=(e.min.y-d.y)*h),n>o||r>i||((r>n||isNaN(n))&&(n=r),(o<i||isNaN(i))&&(i=o),u>=0?(a=(e.min.z-d.z)*u,l=(e.max.z-d.z)*u):(a=(e.max.z-d.z)*u,l=(e.min.z-d.z)*u),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,fi)!==null}intersectTriangle(e,t,n,i,r){let o=this.origin,a=this.direction,l=a.x,c=a.y,h=a.z,u=e.x-o.x,d=e.y-o.y,f=e.z-o.z,p=t.x-o.x,y=t.y-o.y,g=t.z-o.z,m=n.x-o.x,b=n.y-o.y,T=n.z-o.z,M=Math.abs(l),w=Math.abs(c),v=Math.abs(h),x,_,P,R,C,D,q,I,z,Y,V,B;if(M>=w&&M>=v?(P=l,D=u,z=p,B=m,l>=0?(x=c,_=h,R=d,C=f,q=y,I=g,Y=b,V=T):(x=h,_=c,R=f,C=d,q=g,I=y,Y=T,V=b)):w>=v?(P=c,D=d,z=y,B=b,c>=0?(x=h,_=l,R=f,C=u,q=g,I=p,Y=T,V=m):(x=l,_=h,R=u,C=f,q=p,I=g,Y=m,V=T)):(P=h,D=f,z=g,B=T,h>=0?(x=l,_=c,R=u,C=d,q=p,I=y,Y=m,V=b):(x=c,_=l,R=d,C=u,q=y,I=p,Y=b,V=m)),P===0)return null;let F=x/P,K=_/P,Z=1/P,he=R-F*D,Re=C-K*D,$=q-F*z,ge=I-K*z,de=Y-F*B,De=V-K*B,ae=de*ge-De*$,Fe=he*De-Re*de,Et=$*Re-ge*he;if(i){if(ae<0||Fe<0||Et<0)return null}else if((ae<0||Fe<0||Et<0)&&(ae>0||Fe>0||Et>0))return null;let Ge=ae+Fe+Et;if(Ge===0)return null;let et=Z*(ae*D+Fe*z+Et*B);return(Ge>0?et<0:et>0)?null:this.at(et/Ge,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},pt=class extends pn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new se(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new In,this.combine=il,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},xd=new We,ns=new us,sa=new xn,_d=new N,ra=new N,oa=new N,aa=new N,Yc=new N,la=new N,yd=new N,ca=new N,k=class extends Rt{constructor(e=new Ut,t=new pt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){let n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(i,e);let a=this.morphTargetInfluences;if(r&&a){la.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=a[l],u=r[l];h!==0&&(Yc.fromBufferAttribute(u,e),o?la.addScaledVector(Yc,h):la.addScaledVector(Yc.sub(t),h))}t.add(la)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),sa.copy(n.boundingSphere),sa.applyMatrix4(r),ns.copy(e.ray).recast(e.near),!(sa.containsPoint(ns.origin)===!1&&(ns.intersectSphere(sa,_d)===null||ns.origin.distanceToSquared(_d)>(e.far-e.near)**2))&&(xd.copy(r).invert(),ns.copy(e.ray).applyMatrix4(xd),!(n.boundingBox!==null&&ns.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,ns)))}_computeIntersections(e,t,n){let i,r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let p=0,y=d.length;p<y;p++){let g=d[p],m=o[g.materialIndex],b=Math.max(g.start,f.start),T=Math.min(a.count,Math.min(g.start+g.count,f.start+f.count));for(let M=b,w=T;M<w;M+=3){let v=a.getX(M),x=a.getX(M+1),_=a.getX(M+2);i=ha(this,m,e,n,c,h,u,v,x,_),i&&(i.faceIndex=Math.floor(M/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{let p=Math.max(0,f.start),y=Math.min(a.count,f.start+f.count);for(let g=p,m=y;g<m;g+=3){let b=a.getX(g),T=a.getX(g+1),M=a.getX(g+2);i=ha(this,o,e,n,c,h,u,b,T,M),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let p=0,y=d.length;p<y;p++){let g=d[p],m=o[g.materialIndex],b=Math.max(g.start,f.start),T=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let M=b,w=T;M<w;M+=3){let v=M,x=M+1,_=M+2;i=ha(this,m,e,n,c,h,u,v,x,_),i&&(i.faceIndex=Math.floor(M/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{let p=Math.max(0,f.start),y=Math.min(l.count,f.start+f.count);for(let g=p,m=y;g<m;g+=3){let b=g,T=g+1,M=g+2;i=ha(this,o,e,n,c,h,u,b,T,M),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}}};function h0(s,e,t,n,i,r,o,a){let l;if(e.side===gn?l=n.intersectTriangle(o,r,i,!0,a):l=n.intersectTriangle(i,r,o,e.side===Dn,a),l===null)return null;ca.copy(a),ca.applyMatrix4(s.matrixWorld);let c=t.ray.origin.distanceTo(ca);return c<t.near||c>t.far?null:{distance:c,point:ca.clone(),object:s}}function ha(s,e,t,n,i,r,o,a,l,c){s.getVertexPosition(a,ra),s.getVertexPosition(l,oa),s.getVertexPosition(c,aa);let h=h0(s,e,t,n,ra,oa,aa,yd);if(h){let u=new N;zi.getBarycoord(yd,ra,oa,aa,u),i&&(h.uv=zi.getInterpolatedAttribute(i,a,l,c,u,new ye)),r&&(h.uv1=zi.getInterpolatedAttribute(r,a,l,c,u,new ye)),o&&(h.normal=zi.getInterpolatedAttribute(o,a,l,c,u,new N),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let d={a,b:l,c,normal:new N,materialIndex:0};zi.getNormal(ra,oa,aa,d.normal),h.face=d,h.barycoord=u}return h}var Cr=new bt,vd=new bt,Md=new bt,u0=new bt,bd=new We,ua=new N,Kc=new xn,Sd=new We,Jc=new us,Kr=class extends k{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=nh,this.bindMatrix=new We,this.bindMatrixInverse=new We,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new fn),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,ua),this.boundingBox.expandByPoint(ua)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new xn),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,ua),this.boundingSphere.expandByPoint(ua)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,this.boundingBox=e.boundingBox!==null?e.boundingBox.clone():null,this.boundingSphere=e.boundingSphere!==null?e.boundingSphere.clone():null,this}raycast(e,t){let n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Kc.copy(this.boundingSphere),Kc.applyMatrix4(i),e.ray.intersectsSphere(Kc)!==!1&&(Sd.copy(i).invert(),Jc.copy(e.ray).applyMatrix4(Sd),!(this.boundingBox!==null&&Jc.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Jc)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new bt,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);let r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===nh?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===_f?this.bindMatrixInverse.copy(this.bindMatrix).invert():Oe("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,i=this.geometry;vd.fromBufferAttribute(i.attributes.skinIndex,e),Md.fromBufferAttribute(i.attributes.skinWeight,e),t.isVector4?(Cr.copy(t),t.set(0,0,0,0)):(Cr.set(t.x,t.y,t.z,1),t.set(0,0,0)),Cr.applyMatrix4(this.bindMatrix);for(let r=0;r<4;r++){let o=Md.getComponent(r);if(o!==0){let a=vd.getComponent(r);bd.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(u0.copy(Cr).applyMatrix4(bd),o)}}return t.isVector4&&(t.w=Cr.w),t.applyMatrix4(this.bindMatrixInverse)}},er=class extends Rt{constructor(){super(),this.isBone=!0,this.type="Bone"}},tr=class extends Wt{constructor(e=null,t=1,n=1,i,r,o,a,l,c=Ft,h=Ft,u,d){super(null,o,a,l,c,h,i,r,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Ed=new We,d0=new We,Jr=class s{constructor(e=[],t=[]){this.uuid=Yn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.previousBoneMatrices=null,this.boneTexture=null,this.previousBoneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){Oe("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new We)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new We;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let r=0,o=e.length;r<o;r++){let a=e[r]?e[r].matrixWorld:d0;Ed.multiplyMatrices(a,t[r]),Ed.toArray(n,r*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new s(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new tr(t,e,e,Un,Tn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null),this.previousBoneTexture!==null&&(this.previousBoneTexture.dispose(),this.previousBoneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){let r=e.bones[n],o=t[r];o===void 0&&(Oe("Skeleton: No bone found with UUID:",r),o=new er),this.bones.push(o),this.boneInverses.push(new We().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let i=0,r=t.length;i<r;i++){let o=t[i];e.bones.push(o.uuid);let a=n[i];e.boneInverses.push(a.toArray())}return e}},xi=class extends Zt{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},ks=new We,Td=new We,da=[],wd=new fn,f0=new We,Pr=new k,Ir=new xn,Ln=class extends k{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new xi(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,f0)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new fn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ks),wd.copy(e.boundingBox).applyMatrix4(ks),this.boundingBox.union(wd)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new xn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ks),Ir.copy(e.boundingSphere).applyMatrix4(ks),this.boundingSphere.union(Ir)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),this.morphTexture=e.morphTexture!==null?e.morphTexture.clone():null,this.instanceColor=e.instanceColor!==null?e.instanceColor.clone():null,this.count=e.count,this.boundingBox=e.boundingBox!==null?e.boundingBox.clone():null,this.boundingSphere=e.boundingSphere!==null?e.boundingSphere.clone():null,this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,o=e*r+1;for(let a=0;a<n.length;a++)n[a]=i[o+a]}raycast(e,t){let n=this.matrixWorld,i=this.count;if(Pr.geometry=this.geometry,Pr.material=this.material,Pr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ir.copy(this.boundingSphere),Ir.applyMatrix4(n),e.ray.intersectsSphere(Ir)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,ks),Td.multiplyMatrices(n,ks),Pr.matrixWorld=Td,Pr.raycast(e,da);for(let o=0,a=da.length;o<a;o++){let l=da[o];l.instanceId=r,l.object=this,t.push(l)}da.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new xi(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new tr(new Float32Array(i*this.count),i,this.count,hl,Tn));let r=this.morphTexture.source.data.data,o=0;for(let c=0;c<n.length;c++)o+=n[c];let a=this.geometry.morphTargetsRelative?1:1-o,l=i*e;return r[l]=a,r.set(n,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.instanceMatrix.dispose(),this.instanceColor!==null&&this.instanceColor.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},is=new xn,p0=new ye(.5,.5),fa=new N,Gi=class{constructor(e=new Vn,t=new Vn,n=new Vn,i=new Vn,r=new Vn,o=new Vn){this.planes=[e,t,n,i,r,o]}set(e,t,n,i,r,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(r),a[5].copy(o),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Pn,n=!1){let i=this.planes,r=e.elements,o=r[0],a=r[1],l=r[2],c=r[3],h=r[4],u=r[5],d=r[6],f=r[7],p=r[8],y=r[9],g=r[10],m=r[11],b=r[12],T=r[13],M=r[14],w=r[15];if(i[0].setComponents(c-o,f-h,m-p,w-b).normalize(),i[1].setComponents(c+o,f+h,m+p,w+b).normalize(),i[2].setComponents(c+a,f+u,m+y,w+T).normalize(),i[3].setComponents(c-a,f-u,m-y,w-T).normalize(),n)i[4].setComponents(l,d,g,M).normalize(),i[5].setComponents(c-l,f-d,m-g,w-M).normalize();else if(i[4].setComponents(c-l,f-d,m-g,w-M).normalize(),t===Pn)i[5].setComponents(c+l,f+d,m+g,w+M).normalize();else if(t===Ys)i[5].setComponents(l,d,g,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),is.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),is.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(is)}intersectsSprite(e){is.center.set(0,0,0);let t=p0.distanceTo(e.center);return is.radius=.7071067811865476+t,is.applyMatrix4(e.matrixWorld),this.intersectsSphere(is)}intersectsSphere(e){let t=this.planes,n=e.center,i=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let i=t[n];if(fa.x=i.normal.x>0?e.max.x:e.min.x,fa.y=i.normal.y>0?e.max.y:e.min.y,fa.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(fa)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Ad=new We,Da=class s{constructor(){this.coordinateSystem=Pn,this._frustums=[],this._count=0}setFromArrayCamera(e){let t=e.cameras,n=this._frustums;for(let i=0;i<t.length;i++){let r=t[i];Ad.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),n[i]===void 0&&(n[i]=new Gi),n[i].setFromProjectionMatrix(Ad,r.coordinateSystem,r.reversedDepth)}return this._count=t.length,this}getFrustum(e){return this._frustums[e]}intersectsObject(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsObject(e))return!0;return!1}intersectsSprite(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSprite(e))return!0;return!1}intersectsSphere(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSphere(e))return!0;return!1}intersectsBox(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsBox(e))return!0;return!1}containsPoint(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].containsPoint(e))return!0;return!1}copy(e){this.coordinateSystem=e.coordinateSystem;let t=this._frustums,n=e._frustums;for(let i=0;i<e._count;i++)t[i]===void 0&&(t[i]=new Gi),t[i].copy(n[i]);return this._count=e._count,this}clone(){return new s().copy(this)}};var nr=class extends pn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new se(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Ua=new N,Oa=new N,Rd=new We,Lr=new us,pa=new xn,Zc=new N,Cd=new N,ds=class extends Rt{constructor(e=new Ut,t=new nr){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let i=1,r=t.count;i<r;i++)Ua.fromBufferAttribute(t,i-1),Oa.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=Ua.distanceTo(Oa);e.setAttribute("lineDistance",new _t(n,1))}else Oe("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,i=this.matrixWorld,r=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),pa.copy(n.boundingSphere),pa.applyMatrix4(i),pa.radius+=r,e.ray.intersectsSphere(pa)===!1)return;Rd.copy(i).invert(),Lr.copy(e.ray).applyMatrix4(Rd);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){let f=Math.max(0,o.start),p=Math.min(h.count,o.start+o.count);for(let y=f,g=p-1;y<g;y+=c){let m=h.getX(y),b=h.getX(y+1),T=ma(this,e,Lr,l,m,b,y);T&&t.push(T)}if(this.isLineLoop){let y=h.getX(p-1),g=h.getX(f),m=ma(this,e,Lr,l,y,g,p-1);m&&t.push(m)}}else{let f=Math.max(0,o.start),p=Math.min(d.count,o.start+o.count);for(let y=f,g=p-1;y<g;y+=c){let m=ma(this,e,Lr,l,y,y+1,y);m&&t.push(m)}if(this.isLineLoop){let y=ma(this,e,Lr,l,p-1,f,p-1);y&&t.push(y)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function ma(s,e,t,n,i,r,o){let a=s.geometry.attributes.position;if(Ua.fromBufferAttribute(a,i),Oa.fromBufferAttribute(a,r),t.distanceSqToSegment(Ua,Oa,Zc,Cd)>n)return;Zc.applyMatrix4(s.matrixWorld);let c=e.ray.origin.distanceTo(Zc);if(!(c<e.near||c>e.far))return{distance:c,point:Cd.clone().applyMatrix4(s.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:s}}var Pd=new N,Id=new N,Zr=class extends ds{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let i=0,r=t.count;i<r;i+=2)Pd.fromBufferAttribute(t,i),Id.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Pd.distanceTo(Id);e.setAttribute("lineDistance",new _t(n,1))}else Oe("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},$r=class extends ds{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},ir=class extends pn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new se(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Ld=new We,sh=new us,ga=new xn,xa=new N,jr=class extends Rt{constructor(e=new Ut,t=new ir){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,i=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ga.copy(n.boundingSphere),ga.applyMatrix4(i),ga.radius+=r,e.ray.intersectsSphere(ga)===!1)return;Ld.copy(i).invert(),sh.copy(e.ray).applyMatrix4(Ld);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,u=n.attributes.position;if(c!==null){let d=Math.max(0,o.start),f=Math.min(c.count,o.start+o.count);for(let p=d,y=f;p<y;p++){let g=c.getX(p);xa.fromBufferAttribute(u,g),Nd(xa,g,l,i,e,t,this)}}else{let d=Math.max(0,o.start),f=Math.min(u.count,o.start+o.count);for(let p=d,y=f;p<y;p++)xa.fromBufferAttribute(u,p),Nd(xa,p,l,i,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function Nd(s,e,t,n,i,r,o){let a=sh.distanceSqToPoint(s);if(a<t){let l=new N;sh.closestPointToPoint(s,l),l.applyMatrix4(n);let c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}var Qr=class extends Wt{constructor(e=[],t=Ms,n,i,r,o,a,l,c,h){super(e,t,n,i,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},eo=class extends Wt{constructor(e,t,n,i,r,o,a,l,c){super(e,t,n,i,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var _i=class extends Wt{constructor(e,t,n=Xn,i,r,o,a=Ft,l=Ft,c,h=gi,u=1){if(h!==gi&&h!==Ti)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let d={width:e,height:t,depth:u};super(d,i,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Zs(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},to=class extends _i{constructor(e,t=Xn,n=Ms,i,r,o=Ft,a=Ft,l,c=gi){let h={width:e,height:e,depth:1},u=[h,h,h,h,h,h];super(e,e,t,n,i,r,o,a,l,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},no=class extends Wt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},we=class s extends Ut{constructor(e=1,t=1,n=1,i=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:r,depthSegments:o};let a=this;i=Math.floor(i),r=Math.floor(r),o=Math.floor(o);let l=[],c=[],h=[],u=[],d=0,f=0;p("z","y","x",-1,-1,n,t,e,o,r,0),p("z","y","x",1,-1,n,t,-e,o,r,1),p("x","z","y",1,1,e,n,t,i,o,2),p("x","z","y",1,-1,e,n,-t,i,o,3),p("x","y","z",1,-1,e,t,n,i,r,4),p("x","y","z",-1,-1,e,t,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new _t(c,3)),this.setAttribute("normal",new _t(h,3)),this.setAttribute("uv",new _t(u,2));function p(y,g,m,b,T,M,w,v,x,_,P){let R=M/x,C=w/_,D=M/2,q=w/2,I=v/2,z=x+1,Y=_+1,V=0,B=0,F=new N;for(let K=0;K<Y;K++){let Z=K*C-q;for(let he=0;he<z;he++){let Re=he*R-D;F[y]=Re*b,F[g]=Z*T,F[m]=I,c.push(F.x,F.y,F.z),F[y]=0,F[g]=0,F[m]=v>0?1:-1,h.push(F.x,F.y,F.z),u.push(he/x),u.push(1-K/_),V+=1}}for(let K=0;K<_;K++)for(let Z=0;Z<x;Z++){let he=d+Z+z*K,Re=d+Z+z*(K+1),$=d+(Z+1)+z*(K+1),ge=d+(Z+1)+z*K;l.push(he,Re,ge),l.push(Re,$,ge),B+=6}a.addGroup(f,B,P),f+=B,d+=V}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var sr=class s extends Ut{constructor(e=1,t=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);let r=[],o=[],a=[],l=[],c=new N,h=new ye;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let u=0,d=3;u<=t;u++,d+=3){let f=n+u/t*i;c.x=e*Math.cos(f),c.y=e*Math.sin(f),o.push(c.x,c.y,c.z),a.push(0,0,1),h.x=(o[d]/e+1)/2,h.y=(o[d+1]/e+1)/2,l.push(h.x,h.y)}for(let u=1;u<=t;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new _t(o,3)),this.setAttribute("normal",new _t(a,3)),this.setAttribute("uv",new _t(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.segments,e.thetaStart,e.thetaLength)}},ht=class s extends Ut{constructor(e=1,t=1,n=1,i=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};let c=this;i=Math.floor(i),r=Math.floor(r);let h=[],u=[],d=[],f=[],p=0,y=[],g=n/2,m=0;b(),o===!1&&(e>0&&T(!0),t>0&&T(!1)),this.setIndex(h),this.setAttribute("position",new _t(u,3)),this.setAttribute("normal",new _t(d,3)),this.setAttribute("uv",new _t(f,2));function b(){let M=new N,w=new N,v=0,x=(t-e)/n;for(let _=0;_<=r;_++){let P=[],R=_/r,C=R*(t-e)+e;for(let D=0;D<=i;D++){let q=D/i,I=q*l+a,z=Math.sin(I),Y=Math.cos(I);w.x=C*z,w.y=-R*n+g,w.z=C*Y,u.push(w.x,w.y,w.z),M.set(z,x,Y).normalize(),d.push(M.x,M.y,M.z),f.push(q,1-R),P.push(p++)}y.push(P)}for(let _=0;_<i;_++)for(let P=0;P<r;P++){let R=y[P][_],C=y[P+1][_],D=y[P+1][_+1],q=y[P][_+1];(e>0||P!==0)&&(h.push(R,C,q),v+=3),(t>0||P!==r-1)&&(h.push(C,D,q),v+=3)}c.addGroup(m,v,0),m+=v}function T(M){let w=p,v=new ye,x=new N,_=0,P=M===!0?e:t,R=M===!0?1:-1;for(let D=1;D<=i;D++)u.push(0,g*R,0),d.push(0,R,0),f.push(.5,.5),p++;let C=p;for(let D=0;D<=i;D++){let I=D/i*l+a,z=Math.cos(I),Y=Math.sin(I);x.x=P*Y,x.y=g*R,x.z=P*z,u.push(x.x,x.y,x.z),d.push(0,R,0),v.x=z*.5+.5,v.y=Y*.5*R+.5,f.push(v.x,v.y),p++}for(let D=0;D<i;D++){let q=w+D,I=C+D;M===!0?h.push(I,I+1,q):h.push(I+1,I,q),_+=3}c.addGroup(m,_,M===!0?1:2),m+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},rr=class s extends ht{constructor(e=1,t=1,n=32,i=1,r=!1,o=0,a=Math.PI*2){super(0,e,t,n,i,r,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(e){return new s(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}};var En=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Oe("Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,i=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),r+=n.distanceTo(i),t.push(r),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),i=0,r=n.length,o;t?o=t:o=e*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(i=Math.floor(a+(l-a)/2),c=n[i]-o,c<0)a=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===o)return i/(r-1);let h=n[i],d=n[i+1]-h,f=(o-h)/d;return(i+f)/(r-1)}getTangent(e,t){let i=e-1e-4,r=e+1e-4;i<0&&(i=0),r>1&&(r=1);let o=this.getPoint(i),a=this.getPoint(r),l=t||(o.isVector2?new ye:new N);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new N,i=[],r=[],o=[],a=new N,l=new We;for(let f=0;f<=e;f++){let p=f/e;i[f]=this.getTangentAt(p,new N)}r[0]=new N,o[0]=new N;let c=Number.MAX_VALUE,h=Math.abs(i[0].x),u=Math.abs(i[0].y),d=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],a),o[0].crossVectors(i[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(i[f-1],i[f]),a.length()>Number.EPSILON){a.normalize();let p=Math.acos(rt(i[f-1].dot(i[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(a,p))}o[f].crossVectors(i[f],r[f])}if(t===!0){let f=Math.acos(rt(r[0].dot(r[e]),-1,1));f/=e,i[0].dot(a.crossVectors(r[0],r[e]))>0&&(f=-f);for(let p=1;p<=e;p++)r[p].applyMatrix4(l.makeRotationAxis(i[p],f*p)),o[p].crossVectors(i[p],r[p])}return{tangents:i,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this.cacheArcLengths=null,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this.cacheArcLengths=null,this}},or=class extends En{constructor(e=0,t=0,n=1,i=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(e,t=new ye){let n=t,i=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(o?r=0:r=i),this.aClockwise===!0&&!o&&(r===i?r=-i:r=r-i);let a=this.aStartAngle+e*r,l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*h-f*u+this.aX,c=d*u+f*h+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},Fa=class extends or{constructor(e,t,n,i,r,o){super(e,t,n,n,i,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};function Vh(){let s=0,e=0,t=0,n=0;function i(r,o,a,l){s=r,e=a,t=-3*r+3*o-2*a-l,n=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){i(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,h,u){let d=(o-r)/c-(a-r)/(c+h)+(a-o)/h,f=(a-o)/h-(l-o)/(h+u)+(l-a)/u;d*=h,f*=h,i(o,a,d,f)},calc:function(r){let o=r*r,a=o*r;return s+e*r+t*o+n*a}}}var Dd=new N,Ud=new N,$c=new Vh,jc=new Vh,Qc=new Vh,Ba=class extends En{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new N){let n=t,i=this.points,r=i.length,o=(r-(this.closed?0:1))*e,a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,h;this.closed||a>0?c=i[(a-1)%r]:(Ud.subVectors(i[0],i[1]).add(i[0]),c=Ud);let u=i[a%r],d=i[(a+1)%r];if(this.closed||a+2<r?h=i[(a+2)%r]:(Dd.subVectors(i[r-1],i[r-2]).add(i[r-1]),h=Dd),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,p=Math.pow(c.distanceToSquared(u),f),y=Math.pow(u.distanceToSquared(d),f),g=Math.pow(d.distanceToSquared(h),f);y<1e-4&&(y=1),p<1e-4&&(p=y),g<1e-4&&(g=y),$c.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,p,y,g),jc.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,p,y,g),Qc.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,p,y,g)}else this.curveType==="catmullrom"&&($c.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),jc.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),Qc.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return n.set($c.calc(l),jc.calc(l),Qc.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new N().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function Od(s,e,t,n,i){let r=(n-e)*.5,o=(i-t)*.5,a=s*s,l=s*a;return(2*t-2*n+r+o)*l+(-3*t+3*n-2*r-o)*a+r*s+t}function m0(s,e){let t=1-s;return t*t*e}function g0(s,e){return 2*(1-s)*s*e}function x0(s,e){return s*s*e}function Fr(s,e,t,n){return m0(s,e)+g0(s,t)+x0(s,n)}function _0(s,e){let t=1-s;return t*t*t*e}function y0(s,e){let t=1-s;return 3*t*t*s*e}function v0(s,e){return 3*(1-s)*s*s*e}function M0(s,e){return s*s*s*e}function Br(s,e,t,n,i){return _0(s,e)+y0(s,t)+v0(s,n)+M0(s,i)}var io=class extends En{constructor(e=new ye,t=new ye,n=new ye,i=new ye){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new ye){let n=t,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Br(e,i.x,r.x,o.x,a.x),Br(e,i.y,r.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Ha=class extends En{constructor(e=new N,t=new N,n=new N,i=new N){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new N){let n=t,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Br(e,i.x,r.x,o.x,a.x),Br(e,i.y,r.y,o.y,a.y),Br(e,i.z,r.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},so=class extends En{constructor(e=new ye,t=new ye){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ye){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ye){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ka=class extends En{constructor(e=new N,t=new N){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new N){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new N){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ro=class extends En{constructor(e=new ye,t=new ye,n=new ye){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new ye){let n=t,i=this.v0,r=this.v1,o=this.v2;return n.set(Fr(e,i.x,r.x,o.x),Fr(e,i.y,r.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},za=class extends En{constructor(e=new N,t=new N,n=new N){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new N){let n=t,i=this.v0,r=this.v1,o=this.v2;return n.set(Fr(e,i.x,r.x,o.x),Fr(e,i.y,r.y,o.y),Fr(e,i.z,r.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},oo=class extends En{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ye){let n=t,i=this.points,r=(i.length-1)*e,o=Math.floor(r),a=r-o,l=i[o===0?o:o-1],c=i[o],h=i[o>i.length-2?i.length-1:o+1],u=i[o>i.length-3?i.length-1:o+2];return n.set(Od(a,l.x,c.x,h.x,u.x),Od(a,l.y,c.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new ye().fromArray(i))}return this}},rh=Object.freeze({__proto__:null,ArcCurve:Fa,CatmullRomCurve3:Ba,CubicBezierCurve:io,CubicBezierCurve3:Ha,EllipseCurve:or,LineCurve:so,LineCurve3:ka,QuadraticBezierCurve:ro,QuadraticBezierCurve3:za,SplineCurve:oo}),Ga=class extends En{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1,this.cacheLengths=null}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new rh[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),i=this.getCurveLengths(),r=0;for(;r<i.length;){if(i[r]>=n){let o=i[r]-n,a=this.curves[r],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,t)}r++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let i=0,r=this.curves;i<r.length;i++){let o=r[i],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,l=o.getPoints(a);for(let c=0;c<l.length;c++){let h=l[c];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this.cacheLengths=null,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(new rh[i.type]().fromJSON(i))}return this.cacheLengths=null,this}},ao=class extends Ga{constructor(e){super(),this.type="Path",this.currentPoint=new ye,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new so(this.currentPoint.clone(),new ye(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){let r=new ro(this.currentPoint.clone(),new ye(e,t),new ye(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,r,o){let a=new io(this.currentPoint.clone(),new ye(e,t),new ye(n,i),new ye(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new oo(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,r,o){let a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+a,t+l,n,i,r,o),this}absarc(e,t,n,i,r,o){return this.absellipse(e,t,n,n,i,r,o),this}ellipse(e,t,n,i,r,o,a,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,n,i,r,o,a,l),this}absellipse(e,t,n,i,r,o,a,l){let c=new or(e,t,n,i,r,o,a,l);if(this.curves.length>0){let u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},ar=class extends ao{constructor(e){super(e),this.uuid=Yn(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,i=this.holes.length;n<i;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let i=this.holes[t];e.holes.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(new ao().fromJSON(i))}return this}};function b0(s,e,t=2){let n=e&&e.length,i=n?e[0]*t:s.length,r=Uf(s,0,i,t,!0),o=[];if(!r||r.next===r.prev)return o;let a,l,c;if(n&&(r=A0(s,e,r,t)),s.length>80*t){a=s[0],l=s[1];let h=a,u=l;for(let d=t;d<i;d+=t){let f=s[d],p=s[d+1];f<a&&(a=f),p<l&&(l=p),f>h&&(h=f),p>u&&(u=p)}c=Math.max(h-a,u-l),c=c!==0?32767/c:0}return lo(r,o,t,a,l,c,0),o}function Uf(s,e,t,n,i){let r;if(i===B0(s,e,t,n)>0)for(let o=e;o<t;o+=n)r=Fd(o/n|0,s[o],s[o+1],r);else for(let o=t-n;o>=e;o-=n)r=Fd(o/n|0,s[o],s[o+1],r);return r&&lr(r,r.next)&&(ho(r),r=r.next),r}function fs(s,e){if(!s)return s;e||(e=s);let t=s,n;do if(n=!1,!t.steiner&&(lr(t,t.next)||It(t.prev,t,t.next)===0)){if(ho(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function lo(s,e,t,n,i,r,o){if(!s)return;!o&&r&&L0(s,n,i,r);let a=s;for(;s.prev!==s.next;){let l=s.prev,c=s.next;if(r?E0(s,n,i,r):S0(s)){e.push(l.i,s.i,c.i),ho(s),s=c.next,a=c.next;continue}if(s=c,s===a){o?o===1?(s=T0(fs(s),e),lo(s,e,t,n,i,r,2)):o===2&&w0(s,e,t,n,i,r):lo(fs(s),e,t,n,i,r,1);break}}}function S0(s){let e=s.prev,t=s,n=s.next;if(It(e,t,n)>=0)return!1;let i=e.x,r=t.x,o=n.x,a=e.y,l=t.y,c=n.y,h=Math.min(i,r,o),u=Math.min(a,l,c),d=Math.max(i,r,o),f=Math.max(a,l,c),p=n.next;for(;p!==e;){if(p.x>=h&&p.x<=d&&p.y>=u&&p.y<=f&&Nr(i,a,r,l,o,c,p.x,p.y)&&It(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function E0(s,e,t,n){let i=s.prev,r=s,o=s.next;if(It(i,r,o)>=0)return!1;let a=i.x,l=r.x,c=o.x,h=i.y,u=r.y,d=o.y,f=Math.min(a,l,c),p=Math.min(h,u,d),y=Math.max(a,l,c),g=Math.max(h,u,d),m=oh(f,p,e,t,n),b=oh(y,g,e,t,n),T=s.prevZ,M=s.nextZ;for(;T&&T.z>=m&&M&&M.z<=b;){if(T.x>=f&&T.x<=y&&T.y>=p&&T.y<=g&&T!==i&&T!==o&&Nr(a,h,l,u,c,d,T.x,T.y)&&It(T.prev,T,T.next)>=0||(T=T.prevZ,M.x>=f&&M.x<=y&&M.y>=p&&M.y<=g&&M!==i&&M!==o&&Nr(a,h,l,u,c,d,M.x,M.y)&&It(M.prev,M,M.next)>=0))return!1;M=M.nextZ}for(;T&&T.z>=m;){if(T.x>=f&&T.x<=y&&T.y>=p&&T.y<=g&&T!==i&&T!==o&&Nr(a,h,l,u,c,d,T.x,T.y)&&It(T.prev,T,T.next)>=0)return!1;T=T.prevZ}for(;M&&M.z<=b;){if(M.x>=f&&M.x<=y&&M.y>=p&&M.y<=g&&M!==i&&M!==o&&Nr(a,h,l,u,c,d,M.x,M.y)&&It(M.prev,M,M.next)>=0)return!1;M=M.nextZ}return!0}function T0(s,e){let t=s;do{let n=t.prev,i=t.next.next;!lr(n,i)&&Ff(n,t,t.next,i)&&co(n,i)&&co(i,n)&&(e.push(n.i,t.i,i.i),ho(t),ho(t.next),t=s=i),t=t.next}while(t!==s);return fs(t)}function w0(s,e,t,n,i,r){let o=s;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&U0(o,a)){let l=Bf(o,a);o=fs(o,o.next),l=fs(l,l.next),lo(o,e,t,n,i,r,0),lo(l,e,t,n,i,r,0);return}a=a.next}o=o.next}while(o!==s)}function A0(s,e,t,n){let i=[];for(let r=0,o=e.length;r<o;r++){let a=e[r]*n,l=r<o-1?e[r+1]*n:s.length,c=Uf(s,a,l,n,!1);c===c.next&&(c.steiner=!0),i.push(D0(c))}i.sort(R0);for(let r=0;r<i.length;r++)t=C0(i[r],t);return t}function R0(s,e){let t=s.x-e.x;if(t===0&&(t=s.y-e.y,t===0)){let n=(s.next.y-s.y)/(s.next.x-s.x),i=(e.next.y-e.y)/(e.next.x-e.x);t=n-i}return t}function C0(s,e){let t=P0(s,e);if(!t)return e;let n=Bf(t,s);return fs(n,n.next),fs(t,t.next)}function P0(s,e){let t=e,n=s.x,i=s.y,r=-1/0,o;if(lr(s,t))return t;do{if(lr(s,t.next))return t.next;if(i<=t.y&&i>=t.next.y&&t.next.y!==t.y){let u=t.x+(i-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(u<=n&&u>r&&(r=u,o=t.x<t.next.x?t:t.next,u===n))return o}t=t.next}while(t!==e);if(!o)return null;let a=o,l=o.x,c=o.y,h=1/0;t=o;do{if(n>=t.x&&t.x>=l&&n!==t.x&&Of(i<c?n:r,i,l,c,i<c?r:n,i,t.x,t.y)){let u=Math.abs(i-t.y)/(n-t.x);co(t,s)&&(u<h||u===h&&(t.x>o.x||t.x===o.x&&I0(o,t)))&&(o=t,h=u)}t=t.next}while(t!==a);return o}function I0(s,e){return It(s.prev,s,e.prev)<0&&It(e.next,s,s.next)<0}function L0(s,e,t,n){let i=s;do i.z===0&&(i.z=oh(i.x,i.y,e,t,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==s);i.prevZ.nextZ=null,i.prevZ=null,N0(i)}function N0(s){let e,t=1;do{let n=s,i;s=null;let r=null;for(e=0;n;){e++;let o=n,a=0;for(let c=0;c<t&&(a++,o=o.nextZ,!!o);c++);let l=t;for(;a>0||l>0&&o;)a!==0&&(l===0||!o||n.z<=o.z)?(i=n,n=n.nextZ,a--):(i=o,o=o.nextZ,l--),r?r.nextZ=i:s=i,i.prevZ=r,r=i;n=o}r.nextZ=null,t*=2}while(e>1);return s}function oh(s,e,t,n,i){return s=(s-t)*i|0,e=(e-n)*i|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,s|e<<1}function D0(s){let e=s,t=s;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==s);return t}function Of(s,e,t,n,i,r,o,a){return(i-o)*(e-a)>=(s-o)*(r-a)&&(s-o)*(n-a)>=(t-o)*(e-a)&&(t-o)*(r-a)>=(i-o)*(n-a)}function Nr(s,e,t,n,i,r,o,a){return!(s===o&&e===a)&&Of(s,e,t,n,i,r,o,a)}function U0(s,e){return s.next.i!==e.i&&s.prev.i!==e.i&&!O0(s,e)&&(co(s,e)&&co(e,s)&&F0(s,e)&&(It(s.prev,s,e.prev)||It(s,e.prev,e))||lr(s,e)&&It(s.prev,s,s.next)>0&&It(e.prev,e,e.next)>0)}function It(s,e,t){return(e.y-s.y)*(t.x-e.x)-(e.x-s.x)*(t.y-e.y)}function lr(s,e){return s.x===e.x&&s.y===e.y}function Ff(s,e,t,n){let i=ya(It(s,e,t)),r=ya(It(s,e,n)),o=ya(It(t,n,s)),a=ya(It(t,n,e));return!!(i!==r&&o!==a||i===0&&_a(s,t,e)||r===0&&_a(s,n,e)||o===0&&_a(t,s,n)||a===0&&_a(t,e,n))}function _a(s,e,t){return e.x<=Math.max(s.x,t.x)&&e.x>=Math.min(s.x,t.x)&&e.y<=Math.max(s.y,t.y)&&e.y>=Math.min(s.y,t.y)}function ya(s){return s>0?1:s<0?-1:0}function O0(s,e){let t=s;do{if(t.i!==s.i&&t.next.i!==s.i&&t.i!==e.i&&t.next.i!==e.i&&Ff(t,t.next,s,e))return!0;t=t.next}while(t!==s);return!1}function co(s,e){return It(s.prev,s,s.next)<0?It(s,e,s.next)>=0&&It(s,s.prev,e)>=0:It(s,e,s.prev)<0||It(s,s.next,e)<0}function F0(s,e){let t=s,n=!1,i=(s.x+e.x)/2,r=(s.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&i<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==s);return n}function Bf(s,e){let t=ah(s.i,s.x,s.y),n=ah(e.i,e.x,e.y),i=s.next,r=e.prev;return s.next=e,e.prev=s,t.next=i,i.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function Fd(s,e,t,n){let i=ah(s,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function ho(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function ah(s,e,t){return{i:s,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function B0(s,e,t,n){let i=0;for(let r=e,o=t-n;r<t;r+=n)i+=(s[o]-s[r])*(s[r+1]+s[o+1]),o=r;return i}var lh=class{static triangulate(e,t,n=2){return b0(e,t,n)}},os=class s{static area(e){let t=e.length,n=0;for(let i=t-1,r=0;r<t;i=r++)n+=e[i].x*e[r].y-e[r].x*e[i].y;return n*.5}static isClockWise(e){return s.area(e)<0}static triangulateShape(e,t){let n=[],i=[],r=[];Bd(e),Hd(n,e);let o=e.length;t.forEach(Bd);for(let l=0;l<t.length;l++)i.push(o),o+=t[l].length,Hd(n,t[l]);let a=lh.triangulate(n,i);for(let l=0;l<a.length;l+=3)r.push(a.slice(l,l+3));return r}};function Bd(s){let e=s.length;e>2&&s[e-1].equals(s[0])&&s.pop()}function Hd(s,e){for(let t=0;t<e.length;t++)s.push(e[t].x),s.push(e[t].y)}var uo=class s extends Ut{constructor(e=new ar([new ye(.5,.5),new ye(-.5,.5),new ye(-.5,-.5),new ye(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,i=[],r=[];for(let a=0,l=e.length;a<l;a++){let c=e[a];o(c)}this.setAttribute("position",new _t(i,3)),this.setAttribute("uv",new _t(r,2)),this.computeVertexNormals();function o(a){let l=[],c=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,u=t.depth!==void 0?t.depth:1,d=t.bevelEnabled!==void 0?t.bevelEnabled:!0,f=t.bevelThickness!==void 0?t.bevelThickness:.2,p=t.bevelSize!==void 0?t.bevelSize:f-.1,y=t.bevelOffset!==void 0?t.bevelOffset:0,g=t.bevelSegments!==void 0?t.bevelSegments:3,m=t.extrudePath,b=t.UVGenerator!==void 0?t.UVGenerator:H0,T,M=!1,w,v,x,_;if(m){T=m.getSpacedPoints(h),M=!0,d=!1;let ne=m.isCatmullRomCurve3?m.closed:!1;w=m.computeFrenetFrames(h,ne),v=new N,x=new N,_=new N}d||(g=0,f=0,p=0,y=0);let P=a.extractPoints(c),R=P.shape,C=P.holes;if(!os.isClockWise(R)){R=R.reverse();for(let ne=0,fe=C.length;ne<fe;ne++){let ce=C[ne];os.isClockWise(ce)&&(C[ne]=ce.reverse())}}function q(ne){let ce=10000000000000001e-36,Ce=ne[0];for(let Ee=1;Ee<=ne.length;Ee++){let Qe=Ee%ne.length,Be=ne[Qe],ct=Be.x-Ce.x,ut=Be.y-Ce.y,xt=ct*ct+ut*ut,O=Math.max(Math.abs(Be.x),Math.abs(Be.y),Math.abs(Ce.x),Math.abs(Ce.y)),kt=ce*O*O;if(xt<=kt){ne.splice(Qe,1),Ee--;continue}Ce=Be}}q(R),C.forEach(q);let I=C.length,z=R;for(let ne=0;ne<I;ne++){let fe=C[ne];R=R.concat(fe)}function Y(ne,fe,ce){return fe||Ye("ExtrudeGeometry: vec does not exist"),ne.clone().addScaledVector(fe,ce)}let V=R.length;function B(ne,fe,ce){let Ce,Ee,Qe,Be=ne.x-fe.x,ct=ne.y-fe.y,ut=ce.x-ne.x,xt=ce.y-ne.y,O=Be*Be+ct*ct,kt=Be*xt-ct*ut;if(Math.abs(kt)>Number.EPSILON){let lt=Math.sqrt(O),Tt=Math.sqrt(ut*ut+xt*xt),Me=fe.x-ct/lt,Dt=fe.y+Be/lt,Ve=ce.x-xt/Tt,Ke=ce.y+ut/Tt,A=((Ve-Me)*xt-(Ke-Dt)*ut)/(Be*xt-ct*ut);Ce=Me+Be*A-ne.x,Ee=Dt+ct*A-ne.y;let S=Ce*Ce+Ee*Ee;if(S<=2)return new ye(Ce,Ee);Qe=Math.sqrt(S/2)}else{let lt=!1;Be>Number.EPSILON?ut>Number.EPSILON&&(lt=!0):Be<-Number.EPSILON?ut<-Number.EPSILON&&(lt=!0):Math.sign(ct)===Math.sign(xt)&&(lt=!0),lt?(Ce=-ct,Ee=Be,Qe=Math.sqrt(O)):(Ce=Be,Ee=ct,Qe=Math.sqrt(O/2))}return new ye(Ce/Qe,Ee/Qe)}let F=[];for(let ne=0,fe=z.length,ce=fe-1,Ce=ne+1;ne<fe;ne++,ce++,Ce++)ce===fe&&(ce=0),Ce===fe&&(Ce=0),F[ne]=B(z[ne],z[ce],z[Ce]);let K=[],Z,he=F.concat();for(let ne=0,fe=I;ne<fe;ne++){let ce=C[ne];Z=[];for(let Ce=0,Ee=ce.length,Qe=Ee-1,Be=Ce+1;Ce<Ee;Ce++,Qe++,Be++)Qe===Ee&&(Qe=0),Be===Ee&&(Be=0),Z[Ce]=B(ce[Ce],ce[Qe],ce[Be]);K.push(Z),he=he.concat(Z)}let Re;if(g===0)Re=os.triangulateShape(z,C);else{let ne=[],fe=[];for(let ce=0;ce<g;ce++){let Ce=ce/g,Ee=f*Math.cos(Ce*Math.PI/2),Qe=p*Math.sin(Ce*Math.PI/2)+y;for(let Be=0,ct=z.length;Be<ct;Be++){let ut=Y(z[Be],F[Be],Qe);Fe(ut.x,ut.y,-Ee),Ce===0&&ne.push(ut)}for(let Be=0,ct=I;Be<ct;Be++){let ut=C[Be];Z=K[Be];let xt=[];for(let O=0,kt=ut.length;O<kt;O++){let lt=Y(ut[O],Z[O],Qe);Fe(lt.x,lt.y,-Ee),Ce===0&&xt.push(lt)}Ce===0&&fe.push(xt)}}Re=os.triangulateShape(ne,fe)}let $=Re.length,ge=p+y;for(let ne=0;ne<V;ne++){let fe=d?Y(R[ne],he[ne],ge):R[ne];M?(x.copy(w.normals[0]).multiplyScalar(fe.x),v.copy(w.binormals[0]).multiplyScalar(fe.y),_.copy(T[0]).add(x).add(v),Fe(_.x,_.y,_.z)):Fe(fe.x,fe.y,0)}for(let ne=1;ne<=h;ne++)for(let fe=0;fe<V;fe++){let ce=d?Y(R[fe],he[fe],ge):R[fe];M?(x.copy(w.normals[ne]).multiplyScalar(ce.x),v.copy(w.binormals[ne]).multiplyScalar(ce.y),_.copy(T[ne]).add(x).add(v),Fe(_.x,_.y,_.z)):Fe(ce.x,ce.y,u/h*ne)}for(let ne=g-1;ne>=0;ne--){let fe=ne/g,ce=f*Math.cos(fe*Math.PI/2),Ce=p*Math.sin(fe*Math.PI/2)+y;for(let Ee=0,Qe=z.length;Ee<Qe;Ee++){let Be=Y(z[Ee],F[Ee],Ce);Fe(Be.x,Be.y,u+ce)}for(let Ee=0,Qe=C.length;Ee<Qe;Ee++){let Be=C[Ee];Z=K[Ee];for(let ct=0,ut=Be.length;ct<ut;ct++){let xt=Y(Be[ct],Z[ct],Ce);M?Fe(xt.x,xt.y+T[h-1].y,T[h-1].x+ce):Fe(xt.x,xt.y,u+ce)}}}de(),De();function de(){let ne=i.length/3;if(d){let fe=0,ce=V*fe;for(let Ce=0;Ce<$;Ce++){let Ee=Re[Ce];Et(Ee[2]+ce,Ee[1]+ce,Ee[0]+ce)}fe=h+g*2,ce=V*fe;for(let Ce=0;Ce<$;Ce++){let Ee=Re[Ce];Et(Ee[0]+ce,Ee[1]+ce,Ee[2]+ce)}}else{for(let fe=0;fe<$;fe++){let ce=Re[fe];Et(ce[2],ce[1],ce[0])}for(let fe=0;fe<$;fe++){let ce=Re[fe];Et(ce[0]+V*h,ce[1]+V*h,ce[2]+V*h)}}n.addGroup(ne,i.length/3-ne,0)}function De(){let ne=i.length/3,fe=0;ae(z,fe),fe+=z.length;for(let ce=0,Ce=C.length;ce<Ce;ce++){let Ee=C[ce];ae(Ee,fe),fe+=Ee.length}n.addGroup(ne,i.length/3-ne,1)}function ae(ne,fe){let ce=ne.length;for(;--ce>=0;){let Ce=ce,Ee=ce-1;Ee<0&&(Ee=ne.length-1);for(let Qe=0,Be=h+g*2;Qe<Be;Qe++){let ct=V*Qe,ut=V*(Qe+1),xt=fe+Ce+ct,O=fe+Ee+ct,kt=fe+Ee+ut,lt=fe+Ce+ut;Ge(xt,O,kt,lt)}}}function Fe(ne,fe,ce){l.push(ne),l.push(fe),l.push(ce)}function Et(ne,fe,ce){et(ne),et(fe),et(ce);let Ce=i.length/3,Ee=b.generateTopUV(n,i,Ce-3,Ce-2,Ce-1);ke(Ee[0]),ke(Ee[1]),ke(Ee[2])}function Ge(ne,fe,ce,Ce){et(ne),et(fe),et(Ce),et(fe),et(ce),et(Ce);let Ee=i.length/3,Qe=b.generateSideWallUV(n,i,Ee-6,Ee-3,Ee-2,Ee-1);ke(Qe[0]),ke(Qe[1]),ke(Qe[3]),ke(Qe[1]),ke(Qe[2]),ke(Qe[3])}function et(ne){i.push(l[ne*3+0]),i.push(l[ne*3+1]),i.push(l[ne*3+2])}function ke(ne){r.push(ne.x),r.push(ne.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return k0(t,n,e)}static fromJSON(e,t){let n=[];for(let r=0,o=e.shapes.length;r<o;r++){let a=t[e.shapes[r]];n.push(a)}let i=e.options.extrudePath;return i!==void 0&&(e.options.extrudePath=new rh[i.type]().fromJSON(i)),new s(n,e.options)}},H0={generateTopUV:function(s,e,t,n,i){let r=e[t*3],o=e[t*3+1],a=e[n*3],l=e[n*3+1],c=e[i*3],h=e[i*3+1];return[new ye(r,o),new ye(a,l),new ye(c,h)]},generateSideWallUV:function(s,e,t,n,i,r){let o=e[t*3],a=e[t*3+1],l=e[t*3+2],c=e[n*3],h=e[n*3+1],u=e[n*3+2],d=e[i*3],f=e[i*3+1],p=e[i*3+2],y=e[r*3],g=e[r*3+1],m=e[r*3+2];return Math.abs(a-h)<Math.abs(o-c)?[new ye(o,1-l),new ye(c,1-u),new ye(d,1-p),new ye(y,1-m)]:[new ye(a,1-l),new ye(h,1-u),new ye(f,1-p),new ye(g,1-m)]}};function k0(s,e,t){if(t.shapes=[],Array.isArray(s))for(let n=0,i=s.length;n<i;n++){let r=s[n];t.shapes.push(r.uuid)}else t.shapes.push(s.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}var Lt=class s extends Ut{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};let r=e/2,o=t/2,a=Math.floor(n),l=Math.floor(i),c=a+1,h=l+1,u=e/a,d=t/l,f=[],p=[],y=[],g=[];for(let m=0;m<h;m++){let b=m*d-o;for(let T=0;T<c;T++){let M=T*u-r;p.push(M,-b,0),y.push(0,0,1),g.push(T/a),g.push(1-m/l)}}for(let m=0;m<l;m++)for(let b=0;b<a;b++){let T=b+c*m,M=b+c*(m+1),w=b+1+c*(m+1),v=b+1+c*m;f.push(T,M,v),f.push(M,w,v)}this.setIndex(f),this.setAttribute("position",new _t(p,3)),this.setAttribute("normal",new _t(y,3)),this.setAttribute("uv",new _t(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.width,e.height,e.widthSegments,e.heightSegments)}};var Nn=class s extends Ut{constructor(e=1,t=32,n=16,i=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let l=Math.min(o+a,Math.PI),c=0,h=[],u=new N,d=new N,f=[],p=[],y=[],g=[];for(let m=0;m<=n;m++){let b=[],T=m/n,M=o+T*a,w=e*Math.cos(M),v=Math.sqrt(e*e-w*w),x=0;m===0&&o===0?x=.5/t:m===n&&l===Math.PI&&(x=-.5/t);for(let _=0;_<=t;_++){let P=_/t,R=i+P*r;u.x=-v*Math.cos(R),u.y=w,u.z=v*Math.sin(R),p.push(u.x,u.y,u.z),d.copy(u).normalize(),y.push(d.x,d.y,d.z),g.push(P+x,1-T),b.push(c++)}h.push(b)}for(let m=0;m<n;m++)for(let b=0;b<t;b++){let T=h[m][b+1],M=h[m][b],w=h[m+1][b],v=h[m+1][b+1];(m!==0||o>0)&&f.push(T,M,v),(m!==n-1||l<Math.PI)&&f.push(M,w,v)}this.setIndex(f),this.setAttribute("position",new _t(p,3)),this.setAttribute("normal",new _t(y,3)),this.setAttribute("uv",new _t(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var ps=class s extends Ut{constructor(e=1,t=.4,n=12,i=48,r=Math.PI*2,o=0,a=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:r,thetaStart:o,thetaLength:a},n=Math.floor(n),i=Math.floor(i);let l=[],c=[],h=[],u=[],d=new N,f=new N,p=new N;for(let y=0;y<=n;y++){let g=o+y/n*a;for(let m=0;m<=i;m++){let b=m/i*r;f.x=(e+t*Math.cos(g))*Math.cos(b),f.y=(e+t*Math.cos(g))*Math.sin(b),f.z=t*Math.sin(g),c.push(f.x,f.y,f.z),d.x=e*Math.cos(b),d.y=e*Math.sin(b),p.subVectors(f,d).normalize(),h.push(p.x,p.y,p.z),u.push(m/i),u.push(y/n)}}for(let y=1;y<=n;y++)for(let g=1;g<=i;g++){let m=(i+1)*y+g-1,b=(i+1)*(y-1)+g-1,T=(i+1)*(y-1)+g,M=(i+1)*y+g;l.push(m,b,M),l.push(b,T,M)}this.setIndex(l),this.setAttribute("position",new _t(c,3)),this.setAttribute("normal",new _t(h,3)),this.setAttribute("uv",new _t(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc,e.thetaStart,e.thetaLength)}};function Es(s){let e={};for(let t in s){e[t]={};for(let n in s[t]){let i=s[t][n];if(kd(i))i.isRenderTargetTexture?(Oe("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone();else if(Array.isArray(i))if(kd(i[0])){let r=[];for(let o=0,a=i.length;o<a;o++)r[o]=i[o].clone();e[t][n]=r}else e[t][n]=i.slice();else e[t][n]=i}}return e}function ln(s){let e={};for(let t=0;t<s.length;t++){let n=Es(s[t]);for(let i in n)e[i]=n[i]}return e}function kd(s){return s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)}function z0(s){let e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function Wh(s){let e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:st.workingColorSpace}var Hf={clone:Es,merge:ln},G0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,V0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Qn=class extends pn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=G0,this.fragmentShader=V0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Es(e.uniforms),this.uniformsGroups=z0(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let i in this.uniforms){let o=this.uniforms[i].value;o&&o.isTexture?t.uniforms[i]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[i]={type:"m4",value:o.toArray()}:t.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let i=e.uniforms[n];switch(this.uniforms[n]={},i.type){case"t":this.uniforms[n].value=t[i.value]||null;break;case"c":this.uniforms[n].value=new se().setHex(i.value);break;case"v2":this.uniforms[n].value=new ye().fromArray(i.value);break;case"v3":this.uniforms[n].value=new N().fromArray(i.value);break;case"v4":this.uniforms[n].value=new bt().fromArray(i.value);break;case"m3":this.uniforms[n].value=new Je().fromArray(i.value);break;case"m4":this.uniforms[n].value=new We().fromArray(i.value);break;default:this.uniforms[n].value=i.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},Va=class extends Qn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},yi=class extends pn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new se(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new se(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Io,this.normalScale=new ye(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new In,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},mn=class extends yi{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ye(1,1),this.clearcoatNormalMap=null,this.diffuseRoughnessMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return rt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessMinimum=100,this.iridescenceThicknessMaximum=400,this.iridescenceThicknessMap=null,this.sheenColor=new se(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new se(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new se(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._diffuseRoughness=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get diffuseRoughness(){return this._diffuseRoughness}set diffuseRoughness(e){this._diffuseRoughness>0!=e>0&&this.version++,this._diffuseRoughness=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(e){this._retroreflectivity>0!=e>0&&this.version++,this._retroreflectivity=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}get iridescenceThicknessRange(){return as('MeshPhysicalMaterial: The "iridescenceThicknessRange" property has been replaced by "iridescenceThicknessMinimum" and "iridescenceThicknessMaximum".'),[this.iridescenceThicknessMinimum,this.iridescenceThicknessMaximum]}set iridescenceThicknessRange(e){as('MeshPhysicalMaterial: The "iridescenceThicknessRange" property has been replaced by "iridescenceThicknessMinimum" and "iridescenceThicknessMaximum".'),this.iridescenceThicknessMinimum=e[0],this.iridescenceThicknessMaximum=e[1]}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.diffuseRoughness=e.diffuseRoughness,this.diffuseRoughnessMap=e.diffuseRoughnessMap,this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum,this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum,this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.retroreflectivity=e.retroreflectivity,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var re=class extends pn{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new se(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new se(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Io,this.normalScale=new ye(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new In,this.combine=il,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Wa=class extends pn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=bf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Xa=class extends pn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function ki(s,e){return!s||s.constructor===e?s:typeof e.BYTES_PER_ELEMENT=="number"?new e(s):Array.prototype.slice.call(s)}function Dr(s){return s!==void 0&&s.inTangents!==void 0&&s.outTangents!==void 0}function W0(s){function e(i,r){return s[i]-s[r]}let t=s.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function zd(s,e,t){let n=s.length,i=new s.constructor(n);for(let r=0,o=0;o!==n;++r){let a=t[r]*e;for(let l=0;l!==e;++l)i[o++]=s[a+l]}return i}function X0(s,e,t,n){let i=1,r=s[0];for(;r!==void 0&&r[n]===void 0;)r=s[i++];if(r===void 0)return;let o=r[n];if(o!==void 0)if(Array.isArray(o))do o=r[n],o!==void 0&&(e.push(r.time),t.push(...o)),r=s[i++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[n],o!==void 0&&(e.push(r.time),o.toArray(t,t.length)),r=s[i++];while(r!==void 0);else do o=r[n],o!==void 0&&(e.push(r.time),t.push(o)),r=s[i++];while(r!==void 0)}var ei=class{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,i=t[n],r=t[n-1];e:{t:{let o;n:{i:if(!(e<i)){for(let a=n+2;;){if(i===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=i,i=t[++n],e<i)break t}o=t.length;break n}if(!(e>=r)){let a=t[1];e<a&&(n=2,r=a);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=r,r=t[--n-1],e>=r)break t}o=n,n=0;break n}break e}for(;n<o;){let a=n+o>>>1;e<t[a]?o=a:n=a+1}if(i=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i;for(let o=0;o!==i;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},qa=class extends ei{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:ss,endingEnd:ss}}intervalChanged_(e,t,n){let i=this.parameterPositions,r=e-2,o=e+1,a=i[r],l=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case rs:r=e,a=2*t-n;break;case Hr:r=i.length-2,a=t+i[r]-i[r+1];break;default:r=e,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case rs:o=e,l=2*n-t;break;case Hr:o=1,l=n+i[1]-i[0];break;default:o=e-1,l=t}let c=(n-t)*.5,h=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(e,t,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(i-t),y=p*p,g=y*p,m=-d*g+2*d*y-d*p,b=(1+d)*g+(-1.5-2*d)*y+(-.5+d)*p+1,T=(-1-f)*g+(1.5+f)*y+.5*p,M=f*g-f*y;for(let w=0;w!==a;++w)r[w]=m*o[h+w]+b*o[c+w]+T*o[l+w]+M*o[u+w];return r}},fo=class extends ei{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=(n-t)/(i-t),u=1-h;for(let d=0;d!==a;++d)r[d]=o[c+d]*u+o[l+d]*h;return r}},Ya=class extends ei{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}},Ka=class extends ei{interpolate_(e,t,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=this.inTangents,u=this.outTangents;if(!h||!u){let p=(n-t)/(i-t),y=1-p;for(let g=0;g!==a;++g)r[g]=o[c+g]*y+o[l+g]*p;return r}let d=a*2,f=e-1;for(let p=0;p!==a;++p){let y=o[c+p],g=o[l+p],m=f*d+p*2,b=u[m],T=u[m+1],M=e*d+p*2,w=h[M],v=h[M+1],x=Y0(n,t,b,w,i);r[p]=kf(x,y,T,v,g)}return r}};function kf(s,e,t,n,i){let r=1-s;return r*r*r*e+3*r*r*s*t+3*r*s*s*n+s*s*s*i}function q0(s,e,t,n,i){let r=1-s;return 3*r*r*(t-e)+6*r*s*(n-t)+3*s*s*(i-n)}function Y0(s,e,t,n,i){let r=(s-e)/(i-e);for(let o=0;o<8;o++){let a=kf(r,e,t,n,i)-s;if(Math.abs(a)<1e-10)break;let l=q0(r,e,t,n,i);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-a/l))}return r}var _n=class{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=ki(t,this.TimeBufferType),this.values=ki(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:ki(e.times,Array),values:ki(e.values,Array)};let i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i),Dr(e.settings)&&(n.settings={inTangents:ki(e.settings.inTangents,Array),outTangents:ki(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Ya(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new fo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new qa(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Ka(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case ls:t=this.InterpolantFactoryMethodDiscrete;break;case cs:t=this.InterpolantFactoryMethodLinear;break;case ba:t=this.InterpolantFactoryMethodSmooth;break;case ih:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Oe("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ls;case this.InterpolantFactoryMethodLinear:return cs;case this.InterpolantFactoryMethodSmooth:return ba;case this.InterpolantFactoryMethodBezier:return ih}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e;Dr(this.settings)&&(Gd(this.settings.inTangents,e),Gd(this.settings.outTangents,e))}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e;Dr(this.settings)&&(Vd(this.settings.inTangents,e),Vd(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,i=n.length,r=0,o=i-1;for(;r!==i&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==i){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(Ye("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,i=this.values,r=n.length;r===0&&(Ye("KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){let l=n[a];if(typeof l=="number"&&isNaN(l)){Ye("KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){Ye("KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(i!==void 0&&Lm(i))for(let a=0,l=i.length;a!==l;++a){let c=i[a];if(isNaN(c)){Ye("KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===ba,r=e.length-1,o=1;for(let a=1;a<r;++a){let l=!1,c=e[a],h=e[a+1];if(c!==h&&(a!==1||c!==e[0]))if(i)l=!0;else{let u=a*n,d=u-n,f=u+n;for(let p=0;p!==n;++p){let y=t[u+p];if(y!==t[d+p]||y!==t[f+p]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];let u=a*n,d=o*n;for(let f=0;f!==n;++f)t[d+f]=t[u+f]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,l=o*n,c=0;c!==n;++c)t[l+c]=t[a+c];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,Dr(this.settings)&&(i.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),i}};function Gd(s,e){for(let t=0,n=s.length;t!==n;t+=2)s[t]+=e}function Vd(s,e){for(let t=0,n=s.length;t!==n;t+=2)s[t]*=e}_n.prototype.ValueTypeName="";_n.prototype.TimeBufferType=Float32Array;_n.prototype.ValueBufferType=Float32Array;_n.prototype.DefaultInterpolation=cs;var vi=class extends _n{constructor(e,t,n){super(e,t,n)}};vi.prototype.ValueTypeName="bool";vi.prototype.ValueBufferType=Array;vi.prototype.DefaultInterpolation=ls;vi.prototype.InterpolantFactoryMethodLinear=void 0;vi.prototype.InterpolantFactoryMethodSmooth=void 0;var po=class extends _n{constructor(e,t,n,i){super(e,t,n,i)}};po.prototype.ValueTypeName="color";var Mi=class extends _n{constructor(e,t,n,i){super(e,t,n,i)}};Mi.prototype.ValueTypeName="number";var Ja=class extends ei{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-t)/(i-t),c=e*a;for(let h=c+a;c!==h;c+=4)Ot.slerpFlat(r,0,o,c-a,o,c,l);return r}},bi=class extends _n{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new Ja(this.times,this.values,this.getValueSize(),e)}};bi.prototype.ValueTypeName="quaternion";bi.prototype.InterpolantFactoryMethodSmooth=void 0;var Si=class extends _n{constructor(e,t,n){super(e,t,n)}};Si.prototype.ValueTypeName="string";Si.prototype.ValueBufferType=Array;Si.prototype.DefaultInterpolation=ls;Si.prototype.InterpolantFactoryMethodLinear=void 0;Si.prototype.InterpolantFactoryMethodSmooth=void 0;var Vi=class extends _n{constructor(e,t,n,i){super(e,t,n,i)}};Vi.prototype.ValueTypeName="vector";var ms=class{constructor(e="",t=-1,n=[],i=Xl){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=Yn(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,i=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(J0(n[o]).scale(i));let r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r.userData=JSON.parse(e.userData||"{}"),r}static toJSON(e){let t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let r=0,o=n.length;r!==o;++r)t.push(_n.toJSON(n[r]));return i}static CreateFromMorphTargetSequence(e,t,n,i){let r=t.length,o=[];for(let a=0;a<r;a++){let l=[],c=[];l.push((a+r-1)%r,a,(a+1)%r),c.push(0,1,0);let h=W0(l);l=zd(l,1,h),c=zd(c,1,h),!i&&l[0]===0&&(l.push(r),c.push(c[0])),o.push(new Mi(".morphTargetInfluences["+t[a].name+"]",l,c).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let i={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,l=e.length;a<l;a++){let c=e[a],h=c.name.match(r);if(h&&h.length>1){let u=h[1],d=i[u];d||(i[u]=d=[]),d.push(c)}}let o=[];for(let a in i)o.push(this.CreateFromMorphTargetSequence(a,i[a],t,n));return o}resetDuration(){let e=this.tracks,t=0;for(let n=0,i=e.length;n!==i;++n){let r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());let t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}};function K0(s){switch(s.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Mi;case"vector":case"vector2":case"vector3":case"vector4":return Vi;case"color":return po;case"quaternion":return bi;case"bool":case"boolean":return vi;case"string":return Si}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+s)}function J0(s){if(s.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=K0(s.type);if(s.times===void 0){let n=[],i=[];X0(s.keys,n,i,"value"),s.times=n,s.values=i}let t;return e.parse!==void 0?t=e.parse(s):t=new e(s.name,s.times,s.values,s.interpolation),Dr(s.settings)&&(t.settings={inTangents:ki(s.settings.inTangents,Float32Array),outTangents:ki(s.settings.outTangents,Float32Array)}),t}var $n={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&(Wd(s)||(this.files[s]=e))},get:function(s){if(this.enabled!==!1&&!Wd(s))return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};function Wd(s){try{let e=s.slice(s.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}var Za=class{constructor(e,t,n){let i=this,r=!1,o=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(h){a++,r===!1&&i.onStart!==void 0&&i.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,a),o===a&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){let u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){let f=c[u],p=c[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return p}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},zf=new Za,ti=class{constructor(e){this.manager=e!==void 0?e:zf,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},this.priority="auto",this.cache="default",typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(i,r){n.load(e,i,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}setPriority(e){return this.priority=e,this}setCache(e){return this.cache=e,this}abort(){return this}};ti.DEFAULT_MATERIAL_NAME="__DEFAULT";var pi={},ch=class extends Error{constructor(e,t){super(e),this.response=t}},cr=class extends ti{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=$n.get(`file:${e}`);if(r!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0);return}if(pi[e]!==void 0){pi[e].push({onLoad:t,onProgress:n,onError:i});return}pi[e]=[],pi[e].push({onLoad:t,onProgress:n,onError:i});let o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",priority:this.priority,cache:this.cache,signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),a=this.mimeType,l=this.responseType;fetch(o).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&Oe("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;let h=pi[e],u=c.body.getReader(),d=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=d?parseInt(d):0,p=f!==0,y=0,g=new ReadableStream({start(m){b();function b(){u.read().then(({done:T,value:M})=>{if(T)m.close();else{y+=M.byteLength;let w=new ProgressEvent("progress",{lengthComputable:p,loaded:y,total:f});for(let v=0,x=h.length;v<x;v++){let _=h[v];_.onProgress&&_.onProgress(w)}m.enqueue(M),b()}},T=>{m.error(T)})}}});return new Response(g)}else throw new ch(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,a));case"json":return c.json();default:if(a==="")return c.text();{let u=/charset="?([^;"\s]*)"?/i.exec(a),d=u&&u[1]?u[1].toLowerCase():void 0,f=new TextDecoder(d);return c.arrayBuffer().then(p=>f.decode(p))}}}).then(c=>{$n.add(`file:${e}`,c);let h=pi[e];delete pi[e];for(let u=0,d=h.length;u<d;u++){let f=h[u];f.onLoad&&f.onLoad(c)}}).catch(c=>{let h=pi[e];if(h===void 0)throw this.manager.itemError(e),c;delete pi[e];for(let u=0,d=h.length;u<d;u++){let f=h[u];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var zs=new WeakMap,$a=class extends ti{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,o=$n.get(`image:${e}`);if(o!==void 0){if(o.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0);else{let u=zs.get(o);u===void 0&&(u=[],zs.set(o,u)),u.push({onLoad:t,onError:i})}return o}let a=Ks("img");function l(){h(),t&&t(this);let u=zs.get(this)||[];for(let d=0;d<u.length;d++){let f=u[d];f.onLoad&&f.onLoad(this)}zs.delete(this),r.manager.itemEnd(e)}function c(u){h(),i&&i(u),$n.remove(`image:${e}`);let d=zs.get(this)||[];for(let f=0;f<d.length;f++){let p=d[f];p.onError&&p.onError(u)}zs.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),$n.add(`image:${e}`,a),r.manager.itemStart(e),a.fetchPriority=this.priority,a.src=e,a}};var mo=class extends ti{constructor(e){super(e)}load(e,t,n,i){let r=new Wt,o=new $a(this.manager);return o.setPriority(this.priority),o.setCache(this.cache),o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},n,i),r}},Wi=class extends Rt{static registerNode(e){this.prototype._lightNode=e}constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new se(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},go=class extends Wi{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Rt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new se(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},eh=new We,Xd=new N,qd=new N,hr=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ye(512,512),this.mapType=vn,this.map=null,this.mapPass=null,this.matrix=new We,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Gi,this._frameExtents=new ye(1,1),this._viewportCount=1,this._viewports=[new bt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;Xd.setFromMatrixPosition(e.matrixWorld),t.position.copy(Xd),qd.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(qd),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,i){eh.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(eh,e.coordinateSystem,e.reversedDepth);let r=this._frameExtents,o=i?i.z/r.x:1,a=i?i.w/r.y:1,l=i?i.x/r.x:0,c=i?i.y/r.y:0;e.coordinateSystem===Ys||e.reversedDepth?t.set(.5*o,0,0,.5*o+l,0,.5*a,0,.5*a+c,0,0,1,0,0,0,0,1):t.set(.5*o,0,0,.5*o+l,0,.5*a,0,.5*a+c,0,0,.5,.5,0,0,0,1),t.multiply(eh)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.mapType=e.mapType,this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.mapType=this.mapType,e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},va=new N,Ma=new Ot,Zn=new N,xo=class extends Rt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new We,this.projectionMatrix=new We,this.projectionMatrixInverse=new We,this.coordinateSystem=Pn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(va,Ma,Zn),Zn.x===1&&Zn.y===1&&Zn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(va,Ma,Zn.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(va,Ma,Zn),Zn.x===1&&Zn.y===1&&Zn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(va,Ma,Zn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Hi=new N,Yd=new ye,Kd=new ye,Vt=class extends xo{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=hs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Ur*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return hs*2*Math.atan(Math.tan(Ur*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Hi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Hi.x,Hi.y).multiplyScalar(-e/Hi.z),Hi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Hi.x,Hi.y).multiplyScalar(-e/Hi.z)}getViewSize(e,t){return this.getViewBounds(e,Yd,Kd),t.subVectors(Kd,Yd)}setViewOffset(e,t,n,i,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Ur*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,r=-.5*i,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*i/l,t-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}let a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},hh=class extends hr{constructor(){super(new Vt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,n=hs*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(n!==t.fov||i!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=i,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this.aspect=e.aspect,this}toJSON(){let e=super.toJSON();return e.focus=this.focus,e.aspect=this.aspect,e}},_o=class extends Wi{constructor(e,t,n=0,i=Math.PI/3,r=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Rt.DEFAULT_UP),this.updateMatrix(),this.target=new Rt,this.distance=n,this.angle=i,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new hh}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}},uh=class extends hr{constructor(){super(new Vt(90,1,.5,500)),this.isPointLightShadow=!0}},yo=class extends Wi{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new uh}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},gs=class extends xo{constructor(e=-1,t=1,n=1,i=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,r=n-e,o=n+e,a=i+t,l=i-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},dh=class extends hr{constructor(){super(new gs(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},xs=class extends Wi{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Rt.DEFAULT_UP),this.updateMatrix(),this.target=new Rt,this.shadow=new dh}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},vo=class extends Wi{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}};var Ei=class{static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}};var th=new WeakMap,Mo=class extends ti{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&Oe("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&Oe("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,o=$n.get(`image-bitmap:${e}`);if(o!==void 0){if(r.manager.itemStart(e),o.then){o.then(c=>{th.has(o)===!0?(i&&i(th.get(o)),r.manager.itemError(e),r.manager.itemEnd(e)):(t&&t(c),r.manager.itemEnd(e))});return}setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0);return}let a={};a.credentials=this.withCredentials||this.crossOrigin!=="anonymous"?"include":"same-origin",a.headers=this.requestHeader,a.priority=this.priority,a.cache=this.cache,a.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let l=fetch(e,a).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign({},r.options,{colorSpaceConversion:"none"}))}).then(function(c){return $n.add(`image-bitmap:${e}`,c),t&&t(c),r.manager.itemEnd(e),c}).catch(function(c){i&&i(c),th.set(l,c),$n.remove(`image-bitmap:${e}`),r.manager.itemError(e),r.manager.itemEnd(e)});$n.add(`image-bitmap:${e}`,l),r.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var Gs=-90,Vs=1,ur=class extends Rt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new Vt(Gs,Vs,e,t);i.layers=this.layers,this.add(i);let r=new Vt(Gs,Vs,e,t);r.layers=this.layers,this.add(r);let o=new Vt(Gs,Vs,e,t);o.layers=this.layers,this.add(o);let a=new Vt(Gs,Vs,e,t);a.layers=this.layers,this.add(a);let l=new Vt(Gs,Vs,e,t);l.layers=this.layers,this.add(l);let c=new Vt(Gs,Vs,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,i,r,o,a,l]=t;for(let c of t)this.remove(c);if(e===Pn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Ys)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,l,c,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let y=n.texture.mipmapsAutoUpdate;n.texture.mipmapsAutoUpdate=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(n,0,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,2,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,3,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.mipmapsAutoUpdate=y,e.setRenderTarget(n,5,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},ja=class extends Vt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e,this.perCameraFrustumCulled=!1}};var Qa=class{constructor(e,t,n){this.binding=e,this.valueSize=n;let i,r,o;switch(t){case"quaternion":i=this._slerp,r=this._slerpAdditive,o=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":i=this._select,r=this._select,o=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:i=this._lerp,r=this._lerpAdditive,o=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=i,this._mixBufferRegionAdditive=r,this._setIdentity=o,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){let n=this.buffer,i=this.valueSize,r=e*i+i,o=this.cumulativeWeight;if(o===0){for(let a=0;a!==i;++a)n[r+a]=n[a];o=t}else{o+=t;let a=t/o;this._mixBufferRegion(n,r,0,a,i)}this.cumulativeWeight=o}accumulateAdditive(e){let t=this.buffer,n=this.valueSize,i=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,i,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){let t=this.valueSize,n=this.buffer,i=e*t+t,r=this.cumulativeWeight,o=this.cumulativeWeightAdditive,a=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,r<1){let l=t*this._origIndex;this._mixBufferRegion(n,i,l,1-r,t)}o>0&&this._mixBufferRegionAdditive(n,i,this._addIndex*t,1,t);for(let l=t,c=t+t;l!==c;++l)if(n[l]!==n[l+t]){a.setValue(n,i);break}}saveOriginalState(){let e=this.binding,t=this.buffer,n=this.valueSize,i=n*this._origIndex;e.getValue(t,i);for(let r=n,o=i;r!==o;++r)t[r]=t[i+r%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){let e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){let e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){let e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,i,r){if(i>=.5)for(let o=0;o!==r;++o)e[t+o]=e[n+o]}_slerp(e,t,n,i){Ot.slerpFlat(e,t,e,t,e,n,i)}_slerpAdditive(e,t,n,i,r){let o=this._workIndex*r;Ot.multiplyQuaternionsFlat(e,o,e,t,e,n),Ot.slerpFlat(e,t,e,t,e,o,i)}_lerp(e,t,n,i,r){let o=1-i;for(let a=0;a!==r;++a){let l=t+a;e[l]=e[l]*o+e[n+a]*i}}_lerpAdditive(e,t,n,i,r){for(let o=0;o!==r;++o){let a=t+o;e[a]=e[a]+e[n+o]*i}}},Xh="\\[\\]\\.:\\/",Z0=new RegExp("["+Xh+"]","g"),qh="[^"+Xh+"]",$0="[^"+Xh.replace("\\.","")+"]",j0=/((?:WC+[\/:])*)/.source.replace("WC",qh),Q0=/(WCOD+)?/.source.replace("WCOD",$0),eg=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",qh),tg=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",qh),ng=new RegExp("^"+j0+Q0+eg+tg+"$"),ig=["material","materials","bones","map"],fh=class{constructor(e,t,n){let i=n||St.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},St=class s{constructor(e,t,n){this.path=t,this.parsedPath=n||s.parseTrackName(t),this.node=s.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new s.Composite(e,t,n):new s(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Z0,"")}static parseTrackName(e){let t=ng.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let r=n.nodeName.substring(i+1);ig.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===t||a.uuid===t)return a;let l=n(a.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,i=t.propertyName,r=t.propertyIndex;if(e||(e=s.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Oe("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){Ye("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Ye("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Ye("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Ye("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Ye("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){Ye("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){Ye("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let o=e[i];if(o===void 0){let c=t.nodeName;Ye("PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){Ye("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Ye("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};St.Composite=fh;St.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};St.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};St.prototype.GetterByBindingType=[St.prototype._getValue_direct,St.prototype._getValue_array,St.prototype._getValue_arrayElement,St.prototype._getValue_toArray];St.prototype.SetterByBindingTypeAndVersioning=[[St.prototype._setValue_direct,St.prototype._setValue_direct_setNeedsUpdate,St.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[St.prototype._setValue_array,St.prototype._setValue_array_setNeedsUpdate,St.prototype._setValue_array_setMatrixWorldNeedsUpdate],[St.prototype._setValue_arrayElement,St.prototype._setValue_arrayElement_setNeedsUpdate,St.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[St.prototype._setValue_fromArray,St.prototype._setValue_fromArray_setNeedsUpdate,St.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var el=class{constructor(e,t,n=null,i=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=i;let r=t.tracks,o=r.length,a=new Array(o),l={endingStart:ss,endingEnd:ss};for(let c=0;c!==o;++c){let h=r[c].createInterpolant(null);a[c]=h,h.settings=l}this._interpolantSettings=l,this._interpolants=a,this._propertyBindings=new Array(o),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._restoreTimeScale=null,this._weightInterpolant=null,this.loop=yf,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n=!1){if(e.fadeOut(t),this.fadeIn(t),n===!0){let i=this._clip.duration,r=e._clip.duration,o=r/i,a=i/r;e._restoreTimeScale=e.timeScale,this._restoreTimeScale=this.timeScale,e.warp(1,o,t),this.warp(a,1,t)}return this}crossFadeTo(e,t,n=!1){return e.crossFadeFrom(this,t,n)}stopFading(){let e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){let i=this._mixer,r=i.time,o=this.timeScale,a=this._timeScaleInterpolant;a===null&&(a=i._lendControlInterpolant(),this._timeScaleInterpolant=a);let l=a.parameterPositions,c=a.sampleValues;return l[0]=r,l[1]=r+n,c[0]=e/o,c[1]=t/o,this}stopWarping(){let e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this._restoreTimeScale=null,this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,i){if(!this.enabled){this._updateWeight(e);return}let r=this._startTime;if(r!==null){let l=(e-r)*n;l<0||n===0?t=0:(this._startTime=null,t=n*l)}t*=this._updateTimeScale(e);let o=this._updateTime(t),a=this._updateWeight(e);if(a>0){let l=this._interpolants,c=this._propertyBindings;switch(this.blendMode){case Mf:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(o),c[h].accumulateAdditive(a);break;case Xl:default:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(o),c[h].accumulate(i,a)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;let n=this._weightInterpolant;if(n!==null){let i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopFading(),i===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;let n=this._timeScaleInterpolant;if(n!==null){let i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(t===0?this.paused=!0:(this._restoreTimeScale!==null&&(t=this._restoreTimeScale),this.timeScale=t),this.stopWarping())}}return this._effectiveTimeScale=t,t}_updateTime(e){let t=this._clip.duration,n=this.loop,i=this.time+e,r=this._loopCount,o=n===vf;if(e===0)return r===-1?i:o&&(r&1)===1?t-i:i;if(n===Wl){r===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(i>=t)i=t;else if(i<0)i=0;else{this.time=i;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(r===-1&&(e>=0?(r=0,this._setEndings(!0,this.repetitions===0,o)):this._setEndings(this.repetitions===0,!0,o)),i>=t||i<0){let a=Math.floor(i/t);i-=t*a,r+=Math.abs(a);let l=this.repetitions-r;if(l<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,i=e>0?t:0,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(l===1){let c=e<0;this._setEndings(c,!c,o)}else this._setEndings(!1,!1,o);this._loopCount=r,this.time=i,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:a})}}else this._loopCount=r,this.time=i;if(o&&(r&1)===1)return t-i}return i}_setEndings(e,t,n){let i=this._interpolantSettings;n?(i.endingStart=rs,i.endingEnd=rs):(e?i.endingStart=this.zeroSlopeAtStart?rs:ss:i.endingStart=Hr,t?i.endingEnd=this.zeroSlopeAtEnd?rs:ss:i.endingEnd=Hr)}_scheduleFading(e,t,n){let i=this._mixer,r=i.time,o=this._weightInterpolant;o===null&&(o=i._lendControlInterpolant(),this._weightInterpolant=o);let a=o.parameterPositions,l=o.sampleValues;return a[0]=r,l[0]=t,a[1]=r+e,l[1]=n,this}},sg=new Float32Array(1),_s=class extends Wn{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}_bindAction(e,t){let n=e._localRoot||this._root,i=e._clip.tracks,r=i.length,o=e._propertyBindings,a=e._interpolants,l=n.uuid,c=this._bindingsByRootAndName,h=c[l];h===void 0&&(h={},c[l]=h);for(let u=0;u!==r;++u){let d=i[u],f=d.name,p=h[f];if(p!==void 0)++p.referenceCount,o[u]=p;else{if(p=o[u],p!==void 0){p._cacheIndex===null&&(++p.referenceCount,this._addInactiveBinding(p,l,f));continue}let y=t&&t._propertyBindings[u].binding.parsedPath;p=new Qa(St.create(n,f,y),d.ValueTypeName,d.getValueSize()),++p.referenceCount,this._addInactiveBinding(p,l,f),o[u]=p}a[u].resultBuffer=p.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){let n=(e._localRoot||this._root).uuid,i=e._clip.uuid,r=this._actionsByClip[i];this._bindAction(e,r&&r.knownActions[0]),this._addInactiveAction(e,i,n)}let t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){let r=t[n];r.useCount++===0&&(this._lendBinding(r),r.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){let t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){let r=t[n];--r.useCount===0&&(r.restoreOriginalState(),this._takeBackBinding(r))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;let e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){let t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){let i=this._actions,r=this._actionsByClip,o=r[t];if(o===void 0)o={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,r[t]=o;else{let a=o.knownActions;e._byClipCacheIndex=a.length,a.push(e)}e._cacheIndex=i.length,i.push(e),o.actionByRoot[n]=e}_removeInactiveAction(e){let t=this._actions,n=t[t.length-1],i=e._cacheIndex;n._cacheIndex=i,t[i]=n,t.pop(),e._cacheIndex=null;let r=e._clip.uuid,o=this._actionsByClip,a=o[r],l=a.knownActions,c=l[l.length-1],h=e._byClipCacheIndex;c._byClipCacheIndex=h,l[h]=c,l.pop(),e._byClipCacheIndex=null;let u=a.actionByRoot,d=(e._localRoot||this._root).uuid;delete u[d],l.length===0&&delete o[r],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){let t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){let r=t[n];--r.referenceCount===0&&this._removeInactiveBinding(r)}}_lendAction(e){let t=this._actions,n=e._cacheIndex,i=this._nActiveActions++,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_takeBackAction(e){let t=this._actions,n=e._cacheIndex,i=--this._nActiveActions,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_addInactiveBinding(e,t,n){let i=this._bindingsByRootAndName,r=this._bindings,o=i[t];o===void 0&&(o={},i[t]=o),o[n]=e,e._cacheIndex=r.length,r.push(e)}_removeInactiveBinding(e){let t=this._bindings,n=e.binding,i=n.rootNode.uuid,r=n.path,o=this._bindingsByRootAndName,a=o[i],l=t[t.length-1],c=e._cacheIndex;l._cacheIndex=c,t[c]=l,t.pop(),delete a[r],Object.keys(a).length===0&&delete o[i]}_lendBinding(e){let t=this._bindings,n=e._cacheIndex,i=this._nActiveBindings++,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_takeBackBinding(e){let t=this._bindings,n=e._cacheIndex,i=--this._nActiveBindings,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_lendControlInterpolant(){let e=this._controlInterpolants,t=this._nActiveControlInterpolants++,n=e[t];return n===void 0&&(n=new fo(new Float32Array(2),new Float32Array(2),1,sg),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){let t=this._controlInterpolants,n=e.__cacheIndex,i=--this._nActiveControlInterpolants,r=t[i];e.__cacheIndex=i,t[i]=e,r.__cacheIndex=n,t[n]=r}clipAction(e,t,n){let i=t||this._root,r=i.uuid,o=typeof e=="string"?ms.findByName(i,e):e,a=o!==null?o.uuid:e,l=this._actionsByClip[a],c=null;if(n===void 0&&(o!==null?n=o.blendMode:n=Xl),l!==void 0){let u=l.actionByRoot[r];if(u!==void 0&&u.blendMode===n)return u;c=l.knownActions[0],o===null&&(o=c._clip)}if(o===null)return null;let h=new el(this,o,t,n);return this._bindAction(h,c),this._addInactiveAction(h,a,r),h}existingAction(e,t){let n=t||this._root,i=n.uuid,r=typeof e=="string"?ms.findByName(n,e):e,o=r?r.uuid:e,a=this._actionsByClip[o];return a!==void 0&&a.actionByRoot[i]||null}stopAllAction(){let e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;let t=this._actions,n=this._nActiveActions,i=this.time+=e,r=Math.sign(e),o=this._accuIndex^=1;for(let c=0;c!==n;++c)t[c]._update(i,e,r,o);let a=this._bindings,l=this._nActiveBindings;for(let c=0;c!==l;++c)a[c].apply(o);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){let t=this._actions,n=e.uuid,i=this._actionsByClip,r=i[n];if(r!==void 0){let o=r.knownActions;for(let a=0,l=o.length;a!==l;++a){let c=o[a];this._deactivateAction(c);let h=c._cacheIndex,u=t[t.length-1];c._cacheIndex=null,c._byClipCacheIndex=null,u._cacheIndex=h,t[h]=u,t.pop(),this._removeInactiveBindingsForAction(c)}delete i[n]}}uncacheRoot(e){let t=e.uuid,n=this._actionsByClip;for(let o in n){let a=n[o].actionByRoot,l=a[t];l!==void 0&&(this._deactivateAction(l),this._removeInactiveAction(l))}let i=this._bindingsByRootAndName,r=i[t];if(r!==void 0)for(let o in r){let a=r[o];a.restoreOriginalState(),this._removeInactiveBinding(a)}}uncacheAction(e,t){let n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}};var jh=class jh{constructor(e,t,n,i){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,i)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,i){let r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=i,this}};jh.prototype.isMatrix2=!0;var ph=jh;function Yh(s,e,t,n){let i=rg(n);switch(t){case Ih:return s*e;case hl:return s*e/i.components*i.byteLength;case ul:return s*e/i.components*i.byteLength;case qi:return s*e*2/i.components*i.byteLength;case dl:return s*e*2/i.components*i.byteLength;case Lh:return s*e*3/i.components*i.byteLength;case Un:return s*e*4/i.components*i.byteLength;case fl:return s*e*4/i.components*i.byteLength;case Eo:case To:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case wo:case Ao:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case ml:case xl:return Math.max(s,16)*Math.max(e,8)/4;case pl:case gl:return Math.max(s,8)*Math.max(e,8)/2;case _l:case yl:case Ml:case bl:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case vl:case Ro:case Sl:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case El:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Tl:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case wl:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case Al:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case Rl:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case Cl:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case Pl:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case Il:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case Ll:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case Nl:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case Dl:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case Ul:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case Ol:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case Fl:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case Bl:case Hl:case kl:return Math.ceil(s/4)*Math.ceil(e/4)*16;case zl:case Gl:return Math.ceil(s/4)*Math.ceil(e/4)*8;case Co:case Vl:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function rg(s){switch(s){case vn:case Ah:return{byteLength:1,components:1};case gr:case Rh:case qn:return{byteLength:2,components:1};case ll:case cl:return{byteLength:2,components:4};case Xn:case al:case Tn:return{byteLength:4,components:1};case Ch:case Ph:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"187"}}));typeof window<"u"&&(window.__THREE__?Oe("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="187");function cp(){let s=null,e=!1,t=null,n=null;function i(r,o){n=s.requestAnimationFrame(i),t(r,o)}return{start:function(){e!==!0&&t!==null&&s!==null&&(n=s.requestAnimationFrame(i),e=!0)},stop:function(){s!==null&&s.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function ag(s){let e=new WeakMap;function t(a,l){let c=a.array,h=a.usage,u=c.byteLength,d=s.createBuffer();s.bindBuffer(l,d),s.bufferData(l,c,h),a.onUploadCallback();let f;if(c instanceof Float32Array)f=s.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=s.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=s.HALF_FLOAT:f=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=s.SHORT;else if(c instanceof Uint32Array)f=s.UNSIGNED_INT;else if(c instanceof Int32Array)f=s.INT;else if(c instanceof Int8Array)f=s.BYTE;else if(c instanceof Uint8Array)f=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,l,c){let h=l.array,u=l.updateRanges;if(s.bindBuffer(c,a),u.length===0)s.bufferSubData(c,0,h);else{u.sort((f,p)=>f.start-p.start);let d=0;for(let f=1;f<u.length;f++){let p=u[d],y=u[f];y.start<=p.start+p.count+1?p.count=Math.max(p.count,y.start+y.count-p.start):(++d,u[d]=y)}u.length=d+1;for(let f=0,p=u.length;f<p;f++){let y=u[f];s.bufferSubData(c,y.start*h.BYTES_PER_ELEMENT,h,y.start,y.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=e.get(a);l&&(s.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:i,remove:r,update:o}}var lg=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,cg=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,hg=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,ug=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,dg=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,fg=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,pg=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,mg=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,gg=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,xg=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,_g=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,yg=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,vg=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Mg=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bg=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Sg=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Eg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Tg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,wg=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Ag=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Rg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Cg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Pg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,Ig=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Lg=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,Ng=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Dg=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Ug=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Og=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Fg="gl_FragColor = linearToOutputTexel( gl_FragColor );",Bg=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Hg=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,kg=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,zg=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Gg=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Vg=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Wg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Xg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,qg=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Yg=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Kg=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Jg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Zg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,$g=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,jg=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,Qg=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * worldNormal, ENVMAP_MAX_LOD );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * reflectVec, roughnessToMip( roughness ) );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureLod( envMap, envMapRotation * retroVec, roughnessToMip( roughness ) );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_PMREM
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,ex=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,tx=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,nx=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,ix=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,sx=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.045 );
material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef USE_DIFFUSE_ROUGHNESS
	float diffuseRoughnessFactor = diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		diffuseRoughnessFactor *= texture2D( diffuseRoughnessMap, vDiffuseRoughnessMapUv ).r;
	#endif
	material.diffuseRoughness = saturate( diffuseRoughnessFactor );
#endif
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.045 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,rx=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float diffuseRoughness;
	#endif
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
#ifdef USE_DIFFUSE_ROUGHNESS
	const float EON_EPSILON = 1e-7;
	float FON_DirectionalAlbedo( const in float mu, const in float roughness, const in float A ) {
		float muComp = 1.0 - mu;
		float gOverPi = muComp * ( 0.0571085289 + muComp * ( 0.491881867 + muComp * ( - 0.332181442 + muComp * 0.0714429953 ) ) );
		return A * ( 1.0 + roughness * gOverPi );
	}
	vec3 BRDF_EON( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 diffuseColor, const in float roughness ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return BRDF_Lambert( rho );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float s = dot( lightDir, viewDir ) - dotNL * dotNV;
		float sOverT = ( s > 0.0 ) ? s / max( max( dotNL, dotNV ), EON_EPSILON ) : s;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		vec3 singleScatter = rho * RECIPROCAL_PI * A * ( 1.0 + roughness * sOverT );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		float albedoV = FON_DirectionalAlbedo( dotNV, roughness, A );
		float albedoL = FON_DirectionalAlbedo( dotNL, roughness, A );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		vec3 multiScatter = rhoMultiScatter * RECIPROCAL_PI
			* max( EON_EPSILON, 1.0 - albedoV )
			* max( EON_EPSILON, 1.0 - albedoL )
			/ max( EON_EPSILON, 1.0 - averageAlbedo );
		return singleScatter + multiScatter;
	}
	vec3 EON_DirectionalAlbedo( const in vec3 diffuseColor, const in float roughness, const in float dotNV ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return rho;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		float directionalAlbedo = FON_DirectionalAlbedo( dotNV, roughness, A );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		return rho * directionalAlbedo + rhoMultiScatter * ( 1.0 - directionalAlbedo );
	}
#endif
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = max( material.clearcoatRoughness, 0.045 );
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = max( material.roughness, 0.045 );
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float alphaT = max( material.alphaT, alpha );
		float V = V_GGX_SmithCorrelated_Anisotropic( alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		vec3 diffuseBRDF = BRDF_EON( directLight.direction, geometryViewDir, geometryNormal, material.diffuseColor, material.diffuseRoughness ) * ( 1.0 - material.metalness );
	#else
		vec3 diffuseBRDF = BRDF_Lambert( material.diffuseContribution );
	#endif
	reflectedLight.directDiffuse += irradiance * diffuseBRDF * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuseAlbedo = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness );
		vec3 diffuse = irradiance * RECIPROCAL_PI * diffuseAlbedo * ( 1.0 - singleScattering - multiScattering );
	#else
		vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#endif
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuse = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness ) * ( 1.0 - totalScatteringDielectric );
	#else
		vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	#endif
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,ox=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_LIGHT_PROBE_GRIDS > 0
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		int probeGrid = - 1;
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( isInsideLightProbeGrid( probeWorldPos, probeWorldNormal, probesMin[ i ], probesMax[ i ], probesResolution[ i ] ) ) probeGrid = UNROLLED_LOOP_INDEX;
		}
		#pragma unroll_loop_end
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( probeGrid == UNROLLED_LOOP_INDEX ) irradiance += getLightProbeGridIrradiance( probesSH[ i ], probesMin[ i ], probesMax[ i ], probesResolution[ i ], probeWorldPos, probeWorldNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,ax=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_PMREM )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lx=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,cx=`#if NUM_LIGHT_PROBE_GRIDS > 0
uniform highp sampler3D probesSH[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMin[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMax[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesResolution[ NUM_LIGHT_PROBE_GRIDS ];
bool isInsideLightProbeGrid( vec3 worldPos, vec3 worldNormal, vec3 probesMin, vec3 probesMax, vec3 probesResolution ) {
	vec3 spacing = ( probesMax - probesMin ) / probesResolution;
	vec3 samplePos = worldPos + worldNormal * spacing * 0.5;
	vec3 margin = spacing * 0.01;
	return all( greaterThanEqual( samplePos, probesMin - margin ) ) && all( lessThanEqual( samplePos, probesMax + margin ) );
}
vec3 getLightProbeGridIrradiance( highp sampler3D probesSH, vec3 probesMin, vec3 probesMax, vec3 probesResolution, vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 probeSpacing = gridRange / res;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.5 / res, 1.0 - 0.5 / res );
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,hx=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,ux=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,dx=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,fx=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,px=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,mx=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,gx=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,xx=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,_x=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,yx=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,vx=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Mx=`#if defined( USE_MORPHCOLORS )
	#if defined( USE_COLOR_ALPHA )
		vColor *= morphTargetBaseInfluence;
	#elif defined( USE_COLOR )
		vColor.rgb *= morphTargetBaseInfluence;
	#endif
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor.rgb += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,bx=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Sx=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Ex=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Tx=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,wx=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Ax=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Rx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Cx=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Px=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Ix=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Lx=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Nx=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Dx=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Ux=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Ox=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,Fx=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Bx=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Hx=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,kx=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,zx=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Gx=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Vx=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				vec2 radius = shadowRadius * texelSize;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float lightDistance = length( lightToPosition );
			float depthRange = shadowCameraFar - shadowCameraNear;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float depthA = - shadowCameraNear / depthRange - shadowBias;
				float depthB = shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#else
				float depthA = shadowCameraFar / depthRange + shadowBias;
				float depthB = - shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			shadow = 0.0;
			for ( int i = 0; i < 5; i ++ ) {
				vec2 offset = vogelDiskSample( i, 5, phi );
				vec3 direction = bd3D + ( tangent * offset.x + bitangent * offset.y ) * texelSize;
				vec3 absDirection = abs( direction );
				float dp = depthA + depthB / max( max( absDirection.x, absDirection.y ), absDirection.z );
				shadow += texture( shadowMap, vec4( direction, dp ) );
			}
			shadow *= 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,Wx=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Xx=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,qx=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Yx=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Kx=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Jx=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Zx=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,$x=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,jx=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Qx=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,e_=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,t_=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,n_=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,i_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,s_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	uniform mat3 diffuseRoughnessMapTransform;
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,r_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	vDiffuseRoughnessMapUv = ( diffuseRoughnessMapTransform * vec3( DIFFUSE_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,o_=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,a_=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,l_=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,c_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,h_=`uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <envmap_common_pars_fragment>
void main() {
	#ifdef ENVMAP_TYPE_PMREM
		vec4 texColor = textureLod( envMap, backgroundRotation * vWorldDirection, roughnessToMip( backgroundBlurriness ) );
	#else
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,u_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,d_=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,f_=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,p_=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,m_=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,g_=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,x_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,__=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,y_=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,v_=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,M_=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,b_=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,S_=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,E_=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,T_=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,w_=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,A_=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,R_=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,C_=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,P_=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,I_=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,L_=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DIFFUSE_ROUGHNESS
	uniform float diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		uniform sampler2D diffuseRoughnessMap;
	#endif
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,N_=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,D_=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,U_=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,O_=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,F_=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,B_=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,H_=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,k_=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ze={alphahash_fragment:lg,alphahash_pars_fragment:cg,alphamap_fragment:hg,alphamap_pars_fragment:ug,alphatest_fragment:dg,alphatest_pars_fragment:fg,aomap_fragment:pg,aomap_pars_fragment:mg,batching_pars_vertex:gg,batching_vertex:xg,begin_vertex:_g,beginnormal_vertex:yg,bsdfs:vg,iridescence_fragment:Mg,bumpmap_pars_fragment:bg,clipping_planes_fragment:Sg,clipping_planes_pars_fragment:Eg,clipping_planes_pars_vertex:Tg,clipping_planes_vertex:wg,color_fragment:Ag,color_pars_fragment:Rg,color_pars_vertex:Cg,color_vertex:Pg,common:Ig,defaultnormal_vertex:Lg,displacementmap_pars_vertex:Ng,displacementmap_vertex:Dg,emissivemap_fragment:Ug,emissivemap_pars_fragment:Og,colorspace_fragment:Fg,colorspace_pars_fragment:Bg,envmap_fragment:Hg,envmap_common_pars_fragment:kg,envmap_pars_fragment:zg,envmap_pars_vertex:Gg,envmap_physical_pars_fragment:Qg,envmap_vertex:Vg,fog_vertex:Wg,fog_pars_vertex:Xg,fog_fragment:qg,fog_pars_fragment:Yg,gradientmap_pars_fragment:Kg,lightmap_pars_fragment:Jg,lights_lambert_fragment:Zg,lights_lambert_pars_fragment:$g,lights_pars_begin:jg,lights_toon_fragment:ex,lights_toon_pars_fragment:tx,lights_phong_fragment:nx,lights_phong_pars_fragment:ix,lights_physical_fragment:sx,lights_physical_pars_fragment:rx,lights_fragment_begin:ox,lights_fragment_maps:ax,lights_fragment_end:lx,lightprobes_pars_fragment:cx,logdepthbuf_fragment:hx,logdepthbuf_pars_fragment:ux,logdepthbuf_pars_vertex:dx,logdepthbuf_vertex:fx,map_fragment:px,map_pars_fragment:mx,map_particle_fragment:gx,map_particle_pars_fragment:xx,metalnessmap_fragment:_x,metalnessmap_pars_fragment:yx,morphinstance_vertex:vx,morphcolor_vertex:Mx,morphnormal_vertex:bx,morphtarget_pars_vertex:Sx,morphtarget_vertex:Ex,normal_fragment_begin:Tx,normal_fragment_maps:wx,normal_pars_fragment:Ax,normal_pars_vertex:Rx,normal_vertex:Cx,normalmap_pars_fragment:Px,clearcoat_normal_fragment_begin:Ix,clearcoat_normal_fragment_maps:Lx,clearcoat_pars_fragment:Nx,iridescence_pars_fragment:Dx,opaque_fragment:Ux,packing:Ox,premultiplied_alpha_fragment:Fx,project_vertex:Bx,dithering_fragment:Hx,dithering_pars_fragment:kx,roughnessmap_fragment:zx,roughnessmap_pars_fragment:Gx,shadowmap_pars_fragment:Vx,shadowmap_pars_vertex:Wx,shadowmap_vertex:Xx,shadowmask_pars_fragment:qx,skinbase_vertex:Yx,skinning_pars_vertex:Kx,skinning_vertex:Jx,skinnormal_vertex:Zx,specularmap_fragment:$x,specularmap_pars_fragment:jx,tonemapping_fragment:Qx,tonemapping_pars_fragment:e_,transmission_fragment:t_,transmission_pars_fragment:n_,uv_pars_fragment:i_,uv_pars_vertex:s_,uv_vertex:r_,worldpos_vertex:o_,background_vert:a_,background_frag:l_,backgroundCube_vert:c_,backgroundCube_frag:h_,cube_vert:u_,cube_frag:d_,depth_vert:f_,depth_frag:p_,distance_vert:m_,distance_frag:g_,equirect_vert:x_,equirect_frag:__,linedashed_vert:y_,linedashed_frag:v_,meshbasic_vert:M_,meshbasic_frag:b_,meshlambert_vert:S_,meshlambert_frag:E_,meshmatcap_vert:T_,meshmatcap_frag:w_,meshnormal_vert:A_,meshnormal_frag:R_,meshphong_vert:C_,meshphong_frag:P_,meshphysical_vert:I_,meshphysical_frag:L_,meshtoon_vert:N_,meshtoon_frag:D_,points_vert:U_,points_frag:O_,shadow_vert:F_,shadow_frag:B_,sprite_vert:H_,sprite_frag:k_},Ae={common:{diffuse:{value:new se(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Je},alphaMap:{value:null},alphaMapTransform:{value:new Je},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Je}},envmap:{envMap:{value:null},envMapRotation:{value:new Je},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Je}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Je}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Je},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Je},normalScale:{value:new ye(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Je},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Je}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Je}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Je}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new se(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new se(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Je},alphaTest:{value:0},uvTransform:{value:new Je}},sprite:{diffuse:{value:new se(16777215)},opacity:{value:1},center:{value:new ye(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Je},alphaMap:{value:null},alphaMapTransform:{value:new Je},alphaTest:{value:0}}},si={basic:{uniforms:ln([Ae.common,Ae.specularmap,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.fog]),vertexShader:Ze.meshbasic_vert,fragmentShader:Ze.meshbasic_frag},lambert:{uniforms:ln([Ae.common,Ae.specularmap,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.fog,Ae.lights,{emissive:{value:new se(0)},envMapIntensity:{value:1}}]),vertexShader:Ze.meshlambert_vert,fragmentShader:Ze.meshlambert_frag},phong:{uniforms:ln([Ae.common,Ae.specularmap,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.fog,Ae.lights,{emissive:{value:new se(0)},specular:{value:new se(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ze.meshphong_vert,fragmentShader:Ze.meshphong_frag},standard:{uniforms:ln([Ae.common,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.roughnessmap,Ae.metalnessmap,Ae.fog,Ae.lights,{emissive:{value:new se(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ze.meshphysical_vert,fragmentShader:Ze.meshphysical_frag},toon:{uniforms:ln([Ae.common,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.gradientmap,Ae.fog,Ae.lights,{emissive:{value:new se(0)}}]),vertexShader:Ze.meshtoon_vert,fragmentShader:Ze.meshtoon_frag},matcap:{uniforms:ln([Ae.common,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.fog,{matcap:{value:null}}]),vertexShader:Ze.meshmatcap_vert,fragmentShader:Ze.meshmatcap_frag},points:{uniforms:ln([Ae.points,Ae.fog]),vertexShader:Ze.points_vert,fragmentShader:Ze.points_frag},dashed:{uniforms:ln([Ae.common,Ae.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ze.linedashed_vert,fragmentShader:Ze.linedashed_frag},depth:{uniforms:ln([Ae.common,Ae.displacementmap]),vertexShader:Ze.depth_vert,fragmentShader:Ze.depth_frag},normal:{uniforms:ln([Ae.common,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,{opacity:{value:1}}]),vertexShader:Ze.meshnormal_vert,fragmentShader:Ze.meshnormal_frag},sprite:{uniforms:ln([Ae.sprite,Ae.fog]),vertexShader:Ze.sprite_vert,fragmentShader:Ze.sprite_frag},background:{uniforms:{uvTransform:{value:new Je},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ze.background_vert,fragmentShader:Ze.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Je}},vertexShader:Ze.backgroundCube_vert,fragmentShader:Ze.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ze.cube_vert,fragmentShader:Ze.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ze.equirect_vert,fragmentShader:Ze.equirect_frag},distance:{uniforms:ln([Ae.common,Ae.displacementmap,{referencePosition:{value:new N},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ze.distance_vert,fragmentShader:Ze.distance_frag},shadow:{uniforms:ln([Ae.lights,Ae.fog,{color:{value:new se(0)},opacity:{value:1}}]),vertexShader:Ze.shadow_vert,fragmentShader:Ze.shadow_frag}};si.physical={uniforms:ln([si.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Je},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Je},clearcoatNormalScale:{value:new ye(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Je},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new Je},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Je},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Je},sheen:{value:0},sheenColor:{value:new se(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Je},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Je},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Je},transmissionSamplerSize:{value:new ye},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Je},attenuationDistance:{value:0},attenuationColor:{value:new se(0)},specularColor:{value:new se(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Je},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Je},anisotropyVector:{value:new ye},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Je}}]),vertexShader:Ze.meshphysical_vert,fragmentShader:Ze.meshphysical_frag};var Jl={r:0,b:0,g:0},z_=new We,hp=new Je;hp.set(-1,0,0,0,1,0,0,0,1);function G_(s,e,t,n,i,r){let o=new se(0),a=i===!0?0:1,l,c,h=null,u=0,d=null;function f(b){let T=b.isScene===!0?b.background:null;if(T&&T.isTexture){let M=b.backgroundBlurriness>0;T=e.get(T,M)}return T}function p(b){let T=!1,M=f(b);M===null?g(o,a):M&&M.isColor&&(g(M,1),T=!0);let w=s.xr.getEnvironmentBlendMode();w==="additive"?t.buffers.color.setClear(0,0,0,1,r):w==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(s.autoClear||T)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function y(b,T){let M=f(T);M&&M.isCubeTexture?(c===void 0&&(c=new k(new we(1,1,1),new Qn({name:"BackgroundCubeMaterial",uniforms:Es(si.backgroundCube.uniforms),vertexShader:si.backgroundCube.vertexShader,fragmentShader:si.backgroundCube.fragmentShader,side:gn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(w,v,x){this.matrixWorld.copyPosition(x.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=M,c.material.uniforms.backgroundBlurriness.value=T.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(z_.makeRotationFromEuler(T.backgroundRotation)).transpose(),M.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(hp),c.material.toneMapped=st.getTransfer(M.colorSpace)!==vt,(h!==M||u!==M.version||d!==s.toneMapping)&&(c.material.needsUpdate=!0,h=M,u=M.version,d=s.toneMapping),c.layers.enableAll(),b.unshift(c,c.geometry,c.material,0,0,null)):M&&M.isTexture&&(l===void 0&&(l=new k(new Lt(2,2),new Qn({name:"BackgroundMaterial",uniforms:Es(si.background.uniforms),vertexShader:si.background.vertexShader,fragmentShader:si.background.fragmentShader,side:Dn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=M,l.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,l.material.toneMapped=st.getTransfer(M.colorSpace)!==vt,M.matrixAutoUpdate===!0&&M.updateMatrix(),l.material.uniforms.uvTransform.value.copy(M.matrix),(h!==M||u!==M.version||d!==s.toneMapping)&&(l.material.needsUpdate=!0,h=M,u=M.version,d=s.toneMapping),l.layers.enableAll(),b.unshift(l,l.geometry,l.material,0,0,null))}function g(b,T){b.getRGB(Jl,Wh(s)),t.buffers.color.setClear(Jl.r,Jl.g,Jl.b,T,r)}function m(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(b,T=1){o.set(b),a=T,g(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(b){a=b,g(o,a)},render:p,addToRenderList:y,dispose:m}}function V_(s,e){let t=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=d(null),r=i,o=!1;function a(C,D,q,I,z){let Y=!1,V=u(C,I,q,D);r!==V&&(r=V,c(r.object)),Y=f(C,I,q,z),Y&&p(C,I,q,z),z!==null&&e.update(z,s.ELEMENT_ARRAY_BUFFER),(Y||o)&&(o=!1,M(C,D,q,I),z!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(z).buffer))}function l(){return s.createVertexArray()}function c(C){return s.bindVertexArray(C)}function h(C){return s.deleteVertexArray(C)}function u(C,D,q,I){let z=I.wireframe===!0,Y=n[D.id];Y===void 0&&(Y={},n[D.id]=Y);let V=C.isInstancedMesh===!0?C.id:0,B=Y[V];B===void 0&&(B={},Y[V]=B);let F=B[q.id];F===void 0&&(F={},B[q.id]=F);let K=F[z];return K===void 0&&(K=d(l()),F[z]=K),K}function d(C){let D=[],q=[],I=[];for(let z=0;z<t;z++)D[z]=0,q[z]=0,I[z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:q,attributeDivisors:I,object:C,attributes:{},index:null}}function f(C,D,q,I){let z=r.attributes,Y=D.attributes,V=0,B=q.getAttributes();for(let F in B)if(B[F].location>=0){let Z=z[F],he=Y[F];if(he===void 0&&(F==="instanceMatrix"&&C.instanceMatrix&&(he=C.instanceMatrix),F==="instanceColor"&&C.instanceColor&&(he=C.instanceColor)),Z===void 0||Z.attribute!==he||he&&Z.data!==he.data)return!0;V++}return r.attributesNum!==V||r.index!==I}function p(C,D,q,I){let z={},Y=D.attributes,V=0,B=q.getAttributes();for(let F in B)if(B[F].location>=0){let Z=Y[F];Z===void 0&&(F==="instanceMatrix"&&C.instanceMatrix&&(Z=C.instanceMatrix),F==="instanceColor"&&C.instanceColor&&(Z=C.instanceColor));let he={};he.attribute=Z,Z&&Z.data&&(he.data=Z.data),z[F]=he,V++}r.attributes=z,r.attributesNum=V,r.index=I}function y(){let C=r.newAttributes;for(let D=0,q=C.length;D<q;D++)C[D]=0}function g(C){m(C,0)}function m(C,D){let q=r.newAttributes,I=r.enabledAttributes,z=r.attributeDivisors;q[C]=1,I[C]===0&&(s.enableVertexAttribArray(C),I[C]=1),z[C]!==D&&(s.vertexAttribDivisor(C,D),z[C]=D)}function b(){let C=r.newAttributes,D=r.enabledAttributes;for(let q=0,I=D.length;q<I;q++)D[q]!==C[q]&&(s.disableVertexAttribArray(q),D[q]=0)}function T(C,D,q,I,z,Y,V){V===!0?s.vertexAttribIPointer(C,D,q,z,Y):s.vertexAttribPointer(C,D,q,I,z,Y)}function M(C,D,q,I){y();let z=I.attributes,Y=q.getAttributes(),V=D.defaultAttributeValues;for(let B in Y){let F=Y[B];if(F.location>=0){let K=z[B];if(K===void 0&&(B==="instanceMatrix"&&C.instanceMatrix&&(K=C.instanceMatrix),B==="instanceColor"&&C.instanceColor&&(K=C.instanceColor)),K!==void 0){let Z=K.normalized,he=K.itemSize,Re=e.get(K);if(Re===void 0)continue;let $=Re.buffer,ge=Re.type,de=Re.bytesPerElement,De=ge===s.INT||ge===s.UNSIGNED_INT||K.gpuType===al;if(K.isInterleavedBufferAttribute){let ae=K.data,Fe=ae.isInterleavedBuffer===!0?ae.stride:ae.itemSize,Et=K.offset;if(ae.isInstancedInterleavedBuffer||ae.isInstancedBufferAttribute){for(let Ge=0;Ge<F.locationSize;Ge++)m(F.location+Ge,ae.meshPerAttribute);C.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=ae.meshPerAttribute*ae.count)}else for(let Ge=0;Ge<F.locationSize;Ge++)g(F.location+Ge);s.bindBuffer(s.ARRAY_BUFFER,$);for(let Ge=0;Ge<F.locationSize;Ge++)T(F.location+Ge,he/F.locationSize,ge,Z,Fe*de,(Et+he/F.locationSize*Ge)*de,De)}else{if(K.isInstancedBufferAttribute){for(let ae=0;ae<F.locationSize;ae++)m(F.location+ae,K.meshPerAttribute);C.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=K.meshPerAttribute*K.count)}else for(let ae=0;ae<F.locationSize;ae++)g(F.location+ae);s.bindBuffer(s.ARRAY_BUFFER,$);for(let ae=0;ae<F.locationSize;ae++)T(F.location+ae,he/F.locationSize,ge,Z,he*de,he/F.locationSize*ae*de,De)}}else if(V!==void 0){let Z=V[B];if(Z!==void 0)switch(Z.length){case 2:s.vertexAttrib2fv(F.location,Z);break;case 3:s.vertexAttrib3fv(F.location,Z);break;case 4:s.vertexAttrib4fv(F.location,Z);break;default:s.vertexAttrib1fv(F.location,Z)}}}}b()}function w(){P();for(let C in n){let D=n[C];for(let q in D){let I=D[q];for(let z in I){let Y=I[z];for(let V in Y)h(Y[V].object),delete Y[V];delete I[z]}}delete n[C]}}function v(C){if(n[C.id]===void 0)return;let D=n[C.id];for(let q in D){let I=D[q];for(let z in I){let Y=I[z];for(let V in Y)h(Y[V].object),delete Y[V];delete I[z]}}delete n[C.id]}function x(C){for(let D in n){let q=n[D];for(let I in q){let z=q[I];if(z[C.id]===void 0)continue;let Y=z[C.id];for(let V in Y)h(Y[V].object),delete Y[V];delete z[C.id]}}}function _(C){for(let D in n){let q=n[D],I=C.isInstancedMesh===!0?C.id:0,z=q[I];if(z!==void 0){for(let Y in z){let V=z[Y];for(let B in V)h(V[B].object),delete V[B];delete z[Y]}delete q[I],Object.keys(q).length===0&&delete n[D]}}}function P(){R(),o=!0,r!==i&&(r=i,c(r.object))}function R(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:P,resetDefaultState:R,dispose:w,releaseStatesOfGeometry:v,releaseStatesOfObject:_,releaseStatesOfProgram:x,initAttributes:y,enableAttribute:g,disableUnusedAttributes:b}}function W_(s,e,t){let n;function i(l){n=l}function r(l,c){s.drawArrays(n,l,c),t.update(c,n,1)}function o(l,c,h){h!==0&&(s.drawArraysInstanced(n,l,c,h),t.update(c,n,h))}function a(l,c,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,h);let d=0;for(let f=0;f<h;f++)d+=c[f];t.update(d,n,1)}this.setMode=i,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function X_(s,e,t,n){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){let x=e.get("EXT_texture_filter_anisotropic");i=s.getParameter(x.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(x){return!(x!==Un&&n.convert(x)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(x){let _=x===qn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(x!==vn&&x!==Tn&&!_&&n.convert(x)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE))}function l(x){if(x==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";x="mediump"}return x==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",h=l(c);h!==c&&(Oe("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),d=t.logarithmicDepthBuffer===!0&&u===!1;t.reversedDepthBuffer===!0&&u===!1&&Oe("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),t.logarithmicDepthBuffer===!0&&u===!0&&Oe("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");let f=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),p=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=s.getParameter(s.MAX_TEXTURE_SIZE),g=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),m=s.getParameter(s.MAX_VERTEX_ATTRIBS),b=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),T=s.getParameter(s.MAX_VARYING_VECTORS),M=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),w=s.getParameter(s.MAX_SAMPLES),v=s.getParameter(s.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:f,maxVertexTextures:p,maxTextureSize:y,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:b,maxVaryings:T,maxFragmentUniforms:M,maxSamples:w,samples:v}}function q_(s){let e=this,t=null,n=0,i=!1,r=!1,o=new Vn,a=new Je,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){let f=u.length!==0||d||n!==0||i;return i=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,f){let p=u.clippingPlanes,y=u.clipIntersection,g=u.clipShadows,m=s.get(u);if(!i||p===null||p.length===0||r&&!g)r?h(null):c();else{let b=r?0:n,T=b*4,M=m.clippingState||null;l.value=M,M=h(p,d,T,f);for(let w=0;w!==T;++w)M[w]=t[w];m.clippingState=M,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=b}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,f,p){let y=u!==null?u.length:0,g=null;if(y!==0){if(g=l.value,p!==!0||g===null){let m=f+y*4,b=d.matrixWorldInverse;a.getNormalMatrix(b),(g===null||g.length<m)&&(g=new Float32Array(m));for(let T=0,M=f;T!==y;++T,M+=4)o.copy(u[T]).applyMatrix4(b,a),o.normal.toArray(g,M),g[M+3]=o.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=y,e.numIntersection=0,g}}var Do=class extends Sn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new Qr(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new we(5,5,5),r=new Qn({name:"CubemapFromEquirect",uniforms:Es(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:gn,blending:ys});r.uniforms.tEquirect.value=t;let o=new k(i,r),a=t.minFilter;return t.minFilter===yn&&(t.minFilter=Bt),new ur(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){let r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,i);e.setRenderTarget(r)}},Gf=256,Y_=3,K_=20,up=256,dp=16,J_=3,Z_=new N,$_=new se,$l=class s{constructor(e){this._renderer=e,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new ur(1,10,null),this._boxMesh=new k(new we(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(e,t=0,n=.1,i=100,r={}){let{size:o=256,position:a=Z_}=r,l=this._renderer;this._setSize(o);let c=this._allocateTarget(),h=this._getSourceTarget(!0);t>0&&(h.texture.mipmapsAutoUpdate=!1);let u=l.autoClear,d=l.autoClearColor,f=l.autoClearDepth,p=l.autoClearStencil,y=e.background;l.autoClear=!0,l.autoClearColor=!0,l.autoClearDepth=!0,l.autoClearStencil=!0,y===null&&(e.background=l.getClearColor($_));let g=new ur(n,i,h);return g.position.copy(a),g.update(l,e),l.autoClear=u,l.autoClearColor=d,l.autoClearDepth=f,l.autoClearStencil=p,e.background=y,t>0&&(h.texture.mipmapsAutoUpdate=!0,this._blur(c,t)),this._applyPMREM(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Xf(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Wf(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(e,t){return t>0?1-Math.sqrt(1-e/t):0}_setSize(e){this._cubeSize=Math.max(Gf,kh(e))}_fromTexture(e,t){e.mapping===Ms||e.mapping===pr?this._setSize(e.image.length===0?Gf:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4);let n=t||this._allocateTarget();return this._textureToCubemap(e),this._applyPMREM(n),n}_allocateTarget(){let e=this._cubeSize,t=Vf(e,!1,!1),n=Math.log2(e)-Y_;for(let i=0;i<=n;i++)t.texture.mipmaps.push({width:e>>i,height:e>>i});return t.texture.name="PMREM",t.texture.isPMREMTexture=!0,t}_getSourceTarget(e=!1){let t=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==t||e&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=Vf(t,!0,e)),this._sourceTarget}_compileMaterial(e){this._boxMesh.material=e,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(e,t,n){let i=this._boxMesh,r=this._cubeCamera;i.material=n,r.renderTarget=e,r.activeMipmapLevel=t;let o=e.width>>t;e.viewport.set(0,0,o,o),r.update(this._renderer,i),e.viewport.set(0,0,e.width,e.height)}_textureToCubemap(e){let t;e.mapping===Ms||e.mapping===pr?(this._cubemapMaterial===null&&(this._cubemapMaterial=Xf()),t=this._cubemapMaterial,t.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=Wf()),t=this._equirectMaterial),t.uniforms.envMap.value=e,this._renderCube(this._getSourceTarget(),0,t)}_applyPMREM(e){this._ggxMaterial===null&&(this._ggxMaterial=j_(),this._integrationMaterial=Q_());let t=this._cubeSize,n=e.texture.mipmaps.length-1,i=this._ggxMaterial.uniforms;i.envMap.value=this._sourceTarget.texture;let r=this._integrationMaterial.uniforms;r.envMap.value=this._sourceTarget.texture,r.sourceLod.value=Math.log2(t/dp);for(let o=0;o<=n;o++){let a=s.lodToRoughness(o,n);if(o>n-J_)r.roughness.value=a,this._renderCube(e,o,this._integrationMaterial);else{let l=a>0?Math.log2(t)+.5*Math.log2(6/(up*Math.pow(a,4)))+.5:0;i.roughness.value=a,i.lodBias.value=l,this._renderCube(e,o,this._ggxMaterial)}}}_blur(e,t){this._blurMaterial===null&&(this._blurMaterial=ey());let n=this._blurMaterial,i=n.uniforms,r=this._sourceTarget;i.sigma.value=Math.min(t,Math.PI)/Math.SQRT2,i.envMap.value=r.texture,this._renderCube(e,0,n),i.envMap.value=e.texture,this._renderCube(r,0,n)}};function Vf(s,e,t){return new Do(s,{minFilter:yn,generateMipmaps:e,type:qn,colorSpace:dn,depthBuffer:t})}function Uo(s,e,t){return new Qn({name:s,uniforms:e,vertexShader:Ze.cube_vert,fragmentShader:t,side:gn,blending:ys,depthTest:!1,depthWrite:!1})}function j_(){return Uo("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${up}u

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float lodBias;

		#include <common>

		// Van der Corput radical inverse
		float radicalInverse_VdC( uint bits ) {

			bits = ( bits << 16u ) | ( bits >> 16u );
			bits = ( ( bits & 0x55555555u ) << 1u ) | ( ( bits & 0xAAAAAAAAu ) >> 1u );
			bits = ( ( bits & 0x33333333u ) << 2u ) | ( ( bits & 0xCCCCCCCCu ) >> 2u );
			bits = ( ( bits & 0x0F0F0F0Fu ) << 4u ) | ( ( bits & 0xF0F0F0F0u ) >> 4u );
			bits = ( ( bits & 0x00FF00FFu ) << 8u ) | ( ( bits & 0xFF00FF00u ) >> 8u );
			return float( bits ) * 2.3283064365386963e-10; // / 0x100000000

		}

		// Hammersley sequence
		vec2 hammersley( uint i, uint N ) {

			return vec2( float( i ) / float( N ), radicalInverse_VdC( i ) );

		}

		void main() {

			vec3 N = normalize( vWorldDirection );

			// For very low roughness, just sample the environment directly
			if ( roughness < 0.001 ) {

				gl_FragColor = vec4( textureLod( envMap, N, 0.0 ).rgb, 1.0 );
				return;

			}

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			// Tangent space basis for VNDF sampling
			vec3 up = abs( N.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, N ) );
			vec3 bitangent = cross( N, tangent );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			for ( uint i = 0u; i < GGX_SAMPLES; i ++ ) {

				vec2 Xi = hammersley( i, GGX_SAMPLES );

				// With V = N, sample the reflected direction directly.
				float invQ = 1.0 / ( 1.0 - Xi.x + alpha2 * Xi.x );
				float NdotL = ( 1.0 - Xi.x - alpha2 * Xi.x ) * invQ;

				if ( NdotL > 0.0 ) {

					float phi = 2.0 * PI * Xi.y;
					float sinTheta = 2.0 * alpha * sqrt( Xi.x * ( 1.0 - Xi.x ) ) * invQ;
					vec3 L = N * NdotL + ( tangent * cos( phi ) + bitangent * sin( phi ) ) * sinTheta;

					// Match the source mip to the sample's solid angle. The terms
					// independent of the sample are precomputed in lodBias.
					float d = alpha2 * invQ;
					float lod = max( log2( d ) + lodBias, 0.0 );

					// Weight by NdotL for the split-sum approximation
					prefilteredColor += textureLod( envMap, L, lod ).rgb * NdotL;
					totalWeight += NdotL;

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function Q_(){return Uo("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:dp}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float sourceLod;
		uniform int sourceSize;

		void main() {

			vec3 N = normalize( vWorldDirection );

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			float texelSize = 2.0 / float( sourceSize );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			// Pair opposite texels: only the one in N's hemisphere contributes.
			for ( int face = 0; face < 3; face ++ ) {

				for ( int y = 0; y < sourceSize; y ++ ) {

					for ( int x = 0; x < sourceSize; x ++ ) {

						vec2 uv = ( vec2( x, y ) + 0.5 ) * texelSize - 1.0;
						vec3 texelDirection = face == 0 ? vec3( 1.0, uv ) : ( face == 1 ? vec3( uv.x, 1.0, uv.y ) : vec3( uv, 1.0 ) );

						float invDistance = inversesqrt( 1.0 + dot( uv, uv ) );
						float NdotL = dot( N, texelDirection );
						texelDirection *= NdotL < 0.0 ? - 1.0 : 1.0;
						NdotL = abs( NdotL ) * invDistance;

						// With V = N, NdotH squared is ( 1 + NdotL ) / 2. Common factors
						// in the GGX distribution and texel solid angle cancel when normalized.
						float d = 1.0 + alpha2 + ( alpha2 - 1.0 ) * NdotL;
						float weight = NdotL * invDistance * invDistance * invDistance / ( d * d );

						prefilteredColor += textureLod( envMap, texelDirection, sourceLod ).rgb * weight;
						totalWeight += weight;

					}

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function ey(){return Uo("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${K_}
		#define GOLDEN_ANGLE 2.39996322973

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float sigma;

		#include <common>

		void main() {

			vec3 outputDirection = normalize( vWorldDirection );

			vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, outputDirection ) );
			vec3 bitangent = cross( outputDirection, tangent );

			// Truncate the kernel at three standard deviations or at the antipode.
			float thetaMax = min( 3.0 * sigma, PI );
			float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

			vec3 accumColor = vec3( 0.0 );
			float accumWeight = 0.0;

			for ( int i = 0; i < SAMPLES; i ++ ) {

				// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
				float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
				float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
				float phi = float( i ) * GOLDEN_ANGLE;

				vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
				vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

				// Correct the planar sample density to solid angle.
				float weight = sin( theta ) / theta;

				accumColor += weight * textureLod( envMap, sampleDirection, 0.0 ).rgb;
				accumWeight += weight;

			}

			gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

		}
	`)}function Wf(){return Uo("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

		varying vec3 vWorldDirection;

		uniform sampler2D envMap;

		#include <common>

		void main() {

			// Average four subpixel samples to preserve small, bright features.
			vec3 direction = normalize( vWorldDirection );
			vec3 dx = dFdx( direction ) * 0.25;
			vec3 dy = dFdy( direction ) * 0.25;

			vec3 color = textureLod( envMap, equirectUv( normalize( direction - dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction - dx + dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx + dy ) ), 0.0 ).rgb;
			gl_FragColor = vec4( color * 0.25, 1.0 );

		}
	`)}function Xf(){return Uo("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function ty(s){let e=new WeakMap,t=new WeakMap,n=null;function i(d,f=!1){return d==null?null:f?o(d):r(d)}function r(d){if(d&&d.isTexture){let f=d.mapping;if(f===sl||f===rl)if(e.has(d)){let p=e.get(d).texture;return a(p,d.mapping)}else{let p=d.image;if(p&&p.height>0){let y=new Do(p.height);return y.fromEquirectangularTexture(s,d),e.set(d,y),d.addEventListener("dispose",c),a(y.texture,d.mapping)}else return null}}return d}function o(d){if(d&&d.isTexture&&d.isPMREMTexture!==!0){let f=d.mapping,p=f===sl||f===rl,y=f===Ms||f===pr;if(p||y){let g=t.get(d),m=g!==void 0?g.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==m)return n===null&&(n=new $l(s)),g=p?n.fromEquirectangular(d,g):n.fromCubemap(d,g),g.texture.pmremVersion=d.pmremVersion,t.set(d,g),g.texture;if(g!==void 0)return g.texture;{let b=d.image;return p&&b&&b.height>0||y&&b&&l(b)?(n===null&&(n=new $l(s)),g=p?n.fromEquirectangular(d):n.fromCubemap(d),g.texture.pmremVersion=d.pmremVersion,t.set(d,g),d.addEventListener("dispose",h),g.texture):null}}}return d}function a(d,f){return f===sl?d.mapping=Ms:f===rl&&(d.mapping=pr),d}function l(d){let f=0,p=6;for(let y=0;y<p;y++)d[y]!==void 0&&f++;return f===p}function c(d){let f=d.target;f.removeEventListener("dispose",c);let p=e.get(f);p!==void 0&&(e.delete(f),p.dispose())}function h(d){let f=d.target;f.removeEventListener("dispose",h);let p=t.get(f);p!==void 0&&(t.delete(f),p.dispose())}function u(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:u}}function ny(s){let e={};function t(n){if(e[n]!==void 0)return e[n];let i=s.getExtension(n);return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let i=t(n);return i===null&&as("WebGLRenderer: "+n+" extension not supported."),i}}}function iy(s,e,t,n){let i={},r=new WeakMap,o=new FinalizationRegistry(p=>delete i[p]);function a(p){l(p.target)}function l(p){p.index!==null&&e.remove(p.index);for(let g in p.attributes)e.remove(p.attributes[g]);p.removeEventListener("dispose",a),delete i[p.id],o.unregister(p);let y=r.get(p);y&&(e.remove(y),r.delete(p)),n.releaseStatesOfGeometry(p),p.isInstancedBufferGeometry===!0&&delete p._maxInstanceCount,t.memory.geometries--}function c(p,y){return i[y.id]!==void 0||(y.addEventListener("dispose",a),i[y.id]=new WeakRef(y),o.register(y,y.id,y),t.memory.geometries++),y}function h(p){let y=p.attributes;for(let g in y)e.update(y[g],s.ARRAY_BUFFER)}function u(p){let y=p.index,g=p.attributes.position,m=0;if(g===void 0)return;let b=y!==null?y.array.length:g.array.length/3-1,T=g.count>=65535?Yr:qr,M=new T(Math.ceil(b/3)*6,1),w=M.array;if(y!==null){let x=y.array;m=y.version;for(let _=0,P=0;_<b;_+=3){let R=x[_+0],C=x[_+1],D=x[_+2];w[P++]=R,w[P++]=C,w[P++]=C,w[P++]=D,w[P++]=D,w[P++]=R}}else{m=g.version;for(let x=0,_=0;x<b;x+=3){let P=x+0,R=x+1,C=x+2;w[_++]=P,w[_++]=R,w[_++]=R,w[_++]=C,w[_++]=C,w[_++]=P}}M.version=m;let v=r.get(p);v&&e.remove(v),r.set(p,M)}function d(p){let y=r.get(p);if(y){let g=p.index;g!==null&&y.version<g.version&&u(p)}else u(p);return r.get(p)}function f(){for(let p in i){let y=i[p].deref();y!==void 0&&l(y)}}return{get:c,update:h,getWireframeAttribute:d,dispose:f}}function sy(s,e,t){let n;function i(u){n=u}let r,o;function a(u){r=u.type,o=u.bytesPerElement}function l(u,d){s.drawElements(n,d,r,u*o),t.update(d,n,1)}function c(u,d,f){f!==0&&(s.drawElementsInstanced(n,d,r,u*o,f),t.update(d,n,f))}function h(u,d,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,u,0,f);let y=0;for(let g=0;g<f;g++)y+=d[g];t.update(y,n,1)}this.setMode=i,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function ry(s){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case s.TRIANGLES:t.triangles+=a*(r/3);break;case s.LINES:t.lines+=a*(r/2);break;case s.LINE_STRIP:t.lines+=a*(r-1);break;case s.LINE_LOOP:t.lines+=a*r;break;case s.POINTS:t.points+=a*r;break;default:Ye("WebGLInfo: Unknown draw mode:",o);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function oy(s,e,t){let n=new WeakMap,i=new bt;function r(o,a,l){let c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0,d=n.get(a);if(d===void 0||d.count!==u){let P=function(){x.dispose(),n.delete(a),a.removeEventListener("dispose",P)};d!==void 0&&d.texture.dispose();let f=a.morphAttributes.position!==void 0,p=a.morphAttributes.normal!==void 0,y=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],m=a.morphAttributes.normal||[],b=a.morphAttributes.color||[],T=0;f===!0&&(T=1),p===!0&&(T=2),y===!0&&(T=3);let M=a.attributes.position.count*T,w=1;M>e.maxTextureSize&&(w=Math.ceil(M/e.maxTextureSize),M=e.maxTextureSize);let v=new Float32Array(M*w*4*u),x=new Gr(v,M,w,u);x.type=Tn,x.needsUpdate=!0;let _=T*4;for(let R=0;R<u;R++){let C=g[R],D=m[R],q=b[R],I=M*w*4*R;for(let z=0;z<C.count;z++){let Y=z*_;f===!0&&(i.fromBufferAttribute(C,z),v[I+Y+0]=i.x,v[I+Y+1]=i.y,v[I+Y+2]=i.z,v[I+Y+3]=0),p===!0&&(i.fromBufferAttribute(D,z),v[I+Y+4]=i.x,v[I+Y+5]=i.y,v[I+Y+6]=i.z,v[I+Y+7]=0),y===!0&&(i.fromBufferAttribute(q,z),v[I+Y+8]=i.x,v[I+Y+9]=i.y,v[I+Y+10]=i.z,v[I+Y+11]=q.itemSize===4?i.w:1)}}d={count:u,texture:x,size:new ye(M,w)},n.set(a,d),a.addEventListener("dispose",P)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",o.morphTexture,t);else{let f=0;for(let y=0;y<c.length;y++)f+=c[y];let p=a.morphTargetsRelative?1:1-f;l.getUniforms().setValue(s,"morphTargetBaseInfluence",p),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(s,"morphTargetsTextureSize",d.size)}return{update:r}}function ay(s,e,t,n,i){let r=new WeakMap;function o(c){let h=i.render.frame,u=c.geometry,d=e.get(c,u);if(r.get(d)!==h&&(e.update(d),r.set(d,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(t.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,s.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){let f=c.skeleton;r.get(f)!==h&&(f.update(),r.set(f,h))}return d}function a(){r=new WeakMap}function l(c){let h=c.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:o,dispose:a}}var ly={[vh]:"LINEAR_TONE_MAPPING",[Mh]:"REINHARD_TONE_MAPPING",[bh]:"CINEON_TONE_MAPPING",[So]:"ACES_FILMIC_TONE_MAPPING",[Eh]:"AGX_TONE_MAPPING",[Th]:"NEUTRAL_TONE_MAPPING",[Sh]:"CUSTOM_TONE_MAPPING"};function cy(s,e,t,n,i,r){let o=new Sn(e,t,{type:s,depthBuffer:i,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),a=null,l=null,c=null,h=new Ut;h.setAttribute("position",new _t([-1,3,0,-1,-1,0,3,-1,0],3)),h.setAttribute("uv",new _t([0,2,0,0,2,0],2));let u=new Va({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new k(h,u),f=new gs(-1,1,1,-1,0,1),p=null,y=null,g=!1,m,b=null,T=[],M=!1;this.setSize=function(w,v){o.setSize(w,v),a!==null&&a.setSize(w,v),l!==null&&l.setSize(w,v);for(let x=0;x<T.length;x++){let _=T[x];_.setSize&&_.setSize(w,v)}},this.setEffects=function(w){T=w,M=T.length>0&&T[0].isRenderPass===!0;let v=o.width,x=o.height;T.length>0&&a===null&&(a=new Sn(v,x,{type:qn,depthBuffer:!1,stencilBuffer:!1}),l=new Sn(v,x,{type:qn,depthBuffer:!1,stencilBuffer:!1}));let _=i===!0&&T.some(P=>P.needsDepthTexture===!0);_!==(o.depthTexture!==null)&&(_===!0&&c===null&&(c=new _i(v,x),r===!0&&(c.format=Ti,c.type=Ss)),o.dispose(),o.depthTexture=_?c:null,o.resolveDepthBuffer=_,o.storeMultisampledDepthBuffer=_);for(let P=0;P<T.length;P++){let R=T[P];R.setSize&&R.setSize(v,x),_&&R.needsDepthTexture===!0&&R.setDepthTexture&&R.setDepthTexture(c)}},this.begin=function(w,v){if(g||w.toneMapping===ni&&T.length===0)return!1;if(b=v,v!==null){let x=v.width,_=v.height;(o.width!==x||o.height!==_)&&this.setSize(x,_)}return M===!1&&w.setRenderTarget(o),m=w.toneMapping,w.toneMapping=ni,!0},this.hasRenderPass=function(){return M},this.end=function(w,v){w.toneMapping=m,g=!0;let x=o,_=a;for(let P=0;P<T.length;P++){let R=T[P];R.enabled!==!1&&(R.render(w,_,x,v),R.needsSwap!==!1&&(x=_,_=_===a?l:a))}if(p!==w.outputColorSpace||y!==w.toneMapping){p=w.outputColorSpace,y=w.toneMapping,u.defines={},st.getTransfer(p)===vt&&(u.defines.SRGB_TRANSFER="");let P=ly[y];P&&(u.defines[P]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=x.texture,w.setRenderTarget(b),w.render(d,f),b=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){o.dispose(),a!==null&&a.dispose(),l!==null&&l.dispose(),h.dispose(),u.dispose()}}var fp=new Wt,pp=new _i(1,1),mp=new to(1),gp=new Gr,xp=new Na,_p=new Qr,qf=[],Yf=[],Kf=new Float32Array(16),Jf=new Float32Array(9),Zf=new Float32Array(4);function yr(s,e,t){let n=s[0];if(n<=0||n>0)return s;let i=e*t,r=qf[i];if(r===void 0&&(r=new Float32Array(i),qf[i]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,s[o].toArray(r,a)}return r}function Xt(s,e){if(s.length!==e.length)return!1;for(let t=0,n=s.length;t<n;t++)if(s[t]!==e[t])return!1;return!0}function qt(s,e){for(let t=0,n=e.length;t<n;t++)s[t]=e[t]}function Ql(s,e){let t=Yf[e];t===void 0&&(t=new Int32Array(e),Yf[e]=t);for(let n=0;n!==e;++n)t[n]=s.allocateTextureUnit();return t}function hy(s,e){let t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function uy(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Xt(t,e))return;s.uniform2fv(this.addr,e),qt(t,e)}}function dy(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Xt(t,e))return;s.uniform3fv(this.addr,e),qt(t,e)}}function fy(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Xt(t,e))return;s.uniform4fv(this.addr,e),qt(t,e)}}function py(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(Xt(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),qt(t,e)}else{if(Xt(t,n))return;Zf.set(n),s.uniformMatrix2fv(this.addr,!1,Zf),qt(t,n)}}function my(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(Xt(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),qt(t,e)}else{if(Xt(t,n))return;Jf.set(n),s.uniformMatrix3fv(this.addr,!1,Jf),qt(t,n)}}function gy(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(Xt(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),qt(t,e)}else{if(Xt(t,n))return;Kf.set(n),s.uniformMatrix4fv(this.addr,!1,Kf),qt(t,n)}}function xy(s,e){let t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function _y(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Xt(t,e))return;s.uniform2iv(this.addr,e),qt(t,e)}}function yy(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Xt(t,e))return;s.uniform3iv(this.addr,e),qt(t,e)}}function vy(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Xt(t,e))return;s.uniform4iv(this.addr,e),qt(t,e)}}function My(s,e){let t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function by(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Xt(t,e))return;s.uniform2uiv(this.addr,e),qt(t,e)}}function Sy(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Xt(t,e))return;s.uniform3uiv(this.addr,e),qt(t,e)}}function Ey(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Xt(t,e))return;s.uniform4uiv(this.addr,e),qt(t,e)}}function ec(s){return s.version===0&&(s.compareFunction=Oh,s.needsUpdate=!0),s}function Ty(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?r=ec(pp):r=fp,t.setTexture2D(e||r,i)}function wy(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||xp,i)}function Ay(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_CUBE_SHADOW?r=ec(mp):r=_p,t.setTextureCube(e||r,i)}function Ry(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||gp,i)}function Cy(s){switch(s){case 5126:return hy;case 35664:return uy;case 35665:return dy;case 35666:return fy;case 35674:return py;case 35675:return my;case 35676:return gy;case 5124:case 35670:return xy;case 35667:case 35671:return _y;case 35668:case 35672:return yy;case 35669:case 35673:return vy;case 5125:return My;case 36294:return by;case 36295:return Sy;case 36296:return Ey;case 35678:case 36198:case 36298:case 36306:case 35682:return Ty;case 35679:case 36299:case 36307:return wy;case 35680:case 36300:case 36308:case 36293:return Ay;case 36289:case 36303:case 36311:case 36292:return Ry}}function Py(s,e){s.uniform1fv(this.addr,e)}function Iy(s,e){let t=yr(e,this.size,2);s.uniform2fv(this.addr,t)}function Ly(s,e){let t=yr(e,this.size,3);s.uniform3fv(this.addr,t)}function Ny(s,e){let t=yr(e,this.size,4);s.uniform4fv(this.addr,t)}function Dy(s,e){let t=yr(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function Uy(s,e){let t=yr(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function Oy(s,e){let t=yr(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function Fy(s,e){s.uniform1iv(this.addr,e)}function By(s,e){s.uniform2iv(this.addr,e)}function Hy(s,e){s.uniform3iv(this.addr,e)}function ky(s,e){s.uniform4iv(this.addr,e)}function zy(s,e){s.uniform1uiv(this.addr,e)}function Gy(s,e){s.uniform2uiv(this.addr,e)}function Vy(s,e){s.uniform3uiv(this.addr,e)}function Wy(s,e){s.uniform4uiv(this.addr,e)}function Xy(s,e,t){let n=this.cache,i=e.length,r=Ql(t,i);Xt(n,r)||(s.uniform1iv(this.addr,r),qt(n,r));let o;this.type===s.SAMPLER_2D_SHADOW?o=ec(pp):o=fp;for(let a=0;a!==i;++a)t.setTexture2D(e[a]||o,r[a])}function qy(s,e,t){let n=this.cache,i=e.length,r=Ql(t,i);Xt(n,r)||(s.uniform1iv(this.addr,r),qt(n,r));for(let o=0;o!==i;++o)t.setTexture3D(e[o]||xp,r[o])}function Yy(s,e,t){let n=this.cache,i=e.length,r=Ql(t,i);Xt(n,r)||(s.uniform1iv(this.addr,r),qt(n,r));let o;this.type===s.SAMPLER_CUBE_SHADOW?o=ec(mp):o=_p;for(let a=0;a!==i;++a)t.setTextureCube(e[a]||o,r[a])}function Ky(s,e,t){let n=this.cache,i=e.length,r=Ql(t,i);Xt(n,r)||(s.uniform1iv(this.addr,r),qt(n,r));for(let o=0;o!==i;++o)t.setTexture2DArray(e[o]||gp,r[o])}function Jy(s){switch(s){case 5126:return Py;case 35664:return Iy;case 35665:return Ly;case 35666:return Ny;case 35674:return Dy;case 35675:return Uy;case 35676:return Oy;case 5124:case 35670:return Fy;case 35667:case 35671:return By;case 35668:case 35672:return Hy;case 35669:case 35673:return ky;case 5125:return zy;case 36294:return Gy;case 36295:return Vy;case 36296:return Wy;case 35678:case 36198:case 36298:case 36306:case 35682:return Xy;case 35679:case 36299:case 36307:return qy;case 35680:case 36300:case 36308:case 36293:return Yy;case 36289:case 36303:case 36311:case 36292:return Ky}}var tu=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Cy(t.type)}},nu=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Jy(t.type)}},iu=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let i=this.seq;for(let r=0,o=i.length;r!==o;++r){let a=i[r];a.setValue(e,t[a.id],n)}}},Qh=/(\w+)(\])?(\[|\.)?/g;function $f(s,e){s.seq.push(e),s.map[e.id]=e}function Zy(s,e,t){let n=s.name,i=n.length;for(Qh.lastIndex=0;;){let r=Qh.exec(n),o=Qh.lastIndex,a=r[1],l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){$f(t,c===void 0?new tu(a,s,e):new nu(a,s,e));break}else{let u=t.map[a];u===void 0&&(u=new iu(a),$f(t,u)),t=u}}}var _r=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<n;++o){let a=e.getActiveUniform(t,o),l=e.getUniformLocation(t,a.name);Zy(a,l,this)}let i=[],r=[];for(let o of this.seq)o.type===e.SAMPLER_2D_SHADOW||o.type===e.SAMPLER_CUBE_SHADOW||o.type===e.SAMPLER_2D_ARRAY_SHADOW?i.push(o):r.push(o);i.length>0&&(this.seq=i.concat(r))}setValue(e,t,n,i){let r=this.map[t];r!==void 0&&r.setValue(e,n,i)}setOptional(e,t,n){let i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let r=0,o=t.length;r!==o;++r){let a=t[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,i)}}static seqWithValue(e,t){let n=[];for(let i=0,r=e.length;i!==r;++i){let o=e[i];o.id in t&&n.push(o)}return n}};function jf(s,e,t){let n=s.createShader(e);return s.shaderSource(n,t),s.compileShader(n),n}var $y=37297,jy=0;function Qy(s,e){let t=s.split(`
`),n=[],i=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=i;o<r;o++){let a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}var Qf=new Je;function ev(s){st._getMatrix(Qf,st.workingColorSpace,s);let e=`mat3( ${Qf.elements.map(t=>t.toFixed(4))} )`;switch(st.getTransfer(s)){case kr:return[e,"LinearTransferOETF"];case vt:return[e,"sRGBTransferOETF"];default:return Oe("WebGLProgram: Unsupported color space: ",s),[e,"LinearTransferOETF"]}}function ep(s,e,t){let n=s.getShaderParameter(e,s.COMPILE_STATUS),r=(s.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+Qy(s.getShaderSource(e),a)}else return r}function tv(s,e){let t=ev(e);return[`vec4 ${s}( vec4 value ) {`,`	return ${t[1]}( vec4( ${t[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}var nv={[vh]:"Linear",[Mh]:"Reinhard",[bh]:"Cineon",[So]:"ACESFilmic",[Eh]:"AgX",[Th]:"Neutral",[Sh]:"Custom"};function iv(s,e){let t=nv[e];return t===void 0?(Oe("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+s+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Zl=new N;function sv(){st.getLuminanceCoefficients(Zl);let s=Zl.x.toFixed(4),e=Zl.y.toFixed(4),t=Zl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function rv(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(No).join(`
`)}function ov(s){let e=[];for(let t in s){let n=s[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function av(s,e){let t={},n=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){let r=s.getActiveAttrib(e,i),o=r.name,a=1;r.type===s.FLOAT_MAT2&&(a=2),r.type===s.FLOAT_MAT3&&(a=3),r.type===s.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:s.getAttribLocation(e,o),locationSize:a}}return t}function No(s){return s!==""}function tp(s,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,e.numLightProbeGrids)}function np(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var lv=/^[ \t]*#include +<([\w\d./]+)>/gm;function su(s){return s.replace(lv,cv)}function cv(s,e){let t=Ze[e];if(t===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">");return su(t)}var hv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ip(s){return s.replace(hv,uv)}function uv(s,e,t,n){let i="";for(let r=parseInt(e);r<parseInt(t);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function sp(s){let e=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}var dv={[bo]:"SHADOWMAP_TYPE_PCF",[dr]:"SHADOWMAP_TYPE_VSM"};function fv(s){return dv[s.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var pv={[pr]:"ENVMAP_MODE_REFRACTION"};function mv(s){return s.envMap===!1?"ENVMAP_MODE_REFLECTION":pv[s.envMapMode]||"ENVMAP_MODE_REFLECTION"}var gv={[il]:"ENVMAP_BLENDING_MULTIPLY",[gf]:"ENVMAP_BLENDING_MIX",[xf]:"ENVMAP_BLENDING_ADD"};function xv(s){return s.envMap===!1?"ENVMAP_BLENDING_NONE":gv[s.combine]||"ENVMAP_BLENDING_NONE"}function _v(s,e,t,n){let i=s.getContext(),r=t.defines,o=t.vertexShader,a=t.fragmentShader,l=fv(t),c=t.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",h=mv(t),u=xv(t),d=rv(t),f=ov(r),p=i.createProgram(),y,g,m=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(y=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,f].filter(No).join(`
`),y.length>0&&(y+=`
`),g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,f].filter(No).join(`
`),g.length>0&&(g+=`
`)):(y=[sp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,f,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+t.diffuseRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(No).join(`
`),g=[sp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,f,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",t.envMapPMREM?"#define ENVMAP_MAX_LOD "+t.envMapMaxLod+".0":"",t.envMapPMREM?"#define ENVMAP_SIZE "+t.envMapSize+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ni?"#define TONE_MAPPING":"",t.toneMapping!==ni?Ze.tonemapping_pars_fragment:"",t.toneMapping!==ni?iv("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ze.colorspace_pars_fragment,tv("linearToOutputTexel",t.outputColorSpace),sv(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(No).join(`
`)),o=su(o),o=tp(o,t),o=np(o,t),a=su(a),a=tp(a,t),a=np(a,t),o=ip(o),a=ip(a),t.isRawShaderMaterial!==!0&&(m=`#version 300 es
`,y=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+y,g=["#define varying in",t.glslVersion===Bh?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Bh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);let b=m+y+o,T=m+g+a,M=jf(i,i.VERTEX_SHADER,b),w=jf(i,i.FRAGMENT_SHADER,T);i.attachShader(p,M),i.attachShader(p,w),t.index0AttributeName!==void 0?i.bindAttribLocation(p,0,t.index0AttributeName):t.hasPositionAttribute===!0&&i.bindAttribLocation(p,0,"position"),i.linkProgram(p);function v(R){if(s.debug.checkShaderErrors){let C=i.getProgramInfoLog(p)||"",D=i.getShaderInfoLog(M)||"",q=i.getShaderInfoLog(w)||"",I=C.trim(),z=D.trim(),Y=q.trim(),V=!0,B=!0;if(i.getProgramParameter(p,i.LINK_STATUS)===!1)if(V=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,p,M,w);else{let F=ep(i,M,"vertex"),K=ep(i,w,"fragment");Ye("WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(p,i.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+I+`
`+F+`
`+K)}else I!==""?Oe("WebGLProgram: Program Info Log:",I):(z===""||Y==="")&&(B=!1);B&&(R.diagnostics={runnable:V,programLog:I,vertexShader:{log:z,prefix:y},fragmentShader:{log:Y,prefix:g}})}i.deleteShader(M),i.deleteShader(w),x=new _r(i,p),_=av(i,p)}let x;this.getUniforms=function(){return x===void 0&&v(this),x};let _;this.getAttributes=function(){return _===void 0&&v(this),_};let P=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return P===!1&&(P=i.getProgramParameter(p,$y)),P},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(p),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=jy++,this.cacheKey=e,this.usedTimes=1,this.program=p,this.vertexShader=M,this.fragmentShader=w,this}var yv=0,ru=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let i=this._getShaderCacheForMaterial(e);return i.has(t)===!1&&(i.add(t),t.usedTimes++),i.has(n)===!1&&(i.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new ou(e),t.set(e,n)),n}},ou=class{constructor(e){this.id=yv++,this.code=e,this.usedTimes=0}};function vv(s){return s===qi||s===Ro||s===Co}function Mv(s,e,t,n,i,r){let o=new Vr,a=new ru,l=new Set,c=[],h=new Map,u=n.logarithmicDepthBuffer,d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function f(x){return l.add(x),x===0?"uv":`uv${x}`}function p(x,_,P,R,C,D){let q=R.fog,I=C.geometry,z=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?R.environment:null,Y=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,V=e.get(x.envMap||z,Y),B=d[x.type],F=n.precision;x.precision!==null&&(F=n.getMaxPrecision(x.precision),F!==x.precision&&Oe("WebGLProgram.getParameters:",x.precision,"not supported, using",F,"instead."));let K=I.morphAttributes.position||I.morphAttributes.normal||I.morphAttributes.color,Z=K!==void 0?K.length:0,he=0;I.morphAttributes.position!==void 0&&(he=1),I.morphAttributes.normal!==void 0&&(he=2),I.morphAttributes.color!==void 0&&(he=3);let Re,$,ge,de;if(B){let Te=si[B];Re=Te.vertexShader,$=Te.fragmentShader}else{Re=x.vertexShader,$=x.fragmentShader;let Te=a.getVertexShaderStage(x),Mt=a.getFragmentShaderStage(x);a.update(x,Te,Mt),ge=Te.id,de=Mt.id}let De=s.getRenderTarget(),ae=s.state.buffers.depth.getReversed(),Fe=C.isInstancedMesh===!0,Et=C.isBatchedMesh===!0,Ge=!!x.map,et=!!x.matcap,ke=!!V,ne=ke&&V.isPMREMTexture===!0,fe=!!x.aoMap,ce=!!x.lightMap,Ce=!!x.bumpMap&&x.wireframe===!1,Ee=!!x.normalMap,Qe=!!x.displacementMap,Be=!!x.emissiveMap,ct=!!x.metalnessMap,ut=!!x.roughnessMap,xt=x.anisotropy>0,O=x.clearcoat>0,kt=x.diffuseRoughness>0,lt=x.dispersion>0,Tt=x.retroreflectivity>0,Me=x.iridescence>0,Dt=x.sheen>0,Ve=x.transmission>0,Ke=xt&&!!x.anisotropyMap,A=O&&!!x.clearcoatMap,S=O&&!!x.clearcoatNormalMap,W=O&&!!x.clearcoatRoughnessMap,oe=kt&&!!x.diffuseRoughnessMap,ie=Me&&!!x.iridescenceMap,pe=Me&&!!x.iridescenceThicknessMap,be=Dt&&!!x.sheenColorMap,Q=Dt&&!!x.sheenRoughnessMap,ee=!!x.specularMap,xe=!!x.specularColorMap,L=!!x.specularIntensityMap,te=Ve&&!!x.transmissionMap,j=Ve&&!!x.thicknessMap,_e=!!x.gradientMap,ue=!!x.alphaMap,me=x.alphaTest>0,He=!!x.alphaHash,it=!!x.extensions,le=ni;x.toneMapped&&(De===null||De.isXRRenderTarget===!0)&&(le=s.toneMapping);let ze=ne?V.isCompressedCubeTexture?V.image[0].mipmaps:V.mipmaps:null,tt={shaderID:B,shaderType:x.type,shaderName:x.name,vertexShader:Re,fragmentShader:$,defines:x.defines,customVertexShaderID:ge,customFragmentShaderID:de,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:F,batching:Et,batchingColor:Et&&C._colorsTexture!==null,instancing:Fe,instancingColor:Fe&&C.instanceColor!==null,instancingMorph:Fe&&C.morphTexture!==null,outputColorSpace:De===null?s.outputColorSpace:De.isXRRenderTarget===!0?De.texture.colorSpace:st.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:Ge,matcap:et,envMap:ke,envMapMode:ke&&V.mapping,envMapPMREM:ne,envMapMaxLod:ne?ze.length-1:null,envMapSize:ne?ze[0].width:null,aoMap:fe,lightMap:ce,bumpMap:Ce,normalMap:Ee,displacementMap:Qe,emissiveMap:Be,normalMapObjectSpace:Ee&&x.normalMapType===Sf,normalMapTangentSpace:Ee&&x.normalMapType===Io,packedNormalMap:Ee&&x.normalMapType===Io&&vv(x.normalMap.format),metalnessMap:ct,roughnessMap:ut,anisotropy:xt,anisotropyMap:Ke,clearcoat:O,clearcoatMap:A,clearcoatNormalMap:S,clearcoatRoughnessMap:W,diffuseRoughness:kt,diffuseRoughnessMap:oe,dispersion:lt,retroreflection:Tt,iridescence:Me,iridescenceMap:ie,iridescenceThicknessMap:pe,sheen:Dt,sheenColorMap:be,sheenRoughnessMap:Q,specularMap:ee,specularColorMap:xe,specularIntensityMap:L,transmission:Ve,transmissionMap:te,thicknessMap:j,gradientMap:_e,opaque:x.transparent===!1&&x.blending===fr&&x.alphaToCoverage===!1,alphaMap:ue,alphaTest:me,alphaHash:He,combine:x.combine,mapUv:Ge&&f(x.map.channel),aoMapUv:fe&&f(x.aoMap.channel),lightMapUv:ce&&f(x.lightMap.channel),bumpMapUv:Ce&&f(x.bumpMap.channel),normalMapUv:Ee&&f(x.normalMap.channel),displacementMapUv:Qe&&f(x.displacementMap.channel),emissiveMapUv:Be&&f(x.emissiveMap.channel),metalnessMapUv:ct&&f(x.metalnessMap.channel),roughnessMapUv:ut&&f(x.roughnessMap.channel),anisotropyMapUv:Ke&&f(x.anisotropyMap.channel),clearcoatMapUv:A&&f(x.clearcoatMap.channel),clearcoatNormalMapUv:S&&f(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:W&&f(x.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:oe&&f(x.diffuseRoughnessMap.channel),iridescenceMapUv:ie&&f(x.iridescenceMap.channel),iridescenceThicknessMapUv:pe&&f(x.iridescenceThicknessMap.channel),sheenColorMapUv:be&&f(x.sheenColorMap.channel),sheenRoughnessMapUv:Q&&f(x.sheenRoughnessMap.channel),specularMapUv:ee&&f(x.specularMap.channel),specularColorMapUv:xe&&f(x.specularColorMap.channel),specularIntensityMapUv:L&&f(x.specularIntensityMap.channel),transmissionMapUv:te&&f(x.transmissionMap.channel),thicknessMapUv:j&&f(x.thicknessMap.channel),alphaMapUv:ue&&f(x.alphaMap.channel),vertexTangents:!!I.attributes.tangent&&(Ee||xt),vertexNormals:!!I.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!I.attributes.color&&I.attributes.color.itemSize===4,pointsUvs:C.isPoints===!0&&!!I.attributes.uv&&(Ge||ue),fog:!!q,useFog:x.fog===!0,fogExp2:!!q&&q.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||I.attributes.normal===void 0&&Ee===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:ae,skinning:C.isSkinnedMesh===!0,hasPositionAttribute:I.attributes.position!==void 0,morphTargets:I.morphAttributes.position!==void 0,morphNormals:I.morphAttributes.normal!==void 0,morphColors:I.morphAttributes.color!==void 0,morphTargetsCount:Z,morphTextureStride:he,numSunLights:_.sun.length,numDirLights:_.directional.length,numPointLights:_.point.length,numSpotLights:_.spot.length,numSpotLightMaps:_.spotLightMap.length,numRectAreaLights:_.rectArea.length,numHemiLights:_.hemi.length,numSunLightShadows:_.sunShadowMap.length,numDirLightShadows:_.directionalShadowMap.length,numPointLightShadows:_.pointShadowMap.length,numSpotLightShadows:_.spotShadowMap.length,numSpotLightShadowsWithMaps:_.numSpotLightShadowsWithMaps,numLightProbes:_.numLightProbes,numLightProbeGrids:D.filter(Te=>Te.texture!==null).length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:x.dithering,shadowMapEnabled:s.shadowMap.enabled&&P.length>0,shadowMapType:s.shadowMap.type,toneMapping:le,decodeVideoTexture:Ge&&x.map.isVideoTexture===!0&&st.getTransfer(x.map.colorSpace)===vt,decodeVideoTextureEmissive:Be&&x.emissiveMap.isVideoTexture===!0&&st.getTransfer(x.emissiveMap.colorSpace)===vt,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===an,flipSided:x.side===gn,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:it&&x.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(it&&x.extensions.multiDraw===!0||Et)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return tt.vertexUv1s=l.has(1),tt.vertexUv2s=l.has(2),tt.vertexUv3s=l.has(3),l.clear(),tt}function y(x){let _=[];if(x.shaderID?_.push(x.shaderID):(_.push(x.customVertexShaderID),_.push(x.customFragmentShaderID)),x.defines!==void 0)for(let P in x.defines)_.push(P),_.push(x.defines[P]);return x.isRawShaderMaterial===!1&&(g(_,x),m(_,x),_.push(s.outputColorSpace)),_.push(x.customProgramCacheKey),_.join()}function g(x,_){x.push(_.precision),x.push(_.outputColorSpace),x.push(_.envMapMode),x.push(_.envMapPMREM),x.push(_.envMapMaxLod),x.push(_.envMapSize),x.push(_.mapUv),x.push(_.alphaMapUv),x.push(_.lightMapUv),x.push(_.aoMapUv),x.push(_.bumpMapUv),x.push(_.normalMapUv),x.push(_.displacementMapUv),x.push(_.emissiveMapUv),x.push(_.metalnessMapUv),x.push(_.roughnessMapUv),x.push(_.anisotropyMapUv),x.push(_.clearcoatMapUv),x.push(_.clearcoatNormalMapUv),x.push(_.clearcoatRoughnessMapUv),x.push(_.diffuseRoughnessMapUv),x.push(_.iridescenceMapUv),x.push(_.iridescenceThicknessMapUv),x.push(_.sheenColorMapUv),x.push(_.sheenRoughnessMapUv),x.push(_.specularMapUv),x.push(_.specularColorMapUv),x.push(_.specularIntensityMapUv),x.push(_.transmissionMapUv),x.push(_.thicknessMapUv),x.push(_.combine),x.push(_.fogExp2),x.push(_.sizeAttenuation),x.push(_.morphTargetsCount),x.push(_.numSunLights),x.push(_.numDirLights),x.push(_.numPointLights),x.push(_.numSpotLights),x.push(_.numSpotLightMaps),x.push(_.numHemiLights),x.push(_.numRectAreaLights),x.push(_.numSunLightShadows),x.push(_.numDirLightShadows),x.push(_.numPointLightShadows),x.push(_.numSpotLightShadows),x.push(_.numSpotLightShadowsWithMaps),x.push(_.numLightProbes),x.push(_.numLightProbeGrids),x.push(_.shadowMapType),x.push(_.toneMapping),x.push(_.numClippingPlanes),x.push(_.numClipIntersection),x.push(_.depthPacking)}function m(x,_){o.disableAll(),_.instancing&&o.enable(0),_.instancingColor&&o.enable(1),_.instancingMorph&&o.enable(2),_.matcap&&o.enable(3),_.envMap&&o.enable(4),_.normalMapObjectSpace&&o.enable(5),_.normalMapTangentSpace&&o.enable(6),_.clearcoat&&o.enable(7),_.iridescence&&o.enable(8),_.alphaTest&&o.enable(9),_.vertexColors&&o.enable(10),_.vertexAlphas&&o.enable(11),_.vertexUv1s&&o.enable(12),_.vertexUv2s&&o.enable(13),_.vertexUv3s&&o.enable(14),_.vertexTangents&&o.enable(15),_.anisotropy&&o.enable(16),_.alphaHash&&o.enable(17),_.batching&&o.enable(18),_.dispersion&&o.enable(19),_.retroreflection&&o.enable(24),_.diffuseRoughness&&o.enable(25),_.batchingColor&&o.enable(20),_.gradientMap&&o.enable(21),_.packedNormalMap&&o.enable(22),_.vertexNormals&&o.enable(23),x.push(o.mask),o.disableAll(),_.fog&&o.enable(0),_.useFog&&o.enable(1),_.flatShading&&o.enable(2),_.logarithmicDepthBuffer&&o.enable(3),_.reversedDepthBuffer&&o.enable(4),_.skinning&&o.enable(5),_.morphTargets&&o.enable(6),_.morphNormals&&o.enable(7),_.morphColors&&o.enable(8),_.premultipliedAlpha&&o.enable(9),_.shadowMapEnabled&&o.enable(10),_.doubleSided&&o.enable(11),_.flipSided&&o.enable(12),_.useDepthPacking&&o.enable(13),_.dithering&&o.enable(14),_.transmission&&o.enable(15),_.sheen&&o.enable(16),_.opaque&&o.enable(17),_.pointsUvs&&o.enable(18),_.decodeVideoTexture&&o.enable(19),_.decodeVideoTextureEmissive&&o.enable(20),_.alphaToCoverage&&o.enable(21),_.numLightProbeGrids>0&&o.enable(22),_.hasPositionAttribute&&o.enable(23),x.push(o.mask)}function b(x){let _=d[x.type],P;if(_){let R=si[_];P=Hf.clone(R.uniforms)}else P=x.uniforms;return P}function T(x,_){let P=h.get(_);return P!==void 0?++P.usedTimes:(P=new _v(s,_,x,i),c.push(P),h.set(_,P)),P}function M(x){if(--x.usedTimes===0){let _=c.indexOf(x);c[_]=c[c.length-1],c.pop(),h.delete(x.cacheKey),x.destroy()}}function w(x){a.remove(x)}function v(){a.dispose()}return{getParameters:p,getProgramCacheKey:y,getUniforms:b,acquireProgram:T,releaseProgram:M,releaseShaderCache:w,programs:c,dispose:v}}function bv(){let s=new WeakMap;function e(o){return s.has(o)}function t(o){let a=s.get(o);return a===void 0&&(a={},s.set(o,a)),a}function n(o){s.delete(o)}function i(o,a,l){s.get(o)[a]=l}function r(){s=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:r}}function Sv(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.materialVariant!==e.materialVariant?s.materialVariant-e.materialVariant:s.z!==e.z?s.z-e.z:s.id-e.id}function rp(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function op(){let s=[],e=0,t=[],n=[],i=[];function r(){e=0,t.length=0,n.length=0,i.length=0}function o(d){let f=0;return d.isInstancedMesh&&(f+=2),d.isSkinnedMesh&&(f+=1),f}function a(d,f,p,y,g,m){let b=s[e];return b===void 0?(b={id:d.id,object:d,geometry:f,material:p,materialVariant:o(d),groupOrder:y,renderOrder:d.renderOrder,z:g,group:m},s[e]=b):(b.id=d.id,b.object=d,b.geometry=f,b.material=p,b.materialVariant=o(d),b.groupOrder=y,b.renderOrder=d.renderOrder,b.z=g,b.group=m),e++,b}function l(d,f,p,y,g,m,b){b.reversedDepth===!0&&(g=-g);let T=a(d,f,p,y,g,m);p.transmission>0?n.push(T):p.transparent===!0?i.push(T):t.push(T)}function c(d,f,p,y,g,m){let b=a(d,f,p,y,g,m);p.transmission>0?n.unshift(b):p.transparent===!0?i.unshift(b):t.unshift(b)}function h(d,f){t.length>1&&t.sort(d||Sv),n.length>1&&n.sort(f||rp),i.length>1&&i.sort(f||rp)}function u(){for(let d=e,f=s.length;d<f;d++){let p=s[d];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:i,init:r,push:l,unshift:c,finish:u,sort:h}}function Ev(){let s=new WeakMap;function e(n,i){let r=s.get(n),o;return r===void 0?(o=new op,s.set(n,[o])):i>=r.length?(o=new op,r.push(o)):o=r[i],o}function t(){s=new WeakMap}return{get:e,dispose:t}}function Tv(){let s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new N,color:new se};break;case"SpotLight":t={position:new N,direction:new N,color:new se,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new N,color:new se,distance:0,decay:0};break;case"HemisphereLight":t={direction:new N,skyColor:new se,groundColor:new se};break;case"RectAreaLight":t={color:new se,position:new N,halfWidth:new N,halfHeight:new N};break}return s[e.id]=t,t}}}function wv(){let s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ye};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ye};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ye,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}var Av=0;function Rv(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function Cv(s){let e=new Tv,t=wv(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new N);let i=new N,r=new We,o=new We;function a(c){let h=0,u=0,d=0;for(let D=0;D<9;D++)n.probe[D].set(0,0,0);let f=0,p=0,y=0,g=0,m=0,b=0,T=0,M=0,w=0,v=0,x=0,_=0,P=0,R=0;c.sort(Rv);for(let D=0,q=c.length;D<q;D++){let I=c[D],z=I.color,Y=I.intensity,V=I.distance,B=null;if(I.shadow&&I.shadow.map&&(I.shadow.map.texture.format===qi?B=I.shadow.map.texture:B=I.shadow.map.depthTexture||I.shadow.map.texture),I.isAmbientLight)h+=z.r*Y,u+=z.g*Y,d+=z.b*Y;else if(I.isLightProbe){for(let F=0;F<9;F++)n.probe[F].addScaledVector(I.sh.coefficients[F],Y);R++}else if(I.isSunLight){let F=e.get(I);if(F.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){let K=I.shadow,Z=t.get(I);Z.shadowIntensity=K.intensity,Z.shadowBias=K.bias,Z.shadowNormalBias=K.normalBias,Z.shadowRadius=K.radius,Z.shadowMapSize.copy(K.mapSize).multiply(K.getFrameExtents()),n.sunShadow[p]=Z,n.sunShadowMap[p]=B;let he=K.getViewportCount();for(let Re=0;Re<he;Re++)n.sunShadowMatrix[y+Re]=K.getMatrix(Re),n.sunShadowCascade[y+Re]=K._cascadeData[Re];y+=he,p++}n.sun[f]=F,f++}else if(I.isDirectionalLight){let F=e.get(I);if(F.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){let K=I.shadow,Z=t.get(I);Z.shadowIntensity=K.intensity,Z.shadowBias=K.bias,Z.shadowNormalBias=K.normalBias,Z.shadowRadius=K.radius,Z.shadowMapSize=K.mapSize,n.directionalShadow[g]=Z,n.directionalShadowMap[g]=B,n.directionalShadowMatrix[g]=I.shadow.matrix,w++}n.directional[g]=F,g++}else if(I.isSpotLight){let F=e.get(I);F.position.setFromMatrixPosition(I.matrixWorld),F.color.copy(z).multiplyScalar(Y),F.distance=V,F.coneCos=Math.cos(I.angle),F.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),F.decay=I.decay,n.spot[b]=F;let K=I.shadow;if(I.map&&(n.spotLightMap[_]=I.map,_++,K.updateMatrices(I),I.castShadow&&P++),n.spotLightMatrix[b]=K.matrix,I.castShadow){let Z=t.get(I);Z.shadowIntensity=K.intensity,Z.shadowBias=K.bias,Z.shadowNormalBias=K.normalBias,Z.shadowRadius=K.radius,Z.shadowMapSize=K.mapSize,n.spotShadow[b]=Z,n.spotShadowMap[b]=B,x++}b++}else if(I.isRectAreaLight){let F=e.get(I);F.color.copy(z).multiplyScalar(Y),F.halfWidth.set(I.width*.5,0,0),F.halfHeight.set(0,I.height*.5,0),n.rectArea[T]=F,T++}else if(I.isPointLight){let F=e.get(I);if(F.color.copy(I.color).multiplyScalar(I.intensity),F.distance=I.distance,F.decay=I.decay,I.castShadow){let K=I.shadow,Z=t.get(I);Z.shadowIntensity=K.intensity,Z.shadowBias=K.bias,Z.shadowNormalBias=K.normalBias,Z.shadowRadius=K.radius,Z.shadowMapSize=K.mapSize,Z.shadowCameraNear=K.camera.near,Z.shadowCameraFar=K.camera.far,n.pointShadow[m]=Z,n.pointShadowMap[m]=B,n.pointShadowMatrix[m]=I.shadow.matrix,v++}n.point[m]=F,m++}else if(I.isHemisphereLight){let F=e.get(I);F.skyColor.copy(I.color).multiplyScalar(Y),F.groundColor.copy(I.groundColor).multiplyScalar(Y),n.hemi[M]=F,M++}}T>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ae.LTC_FLOAT_1,n.rectAreaLTC2=Ae.LTC_FLOAT_2):(n.rectAreaLTC1=Ae.LTC_HALF_1,n.rectAreaLTC2=Ae.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;let C=n.hash;(C.sunLength!==f||C.directionalLength!==g||C.pointLength!==m||C.spotLength!==b||C.rectAreaLength!==T||C.hemiLength!==M||C.numSunShadows!==p||C.numDirectionalShadows!==w||C.numPointShadows!==v||C.numSpotShadows!==x||C.numSpotMaps!==_||C.numLightProbes!==R)&&(n.sun.length=f,n.directional.length=g,n.spot.length=b,n.rectArea.length=T,n.point.length=m,n.hemi.length=M,n.sunShadow.length=p,n.sunShadowMap.length=p,n.sunShadowMatrix.length=y,n.sunShadowCascade.length=y,n.directionalShadow.length=w,n.directionalShadowMap.length=w,n.directionalShadowMatrix.length=w,n.pointShadow.length=v,n.pointShadowMap.length=v,n.pointShadowMatrix.length=v,n.spotShadow.length=x,n.spotShadowMap.length=x,n.spotLightMatrix.length=x+_-P,n.spotLightMap.length=_,n.numSpotLightShadowsWithMaps=P,n.numLightProbes=R,C.sunLength=f,C.directionalLength=g,C.pointLength=m,C.spotLength=b,C.rectAreaLength=T,C.hemiLength=M,C.numSunShadows=p,C.numDirectionalShadows=w,C.numPointShadows=v,C.numSpotShadows=x,C.numSpotMaps=_,C.numLightProbes=R,n.version=Av++)}function l(c,h){let u=0,d=0,f=0,p=0,y=0,g=0,m=h.matrixWorldInverse;for(let b=0,T=c.length;b<T;b++){let M=c[b];if(M.isSunLight){let w=n.sun[u];w.direction.setFromMatrixPosition(M.matrixWorld),w.direction.transformDirection(m),u++}else if(M.isDirectionalLight){let w=n.directional[d];w.direction.setFromMatrixPosition(M.matrixWorld),i.setFromMatrixPosition(M.target.matrixWorld),w.direction.sub(i),w.direction.transformDirection(m),d++}else if(M.isSpotLight){let w=n.spot[p];w.position.setFromMatrixPosition(M.matrixWorld),w.position.applyMatrix4(m),w.direction.setFromMatrixPosition(M.matrixWorld),i.setFromMatrixPosition(M.target.matrixWorld),w.direction.sub(i),w.direction.transformDirection(m),p++}else if(M.isRectAreaLight){let w=n.rectArea[y];w.position.setFromMatrixPosition(M.matrixWorld),w.position.applyMatrix4(m),o.identity(),r.copy(M.matrixWorld),r.premultiply(m),o.extractRotation(r),w.halfWidth.set(M.width*.5,0,0),w.halfHeight.set(0,M.height*.5,0),w.halfWidth.applyMatrix4(o),w.halfHeight.applyMatrix4(o),y++}else if(M.isPointLight){let w=n.point[f];w.position.setFromMatrixPosition(M.matrixWorld),w.position.applyMatrix4(m),f++}else if(M.isHemisphereLight){let w=n.hemi[g];w.direction.setFromMatrixPosition(M.matrixWorld),w.direction.transformDirection(m),g++}}}return{setup:a,setupView:l,state:n}}function ap(s){let e=new Cv(s),t=[],n=[],i=[];function r(u){h.camera=u,t.length=0,n.length=0,i.length=0}function o(u){u.isLightProbeGrid?i.push(u):t.push(u)}function a(u){n.push(u)}function l(){e.setup(t),i.sort((u,d)=>u.priority-d.priority||u.id-d.id)}function c(u){e.setupView(t,u)}let h={lightsArray:t,shadowsArray:n,lightProbeGridArray:i,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:h,setupLights:l,setupLightsView:c,pushLight:o,pushShadow:a}}function Pv(s){let e=new WeakMap;function t(i,r=0){let o=e.get(i),a;return o===void 0?(a=new ap(s),e.set(i,[a])):r>=o.length?(a=new ap(s),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}var Iv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Lv=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Nv=[new N(1,0,0),new N(-1,0,0),new N(0,1,0),new N(0,-1,0),new N(0,0,1),new N(0,0,-1)],Dv=[new N(0,-1,0),new N(0,-1,0),new N(0,0,1),new N(0,0,-1),new N(0,-1,0),new N(0,-1,0)],lp=new We,Lo=new N,eu=new N;function Uv(s,e,t){let n=new Gi,i=new ye,r=new ye,o=new bt,a=new Wa,l=new Xa,c={},h=t.maxTextureSize,u={[Dn]:gn,[gn]:Dn,[an]:an},d=new Qn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ye},radius:{value:4}},vertexShader:Iv,fragmentShader:Lv}),f=d.clone();f.defines.HORIZONTAL_PASS=1;let p=new Ut;p.setAttribute("position",new Zt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let y=new k(p,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=bo;let m=this.type;this.render=function(v,x,_){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||v.length===0)return;this.type===nl&&(Oe("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=bo);let P=s.getRenderTarget(),R=s.getActiveCubeFace(),C=s.getActiveMipmapLevel(),D=s.state;D.setBlending(ys),D.buffers.depth.getReversed()===!0?D.buffers.color.setClear(0,0,0,0):D.buffers.color.setClear(1,1,1,1),D.buffers.depth.setTest(!0),D.setScissorTest(!1);let q=m!==this.type;q&&x.traverse(function(I){I.material&&(Array.isArray(I.material)?I.material.forEach(z=>z.needsUpdate=!0):I.material.needsUpdate=!0)});for(let I=0,z=v.length;I<z;I++){let Y=v[I],V=Y.shadow;if(V===void 0){Oe("WebGLShadowMap:",Y,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;i.copy(V.mapSize);let B=V.getFrameExtents();i.multiply(B),r.copy(V.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/B.x),i.x=r.x*B.x,V.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/B.y),i.y=r.y*B.y,V.mapSize.y=r.y));let F=s.state.buffers.depth.getReversed();if(V.camera._reversedDepth=F,V.map===null||q===!0){if(V.map!==null&&(V.map.depthTexture!==null&&(V.map.depthTexture.dispose(),V.map.depthTexture=null),V.map.dispose()),this.type===dr){if(Y.isPointLight){Oe("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}V.map=new Sn(i.x,i.y,{format:qi,type:qn,minFilter:Bt,magFilter:Bt,generateMipmaps:!1}),V.map.texture.name=Y.name+".shadowMap",V.map.depthTexture=new _i(i.x,i.y,Tn),V.map.depthTexture.name=Y.name+".shadowMapDepth",V.map.depthTexture.format=gi,V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=Ft,V.map.depthTexture.magFilter=Ft}else Y.isPointLight?(V.map=new Do(i.x),V.map.depthTexture=new to(i.x,Xn)):(V.map=new Sn(i.x,i.y),V.map.depthTexture=new _i(i.x,i.y,Xn)),V.map.depthTexture.name=Y.name+".shadowMap",V.map.depthTexture.format=gi,this.type===bo?(V.map.depthTexture.compareFunction=F?Uh:Dh,V.map.depthTexture.minFilter=Bt,V.map.depthTexture.magFilter=Bt):(V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=Ft,V.map.depthTexture.magFilter=Ft);V.camera.updateProjectionMatrix()}V.map.isWebGLCubeRenderTarget!==!0&&(V.map.width!==i.x||V.map.height!==i.y)&&V.map.setSize(i.x,i.y);let K=V.map.isWebGLCubeRenderTarget?6:V.getViewportCount();Y.isPointLight!==!0&&V.updateMatrices(Y,_);let Z=(V.camera.layers.mask&4294967294)!==0?V.camera.layers:_.layers;for(let he=0;he<K;he++){let Re=V.getCamera(he);if(Y.isPointLight){let $=V.camera,ge=V.matrix,de=Y.distance||$.far;de!==$.far&&($.far=de,$.updateProjectionMatrix()),Lo.setFromMatrixPosition(Y.matrixWorld),$.position.copy(Lo),eu.copy($.position),eu.add(Nv[he]),$.up.copy(Dv[he]),$.lookAt(eu),$.updateMatrixWorld(),ge.makeTranslation(-Lo.x,-Lo.y,-Lo.z),lp.multiplyMatrices($.projectionMatrix,$.matrixWorldInverse),V._frustum.setFromProjectionMatrix(lp,$.coordinateSystem,$.reversedDepth)}if(V.map.isWebGLCubeRenderTarget)s.setRenderTarget(V.map,he),s.clear();else{he===0&&(s.setRenderTarget(V.map),s.clear());let $=V.getViewport(he);o.set(r.x*$.x,r.y*$.y,r.x*$.z,r.y*$.w),D.viewport(o)}n=V.getFrustum(he),M(x,_,Re,Y,Z,this.type)}V.isPointLightShadow!==!0&&this.type===dr&&b(V,_),V.needsUpdate=!1}m=this.type,g.needsUpdate=!1,s.setRenderTarget(P,R,C)};function b(v,x){let _=e.update(y);d.defines.VSM_SAMPLES!==v.blurSamples&&(d.defines.VSM_SAMPLES=v.blurSamples,f.defines.VSM_SAMPLES=v.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),v.mapPass===null?v.mapPass=new Sn(i.x,i.y,{format:qi,type:qn}):(v.mapPass.width!==v.map.width||v.mapPass.height!==v.map.height)&&v.mapPass.setSize(v.map.width,v.map.height),d.uniforms.shadow_pass.value=v.map.depthTexture,d.uniforms.resolution.value.set(v.map.width,v.map.height),d.uniforms.radius.value=v.radius,s.setRenderTarget(v.mapPass),s.clear(),s.renderBufferDirect(x,null,_,d,y,null),f.uniforms.shadow_pass.value=v.mapPass.texture,f.uniforms.resolution.value.set(v.map.width,v.map.height),f.uniforms.radius.value=v.radius,s.setRenderTarget(v.map),s.clear(),s.renderBufferDirect(x,null,_,f,y,null)}function T(v,x,_,P){let R=null,C=_.isPointLight===!0?v.customDistanceMaterial:v.customDepthMaterial;if(C!==void 0)R=C;else if(R=_.isPointLight===!0?l:a,s.localClippingEnabled&&x.clipShadows===!0&&Array.isArray(x.clippingPlanes)&&x.clippingPlanes.length!==0||x.displacementMap&&x.displacementScale!==0||x.alphaMap&&x.alphaTest>0||x.map&&x.alphaTest>0||x.alphaToCoverage===!0){let D=R.uuid,q=x.uuid,I=c[D];I===void 0&&(I={},c[D]=I);let z=I[q];z===void 0&&(z=R.clone(),I[q]=z,x.addEventListener("dispose",w)),R=z}if(R.visible=x.visible,R.wireframe=x.wireframe,P===dr?R.side=x.shadowSide!==null?x.shadowSide:x.side:R.side=x.shadowSide!==null?x.shadowSide:u[x.side],R.alphaMap=x.alphaMap,R.alphaTest=x.alphaToCoverage===!0?.5:x.alphaTest,R.map=x.map,R.clipShadows=x.clipShadows,R.clippingPlanes=x.clippingPlanes,R.clipIntersection=x.clipIntersection,R.displacementMap=x.displacementMap,R.displacementScale=x.displacementScale,R.displacementBias=x.displacementBias,R.wireframeLinewidth=x.wireframeLinewidth,R.linewidth=x.linewidth,_.isPointLight===!0&&R.isMeshDistanceMaterial===!0){let D=s.properties.get(R);D.light=_}return R}function M(v,x,_,P,R,C){if(v.visible===!1)return;if(v.layers.test(R)&&(v.isMesh||v.isLine||v.isPoints)&&(v.castShadow||v.receiveShadow&&C===dr)&&(!v.frustumCulled||v.intersectsFrustum(n))){v.modelViewMatrix.multiplyMatrices(_.matrixWorldInverse,v.matrixWorld);let I=e.update(v),z=v.material;if(Array.isArray(z)){let Y=I.groups;for(let V=0,B=Y.length;V<B;V++){let F=Y[V],K=z[F.materialIndex];if(K&&K.visible){let Z=T(v,K,P,C);v.onBeforeShadow(s,v,x,_,I,Z,F),s.renderBufferDirect(_,null,I,Z,v,F),v.onAfterShadow(s,v,x,_,I,Z,F)}}}else if(z.visible){let Y=T(v,z,P,C);v.onBeforeShadow(s,v,x,_,I,Y,null),s.renderBufferDirect(_,null,I,Y,v,null),v.onAfterShadow(s,v,x,_,I,Y,null)}}let q=v.children;for(let I=0,z=q.length;I<z;I++)M(q[I],x,_,P,R,C)}function w(v){v.target.removeEventListener("dispose",w);for(let _ in c){let P=c[_],R=v.target.uuid;R in P&&(P[R].dispose(),delete P[R])}}}function Ov(s,e){function t(){let L=!1,te=new bt,j=null,_e=new bt(0,0,0,0);return{setMask:function(ue){j!==ue&&!L&&(s.colorMask(ue,ue,ue,ue),j=ue)},setLocked:function(ue){L=ue},setClear:function(ue,me,He,it,le){le===!0&&(ue*=it,me*=it,He*=it),te.set(ue,me,He,it),_e.equals(te)===!1&&(s.clearColor(ue,me,He,it),_e.copy(te))},reset:function(){L=!1,j=null,_e.set(-1,0,0,0)}}}function n(){let L=!1,te=!1,j=null,_e=null,ue=null;return{setReversed:function(me){if(te!==me){let He=e.get("EXT_clip_control");me?He.clipControlEXT(He.LOWER_LEFT_EXT,He.ZERO_TO_ONE_EXT):He.clipControlEXT(He.LOWER_LEFT_EXT,He.NEGATIVE_ONE_TO_ONE_EXT),te=me;let it=ue;ue=null,this.setClear(it)}},getReversed:function(){return te},setTest:function(me){me?ae(s.DEPTH_TEST):Fe(s.DEPTH_TEST)},setMask:function(me){j!==me&&!L&&(s.depthMask(me),j=me)},setFunc:function(me){if(te&&(me=Nf[me]),_e!==me){switch(me){case Ea:s.depthFunc(s.NEVER);break;case Ta:s.depthFunc(s.ALWAYS);break;case wa:s.depthFunc(s.LESS);break;case Xs:s.depthFunc(s.LEQUAL);break;case Aa:s.depthFunc(s.EQUAL);break;case Ra:s.depthFunc(s.GEQUAL);break;case Ca:s.depthFunc(s.GREATER);break;case Pa:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}_e=me}},setLocked:function(me){L=me},setClear:function(me){ue!==me&&(ue=me,te&&(me=1-me),s.clearDepth(me))},reset:function(){L=!1,j=null,_e=null,ue=null,te=!1}}}function i(){let L=!1,te=null,j=null,_e=null,ue=null,me=null,He=null,it=null,le=null;return{setTest:function(ze){L||(ze?ae(s.STENCIL_TEST):Fe(s.STENCIL_TEST))},setMask:function(ze){te!==ze&&!L&&(s.stencilMask(ze),te=ze)},setFunc:function(ze,tt,Te){(j!==ze||_e!==tt||ue!==Te)&&(s.stencilFunc(ze,tt,Te),j=ze,_e=tt,ue=Te)},setOp:function(ze,tt,Te){(me!==ze||He!==tt||it!==Te)&&(s.stencilOp(ze,tt,Te),me=ze,He=tt,it=Te)},setLocked:function(ze){L=ze},setClear:function(ze){le!==ze&&(s.clearStencil(ze),le=ze)},reset:function(){L=!1,te=null,j=null,_e=null,ue=null,me=null,He=null,it=null,le=null}}}let r=new t,o=new n,a=new i,l={},c=new WeakMap,h={},u={},d={},f=new WeakMap,p=[],y=null,g=!1,m=null,b=null,T=null,M=null,w=null,v=null,x=null,_=new se(0,0,0),P=0,R=!1,C=null,D=null,q=null,I=null,z=null,Y=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS),V=!1,B=0,F=s.getParameter(s.VERSION);F.indexOf("WebGL")!==-1?(B=parseFloat(/^WebGL (\d)/.exec(F)[1]),V=B>=1):F.indexOf("OpenGL ES")!==-1&&(B=parseFloat(/^OpenGL ES (\d)/.exec(F)[1]),V=B>=2);let K=null,Z={},he=s.getParameter(s.SCISSOR_BOX),Re=s.getParameter(s.VIEWPORT),$=new bt().fromArray(he),ge=new bt().fromArray(Re);function de(L,te,j,_e){let ue=new Uint8Array(4),me=s.createTexture();s.bindTexture(L,me),s.texParameteri(L,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(L,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let He=0;He<j;He++)L===s.TEXTURE_3D||L===s.TEXTURE_2D_ARRAY?s.texImage3D(te,0,s.RGBA,1,1,_e,0,s.RGBA,s.UNSIGNED_BYTE,ue):s.texImage2D(te+He,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,ue);return me}let De={};De[s.TEXTURE_2D]=de(s.TEXTURE_2D,s.TEXTURE_2D,1),De[s.TEXTURE_CUBE_MAP]=de(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),De[s.TEXTURE_2D_ARRAY]=de(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),De[s.TEXTURE_3D]=de(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ae(s.DEPTH_TEST),o.setFunc(Xs),Ce(!1),Ee(mh),ae(s.CULL_FACE),fe(ys);function ae(L){h[L]!==!0&&(s.enable(L),h[L]=!0)}function Fe(L){h[L]!==!1&&(s.disable(L),h[L]=!1)}function Et(L,te){return d[L]!==te?(s.bindFramebuffer(L,te),d[L]=te,L===s.DRAW_FRAMEBUFFER&&(d[s.FRAMEBUFFER]=te),L===s.FRAMEBUFFER&&(d[s.DRAW_FRAMEBUFFER]=te),!0):!1}function Ge(L,te){let j=p,_e=!1;if(L){j=f.get(te),j===void 0&&(j=[],f.set(te,j));let ue=L.textures;if(j.length!==ue.length||j[0]!==s.COLOR_ATTACHMENT0){for(let me=0,He=ue.length;me<He;me++)j[me]=s.COLOR_ATTACHMENT0+me;j.length=ue.length,_e=!0}}else j[0]!==s.BACK&&(j[0]=s.BACK,_e=!0);_e&&s.drawBuffers(j)}function et(L){return y!==L?(s.useProgram(L),y=L,!0):!1}let ke={[vs]:s.FUNC_ADD,[jd]:s.FUNC_SUBTRACT,[Qd]:s.FUNC_REVERSE_SUBTRACT};ke[ef]=s.MIN,ke[tf]=s.MAX;let ne={[nf]:s.ZERO,[sf]:s.ONE,[rf]:s.SRC_COLOR,[_h]:s.SRC_ALPHA,[uf]:s.SRC_ALPHA_SATURATE,[cf]:s.DST_COLOR,[af]:s.DST_ALPHA,[of]:s.ONE_MINUS_SRC_COLOR,[yh]:s.ONE_MINUS_SRC_ALPHA,[hf]:s.ONE_MINUS_DST_COLOR,[lf]:s.ONE_MINUS_DST_ALPHA,[df]:s.CONSTANT_COLOR,[ff]:s.ONE_MINUS_CONSTANT_COLOR,[pf]:s.CONSTANT_ALPHA,[mf]:s.ONE_MINUS_CONSTANT_ALPHA};function fe(L,te,j,_e,ue,me,He,it,le,ze){if(L===ys){g===!0&&(Fe(s.BLEND),g=!1);return}if(g===!1&&(ae(s.BLEND),g=!0),L!==$d){if(L!==m||ze!==R){if((b!==vs||w!==vs)&&(s.blendEquation(s.FUNC_ADD),b=vs,w=vs),ze)switch(L){case fr:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Xi:s.blendFunc(s.ONE,s.ONE);break;case gh:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case xh:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:Ye("WebGLState: Invalid blending: ",L);break}else switch(L){case fr:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Xi:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case gh:Ye("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case xh:Ye("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ye("WebGLState: Invalid blending: ",L);break}T=null,M=null,v=null,x=null,_.set(0,0,0),P=0,m=L,R=ze}return}ue=ue||te,me=me||j,He=He||_e,(te!==b||ue!==w)&&(s.blendEquationSeparate(ke[te],ke[ue]),b=te,w=ue),(j!==T||_e!==M||me!==v||He!==x)&&(s.blendFuncSeparate(ne[j],ne[_e],ne[me],ne[He]),T=j,M=_e,v=me,x=He),(it.equals(_)===!1||le!==P)&&(s.blendColor(it.r,it.g,it.b,le),_.copy(it),P=le),m=L,R=!1}function ce(L,te){L.side===an?Fe(s.CULL_FACE):ae(s.CULL_FACE);let j=L.side===gn;te&&(j=!j),Ce(j),L.blending===fr&&L.transparent===!1?fe(ys):fe(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),o.setFunc(L.depthFunc),o.setTest(L.depthTest),o.setMask(L.depthWrite),r.setMask(L.colorWrite);let _e=L.stencilWrite;a.setTest(_e),_e&&(a.setMask(L.stencilWriteMask),a.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),a.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),Be(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?ae(s.SAMPLE_ALPHA_TO_COVERAGE):Fe(s.SAMPLE_ALPHA_TO_COVERAGE)}function Ce(L){C!==L&&(L?s.frontFace(s.CW):s.frontFace(s.CCW),C=L)}function Ee(L){L!==Jd?(ae(s.CULL_FACE),L!==D&&(L===mh?s.cullFace(s.BACK):L===Zd?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Fe(s.CULL_FACE),D=L}function Qe(L){L!==q&&(V&&s.lineWidth(L),q=L)}function Be(L,te,j){L?(ae(s.POLYGON_OFFSET_FILL),(I!==te||z!==j)&&(I=te,z=j,o.getReversed()&&(te=-te,j=-j),s.polygonOffset(te,j))):Fe(s.POLYGON_OFFSET_FILL)}function ct(L){L?ae(s.SCISSOR_TEST):Fe(s.SCISSOR_TEST)}function ut(L){L===void 0&&(L=s.TEXTURE0+Y-1),K!==L&&(s.activeTexture(L),K=L)}function xt(L,te,j){j===void 0&&(K===null?j=s.TEXTURE0+Y-1:j=K);let _e=Z[j];_e===void 0&&(_e={type:void 0,texture:void 0},Z[j]=_e),(_e.type!==L||_e.texture!==te)&&(K!==j&&(s.activeTexture(j),K=j),s.bindTexture(L,te||De[L]),_e.type=L,_e.texture=te)}function O(){let L=Z[K];L!==void 0&&L.type!==void 0&&(s.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function kt(){try{s.compressedTexImage2D(...arguments)}catch(L){Ye("WebGLState:",L)}}function lt(){try{s.compressedTexImage3D(...arguments)}catch(L){Ye("WebGLState:",L)}}function Tt(){try{s.texSubImage2D(...arguments)}catch(L){Ye("WebGLState:",L)}}function Me(){try{s.texSubImage3D(...arguments)}catch(L){Ye("WebGLState:",L)}}function Dt(){try{s.compressedTexSubImage2D(...arguments)}catch(L){Ye("WebGLState:",L)}}function Ve(){try{s.compressedTexSubImage3D(...arguments)}catch(L){Ye("WebGLState:",L)}}function Ke(){try{s.texStorage2D(...arguments)}catch(L){Ye("WebGLState:",L)}}function A(){try{s.texStorage3D(...arguments)}catch(L){Ye("WebGLState:",L)}}function S(){try{s.texImage2D(...arguments)}catch(L){Ye("WebGLState:",L)}}function W(){try{s.texImage3D(...arguments)}catch(L){Ye("WebGLState:",L)}}function oe(L){return u[L]!==void 0?u[L]:s.getParameter(L)}function ie(L,te){u[L]!==te&&(s.pixelStorei(L,te),u[L]=te)}function pe(L){$.equals(L)===!1&&(s.scissor(L.x,L.y,L.z,L.w),$.copy(L))}function be(L){ge.equals(L)===!1&&(s.viewport(L.x,L.y,L.z,L.w),ge.copy(L))}function Q(L,te){let j=c.get(te);j===void 0&&(j=new WeakMap,c.set(te,j));let _e=j.get(L);_e===void 0&&(_e=s.getUniformBlockIndex(te,L.name),s.uniformBlockBinding(te,_e,_e),j.set(L,_e))}function ee(L,te,j){let ue=c.get(te).get(L);l[ue]!==j&&(s.bindBufferBase(s.UNIFORM_BUFFER,ue,j),l[ue]=j)}function xe(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),o.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),s.pixelStorei(s.PACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,!1),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,s.BROWSER_DEFAULT_WEBGL),s.pixelStorei(s.PACK_ROW_LENGTH,0),s.pixelStorei(s.PACK_SKIP_PIXELS,0),s.pixelStorei(s.PACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_ROW_LENGTH,0),s.pixelStorei(s.UNPACK_IMAGE_HEIGHT,0),s.pixelStorei(s.UNPACK_SKIP_PIXELS,0),s.pixelStorei(s.UNPACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_SKIP_IMAGES,0),h={},u={},K=null,Z={},d={},l={},f=new WeakMap,p=[],y=null,g=!1,m=null,b=null,T=null,M=null,w=null,v=null,x=null,_=new se(0,0,0),P=0,R=!1,C=null,D=null,q=null,I=null,z=null,$.set(0,0,s.canvas.width,s.canvas.height),ge.set(0,0,s.canvas.width,s.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:ae,disable:Fe,bindFramebuffer:Et,drawBuffers:Ge,useProgram:et,setBlending:fe,setMaterial:ce,setFlipSided:Ce,setCullFace:Ee,setLineWidth:Qe,setPolygonOffset:Be,setScissorTest:ct,activeTexture:ut,bindTexture:xt,unbindTexture:O,compressedTexImage2D:kt,compressedTexImage3D:lt,texImage2D:S,texImage3D:W,pixelStorei:ie,getParameter:oe,updateUBOMapping:Q,uniformBlockBinding:ee,texStorage2D:Ke,texStorage3D:A,texSubImage2D:Tt,texSubImage3D:Me,compressedTexSubImage2D:Dt,compressedTexSubImage3D:Ve,scissor:pe,viewport:be,reset:xe}}function Fv(s,e,t,n,i,r,o){let a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ye,h=new WeakMap,u=new Set,d,f=new WeakMap,p=new Set,y=new FinalizationRegistry(A=>p.delete(A)),g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(A,S){return g?new OffscreenCanvas(A,S):Ks("canvas")}function b(A,S,W){let oe=1,ie=Ke(A);if((ie.width>W||ie.height>W)&&(oe=W/Math.max(ie.width,ie.height)),oe<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){let pe=Math.floor(oe*ie.width),be=Math.floor(oe*ie.height);d===void 0&&(d=m(pe,be));let Q=S?m(pe,be):d;return Q.width=pe,Q.height=be,Q.getContext("2d").drawImage(A,0,0,pe,be),Oe("WebGLRenderer: Texture has been resized from ("+ie.width+"x"+ie.height+") to ("+pe+"x"+be+")."),Q}else return"data"in A&&Oe("WebGLRenderer: Image in DataTexture is too big ("+ie.width+"x"+ie.height+")."),A;return A}function T(A){return A.generateMipmaps}function M(A){s.generateMipmap(A)}function w(A){return A.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?s.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function v(A,S,W,oe,ie,pe=!1){if(A!==null){if(s[A]!==void 0)return s[A];Oe("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let be;oe&&(be=e.get("EXT_texture_norm16"),be||Oe("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Q=S;if(S===s.RED&&(W===s.FLOAT&&(Q=s.R32F),W===s.HALF_FLOAT&&(Q=s.R16F),W===s.UNSIGNED_BYTE&&(Q=s.R8),W===s.UNSIGNED_SHORT&&be&&(Q=be.R16_EXT),W===s.SHORT&&be&&(Q=be.R16_SNORM_EXT)),S===s.RED_INTEGER&&(W===s.UNSIGNED_BYTE&&(Q=s.R8UI),W===s.UNSIGNED_SHORT&&(Q=s.R16UI),W===s.UNSIGNED_INT&&(Q=s.R32UI),W===s.BYTE&&(Q=s.R8I),W===s.SHORT&&(Q=s.R16I),W===s.INT&&(Q=s.R32I)),S===s.RG&&(W===s.FLOAT&&(Q=s.RG32F),W===s.HALF_FLOAT&&(Q=s.RG16F),W===s.UNSIGNED_BYTE&&(Q=s.RG8),W===s.UNSIGNED_SHORT&&be&&(Q=be.RG16_EXT),W===s.SHORT&&be&&(Q=be.RG16_SNORM_EXT)),S===s.RG_INTEGER&&(W===s.UNSIGNED_BYTE&&(Q=s.RG8UI),W===s.UNSIGNED_SHORT&&(Q=s.RG16UI),W===s.UNSIGNED_INT&&(Q=s.RG32UI),W===s.BYTE&&(Q=s.RG8I),W===s.SHORT&&(Q=s.RG16I),W===s.INT&&(Q=s.RG32I)),S===s.RGB_INTEGER&&(W===s.UNSIGNED_BYTE&&(Q=s.RGB8UI),W===s.UNSIGNED_SHORT&&(Q=s.RGB16UI),W===s.UNSIGNED_INT&&(Q=s.RGB32UI),W===s.BYTE&&(Q=s.RGB8I),W===s.SHORT&&(Q=s.RGB16I),W===s.INT&&(Q=s.RGB32I)),S===s.RGBA_INTEGER&&(W===s.UNSIGNED_BYTE&&(Q=s.RGBA8UI),W===s.UNSIGNED_SHORT&&(Q=s.RGBA16UI),W===s.UNSIGNED_INT&&(Q=s.RGBA32UI),W===s.BYTE&&(Q=s.RGBA8I),W===s.SHORT&&(Q=s.RGBA16I),W===s.INT&&(Q=s.RGBA32I)),S===s.RGB&&(W===s.UNSIGNED_SHORT&&be&&(Q=be.RGB16_EXT),W===s.SHORT&&be&&(Q=be.RGB16_SNORM_EXT),W===s.UNSIGNED_INT_5_9_9_9_REV&&(Q=s.RGB9_E5),W===s.UNSIGNED_INT_10F_11F_11F_REV&&(Q=s.R11F_G11F_B10F)),S===s.RGBA){let ee=pe?kr:st.getTransfer(ie);W===s.FLOAT&&(Q=s.RGBA32F),W===s.HALF_FLOAT&&(Q=s.RGBA16F),W===s.UNSIGNED_BYTE&&(Q=ee===vt?s.SRGB8_ALPHA8:s.RGBA8),W===s.UNSIGNED_SHORT&&be&&(Q=be.RGBA16_EXT),W===s.SHORT&&be&&(Q=be.RGBA16_SNORM_EXT),W===s.UNSIGNED_SHORT_4_4_4_4&&(Q=s.RGBA4),W===s.UNSIGNED_SHORT_5_5_5_1&&(Q=s.RGB5_A1)}return(Q===s.R16F||Q===s.R32F||Q===s.RG16F||Q===s.RG32F||Q===s.RGBA16F||Q===s.RGBA32F)&&e.get("EXT_color_buffer_float"),Q}function x(A,S){let W;return A?S===null||S===Xn||S===Ss?W=s.DEPTH24_STENCIL8:S===Tn?W=s.DEPTH32F_STENCIL8:S===gr&&(W=s.DEPTH24_STENCIL8,Oe("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===Xn||S===Ss?W=s.DEPTH_COMPONENT24:S===Tn?W=s.DEPTH_COMPONENT32F:S===gr&&(W=s.DEPTH_COMPONENT16),W}function _(A,S){return T(A)===!0||A.isFramebufferTexture&&A.minFilter!==Ft&&A.minFilter!==Bt?Math.log2(Math.max(S.width,S.height))+1:A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?S.mipmaps.length:1}function P(A){let S=new WeakRef(A);n.get(A).__ref=S,p.add(S),y.register(A,S,S)}function R(A){let S=n.get(A).__ref;S!==void 0&&(p.delete(S),y.unregister(S))}function C(A){q(A.target)}function D(A){I(A.target)}function q(A){A.removeEventListener("dispose",C),R(A),Y(A),A.isVideoTexture&&h.delete(A),A.isHTMLTexture&&u.delete(A)}function I(A){A.removeEventListener("dispose",D),R(A),B(A)}function z(){for(let A of p){let S=A.deref();S!==void 0&&(S.isRenderTarget===!0?I(S):q(S))}p.clear(),u.clear()}function Y(A){let S=n.get(A);if(S.__webglInit===void 0)return;let W=A.source,oe=f.get(W);if(oe){let ie=oe[S.__cacheKey];ie.usedTimes--,ie.usedTimes===0&&V(A),Object.keys(oe).length===0&&f.delete(W)}n.remove(A)}function V(A){let S=n.get(A);s.deleteTexture(S.__webglTexture);let W=A.source,oe=f.get(W);delete oe[S.__cacheKey],o.memory.textures--}function B(A){let S=n.get(A);S.__depthDisposeCallback&&S.__depthDisposeCallback();let W=A.depthTexture;if(W&&W.renderTarget===A&&q(W),A.isWebGLCubeRenderTarget)for(let ie=0;ie<6;ie++){if(Array.isArray(S.__webglFramebuffer[ie]))for(let pe=0;pe<S.__webglFramebuffer[ie].length;pe++)s.deleteFramebuffer(S.__webglFramebuffer[ie][pe]);else s.deleteFramebuffer(S.__webglFramebuffer[ie]);S.__webglDepthbuffer&&s.deleteRenderbuffer(S.__webglDepthbuffer[ie])}else{if(Array.isArray(S.__webglFramebuffer))for(let ie=0;ie<S.__webglFramebuffer.length;ie++)s.deleteFramebuffer(S.__webglFramebuffer[ie]);else s.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&s.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&s.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let ie=0;ie<S.__webglColorRenderbuffer.length;ie++)S.__webglColorRenderbuffer[ie]&&s.deleteRenderbuffer(S.__webglColorRenderbuffer[ie]);S.__webglDepthRenderbuffer&&s.deleteRenderbuffer(S.__webglDepthRenderbuffer)}let oe=A.textures;for(let ie=0,pe=oe.length;ie<pe;ie++){let be=n.get(oe[ie]);be.__webglTexture&&(s.deleteTexture(be.__webglTexture),o.memory.textures--),n.remove(oe[ie])}n.remove(A)}let F=0;function K(){F=0}function Z(){return F}function he(A){F=A}function Re(){let A=F;return A>=i.maxTextures&&Oe("WebGLTextures: Trying to use "+(A+1)+" texture units while this GPU supports only "+i.maxTextures),F+=1,A}function $(A){let S=[];return S.push(A.wrapS),S.push(A.wrapT),S.push(A.wrapR||0),S.push(A.magFilter),S.push(A.minFilter),S.push(A.anisotropy),S.push(A.internalFormat),S.push(A.format),S.push(A.type),S.push(A.generateMipmaps),S.push(A.mipmapsAutoUpdate),S.push(A.premultiplyAlpha),S.push(A.flipY),S.push(A.unpackAlignment),S.push(A.colorSpace),S.join()}function ge(A,S){let W=n.get(A);if(A.isVideoTexture&&Dt(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&W.__version!==A.version){let oe=A.image;if(oe===null)Oe("WebGLRenderer: Texture marked for update but no image data found.");else if(oe.complete===!1)Oe("WebGLRenderer: Texture marked for update but image is incomplete");else{ce(W,A,S);return}}else A.isExternalTexture&&(W.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(s.TEXTURE_2D,W.__webglTexture,s.TEXTURE0+S)}function de(A,S){let W=n.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&W.__version!==A.version){ce(W,A,S);return}else A.isExternalTexture&&(W.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(s.TEXTURE_2D_ARRAY,W.__webglTexture,s.TEXTURE0+S)}function De(A,S){let W=n.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&W.__version!==A.version){ce(W,A,S);return}t.bindTexture(s.TEXTURE_3D,W.__webglTexture,s.TEXTURE0+S)}function ae(A,S){let W=n.get(A);if(A.version>0&&W.__version!==A.version){Ce(W,A,S);return}t.bindTexture(s.TEXTURE_CUBE_MAP,W.__webglTexture,s.TEXTURE0+S)}let Fe={[jn]:s.REPEAT,[Cn]:s.CLAMP_TO_EDGE,[qs]:s.MIRRORED_REPEAT},Et={[Ft]:s.NEAREST,[ol]:s.NEAREST_MIPMAP_NEAREST,[bs]:s.NEAREST_MIPMAP_LINEAR,[Bt]:s.LINEAR,[mr]:s.LINEAR_MIPMAP_NEAREST,[yn]:s.LINEAR_MIPMAP_LINEAR},Ge={[Tf]:s.NEVER,[Oh]:s.ALWAYS,[wf]:s.LESS,[Dh]:s.LEQUAL,[Af]:s.EQUAL,[Uh]:s.GEQUAL,[Rf]:s.GREATER,[Cf]:s.NOTEQUAL};function et(A,S){if(S.type===Tn&&e.has("OES_texture_float_linear")===!1&&(S.magFilter===Bt||S.magFilter===mr||S.magFilter===bs||S.magFilter===yn||S.minFilter===Bt||S.minFilter===mr||S.minFilter===bs||S.minFilter===yn)&&Oe("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(A,s.TEXTURE_WRAP_S,Fe[S.wrapS]),s.texParameteri(A,s.TEXTURE_WRAP_T,Fe[S.wrapT]),(A===s.TEXTURE_3D||A===s.TEXTURE_2D_ARRAY)&&s.texParameteri(A,s.TEXTURE_WRAP_R,Fe[S.wrapR]),s.texParameteri(A,s.TEXTURE_MAG_FILTER,Et[S.magFilter]),s.texParameteri(A,s.TEXTURE_MIN_FILTER,Et[S.minFilter]),S.compareFunction&&(s.texParameteri(A,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(A,s.TEXTURE_COMPARE_FUNC,Ge[S.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===Ft||S.minFilter!==bs&&S.minFilter!==yn||S.type===Tn&&e.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||n.get(S).__currentAnisotropy){let W=e.get("EXT_texture_filter_anisotropic");s.texParameterf(A,W.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,i.getMaxAnisotropy())),n.get(S).__currentAnisotropy=S.anisotropy}}}function ke(A,S){let W=!1;A.__webglInit===void 0&&(A.__webglInit=!0,S.addEventListener("dispose",C),P(S));let oe=S.source,ie=f.get(oe);ie===void 0&&(ie={},f.set(oe,ie));let pe=$(S);if(pe!==A.__cacheKey){ie[pe]===void 0&&(ie[pe]={texture:s.createTexture(),usedTimes:0},o.memory.textures++,W=!0),ie[pe].usedTimes++;let be=ie[A.__cacheKey];be!==void 0&&(ie[A.__cacheKey].usedTimes--,be.usedTimes===0&&V(S)),A.__cacheKey=pe,A.__webglTexture=ie[pe].texture}return W}function ne(A,S,W){return Math.floor(Math.floor(A/W)/S)}function fe(A,S,W,oe){let pe=A.updateRanges;if(pe.length===0)t.texSubImage2D(s.TEXTURE_2D,0,0,0,S.width,S.height,W,oe,S.data);else{pe.sort((L,te)=>L.start-te.start);let be=0;for(let L=1;L<pe.length;L++){let te=pe[be],j=pe[L],_e=te.start+te.count,ue=ne(j.start,S.width,4),me=ne(te.start,S.width,4);j.start<=_e+1&&ue===me&&ne(j.start+j.count-1,S.width,4)===ue?te.count=Math.max(te.count,j.start+j.count-te.start):(++be,pe[be]=j)}pe.length=be+1;let Q=t.getParameter(s.UNPACK_ROW_LENGTH),ee=t.getParameter(s.UNPACK_SKIP_PIXELS),xe=t.getParameter(s.UNPACK_SKIP_ROWS);t.pixelStorei(s.UNPACK_ROW_LENGTH,S.width);for(let L=0,te=pe.length;L<te;L++){let j=pe[L],_e=Math.floor(j.start/4),ue=Math.ceil(j.count/4),me=_e%S.width,He=Math.floor(_e/S.width),it=ue,le=1;t.pixelStorei(s.UNPACK_SKIP_PIXELS,me),t.pixelStorei(s.UNPACK_SKIP_ROWS,He),t.texSubImage2D(s.TEXTURE_2D,0,me,He,it,le,W,oe,S.data)}A.clearUpdateRanges(),t.pixelStorei(s.UNPACK_ROW_LENGTH,Q),t.pixelStorei(s.UNPACK_SKIP_PIXELS,ee),t.pixelStorei(s.UNPACK_SKIP_ROWS,xe)}}function ce(A,S,W){let oe=s.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(oe=s.TEXTURE_2D_ARRAY),S.isData3DTexture&&(oe=s.TEXTURE_3D);let ie=ke(A,S),pe=S.source;t.bindTexture(oe,A.__webglTexture,s.TEXTURE0+W);let be=n.get(pe);if(pe.version!==be.__version||ie===!0){if(t.activeTexture(s.TEXTURE0+W),(typeof ImageBitmap<"u"&&S.image instanceof ImageBitmap)===!1){let le=st.getPrimaries(st.workingColorSpace),ze=S.colorSpace===wi?null:st.getPrimaries(S.colorSpace),tt=S.colorSpace===wi||le===ze?s.NONE:s.BROWSER_DEFAULT_WEBGL;t.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,S.flipY),t.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),t.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,tt)}t.pixelStorei(s.UNPACK_ALIGNMENT,S.unpackAlignment);let ee=b(S.image,!1,i.maxTextureSize);ee=Ve(S,ee);let xe=r.convert(S.format,S.colorSpace),L=r.convert(S.type),te=v(S.internalFormat,xe,L,S.normalized,S.colorSpace,S.isVideoTexture);et(oe,S);let j,_e=S.mipmaps,ue=S.isVideoTexture!==!0,me=be.__version===void 0||ie===!0,He=pe.dataReady,it=_(S,ee);if(S.isDepthTexture)te=x(S.format===Ti,S.type),me&&(ue?t.texStorage2D(s.TEXTURE_2D,1,te,ee.width,ee.height):t.texImage2D(s.TEXTURE_2D,0,te,ee.width,ee.height,0,xe,L,null));else if(S.isDataTexture)if(_e.length>0){ue&&me&&t.texStorage2D(s.TEXTURE_2D,it,te,_e[0].width,_e[0].height);for(let le=0,ze=_e.length;le<ze;le++)j=_e[le],ue?He&&t.texSubImage2D(s.TEXTURE_2D,le,0,0,j.width,j.height,xe,L,j.data):t.texImage2D(s.TEXTURE_2D,le,te,j.width,j.height,0,xe,L,j.data);S.generateMipmaps=!1}else ue?(me&&t.texStorage2D(s.TEXTURE_2D,it,te,ee.width,ee.height),He&&fe(S,ee,xe,L)):t.texImage2D(s.TEXTURE_2D,0,te,ee.width,ee.height,0,xe,L,ee.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){ue&&me&&t.texStorage3D(s.TEXTURE_2D_ARRAY,it,te,_e[0].width,_e[0].height,ee.depth);for(let le=0,ze=_e.length;le<ze;le++)if(j=_e[le],S.format!==Un)if(xe!==null)if(ue){if(He)if(S.layerUpdates.size>0){let tt=Yh(j.width,j.height,S.format,S.type);for(let Te of S.layerUpdates){let Mt=j.data.subarray(Te*tt/j.data.BYTES_PER_ELEMENT,(Te+1)*tt/j.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,le,0,0,Te,j.width,j.height,1,xe,Mt)}}else t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,le,0,0,0,j.width,j.height,ee.depth,xe,j.data)}else t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,le,te,j.width,j.height,ee.depth,0,j.data,0,0);else Oe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ue?He&&t.texSubImage3D(s.TEXTURE_2D_ARRAY,le,0,0,0,j.width,j.height,ee.depth,xe,L,j.data):t.texImage3D(s.TEXTURE_2D_ARRAY,le,te,j.width,j.height,ee.depth,0,xe,L,j.data);S.layerUpdates.size>0&&S.clearLayerUpdates()}else{ue&&me&&t.texStorage2D(s.TEXTURE_2D,it,te,_e[0].width,_e[0].height);for(let le=0,ze=_e.length;le<ze;le++)j=_e[le],S.format!==Un?xe!==null?ue?He&&t.compressedTexSubImage2D(s.TEXTURE_2D,le,0,0,j.width,j.height,xe,j.data):t.compressedTexImage2D(s.TEXTURE_2D,le,te,j.width,j.height,0,j.data):Oe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ue?He&&t.texSubImage2D(s.TEXTURE_2D,le,0,0,j.width,j.height,xe,L,j.data):t.texImage2D(s.TEXTURE_2D,le,te,j.width,j.height,0,xe,L,j.data)}else if(S.isDataArrayTexture)if(ue){if(me&&t.texStorage3D(s.TEXTURE_2D_ARRAY,it,te,ee.width,ee.height,ee.depth),He)if(S.layerUpdates.size>0){let le=Yh(ee.width,ee.height,S.format,S.type);for(let ze of S.layerUpdates){let tt=ee.data.subarray(ze*le/ee.data.BYTES_PER_ELEMENT,(ze+1)*le/ee.data.BYTES_PER_ELEMENT);t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,ze,ee.width,ee.height,1,xe,L,tt)}S.clearLayerUpdates()}else t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,ee.width,ee.height,ee.depth,xe,L,ee.data)}else t.texImage3D(s.TEXTURE_2D_ARRAY,0,te,ee.width,ee.height,ee.depth,0,xe,L,ee.data);else if(S.isData3DTexture)ue?(me&&t.texStorage3D(s.TEXTURE_3D,it,te,ee.width,ee.height,ee.depth),He&&t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,ee.width,ee.height,ee.depth,xe,L,ee.data)):t.texImage3D(s.TEXTURE_3D,0,te,ee.width,ee.height,ee.depth,0,xe,L,ee.data);else if(S.isFramebufferTexture){if(me)if(ue)t.texStorage2D(s.TEXTURE_2D,it,te,ee.width,ee.height);else{let le=ee.width,ze=ee.height;for(let tt=0;tt<it;tt++)t.texImage2D(s.TEXTURE_2D,tt,te,le,ze,0,xe,L,null),le>>=1,ze>>=1}}else if(S.isHTMLTexture){if("texElementImage2D"in s){let le=s.canvas;if(le.hasAttribute("layoutsubtree")||le.setAttribute("layoutsubtree","true"),ee.parentNode!==le){le.appendChild(ee),u.add(S),le.onpaint=ze=>{let tt=ze.changedElements;for(let Te of u)tt.includes(Te.image)&&(Te.needsUpdate=!0)},le.requestPaint();return}if(s.texElementImage2D.length===3)s.texElementImage2D(s.TEXTURE_2D,s.RGBA8,ee);else{let tt=s.RGBA,Te=s.RGBA,Mt=s.UNSIGNED_BYTE;s.texElementImage2D(s.TEXTURE_2D,0,tt,Te,Mt,ee)}s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,s.LINEAR),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE)}}else if(_e.length>0){if(ue&&me){let le=Ke(_e[0]);t.texStorage2D(s.TEXTURE_2D,it,te,le.width,le.height)}for(let le=0,ze=_e.length;le<ze;le++)j=_e[le],ue?He&&t.texSubImage2D(s.TEXTURE_2D,le,0,0,xe,L,j):t.texImage2D(s.TEXTURE_2D,le,te,xe,L,j);S.generateMipmaps=!1}else if(ue){if(me){let le=Ke(ee);t.texStorage2D(s.TEXTURE_2D,it,te,le.width,le.height)}He&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,xe,L,ee)}else t.texImage2D(s.TEXTURE_2D,0,te,xe,L,ee);T(S)&&S.mipmapsAutoUpdate===!0&&M(oe),be.__version=pe.version,S.onUpdate&&S.onUpdate(S)}A.__version=S.version}function Ce(A,S,W){if(S.image.length!==6)return;let oe=ke(A,S),ie=S.source;t.bindTexture(s.TEXTURE_CUBE_MAP,A.__webglTexture,s.TEXTURE0+W);let pe=n.get(ie);if(ie.version!==pe.__version||oe===!0){t.activeTexture(s.TEXTURE0+W);let be=st.getPrimaries(st.workingColorSpace),Q=S.colorSpace===wi?null:st.getPrimaries(S.colorSpace),ee=S.colorSpace===wi||be===Q?s.NONE:s.BROWSER_DEFAULT_WEBGL;t.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,S.flipY),t.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),t.pixelStorei(s.UNPACK_ALIGNMENT,S.unpackAlignment),t.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,ee);let xe=S.isCompressedTexture||S.image[0].isCompressedTexture,L=S.image[0]&&S.image[0].isDataTexture,te=[];for(let Te=0;Te<6;Te++)!xe&&!L?te[Te]=b(S.image[Te],!0,i.maxCubemapSize):te[Te]=L?S.image[Te].image:S.image[Te],te[Te]=Ve(S,te[Te]);let j=te[0],_e=r.convert(S.format,S.colorSpace),ue=r.convert(S.type),me=v(S.internalFormat,_e,ue,S.normalized,S.colorSpace),He=S.isVideoTexture!==!0,it=pe.__version===void 0||oe===!0,le=ie.dataReady,ze=_(S,j);et(s.TEXTURE_CUBE_MAP,S);let tt;if(S.isDepthTexture){if(me=x(S.format===Ti,S.type),it)if(He)t.texStorage2D(s.TEXTURE_CUBE_MAP,1,me,j.width,j.height);else for(let Te=0;Te<6;Te++)t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Te,0,me,j.width,j.height,0,_e,ue,null)}else if(xe){He&&it&&t.texStorage2D(s.TEXTURE_CUBE_MAP,ze,me,j.width,j.height);for(let Te=0;Te<6;Te++){tt=te[Te].mipmaps;for(let Mt=0;Mt<tt.length;Mt++){let Yt=tt[Mt];S.format!==Un?_e!==null?He?le&&t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Te,Mt,0,0,Yt.width,Yt.height,_e,Yt.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Te,Mt,me,Yt.width,Yt.height,0,Yt.data):Oe("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):He?le&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Te,Mt,0,0,Yt.width,Yt.height,_e,ue,Yt.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Te,Mt,me,Yt.width,Yt.height,0,_e,ue,Yt.data)}}}else{if(tt=S.mipmaps,He&&it){tt.length>0&&ze++;let Te=Ke(te[0]);t.texStorage2D(s.TEXTURE_CUBE_MAP,ze,me,Te.width,Te.height)}for(let Te=0;Te<6;Te++)if(L){He?le&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Te,0,0,0,te[Te].width,te[Te].height,_e,ue,te[Te].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Te,0,me,te[Te].width,te[Te].height,0,_e,ue,te[Te].data);for(let Mt=0;Mt<tt.length;Mt++){let Ni=tt[Mt].image[Te].image;He?le&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Te,Mt+1,0,0,Ni.width,Ni.height,_e,ue,Ni.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Te,Mt+1,me,Ni.width,Ni.height,0,_e,ue,Ni.data)}}else{He?le&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Te,0,0,0,_e,ue,te[Te]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Te,0,me,_e,ue,te[Te]);for(let Mt=0;Mt<tt.length;Mt++){let Yt=tt[Mt];He?le&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Te,Mt+1,0,0,_e,ue,Yt.image[Te]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Te,Mt+1,me,_e,ue,Yt.image[Te])}}}T(S)&&S.mipmapsAutoUpdate===!0&&M(s.TEXTURE_CUBE_MAP),pe.__version=ie.version,S.onUpdate&&S.onUpdate(S)}A.__version=S.version}function Ee(A,S,W,oe,ie,pe){let be=r.convert(W.format,W.colorSpace),Q=r.convert(W.type),ee=v(W.internalFormat,be,Q,W.normalized,W.colorSpace),xe=n.get(S),L=n.get(W);if(L.__renderTarget=S,!xe.__hasExternalTextures){let te=Math.max(1,S.width>>pe),j=Math.max(1,S.height>>pe);ie===s.TEXTURE_3D||ie===s.TEXTURE_2D_ARRAY?t.texImage3D(ie,pe,ee,te,j,S.depth,0,be,Q,null):t.texImage2D(ie,pe,ee,te,j,0,be,Q,null)}t.bindFramebuffer(s.FRAMEBUFFER,A),Me(S)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,oe,ie,L.__webglTexture,0,Tt(S)):(ie===s.TEXTURE_2D||ie>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&ie<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,oe,ie,L.__webglTexture,pe),t.bindFramebuffer(s.FRAMEBUFFER,null)}function Qe(A,S,W){if(s.bindRenderbuffer(s.RENDERBUFFER,A),S.depthBuffer){let oe=S.depthTexture,ie=oe&&oe.isDepthTexture?oe.type:null,pe=x(S.stencilBuffer,ie),be=S.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;Me(S)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Tt(S),pe,S.width,S.height):W?s.renderbufferStorageMultisample(s.RENDERBUFFER,Tt(S),pe,S.width,S.height):s.renderbufferStorage(s.RENDERBUFFER,pe,S.width,S.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,be,s.RENDERBUFFER,A)}else{let oe=S.textures;for(let ie=0;ie<oe.length;ie++){let pe=oe[ie],be=r.convert(pe.format,pe.colorSpace),Q=r.convert(pe.type),ee=v(pe.internalFormat,be,Q,pe.normalized,pe.colorSpace);Me(S)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Tt(S),ee,S.width,S.height):W?s.renderbufferStorageMultisample(s.RENDERBUFFER,Tt(S),ee,S.width,S.height):s.renderbufferStorage(s.RENDERBUFFER,ee,S.width,S.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Be(A,S,W){let oe=S.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(s.FRAMEBUFFER,A),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let ie=n.get(S.depthTexture);ie.__renderTarget=S;let pe=oe?S.depthTexture.image[0]:S.depthTexture.image;(!ie.__webglTexture||pe.width!==S.width||pe.height!==S.height)&&(pe.width=S.width,pe.height=S.height,S.depthTexture.needsUpdate=!0),oe?ae(S.depthTexture,0):ge(S.depthTexture,0);let be=ie.__webglTexture,Q=Tt(S),ee=oe?s.TEXTURE_CUBE_MAP_POSITIVE_X+W:s.TEXTURE_2D,xe=S.depthTexture.format===Ti?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;if(S.depthTexture.format===gi)Me(S)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,xe,ee,be,0,Q):s.framebufferTexture2D(s.FRAMEBUFFER,xe,ee,be,0);else if(S.depthTexture.format===Ti)Me(S)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,xe,ee,be,0,Q):s.framebufferTexture2D(s.FRAMEBUFFER,xe,ee,be,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function ct(A){let S=n.get(A),W=A.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==A.depthTexture){let oe=A.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),oe){let ie=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,oe.removeEventListener("dispose",ie)};oe.addEventListener("dispose",ie),S.__depthDisposeCallback=ie}S.__boundDepthTexture=oe}if(A.depthTexture&&!S.__autoAllocateDepthBuffer)if(W)for(let oe=0;oe<6;oe++)Be(S.__webglFramebuffer[oe],A,oe);else A.texture.mipmaps.length>0?Be(S.__webglFramebuffer[0],A,0):Be(S.__webglFramebuffer,A,0);else if(W){S.__webglDepthbuffer=[];for(let oe=0;oe<6;oe++)if(t.bindFramebuffer(s.FRAMEBUFFER,S.__webglFramebuffer[oe]),S.__webglDepthbuffer[oe]===void 0)S.__webglDepthbuffer[oe]=s.createRenderbuffer(),Qe(S.__webglDepthbuffer[oe],A,!1);else{let ie=A.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,pe=S.__webglDepthbuffer[oe];s.bindRenderbuffer(s.RENDERBUFFER,pe),s.framebufferRenderbuffer(s.FRAMEBUFFER,ie,s.RENDERBUFFER,pe)}}else if(A.texture.mipmaps.length>0?t.bindFramebuffer(s.FRAMEBUFFER,S.__webglFramebuffer[0]):t.bindFramebuffer(s.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=s.createRenderbuffer(),Qe(S.__webglDepthbuffer,A,!1);else{let ie=A.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,pe=S.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,pe),s.framebufferRenderbuffer(s.FRAMEBUFFER,ie,s.RENDERBUFFER,pe)}t.bindFramebuffer(s.FRAMEBUFFER,null)}function ut(A,S,W){let oe=n.get(A);S!==void 0&&Ee(oe.__webglFramebuffer,A,A.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),W!==void 0&&ct(A)}function xt(A){let S=A.texture,W=n.get(A),oe=n.get(S);A.addEventListener("dispose",D),P(A);let ie=A.textures,pe=A.isWebGLCubeRenderTarget===!0,be=ie.length>1;if(be||(oe.__webglTexture===void 0&&(oe.__webglTexture=s.createTexture()),oe.__version=S.version,o.memory.textures++),pe){W.__webglFramebuffer=[];for(let Q=0;Q<6;Q++)if(S.mipmaps.length>0){W.__webglFramebuffer[Q]=[];for(let ee=0;ee<S.mipmaps.length;ee++)W.__webglFramebuffer[Q][ee]=s.createFramebuffer()}else W.__webglFramebuffer[Q]=s.createFramebuffer()}else{if(S.mipmaps.length>0){W.__webglFramebuffer=[];for(let Q=0;Q<S.mipmaps.length;Q++)W.__webglFramebuffer[Q]=s.createFramebuffer()}else W.__webglFramebuffer=s.createFramebuffer();if(be)for(let Q=0,ee=ie.length;Q<ee;Q++){let xe=n.get(ie[Q]);xe.__webglTexture===void 0&&(xe.__webglTexture=s.createTexture(),o.memory.textures++)}if(A.samples>0&&Me(A)===!1){W.__webglMultisampledFramebuffer=s.createFramebuffer(),W.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,W.__webglMultisampledFramebuffer);for(let Q=0;Q<ie.length;Q++){let ee=ie[Q];W.__webglColorRenderbuffer[Q]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,W.__webglColorRenderbuffer[Q]);let xe=r.convert(ee.format,ee.colorSpace),L=r.convert(ee.type),te=v(ee.internalFormat,xe,L,ee.normalized,ee.colorSpace,A.isXRRenderTarget===!0),j=Tt(A);s.renderbufferStorageMultisample(s.RENDERBUFFER,j,te,A.width,A.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Q,s.RENDERBUFFER,W.__webglColorRenderbuffer[Q])}s.bindRenderbuffer(s.RENDERBUFFER,null),A.depthBuffer&&(W.__webglDepthRenderbuffer=s.createRenderbuffer(),Qe(W.__webglDepthRenderbuffer,A,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(pe){t.bindTexture(s.TEXTURE_CUBE_MAP,oe.__webglTexture),et(s.TEXTURE_CUBE_MAP,S);for(let Q=0;Q<6;Q++)if(S.mipmaps.length>0)for(let ee=0;ee<S.mipmaps.length;ee++)Ee(W.__webglFramebuffer[Q][ee],A,S,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Q,ee);else Ee(W.__webglFramebuffer[Q],A,S,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0);T(S)?M(s.TEXTURE_CUBE_MAP):S.mipmaps.length>0&&s.texParameteri(s.TEXTURE_CUBE_MAP,s.TEXTURE_MAX_LEVEL,S.mipmaps.length-1),t.unbindTexture()}else if(be){for(let Q=0,ee=ie.length;Q<ee;Q++){let xe=ie[Q],L=n.get(xe),te=s.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(te=A.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(te,L.__webglTexture),et(te,xe),Ee(W.__webglFramebuffer,A,xe,s.COLOR_ATTACHMENT0+Q,te,0),T(xe)&&M(te)}t.unbindTexture()}else{let Q=s.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(Q=A.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(Q,oe.__webglTexture),et(Q,S),S.mipmaps.length>0)for(let ee=0;ee<S.mipmaps.length;ee++)Ee(W.__webglFramebuffer[ee],A,S,s.COLOR_ATTACHMENT0,Q,ee);else Ee(W.__webglFramebuffer,A,S,s.COLOR_ATTACHMENT0,Q,0);T(S)?M(Q):S.mipmaps.length>0&&s.texParameteri(Q,s.TEXTURE_MAX_LEVEL,S.mipmaps.length-1),t.unbindTexture()}A.depthBuffer&&ct(A)}function O(A){let S=A.textures;for(let W=0,oe=S.length;W<oe;W++){let ie=S[W];if(T(ie)&&ie.mipmapsAutoUpdate===!0){let pe=w(A),be=n.get(ie).__webglTexture;t.bindTexture(pe,be),M(pe),t.unbindTexture()}}}let kt=[];function lt(A){if(A.samples>0){if(Me(A)===!1){let S=A.textures,W=A.width,oe=A.height,ie=s.COLOR_BUFFER_BIT,pe=A.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,be=n.get(A),Q=S.length>1;if(Q)for(let xe=0;xe<S.length;xe++)t.bindFramebuffer(s.FRAMEBUFFER,be.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+xe,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,be.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+xe,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,be.__webglMultisampledFramebuffer),A.texture.mipmaps.length>0?t.bindFramebuffer(s.DRAW_FRAMEBUFFER,be.__webglFramebuffer[0]):t.bindFramebuffer(s.DRAW_FRAMEBUFFER,be.__webglFramebuffer);for(let xe=0;xe<S.length;xe++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(ie|=s.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(ie|=s.STENCIL_BUFFER_BIT)),Q){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,be.__webglColorRenderbuffer[xe]);let L=n.get(S[xe]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,L,0)}s.blitFramebuffer(0,0,W,oe,0,0,W,oe,ie,s.NEAREST),l===!0&&(kt.length=0,kt.push(s.COLOR_ATTACHMENT0+xe),A.depthBuffer&&A.storeMultisampledDepthBuffer===!1&&kt.push(pe),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,kt))}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),Q)for(let xe=0;xe<S.length;xe++){t.bindFramebuffer(s.FRAMEBUFFER,be.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+xe,s.RENDERBUFFER,be.__webglColorRenderbuffer[xe]);let L=n.get(S[xe]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,be.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+xe,s.TEXTURE_2D,L,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,be.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.storeMultisampledDepthBuffer===!1&&l){let S=A.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[S])}}}function Tt(A){return Math.min(i.maxSamples,A.samples)}function Me(A){let S=n.get(A);return A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function Dt(A){let S=o.render.frame;h.get(A)!==S&&(h.set(A,S),A.update())}function Ve(A,S){let W=A.colorSpace,oe=A.format,ie=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||W!==dn&&W!==wi&&(st.getTransfer(W)===vt?(oe!==Un||ie!==vn)&&Oe("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ye("WebGLTextures: Unsupported texture color space:",W)),S}function Ke(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(c.width=A.naturalWidth||A.width,c.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(c.width=A.displayWidth,c.height=A.displayHeight):(c.width=A.width,c.height=A.height),c}this.allocateTextureUnit=Re,this.resetTextureUnits=K,this.getTextureUnits=Z,this.setTextureUnits=he,this.setTexture2D=ge,this.setTexture2DArray=de,this.setTexture3D=De,this.setTextureCube=ae,this.rebindTextures=ut,this.setupRenderTarget=xt,this.updateRenderTargetMipmap=O,this.updateMultisampleRenderTarget=lt,this.setupDepthRenderbuffer=ct,this.setupFrameBufferTexture=Ee,this.useMultisampledRTT=Me,this.dispose=z}function Bv(s,e){function t(n,i=wi){let r,o=st.getTransfer(i);if(n===vn)return s.UNSIGNED_BYTE;if(n===ll)return s.UNSIGNED_SHORT_4_4_4_4;if(n===cl)return s.UNSIGNED_SHORT_5_5_5_1;if(n===Ch)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===Ph)return s.UNSIGNED_INT_10F_11F_11F_REV;if(n===Ah)return s.BYTE;if(n===Rh)return s.SHORT;if(n===gr)return s.UNSIGNED_SHORT;if(n===al)return s.INT;if(n===Xn)return s.UNSIGNED_INT;if(n===Tn)return s.FLOAT;if(n===qn)return s.HALF_FLOAT;if(n===Ih)return s.ALPHA;if(n===Lh)return s.RGB;if(n===Un)return s.RGBA;if(n===gi)return s.DEPTH_COMPONENT;if(n===Ti)return s.DEPTH_STENCIL;if(n===hl)return s.RED;if(n===ul)return s.RED_INTEGER;if(n===qi)return s.RG;if(n===dl)return s.RG_INTEGER;if(n===fl)return s.RGBA_INTEGER;if(n===Eo||n===To||n===wo||n===Ao)if(o===vt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Eo)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===To)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===wo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ao)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Eo)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===To)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===wo)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ao)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===pl||n===ml||n===gl||n===xl)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===pl)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ml)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===gl)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===xl)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===_l||n===yl||n===vl||n===Ml||n===bl||n===Ro||n===Sl)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===_l||n===yl)return o===vt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===vl)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===Ml)return r.COMPRESSED_R11_EAC;if(n===bl)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Ro)return r.COMPRESSED_RG11_EAC;if(n===Sl)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===El||n===Tl||n===wl||n===Al||n===Rl||n===Cl||n===Pl||n===Il||n===Ll||n===Nl||n===Dl||n===Ul||n===Ol||n===Fl)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===El)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Tl)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===wl)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Al)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Rl)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Cl)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Pl)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Il)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ll)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Nl)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Dl)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ul)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Ol)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Fl)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Bl||n===Hl||n===kl)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Bl)return o===vt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Hl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===kl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===zl||n===Gl||n===Co||n===Vl)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===zl)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Gl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Co)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Vl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ss?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:t}}var Hv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,kv=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,au=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new no(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Qn({vertexShader:Hv,fragmentShader:kv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new k(new Lt(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},lu=class extends Wn{constructor(e,t){super();let n=this,i=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,p=null,y=typeof XRWebGLBinding<"u",g=new au,m={},b=t.getContextAttributes(),T=null,M=null,w=[],v=[],x=new ye,_=null,P=null,R=new Vt;R.viewport=new bt;let C=new Vt;C.viewport=new bt;let D=[R,C],q=new ja,I=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let ge=w[$];return ge===void 0&&(ge=new $s,w[$]=ge),ge.getTargetRaySpace()},this.getControllerGrip=function($){let ge=w[$];return ge===void 0&&(ge=new $s,w[$]=ge),ge.getGripSpace()},this.getHand=function($){let ge=w[$];return ge===void 0&&(ge=new $s,w[$]=ge),ge.getHandSpace()};function Y($){let ge=v.indexOf($.inputSource);if(ge===-1)return;let de=w[ge];de!==void 0&&(de.update($.inputSource,$.frame,c||o),de.dispatchEvent({type:$.type,data:$.inputSource}))}function V(){i.removeEventListener("select",Y),i.removeEventListener("selectstart",Y),i.removeEventListener("selectend",Y),i.removeEventListener("squeeze",Y),i.removeEventListener("squeezestart",Y),i.removeEventListener("squeezeend",Y),i.removeEventListener("end",V),i.removeEventListener("inputsourceschange",B);for(let $=0;$<w.length;$++){let ge=v[$];ge!==null&&(v[$]=null,w[$].disconnect(ge))}I=null,z=null,g.reset();for(let $ in m)delete m[$];if(e.setRenderTarget(T),f=null,d=null,u=null,i=null,M=null,Re.stop(),n.isPresenting=!1,e.setPixelRatio(_),e.setSize(x.width,x.height,!1),P!==null){let $=P.camera;$.fov=P.fov,$.zoom=P.zoom,$.updateProjectionMatrix(),P=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){r=$,n.isPresenting===!0&&Oe("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){a=$,n.isPresenting===!0&&Oe("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function($){c=$},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u===null&&y&&(u=new XRWebGLBinding(i,t)),u},this.getFrame=function(){return p},this.getSession=function(){return i},this.setSession=async function($){if(i=$,i!==null){if(T=e.getRenderTarget(),i.addEventListener("select",Y),i.addEventListener("selectstart",Y),i.addEventListener("selectend",Y),i.addEventListener("squeeze",Y),i.addEventListener("squeezestart",Y),i.addEventListener("squeezeend",Y),i.addEventListener("end",V),i.addEventListener("inputsourceschange",B),b.xrCompatible!==!0&&await t.makeXRCompatible(),_=e.getPixelRatio(),e.getSize(x),y&&"createProjectionLayer"in XRWebGLBinding.prototype){let de=null,De=null,ae=null;b.depth&&(ae=b.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,de=b.stencil?Ti:gi,De=b.stencil?Ss:Xn);let Fe={colorFormat:t.RGBA8,depthFormat:ae,scaleFactor:r};u=this.getBinding(),d=u.createProjectionLayer(Fe),i.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),M=new Sn(d.textureWidth,d.textureHeight,{format:Un,type:vn,depthTexture:new _i(d.textureWidth,d.textureHeight,De,void 0,void 0,void 0,void 0,void 0,void 0,de),stencilBuffer:b.stencil,colorSpace:e.outputColorSpace,samples:b.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let de={antialias:b.antialias,alpha:!0,depth:b.depth,stencil:b.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(i,t,de),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),M=new Sn(f.framebufferWidth,f.framebufferHeight,{format:Un,type:vn,colorSpace:e.outputColorSpace,stencilBuffer:b.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),Re.setContext(i),Re.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function B($){for(let ge=0;ge<$.removed.length;ge++){let de=$.removed[ge],De=v.indexOf(de);De>=0&&(v[De]=null,w[De].disconnect(de))}for(let ge=0;ge<$.added.length;ge++){let de=$.added[ge],De=v.indexOf(de);if(De===-1){for(let Fe=0;Fe<w.length;Fe++)if(Fe>=v.length){v.push(de),De=Fe;break}else if(v[Fe]===null){v[Fe]=de,De=Fe;break}if(De===-1)break}let ae=w[De];ae&&ae.connect(de)}}function F($,ge){ge===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(ge.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(i===null)return;let ge=$.near,de=$.far;g.texture!==null&&(g.depthNear>0&&(ge=g.depthNear),g.depthFar>0&&(de=g.depthFar)),q.near=C.near=R.near=ge,q.far=C.far=R.far=de,(I!==q.near||z!==q.far)&&(i.updateRenderState({depthNear:q.near,depthFar:q.far}),I=q.near,z=q.far),q.layers.mask=$.layers.mask|6,R.layers.mask=q.layers.mask&-5,C.layers.mask=q.layers.mask&-3;let De=$.parent,ae=q.cameras;F(q,De);for(let Fe=0;Fe<ae.length;Fe++)F(ae[Fe],De);q.projectionMatrix.copy(R.projectionMatrix),q.projectionMatrixInverse.copy(R.projectionMatrixInverse),P===null&&$.isPerspectiveCamera&&(P={camera:$,fov:$.fov,zoom:$.zoom}),K($,q,De)};function K($,ge,de){de===null?$.matrix.copy(ge.matrixWorld):($.matrix.copy(de.matrixWorld),$.matrix.invert(),$.matrix.multiply(ge.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(ge.projectionMatrix),$.projectionMatrixInverse.copy(ge.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=hs*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return q},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function($){l=$,d!==null&&(d.fixedFoveation=$),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=$)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(q)},this.getCameraTexture=function($){return m[$]};let Z=null;function he($,ge){if(h=ge.getViewerPose(c||o),p=ge,h!==null){let de=h.views;f!==null&&(e.setRenderTargetFramebuffer(M,f.framebuffer),e.setRenderTarget(M));let De=!1;de.length!==q.cameras.length&&(q.cameras.length=0,De=!0);for(let Ge=0;Ge<de.length;Ge++){let et=de[Ge],ke=null;if(f!==null)ke=f.getViewport(et);else{let fe=u.getViewSubImage(d,et);ke=fe.viewport,Ge===0&&(e.setRenderTargetTextures(M,fe.colorTexture,fe.depthStencilTexture),e.setRenderTarget(M))}let ne=D[Ge];ne===void 0&&(ne=new Vt,ne.layers.enable(Ge),ne.viewport=new bt,D[Ge]=ne),ne.matrix.fromArray(et.transform.matrix),ne.matrix.decompose(ne.position,ne.quaternion,ne.scale),ne.projectionMatrix.fromArray(et.projectionMatrix),ne.projectionMatrixInverse.copy(ne.projectionMatrix).invert(),ne.viewport.set(ke.x,ke.y,ke.width,ke.height),Ge===0&&(q.matrix.copy(ne.matrix),q.matrix.decompose(q.position,q.quaternion,q.scale)),De===!0&&q.cameras.push(ne)}let ae=i.enabledFeatures;if(ae&&ae.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&y){u=n.getBinding();let Ge=u.getDepthInformation(de[0]);Ge&&Ge.isValid&&Ge.texture&&g.init(Ge,i.renderState)}if(ae&&ae.includes("camera-access")&&y){e.state.unbindTexture(),u=n.getBinding();for(let Ge=0;Ge<de.length;Ge++){let et=de[Ge].camera;if(et){let ke=m[et];ke||(ke=new no,m[et]=ke);let ne=u.getCameraImage(et);ke.sourceTexture=ne}}}}for(let de=0;de<w.length;de++){let De=v[de],ae=w[de];De!==null&&ae!==void 0&&ae.update(De,ge,c||o)}Z&&Z($,ge),ge.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ge}),p=null}let Re=new cp;Re.setAnimationLoop(he),this.setAnimationLoop=function($){Z=$},this.dispose=function(){}}},zv=new We,yp=new Je;yp.set(-1,0,0,0,1,0,0,0,1);function Gv(s,e){function t(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function n(g,m){m.color.getRGB(g.fogColor.value,Wh(s)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function i(g,m,b,T,M){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?r(g,m):m.isMeshLambertMaterial?(r(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(r(g,m),u(g,m)):m.isMeshPhongMaterial?(r(g,m),h(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(r(g,m),d(g,m),m.isMeshPhysicalMaterial&&f(g,m,M)):m.isMeshMatcapMaterial?(r(g,m),p(g,m)):m.isMeshDepthMaterial?r(g,m):m.isMeshDistanceMaterial?(r(g,m),y(g,m)):m.isMeshNormalMaterial?r(g,m):m.isLineBasicMaterial?(o(g,m),m.isLineDashedMaterial&&a(g,m)):m.isPointsMaterial?l(g,m,b,T):m.isSpriteMaterial?c(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,t(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===gn&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,t(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===gn&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,t(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,t(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);let b=e.get(m),T=b.envMap,M=b.envMapRotation;T&&(g.envMap.value=T,g.envMapRotation.value.setFromMatrix4(zv.makeRotationFromEuler(M)).transpose(),T.isCubeTexture&&T.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(yp),g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,g.aoMapTransform))}function o(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform))}function a(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function l(g,m,b,T){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*b,g.scale.value=T*.5,m.map&&(g.map.value=m.map,t(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function c(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function h(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function u(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function d(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function f(g,m,b){g.ior.value=m.ior,m.diffuseRoughness>0&&(g.diffuseRoughness.value=m.diffuseRoughness,m.diffuseRoughnessMap&&(g.diffuseRoughnessMap.value=m.diffuseRoughnessMap,t(m.diffuseRoughnessMap,g.diffuseRoughnessMapTransform))),m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===gn&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.retroreflectivity>0&&(g.retroreflectivity.value=m.retroreflectivity),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessMinimum,g.iridescenceThicknessMaximum.value=m.iridescenceThicknessMaximum,m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=b.texture,g.transmissionSamplerSize.value.set(b.width,b.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,g.specularIntensityMapTransform))}function p(g,m){m.matcap&&(g.matcap.value=m.matcap)}function y(g,m){let b=e.get(m).light;g.referencePosition.value.setFromMatrixPosition(b.matrixWorld),g.nearDistance.value=b.shadow.camera.near,g.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function Vv(s,e,t,n){let i={},r={};function o(b,T){let M=T.program;n.uniformBlockBinding(b,M,i[b.id])}function a(b,T){let M=i[b.id];M===void 0&&(p(b),M=l(b),i[b.id]=M,b.addEventListener("dispose",g));let w=T.program;n.updateUBOMapping(b,w);let v=e.render.frame;r[b.id]!==v&&(c(b),r[b.id]=v)}function l(b){let T=s.createBuffer(),M=b.__size,w=b.usage;return s.bindBuffer(s.UNIFORM_BUFFER,T),s.bufferData(s.UNIFORM_BUFFER,M,w),s.bindBuffer(s.UNIFORM_BUFFER,null),T}function c(b){let T=i[b.id],M=b.uniforms,w=b.__cache;s.bindBuffer(s.UNIFORM_BUFFER,T);for(let v=0,x=M.length;v<x;v++){let _=M[v];if(Array.isArray(_))for(let P=0,R=_.length;P<R;P++)h(_[P],v,P,w);else h(_,v,0,w)}s.bindBuffer(s.UNIFORM_BUFFER,null)}function h(b,T,M,w){if(d(b,T,M,w)===!0){let v=b.__offset,x=b.value;if(Array.isArray(x)){let _=0;for(let P=0;P<x.length;P++){let R=x[P],C=y(R,!0);u(R,b.__data,_),_+=C.storage/Float32Array.BYTES_PER_ELEMENT}}else u(x,b.__data,0);s.bufferSubData(s.UNIFORM_BUFFER,v,b.__data)}}function u(b,T,M){typeof b=="number"||typeof b=="boolean"?T[M]=b:b.isMatrix3?(T[M]=b.elements[0],T[M+1]=b.elements[1],T[M+2]=b.elements[2],T[M+3]=0,T[M+4]=b.elements[3],T[M+5]=b.elements[4],T[M+6]=b.elements[5],T[M+7]=0,T[M+8]=b.elements[6],T[M+9]=b.elements[7],T[M+10]=b.elements[8],T[M+11]=0):ArrayBuffer.isView(b)?T.set(b.subarray(0,T.length-M),M):b.toArray(T,M)}function d(b,T,M,w){let v=b.value,x=T+"_"+M;if(Array.isArray(v)){w[x]===void 0&&(w[x]=[]);let _=w[x],P=!1;for(let R=0;R<v.length;R++)f(v[R],_,R)===!0&&(P=!0);return P}return f(v,w,x)}function f(b,T,M){if(T[M]===void 0)return typeof b=="number"||typeof b=="boolean"?T[M]=b:ArrayBuffer.isView(b)?T[M]=b.slice():T[M]=b.clone(),!0;{let w=T[M];if(typeof b=="number"||typeof b=="boolean"){if(w!==b)return T[M]=b,!0}else{if(ArrayBuffer.isView(b))return!0;if(w.equals(b)===!1)return w.copy(b),!0}}return!1}function p(b){let T=b.uniforms,M=0,w=16;for(let x=0,_=T.length;x<_;x++){let P=Array.isArray(T[x])?T[x]:[T[x]];for(let R=0,C=P.length;R<C;R++){let D=P[R],q=Array.isArray(D.value)?D.value:[D.value],I=Array.isArray(T[x])||Array.isArray(D.value),z=M;for(let V=0,B=q.length;V<B;V++){let F=q[V],K=y(F,I),Z=M%w,he=Z%K.boundary,Re=Z+he;M+=he,Re!==0&&w-Re<K.storage&&(M+=w-Re),V===0&&(z=M),M+=K.storage}let Y=D.type==="int"?Int32Array:D.type==="uint"?Uint32Array:Float32Array;D.__data=new Y((M-z)/Float32Array.BYTES_PER_ELEMENT),D.__offset=z}}let v=M%w;return v>0&&(M+=w-v),b.__size=M,b.__cache={},this}function y(b,T){let M={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(M.boundary=4,M.storage=4):b.isVector2?(M.boundary=8,M.storage=8):b.isVector3||b.isColor?(M.boundary=16,M.storage=12):b.isVector4?(M.boundary=16,M.storage=16):b.isMatrix3?(M.boundary=16,M.storage=48):b.isMatrix4?(M.boundary=16,M.storage=64):b.isTexture?Oe("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(b)?(M.boundary=16,M.storage=b.byteLength):Oe("WebGLRenderer: Unsupported uniform value type.",b),T===!0&&(M.boundary=16,M.storage=Math.ceil(M.storage/16)*16),M}function g(b){let T=b.target;T.removeEventListener("dispose",g),s.deleteBuffer(i[T.id]),delete i[T.id],delete r[T.id]}function m(){for(let b in i)s.deleteBuffer(i[b]);i={},r={}}return{bind:o,update:a,dispose:m}}var Wv=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),ii=null;function Xv(){return ii===null&&(ii=new tr(Wv,16,16,qi,qn),ii.name="DFG_LUT",ii.minFilter=Bt,ii.magFilter=Bt,ii.wrapS=Cn,ii.wrapT=Cn,ii.generateMipmaps=!1,ii.needsUpdate=!0),ii}var jl=class{constructor(e={}){let{canvas:t=Pf(),context:n=null,depth:i=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=vn}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=o;let y=f,g=new Set([fl,dl,ul]),m=new Set([vn,Xn,gr,Ss,ll,cl]),b=new Uint32Array(4),T=new Int32Array(4),M={textures:[],min:[],max:[],resolution:[]},w=null,v=null,x=[],_=[],P=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ni,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let R=this,C=!1,D=null,q=null,I=null,z=null;this._outputColorSpace=Pt;let Y=0,V=0,B=null,F=-1,K=null,Z=new bt,he=new bt,Re=null,$=new se(0),ge=0,de=t.width,De=t.height,ae=1,Fe=null,Et=null,Ge=new bt(0,0,de,De),et=new bt(0,0,de,De),ke=!1,ne=new Gi,fe=new Da,ce=!1,Ce=!1,Ee=new We,Qe=new N,Be=new bt,ct={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},ut=!1;function xt(){return B===null?ae:1}let O=n;function kt(E,U){return t.getContext(E,U)}let lt,Tt,Me,Dt,Ve,Ke,A,S,W,oe,ie,pe,be,Q,ee,xe,L,te,j,_e,ue,me,He;try{let E={alpha:!0,depth:i,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"187"}`),t.addEventListener("webglcontextlost",ze,!1),t.addEventListener("webglcontextrestored",tt,!1),t.addEventListener("webglcontextcreationerror",Te,!1),O===null){let U="webgl2";if(O=kt(U,E),O===null)throw kt(U)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}it()}catch(E){throw t.removeEventListener("webglcontextlost",ze,!1),t.removeEventListener("webglcontextrestored",tt,!1),t.removeEventListener("webglcontextcreationerror",Te,!1),Ye("WebGLRenderer: "+E.message),E}function it(){lt=new ny(O),lt.init(),ue=new Bv(O,lt),Tt=new X_(O,lt,e,ue),Me=new Ov(O,lt),Tt.reversedDepthBuffer&&d&&Me.buffers.depth.setReversed(!0),q=O.createFramebuffer(),I=O.createFramebuffer(),z=O.createFramebuffer(),Dt=new ry(O),Ve=new bv,Ke=new Fv(O,lt,Me,Ve,Tt,ue,Dt),A=new ty(R),S=new ag(O),me=new V_(O,S),W=new iy(O,S,Dt,me),oe=new ay(O,W,S,me,Dt),te=new oy(O,Tt,Ke),ee=new q_(Ve),ie=new Mv(R,A,lt,Tt,me,ee),pe=new Gv(R,Ve),be=new Ev,Q=new Pv(lt),L=new G_(R,A,Me,oe,p,l),xe=new Uv(R,oe,Tt),He=new Vv(O,Dt,Tt,Me),j=new W_(O,lt,Dt),_e=new sy(O,lt,Dt),Dt.programs=ie.programs,R.capabilities=Tt,R.extensions=lt,R.properties=Ve,R.renderLists=be,R.shadowMap=xe,R.state=Me,R.info=Dt}y!==vn&&(P=new cy(y,t.width,t.height,a,i,r));let le=new lu(R,O);this.xr=le,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){let E=lt.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){let E=lt.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return ae},this.setPixelRatio=function(E){E!==void 0&&(ae=E,this.setSize(de,De,!1))},this.getSize=function(E){return E.set(de,De)},this.setSize=function(E,U,J=!0){if(le.isPresenting){Oe("WebGLRenderer: Can't change size while VR device is presenting.");return}de=E,De=U,t.width=Math.floor(E*ae),t.height=Math.floor(U*ae),J===!0&&(t.style.width=E+"px",t.style.height=U+"px"),P!==null&&P.setSize(t.width,t.height),this.setViewport(0,0,E,U)},this.getDrawingBufferSize=function(E){return E.set(de*ae,De*ae).floor()},this.setDrawingBufferSize=function(E,U,J){de=E,De=U,ae=J,t.width=Math.floor(E*J),t.height=Math.floor(U*J),this.setViewport(0,0,E,U)},this.setEffects=function(E){if(y===vn){Ye("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(E){for(let U=0;U<E.length;U++)if(E[U].isOutputPass===!0){Oe("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}P.setEffects(E||[])},this.getCurrentViewport=function(E){return E.copy(Z)},this.getViewport=function(E){return E.copy(Ge)},this.setViewport=function(E,U,J,G){E.isVector4?Ge.set(E.x,E.y,E.z,E.w):Ge.set(E,U,J,G),Me.viewport(Z.copy(Ge).multiplyScalar(xt()).round())},this.getScissor=function(E){return E.copy(et)},this.setScissor=function(E,U,J,G){E.isVector4?et.set(E.x,E.y,E.z,E.w):et.set(E,U,J,G),Me.scissor(he.copy(et).multiplyScalar(xt()).round())},this.getScissorTest=function(){return ke},this.setScissorTest=function(E){Me.setScissorTest(ke=E)},this.setOpaqueSort=function(E){Fe=E},this.setTransparentSort=function(E){Et=E},this.getClearColor=function(E){return E.copy(L.getClearColor())},this.setClearColor=function(){L.setClearColor(...arguments)},this.getClearAlpha=function(){return L.getClearAlpha()},this.setClearAlpha=function(){L.setClearAlpha(...arguments)},this.clear=function(E=!0,U=!0,J=!0){let G=0;if(E){let X=!1;if(B!==null){let Se=B.texture.format;X=g.has(Se)}if(X){let Se=B.texture.type,Ie=m.has(Se),ve=L.getClearColor(),Pe=L.getClearAlpha(),Ue=ve.r,je=ve.g,dt=ve.b;Ie?(b[0]=Ue,b[1]=je,b[2]=dt,b[3]=Pe,O.clearBufferuiv(O.COLOR,0,b)):(T[0]=Ue,T[1]=je,T[2]=dt,T[3]=Pe,O.clearBufferiv(O.COLOR,0,T))}else G|=O.COLOR_BUFFER_BIT}U&&(G|=O.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),J&&(G|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),G!==0&&O.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(E){E.setRenderer(this),D=E},this.dispose=function(){t.removeEventListener("webglcontextlost",ze,!1),t.removeEventListener("webglcontextrestored",tt,!1),t.removeEventListener("webglcontextcreationerror",Te,!1),L.dispose(),be.dispose(),Q.dispose(),Ke.dispose(),Ve.dispose(),A.dispose(),oe.dispose(),W.dispose(),me.dispose(),He.dispose(),ie.dispose(),le.dispose(),le.removeEventListener("sessionstart",Yu),le.removeEventListener("sessionend",Ku),$i.stop()};function ze(E){E.preventDefault(),zr("WebGLRenderer: Context Lost."),C=!0}function tt(){zr("WebGLRenderer: Context Restored."),C=!1;let E=Dt.autoReset,U=xe.enabled,J=xe.autoUpdate,G=xe.needsUpdate,X=xe.type;it(),Dt.autoReset=E,xe.enabled=U,xe.autoUpdate=J,xe.needsUpdate=G,xe.type=X}function Te(E){Ye("WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function Mt(E){let U=E.target;U.removeEventListener("dispose",Mt),Yt(U)}function Yt(E){Ni(E),Ve.remove(E)}function Ni(E){let U=Ve.get(E).programs;U!==void 0&&(U.forEach(function(J){ie.releaseProgram(J)}),E.isShaderMaterial&&ie.releaseShaderCache(E))}this.renderBufferDirect=function(E,U,J,G,X,Se){U===null&&(U=ct);let Ie=X.isMesh&&X.matrixWorld.determinantAffine()<0,ve=wm(E,U,J,G,X);Me.setMaterial(G,Ie);let Pe=J.index,Ue=1;if(G.wireframe===!0){if(Pe=W.getWireframeAttribute(J),Pe===void 0)return;Ue=2}let je=J.drawRange,dt=J.attributes.position,Le=je.start*Ue,ft=(je.start+je.count)*Ue;Se!==null&&(Le=Math.max(Le,Se.start*Ue),ft=Math.min(ft,(Se.start+Se.count)*Ue)),Pe!==null?(Le=Math.max(Le,0),ft=Math.min(ft,Pe.count)):dt!=null&&(Le=Math.max(Le,0),ft=Math.min(ft,dt.count));let zt=ft-Le;if(zt<0||zt===1/0)return;me.setup(X,G,ve,J,Pe);let At,wt=j;if(Pe!==null&&(At=S.get(Pe),wt=_e,wt.setIndex(At)),X.isMesh)G.wireframe===!0?(Me.setLineWidth(G.wireframeLinewidth*xt()),wt.setMode(O.LINES)):wt.setMode(O.TRIANGLES);else if(X.isLine){let nn=G.linewidth;nn===void 0&&(nn=1),Me.setLineWidth(nn*xt()),X.isLineSegments?wt.setMode(O.LINES):X.isLineLoop?wt.setMode(O.LINE_LOOP):wt.setMode(O.LINE_STRIP)}else X.isPoints?wt.setMode(O.POINTS):X.isSprite&&wt.setMode(O.TRIANGLES);if(X.isBatchedMesh)if(lt.get("WEBGL_multi_draw"))wt.renderMultiDraw(X._multiDrawStarts,X._multiDrawCounts,X._multiDrawCount);else{let nn=X._multiDrawStarts,Ne=X._multiDrawCounts,hn=X._multiDrawCount,yt=Pe?S.get(Pe).bytesPerElement:1,ji=Ve.get(G).currentProgram.getUniforms();for(let sn=0;sn<hn;sn++)ji.setValue(O,"_gl_DrawID",sn),wt.render(nn[sn]/yt,Ne[sn])}else if(X.isInstancedMesh)wt.renderInstances(Le,zt,X.count);else if(J.isInstancedBufferGeometry){let nn=J._maxInstanceCount!==void 0?J._maxInstanceCount:1/0,Ne=Math.min(J.instanceCount,nn);wt.renderInstances(Le,zt,Ne)}else wt.render(Le,zt)};function qu(E,U,J,G){D!==null&&E.isNodeMaterial&&D.setObject(G,E),ce===!0&&ee.setState(E,J,!1),E.transparent===!0&&E.side===an&&E.forceSinglePass===!1?(E.side=gn,E.needsUpdate=!0,Er(E,U,G),E.side=Dn,E.needsUpdate=!0,Er(E,U,G),E.side=an):Er(E,U,G)}this.compile=function(E,U,J=null){J===null&&(J=E),D!==null&&D.renderStart(E,U,J),v=Q.get(J),v.init(U),_.push(v),J.traverseVisible(function(X){X.isLight&&X.layers.test(U.layers)&&(v.pushLight(X),X.castShadow&&v.pushShadow(X))}),E!==J&&E.traverseVisible(function(X){X.isLight&&X.layers.test(U.layers)&&(v.pushLight(X),X.castShadow&&v.pushShadow(X))}),v.setupLights(),D!==null&&D.updateLights(v.state.lightsArray),Ce=this.localClippingEnabled,ce=ee.init(this.clippingPlanes,Ce),ce===!0&&ee.setGlobalState(this.clippingPlanes,U),D!==null&&xe.render(v.state.shadowsArray,J,U);let G=new Set;return E.traverse(function(X){if(!(X.isMesh||X.isPoints||X.isLine||X.isSprite))return;let Se=X.material;if(Se)if(Array.isArray(Se))for(let Ie=0;Ie<Se.length;Ie++){let ve=Se[Ie];qu(ve,J,U,X),G.add(ve)}else qu(Se,J,U,X),G.add(Se)}),v=_.pop(),D!==null&&D.renderEnd(),G},this.compileAsync=function(E,U,J=null){let G=this.compile(E,U,J);return new Promise(X=>{function Se(){if(G.forEach(function(Ie){let Pe=Ve.get(Ie).currentProgram;(Pe===void 0||Pe.isReady())&&G.delete(Ie)}),G.size===0){X(E);return}setTimeout(Se,10)}lt.get("KHR_parallel_shader_compile")!==null?Se():setTimeout(Se,10)})};let Ac=null;function Em(E){Ac&&Ac(E)}function Yu(){$i.stop()}function Ku(){$i.start()}let $i=new cp;$i.setAnimationLoop(Em),typeof self<"u"&&$i.setContext(self),this.setAnimationLoop=function(E){Ac=E,le.setAnimationLoop(E),E===null?$i.stop():$i.start()},le.addEventListener("sessionstart",Yu),le.addEventListener("sessionend",Ku),this.render=function(E,U){if(U!==void 0&&U.isCamera!==!0){Ye("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;D!==null&&D.renderStart(E,U);let J=le.enabled===!0&&le.isPresenting===!0,G=P!==null&&(B===null||J)&&P.begin(R,B);if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),le.enabled===!0&&le.isPresenting===!0&&(P===null||P.isCompositing()===!1)&&(le.cameraAutoUpdate===!0&&le.updateCamera(U),U=le.getCamera()),E.isScene===!0&&E.onBeforeRender(R,E,U,B),v=Q.get(E,_.length),v.init(U),v.state.textureUnits=Ke.getTextureUnits(),_.push(v),Ee.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),U.isArrayCamera?fe.setFromArrayCamera(U):ne.setFromProjectionMatrix(Ee,Pn,U.reversedDepth),Ce=this.localClippingEnabled,ce=ee.init(this.clippingPlanes,Ce),w=be.get(E,x.length),w.init(),x.push(w),this.info.render.frame++,le.enabled===!0&&le.isPresenting===!0){let Ie=R.xr.getDepthSensingMesh();Ie!==null&&Rc(Ie,U,-1/0,R.sortObjects)}Rc(E,U,0,R.sortObjects),w.finish(),D!==null&&D.updateLights(v.state.lightsArray),R.sortObjects===!0&&w.sort(Fe,Et),ut=le.enabled===!1||le.isPresenting===!1||le.hasDepthSensing()===!1,ut&&L.addToRenderList(w,E),this.info.autoReset===!0&&this.info.reset(),ce===!0&&ee.beginShadows();let X=v.state.shadowsArray;if(xe.render(X,E,U),ce===!0&&ee.endShadows(),(G&&P.hasRenderPass())===!1){let Ie=w.opaque,ve=w.transmissive;if(v.setupLights(),U.isArrayCamera){let Pe=U.cameras;if(ve.length>0)for(let Ue=0,je=Pe.length;Ue<je;Ue++){let dt=Pe[Ue];Zu(Ie,ve,E,dt)}ut&&L.render(E);for(let Ue=0,je=Pe.length;Ue<je;Ue++){let dt=Pe[Ue];Ju(w,E,dt,dt.viewport)}}else ve.length>0&&Zu(Ie,ve,E,U),ut&&L.render(E),Ju(w,E,U)}B!==null&&V===0&&(Ke.updateMultisampleRenderTarget(B),Ke.updateRenderTargetMipmap(B)),G&&P.end(R),E.isScene===!0&&E.onAfterRender(R,E,U),me.resetDefaultState(),F=-1,K=null,_.pop(),_.length>0?(v=_[_.length-1],Ke.setTextureUnits(v.state.textureUnits),ce===!0&&ee.setGlobalState(R.clippingPlanes,v.state.camera)):v=null,x.pop(),x.length>0?w=x[x.length-1]:w=null,D!==null&&D.renderEnd()};function Rc(E,U,J,G){if(E.visible===!1)return;if(E.layers.test(U.layers)){if(E.isGroup)J=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(U);else if(E.isLight)v.pushLight(E),E.castShadow&&v.pushShadow(E);else if(E.isSprite){let Ie=U.isArrayCamera?fe:ne;if(!E.frustumCulled||E.intersectsFrustum(Ie)){G&&Be.setFromMatrixPosition(E.matrixWorld).applyMatrix4(Ee);let ve=oe.update(E),Pe=E.material;Pe.visible&&w.push(E,ve,Pe,J,Be.z,null,U)}}else if(E.isMesh||E.isLine||E.isPoints){let Ie=U.isArrayCamera?fe:ne;if(!E.frustumCulled||E.intersectsFrustum(Ie)){let ve=oe.update(E),Pe=E.material;if(G&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),Be.copy(E.boundingSphere.center)):(ve.boundingSphere===null&&ve.computeBoundingSphere(),Be.copy(ve.boundingSphere.center)),Be.applyMatrix4(E.matrixWorld).applyMatrix4(Ee)),Array.isArray(Pe)){let Ue=ve.groups;for(let je=0,dt=Ue.length;je<dt;je++){let Le=Ue[je],ft=Pe[Le.materialIndex];ft&&ft.visible&&w.push(E,ve,ft,J,Be.z,Le,U)}}else Pe.visible&&w.push(E,ve,Pe,J,Be.z,null,U)}}}let Se=E.children;for(let Ie=0,ve=Se.length;Ie<ve;Ie++)Rc(Se[Ie],U,J,G)}function Ju(E,U,J,G){let{opaque:X,transmissive:Se,transparent:Ie}=E;v.setupLightsView(J),ce===!0&&ee.setGlobalState(R.clippingPlanes,J),G&&Me.viewport(Z.copy(G)),X.length>0&&Yo(X,U,J),Se.length>0&&Yo(Se,U,J),Ie.length>0&&Yo(Ie,U,J),Me.buffers.depth.setTest(!0),Me.buffers.depth.setMask(!0),Me.buffers.color.setMask(!0),Me.setPolygonOffset(!1)}function Zu(E,U,J,G){if((J.isScene===!0?J.overrideMaterial:null)!==null)return;if(v.state.transmissionRenderTarget[G.id]===void 0){let Le=lt.has("EXT_color_buffer_half_float")||lt.has("EXT_color_buffer_float");v.state.transmissionRenderTarget[G.id]=new Sn(1,1,{generateMipmaps:!0,type:Le?qn:vn,minFilter:yn,samples:Math.max(4,Tt.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:st.workingColorSpace})}let Se=v.state.transmissionRenderTarget[G.id],Ie=G.viewport||Z;Se.setSize(Ie.z*R.transmissionResolutionScale,Ie.w*R.transmissionResolutionScale);let ve=R.getRenderTarget(),Pe=R.getActiveCubeFace(),Ue=R.getActiveMipmapLevel();R.setRenderTarget(Se),R.getClearColor($),ge=R.getClearAlpha(),ge<1&&R.setClearColor(16777215,.5),R.clear(),ut&&L.render(J);let je=R.toneMapping;R.toneMapping=ni;let dt=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),v.setupLightsView(G),ce===!0&&ee.setGlobalState(R.clippingPlanes,G),Yo(E,J,G),Ke.updateMultisampleRenderTarget(Se),Ke.updateRenderTargetMipmap(Se),lt.has("WEBGL_multisampled_render_to_texture")===!1){let Le=!1;for(let ft=0,zt=U.length;ft<zt;ft++){let At=U[ft],{object:wt,geometry:nn,material:Ne,group:hn}=At;if(Ne.side===an&&wt.layers.test(G.layers)){let yt=Ne.side;Ne.side=gn,Ne.needsUpdate=!0,$u(wt,J,G,nn,Ne,hn),Ne.side=yt,Ne.needsUpdate=!0,Le=!0}}Le===!0&&(Ke.updateMultisampleRenderTarget(Se),Ke.updateRenderTargetMipmap(Se))}R.setRenderTarget(ve,Pe,Ue),R.setClearColor($,ge),dt!==void 0&&(G.viewport=dt),R.toneMapping=je}function Yo(E,U,J){let G=U.isScene===!0?U.overrideMaterial:null;for(let X=0,Se=E.length;X<Se;X++){let Ie=E[X],{object:ve,geometry:Pe,group:Ue}=Ie,je=Ie.material;je.allowOverride===!0&&G!==null&&(je=G),ve.layers.test(J.layers)&&$u(ve,U,J,Pe,je,Ue)}}function $u(E,U,J,G,X,Se){D!==null&&X.isNodeMaterial&&D.setObject(E,X),E.onBeforeRender(R,U,J,G,X,Se),E.modelViewMatrix.multiplyMatrices(J.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),X.onBeforeRender(R,U,J,G,E,Se),X.transparent===!0&&X.side===an&&X.forceSinglePass===!1?(X.side=gn,X.needsUpdate=!0,R.renderBufferDirect(J,U,G,X,E,Se),X.side=Dn,X.needsUpdate=!0,R.renderBufferDirect(J,U,G,X,E,Se),X.side=an):R.renderBufferDirect(J,U,G,X,E,Se),E.onAfterRender(R,U,J,G,X,Se)}function ju(E){let U=0;for(let J of E)J.texture!==null&&U++;return U}function Er(E,U,J){U.isScene!==!0&&(U=ct);let G=Ve.get(E),X=v.state.lights,Se=v.state.shadowsArray,Ie=X.state.version,ve=ie.getParameters(E,X.state,Se,U,J,v.state.lightProbeGridArray),Pe=ie.getProgramCacheKey(ve),Ue=G.programs;G.environment=E.isMeshStandardMaterial||E.isMeshLambertMaterial||E.isMeshPhongMaterial?U.environment:null,G.fog=U.fog;let je=E.isMeshStandardMaterial||E.isMeshLambertMaterial&&!E.envMap||E.isMeshPhongMaterial&&!E.envMap;G.envMap=A.get(E.envMap||G.environment,je),G.envMapRotation=G.environment!==null&&E.envMap===null?U.environmentRotation:E.envMapRotation,Ue===void 0&&(E.addEventListener("dispose",Mt),Ue=new Map,G.programs=Ue,G.programVariants=new Map);let dt=Ue.get(Pe);if(dt!==void 0){if(G.currentProgram===dt&&G.lightsStateVersion===Ie)return ed(E,ve),dt}else ve.uniforms=ie.getUniforms(E),D!==null&&E.isNodeMaterial&&D.build(E,J,ve),E.onBeforeCompile(ve,R),dt=ie.acquireProgram(ve,Pe),Ue.set(Pe,dt),G.uniforms=ve.uniforms;let Le=G.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Le.clippingPlanes=ee.uniform),ed(E,ve),G.needsLights=Rm(E),G.lightsStateVersion=Ie,G.needsLights&&(Le.ambientLightColor.value=X.state.ambient,Le.lightProbe.value=X.state.probe,Le.sunLights.value=X.state.sun,Le.sunLightShadows.value=X.state.sunShadow,Le.directionalLights.value=X.state.directional,Le.directionalLightShadows.value=X.state.directionalShadow,Le.spotLights.value=X.state.spot,Le.spotLightShadows.value=X.state.spotShadow,Le.rectAreaLights.value=X.state.rectArea,Le.ltc_1.value=X.state.rectAreaLTC1,Le.ltc_2.value=X.state.rectAreaLTC2,Le.pointLights.value=X.state.point,Le.pointLightShadows.value=X.state.pointShadow,Le.hemisphereLights.value=X.state.hemi,Le.sunShadowMatrix.value=X.state.sunShadowMatrix,Le.sunShadowCascade.value=X.state.sunShadowCascade,Le.directionalShadowMatrix.value=X.state.directionalShadowMatrix,Le.spotLightMatrix.value=X.state.spotLightMatrix,Le.spotLightMap.value=X.state.spotLightMap,Le.pointShadowMatrix.value=X.state.pointShadowMatrix),G.numLightProbeGrids=ju(v.state.lightProbeGridArray),G.currentProgram=dt,G.uniformsList=null,dt}function Tm(E,U,J,G,X){let Se=Ve.get(E),Ie=Se.currentProgram.id+","+G+","+X,ve=Se.programVariants.get(Ie);return ve===void 0?(ve=Er(E,U,J),Se.programVariants.set(Ie,ve)):(Se.currentProgram=ve,Se.uniformsList=null,Se.outputColorSpace=G,Se.toneMapping=X),ve}function Qu(E){if(E.uniformsList===null){let U=E.currentProgram.getUniforms();E.uniformsList=_r.seqWithValue(U.seq,E.uniforms)}return E.uniformsList}function ed(E,U){let J=Ve.get(E);J.outputColorSpace=U.outputColorSpace,J.batching=U.batching,J.batchingColor=U.batchingColor,J.instancing=U.instancing,J.instancingColor=U.instancingColor,J.instancingMorph=U.instancingMorph,J.skinning=U.skinning,J.morphTargets=U.morphTargets,J.morphNormals=U.morphNormals,J.morphColors=U.morphColors,J.morphTargetsCount=U.morphTargetsCount,J.numClippingPlanes=U.numClippingPlanes,J.numIntersection=U.numClipIntersection,J.vertexAlphas=U.vertexAlphas,J.vertexTangents=U.vertexTangents,J.toneMapping=U.toneMapping}function wm(E,U,J,G,X){U.isScene!==!0&&(U=ct),Ke.resetTextureUnits();let Se=U.fog,Ie=G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial?U.environment:null,ve=B===null?R.outputColorSpace:B.isXRRenderTarget===!0?B.texture.colorSpace:st.workingColorSpace,Pe=G.isMeshStandardMaterial||G.isMeshLambertMaterial&&!G.envMap||G.isMeshPhongMaterial&&!G.envMap,Ue=A.get(G.envMap||Ie,Pe),je=G.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,dt=!!J.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),Le=!!J.morphAttributes.position,ft=!!J.morphAttributes.normal,zt=!!J.morphAttributes.color,At=ni;G.toneMapped&&(B===null||B.isXRRenderTarget===!0)&&(At=R.toneMapping);let wt=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,nn=wt!==void 0?wt.length:0,Ne=Ve.get(G),hn=v.state.lights;if(ce===!0&&(Ce===!0||E!==K)){let Ct=E===K&&G.id===F;ee.setState(G,E,Ct)}let yt=!1,ji=!1;G.version===Ne.__version?Ne.needsLights&&Ne.lightsStateVersion!==hn.state.version||X.isBatchedMesh&&Ne.batching===!1||!X.isBatchedMesh&&Ne.batching===!0||X.isBatchedMesh&&Ne.batchingColor===!0&&X._colorsTexture===null||X.isBatchedMesh&&Ne.batchingColor===!1&&X._colorsTexture!==null||X.isInstancedMesh&&Ne.instancing===!1||!X.isInstancedMesh&&Ne.instancing===!0||X.isSkinnedMesh&&Ne.skinning===!1||!X.isSkinnedMesh&&Ne.skinning===!0||X.isInstancedMesh&&Ne.instancingColor===!0&&X.instanceColor===null||X.isInstancedMesh&&Ne.instancingColor===!1&&X.instanceColor!==null||X.isInstancedMesh&&Ne.instancingMorph===!0&&X.morphTexture===null||X.isInstancedMesh&&Ne.instancingMorph===!1&&X.morphTexture!==null||Ne.envMap!==Ue||G.fog===!0&&Ne.fog!==Se||Ne.numClippingPlanes!==void 0&&(Ne.numClippingPlanes!==ee.numPlanes||Ne.numIntersection!==ee.numIntersection)||Ne.vertexAlphas!==je||Ne.vertexTangents!==dt||Ne.morphTargets!==Le||Ne.morphNormals!==ft||Ne.morphColors!==zt||Ne.morphTargetsCount!==nn||Ne.numLightProbeGrids!==ju(v.state.lightProbeGridArray)?yt=!0:(Ne.outputColorSpace!==ve||Ne.toneMapping!==At)&&(ji=!0):(yt=!0,Ne.__version=G.version);let sn=Ne.currentProgram;(yt===!0||ji===!0)&&(sn=ji===!0?Tm(G,U,X,ve,At):Er(G,U,X),D&&G.isNodeMaterial&&D.onUpdateProgram(G,sn,Ne));let Ko=!1,Di=!1,Qi=!1,mt=sn.getUniforms(),Qt=Ne.uniforms;if(Me.useProgram(sn.program)&&(Ko=!0,Di=!0,Qi=!0),G.id!==F&&(F=G.id,Di=!0),Ko||K!==E){Me.buffers.depth.getReversed()&&E.reversedDepth!==!0&&(E._reversedDepth=!0,E.updateProjectionMatrix()),mt.setValue(O,"projectionMatrix",E.projectionMatrix),mt.setValue(O,"viewMatrix",E.matrixWorldInverse);let Kt=mt.map.cameraPosition;Kt!==void 0&&Kt.setValue(O,Qe.setFromMatrixPosition(E.matrixWorld)),Tt.logarithmicDepthBuffer&&mt.setValue(O,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&mt.setValue(O,"isOrthographic",E.isOrthographicCamera===!0),K!==E&&(K=E,Di=!0,Qi=!0)}if(Ne.needsLights&&(hn.state.sunShadowMap.length>0&&mt.setValue(O,"sunShadowMap",hn.state.sunShadowMap,Ke),hn.state.directionalShadowMap.length>0&&mt.setValue(O,"directionalShadowMap",hn.state.directionalShadowMap,Ke),hn.state.spotShadowMap.length>0&&mt.setValue(O,"spotShadowMap",hn.state.spotShadowMap,Ke),hn.state.pointShadowMap.length>0&&mt.setValue(O,"pointShadowMap",hn.state.pointShadowMap,Ke)),X.isSkinnedMesh){mt.setOptional(O,X,"bindMatrix"),mt.setOptional(O,X,"bindMatrixInverse");let Ct=X.skeleton;Ct&&(Ct.boneTexture===null&&Ct.computeBoneTexture(),mt.setValue(O,"boneTexture",Ct.boneTexture,Ke))}X.isBatchedMesh&&(mt.setOptional(O,X,"batchingTexture"),mt.setValue(O,"batchingTexture",X._matricesTexture,Ke),mt.setOptional(O,X,"batchingIdTexture"),mt.setValue(O,"batchingIdTexture",X._indirectTexture,Ke),mt.setOptional(O,X,"batchingColorTexture"),X._colorsTexture!==null&&mt.setValue(O,"batchingColorTexture",X._colorsTexture,Ke));let Hn=J.morphAttributes;if((Hn.position!==void 0||Hn.normal!==void 0||Hn.color!==void 0)&&te.update(X,J,sn),(Di||Ne.receiveShadow!==X.receiveShadow)&&(Ne.receiveShadow=X.receiveShadow,mt.setValue(O,"receiveShadow",X.receiveShadow)),(G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial)&&G.envMap===null&&U.environment!==null&&(Qt.envMapIntensity.value=U.environmentIntensity),Qt.dfgLUT!==void 0&&(Qt.dfgLUT.value=Xv()),Di){if(mt.setValue(O,"toneMappingExposure",R.toneMappingExposure),Ne.needsLights&&Am(Qt,Qi),Se&&G.fog===!0&&pe.refreshFogUniforms(Qt,Se),pe.refreshMaterialUniforms(Qt,G,ae,De,v.state.transmissionRenderTarget[E.id]),Ne.needsLights&&Ne.numLightProbeGrids>0){let Ct=M,Kt=0;for(let li of v.state.lightProbeGridArray)li.texture!==null&&(Ct.textures[Kt]=li.texture,Ct.min[Kt]=li.boundingBox.min,Ct.max[Kt]=li.boundingBox.max,Ct.resolution[Kt]=li.resolution,Kt++);for(let li in Ct)Ct[li].length=Kt;Qt.probesSH.value=Ct.textures,Qt.probesMin.value=Ct.min,Qt.probesMax.value=Ct.max,Qt.probesResolution.value=Ct.resolution}_r.upload(O,Qu(Ne),Qt,Ke)}if(G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(_r.upload(O,Qu(Ne),Qt,Ke),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&mt.setValue(O,"center",X.center),mt.setValue(O,"modelViewMatrix",X.modelViewMatrix),mt.setValue(O,"normalMatrix",X.normalMatrix),mt.setValue(O,"modelMatrix",X.matrixWorld),G.uniformsGroups!==void 0){let Ct=G.uniformsGroups;for(let Kt=0,li=Ct.length;Kt<li;Kt++){let nd=Ct[Kt];He.update(nd,sn),He.bind(nd,sn)}}return sn}function Am(E,U){E.ambientLightColor.needsUpdate=U,E.lightProbe.needsUpdate=U,E.sunLights.needsUpdate=U,E.sunLightShadows.needsUpdate=U,E.directionalLights.needsUpdate=U,E.directionalLightShadows.needsUpdate=U,E.pointLights.needsUpdate=U,E.pointLightShadows.needsUpdate=U,E.spotLights.needsUpdate=U,E.spotLightShadows.needsUpdate=U,E.rectAreaLights.needsUpdate=U,E.hemisphereLights.needsUpdate=U}function Rm(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return Y},this.getActiveMipmapLevel=function(){return V},this.getRenderTarget=function(){return B},this.setRenderTargetTextures=function(E,U,J){let G=Ve.get(E);G.__autoAllocateDepthBuffer=E.resolveDepthBuffer===!1,G.__autoAllocateDepthBuffer===!1&&(G.__useRenderToTexture=!1),Ve.get(E.texture).__webglTexture=U,Ve.get(E.depthTexture).__webglTexture=G.__autoAllocateDepthBuffer?void 0:J,G.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(E,U){let J=Ve.get(E);J.__webglFramebuffer=U,J.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(E,U=0,J=0){B=E,Y=U,V=J;let G=null,X=!1,Se=!1;if(E){let ve=Ve.get(E);if(ve.__useDefaultFramebuffer!==void 0){Me.bindFramebuffer(O.FRAMEBUFFER,ve.__webglFramebuffer),Z.copy(E.viewport),he.copy(E.scissor),Re=E.scissorTest,Me.viewport(Z),Me.scissor(he),Me.setScissorTest(Re),F=-1;return}else if(ve.__webglFramebuffer===void 0)Ke.setupRenderTarget(E);else if(ve.__hasExternalTextures)Ke.rebindTextures(E,Ve.get(E.texture).__webglTexture,Ve.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){let je=E.depthTexture;if(ve.__boundDepthTexture!==je){if(je!==null&&Ve.has(je)&&(E.width!==je.image.width||E.height!==je.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Ke.setupDepthRenderbuffer(E)}}let Pe=E.texture;(Pe.isData3DTexture||Pe.isDataArrayTexture||Pe.isCompressedArrayTexture)&&(Se=!0);let Ue=Ve.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(Ue[U])?G=Ue[U][J]:G=Ue[U],X=!0):E.samples>0&&Ke.useMultisampledRTT(E)===!1?G=Ve.get(E).__webglMultisampledFramebuffer:Array.isArray(Ue)?G=Ue[J]:G=Ue,Z.copy(E.viewport),he.copy(E.scissor),Re=E.scissorTest}else Z.copy(Ge).multiplyScalar(ae).floor(),he.copy(et).multiplyScalar(ae).floor(),Re=ke;if(J!==0&&(G=q),Me.bindFramebuffer(O.FRAMEBUFFER,G)&&Me.drawBuffers(E,G),Me.viewport(Z),Me.scissor(he),Me.setScissorTest(Re),X){let ve=Ve.get(E.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+U,ve.__webglTexture,J)}else if(Se){let ve=U;for(let Pe=0;Pe<E.textures.length;Pe++){let Ue=Ve.get(E.textures[Pe]);O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0+Pe,Ue.__webglTexture,J,ve)}}else if(E!==null&&J!==0){let ve=Ve.get(E.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,ve.__webglTexture,J)}F=-1};function td(E){let U=Ve.get(E);return(U.__readFormat!==E.format||U.__readType!==E.type)&&(U.__readFormat=E.format,U.__readType=E.type,U.__formatReadable=Tt.textureFormatReadable(E.format),U.__typeReadable=Tt.textureTypeReadable(E.type)),U}this.readRenderTargetPixels=function(E,U,J,G,X,Se,Ie,ve=0){if(!(E&&E.isWebGLRenderTarget)){Ye("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Pe=Ve.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Ie!==void 0&&(Pe=Pe[Ie],Array.isArray(Pe)&&(Pe=Pe[0])),Pe){Me.bindFramebuffer(O.FRAMEBUFFER,Pe);try{let Ue=E.textures[ve],je=Ue.format,dt=Ue.type;E.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+ve);let Le=td(Ue);if(Le.__formatReadable===!1){Ye("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Le.__typeReadable===!1){Ye("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=E.width-G&&J>=0&&J<=E.height-X&&O.readPixels(U,J,G,X,ue.convert(je),ue.convert(dt),Se)}finally{let Ue=B!==null?Ve.get(B).__webglFramebuffer:null;Me.bindFramebuffer(O.FRAMEBUFFER,Ue)}}},this.readRenderTargetPixelsAsync=async function(E,U,J,G,X,Se,Ie,ve=0){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Pe=Ve.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Ie!==void 0&&(Pe=Pe[Ie],Array.isArray(Pe)&&(Pe=Pe[0])),Pe)if(U>=0&&U<=E.width-G&&J>=0&&J<=E.height-X){Me.bindFramebuffer(O.FRAMEBUFFER,Pe);let Ue=E.textures[ve],je=Ue.format,dt=Ue.type;E.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+ve);let Le=td(Ue);if(Le.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Le.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let ft=O.createBuffer();O.bindBuffer(O.PIXEL_PACK_BUFFER,ft),O.bufferData(O.PIXEL_PACK_BUFFER,Se.byteLength,O.STREAM_READ),O.readPixels(U,J,G,X,ue.convert(je),ue.convert(dt),0),O.bindBuffer(O.PIXEL_PACK_BUFFER,null);let zt=B!==null?Ve.get(B).__webglFramebuffer:null;Me.bindFramebuffer(O.FRAMEBUFFER,zt);let At=O.fenceSync(O.SYNC_GPU_COMMANDS_COMPLETE,0);return O.flush(),await Lf(O,At,4),O.bindBuffer(O.PIXEL_PACK_BUFFER,ft),O.getBufferSubData(O.PIXEL_PACK_BUFFER,0,Se),O.bindBuffer(O.PIXEL_PACK_BUFFER,null),O.deleteBuffer(ft),O.deleteSync(At),Se}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(E,U=null,J=0){let G=Math.pow(2,-J),X=Math.floor(E.image.width*G),Se=Math.floor(E.image.height*G),Ie=U!==null?U.x:0,ve=U!==null?U.y:0;Ke.setTexture2D(E,0),O.copyTexSubImage2D(O.TEXTURE_2D,J,0,0,Ie,ve,X,Se),Me.unbindTexture()},this.copyTextureToTexture=function(E,U,J=null,G=null,X=0,Se=0){let Ie,ve,Pe,Ue,je,dt,Le,ft,zt,At=E.isCompressedTexture?E.mipmaps[Se]:E.image;if(J!==null)Ie=J.max.x-J.min.x,ve=J.max.y-J.min.y,Pe=J.isBox3?J.max.z-J.min.z:1,Ue=J.min.x,je=J.min.y,dt=J.isBox3?J.min.z:0;else{let mt=Math.pow(2,-X);Ie=Math.floor(At.width*mt),ve=Math.floor(At.height*mt),E.isDataArrayTexture?Pe=At.depth:E.isData3DTexture?Pe=Math.floor(At.depth*mt):Pe=1,Ue=0,je=0,dt=0}G!==null?(Le=G.x,ft=G.y,zt=G.z):(Le=0,ft=0,zt=0);let wt=ue.convert(U.format),nn=ue.convert(U.type),Ne;U.isData3DTexture?(Ke.setTexture3D(U,0),Ne=O.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(Ke.setTexture2DArray(U,0),Ne=O.TEXTURE_2D_ARRAY):(Ke.setTexture2D(U,0),Ne=O.TEXTURE_2D),Me.activeTexture(O.TEXTURE0),Me.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,U.flipY),Me.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),Me.pixelStorei(O.UNPACK_ALIGNMENT,U.unpackAlignment);let hn=Me.getParameter(O.UNPACK_ROW_LENGTH),yt=Me.getParameter(O.UNPACK_IMAGE_HEIGHT),ji=Me.getParameter(O.UNPACK_SKIP_PIXELS),sn=Me.getParameter(O.UNPACK_SKIP_ROWS),Ko=Me.getParameter(O.UNPACK_SKIP_IMAGES);Me.pixelStorei(O.UNPACK_ROW_LENGTH,At.width),Me.pixelStorei(O.UNPACK_IMAGE_HEIGHT,At.height),Me.pixelStorei(O.UNPACK_SKIP_PIXELS,Ue),Me.pixelStorei(O.UNPACK_SKIP_ROWS,je),Me.pixelStorei(O.UNPACK_SKIP_IMAGES,dt);let Di=E.isDataArrayTexture||E.isData3DTexture,Qi=U.isDataArrayTexture||U.isData3DTexture;if(E.isDepthTexture){let mt=Ve.get(E),Qt=Ve.get(U),Hn=Ve.get(mt.__renderTarget),Ct=Ve.get(Qt.__renderTarget);Me.bindFramebuffer(O.READ_FRAMEBUFFER,Hn.__webglFramebuffer),Me.bindFramebuffer(O.DRAW_FRAMEBUFFER,Ct.__webglFramebuffer);for(let Kt=0;Kt<Pe;Kt++)Di&&(O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Ve.get(E).__webglTexture,X,dt+Kt),O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Ve.get(U).__webglTexture,Se,zt+Kt)),O.blitFramebuffer(Ue,je,Ue+Ie,je+ve,Le,ft,Le+Ie,ft+ve,O.DEPTH_BUFFER_BIT,O.NEAREST);Me.bindFramebuffer(O.READ_FRAMEBUFFER,null),Me.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else if(X!==0||E.isRenderTargetTexture||Ve.has(E)){let mt=Ve.get(E),Qt=Ve.get(U);Me.bindFramebuffer(O.READ_FRAMEBUFFER,I),Me.bindFramebuffer(O.DRAW_FRAMEBUFFER,z);for(let Hn=0;Hn<Pe;Hn++)Di?O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,mt.__webglTexture,X,dt+Hn):O.framebufferTexture2D(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,mt.__webglTexture,X),Qi?O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Qt.__webglTexture,Se,zt+Hn):O.framebufferTexture2D(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,Qt.__webglTexture,Se),X!==0?O.blitFramebuffer(Ue,je,Ue+Ie,je+ve,Le,ft,Le+Ie,ft+ve,O.COLOR_BUFFER_BIT,O.NEAREST):Qi?O.copyTexSubImage3D(Ne,Se,Le,ft,zt+Hn,Ue,je,Ie,ve):O.copyTexSubImage2D(Ne,Se,Le,ft,Ue,je,Ie,ve);Me.bindFramebuffer(O.READ_FRAMEBUFFER,null),Me.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else Qi?E.isDataTexture||E.isData3DTexture?O.texSubImage3D(Ne,Se,Le,ft,zt,Ie,ve,Pe,wt,nn,At.data):U.isCompressedArrayTexture?O.compressedTexSubImage3D(Ne,Se,Le,ft,zt,Ie,ve,Pe,wt,At.data):O.texSubImage3D(Ne,Se,Le,ft,zt,Ie,ve,Pe,wt,nn,At):E.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,Se,Le,ft,Ie,ve,wt,nn,At.data):E.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,Se,Le,ft,At.width,At.height,wt,At.data):O.texSubImage2D(O.TEXTURE_2D,Se,Le,ft,Ie,ve,wt,nn,At);Me.pixelStorei(O.UNPACK_ROW_LENGTH,hn),Me.pixelStorei(O.UNPACK_IMAGE_HEIGHT,yt),Me.pixelStorei(O.UNPACK_SKIP_PIXELS,ji),Me.pixelStorei(O.UNPACK_SKIP_ROWS,sn),Me.pixelStorei(O.UNPACK_SKIP_IMAGES,Ko),Se===0&&U.generateMipmaps===!0&&U.mipmapsAutoUpdate===!0&&O.generateMipmap(Ne),Me.unbindTexture()},this.initRenderTarget=function(E){Ve.get(E).__webglFramebuffer===void 0&&Ke.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?Ke.setTextureCube(E,0):E.isData3DTexture?Ke.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?Ke.setTexture2DArray(E,0):Ke.setTexture2D(E,0),Me.unbindTexture()},this.resetState=function(){Y=0,V=0,B=null,Me.reset(),me.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Pn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=st._getDrawingBufferColorSpace(e),t.unpackColorSpace=st._getUnpackColorSpace()}};var Ht=s=>(s-1)*2.5,ot={halfW:.32,halfD:.3,height:1.7,slideHeight:.8,laneTime:.15,jumpHeight:1.75,jumpApexTime:.34,superJumpHeight:3.9,fastFallSpeed:26,slideTime:.62,coyote:.11,buffer:.16,stepUp:.45,grazeX:.85,feetTol:.12,headTol:.12,stumbleWindow:4.5},Ts=2*ot.jumpHeight/(ot.jumpApexTime*ot.jumpApexTime),tc=Ts*ot.jumpApexTime,nc=Math.sqrt(2*Ts*ot.superJumpHeight),vr={start:12,max:34,ramp:2800},Kn=s=>vr.start+(vr.max-vr.start)*(1-Math.exp(-Math.max(0,s)/vr.ramp)),vp=s=>Math.min(1,Math.max(0,s)/4500),$t={low:{halfW:1.05,depth:.7,yb:0,yt:.95,walk:!0},hurdle:{halfW:1.1,depth:.35,yb:.95,yt:1.25,walk:!1},overhead:{halfW:1.15,depth:.35,yb:1.1,yt:2.65,walk:!1},train:{halfW:1.15,depth:6.74,yb:0,yt:3.4,walk:!0},ramp:{halfW:1.15,depth:7,yb:0,yt:3.4,walk:!0},mtrain:{halfW:1.15,depth:6.74,yb:0,yt:3.4,walk:!1}},wn={ratio:.65,trigger:75},Mp=(s,e)=>s+wn.ratio*Math.min(wn.trigger,s-e),bp=s=>s/(1+wn.ratio),Oo=6.74,ic=.3,Jn=s=>s*Oo+(s-1)*ic,sc={magnet:10,shoes:10,double:12,star:14,jet:12},cu=16,jt=280,Sp=8.5;var Ri=class{constructor(e){H(this,"s");this.s=e>>>0||1}next(){let e=this.s+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}range(e,t){return e+(t-e)*this.next()}int(e,t){return e+Math.floor(this.next()*(t-e+1))}pick(e){return e[Math.floor(this.next()*e.length)]}chance(e){return this.next()<e}weighted(e){let t=0;for(let i in e)t+=Math.max(0,e[i]);let n=this.next()*t;for(let i in e)if(n-=Math.max(0,e[i]),n<=0)return i;return Object.keys(e)[0]}};var ri=.5;function Mr(s,e,t,n,i,r=!1,o=1){let a=typeof i=="number"?()=>i:i,l=Math.max(2,Math.ceil((t-e)/ri)+1),c=3,h=new Uint8Array(l*c),u=new Float32Array(l*c).fill(-1),d=new Uint8Array(l*c);for(let _ of s){if(_.kind!=="train"&&_.kind!=="ramp"&&_.kind!=="mtrain")continue;let P=Math.max(0,Math.floor((_.d0-e)/ri)),R=Math.min(l-1,Math.ceil((_.d1-e)/ri));for(let C=P;C<=R;C++){let D=e+C*ri;_.kind==="mtrain"?D>=_.d0-ot.halfD&&D<=_.d1+ot.halfD&&(h[C*c+_.lane]=1):_.kind==="train"?(D>=_.d0-ot.halfD&&D<=_.d1+ot.halfD&&(h[C*c+_.lane]=1),D>=_.d0&&D<=_.d1&&(d[C*c+_.lane]=1)):D>=_.d0&&D<=_.d1&&(u[C*c+_.lane]=D-_.d0)}}let f=l*c*2,p=new Uint8Array(f),y=r?new Int32Array(f).fill(-1):null,g=r?new Int32Array(f).fill(1<<30):null,m=(_,P,R)=>(_*c+P)*2+R,b=(_,P,R,C)=>{if(_>=l)return;let D=m(_,P,R);if(y&&g){let q=C<0?0:g[C]+(Math.floor(C/2)%c!==P?1:0);q<g[D]&&(g[D]=q,y[D]=C)}p[D]=1},T=(_,P)=>!h[_*c+P]&&!(u[_*c+P]>1);for(let _ of n)T(0,_)&&b(0,_,0,-1);for(let _=0;_<l-1;_++){let P=a(e+_*ri),R=Math.ceil((P*ot.laneTime*1.3+.8)/ri),C=Math.ceil((P*Math.sqrt(2*$t.train.yt/30)+1)/ri);for(let D=0;D<c;D++)for(let q=0;q<2;q++){let I=m(_,D,q);if(!p[I])continue;let z=_+1;q===0?u[z*c+D]>=0?b(z,D,1,I):h[z*c+D]||b(z,D,0,I):d[z*c+D]||h[z*c+D]||u[z*c+D]>=0?b(z,D,1,I):h[z*c+D]||b(z,D,0,I);for(let Y of[D-1,D+1])if(!(Y<0||Y>=c)){if(q===0){let V=!0;for(let B=_;B<=Math.min(l-1,_+R);B++){if(!T(B,Y)){V=!1;break}if(B<=_+R/2&&h[B*c+D]){V=!1;break}}V&&b(_+R,Y,0,I)}else if(u[_*c+D]<0){let V=!0;for(let B=_;B<=Math.min(l-1,_+R);B++)if(!d[B*c+Y]||!d[B*c+D]){V=!1;break}V&&b(_+R,Y,1,I),V=!0;for(let B=_;B<=Math.min(l-1,_+C);B++)if(d[B*c+Y]||h[B*c+Y]||u[B*c+Y]>=0){V=!1;break}V&&b(_+C,Y,0,I)}}}}let M=[];for(let _=0;_<c;_++)(p[m(l-1,_,0)]||p[m(l-1,_,1)])&&M.push(_);let w=M.length>0,v=l-1;if(!w){v=0;for(let _=l-1;_>=0&&!v;_--)for(let P=0;P<c*2;P++)if(p[_*c*2+P]){v=_;break}}let x=null;if(w&&y&&r){let _=M.includes(o)?o:M[0];if(g)for(let C of M)Math.min(g[m(l-1,C,0)],g[m(l-1,C,1)])<Math.min(g[m(l-1,_,0)],g[m(l-1,_,1)])&&(_=C);let P=p[m(l-1,_,0)]&&(!g||g[m(l-1,_,0)]<=g[m(l-1,_,1)])?m(l-1,_,0):m(l-1,_,1),R=[];for(;P>=0;)R.push({i:Math.floor(P/2/c),lane:Math.floor(P/2)%c,top:P%2===1}),P=y[P];R.reverse(),x=new Array(l),x[0]={lane:R[0].lane,top:R[0].top};for(let C=1;C<R.length;C++){let D=R[C-1],q=R[C];for(let I=D.i+1;I<=q.i&&I<l;I++)x[I]=I<(D.i+q.i)/2?{lane:D.lane,top:D.top}:{lane:q.lane,top:q.top}}for(let C=1;C<l;C++)x[C]||(x[C]=x[C-1])}return{ok:w,endLanes:M,path:x,failAt:e+v*ri}}var rc=class{constructor(e,t){H(this,"sink",t);H(this,"rng");H(this,"frontier",0);H(this,"reach",[0,1,2]);H(this,"busy",[0,0,0]);H(this,"nextPower",260);H(this,"chunks",0);H(this,"failures",0);H(this,"lastPreferLane",1);this.rng=new Ri(e)}reset(e,t){this.rng=new Ri(e),this.frontier=0,this.reach=[0,1,2],this.busy=[0,0,0],this.nextPower=t?420:260,this.chunks=0,this.failures=0;let n=this.rng.int(0,2),i=this.rng.range(22,38);this.layCoins(12,i,null,n),this.frontier=i+this.rng.range(6,16),t&&this.tutorialChunk()}ensure(e){let t=0;for(;this.frontier<e&&t++<20;)this.genChunk()}tutorialChunk(){let e=this.frontier,t=[{kind:"low",lane:1,d0:e+20,d1:e+20+$t.low.depth,hint:"jump"},{kind:"overhead",lane:1,d0:e+60,d1:e+60+$t.overhead.depth,hint:"slide"},{kind:"train",lane:1,d0:e+100,d1:e+100+Jn(2),cars:2,hint:"lane"},{kind:"ramp",lane:0,d0:e+150,d1:e+157,hint:"ramp"},{kind:"train",lane:0,d0:e+157,d1:e+157+Jn(3),cars:3}],n=e+200,i=Mr(t,e,n,[1],Kn(e),!0,0);for(let r of t)this.sink.ob(r);i.path&&this.coinsAlong(i.path,t,e,n,1),this.busy=[e+157+Jn(3)+12,e+120,e+120],this.reach=i.endLanes.length?i.endLanes:[0,1,2],this.frontier=n}genChunk(){let e=this.frontier,t=vp(e),n=Kn(e),i=e+this.rng.range(90,130),r=[],o=null,a=this.busy.slice(),l=this.rng.int(0,2);for(let c=0;c<40;c++){let h=this.busy.slice();if(r=this.buildRows(e,i,t,n,c>18,h),o=Mr(r,e,i,this.reach,Kn,!0,l),o.ok){a=h;break}}(!o||!o.ok)&&(this.failures++,r=[],o=Mr(r,e,i,[0,1,2],Kn,!0,l),a=this.busy.slice());for(let c of r)this.sink.ob(c);o.path&&this.coinsAlong(o.path,r,e,i,t),o.path&&this.nextPower<i&&this.nextPower>=e?this.placePower(o.path,r,e,i):this.nextPower<e&&(this.nextPower=e+200),this.busy=a,this.reach=o.endLanes,this.frontier=i,this.chunks++}buildRows(e,t,n,i,r,o){let a=this.rng,l=[],c=i*(1.3-.5*n)+1.5,h=e+c*a.range(.45,.85),u=(g,m)=>o[g]<=m,d=(g,m)=>{let b=a.weighted({low:.4,hurdle:.3,overhead:n<.02?.05:.3});l.push({kind:b,lane:g,d0:m,d1:m+$t[b].depth}),o[g]=m+i*.78},f=(g,m,b,T)=>{let M=a.int(1,T),w=m;b&&(l.push({kind:"ramp",lane:g,d0:m,d1:m+$t.ramp.depth}),w=m+$t.ramp.depth);let v=w+Jn(M);return v>t-6?!1:(l.push({kind:"train",lane:g,d0:w,d1:v,cars:M,variant:a.int(0,3)}),o[g]=v+i*.8,!0)},p=(g,m,b)=>{if(o[g]>m-10)return!1;let T=a.int(1,Math.min(3,b)),M=Jn(T);return l.push({kind:"mtrain",lane:g,d0:m,d1:m+M/(1+wn.ratio),cars:T,variant:a.int(0,3)}),o[g]=m+wn.ratio*wn.trigger+M+4,!0},y=[0,1,2];for(;h<t-12;){let g=n,m=(a.next()-.5)*.08,b=r?{none:.22,b1:.28,b2:0,b3:0,t1:.5,t2:0,t3:0,tb:0,mt:0}:{none:Math.max(.04,.08+m),b1:Math.max(.08,.26-.18*g+m),b2:Math.max(.05,.12+.15*g-m),b3:Math.max(0,g-.25)*.35,t1:Math.max(.18,.34+m),t2:Math.max(.12,.22+.25*g),t3:Math.max(0,g-.35)*.45,tb:Math.max(0,g-.2)*.45,mt:g<.06?.14:.24+.28*g},T=a.weighted(b),M=y.slice().sort(()=>a.next()-.5),w=1+Math.round(g*2.4),v=.25+.35*g;switch(T){case"b1":{let x=M.find(_=>u(_,h));x!==void 0&&d(x,h);break}case"b2":case"b3":{let x=T==="b2"?2:3;for(let _ of M.slice(0,x))u(_,h)&&d(_,h);break}case"mt":{let x=M.find(_=>u(_,h-10));if(x!==void 0){p(x,h,w);let _=M.find(P=>P!==x&&u(P,h));_!==void 0&&a.chance(.5*g)&&d(_,h+a.range(9,14))}break}case"t1":{let x=M.find(_=>u(_,h));x!==void 0&&f(x,h,a.chance(v),w);break}case"t2":case"tb":case"t3":{let x=T==="t3"?3:T==="t2"?2:1,_=a.int(0,x-1);M.forEach((P,R)=>{if(!u(P,h))return;let C=h+a.range(0,6);R<x?f(P,C,R===_?a.chance(v+.3):a.chance(v*.4),w):T==="tb"&&d(P,h+a.range(0,4))});break}}h+=c*(a.chance(.15)?1.9:a.range(1,1.35))}return l}coinsAlong(e,t,n,i,r){let o=this.rng,a=2.1,l=0;for(let c=n+6;c<i-4;c+=a){if(l<=0)if(o.chance(.32+.1*(1-r)))l=o.int(6,14);else{c+=a*o.int(1,4);continue}l--;let h=Math.min(e.length-1,Math.max(0,Math.round((c-n)/ri))),u=e[h];this.coinAt(u.lane,c,u.top,t)}}coinAt(e,t,n,i){let r=.85;for(let o of i)if(o.lane===e)if(n&&(o.kind==="train"||o.kind==="ramp")&&t>=o.d0-.5&&t<=o.d1+.5)r=o.kind==="train"?$t.train.yt+.85:$t.ramp.yt*(t-o.d0)/(o.d1-o.d0)+.85;else{if(!n&&(o.kind==="train"||o.kind==="ramp")&&t>=o.d0-1&&t<=o.d1+1)return;if(o.kind==="mtrain"&&t>=o.d0-2&&t<=o.d0+wn.ratio*wn.trigger+20)return;if(o.kind==="low"||o.kind==="hurdle"){let l=(t-(o.d0-5))/(o.d1-o.d0+10);l>0&&l<1&&(r=Math.max(r,.85+1.25*Math.sin(Math.PI*l)))}else o.kind==="overhead"&&t>o.d0-2&&t<o.d1+2&&(r=.45)}this.sink.coin(e,t,r)}layCoins(e,t,n,i){for(let r=e;r<e+t;r+=2.1)this.sink.coin(i,r,.85)}placePower(e,t,n,i){let r=["magnet","shoes","double","star","jet"],o=this.rng.pick(r);for(let a=this.nextPower;a<i-5;a+=3){let l=Math.min(e.length-1,Math.round((a-n)/ri)),c=e[l];if(c.top&&o!=="star")continue;if(t.every(u=>u.lane!==c.lane||a<u.d0-6||a>(u.kind==="mtrain"?u.d0+wn.ratio*wn.trigger+20:u.d1+6))||c.top&&o==="star"){let u=c.top?$t.train.yt+1.1:1.1;if(this.sink.power(o,c.lane,a,u),o==="jet")for(let d=a+12;d<a+120;d+=2.2)this.sink.coin(c.lane,d,8.5);this.nextPower=a+this.rng.range(260,460);return}}this.nextPower=i+40}};var qv=1/120,Yv=s=>1-(1-s)*(1-s)*(1-s),ws=class{constructor(e=1){H(this,"lane",1);H(this,"fromX",0);H(this,"laneT",1);H(this,"x",0);H(this,"y",0);H(this,"vy",0);H(this,"grounded",!0);H(this,"groundY",0);H(this,"slideT",0);H(this,"fastFall",!1);H(this,"slideQueued",!1);H(this,"coyoteT",0);H(this,"jumpBufT",0);H(this,"d",0);H(this,"speed",0);H(this,"alive",!0);H(this,"running",!1);H(this,"time",0);H(this,"sinceStumble",99);H(this,"stumbleSlow",0);H(this,"ignoreId",-1);H(this,"ignoreT",0);H(this,"airTime",0);H(this,"peakY",0);H(this,"coins",0);H(this,"stars",0);H(this,"coinStreak",0);H(this,"coinStreakT",0);H(this,"score",0);H(this,"power",{magnet:0,shoes:0,double:0,star:0,jet:0});H(this,"baseMult",1);H(this,"characterId","jake");H(this,"obs",[]);H(this,"coinList",[]);H(this,"powers",[]);H(this,"events",[]);H(this,"track");H(this,"invincible",!1);H(this,"noSpawn",!1);H(this,"speedOverride",0);H(this,"nextId",1);H(this,"freeObs",[]);H(this,"freeCoins",[]);H(this,"freePowers",[]);H(this,"created",{obs:0,coins:0,powers:0});this.track=new rc(e,{ob:t=>this.addOb(t),coin:(t,n,i)=>this.addCoin(t,n,i),power:(t,n,i,r)=>this.addPower(t,n,i,r)})}reset(e,t){for(let n of this.obs)this.freeObs.push(n);for(let n of this.coinList)this.freeCoins.push(n);for(let n of this.powers)this.freePowers.push(n);this.obs.length=0,this.coinList.length=0,this.powers.length=0,this.events.length=0,Object.assign(this,{lane:1,fromX:0,laneT:1,x:0,y:0,vy:0,grounded:!0,groundY:0,slideT:0,fastFall:!1,slideQueued:!1,coyoteT:0,jumpBufT:0,d:0,speed:0,alive:!0,running:!1,time:0,sinceStumble:99,stumbleSlow:0,ignoreId:-1,ignoreT:0,airTime:0,peakY:0,coins:0,stars:0,coinStreak:0,coinStreakT:0,score:0,baseMult:1}),this.power={magnet:0,shoes:0,double:0,star:0,jet:0},this.track.reset(e,t),this.noSpawn||this.track.ensure(jt)}addOb(e){let t=this.freeObs.pop()||{};t.id||this.created.obs++;let n=$t[e.kind];return Object.assign(t,{id:this.nextId++,kind:e.kind,lane:e.lane,d0:e.d0,d1:e.d1,yb:n.yb,yt:n.yt,halfW:n.halfW,walk:n.walk,cars:e.cars||1,variant:e.variant||0,hint:e.hint||null,hinted:!1,meet:0,len:0,pd0:e.d0,pd1:e.d1}),e.kind==="mtrain"&&(t.meet=e.d0,t.len=Jn(t.cars),this.placeMover(t),t.pd0=t.d0,t.pd1=t.d1),this.obs.push(t),t}addCoin(e,t,n){let i=this.freeCoins.pop()||{};i.id||this.created.coins++,Object.assign(i,{id:this.nextId++,lane:e,d:t,y:n,x:Ht(e),pulled:!1}),this.coinList.push(i)}addPower(e,t,n,i){let r=this.freePowers.pop()||{};r.id||this.created.powers++,Object.assign(r,{id:this.nextId++,kind:e,lane:t,d:n,y:i}),this.powers.push(r)}placeMover(e){e.d0=Mp(e.meet,this.d),e.d1=e.d0+e.len}static specOf(e){return e.kind==="mtrain"?{kind:"mtrain",lane:e.lane,d0:e.meet,d1:e.meet+bp(e.len),cars:e.cars}:{kind:e.kind,lane:e.lane,d0:e.d0,d1:e.d1,cars:e.cars}}clearWorld(){for(let e of this.obs)this.freeObs.push(e);for(let e of this.coinList)this.freeCoins.push(e);for(let e of this.powers)this.freePowers.push(e);this.obs.length=0,this.coinList.length=0,this.powers.length=0}start(){this.running=!0}left(){this.changeLane(-1)}right(){this.changeLane(1)}changeLane(e){if(!this.alive||!this.running)return;let t=this.lane+e;if(t<0||t>=3){this.events.push({type:"bump",dir:e});return}this.fromX=this.x,this.lane=t,this.laneT=0,this.events.push({type:"lane",dir:e})}jump(){!this.alive||!this.running||(this.grounded||this.coyoteT>0?this.doJump():this.jumpBufT=ot.buffer)}down(){!this.alive||!this.running||(this.jumpBufT=0,this.grounded?this.startSlide():(this.fastFall=!0,this.slideQueued=!0))}doJump(){let e=this.power.shoes>0;this.vy=e?nc:tc,this.grounded=!1,this.coyoteT=0,this.jumpBufT=0,this.slideT=0,this.fastFall=!1,this.slideQueued=!1,this.airTime=0,this.peakY=this.y,this.events.push({type:"jump",super:e})}startSlide(){this.slideT=ot.slideTime,this.events.push({type:"slide"})}get spawned(){return this.nextId-1}get sliding(){return this.slideT>0}get bodyH(){return this.sliding?ot.slideHeight:ot.height}get mult(){return this.baseMult*(this.power.double>0?2:1)*(this.power.star>0?5:1)}update(e){if(!this.running)return;let t=Math.min(e,.1);for(;t>1e-6;){let n=Math.min(qv,t);this.step(n),t-=n}}step(e){if(this.time+=e,!this.alive){this.speed=0,this.grounded||(this.vy-=Ts*e,this.y=Math.max(this.groundY,this.y+this.vy*e),this.y<=this.groundY&&(this.grounded=!0));return}let t=this.x,n=this.y,i=this.d,r=this.bodyH;this.sinceStumble+=e,this.stumbleSlow=Math.max(0,this.stumbleSlow-e),this.ignoreT=Math.max(0,this.ignoreT-e),this.coyoteT=Math.max(0,this.coyoteT-e),this.jumpBufT=Math.max(0,this.jumpBufT-e),this.coinStreakT=Math.max(0,this.coinStreakT-e),this.coinStreakT===0&&(this.coinStreak=0),this.slideT>0&&(this.slideT=Math.max(0,this.slideT-e));for(let l of["magnet","shoes","double","star","jet"])this.power[l]>0&&(this.power[l]=Math.max(0,this.power[l]-e),this.power[l]===0&&this.events.push({type:"powerEnd",kind:l}));let o=this.speedOverride||Kn(this.d);this.speed=o*(this.stumbleSlow>0?.82:1),this.d+=this.speed*e;let a=1+Math.min(10,Math.floor(this.d/500));a!==this.baseMult&&(this.baseMult=a,this.events.push({type:"level",mult:a})),this.score+=this.speed*e*.5*this.mult,this.laneT<1?(this.laneT=Math.min(1,this.laneT+e/ot.laneTime),this.x=this.fromX+(Ht(this.lane)-this.fromX)*Yv(this.laneT)):this.x=Ht(this.lane),this.power.jet>0?(this.grounded=!1,this.vy=0,this.y+=(Sp-this.y)*Math.min(1,e*4.5)):this.grounded||(this.airTime+=e,this.vy-=Ts*e*(this.vy<0?1.15:1),this.fastFall&&(this.vy=Math.min(this.vy,-ot.fastFallSpeed)),this.y+=this.vy*e,this.peakY=Math.max(this.peakY,this.y));for(let l of this.obs)l.pd0=l.d0,l.pd1=l.d1,l.kind==="mtrain"&&this.placeMover(l);this.groundY=this.supportAt(this.x,this.d,this.grounded?this.y:Math.max(this.y,n)),this.grounded&&(this.groundY<this.y-.05?(this.grounded=!1,this.coyoteT=ot.coyote,this.vy=0,this.airTime=0,this.peakY=this.y):this.y=this.groundY),!this.grounded&&this.y<=this.groundY&&this.vy<=0&&this.land(),this.collide(t,n,i,r),this.alive&&(this.pickups(e),this.hints(),this.noSpawn||this.track.ensure(this.d+jt),this.recycle())}land(){let e=this.peakY-this.groundY;this.y=this.groundY,this.vy=0,this.grounded=!0,this.fastFall=!1,this.events.push({type:"land",fall:e}),this.jumpBufT>0?this.doJump():this.slideQueued&&(this.slideQueued=!1,this.startSlide())}supportAt(e,t,n){let i=0;for(let r of this.obs){if(!r.walk||t+ot.halfD*.5<r.d0||t-ot.halfD*.5>r.d1||Math.abs(e-Ht(r.lane))>r.halfW+ot.halfW-.25)continue;let o=this.topAt(r,t);n>=o-ot.stepUp&&o>i&&(i=o)}return i}topAt(e,t){return e.kind==="ramp"?Math.max(0,Math.min(1,(t-e.d0)/(e.d1-e.d0)))*e.yt:e.yt}overlaps(e,t,n,i,r){if(i+ot.halfD<=e.d0||i-ot.halfD>=e.d1||Math.abs(t-Ht(e.lane))>=e.halfW+ot.halfW)return!1;let o=this.topAt(e,i),a=n+ot.feetTol,l=n+r-ot.headTol;return e.walk&&n>=o-ot.stepUp?!1:l>e.yb&&a<o}collide(e,t,n,i){if(this.power.jet>0)return;let r=this.bodyH;for(let o of this.obs){if(o.d0>this.d+8||o.d1<this.d-8||o.id===this.ignoreId&&this.ignoreT>0||!this.overlaps(o,this.x,this.y,this.d,r))continue;let a=Math.abs(this.x-Ht(o.lane)),l=!(n+ot.halfD<=o.pd0||n-ot.halfD>=o.pd1),c=Math.abs(e-Ht(o.lane))<o.halfW+ot.halfW;if(!l){if(o.walk&&this.y>=this.topAt(o,this.d)-ot.stepUp*1.6){this.y=this.topAt(o,this.d),this.groundY=this.y,this.grounded||this.land();continue}if(a>ot.grazeX){if(Math.sign(this.x-e)===Math.sign(this.x-Ht(o.lane))){this.ignoreId=o.id,this.ignoreT=.4;continue}this.bounce(o)}else if(o.kind==="low"||o.kind==="hurdle"){this.ignoreId=o.id,this.ignoreT=.6,this.stumble();continue}else this.crash(o.kind,o);return}if(!c){if(o.kind==="ramp"&&this.topAt(o,this.d)-this.y<=1){this.standOn(o);continue}this.bounce(o);return}if(t>=this.topAt(o,n)-.05||o.kind==="ramp"){o.walk&&(this.y=this.topAt(o,this.d),this.groundY=this.y,this.grounded||this.land());continue}if(t+i-ot.headTol<=o.yb+.05&&this.vy>0){this.vy=0,this.y=Math.max(this.groundY,o.yb-r+ot.headTol-.01);continue}this.bounce(o);return}}standOn(e){this.y=this.topAt(e,this.d),this.groundY=this.y,this.grounded||this.land()}bounce(e){let t=e.lane+(this.x<Ht(e.lane)?-1:1);if(t<0||t>=3){this.crash(e.kind,e);return}this.fromX=this.x,this.lane=t,this.laneT=0,this.ignoreId=e.id,this.ignoreT=.35,this.stumble()}stumble(){if(this.sinceStumble<ot.stumbleWindow&&!this.invincible){this.crash("caught");return}this.sinceStumble=0,this.stumbleSlow=.6,this.events.push({type:"stumble",x:this.x,y:this.y})}crash(e,t){if(this.invincible){this.events.push({type:"stumble",x:this.x,y:this.y}),t&&(this.ignoreId=t.id,this.ignoreT=2);return}this.alive=!1,this.slideT=0,this.events.push({type:"crash",kind:e,x:this.x,y:this.y})}pickups(e){let t=this.bodyH,n=this.characterId==="priya"?cu*1.25:cu,i=this.power.magnet>0||this.power.jet>0;for(let r=this.coinList.length-1;r>=0;r--){let o=this.coinList[r],a=o.d-this.d;if(!(a>n+4)){if(i&&a<n*1.5&&a>-3&&(o.pulled=!0),o.pulled){let l=Math.min(1,e*14);o.x+=(this.x-o.x)*l,o.y+=(this.y+1-o.y)*l,o.d+=(this.d-o.d)*l+this.speed*e*.3}Math.abs(a)<.9&&Math.abs(o.x-this.x)<1&&o.y>this.y-.6&&o.y<this.y+t+.6&&(this.coins++,this.coinStreak++,this.coinStreakT=.6,this.score+=5*this.mult,this.events.push({type:"coin",x:o.x,y:o.y,streak:this.coinStreak}),this.freeCoins.push(o),this.coinList.splice(r,1))}}for(let r=this.powers.length-1;r>=0;r--){let o=this.powers[r],a=Ht(o.lane);if(Math.abs(o.d-this.d)<1&&Math.abs(a-this.x)<1.1&&o.y>this.y-.5&&o.y<this.y+t+.6){let l=sc[o.kind];if(this.power[o.kind]=o.kind==="jet"&&this.characterId==="kabir"?l*1.25:l,o.kind==="star"){this.stars++;let c=this.characterId==="aarav"?300:250;this.score+=c*this.mult}else o.kind==="jet"&&(this.score+=500*this.mult);this.events.push({type:"power",kind:o.kind,x:a,y:o.y}),this.freePowers.push(o),this.powers.splice(r,1)}}}hints(){for(let e of this.obs)e.hint&&!e.hinted&&e.d0-this.d<this.speed*1.5&&e.d0>this.d&&(e.hinted=!0,this.events.push({type:"hint",hint:e.hint}))}recycle(){let e=this.d-14;for(let t=this.obs.length-1;t>=0;t--)this.obs[t].d1<e&&this.freeObs.push(this.obs.splice(t,1)[0]);for(let t=this.coinList.length-1;t>=0;t--)this.coinList[t].d<e&&this.freeCoins.push(this.coinList.splice(t,1)[0]);for(let t=this.powers.length-1;t>=0;t--)this.powers[t].d<e&&this.freePowers.push(this.powers.splice(t,1)[0])}drainEvents(){let e=this.events.slice();return this.events.length=0,e}snapshot(){return{lane:this.lane,x:+this.x.toFixed(3),y:+this.y.toFixed(3),vy:+this.vy.toFixed(2),d:+this.d.toFixed(2),speed:+this.speed.toFixed(2),grounded:this.grounded,sliding:this.sliding,alive:this.alive,running:this.running,coins:this.coins,stars:this.stars,score:Math.floor(this.score),mult:this.mult,power:{...this.power},sinceStumble:+this.sinceStumble.toFixed(2),groundY:+this.groundY.toFixed(2),obs:this.obs.length,coinCount:this.coinList.length,powers:this.powers.length,created:{...this.created},pooled:{obs:this.freeObs.length,coins:this.freeCoins.length,powers:this.freePowers.length}}}};function ac(s,e=!1){let t=s[0].index!==null,n=new Set(Object.keys(s[0].attributes)),i=new Set(Object.keys(s[0].morphAttributes)),r={},o={},a=s[0].morphTargetsRelative,l=new Ut;l.morphTargetsRelative=a;let c=0;for(let h=0;h<s.length;++h){let u=s[h],d=0,f=0;if(t!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let p in u.attributes){if(!n.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+p+'" attribute exists among all geometries, or in none of them.'),null;r[p]===void 0&&(r[p]=[]),r[p].push(u.attributes[p]),d++}if(d!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let p in u.morphAttributes){if(!i.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;if(u.morphAttributes[p].length!==s[0].morphAttributes[p].length)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have the same number of morph targets for the "'+p+'" morph attribute.'),null;o[p]===void 0&&(o[p]=[]),o[p].push(u.morphAttributes[p]),f++}if(f!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of morph attributes."),null;if(e){let p;if(t)p=u.index.count;else if(u.attributes.position!==void 0)p=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,p,h),c+=p}}if(t){let h=0,u=[];for(let d=0;d<s.length;++d){let f=s[d].index;for(let p=0;p<f.count;++p)u.push(f.getX(p)+h);h+=s[d].attributes.position.count}l.setIndex(u)}for(let h in r){let u=Ep(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,u)}for(let h in o){let u=o[h][0].length;if(u!==0){l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let d=0;d<u;++d){let f=[];for(let y=0;y<o[h].length;++y)f.push(o[h][y][d]);let p=Ep(f);if(!p)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(p)}}}return l}function Ep(s){let e,t,n,i=-1,r=0;for(let c=0;c<s.length;++c){let h=s[c];if(e===void 0&&(e=h.array.constructor),e!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=h.itemSize),t!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(i===-1&&(i=h.gpuType),i!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*t}let o=new e(r),a=new Zt(o,t,n),l=0;for(let c=0;c<s.length;++c){let h=s[c];if(h.isInterleavedBufferAttribute){let u=l/t;for(let d=0,f=h.count;d<f;d++)for(let p=0;p<t;p++){let y=h.getComponent(d,p);a.setComponent(d+u,p,y)}}else o.set(h.array,l);l+=h.count*t}return i!==void 0&&(a.gpuType=i),a}function hu(s,e){if(e===Nh)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),s;if(e===xr||e===Po){let t=s.getIndex();if(t===null){let r=[],o=s.getAttribute("position");if(o!==void 0){for(let a=0;a<o.count;a++)r.push(a);s.setIndex(r),t=s.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),s}let n=t.count-2,i=[];if(e===xr)for(let r=1;r<=n;r++)i.push(t.getX(0)),i.push(t.getX(r)),i.push(t.getX(r+1));else for(let r=0;r<n;r++)r%2===0?(i.push(t.getX(r)),i.push(t.getX(r+1)),i.push(t.getX(r+2))):(i.push(t.getX(r+2)),i.push(t.getX(r+1)),i.push(t.getX(r)));return i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles."),s.setIndex(i),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),s}var Kv=new We,Jv=new se(1,1,1),nt=class{constructor(e,t,n,i={}){H(this,"capacity",t);H(this,"parts",[]);H(this,"count",0);e.updateMatrixWorld(!0);let r=new We().copy(e.matrixWorld).invert();e.traverse(o=>{let a=o;if(!a.isMesh)return;let l=new Ln(a.geometry,i.material||a.material,t);if(l.name=(i.name||e.name)+":"+a.name,l.castShadow=!!i.cast,l.receiveShadow=!!i.receive,l.frustumCulled=!1,l.instanceMatrix.setUsage(ql),i.colors){for(let c=0;c<t;c++)l.setColorAt(c,Jv);l.instanceColor.setUsage(ql)}l.count=0,l.visible=!1,n.add(l),this.parts.push({mesh:l,local:new We().multiplyMatrices(r,a.matrixWorld)})})}begin(){this.count=0}add(e,t){if(this.count>=this.capacity)return!1;for(let n of this.parts)n.mesh.setMatrixAt(this.count,Kv.multiplyMatrices(e,n.local)),t&&n.mesh.instanceColor&&n.mesh.setColorAt(this.count,t);return this.count++,!0}end(){for(let e of this.parts){if(e.mesh.count=this.count,e.mesh.visible=this.count>0,this.count===0)continue;let t=e.mesh.instanceMatrix;if(t.updateRange?(t.updateRange.offset=0,t.updateRange.count=this.count*16):typeof t.addUpdateRange=="function"&&(t.clearUpdateRanges?.(),t.addUpdateRange(0,this.count*16)),e.mesh.instanceMatrix.needsUpdate=!0,e.mesh.instanceColor){let n=e.mesh.instanceColor;n.updateRange?(n.updateRange.offset=0,n.updateRange.count=this.count*3):typeof n.addUpdateRange=="function"&&(n.clearUpdateRanges?.(),n.addUpdateRange(0,this.count*3)),e.mesh.instanceColor.needsUpdate=!0}}}};function en(s,e){let t=document.createElement("canvas");return t.width=s,t.height=e,{c:t,g:t.getContext("2d")}}function tn(s,e=!0){let t=new eo(s);return t.colorSpace=Pt,e&&(t.wrapS=t.wrapT=jn),t.generateMipmaps=!0,t.minFilter=yn,t.magFilter=Bt,t.anisotropy=8,t}var Tp=7,An=()=>(Tp=Tp*16807%2147483647)/2147483647;function qe(s,e,t,n,i,r,o){let a=s.createLinearGradient(e,t,e,t+i);a.addColorStop(0,r),a.addColorStop(1,o),s.fillStyle=a,s.fillRect(e,t,n,i)}function Yi(s,e,t,n,i,r=.3){let o=s.createLinearGradient(e,t,e,t+Math.min(16,i*.25));o.addColorStop(0,`rgba(0,0,0,${r*.7})`),o.addColorStop(1,"rgba(0,0,0,0)"),s.fillStyle=o,s.fillRect(e,t,n,Math.min(16,i*.25));let a=s.createLinearGradient(e,t+i-Math.min(24,i*.35),e,t+i);if(a.addColorStop(0,"rgba(0,0,0,0)"),a.addColorStop(1,`rgba(0,0,0,${r})`),s.fillStyle=a,s.fillRect(e,t+i-Math.min(24,i*.35),n,Math.min(24,i*.35)),Math.min(n*.35,i*.35,48)>4){let c=s.createRadialGradient(e+n/2,t+i/2,Math.max(n,i)*.35,e+n/2,t+i/2,Math.max(n,i)*.58);c.addColorStop(0,"rgba(0,0,0,0)"),c.addColorStop(1,`rgba(0,0,0,${r*.5})`),s.fillStyle=c,s.fillRect(e,t,n,i)}}function uu(){let{c:e,g:t}=en(256,256);qe(t,0,0,256,256,"#333e50","#202733");for(let n=0;n<2800;n++){let i=42+An()*45;t.fillStyle=`rgb(${i},${i+5},${i+12})`,t.fillRect(An()*256,An()*256,2+An()*3,2+An()*3)}for(let n=0;n<4;n++){let i=n*64+8;t.fillStyle="rgba(0,0,0,0.45)",t.fillRect(14,i+27,228,6),qe(t,16,i,224,26,"#cbd5e1","#64748b"),t.fillStyle="rgba(255,255,255,0.45)",t.fillRect(16,i,224,4),t.fillStyle="#334155",t.fillRect(16,i+23,224,3),qe(t,16,i+4,8,18,"#fde047","#ca8a04"),qe(t,232,i+4,8,18,"#fde047","#ca8a04")}for(let n of[.22,.78]){let i=Math.round(n*256),r=t.createLinearGradient(i-14,0,i+14,0);r.addColorStop(0,"rgba(0,0,0,0)"),r.addColorStop(.5,"rgba(0,0,0,0.6)"),r.addColorStop(1,"rgba(0,0,0,0)"),t.fillStyle=r,t.fillRect(i-14,0,28,256),qe(t,i-9,0,18,256,"#92400e","#5a2205"),qe(t,i-6,0,12,256,"#64748b","#334155"),qe(t,i-3,0,6,256,"#ffffff","#cbd5e1"),t.fillStyle="#ffffff",t.fillRect(i-1,0,2,256)}return tn(e)}function Ap(){let{c:e,g:t}=en(256,256);qe(t,0,0,256,256,"#9d174d","#701a35");for(let n=0;n<800;n++){let i=115+An()*40;t.fillStyle=`rgba(${i+25},${Math.floor(i*.28)},${Math.floor(i*.42)},0.45)`,t.fillRect(An()*256,An()*256,2,2)}for(let n=0;n<=4;n++){let i=n*64;t.strokeStyle="#380410",t.lineWidth=3,t.beginPath(),t.moveTo(0,i),t.lineTo(256,i),t.stroke(),t.beginPath(),t.moveTo(i,0),t.lineTo(i,256),t.stroke(),t.strokeStyle="rgba(255,255,255,0.18)",t.lineWidth=1.5,t.beginPath(),t.moveTo(0,i+2),t.lineTo(256,i+2),t.stroke(),t.beginPath(),t.moveTo(i+2,0),t.lineTo(i+2,256),t.stroke()}qe(t,0,0,36,256,"#fde047","#ca8a04"),t.fillStyle="rgba(0,0,0,0.3)",t.fillRect(34,0,3,256);for(let n=4;n<256;n+=12)qe(t,4,n,28,6,"#fef08a","#a16207"),t.fillStyle="rgba(255,255,255,0.4)",t.fillRect(5,n,26,2);return tn(e)}function Rp(){let{c:e,g:t}=en(128,128);qe(t,0,0,128,128,"#4d7c0f","#365314");for(let n=0;n<400;n++){let i=An();t.fillStyle=i>.6?"rgba(163,230,53,0.45)":"rgba(20,40,10,0.5)",t.fillRect(An()*128,An()*128,3,3)}for(let n=0;n<24;n++){let i=An()*120+4,r=An()*120+4;t.fillStyle="#fef08a",t.beginPath(),t.arc(i,r,2,0,Math.PI*2),t.fill()}return tn(e)}function Fo(s){let{c:e,g:t}=en(4,256),n=t.createLinearGradient(0,0,0,256);for(let[i,r]of s)n.addColorStop(i,r);return t.fillStyle=n,t.fillRect(0,0,4,256),tn(e,!1)}function Cp(){return{day:{sky:Fo([[0,"#0284c7"],[.35,"#38bdf8"],[.75,"#7dd3fc"],[.94,"#dbeafe"],[1,"#fef3c7"]]),fogColor:new se("#bae6fd"),fogNear:85,fogFar:340,sunColor:new se("#fff7e6"),sunIntensity:2.1,hemiSky:new se("#68b8ff"),hemiGround:new se("#e0b885"),streetlights:0,rain:0,snow:0},sunset:{sky:Fo([[0,"#1e1b4b"],[.35,"#312e81"],[.6,"#ea580c"],[.82,"#f59e0b"],[1,"#ffedd5"]]),fogColor:new se("#ea580c"),fogNear:60,fogFar:270,sunColor:new se("#fed7aa"),sunIntensity:2,hemiSky:new se("#ffedd5"),hemiGround:new se("#854d0e"),streetlights:.35,rain:0,snow:0},rain:{sky:Fo([[0,"#0f172a"],[.4,"#1e293b"],[.75,"#334155"],[1,"#475569"]]),fogColor:new se("#334155"),fogNear:35,fogFar:190,sunColor:new se("#94a3b8"),sunIntensity:.85,hemiSky:new se("#64748b"),hemiGround:new se("#1e293b"),streetlights:1,rain:1,snow:0},night:{sky:Fo([[0,"#020617"],[.4,"#090d16"],[.75,"#1e1b4b"],[1,"#312e81"]]),fogColor:new se("#0c1427"),fogNear:50,fogFar:240,sunColor:new se("#60a5fa"),sunIntensity:.65,hemiSky:new se("#1e293b"),hemiGround:new se("#090d16"),streetlights:1,rain:0,snow:0},snow:{sky:Fo([[0,"#334155"],[.4,"#64748b"],[.75,"#cbd5e1"],[1,"#f1f5f9"]]),fogColor:new se("#e2e8f0"),fogNear:40,fogFar:210,sunColor:new se("#f8fafc"),sunIntensity:1.4,hemiSky:new se("#e2e8f0"),hemiGround:new se("#94a3b8"),streetlights:.6,rain:0,snow:1}}}var cE=new se("#bae6fd");function lc(){let{c:e,g:t}=en(64,64),n=t.createRadialGradient(64/2,64/2,0,64/2,64/2,64/2);return n.addColorStop(0,"rgba(255,255,255,1)"),n.addColorStop(.25,"rgba(255,255,255,0.65)"),n.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=n,t.fillRect(0,0,64,64),tn(e,!1)}function Pp(s){let{c:t,g:n}=en(128,128),i={magnet:"#e8414b",shoes:"#2fb36b",double:"#f2a516",star:"#f59e0b",jet:"#ea580c"}[s];if(n.fillStyle="rgba(255,255,255,0.95)",wp(n,4,4,120,120,26),n.fill(),n.fillStyle=i,wp(n,12,12,104,104,20),n.fill(),n.lineCap="round",n.strokeStyle="#fff",n.fillStyle="#fff",s==="magnet")n.lineWidth=18,n.beginPath(),n.arc(64,60,26,Math.PI,0,!0),n.stroke(),n.beginPath(),n.moveTo(38,60),n.lineTo(38,88),n.moveTo(90,60),n.lineTo(90,88),n.stroke(),n.strokeStyle="#2a2a2a",n.lineWidth=18,n.lineCap="butt",n.beginPath(),n.moveTo(38,84),n.lineTo(38,98),n.moveTo(90,84),n.lineTo(90,98),n.stroke();else if(s==="shoes"){n.beginPath(),n.moveTo(30,70),n.lineTo(30,40),n.lineTo(52,40),n.quadraticCurveTo(60,58,96,62),n.quadraticCurveTo(104,64,102,74),n.lineTo(30,74),n.closePath(),n.fill(),n.strokeStyle="#fff",n.lineWidth=6,n.beginPath();for(let r=0;r<4;r++)n.moveTo(44,82+r*6),n.lineTo(84,85+r*6);n.stroke()}else s==="star"?(n.fillStyle="#fffbeb",n.font="bold 54px system-ui, sans-serif",n.textAlign="center",n.textBaseline="middle",n.fillText("\u2605",64,52),n.font="900 24px system-ui, sans-serif",n.fillText("5X",64,92)):s==="jet"?(n.fillStyle="#fffbeb",n.font="bold 52px system-ui, sans-serif",n.textAlign="center",n.textBaseline="middle",n.fillText("\u{1F680}",64,52),n.font="900 22px system-ui, sans-serif",n.fillText("JET",64,92)):(n.font="bold 64px system-ui, sans-serif",n.textAlign="center",n.textBaseline="middle",n.fillText("\xD72",64,68));return tn(t,!1)}function Ip(s,e){let{c:i,g:r}=en(512,160);return qe(r,0,0,512,160,"#fef08a","#eab308"),Yi(r,0,0,512,160,.25),r.fillStyle="rgba(255, 255, 255, 0.55)",r.fillRect(0,0,512,5),r.strokeStyle="#18181b",r.lineWidth=8,r.strokeRect(6,6,500,148),r.lineWidth=3,r.strokeRect(16,16,480,128),r.fillStyle="#09090b",r.textAlign="center",r.textBaseline="middle",r.font='bold 44px "Noto Sans Devanagari", "Mangal", sans-serif',r.fillText(s,512/2,54),r.font='900 36px "Arial Black", system-ui, sans-serif',r.fillText(e,512/2,108),tn(i,!1)}function wp(s,e,t,n,i,r){s.beginPath(),s.moveTo(e+r,t),s.arcTo(e+n,t,e+n,t+i,r),s.arcTo(e+n,t+i,e,t+i,r),s.arcTo(e,t+i,e,t,r),s.arcTo(e,t,e+n,t,r),s.closePath()}function Lp(){let{c:e,g:t}=en(128,128);qe(t,0,0,128,128,"#fde047","#d97706");for(let n=-2;n<4;n++){let i=t.createLinearGradient(n*48,128,n*48+24+128,0);i.addColorStop(0,"#1e293b"),i.addColorStop(1,"#090d16"),t.fillStyle=i,t.beginPath(),t.moveTo(n*48,128),t.lineTo(n*48+24,128),t.lineTo(n*48+24+128,0),t.lineTo(n*48+128,0),t.closePath(),t.fill()}t.fillStyle="rgba(255,255,255,0.2)";for(let n=0;n<128;n+=16)t.fillRect(0,n,128,3);return Yi(t,0,0,128,128,.35),tn(e)}function Np(){let{c:t,g:n}=en(512,256);qe(n,0,0,512,256,"#025eb2","#00254d"),n.fillStyle="rgba(255, 255, 255, 0.25)",n.fillRect(0,0,512,8),n.fillStyle="rgba(0,0,0,0.4)",n.fillRect(0,54,512,5),n.fillRect(0,210,512,5),qe(n,0,36,512,18,"#fffbeb","#fde68a"),qe(n,0,192,512,18,"#fffbeb","#fde68a");for(let i of[0,464]){qe(n,i,0,48,256,"#fde047","#ca8a04");for(let r=-2;r<6;r++)n.fillStyle="#0f172a",n.beginPath(),n.moveTo(i+r*16,256),n.lineTo(i+r*16+8,256),n.lineTo(i+r*16+24,0),n.lineTo(i+r*16+16,0),n.closePath(),n.fill()}for(let i=64;i<=402;i+=44){n.fillStyle="rgba(0,0,0,0.35)",n.fillRect(i-2,70,36,62),qe(n,i-2,70,34,58,"#e2e8f0","#64748b");let r=n.createLinearGradient(i,72,i+30,126);r.addColorStop(0,"#38bdf8"),r.addColorStop(.35,"#0284c7"),r.addColorStop(1,"#091e3a"),n.fillStyle=r,n.fillRect(i,72,30,54),qe(n,i+2,72,8,22,"#fef08a","#d97706"),qe(n,i+20,72,8,22,"#fef08a","#d97706"),n.fillStyle="rgba(255,255,255,0.35)",n.beginPath(),n.moveTo(i+2,72),n.lineTo(i+14,72),n.lineTo(i+4,126),n.lineTo(i+2,126),n.closePath(),n.fill()}return n.fillStyle="#fde047",n.font='bold 16px "Noto Sans Devanagari", sans-serif',n.fillText("\u092D\u093E\u0930\u0924\u0940\u092F \u0930\u0947\u0932",70,28),n.font="bold 13px system-ui, sans-serif",n.fillText("INDIAN RAILWAYS",160,28),qe(n,140,142,232,24,"#fef08a","#facc15"),n.strokeStyle="#0f172a",n.lineWidth=1.5,n.strokeRect(140,142,232,24),n.fillStyle="#0f172a",n.font="900 11px system-ui, sans-serif",n.textAlign="center",n.fillText("MUMBAI CENTRAL \u21C4 NEW DELHI RAJDHANI",256,158),n.textAlign="left",n.fillStyle="#ffffff",n.font="bold 13px monospace",n.fillText("NER 22451 / A1",400,28),Yi(n,0,0,512,256,.4),tn(t,!1)}function Dp(){let{c:t,g:n}=en(512,256);qe(n,0,0,512,256,"#ffffff","#cbd5e1"),qe(n,0,60,512,100,"#0f3866","#06162a"),qe(n,0,164,512,12,"#fb923c","#c2410c"),qe(n,0,52,512,6,"#7dd3fc","#0284c7");let i=n.createLinearGradient(0,72,0,148);i.addColorStop(0,"rgba(56, 189, 248, 0.55)"),i.addColorStop(.35,"rgba(255, 255, 255, 0.35)"),i.addColorStop(1,"rgba(0, 0, 0, 0.88)"),n.fillStyle=i,n.fillRect(40,72,432,76),n.fillStyle="#1e293b";for(let r=85;r<432;r+=45)n.fillRect(r,72,3,76);qe(n,200,84,112,22,"#27272a","#09090b"),n.fillStyle="#fbbf24",n.font="900 11px monospace",n.textAlign="center",n.fillText("VANDE BHARAT",256,100),n.textAlign="left",n.fillStyle="#0a2540",n.font="900 18px system-ui, sans-serif",n.fillText("\u0935\u0928\u094D\u0926\u0947 \u092D\u093E\u0930\u0924",50,36),n.font="800 14px system-ui, sans-serif",n.fillText("EXPRESS",140,36),n.fillStyle="#f97316",n.fillRect(372,24,70,4),n.fillStyle="#ffffff",n.fillRect(372,28,70,4),n.fillStyle="#16a34a",n.fillRect(372,32,70,4),qe(n,0,220,512,36,"#475569","#1e293b"),n.fillStyle="#090d16";for(let r=60;r<452;r+=14)n.fillRect(r,226,8,20);return Yi(n,0,0,512,256,.25),tn(t,!1)}function Up(){let{c:t,g:n}=en(512,256);qe(n,0,0,512,256,"#991b1b","#571306");for(let i=0;i<512;i+=12)qe(n,i,0,5,256,"#b91c1c","#7f1d1d"),qe(n,i+5,0,7,256,"#450a0a","#200505");n.fillStyle="rgba(0,0,0,0.5)",n.fillRect(188,18,136,220),qe(n,190,20,132,216,"#5a2205","#291003"),n.strokeStyle="#1c1917",n.lineWidth=4,n.strokeRect(190,20,132,216),qe(n,254,16,6,224,"#a8a29e","#57534e");for(let i=0;i<512;i+=32)qe(n,i,236,16,20,"#fde047","#ca8a04");return n.fillStyle="#f1f5f9",n.font="900 18px monospace",n.fillText("CR BCNHL 22104",30,60),n.font="bold 12px monospace",n.fillText("TARE 24.6 T",30,84),n.fillText("CARRY 64.4 T",30,104),n.fillText("CENTRAL RAILWAY",30,130),n.fillText("RETURN 11-2029",30,150),n.strokeStyle="#f1f5f9",n.lineWidth=2,n.strokeRect(360,48,110,70),n.font="bold 11px monospace",n.fillText("NOT TO BE",374,72),n.fillText("LOOSE SHUNTED",368,92),Yi(n,0,0,512,256,.4),tn(t,!1)}function Op(){let{c:t,g:n}=en(512,256);qe(n,0,0,512,256,"#f1f5f9","#94a3b8");for(let i=0;i<256;i+=4)n.fillStyle=i%8===0?"rgba(255,255,255,0.4)":"rgba(0,0,0,0.15)",n.fillRect(0,i,512,2);qe(n,0,36,512,32,"#7e22ce","#3b0764"),qe(n,0,172,512,32,"#7e22ce","#3b0764");for(let i of[90,240,390])n.fillStyle="rgba(0,0,0,0.35)",n.fillRect(i-34,38,68,184),qe(n,i-32,40,64,180,"#fde047","#eab308"),qe(n,i-28,48,26,172,"#64748b","#334155"),qe(n,i+2,48,26,172,"#64748b","#334155"),qe(n,i-24,60,18,48,"#38bdf8","#0f172a"),qe(n,i+6,60,18,48,"#38bdf8","#0f172a"),qe(n,i-32,218,64,8,"#f87171","#b91c1c");for(let i of[40,175,325,475])qe(n,i-20,80,40,64,"#38bdf8","#090d16"),n.fillStyle="#94a3b8",n.fillRect(i-2,80,4,64);return qe(n,150,4,212,28,"#1e293b","#09090b"),n.fillStyle="#ef4444",n.font="900 12px monospace",n.textAlign="center",n.fillText("\u091A\u0930\u094D\u091A\u0917\u0947\u091F - \u0935\u093F\u0930\u093E\u0930 \u092B\u093E\u0938\u094D\u091F \xB7 FAST LOCAL",256,23),n.textAlign="left",n.fillStyle="#ef4444",n.font="900 14px system-ui, sans-serif",n.fillText("FIRST CLASS",20,28),n.fillText("\u092A\u094D\u0930\u0925\u092E \u0936\u094D\u0930\u0947\u0923\u0940",400,28),Yi(n,0,0,512,256,.35),tn(t,!1)}function cc(s="#ef4444",e="#ffffff"){let{c:n,g:i}=en(128,128);qe(i,0,0,128,128,s,s),i.fillStyle=e;for(let o=-2;o<6;o++)i.beginPath(),i.moveTo(o*32,128),i.lineTo(o*32+16,128),i.lineTo(o*32+16+128,0),i.lineTo(o*32+128,0),i.closePath(),i.fill();let r=i.createLinearGradient(0,0,0,128);return r.addColorStop(0,"rgba(255,255,255,0.4)"),r.addColorStop(.3,"rgba(255,255,255,0)"),r.addColorStop(.8,"rgba(0,0,0,0)"),r.addColorStop(1,"rgba(0,0,0,0.4)"),i.fillStyle=r,i.fillRect(0,0,128,128),tn(n)}function Fp(){let{c:e,g:t}=en(256,256),n=t.createRadialGradient(256/2,256/2,256*.4,256/2,256/2,256*.5);n.addColorStop(0,"#d97706"),n.addColorStop(.5,"#fde68a"),n.addColorStop(1,"#78350f"),t.fillStyle=n,t.beginPath(),t.arc(256/2,256/2,256*.49,0,Math.PI*2),t.fill();let i=t.createRadialGradient(256/2,256/2,0,256/2,256/2,256*.45);i.addColorStop(0,"#fffbeb"),i.addColorStop(.85,"#fef3c7"),i.addColorStop(1,"#d97706"),t.fillStyle=i,t.beginPath(),t.arc(256/2,256/2,256*.44,0,Math.PI*2),t.fill(),t.strokeStyle="#1c1917";for(let r=0;r<12;r++){let o=r/12*Math.PI*2,a=r%3===0,l=256*(a?.34:.38),c=256*.42;t.lineWidth=a?4:2,t.beginPath(),t.moveTo(256/2+Math.cos(o)*l,256/2+Math.sin(o)*l),t.lineTo(256/2+Math.cos(o)*c,256/2+Math.sin(o)*c),t.stroke()}return t.fillStyle="#1c1917",t.lineCap="round",t.lineWidth=5,t.beginPath(),t.moveTo(256/2,256/2),t.lineTo(256/2-40,256/2-35),t.stroke(),t.lineWidth=3.5,t.beginPath(),t.moveTo(256/2,256/2),t.lineTo(256/2+50,256/2-50),t.stroke(),t.fillStyle="#d97706",t.beginPath(),t.arc(256/2,256/2,8,0,Math.PI*2),t.fill(),tn(e,!1)}function Bp(s){let{c:n,g:i}=en(512,320);if(i.fillStyle="#090d16",i.fillRect(0,0,512,320),i.strokeStyle="#f59e0b",i.lineWidth=8,i.strokeRect(4,4,504,312),s%4===0){let r=i.createLinearGradient(0,0,512,320);r.addColorStop(0,"#78350f"),r.addColorStop(.5,"#b45309"),r.addColorStop(1,"#f59e0b"),i.fillStyle=r,i.fillRect(12,12,488,296),i.fillStyle="#fef08a",i.font='900 32px "Impact", system-ui, sans-serif',i.textAlign="center",i.fillText("DILWALE DULHANIA",512/2,70),i.fillText("LE JAYENGE",512/2,110),i.fillStyle="#ffffff",i.font='bold 20px "Georgia", serif',i.fillText("COME... FALL IN LOVE",512/2,155),i.fillStyle="#facc15",i.fillRect(60,190,392,48),i.fillStyle="#451a03",i.font="900 18px system-ui, sans-serif",i.fillText("MARATHA MANDIR \xB7 25+ YEARS",512/2,220),i.fillStyle="#fef08a",i.font="bold 16px system-ui, sans-serif",i.fillText("\u2605 HOUSEFULL TODAY \u2605",512/2,275)}else if(s%4===1)i.fillStyle="#1c1917",i.fillRect(12,12,488,296),i.fillStyle="#ea580c",i.font='900 48px "Impact", system-ui, sans-serif',i.textAlign="center",i.fillText("SHOLAY",512/2,85),i.fillStyle="#fbbf24",i.font="900 20px system-ui, sans-serif",i.fillText("\u0936\u094B\u0932\u0947 \xB7 70MM STEREO SOUND",512/2,130),i.fillStyle="#dc2626",i.fillRect(50,160,412,50),i.fillStyle="#fff",i.font="900 19px system-ui, sans-serif",i.fillText("THE GREATEST ACTION FILM",512/2,192),i.fillStyle="#94a3b8",i.font="bold 15px system-ui, sans-serif",i.fillText("MINERVA THEATER \xB7 RECORD RUN",512/2,255);else if(s%4===2){let r=i.createLinearGradient(0,0,512,0);r.addColorStop(0,"#991b1b"),r.addColorStop(1,"#0284c7"),i.fillStyle=r,i.fillRect(12,12,488,296),i.fillStyle="#facc15",i.font='900 64px "Arial Black", sans-serif',i.textAlign="center",i.fillText("R R R",512/2,95),i.fillStyle="#ffffff",i.font="800 20px system-ui, sans-serif",i.fillText("RISE \xB7 ROAR \xB7 REVOLT",512/2,145),i.fillStyle="#0f172a",i.fillRect(60,180,392,48),i.fillStyle="#38bdf8",i.font="900 18px system-ui, sans-serif",i.fillText("S.S. RAJAMOULI SPECTACLE",512/2,210),i.fillStyle="#fbbf24",i.font="bold 16px system-ui, sans-serif",i.fillText("WINNER OSCAR\xAE AWARD",512/2,270)}else i.fillStyle="#09090b",i.fillRect(12,12,488,296),i.fillStyle="#ef4444",i.font='900 52px "Impact", sans-serif',i.textAlign="center",i.fillText("JAWAN",512/2,85),i.fillStyle="#fbbf24",i.font="900 20px system-ui, sans-serif",i.fillText("READY CHIEF!",512/2,130),i.fillStyle="#1e293b",i.fillRect(60,165,392,50),i.fillStyle="#f8fafc",i.font="900 20px system-ui, sans-serif",i.fillText("SHAH RUKH KHAN",512/2,196),i.fillStyle="#ef4444",i.font="bold 16px system-ui, sans-serif",i.fillText("ALL TIME ALL INDIA BLOCKBUSTER",512/2,260);return tn(n,!1)}function Hp(s){let{c:n,g:i}=en(512,140),r=[{hi:"\u092E\u0930\u0940\u0928 \u0921\u094D\u0930\u093E\u0907\u0935",en:"MARINE DRIVE \xB7 QUEEN'S NECKLACE",top:"#0284c7",bot:"#075985",text:"#ffffff"},{hi:"\u092C\u093E\u0902\u0926\u094D\u0930\u093E \u092C\u0948\u0902\u0921\u0938\u094D\u091F\u0948\u0902\u0921",en:"BANDRA BANDSTAND PROMENADE",top:"#0d9488",bot:"#115e59",text:"#fef08a"},{hi:"\u091B\u0924\u094D\u0930\u092A\u0924\u093F \u0936\u093F\u0935\u093E\u091C\u0940 \u091F\u0930\u094D\u092E\u093F\u0928\u0938",en:"CSMT HERITAGE TERMINAL",top:"#9d174d",bot:"#701a35",text:"#fef08a"},{hi:"\u091C\u0941\u0939\u0942 \u092C\u0940\u091A",en:"JUHU BEACH \xB7 SUNSET SHORE",top:"#ea580c",bot:"#9a3412",text:"#ffffff"},{hi:"\u0917\u0947\u091F\u0935\u0947 \u0911\u092B \u0907\u0902\u0921\u093F\u092F\u093E",en:"GATEWAY OF INDIA \xB7 MUMBAI",top:"#1d4ed8",bot:"#1e3a8a",text:"#facc15"},{hi:"\u0926\u093E\u0926\u0930 \u092B\u0942\u0932 \u092E\u093E\u0930\u094D\u0915\u0947\u091F",en:"DADAR FLOWER MARKET",top:"#16a34a",bot:"#166534",text:"#ffffff"}],o=r[s%r.length];return qe(i,0,0,512,140,o.top,o.bot),Yi(i,0,0,512,140,.25),i.strokeStyle="#ffffff",i.lineWidth=5,i.strokeRect(6,6,500,128),i.fillStyle="rgba(255, 255, 255, 0.45)",i.fillRect(8,8,496,4),i.fillStyle=o.text,i.textAlign="center",i.textBaseline="middle",i.font='bold 36px "Noto Sans Devanagari", system-ui, sans-serif',i.fillText(o.hi,512/2,45),i.font="900 22px system-ui, sans-serif",i.fillText(o.en,512/2,95),tn(n,!1)}function kp(s){let{c:t,g:n}=en(256,256),i=[{hi:"\u091A\u093E\u092F & \u0938\u092E\u094B\u0938\u093E",en:"BOMBAY CHAI & CAFE",top:"#d97706",bot:"#78350f",bannerTop:"#b45309",bannerBot:"#451a03"},{hi:"\u0905\u092A\u0928\u093E \u092E\u0947\u0921\u093F\u0915\u0932",en:"APNA PHARMACY 24/7",top:"#16a34a",bot:"#14532d",bannerTop:"#15803d",bannerBot:"#052e16"},{hi:"\u092E\u0941\u0902\u092C\u0908 \u092A\u093E\u0935 \u092D\u093E\u091C\u0940",en:"MUMBAI PAV BHAJI",top:"#ea580c",bot:"#9a3412",bannerTop:"#c2410c",bannerBot:"#431407"},{hi:"\u0915\u0932\u094D\u092F\u093E\u0923 \u091C\u094D\u0935\u0948\u0932\u0930\u094D\u0938",en:"KALYAN JEWELLERS",top:"#4338ca",bot:"#1e1b4b",bannerTop:"#3730a3",bannerBot:"#0f172a"}],r=i[s%i.length];qe(n,0,0,256,256,"#f1f5f9","#cbd5e1");for(let o=0;o<256;o+=32)o%64===0?qe(n,o,0,32,50,r.top,r.bot):qe(n,o,0,32,50,"#ffffff","#e2e8f0"),n.fillStyle="rgba(0,0,0,0.2)",n.fillRect(o,46,32,4);qe(n,10,52,236,60,r.bannerTop,r.bannerBot),n.strokeStyle="#facc15",n.lineWidth=3,n.strokeRect(10,52,236,60),n.fillStyle="#fef08a",n.textAlign="center",n.font='bold 22px "Noto Sans Devanagari", sans-serif',n.fillText(r.hi,256/2,78),n.font="800 13px system-ui, sans-serif",n.fillText(r.en,256/2,100),qe(n,16,120,224,130,"#94a3b8","#475569");for(let o=120;o<250;o+=8)n.fillStyle="rgba(255,255,255,0.25)",n.fillRect(16,o,224,2),n.fillStyle="rgba(0,0,0,0.3)",n.fillRect(16,o+6,224,2);return Yi(n,0,0,256,256,.3),tn(t,!1)}var Ki=new We,Bo=new Ot,hc=new N,uc=new N,dc=class{constructor(e,t=220){H(this,"cap",t);H(this,"mesh");H(this,"lines");H(this,"lineMat");H(this,"rainLines");H(this,"rainMat");H(this,"snowMesh");H(this,"snowMat");H(this,"ps",[]);H(this,"free",[]);H(this,"lineData",[]);H(this,"rainData",[]);H(this,"snowData",[]);H(this,"time",0);let n=new pt({map:lc(),transparent:!0,depthWrite:!1,blending:Xi,fog:!1});this.mesh=new Ln(new Lt(1,1),n,t);for(let a=0;a<t;a++)this.mesh.setColorAt(a,new se(1,1,1));this.mesh.frustumCulled=!1,this.mesh.count=0,this.mesh.renderOrder=5,e.add(this.mesh);for(let a=0;a<t;a++)this.free.push({x:0,y:0,z:0,vx:0,vy:0,vz:0,life:0,max:1,size:1,grav:0,color:new se,world:!0});this.lineMat=new pt({color:16777215,transparent:!0,opacity:0,depthWrite:!1,blending:Xi,fog:!1});let i=40;this.lines=new Ln(new we(.035,.035,1),this.lineMat,i),this.lines.frustumCulled=!1,this.lines.renderOrder=6,e.add(this.lines);for(let a=0;a<i;a++)this.lineData.push(this.newLine(-Math.random()*40));let r=140;this.rainMat=new pt({color:10859772,transparent:!0,opacity:0,depthWrite:!1,fog:!1}),this.rainLines=new Ln(new we(.018,.55,.018),this.rainMat,r),this.rainLines.frustumCulled=!1,this.rainLines.renderOrder=6,e.add(this.rainLines);for(let a=0;a<r;a++)this.rainData.push({x:(Math.random()-.5)*16,y:Math.random()*12,z:-Math.random()*35});let o=120;this.snowMat=new pt({color:16777215,transparent:!0,opacity:0,depthWrite:!1,fog:!1}),this.snowMesh=new Ln(new we(.08,.08,.08),this.snowMat,o),this.snowMesh.frustumCulled=!1,this.snowMesh.renderOrder=6,e.add(this.snowMesh);for(let a=0;a<o;a++)this.snowData.push({x:(Math.random()-.5)*18,y:Math.random()*12,z:-Math.random()*38,size:.6+Math.random()*.8,phase:Math.random()*Math.PI*2})}newLine(e){let t=Math.random()*Math.PI*2,n=3.2+Math.random()*4;return{x:Math.cos(t)*n*1.3,y:2.6+Math.sin(t)*n*.75,z:e,len:2+Math.random()*3}}burst(e,t,n,i,r,o={}){let a=new se(r);for(let l=0;l<i;l++){let c=this.free.pop();if(!c)return;let h=o.speed??3,u=Math.random()*Math.PI*2,d=Math.random()*2-1;c.x=e,c.y=t,c.z=n,c.vx=Math.cos(u)*h*Math.sqrt(1-d*d),c.vy=d*h*.6+(o.up??1.5),c.vz=Math.sin(u)*h*Math.sqrt(1-d*d),c.life=c.max=(o.life??.5)*(.7+Math.random()*.6),c.size=(o.size??.35)*(.6+Math.random()*.8),c.grav=o.grav??6,c.color.copy(a),c.world=o.world??!0,this.ps.push(c)}}update(e,t,n,i,r=0,o=0){this.time+=e,Bo.copy(t.quaternion);let a=0;for(let l=this.ps.length-1;l>=0;l--){let c=this.ps[l];if(c.life-=e,c.life<=0){this.free.push(c),this.ps.splice(l,1);continue}c.vy-=c.grav*e,c.x+=c.vx*e,c.y+=c.vy*e,c.z+=(c.vz+(c.world?n:0))*e;let h=c.life/c.max,u=c.size*(.4+.6*h);Ki.compose(hc.set(c.x,c.y,c.z),Bo,uc.set(u,u,u)),this.mesh.setMatrixAt(a,Ki),this.mesh.setColorAt(a,c.color.clone().multiplyScalar(Math.min(1,h*1.6))),a++}this.mesh.count=a,this.mesh.visible=a>0,this.mesh.instanceMatrix.needsUpdate=!0,this.mesh.instanceColor&&(this.mesh.instanceColor.needsUpdate=!0),this.lineMat.opacity=.32*i,this.lines.visible=i>.02;for(let l=0;l<this.lineData.length;l++){let c=this.lineData[l];c.z+=n*1.6*e,c.z>8&&(this.lineData[l]=Object.assign(c,this.newLine(-40-Math.random()*10))),Ki.compose(hc.set(c.x,c.y,c.z),Bo.identity(),uc.set(1,1,c.len*(.5+i))),this.lines.setMatrixAt(l,Ki)}if(this.lines.instanceMatrix.needsUpdate=!0,this.rainMat.opacity=.52*r,this.rainLines.visible=r>.02,this.rainLines.visible){for(let l=0;l<this.rainData.length;l++){let c=this.rainData[l];c.y-=28*e,c.z+=n*e*.7,c.y<0&&(c.y=10+Math.random()*4,c.x=(Math.random()-.5)*16,c.z=-Math.random()*32),Ki.compose(hc.set(c.x,c.y,c.z),Bo.identity(),uc.set(1,1,1)),this.rainLines.setMatrixAt(l,Ki)}this.rainLines.instanceMatrix.needsUpdate=!0}if(this.snowMat.opacity=.85*o,this.snowMesh.visible=o>.02,this.snowMesh.visible){for(let l=0;l<this.snowData.length;l++){let c=this.snowData[l];c.y-=4.2*e,c.x+=Math.sin(this.time*2.2+c.phase)*.85*e,c.z+=n*e*.35,c.y<0&&(c.y=9+Math.random()*4,c.x=(Math.random()-.5)*18,c.z=-Math.random()*35),Ki.compose(hc.set(c.x,c.y,c.z),Bo,uc.set(c.size,c.size,c.size)),this.snowMesh.setMatrixAt(l,Ki)}this.snowMesh.instanceMatrix.needsUpdate=!0}}warm(e){this.burst(0,1,-5,1,16777215),this.update(0,e,0,1,1,1),this.lines.visible=!0,this.rainLines.visible=!0,this.snowMesh.visible=!0}clear(){for(let e of this.ps)this.free.push(e);this.ps.length=0,this.mesh.count=0}};var fc=class{constructor(e,t){H(this,"root",new Xe);H(this,"model");H(this,"mixer");H(this,"actions",{});H(this,"current",null);H(this,"lean",0);H(this,"leanV",0);H(this,"yaw",0);H(this,"yawV",0);H(this,"squash",0);H(this,"stumbleT",0);H(this,"menuT",0);let n=e.scene.getObjectByName("player");n.removeFromParent();let i=new Xe;i.rotation.y=Math.PI,i.add(n),this.model=i,n.traverse(r=>{let o=r;o.isMesh&&(o.castShadow=!0,o.receiveShadow=!1,o.frustumCulled=!1)}),this.root.add(i),t.add(this.root),this.mixer=new _s(n);for(let r of e.animations){let o=r.name,a=this.mixer.clipAction(r);["jump","jumpup","roll","die","runlookback"].includes(o)&&(a.setLoop(Wl,1),a.clampWhenFinished=!0),this.actions[o]=a}}spring(e,t,n,i,r,o){let a=2*Math.sqrt(r)*o,l=Math.min(e,.05);for(;l>0;){let c=Math.min(l,.008333333333333333);this[i]+=(r*(t-this[n])-a*this[i])*c,this[n]+=this[i]*c,l-=c}}play(e,t=.12,n=1){let i=this.actions[e];if(!i||(i.timeScale=n,this.current===e&&i.isRunning()))return;i.reset().setEffectiveWeight(1).fadeIn(t).play();let r=this.current?this.actions[this.current]:null;r&&r!==i&&r.fadeOut(t),this.current=e}reset(){this.mixer.stopAllAction(),this.current=null,this.lean=0,this.leanV=0,this.yaw=0,this.yawV=0,this.squash=0,this.stumbleT=0,this.root.scale.set(1,1,1),this.root.rotation.set(0,0,0)}applyCharacter(e){this.model.traverse(t=>{let n=t;if(!n.isMesh||!n.material)return;let r=n.material.clone();n.name.includes("Body")?r.color=new se(e.shirtColor):n.name.includes("h_Geo")?r.color=new se(e.hatColor||e.accentColor):r.color&&(r.color=new se(e.accentColor)),n.material=r})}menu(e){this.menuT+=e,this.play("idle",.3),this.root.position.set(0,0,0),this.root.rotation.set(0,Math.sin(this.menuT*.4)*.25,0),this.mixer.update(e)}update(e,t,n){this.root.rotation.y=0;for(let l of n)if(l.type==="jump"){let h=2*(l.super?nc:tc)/Ts,u=this.actions.jump.getClip().duration;this.play("jump",.06,u/(h*1.1))}else l.type==="slide"?this.play("roll",.06,this.actions.roll.getClip().duration/(ot.slideTime*1.05)):l.type==="land"?this.squash=Math.min(.22,.08+l.fall*.04):l.type==="stumble"?(this.stumbleT=.55,this.play("runlookback",.08,1.8)):l.type==="crash"&&this.play("die",.08,1.2);this.stumbleT=Math.max(0,this.stumbleT-t),e.alive&&(e.power.jet>0?this.play("jump",.12,.25):(this.current==="jump"&&!e.grounded||this.current==="roll"&&e.sliding||this.stumbleT>0||(!e.grounded&&e.vy<-3&&this.current!=="jump"?this.play("fall",.15):e.grounded&&!e.sliding&&this.play("run",.12,.9+e.speed/22)),this.current==="roll"&&!e.sliding&&e.grounded&&this.play("run",.1,.9+e.speed/22)));let i=Ht(e.lane)-e.x,r=e.alive&&Math.abs(i)>.35?Math.sign(i):0,o=e.grounded?1:.6;if(this.spring(t,r*o,"lean","leanV",700,.7),this.spring(t,r*.44*o,"yaw","yawV",1e3,.62),this.squash=Math.max(0,this.squash-t*1.4),e.alive&&e.power.jet>0){let l=Math.sin(e.time*9)*.08;this.root.position.set(e.x,e.y+l,0),this.root.rotation.x=-.42,this.root.rotation.z=-this.lean*.4,this.model.rotation.y=Math.PI-this.yaw*1.1}else this.root.position.set(e.x,e.y,0),this.root.rotation.x=0,this.root.rotation.z=-this.lean*.18,this.model.rotation.y=Math.PI-this.yaw;let a=this.squash;this.root.scale.set(1+a*.5,1-a,1+a*.5),this.mixer.update(t)}};var pc=class{constructor(e,t,n){H(this,"root",new Xe);H(this,"inspector");H(this,"dog");H(this,"mixer",null);H(this,"actions",{});H(this,"currentClip",null);H(this,"dogLegs",[]);H(this,"dogTail");H(this,"dogHead");H(this,"dogTime",0);H(this,"x",0);H(this,"y",0);H(this,"z",2.1);H(this,"targetZ",2.1);H(this,"stumbleTime",0);this.inspector=new Xe,this.dog=new Xe,this.root.add(this.inspector),this.root.add(this.dog),n.add(this.root),this.buildInspector(e,t),this.buildDog()}buildInspector(e,t){e.rotation.y=Math.PI;let n=new re({color:12230774}),i=new re({color:3546898}),r=new re({color:1579035}),o=new re({color:16096779}),a=new re({color:14427686}),l=new re({color:592139});e.traverse(u=>{let d=u;d.isMesh&&(d.castShadow=!0,d.receiveShadow=!1,d.frustumCulled=!1,d.name.includes("Body")&&(d.material=n))});let c=e.getObjectByName("mixamorig:Head");if(c){let u=new Xe;u.position.set(0,.18,.04),u.rotation.x=.12;let d=new ht(.14,.12,.08,12),f=new k(d,n);u.add(f);let p=new ht(.124,.124,.032,12),y=new k(p,a);y.position.y=-.025,u.add(y);let g=new we(.04,.045,.02),m=new k(g,o);m.position.set(0,-.02,.128),u.add(m);let b=new ht(.13,.13,.015,12,1,!1,0,Math.PI),T=new k(b,r);T.position.set(0,-.04,.08),T.rotation.x=.25,u.add(T),c.add(u);let M=new Xe;M.position.set(0,.06,.12);for(let w of[-1,1]){let v=new k(new rr(.025,.07,6),l);v.position.set(w*.045,0,0),v.rotation.z=w*1.35,v.rotation.y=w*.2,M.add(v)}c.add(M)}let h=e.getObjectByName("mixamorig:RightHand");if(h){let u=new ht(.018,.018,.8,8),d=new re({color:4860950}),f=new k(u,d);f.position.set(0,-.25,0),f.rotation.x=Math.PI/4,h.add(f)}this.inspector.add(e),this.mixer=new _s(e);for(let u of t)this.actions[u.name]=this.mixer.clipAction(u);this.playClip("run")}buildDog(){let e=new Xe,t=new re({color:7883304}),n=new re({color:1841431}),i=new re({color:14427686}),r=new re({color:16096779}),o=new we(.24,.28,.62),a=new k(o,t);a.position.y=.38,a.castShadow=!0,e.add(a);let l=new we(.25,.1,.36),c=new k(l,n);c.position.set(0,.48,-.02),e.add(c),this.dogHead=new Xe,this.dogHead.position.set(0,.52,-.32);let h=new we(.18,.17,.2),u=new k(h,t);this.dogHead.add(u);let d=new we(.11,.1,.16),f=new k(d,n);f.position.set(0,-.03,-.16),this.dogHead.add(f);for(let x of[-1,1]){let _=new rr(.045,.12,4),P=new k(_,n);P.position.set(x*.07,.12,.02),P.rotation.z=x*-.2,this.dogHead.add(P)}let p=new we(.2,.04,.14),y=new k(p,i);y.position.set(0,-.06,.04),this.dogHead.add(y);let g=new Nn(.025,6,6),m=new k(g,r);m.position.set(0,-.09,-.04),this.dogHead.add(m),e.add(this.dogHead);let b=new we(.07,.28,.08),T=t,M=[[-.1,.28,-.2],[.1,.28,-.2],[-.1,.28,.2],[.1,.28,.2]];for(let[x,_,P]of M){let R=new Xe;R.position.set(x,_,P);let C=new k(b,T);C.position.y=-.14,C.castShadow=!0,R.add(C),e.add(R),this.dogLegs.push(R)}this.dogTail=new Xe,this.dogTail.position.set(0,.44,.3);let w=new ht(.025,.015,.25,6),v=new k(w,t);v.position.set(0,.08,.09),v.rotation.x=.8,this.dogTail.add(v),e.add(this.dogTail),e.scale.set(.85,.85,.85),this.dog.add(e)}playClip(e){if(this.currentClip===e)return;let t=this.actions[e];t&&(t.reset().fadeIn(.12).play(),this.currentClip&&this.actions[this.currentClip]&&this.actions[this.currentClip].fadeOut(.12),this.currentClip=e)}reset(){this.x=0,this.y=0,this.z=2.1,this.targetZ=2.1,this.stumbleTime=0,this.root.visible=!0,this.playClip("run")}event(e){e.type==="stumble"?(this.targetZ=.95,this.stumbleTime=3.5):e.type==="crash"&&(this.targetZ=.25,this.stumbleTime=99)}update(e,t,n){if(n){this.root.visible=!0,this.inspector.position.set(.95,0,-.6),this.inspector.rotation.y=-.35,this.dog.position.set(1.5,0,-.5),this.playClip("idle"),this.mixer&&this.mixer.update(t);return}this.root.visible=!0,this.inspector.rotation.y=0,this.stumbleTime>0&&(this.stumbleTime-=t,this.stumbleTime<=0&&e.alive&&(this.targetZ=2.1));let i=this.targetZ<this.z?7.5:2;if(this.z+=(this.targetZ-this.z)*Math.min(1,t*i),this.x+=(e.x-this.x)*Math.min(1,t*10),this.y+=(e.groundY-this.y)*Math.min(1,t*14),this.inspector.position.set(this.x,this.y,this.z),this.dog.position.set(this.x+.65,this.y,this.z+.1),this.mixer){if(e.alive){this.playClip("run");let r=.85+e.speed/20;this.actions.run&&(this.actions.run.timeScale=r)}else this.playClip("runlookback");this.mixer.update(t)}if(e.alive&&e.speed>0){this.dogTime+=t*(e.speed*.95);let r=Math.sin(this.dogTime*3.2)*.55;this.dogLegs.length===4&&(this.dogLegs[0].rotation.x=r,this.dogLegs[1].rotation.x=-r,this.dogLegs[2].rotation.x=-r,this.dogLegs[3].rotation.x=r),this.dogTail.rotation.y=Math.sin(this.dogTime*5)*.45,this.dogHead.position.y=.52+Math.abs(Math.sin(this.dogTime*3.2))*.035}}};function mc(s){let e=new Map,t=new Map,n=s.clone();return zp(s,n,function(i,r){e.set(r,i),t.set(i,r)}),n.traverse(function(i){if(!i.isSkinnedMesh)return;let r=i,o=e.get(i),a=o.skeleton.bones;r.skeleton=o.skeleton.clone(),r.bindMatrix.copy(o.bindMatrix),r.skeleton.bones=a.map(function(l){return t.get(l)}),r.bind(r.skeleton,r.bindMatrix)}),n}function zp(s,e,t){t(s,e);for(let n=0;n<s.children.length;n++)zp(s.children[n],e.children[n],t)}var Ho=new N;function On(s,e,t,n,i,r){let o=2*Math.PI*i/4,a=Math.max(r-2*i,0),l=Math.PI/4;Ho.copy(e),Ho[n]=0,Ho.normalize();let c=.5*o/(o+a),h=1-Ho.angleTo(s)/l;return Math.sign(Ho[t])===1?h*c:a/(o+a)+c+c*(1-h)}var gt=class s extends we{constructor(e=1,t=1,n=1,i=2,r=.1){let o=i*2+1;if(r=Math.min(e/2,t/2,n/2,r),super(1,1,1,o,o,o),this.type="RoundedBoxGeometry",this.parameters={width:e,height:t,depth:n,segments:i,radius:r},o===1)return;let a=this.toNonIndexed();this.index=null,this.attributes.position=a.attributes.position,this.attributes.normal=a.attributes.normal,this.attributes.uv=a.attributes.uv;let l=new N,c=new N,h=new N(e,t,n).divideScalar(2).subScalar(r),u=this.attributes.position.array,d=this.attributes.normal.array,f=this.attributes.uv.array,p=u.length/6,y=new N,g=.5/o;for(let m=0,b=0;m<u.length;m+=3,b+=2)switch(l.fromArray(u,m),c.copy(l),c.x-=Math.sign(c.x)*g,c.y-=Math.sign(c.y)*g,c.z-=Math.sign(c.z)*g,c.normalize(),u[m+0]=h.x*Math.sign(l.x)+c.x*r,u[m+1]=h.y*Math.sign(l.y)+c.y*r,u[m+2]=h.z*Math.sign(l.z)+c.z*r,d[m+0]=c.x,d[m+1]=c.y,d[m+2]=c.z,Math.floor(m/p)){case 0:y.set(1,0,0),f[b+0]=On(y,c,"z","y",r,n),f[b+1]=1-On(y,c,"y","z",r,t);break;case 1:y.set(-1,0,0),f[b+0]=1-On(y,c,"z","y",r,n),f[b+1]=1-On(y,c,"y","z",r,t);break;case 2:y.set(0,1,0),f[b+0]=1-On(y,c,"x","z",r,e),f[b+1]=On(y,c,"z","x",r,n);break;case 3:y.set(0,-1,0),f[b+0]=1-On(y,c,"x","z",r,e),f[b+1]=1-On(y,c,"z","x",r,n);break;case 4:y.set(0,0,1),f[b+0]=1-On(y,c,"x","y",r,e),f[b+1]=1-On(y,c,"y","x",r,t);break;case 5:y.set(0,0,-1),f[b+0]=On(y,c,"x","y",r,e),f[b+1]=1-On(y,c,"y","x",r,t);break}}static fromJSON(e){return new s(e.width,e.height,e.depth,e.segments,e.radius)}};function Gp(){let t=new ht(.42,.42,.16,24,1);t.rotateX(Math.PI/2);let n=t.toNonIndexed(),i=new ps(.42*.9,.045,8,24).toNonIndexed();i.translate(0,0,.16*.45);let r=new ps(.42*.9,.045,8,24).toNonIndexed();r.translate(0,0,-.16*.45);let o=new ar,a=5;for(let y=0;y<a*2;y++){let g=y%2===1?.0924:.2184,m=y/a*Math.PI-Math.PI/2,b=Math.cos(m)*g,T=Math.sin(m)*g;y===0?o.moveTo(b,T):o.lineTo(b,T)}o.closePath();let l=new uo(o,{depth:.04,bevelEnabled:!1}),c=l.index?l.toNonIndexed():l;c.translate(0,0,.16*.42);let h=c.clone();h.translate(0,0,-.16*.88);let u=[n,i,r,c,h];for(let y of u)y.attributes.normal||y.computeVertexNormals();let d=ac(u),f=new yi({color:16758531,roughness:.24,metalness:.85,emissive:6043648}),p=new k(d,f);return p.name="coin3d",p}function Vp(){let s=new Xe;s.name="low";let e=new re({map:cc("#ef4444","#ffffff")}),t=new re({color:14251782}),n=new re({color:3359061}),i=new pt({color:16436245});for(let r of[-.85,.85]){let o=new k(new gt(.32,.12,.65,2,.04),n);o.position.set(r,.06,0),o.castShadow=!0,s.add(o);let a=new k(new ht(.1,.12,.88,14),t);a.position.set(r,.48,0),a.castShadow=!0,s.add(a);let l=new k(new ht(.09,.11,.14,12),i);l.position.set(r,.95,0),s.add(l)}for(let r of[.42,.75]){let o=new k(new gt(2.1,.26,.1,3,.04),e);o.position.set(0,r,.05),o.castShadow=!0,s.add(o)}return s}function Wp(){let s=new Xe;s.name="hurdle";let e=new re({map:cc("#eab308","#1e293b")}),t=new re({color:6583435}),n=new re({color:1976635});for(let r of[-.95,.95]){let o=new k(new gt(.28,.08,.48,2,.03),n);o.position.set(r,.04,0),s.add(o);let a=new k(new ht(.065,.065,1.22,12),t);a.position.set(r,.62,0),a.castShadow=!0,s.add(a)}let i=new k(new gt(2.2,.24,.12,3,.05),e);return i.position.set(0,1.1,0),i.castShadow=!0,s.add(i),s}function Xp(){let s=new Xe;s.name="overhead";let e=new re({map:cc("#eab308","#090d16")}),t=new re({color:4674921}),n=new pt({color:15680580});for(let r of[-1.08,1.08]){let o=new k(new ht(.08,.1,2.7,12),t);o.position.set(r,1.35,0),o.castShadow=!0,s.add(o);let a=new k(new Nn(.12,10,8),n);a.position.set(r,2.76,0),s.add(a)}let i=new k(new gt(2.35,.45,.16,3,.06),e);return i.position.set(0,2.45,0),i.castShadow=!0,s.add(i),s}function qp(){let s=new Xe;s.name="ramp";let e=$t.ramp.halfW,t=$t.ramp.depth/2,n=$t.ramp.yt,i=[[-e,0,t],[e,0,t],[-e,0,-t],[e,0,-t],[-e,n,-t],[e,n,-t]],r=[[0,1,5],[0,5,4],[0,4,2],[1,3,5],[2,4,5],[2,5,3]],o=[],a=[];for(let f of r)for(let p of f)o.push(...i[p]),a.push((i[p][0]+e)/(2*e),(t-i[p][2])/(2*t)*3+i[p][1]*.3);let l=new Ut;l.setAttribute("position",new _t(o,3)),l.setAttribute("uv",new _t(a,2)),l.computeVertexNormals();let c=new k(l,new re({map:Lp(),side:Dn}));c.castShadow=!0,c.receiveShadow=!0,s.add(c);let h=new re({color:16096779}),u=Math.hypot(n,2*t),d=Math.atan2(n,2*t);for(let f of[-e,e]){let p=new k(new ht(.08,.08,u,12),h);p.position.set(f,n/2+.15,0),p.rotation.x=-d-Math.PI/2,p.castShadow=!0,s.add(p)}return s}function Yp(){let s=new Xe;s.name="police_car";let e=new re({color:16317180}),t=new re({color:988970}),n=new re({color:1579035}),i=new re({color:592139}),r=new pt({color:3900150}),o=new pt({color:15680580}),a=new pt({color:16707722}),l=new we(1.7,.75,3.8),c=new k(l,e);c.position.y=.65,c.castShadow=!0,s.add(c);let h=new we(1.72,.14,3.2),u=new re({color:1920728}),d=new k(h,u);d.position.set(0,.62,0),s.add(d);let f=new we(1.5,.7,2.2),p=new k(f,e);p.position.set(0,1.35,-.2),p.castShadow=!0,s.add(p);let y=new we(1.54,.5,1.9),g=new k(y,t);g.position.set(0,1.35,-.2),s.add(g);let m=new we(1.1,.06,.22),b=new k(m,n);b.position.set(0,1.73,-.2),s.add(b);let T=new we(.45,.12,.18),M=new k(T,o);M.position.set(-.25,1.82,-.2),s.add(M);let w=new we(.45,.12,.18),v=new k(w,r);v.position.set(.25,1.82,-.2),s.add(v);let x=new ht(.38,.38,.24,12);x.rotateZ(Math.PI/2);let _=[[-.85,.38,1.15],[.85,.38,1.15],[-.85,.38,-1.15],[.85,.38,-1.15]];for(let R of _){let C=new k(x,i);C.position.set(...R),C.castShadow=!0,s.add(C)}for(let R of[-.6,.6]){let C=new k(new we(.24,.18,.08),a);C.position.set(R,.65,1.92),s.add(C)}let P=new k(new we(1.4,.45,.12),n);return P.position.set(0,.55,1.95),s.add(P),s}function Kp(){let s=new Xe;s.name="commuters";let e=new re({color:9584654}),t=new re({color:16317180}),n=new re({color:1976635}),i=new re({color:14362487}),r=new re({color:7877903}),o=new Xe;o.position.set(-.6,0,0);let a=new k(new Nn(.18,8,8),e);a.position.y=1.6,a.castShadow=!0,o.add(a);let l=new k(new we(.42,.65,.25),t);l.position.y=1.15,l.castShadow=!0,o.add(l);let c=new k(new we(.36,.8,.22),n);c.position.y=.42,c.castShadow=!0,o.add(c);let h=new k(new we(.12,.35,.32),r);h.position.set(.28,.9,0),o.add(h),s.add(o);let u=new Xe;u.position.set(.6,0,.3);let d=new k(new Nn(.17,8,8),e);d.position.y=1.5,d.castShadow=!0,u.add(d);let f=new k(new ht(.24,.36,1.3,10),i);return f.position.y=.72,f.castShadow=!0,u.add(f),s.add(u),s}function Jp(){let s=new Xe;s.name="rocket_jetpack";let e=new re({color:9741240}),t=new re({color:15357964}),n=new re({color:1976635}),i=new re({color:592139}),r=new pt({color:16772565}),o=new k(new we(.42,.52,.16),e);o.position.set(0,0,0),s.add(o);let a=new k(new we(.46,.48,.22),i);a.position.set(0,0,-.04),s.add(a);for(let l of[-.15,.15]){let c=new k(new ht(.09,.09,.62,12),t);c.position.set(l,.04,.08),c.castShadow=!0,s.add(c);let h=new k(new Nn(.09,10,8),e);h.position.set(l,.35,.08),s.add(h);let u=new k(new ht(.06,.11,.18,12),n);u.position.set(l,-.35,.08),s.add(u);let d=new k(new ht(.04,.07,.06,8),r);d.position.set(l,-.42,.08),s.add(d)}return s}function Zp(){let s=new Xe;s.name="bridge_truss";let e=new re({color:12131356}),t=new re({color:3359061}),n=new re({color:165063}),i=new re({color:4674921}),r=32,o=5.2,a=new k(new we(8.6,.14,r),t);a.position.set(0,-.07,0),a.receiveShadow=!0,s.add(a);for(let c of[-4.4,4.4]){let h=new k(new we(.32,.45,r),e);h.position.set(c,.22,0),s.add(h);let u=new k(new we(.32,.45,r),e);u.position.set(c,o,0),s.add(u);for(let d=-r/2;d<=r/2;d+=4){let f=new k(new we(.26,o,.26),e);f.position.set(c,o/2,d),s.add(f)}for(let d=-r/2;d<r/2;d+=4){let f=new we(.18,.18,Math.hypot(4,o)),p=new k(f,e);p.position.set(c,o/2,d+2),p.rotation.x=Math.atan2(o,4),s.add(p)}}for(let c=-r/2;c<=r/2;c+=8){let h=new k(new we(9.1,.25,.25),e);h.position.set(0,o,c),s.add(h)}let l=new k(new Lt(64,r),n);l.rotation.x=-Math.PI/2,l.position.set(0,-3.2,0),l.receiveShadow=!0,s.add(l);for(let c of[-r/3,r/3]){let h=new k(new ht(1.4,1.8,3.4,12),i);h.position.set(0,-1.7,c),s.add(h)}return s}function $p(){let s=new Xe;s.name="bridge_cable";let e=new re({color:15857145}),t=new pt({color:9741240}),n=new re({color:3359061}),i=new re({color:165063}),r=new re({color:4674921}),o=32,a=11.5,l=new k(new we(8.8,.16,o),n);l.position.set(0,-.08,0),l.receiveShadow=!0,s.add(l);for(let h of[-4.5,4.5]){let u=new k(new we(.3,1.1,o),n);u.position.set(h,.55,0),u.castShadow=!0,s.add(u)}for(let h of[-5.2,5.2]){let u=new k(new we(.55,a,.55),e);u.position.set(h,a/2,0),u.castShadow=!0,s.add(u);for(let d=-o/2+2;d<=o/2-2;d+=4){let f=Math.hypot(d,a-.5),p=new k(new ht(.04,.04,f,6),t);p.position.set(h,(a+.5)/2,d/2),p.rotation.x=Math.atan2(d,a),s.add(p)}}let c=new k(new Lt(64,o),i);c.rotation.x=-Math.PI/2,c.position.set(0,-3.2,0),c.receiveShadow=!0,s.add(c);for(let h of[-o/3,o/3]){let u=new k(new ht(1.6,2,3.4,12),r);u.position.set(0,-1.7,h),s.add(u)}return s}function jp(){let s=new Xe;s.name="bridge_arch";let e=new re({color:7893356}),t=new re({color:5722958}),n=new re({color:223649}),i=32,r=new k(new we(8.6,.16,i),t);r.position.set(0,-.08,0),r.receiveShadow=!0,s.add(r);for(let a of[-4.5,4.5]){let l=new k(new we(.45,1.25,i),e);l.position.set(a,.62,0),l.castShadow=!0,s.add(l);let c=new k(new we(.65,.18,i),t);c.position.set(a,1.3,0),s.add(c);for(let h=-i/2;h<=i/2;h+=4){let u=new k(new we(.55,1.45,.55),t);u.position.set(a,.65,h),s.add(u)}}for(let a of[-i/3,i/3]){let l=new k(new we(9,3,2.2),t);l.position.set(0,-1.65,a),l.castShadow=!0,s.add(l);for(let c of[-4.5,4.5]){let h=new k(new we(.6,.45,2.4),e);h.position.set(c,-.3,a),s.add(h)}}for(let a of[-4.35,4.35]){let l=new k(new we(.3,1.4,i),e);l.position.set(a,-.85,0),s.add(l)}let o=new k(new Lt(64,i),n);return o.rotation.x=-Math.PI/2,o.position.set(0,-3.2,0),o.receiveShadow=!0,s.add(o),s}function Qp(){let s=new Xe;s.name="bridge_flyover";let e=new re({color:9741240}),t=new re({color:6583435}),n=new pt({color:16096779}),i=new re({color:165063}),r=new re({color:4674921}),o=32,a=new k(new we(8.8,1.1,o),e);a.position.set(0,-.65,0),a.castShadow=!0,s.add(a);for(let c of[-4.5,4.5]){let h=new k(new we(.35,1.4,o),t);h.position.set(c,.7,0),h.castShadow=!0,s.add(h);let u=new k(new we(.37,.12,o),n);u.position.set(c,1.35,0),s.add(u)}for(let c of[-o/3,o/3]){let h=new k(new ht(1,1.4,3.2,16),r);h.position.set(0,-2.2,c),h.castShadow=!0,s.add(h)}let l=new k(new Lt(64,o),i);return l.rotation.x=-Math.PI/2,l.position.set(0,-3.2,0),l.receiveShadow=!0,s.add(l),s}function ko(){let s=new Xe,e=new re({color:11817737}),t=new re({color:1976635});for(let n=0;n<3;n++){let i=new k(new gt(1.6,.04,.12,2,.02),e);i.position.set(0,.42,-.12+n*.14),i.castShadow=!0,s.add(i)}for(let n=0;n<2;n++){let i=new k(new gt(1.6,.12,.04,2,.02),e);i.position.set(0,.62+n*.16,-.22),i.castShadow=!0,s.add(i)}for(let n of[-.65,.65]){let i=new k(new ht(.04,.04,.42,8),t);i.position.set(n,.21,0),i.castShadow=!0,s.add(i)}return s}function gc(){let s=new Xe,e=new pt({map:Fp()}),t=new re({color:1841431}),n=new k(new sr(.55,24),e);n.position.z=.06,s.add(n);let i=new k(new sr(.55,24),e);i.rotation.y=Math.PI,i.position.z=-.06,s.add(i);let r=new k(new ht(.58,.58,.12,24),t);r.rotation.x=Math.PI/2,s.add(r);let o=new k(new we(.08,.08,.8),t);return o.position.set(0,.6,0),s.add(o),s}function em(){let s=new Xe;s.name="station_shed";let e=new re({color:1976635}),t=new re({color:3718648,transparent:!0,opacity:.65}),n=new re({color:8591427}),i=new re({color:16436245}),r=10.4,o=7.6,a=24;for(let h of[-1,1]){let u=new k(new gt(2.4,.5,a,2,.04),n);u.position.set(h*5.2,.25,0),u.receiveShadow=!0,s.add(u);let d=new k(new gt(.14,.52,a,2,.02),i);d.position.set(h*3.95,.26,0),s.add(d);let f=ko();f.position.set(h*5.3,.5,-a/4),f.rotation.y=h>0?-Math.PI/2:Math.PI/2,s.add(f);let p=ko();p.position.set(h*5.3,.5,a/4),p.rotation.y=h>0?-Math.PI/2:Math.PI/2,s.add(p)}let l=gc();l.position.set(0,5.8,0),s.add(l);for(let h=-a/2;h<=a/2;h+=6){let u=new k(new ps(r/2,.16,8,24,Math.PI),e);u.rotation.y=Math.PI/2,u.rotation.x=Math.PI/2,u.position.set(0,o*.72,h),u.castShadow=!0,s.add(u);for(let d of[-r/2+.2,r/2-.2]){let f=new k(new ht(.14,.18,o*.75,10),e);f.position.set(d,o*.75/2,h),f.castShadow=!0,s.add(f)}}let c=new k(new ht(r/2,r/2,a,24,1,!0,0,Math.PI),t);return c.rotation.z=Math.PI/2,c.rotation.y=Math.PI/2,c.position.set(0,o*.72,0),s.add(c),s}function tm(){let s=new Xe;s.name="station_metro";let e=new re({color:3359061}),t=new re({color:15857145}),n=new pt({color:440020}),i=new re({color:4674921}),r=24;for(let a of[-1,1]){let l=new k(new gt(2.4,.5,r,2,.04),i);l.position.set(a*5.2,.25,0),l.receiveShadow=!0,s.add(l);let c=ko();c.position.set(a*5.3,.5,0),c.rotation.y=a>0?-Math.PI/2:Math.PI/2,s.add(c);for(let h=-r/2+3;h<=r/2-3;h+=9){let u=new k(new gt(.35,6.2,.55,2,.04),e);u.position.set(a*5.8,3.1,h),u.castShadow=!0,s.add(u);let d=new k(new gt(3.6,.16,8.8,2,.03),t);d.position.set(a*4.4,6.2,h),d.rotation.z=a*-.18,d.castShadow=!0,s.add(d);let f=new k(new we(.08,.08,8.8),n);f.position.set(a*2.7,6.4,h),s.add(f)}}let o=gc();return o.position.set(0,5.8,0),s.add(o),s}function nm(){let s=new Xe;s.name="station_heritage";let e=new re({color:10033947}),t=new re({color:16707722}),n=new re({color:14251782}),i=new re({color:7877903}),r=24;for(let a of[-1,1]){let l=new k(new gt(2.4,.5,r,2,.04),i);l.position.set(a*5.2,.25,0),l.receiveShadow=!0,s.add(l);let c=new k(new gt(.65,5.5,r,2,.05),e);c.position.set(a*5.8,2.75,0),c.castShadow=!0,s.add(c);let h=ko();h.position.set(a*5.3,.5,0),h.rotation.y=a>0?-Math.PI/2:Math.PI/2,s.add(h);for(let u=-r/2+4;u<=r/2;u+=8){let d=new k(new gt(.72,1.2,3.8,2,.04),t);d.position.set(a*5.8,4.8,u-2),s.add(d);let f=new k(new Nn(1.2,12,10,0,Math.PI*2,0,Math.PI*.7),n);f.position.set(a*5.8,6.2,u),f.castShadow=!0,s.add(f);let p=new k(new ht(.06,.16,1.4,8),t);p.position.set(a*5.8,7.3,u),s.add(p)}}let o=gc();return o.position.set(0,5.5,0),s.add(o),s}function im(){let s=new Xe;s.name="station_suburban";let e=new re({color:4674921}),t=new re({color:14251782}),n=new re({color:6583435}),i=24;for(let o of[-1,1]){let a=new k(new gt(2.4,.5,i,2,.04),n);a.position.set(o*5.2,.25,0),a.receiveShadow=!0,s.add(a);let l=ko();l.position.set(o*5.3,.5,0),l.rotation.y=o>0?-Math.PI/2:Math.PI/2,s.add(l);for(let c=-i/2+3;c<=i/2-3;c+=9){let h=new k(new ht(.12,.14,5.2,12),t);h.position.set(o*5.2,2.6,c),h.castShadow=!0,s.add(h);let u=new k(new we(1.6,.08,8.8),e);u.position.set(o*4.6,5.4,c),u.rotation.z=o*.25,u.castShadow=!0,s.add(u);let d=new k(new we(1.6,.08,8.8),e);d.position.set(o*5.8,5.4,c),d.rotation.z=o*-.25,d.castShadow=!0,s.add(d)}}let r=gc();return r.position.set(0,5.2,0),s.add(r),s}function sm(){let s=new Xe;s.name="train_icf";let e=new re({map:Np()}),t=new re({color:1579035}),n=new re({color:9741240}),i=new re({color:592139}),r=2.3,o=6.74,a=2.5,l=new k(new gt(r,a,o,3,.12),e);l.position.set(0,1.85,0),l.castShadow=!0,l.receiveShadow=!0,s.add(l);let c=new k(new ht(r/2,r/2,o,16,1,!1,0,Math.PI),n);c.rotation.z=Math.PI/2,c.rotation.y=Math.PI/2,c.position.set(0,3.1,0),c.castShadow=!0,s.add(c);for(let h of[-o/3.5,o/3.5]){let u=new k(new gt(r*.9,.45,1.6,2,.05),t);u.position.set(0,.35,h),u.castShadow=!0,s.add(u)}for(let h of[-o/2-.08,o/2+.08])for(let u of[-.65,.65]){let d=new k(new ht(.12,.12,.18,12),i);d.rotation.x=Math.PI/2,d.position.set(u,.85,h),s.add(d)}return s}function rm(){let s=new Xe;s.name="train_vandebharat";let e=new re({map:Dp()}),t=new re({color:3359061}),n=new re({color:1579035}),i=new re({color:16317180}),r=2.3,o=6.74,a=2.5,l=new k(new gt(r,a,o,3,.14),e);l.position.set(0,1.85,0),l.castShadow=!0,l.receiveShadow=!0,s.add(l);let c=new k(new gt(r*.96,.35,o,2,.08),i);c.position.set(0,3.22,0),c.castShadow=!0,s.add(c);for(let u of[-1.5,1.5]){let d=new k(new gt(1.6,.22,1.8,2,.06),t);d.position.set(0,3.42,u),d.castShadow=!0,s.add(d)}let h=new k(new gt(r*.94,.6,.6,2,.08),i);h.position.set(0,1.45,-o/2-.2),h.rotation.x=.45,s.add(h);for(let u of[-o/3.5,o/3.5]){let d=new k(new gt(r*.85,.4,1.5,2,.05),n);d.position.set(0,.35,u),d.castShadow=!0,s.add(d)}return s}function om(){let s=new Xe;s.name="train_freight";let e=new re({map:Up()}),t=new re({color:4472892}),n=new re({color:1579035}),i=2.3,r=6.74,o=2.8,a=new k(new gt(i,o,r,3,.1),e);a.position.set(0,1.95,0),a.castShadow=!0,a.receiveShadow=!0,s.add(a);let l=new k(new gt(.85,.08,r-.2,2,.02),t);l.position.set(0,3.4,0),s.add(l);for(let c of[1.2,1.7,2.2,2.7,3.2]){let h=new k(new ht(.025,.025,.5,8),t);h.rotation.z=Math.PI/2,h.position.set(0,c,-r/2-.05),s.add(h)}for(let c of[-r/3.5,r/3.5]){let h=new k(new gt(i*.9,.45,1.6,2,.05),n);h.position.set(0,.35,c),h.castShadow=!0,s.add(h)}return s}function am(){let s=new Xe;s.name="train_local";let e=new re({map:Op()}),t=new re({color:5774471}),n=new re({color:14251782}),i=new re({color:3359061}),r=new re({color:1579035}),o=2.3,a=6.74,l=2.5,c=new k(new gt(o,l,a,3,.12),e);c.position.set(0,1.85,0),c.castShadow=!0,c.receiveShadow=!0,s.add(c);let h=new k(new ht(o/2,o/2,a,16,1,!1,0,Math.PI),t);h.rotation.z=Math.PI/2,h.rotation.y=Math.PI/2,h.position.set(0,3.1,0),h.castShadow=!0,s.add(h);let u=new k(new gt(1.2,.08,1.6,2,.02),i);u.position.set(0,3.44,0),s.add(u);let d=new k(new we(.06,.45,.06),n);d.position.set(0,3.65,-.4),d.rotation.x=.5,s.add(d);let f=new k(new we(.06,.45,.06),n);f.position.set(0,3.65,.4),f.rotation.x=-.5,s.add(f);let p=new k(new gt(1.6,.05,.2,2,.02),n);p.position.set(0,3.85,0),s.add(p);for(let y of[-a/3.5,a/3.5]){let g=new k(new gt(o*.9,.45,1.6,2,.05),r);g.position.set(0,.35,y),g.castShadow=!0,s.add(g)}return s}function zo(s=0){let e=new Xe;e.name="cinema_billboard";let t=Bp(s),n=new pt({map:t}),i=new re({color:3359061}),r=new pt({color:16707722});for(let c of[-2.4,2.4]){let h=new k(new we(.25,6.8,.25),i);h.position.set(c,3.4,0),h.castShadow=!0,e.add(h)}let o=new k(new we(5.2,.18,.18),i);o.position.set(0,3.2,0),e.add(o);let a=new k(new Lt(5.8,3.6),n);a.position.set(0,5.2,.14),e.add(a);let l=new k(new we(6,3.8,.2),i);l.position.set(0,5.2,0),l.castShadow=!0,e.add(l);for(let c of[-2.2,0,2.2]){let h=new k(new we(.08,.45,.6),i);h.position.set(c,7.2,.3),e.add(h);let u=new k(new Nn(.16,8,6),r);u.position.set(c,7,.6),e.add(u)}return e}function As(s=0){let e=new Xe;e.name="landmark_gantry";let t=Hp(s),n=new pt({map:t,side:an}),i=new re({color:4674921}),r=10.8,o=6.4;for(let h of[-r/2,r/2]){let u=new k(new we(.4,o,.4),i);u.position.set(h,o/2,0),u.castShadow=!0,e.add(u);let d=new k(new we(.9,.5,.9),i);d.position.set(h,.25,0),e.add(d)}let a=new k(new we(r+.4,.45,.45),i);a.position.set(0,o,0),a.castShadow=!0,e.add(a);let l=new k(new Lt(8.2,2.2),n);l.position.set(0,o-1.25,.05),e.add(l);let c=new k(new we(8.4,2.3,.12),i);return c.position.set(0,o-1.25,0),c.castShadow=!0,e.add(c),e}function Go(s=0){let e=new Xe;e.name="indian_shop";let t=kp(s),n=new re({map:t}),i=new re({color:9741240}),r=new re({color:592139}),o=new k(new we(5.5,7.5,6),i);o.position.set(0,3.75,0),o.castShadow=!0,o.receiveShadow=!0,e.add(o);let a=new k(new Lt(5.2,5.2),n);a.position.set(0,2.7,3.02),e.add(a);let l=new k(new ht(.8,.8,1.4,12),r);return l.position.set(1.2,8.2,1),l.castShadow=!0,e.add(l),e}var Vo=[{id:"jake",name:"Jake",title:"Original Subway Surfer",avatar:"\u{1F9E2}",perk:"Balanced Agility",desc:"The legendary graffiti runner with classic street style.",shirtColor:1920728,pantsColor:3359061,shoesColor:16317180,hatColor:16317180,accentColor:16096779},{id:"aarav",name:"Aarav",title:"Mumbai Sprint King",avatar:"\u{1F3C3}\u200D\u2642\uFE0F",perk:"+15% Star Multiplier",desc:"Marine Drive parkour athlete in vibrant saffron sports jersey.",shirtColor:15357964,pantsColor:988970,shoesColor:16436245,hatColor:15357964,accentColor:16347926},{id:"priya",name:"Priya",title:"Desi Parkour Queen",avatar:"\u{1F3C3}\u200D\u2640\uFE0F",perk:"+20% Coin Magnet",desc:"Agile rooftop gymnast with stylish fusion jacket and neon kicks.",shirtColor:14362487,pantsColor:1973067,shoesColor:440020,hatColor:15485081,accentColor:440020},{id:"kabir",name:"Kabir",title:"Cyberpunk Neon Racer",avatar:"\u26A1",perk:"+25% Jetpack Duration",desc:"Bandra techie with glowing cyberpunk neon hoodie and magnetic boots.",shirtColor:592139,pantsColor:1579035,shoesColor:1096065,hatColor:1096065,accentColor:1096065}];function Zv(s){return Vo.find(t=>t.id===s)||Vo[0]}function Ci(){try{let s=localStorage.getItem("subway_char_id");return Zv(s||"jake")}catch{return Vo[0]}}function lm(s){try{localStorage.setItem("subway_char_id",s)}catch{}}function $v(s=85e-5){if(Ze.__curvedWorldApplied)return;Ze.__curvedWorldApplied=!0;let e=`
vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif

// World position before projection
vec4 curvedWorldPos = modelMatrix * mvPosition;
// Distance ahead along track (player is at z=0, ahead is negative Z)
float dist = max(0.0, -curvedWorldPos.z - 4.0);
// Quadratic horizon curve
curvedWorldPos.y -= ${s.toFixed(6)} * (dist * dist);
mvPosition = viewMatrix * curvedWorldPos;

gl_Position = projectionMatrix * mvPosition;
`;Ze.project_vertex=e;let t=Ze.worldpos_vertex;Ze.worldpos_vertex=t.replace("worldPosition = modelMatrix * worldPosition;",`worldPosition = modelMatrix * worldPosition;
float shadowDist = max(0.0, -worldPosition.z - 4.0);
worldPosition.y -= ${s.toFixed(6)} * (shadowDist * shadowDist);`)}var $e=new We,cm=new Ot,jv=new In,Pi=new N,Qv=new N(1,1,1),Ji=new N,GE=[new se("#004b99"),new se("#a81c1c"),new se("#047857"),new se("#f1f5f9"),new se("#ea580c")],hm={magnet:new se("#ff5a64"),shoes:new se("#3ee08a"),double:new se("#ffc23d"),star:new se("#f59e0b"),jet:new se("#ea580c")},um=new se(1,.92,.65),eM=new se(1,.25,.2),tM=new se(1,.88,.4),du=new Ot().setFromAxisAngle(new N(1,0,0),-Math.PI/2),Fn=420,Ii=3.9,Xo=7.4,xc=class{constructor(e,t){H(this,"scene",new Xr);H(this,"camera");H(this,"sun");H(this,"hemi");H(this,"player");H(this,"chaser");H(this,"fx");H(this,"policeCars");H(this,"platformPeople");H(this,"bridgePools",[]);H(this,"stationPools",[]);H(this,"trainPools",[]);H(this,"cinemaPools",[]);H(this,"landmarkPools",[]);H(this,"shopPools",[]);H(this,"rocketJet");H(this,"weatherPresets");H(this,"pools",{});H(this,"coins");H(this,"halos");H(this,"powerCards");H(this,"poles");H(this,"stationSigns");H(this,"scrollTex",[]);H(this,"houses",[]);H(this,"houseSize",[]);H(this,"placed",[]);H(this,"nextHouse",[0,0]);H(this,"segments",[]);H(this,"segmentFrontier",0);H(this,"nextSegmentId",0);H(this,"sceneryRng",new Ri(1337));H(this,"rng",new Ri(99));H(this,"camY",0);H(this,"shake",0);H(this,"flash",0);H(this,"aspect",1);H(this,"lightningTimer",4);H(this,"lightningFlash",0);H(this,"time",0);$v(85e-5),this.weatherPresets=Cp();let n=this.scene;n.background=this.weatherPresets.day.sky,n.fog=new Wr(this.weatherPresets.day.fogColor,85,340),this.camera=new Vt(60,1,.3,340),this.hemi=new go(6863103,14727301,1.45),n.add(this.hemi),this.sun=new xs(16775142,2.1),this.sun.position.set(9,22,4),this.sun.target.position.set(0,0,-14),this.sun.castShadow=!0;let i=this.sun.shadow;i.mapSize.set(t.shadowSize,t.shadowSize),Object.assign(i.camera,{left:-16,right:16,top:30,bottom:-30,near:2,far:70}),i.bias=-5e-4,i.normalBias=.02,i.radius=2,n.add(this.sun,this.sun.target);let r=new vo(16775917,.45);n.add(r),this.buildGround();let o=new we(.18,6.9,.18).translate(0,3.45,0),a=new we(1.9,.12,.12).translate(-.85,6.6,0),l=new we(.5,.14,.3).translate(-1.7,6.48,0),c=ac([o,a,l]),h=new k(c,new re({color:5857387}));this.poles=new nt(h,40,n,{cast:!0,name:"pole"});let u=Ip("\u092E\u0941\u0902\u092C\u0908 \u0938\u0947\u0902\u091F\u094D\u0930\u0932","MUMBAI CENTRAL"),d=new k(new Lt(2.4,.75),new pt({map:u,side:an}));this.stationSigns=new nt(d,24,n,{cast:!0,name:"sign"});let f=M=>{let w=e.scene.getObjectByName(M);if(!w)throw new Error("missing model "+M);return w};this.trainPools=[new nt(sm(),35,n,{cast:!0,receive:!0,name:"train_icf"}),new nt(rm(),35,n,{cast:!0,receive:!0,name:"train_vande_bharat"}),new nt(om(),35,n,{cast:!0,receive:!0,name:"train_freight"}),new nt(am(),35,n,{cast:!0,receive:!0,name:"train_mumbai_local"})],this.cinemaPools=[new nt(zo(0),6,n,{cast:!0,receive:!0,name:"cinema_ddlj"}),new nt(zo(1),6,n,{cast:!0,receive:!0,name:"cinema_sholay"}),new nt(zo(2),6,n,{cast:!0,receive:!0,name:"cinema_rrr"}),new nt(zo(3),6,n,{cast:!0,receive:!0,name:"cinema_jawan"})],this.landmarkPools=[new nt(As(0),4,n,{cast:!0,receive:!0,name:"gantry_marine_drive"}),new nt(As(1),4,n,{cast:!0,receive:!0,name:"gantry_bandra"}),new nt(As(2),4,n,{cast:!0,receive:!0,name:"gantry_csmt"}),new nt(As(3),4,n,{cast:!0,receive:!0,name:"gantry_juhu"}),new nt(As(4),4,n,{cast:!0,receive:!0,name:"gantry_gateway"}),new nt(As(5),4,n,{cast:!0,receive:!0,name:"gantry_dadar"})],this.shopPools=[new nt(Go(0),8,n,{cast:!0,receive:!0,name:"shop_chai"}),new nt(Go(1),8,n,{cast:!0,receive:!0,name:"shop_pharmacy"}),new nt(Go(2),8,n,{cast:!0,receive:!0,name:"shop_pavbhaji"}),new nt(Go(3),8,n,{cast:!0,receive:!0,name:"shop_jewellers"})],this.pools.low=new nt(Vp(),24,n,{cast:!0,receive:!0}),this.pools.hurdle=new nt(Wp(),24,n,{cast:!0,receive:!0}),this.pools.overhead=new nt(Xp(),24,n,{cast:!0,receive:!0}),this.pools.ramp=new nt(qp(),16,n,{cast:!0,receive:!0});let p=Gp();this.coins=new nt(p,320,n,{cast:!1});let y=new pt({map:lc(),transparent:!0,depthWrite:!1,blending:Xi,fog:!1}),g=new k(new Lt(1,1),y);g.name="glow",this.halos=new nt(g,340,n,{colors:!0});for(let M of this.halos.parts)M.mesh.renderOrder=4;let m=M=>{let w=new k(new Lt(1,1),new pt({map:Pp(M),transparent:!0,alphaTest:.1}));return w.name="power-"+M,new nt(w,4,n)};this.powerCards={magnet:m("magnet"),shoes:m("shoes"),double:m("double"),star:m("star"),jet:m("jet")},this.policeCars=new nt(Yp(),16,n,{cast:!0,receive:!0,name:"police_car"}),this.platformPeople=new nt(Kp(),32,n,{cast:!0,receive:!0,name:"commuters"}),this.bridgePools=[new nt(Zp(),8,n,{cast:!0,receive:!0,name:"bridge_truss"}),new nt($p(),8,n,{cast:!0,receive:!0,name:"bridge_cable"}),new nt(jp(),8,n,{cast:!0,receive:!0,name:"bridge_arch"}),new nt(Qp(),8,n,{cast:!0,receive:!0,name:"bridge_flyover"})],this.stationPools=[new nt(em(),12,n,{cast:!0,receive:!0,name:"station_shed"}),new nt(tm(),12,n,{cast:!0,receive:!0,name:"station_metro"}),new nt(nm(),12,n,{cast:!0,receive:!0,name:"station_heritage"}),new nt(im(),12,n,{cast:!0,receive:!0,name:"station_suburban"})];let b=e.scene.getObjectByName("player"),T=mc(b);this.player=new fc(e,n),this.player.applyCharacter(Ci()),this.chaser=new pc(T,e.animations,n),this.rocketJet=Jp(),this.rocketJet.position.set(0,.95,.22),this.rocketJet.rotation.y=Math.PI,this.rocketJet.visible=!1,this.player.root.add(this.rocketJet),this.fx=new dc(n),this.resetScenery()}buildGround(){let e=this.scene,t=-Fn/2+30,n=uu();n.repeat.set(3,Fn/2.5);let i=new k(new Lt(2.5*3,Fn,4,120),new re({map:n}));i.rotation.x=-Math.PI/2,i.position.set(0,0,t),i.receiveShadow=!0,e.add(i);let r=uu();r.repeat.set(.3,Fn/2.5),r.offset.x=.35;for(let h of[-1,1]){let u=Ii-2.5*1.5,d=new k(new Lt(u,Fn,2,120),new re({map:r}));d.rotation.x=-Math.PI/2,d.position.set(h*(2.5*1.5+u/2),0,t),e.add(d)}let o=Ap();o.repeat.set(1.5,Fn/3);for(let h of[-1,1]){let u=Xo-Ii,d=new k(new Lt(u,Fn,2,120),new re({map:o}));d.rotation.x=-Math.PI/2,d.position.set(h*(Ii+u/2),.25,t),d.receiveShadow=!0,e.add(d);let f=new k(new we(.12,.25,Fn,1,1,120),new re({color:9739174}));f.position.set(h*(Ii-.06),.125,t),e.add(f)}let a=Rp();a.repeat.set(20,Fn/6);let l=new k(new Lt(120,Fn,12,120),new re({map:a}));l.rotation.x=-Math.PI/2,l.position.set(0,-.02,t),l.receiveShadow=!0,e.add(l);let c=new pt({color:2830134});for(let h=0;h<3;h++){let u=new k(new we(.03,.03,Fn,1,1,120),c);u.position.set(Ht(h),6.45,t),e.add(u)}this.scrollTex=[n,r,o,a]}addScenery(e){for(let t=1;t<=5;t++){let n=e.scene.getObjectByName("house"+t);if(!n)continue;let r=new fn().setFromObject(n).getSize(new N);this.houses.push(new nt(n,14,this.scene,{cast:!0,receive:!0,name:"house"+t})),this.houseSize.push({len:r.x,depth:r.z})}}warmScenery(e){for(let t of this.houses)for(let n of t.parts){let i=n.mesh.material;i.map&&e.initTexture(i.map)}}get hasScenery(){return this.houses.length>0}resize(e,t){this.aspect=e/t,this.camera.aspect=this.aspect,this.camera.updateProjectionMatrix()}event(e){this.chaser.event(e);let t=this.fx;switch(e.type){case"coin":t.burst(e.x,e.y,0,5,16766810,{speed:2.4,up:1.5,size:.4,life:.35,grav:3});break;case"power":t.burst(e.x,e.y,0,26,hm[e.kind],{speed:5,up:2,size:.55,life:.6,grav:2}),this.flash=.25;break;case"land":e.fall>.6&&t.burst(this.player.root.position.x,this.player.root.position.y+.1,.2,6,10129280,{speed:2,up:.6,size:.5,life:.4,grav:1});break;case"stumble":this.shake=.35,t.burst(e.x,e.y+1,-.3,10,16777215,{speed:3.5,up:1,size:.35,life:.35});break;case"bump":this.shake=.15;break;case"crash":this.shake=.8,t.burst(e.x,e.y+1,-.6,28,16757575,{speed:6,up:2,size:.6,life:.6,grav:5});break}}ensureSegments(e,t){if(this.segments.length===0){let n=this.sceneryRng.int(160,260);this.segments.push({id:this.nextSegmentId++,kind:"city",modelIndex:0,d0:-60,d1:n}),this.segmentFrontier=n}for(;this.segmentFrontier<e;){let n=this.segments[this.segments.length-1],i=n.kind,r=this.sceneryRng.next(),o;i==="bridge"?o=r<.65?"city":"station":i==="station"?o=r<.6?"city":"bridge":r<.35?o="city":r<.7?o="bridge":o="station";let a=this.sceneryRng.int(0,3);if(o==="city"){let l=[160,220,280,340],c=this.sceneryRng.pick(l);if(i==="city")n.d1+=c,this.segmentFrontier+=c;else{let h=this.segmentFrontier,u=h+c;this.segments.push({id:this.nextSegmentId++,kind:"city",modelIndex:0,d0:h,d1:u}),this.segmentFrontier=u}}else if(o==="bridge"){let l=[64,96,128,160],c=this.sceneryRng.pick(l),h=this.segmentFrontier,u=h+c;this.segments.push({id:this.nextSegmentId++,kind:"bridge",modelIndex:a,d0:h,d1:u}),this.segmentFrontier=u}else{let l=[48,72,96,120],c=this.sceneryRng.pick(l),h=this.segmentFrontier,u=h+c;this.segments.push({id:this.nextSegmentId++,kind:"station",modelIndex:a,d0:h,d1:u}),this.segmentFrontier=u}}this.segments=this.segments.filter(n=>n.d1>t-120)}sync(e,t,n){this.time+=t;let i=e.d;this.ensureSegments(i+jt+120,i);let r=v=>-(v-i);for(let v of this.scrollTex)v.offset.y=i/(Fn/v.repeat.y)%1;for(let v of this.trainPools)v.begin();for(let v in this.pools)this.pools[v].begin();let o=[];for(let v of e.obs){if(v.d0>i+jt||v.d1<i-12)continue;let x=Ht(v.lane);if(v.kind==="train"||v.kind==="mtrain"){let _=(v.variant!==void 0?v.variant:v.id)%4,P=this.trainPools[_];for(let R=0;R<v.cars;R++){let C=v.d0+R*(Oo+ic)+Oo/2;$e.makeTranslation(x,0,r(C)),P.add($e)}v.kind==="mtrain"&&o.push(v)}else $e.makeTranslation(x,0,r((v.d0+v.d1)/2)),this.pools[v.kind].add($e)}for(let v of this.trainPools)v.end();for(let v in this.pools)this.pools[v].end();this.coins.begin(),this.halos.begin(),cm.setFromEuler(jv.set(0,this.time*3.2,0));let a=this.camera.quaternion,l=new se(1,.95,.75).multiplyScalar(.65);for(let v of e.coinList){if(v.d>i+jt-20)continue;let x=r(v.d);$e.compose(Pi.set(v.x,v.y,x),cm,Qv),this.coins.add($e),$e.compose(Pi.set(v.x,v.y,x+.05),a,Ji.set(1.4,1.4,1.4)),this.halos.add($e,l)}for(let v in this.powerCards)this.powerCards[v].begin();for(let v of e.powers){if(v.d>i+jt-20)continue;let x=r(v.d),_=Math.sin(this.time*3+v.d)*.12;$e.compose(Pi.set(Ht(v.lane),v.y+_,x),a,Ji.set(1.1,1.1,1.1)),this.powerCards[v.kind].add($e),$e.compose(Pi.set(Ht(v.lane),v.y+_,x+.05),a,Ji.set(2.6,2.6,2.6)),this.halos.add($e,hm[v.kind])}for(let v in this.powerCards)this.powerCards[v].end();for(let v of o){let x=Ht(v.lane),_=r(v.d0)+.08,P=.75+.25*Math.sin(this.time*14+v.id),C=1.6+Math.max(0,v.d0-i)*.035;for(let q of[-1,1]){let I=q<0?P:1.75-P;$e.compose(Pi.set(x+q*.72,.95,_),a,Ji.set(C,C,C)),this.halos.add($e,um.clone().multiplyScalar(I))}$e.compose(Pi.set(x,2.9,_),a,Ji.set(1.1,1.1,1.1)),this.halos.add($e,eM.clone().multiplyScalar(P));let D=18;$e.compose(Pi.set(x,.06,_+D/2),du,Ji.set(2.2,D,1)),this.halos.add($e,um.clone().multiplyScalar(.35+.15*P))}this.coins.end(),this.halos.end();let c=450,h=Math.floor(i/c)%5,u=["day","sunset","rain","night","snow"],d=this.weatherPresets[u[h]],f=this.weatherPresets[u[(h+1)%5]],p=i%c>370?Math.min(1,(i%c-370)/80):0,y=p>.5?f.sky:d.sky;this.scene.background!==y&&(this.scene.background=y);let g=this.scene.fog;g.color.lerpColors(d.fogColor,f.fogColor,p),g.near=d.fogNear+(f.fogNear-d.fogNear)*p,g.far=d.fogFar+(f.fogFar-d.fogFar)*p,this.sun.color.lerpColors(d.sunColor,f.sunColor,p),this.sun.intensity=d.sunIntensity+(f.sunIntensity-d.sunIntensity)*p,this.hemi.color.lerpColors(d.hemiSky,f.hemiSky,p),this.hemi.groundColor.lerpColors(d.hemiGround,f.hemiGround,p);let m=d.streetlights+(f.streetlights-d.streetlights)*p,b=d.rain+(f.rain-d.rain)*p,T=(d.snow||0)+((f.snow||0)-(d.snow||0))*p;if(b>.25?(this.lightningTimer-=t,this.lightningTimer<=0&&(this.lightningFlash=1,this.lightningTimer=2.5+Math.random()*4.5)):this.lightningTimer=3,this.lightningFlash>0){this.lightningFlash=Math.max(0,this.lightningFlash-t*6.5);let v=Math.sin(this.lightningFlash*25)>.1?this.lightningFlash:this.lightningFlash*.25;this.sun.intensity+=v*6,g.color.lerp(new se("#dbeafe"),v*.85)}this.poles.begin();let M=Math.floor((i-10)/16)*16;for(let v=M;v<i+jt;v+=16)if(!this.segments.some(_=>_.kind==="station"&&v>=_.d0&&v<_.d1)&&($e.makeTranslation(Ii+.3,.25,r(v)),this.poles.add($e),$e.makeRotationY(Math.PI).setPosition(-Ii-.3,.25,r(v+8)),this.poles.add($e),m>.05)){let _=tM.clone().multiplyScalar(.42*m),P=r(v);$e.compose(Pi.set(Ii-.6,.08,P),du,Ji.set(2.8,2.8,1)),this.halos.add($e,_);let R=r(v+8);$e.compose(Pi.set(-Ii+.6,.08,R),du,Ji.set(2.8,2.8,1)),this.halos.add($e,_)}this.poles.end(),this.stationSigns.begin();for(let v of this.segments)if(v.kind==="station")for(let x=v.d0+6;x<v.d1;x+=24)x>=i-20&&x<=i+jt+20&&($e.makeRotationY(-Math.PI/2).setPosition(Ii+.55,1.35,r(x)),this.stationSigns.add($e));this.stationSigns.end();for(let v of this.stationPools)v.begin();for(let v of this.segments){if(v.kind!=="station")continue;let x=this.stationPools[(v.modelIndex||0)%4];for(let _=v.d0+12;_<v.d1;_+=24)_>=i-24&&_<=i+jt+20&&($e.makeTranslation(0,0,r(_)),x.add($e))}for(let v of this.stationPools)v.end();for(let v of this.bridgePools)v.begin();for(let v of this.segments){if(v.kind!=="bridge")continue;let x=this.bridgePools[(v.modelIndex||0)%4];for(let _=v.d0+16;_<v.d1;_+=32)_>=i-32&&_<=i+jt+30&&($e.makeTranslation(0,0,r(_)),x.add($e))}for(let v of this.bridgePools)v.end();this.platformPeople.begin();for(let v of this.segments)if(v.kind==="station"){for(let x=v.d0+12;x<v.d1;x+=24)if(x>=i-24&&x<=i+jt+20){let _=Math.floor(x/24)%2===0?1:-1;$e.makeRotationY(_>0?-Math.PI/2:Math.PI/2).setPosition(_*5.2,.25,r(x)),this.platformPeople.add($e)}}this.platformPeople.end(),this.policeCars.begin();for(let v of this.segments){if(v.kind!=="city")continue;let x=Math.ceil((v.d0+24)/72)*72;for(let _=x;_<=v.d1-24;_+=72)if(_>=i-40&&_<=i+jt+20){let P=Math.floor(_/72)%2===0?1:-1;$e.makeRotationY(P>0?0:Math.PI).setPosition(P*(Xo+1.8),.25,r(_)),this.policeCars.add($e)}}this.policeCars.end();for(let v of this.landmarkPools)v.begin();for(let v of this.segments){let x=v.d0+4;if(x>=i-20&&x<=i+jt+30){let _=Math.abs(v.id)%this.landmarkPools.length;$e.makeTranslation(0,0,r(x)),this.landmarkPools[_].add($e)}}for(let v of this.landmarkPools)v.end();for(let v of this.cinemaPools)v.begin();for(let v of this.segments){if(v.kind!=="city")continue;let x=Math.ceil((v.d0+16)/64)*64;for(let _=x;_<=v.d1-16;_+=64)if(_>=i-30&&_<=i+jt+30){let P=Math.floor(_/64)%2===0?1:-1,R=Math.floor(_/64)%this.cinemaPools.length;$e.makeRotationY(P>0?-Math.PI/2:Math.PI/2).setPosition(P*(Xo+2.2),0,r(_)),this.cinemaPools[R].add($e)}}for(let v of this.cinemaPools)v.end();for(let v of this.shopPools)v.begin();for(let v of this.segments){if(v.kind!=="city")continue;let x=Math.ceil((v.d0+32)/48)*48;for(let _=x;_<=v.d1-20;_+=48)if(_>=i-30&&_<=i+jt+30){let P=Math.floor(_/48)%2===0?-1:1,R=Math.floor(_/48)%this.shopPools.length;$e.makeRotationY(P>0?-Math.PI/2:Math.PI/2).setPosition(P*(Xo+3.2),0,r(_)),this.shopPools[R].add($e)}}for(let v of this.shopPools)v.end();this.syncHouses(i,r),n&&this.player.menu(t),this.chaser.update(e,t,n),this.updateCamera(e,t,n);let w=n||!e.alive?0:Math.max(0,Math.min(1,(e.speed-14)/12));if(this.fx.update(t,this.camera,n||!e.alive?0:e.speed,w,b,T),!n&&e.alive){let v=e.x,x=e.y;if(e.power.shoes>0&&Math.random()<t*30&&this.fx.burst(v+(Math.random()-.5)*.4,x+.1,.3,1,4120714,{speed:.6,up:.4,size:.3,life:.4,grav:0}),e.power.magnet>0&&Math.random()<t*20&&this.fx.burst(v,x+1.2,0,1,16734820,{speed:1.5,up:0,size:.25,life:.3,grav:0,world:!1}),e.power.double>0&&Math.random()<t*12&&this.fx.burst(v,x+2,0,1,16761405,{speed:.8,up:.8,size:.25,life:.5,grav:0,world:!1}),e.power.jet>0)if(this.rocketJet.visible=!0,e.power.jet<1.8&&Math.sin(this.time*35)<0)this.fx.burst(v,x+.4,.4,1,6583435,{speed:1.2,up:-1,size:.45,life:.4,grav:0});else for(let R of[-.15,.15])this.fx.burst(v+R,x+.6,.35,3,16729344,{speed:4.5,up:-5.5,size:.35,life:.28,grav:0}),this.fx.burst(v+R,x+.5,.35,2,16763904,{speed:3,up:-4.5,size:.25,life:.22,grav:0}),Math.random()<.35&&this.fx.burst(v+R,x+.3,.45,1,14870768,{speed:1.5,up:-2,size:.4,life:.35,grav:0});else this.rocketJet.visible=!1}else this.rocketJet.visible=!1}syncHouses(e,t){if(this.houses.length){this.placed=this.placed.filter(n=>n.d+n.len/2>e-60);for(let n of[0,1]){this.nextHouse[n]<e-60&&(this.nextHouse[n]=e-60);let i=0;for(;this.nextHouse[n]<e+jt&&i++<40;){let r=this.nextHouse[n],o=this.segments.find(d=>r>=d.d0&&r<d.d1);if(!o)break;if(o.kind!=="city"){this.nextHouse[n]=o.d1+2;continue}let a=new Array(this.houses.length).fill(0);for(let d of this.placed)a[d.type]++;let l=this.houses.map((d,f)=>f).filter(d=>a[d]<this.houses[d].capacity);if(!l.length)break;let c=this.rng.pick(l),{len:h,depth:u}=this.houseSize[c];if(r+h>o.d1){this.nextHouse[n]=o.d1+2;continue}this.placed.push({type:c,side:n,d:r+h/2,len:h,depth:u}),this.nextHouse[n]+=h+this.rng.range(1,4)}}for(let n of this.houses)n.begin();for(let n of this.placed){let i=n.side===0?1:-1;$e.makeRotationY(i>0?-Math.PI/2:Math.PI/2).setPosition(i*(Xo+.6+n.depth/2),0,t(n.d)),this.houses[n.type].add($e)}for(let n of this.houses)n.end()}}resetScenery(e){this.placed=[],this.nextHouse=[-60,-60],this.segments=[],this.segmentFrontier=0,this.nextSegmentId=0;let t=e!==void 0?e:(Date.now()^Math.floor(Math.random()*2147483647))>>>0;this.sceneryRng=new Ri(t),this.rocketJet.visible=!1,this.player.reset(),this.chaser.reset()}updateCamera(e,t,n){let i=this.camera,r=Math.max(0,Math.min(1,(1.2-this.aspect)/.72));if(n){let p=this.time*.15,y=this.aspect>1.25;i.position.set(Math.sin(p)*.8+(y?-1.2:0),1.7+r*.2,-4.2-r*.6),i.fov=52+r*4,i.updateProjectionMatrix(),i.lookAt(y?-2.2:0,y?.95:.45-r*.15,0),this.camY=0;return}let o=e.grounded?e.y:Math.max(e.groundY,Math.min(e.y,this.camY+1));this.camY+=(o-this.camY)*Math.min(1,t*5);let a=5.2-r*1.1,l=2.65-r*.2,c=e.x,h=0,u=0;if(this.shake>0){this.shake=Math.max(0,this.shake-t);let p=this.shake*.5;h=(Math.random()-.5)*p,u=(Math.random()-.5)*p}i.position.set(c+h,this.camY+l+u,a);let d=Math.max(0,Math.min(1,(e.speed-12)/15)),f=56-r*3+d*7;Math.abs(i.fov-f)>.01&&(i.fov+=(f-i.fov)*Math.min(1,t*3),i.updateProjectionMatrix()),i.lookAt(e.x,this.camY+(e.power.jet>0?.75:1.15),e.power.jet>0?-22:-17)}takeFlash(){let e=this.flash;return this.flash=0,e}warm(e){let t=[...this.trainPools,this.pools.low,this.pools.hurdle,this.pools.overhead,this.pools.ramp,this.coins,this.halos,this.poles,this.stationSigns,this.policeCars,this.platformPeople,...this.bridgePools,...this.stationPools,...this.landmarkPools,...this.cinemaPools,...this.shopPools,...Object.values(this.powerCards),...this.houses];for(let n of t)n.begin(),$e.makeTranslation(0,1,-6),n.add($e,new se(1,1,1)),n.end();this.fx.warm(this.camera);for(let n of Object.values(this.player.actions))n.play();e.compile(this.scene,this.camera),e.render(this.scene,this.camera);for(let n of Object.values(this.player.actions))n.stop();this.player.current=null;for(let n of t)n.begin(),n.end();this.fx.clear()}};var _c=class extends ti{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new yu(t)}),this.register(function(t){return new vu(t)}),this.register(function(t){return new Mu(t)}),this.register(function(t){return new Pu(t)}),this.register(function(t){return new Iu(t)}),this.register(function(t){return new Lu(t)}),this.register(function(t){return new Su(t)}),this.register(function(t){return new Eu(t)}),this.register(function(t){return new Tu(t)}),this.register(function(t){return new wu(t)}),this.register(function(t){return new _u(t)}),this.register(function(t){return new Au(t)}),this.register(function(t){return new bu(t)}),this.register(function(t){return new Cu(t)}),this.register(function(t){return new Ru(t)}),this.register(function(t){return new gu(t)}),this.register(function(t){return new yc(t,at.EXT_MESHOPT_COMPRESSION)}),this.register(function(t){return new yc(t,at.KHR_MESHOPT_COMPRESSION)}),this.register(function(t){return new Nu(t)})}load(e,t,n,i){let r=this,o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){let c=Ei.extractUrlBase(e);o=Ei.resolveURL(c,this.path)}else o=Ei.extractUrlBase(e);this.manager.itemStart(e);let a=function(c){i?i(c):console.error(c),r.manager.itemError(e),r.manager.itemEnd(e)},l=new cr(this.manager);l.setPriority(this.priority),l.setCache(this.cache),l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{r.parse(c,o,function(h){t(h),r.manager.itemEnd(e)},a)}catch(h){a(h)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let r,o={},a={},l=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===gm){try{o[at.KHR_BINARY_GLTF]=new Du(e)}catch(u){i&&i(u);return}r=JSON.parse(o[at.KHR_BINARY_GLTF].content)}else r=JSON.parse(l.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let c=new zu(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,priority:this.priority,cache:this.cache,withCredentials:this.withCredentials,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){let u=this.pluginCallbacks[h](c);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[u.name]=u,o[u.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){let u=r.extensionsUsed[h],d=r.extensionsRequired||[];switch(u){case at.KHR_MATERIALS_UNLIT:o[u]=new xu;break;case at.KHR_DRACO_MESH_COMPRESSION:o[u]=new Uu(r,this.dracoLoader);break;case at.KHR_TEXTURE_TRANSFORM:o[u]=new Ou;break;case at.KHR_MESH_QUANTIZATION:o[u]=new Fu;break;default:d.indexOf(u)>=0&&a[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}c.setExtensions(o),c.setPlugins(a),c.parse(n,i)}parseAsync(e,t){let n=this;return new Promise(function(i,r){n.parse(e,t,i,r)})}};function nM(){let s={};return{get:function(e){return s[e]},add:function(e,t){s[e]=t},remove:function(e){delete s[e]},removeAll:function(){s={}}}}function Nt(s,e,t){let n=s.json.materials[e];return n.extensions&&n.extensions[t]?n.extensions[t]:null}var at={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DIFFUSE_ROUGHNESS:"KHR_materials_diffuse_roughness",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",KHR_MESHOPT_COMPRESSION:"KHR_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},gu=class{constructor(e){this.parser=e,this.name=at.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){let r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n="light:"+e,i=t.cache.get(n);if(i)return i;let r=t.json,l=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e],c,h=new se(16777215);l.color!==void 0&&h.setRGB(l.color[0],l.color[1],l.color[2],dn);let u=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new xs(h),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new yo(h),c.distance=u;break;case"spot":c=new _o(h),c.distance=u,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),oi(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),i=Promise.resolve(c),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,r=n.json.nodes[e],a=(r.extensions&&r.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(l){return n._getNodeRef(t.cache,a,l)})}},xu=class{constructor(){this.name=at.KHR_MATERIALS_UNLIT}getMaterialType(){return pt}extendParams(e,t,n){let i=[];e.color=new se(1,1,1),e.opacity=1;let r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){let o=r.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],dn),e.opacity=o[3]}r.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",r.baseColorTexture,Pt))}return Promise.all(i)}},_u=class{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let n=Nt(this.parser,e,this.name);return n===null||n.emissiveStrength!==void 0&&(t.emissiveIntensity=n.emissiveStrength),Promise.resolve()}},yu=class{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){return Nt(this.parser,e,this.name)!==null?mn:null}extendMaterialParams(e,t){let n=Nt(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];if(n.clearcoatFactor!==void 0&&(t.clearcoat=n.clearcoatFactor),n.clearcoatTexture!==void 0&&i.push(this.parser.assignTexture(t,"clearcoatMap",n.clearcoatTexture)),n.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=n.clearcoatRoughnessFactor),n.clearcoatRoughnessTexture!==void 0&&i.push(this.parser.assignTexture(t,"clearcoatRoughnessMap",n.clearcoatRoughnessTexture)),n.clearcoatNormalTexture!==void 0&&(i.push(this.parser.assignTexture(t,"clearcoatNormalMap",n.clearcoatNormalTexture)),n.clearcoatNormalTexture.scale!==void 0)){let r=n.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new ye(r,r)}return Promise.all(i)}},vu=class{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_DIFFUSE_ROUGHNESS}getMaterialType(e){return Nt(this.parser,e,this.name)!==null?mn:null}extendMaterialParams(e,t){let n=Nt(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];return t.diffuseRoughness=n.diffuseRoughnessFactor!==void 0?n.diffuseRoughnessFactor:0,n.diffuseRoughnessTexture!==void 0&&i.push(this.parser.assignTexture(t,"diffuseRoughnessMap",n.diffuseRoughnessTexture)),Promise.all(i)}},Mu=class{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_DISPERSION}getMaterialType(e){return Nt(this.parser,e,this.name)!==null?mn:null}extendMaterialParams(e,t){let n=Nt(this.parser,e,this.name);return n===null||(t.dispersion=n.dispersion!==void 0?n.dispersion:0),Promise.resolve()}},bu=class{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){return Nt(this.parser,e,this.name)!==null?mn:null}extendMaterialParams(e,t){let n=Nt(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];return n.iridescenceFactor!==void 0&&(t.iridescence=n.iridescenceFactor),n.iridescenceTexture!==void 0&&i.push(this.parser.assignTexture(t,"iridescenceMap",n.iridescenceTexture)),n.iridescenceIor!==void 0&&(t.iridescenceIOR=n.iridescenceIor),n.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessMinimum=n.iridescenceThicknessMinimum),n.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessMaximum=n.iridescenceThicknessMaximum),n.iridescenceThicknessTexture!==void 0&&i.push(this.parser.assignTexture(t,"iridescenceThicknessMap",n.iridescenceThicknessTexture)),Promise.all(i)}},Su=class{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_SHEEN}getMaterialType(e){return Nt(this.parser,e,this.name)!==null?mn:null}extendMaterialParams(e,t){let n=Nt(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];if(t.sheenColor=new se(0,0,0),t.sheenRoughness=0,t.sheen=1,n.sheenColorFactor!==void 0){let r=n.sheenColorFactor;t.sheenColor.setRGB(r[0],r[1],r[2],dn)}return n.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=n.sheenRoughnessFactor),n.sheenColorTexture!==void 0&&i.push(this.parser.assignTexture(t,"sheenColorMap",n.sheenColorTexture,Pt)),n.sheenRoughnessTexture!==void 0&&i.push(this.parser.assignTexture(t,"sheenRoughnessMap",n.sheenRoughnessTexture)),Promise.all(i)}},Eu=class{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){return Nt(this.parser,e,this.name)!==null?mn:null}extendMaterialParams(e,t){let n=Nt(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];return n.transmissionFactor!==void 0&&(t.transmission=n.transmissionFactor),n.transmissionTexture!==void 0&&i.push(this.parser.assignTexture(t,"transmissionMap",n.transmissionTexture)),Promise.all(i)}},Tu=class{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_VOLUME}getMaterialType(e){return Nt(this.parser,e,this.name)!==null?mn:null}extendMaterialParams(e,t){let n=Nt(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];t.thickness=n.thicknessFactor!==void 0?n.thicknessFactor:0,n.thicknessTexture!==void 0&&i.push(this.parser.assignTexture(t,"thicknessMap",n.thicknessTexture)),t.attenuationDistance=n.attenuationDistance||1/0;let r=n.attenuationColor||[1,1,1];return t.attenuationColor=new se().setRGB(r[0],r[1],r[2],dn),Promise.all(i)}},wu=class{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_IOR}getMaterialType(e){return Nt(this.parser,e,this.name)!==null?mn:null}extendMaterialParams(e,t){let n=Nt(this.parser,e,this.name);return n===null||(t.ior=n.ior!==void 0?n.ior:1.5,t.ior===0&&(t.ior=1e3)),Promise.resolve()}},Au=class{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_SPECULAR}getMaterialType(e){return Nt(this.parser,e,this.name)!==null?mn:null}extendMaterialParams(e,t){let n=Nt(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];t.specularIntensity=n.specularFactor!==void 0?n.specularFactor:1,n.specularTexture!==void 0&&i.push(this.parser.assignTexture(t,"specularIntensityMap",n.specularTexture));let r=n.specularColorFactor||[1,1,1];return t.specularColor=new se().setRGB(r[0],r[1],r[2],dn),n.specularColorTexture!==void 0&&i.push(this.parser.assignTexture(t,"specularColorMap",n.specularColorTexture,Pt)),Promise.all(i)}},Ru=class{constructor(e){this.parser=e,this.name=at.EXT_MATERIALS_BUMP}getMaterialType(e){return Nt(this.parser,e,this.name)!==null?mn:null}extendMaterialParams(e,t){let n=Nt(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];return t.bumpScale=n.bumpFactor!==void 0?n.bumpFactor:1,n.bumpTexture!==void 0&&i.push(this.parser.assignTexture(t,"bumpMap",n.bumpTexture)),Promise.all(i)}},Cu=class{constructor(e){this.parser=e,this.name=at.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){return Nt(this.parser,e,this.name)!==null?mn:null}extendMaterialParams(e,t){let n=Nt(this.parser,e,this.name);if(n===null)return Promise.resolve();let i=[];return n.anisotropyStrength!==void 0&&(t.anisotropy=n.anisotropyStrength),n.anisotropyRotation!==void 0&&(t.anisotropyRotation=n.anisotropyRotation),n.anisotropyTexture!==void 0&&i.push(this.parser.assignTexture(t,"anisotropyMap",n.anisotropyTexture)),Promise.all(i)}},Pu=class{constructor(e){this.parser=e,this.name=at.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;let r=i.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,o)}},Iu=class{constructor(e){this.parser=e,this.name=at.EXT_TEXTURE_WEBP}loadTexture(e){let t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;let o=r.extensions[t],a=i.images[o.source],l=n.textureLoader;if(a.uri){let c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return n.loadTextureImage(e,o.source,l)}},Lu=class{constructor(e){this.parser=e,this.name=at.EXT_TEXTURE_AVIF}loadTexture(e){let t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;let o=r.extensions[t],a=i.images[o.source],l=n.textureLoader;if(a.uri){let c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return n.loadTextureImage(e,o.source,l)}},yc=class{constructor(e,t){this.name=t,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let i=n.extensions[this.name],r=this.parser.getDependency("buffer",i.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(a){let l=i.byteOffset||0,c=i.byteLength||0,h=i.count,u=i.byteStride,d=new Uint8Array(a,l,c);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(h,u,d,i.mode,i.filter).then(function(f){return f.buffer}):o.ready.then(function(){let f=new ArrayBuffer(h*u);return o.decodeGltfBuffer(new Uint8Array(f),h,u,d,i.mode,i.filter),f})})}else return null}},Nu=class{constructor(e){this.name=at.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let i=t.meshes[n.mesh];for(let c of i.primitives)if(c.mode!==Bn.TRIANGLES&&c.mode!==Bn.TRIANGLE_STRIP&&c.mode!==Bn.TRIANGLE_FAN&&c.mode!==void 0)return null;let o=n.extensions[this.name].attributes,a=[],l={};for(let c in o)a.push(this.parser.getDependency("accessor",o[c]).then(h=>(l[c]=h,l[c])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(c=>{let h=c.pop(),u=h.isGroup?h.children:[h],d=c[0].count,f=[];for(let p of u){let y=new We,g=new N,m=new Ot,b=new N(1,1,1),T=new Ln(p.geometry,p.material,d);for(let w=0;w<d;w++)l.TRANSLATION&&g.fromBufferAttribute(l.TRANSLATION,w),l.ROTATION&&m.fromBufferAttribute(l.ROTATION,w),l.SCALE&&b.fromBufferAttribute(l.SCALE,w),T.setMatrixAt(w,y.compose(g,m,b));let M=null;for(let w in l)if(w==="_COLOR_0"){let v=l[w];T.instanceColor=new xi(v.array,v.itemSize,v.normalized)}else if(w!=="TRANSLATION"&&w!=="ROTATION"&&w!=="SCALE"){if(M===null){let x=T.geometry;M=new Ut,M.name=x.name;for(let _ in x.attributes)M.setAttribute(_,x.attributes[_]);for(let _ in x.morphAttributes)M.morphAttributes[_]=x.morphAttributes[_];x.index!==null&&M.setIndex(x.index),M.morphTargetsRelative=x.morphTargetsRelative;for(let _ of x.groups)M.addGroup(_.start,_.count,_.materialIndex);x.boundingBox!==null&&(M.boundingBox=x.boundingBox.clone()),x.boundingSphere!==null&&(M.boundingSphere=x.boundingSphere.clone()),M.drawRange.start=x.drawRange.start,M.drawRange.count=x.drawRange.count,M.userData=Object.assign({},x.userData),T.geometry=M}let v=l[w];M.setAttribute(w,new xi(v.array,v.itemSize,v.normalized))}Rt.prototype.copy.call(T,p),this.parser.assignFinalMaterial(T),f.push(T)}return h.isGroup?(h.clear(),h.add(...f),h):f[0]}))}},gm="glTF",qo=12,dm={JSON:1313821514,BIN:5130562},Du=class{constructor(e){this.name=at.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,qo),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==gm)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let i=this.header.length-qo,r=new DataView(e,qo),o=0;for(;o<i;){let a=r.getUint32(o,!0);o+=4;let l=r.getUint32(o,!0);if(o+=4,l===dm.JSON){let c=new Uint8Array(e,qo+o,a);this.content=n.decode(c)}else if(l===dm.BIN){let c=qo+o;this.body=e.slice(c,c+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},Uu=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=at.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,i=this.dracoLoader,r=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},l={},c={};for(let h in o){let u=Hu[h]||h.toLowerCase();a[u]=o[h]}for(let h in e.attributes){let u=Hu[h]||h.toLowerCase();if(o[h]!==void 0){let d=n.accessors[e.attributes[h]],f=br[d.componentType];c[u]=f.name,l[u]=d.normalized===!0}}return t.getDependency("bufferView",r).then(function(h){return new Promise(function(u,d){i.decodeDracoFile(h,function(f){for(let p in f.attributes){let y=f.attributes[p],g=l[p];g!==void 0&&(y.normalized=g)}u(f)},a,c,dn,d)})})}},Ou=class{constructor(){this.name=at.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){if((t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0)return e;if(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),t.rotation!==void 0){let n=Math.cos(e.rotation),i=Math.sin(e.rotation);e.matrix.set(e.repeat.x*n,e.repeat.y*i,e.offset.x,-e.repeat.x*i,e.repeat.y*n,e.offset.y,0,0,1),e.matrixAutoUpdate=!1}return e.needsUpdate=!0,e}},Fu=class{constructor(){this.name=at.KHR_MESH_QUANTIZATION}},vc=class extends ei{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i*3+i;for(let o=0;o!==i;o++)t[o]=n[r+o];return t}interpolate_(e,t,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=a*2,c=a*3,h=i-t,u=(n-t)/h,d=u*u,f=d*u,p=e*c,y=p-c,g=-2*f+3*d,m=f-d,b=1-g,T=m-d+u;for(let M=0;M!==a;M++){let w=o[y+M+a],v=o[y+M+l]*h,x=o[p+M+a],_=o[p+M]*h;r[M]=b*w+T*v+g*x+m*_}return r}},iM=new Ot,Bu=class extends vc{interpolate_(e,t,n,i){let r=super.interpolate_(e,t,n,i);return iM.fromArray(r).normalize().toArray(r),r}},Bn={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},br={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},fm={9728:Ft,9729:Bt,9984:ol,9985:mr,9986:bs,9987:yn},pm={33071:Cn,33648:qs,10497:jn},fu={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Hu={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Zi={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},sM={CUBICSPLINE:void 0,LINEAR:cs,STEP:ls},pu={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function rM(s){return s.DefaultMaterial===void 0&&(s.DefaultMaterial=new yi({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Dn})),s.DefaultMaterial}function Rs(s,e,t){for(let n in t.extensions)s[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function oi(s,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(s.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function oM(s,e,t){let n=!1,i=!1,r=!1;for(let c=0,h=e.length;c<h;c++){let u=e[c];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(i=!0),u.COLOR_0!==void 0&&(r=!0),n&&i&&r)break}if(!n&&!i&&!r)return Promise.resolve(s);let o=[],a=[],l=[];for(let c=0,h=e.length;c<h;c++){let u=e[c];if(n){let d=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):s.attributes.position;o.push(d)}if(i){let d=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):s.attributes.normal;a.push(d)}if(r){let d=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):s.attributes.color;l.push(d)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l)]).then(function(c){let h=c[0],u=c[1],d=c[2];return n&&(s.morphAttributes.position=h),i&&(s.morphAttributes.normal=u),r&&(s.morphAttributes.color=d),s.morphTargetsRelative=!0,s})}function aM(s,e){if(s.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)s.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(s.morphTargetInfluences.length===t.length){s.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)s.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function lM(s){let e,t=s.extensions&&s.extensions[at.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+mu(t.attributes):e=s.indices+":"+mu(s.attributes)+":"+s.mode,s.targets!==void 0)for(let n=0,i=s.targets.length;n<i;n++)e+=":"+mu(s.targets[n]);return e}function mu(s){let e="",t=Object.keys(s).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+s[t[n]]+";";return e}function ku(s){switch(s){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function cM(s){return s.search(/\.jpe?g($|\?)/i)>0||s.search(/^data\:image\/jpeg/)===0?"image/jpeg":s.search(/\.webp($|\?)/i)>0||s.search(/^data\:image\/webp/)===0?"image/webp":s.search(/\.ktx2($|\?)/i)>0||s.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}var hM=new We,zu=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new nM,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,r=!1,o=-1;if(typeof navigator<"u"&&typeof navigator.userAgent<"u"){let a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;let l=a.match(/Version\/(\d+)/);i=n&&l?parseInt(l[1],10):-1,r=a.indexOf("Firefox")>-1,o=r?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||r&&o<98?(this.textureLoader=new mo(this.options.manager),this.textureLoader.setPriority(this.options.priority),this.textureLoader.setCache(this.options.cache)):(this.textureLoader=new Mo(this.options.manager),this.textureLoader.setPriority(this.options.priority),this.textureLoader.setCache(this.options.cache)),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setWithCredentials(this.options.withCredentials),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new cr(this.options.manager),this.fileLoader.setPriority(this.options.priority),this.fileLoader.setCache(this.options.cache),this.fileLoader.setResponseType("arraybuffer"),(this.options.withCredentials||this.options.crossOrigin==="use-credentials")&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,i=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){let a={scene:o[0][i.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:i.asset,parser:n,userData:{}};return Rs(r,a,i),oi(a,i),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(a)})).then(function(){for(let l of a.scenes)l.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,r=t.length;i<r;i++){let o=t[i].joints;for(let a=0,l=o.length;a<l;a++)e[o[a]].isBone=!0}for(let i=0,r=e.length;i<r;i++){let o=e[i];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let i=n.clone(),r=(o,a)=>{let l=this.associations.get(o);l!=null&&this.associations.set(a,l);for(let[c,h]of o.children.entries())r(h,a.children[c])};return r(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let i=e(t[n]);if(i)return i}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let i=0;i<t.length;i++){let r=e(t[i]);r&&n.push(r)}return n}getDependency(e,t){let n=e+":"+t,i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":i=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(r,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[at.KHR_BINARY_GLTF].body);let i=this.options;return new Promise(function(r,o){n.load(Ei.resolveURL(t.uri,i.path),r,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){let i=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+i)})}loadAccessor(e){let t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){let o=fu[i.type],a=br[i.componentType],l=i.normalized===!0,c=new a(i.count*o);return Promise.resolve(new Zt(c,o,l))}let r=[];return i.bufferView!==void 0?r.push(this.getDependency("bufferView",i.bufferView)):r.push(null),i.sparse!==void 0&&(r.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(r).then(function(o){let a=o[0],l=fu[i.type],c=br[i.componentType],h=c.BYTES_PER_ELEMENT,u=h*l,d=i.byteOffset||0,f=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,p=i.normalized===!0,y,g;if(f&&f!==u){let m=Math.floor(d/f),b="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+m+":"+i.count,T=t.cache.get(b);T||(y=new c(a,m*f,i.count*f/h),T=new js(y,f/h),t.cache.add(b,T)),g=new Qs(T,l,d%f/h,p)}else a===null?y=new c(i.count*l):y=new c(a,d,i.count*l),g=new Zt(y,l,p);if(i.sparse!==void 0){let m=fu.SCALAR,b=br[i.sparse.indices.componentType],T=i.sparse.indices.byteOffset||0,M=i.sparse.values.byteOffset||0,w=new b(o[1],T,i.sparse.count*m),v=new c(o[2],M,i.sparse.count*l);a!==null&&(g=new Zt(g.array.slice(),g.itemSize,g.normalized)),g.normalized=!1;for(let x=0,_=w.length;x<_;x++){let P=w[x];if(g.setX(P,v[x*l]),l>=2&&g.setY(P,v[x*l+1]),l>=3&&g.setZ(P,v[x*l+2]),l>=4&&g.setW(P,v[x*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}g.normalized=p}return g})}loadTexture(e){let t=this.json,n=this.options,r=t.textures[e].source,o=t.images[r],a=this.textureLoader;if(o.uri){let l=n.manager.getHandler(o.uri);l!==null&&(a=l)}return this.loadTextureImage(e,r,a)}loadTextureImage(e,t,n){let i=this,r=this.json,o=r.textures[e],a=r.images[t],l=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[l])return this.textureCache[l];let c=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=o.name||a.name||"",h.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(h.name=a.uri);let d=(r.samplers||{})[o.sampler]||{};return h.magFilter=fm[d.magFilter]||Bt,h.minFilter=fm[d.minFilter]||yn,h.wrapS=pm[d.wrapS]||jn,h.wrapT=pm[d.wrapT]||jn,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==Ft&&h.minFilter!==Bt,i.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){let n=this,i=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(d=>d.clone());let o=i.images[e],a=self.URL||self.webkitURL,l=o.uri||"",c=!1,h;if(t.isKTX2Loader===!0&&o.bufferView!==void 0)h=n.getDependency("bufferView",o.bufferView).then(function(d){return new Promise(function(f,p){t.parse(d,f,p)})});else{if(o.bufferView!==void 0)l=n.getDependency("bufferView",o.bufferView).then(function(d){c=!0;let f=new Blob([d],{type:o.mimeType});return l=a.createObjectURL(f),l});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");h=Promise.resolve(l).then(function(d){return new Promise(function(f,p){let y=f;t.isImageBitmapLoader===!0&&(y=function(g){let m=new Wt(g);m.needsUpdate=!0,f(m)}),t.load(Ei.resolveURL(d,r.path),y,void 0,p)})})}let u=h.then(function(d){return c===!0&&a.revokeObjectURL(l),oi(d,o),d.userData.mimeType=o.mimeType||cM(o.uri),d}).catch(function(d){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),d});return this.sourceCache[e]=u,u}assignTexture(e,t,n,i){let r=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),r.extensions[at.KHR_TEXTURE_TRANSFORM]){let a=n.extensions!==void 0?n.extensions[at.KHR_TEXTURE_TRANSFORM]:void 0;if(a){let l=r.associations.get(o);o=r.extensions[at.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),r.associations.set(o,l)}}return i!==void 0&&(o.colorSpace=i),e[t]=o,o})}assignFinalMaterial(e){let t=e.geometry,n=e.material,i=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){let a="PointsMaterial:"+n.uuid,l=this.cache.get(a);l||(l=new ir,pn.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(a,l)),n=l}else if(e.isLine){let a="LineBasicMaterial:"+n.uuid,l=this.cache.get(a);l||(l=new nr,pn.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(a,l)),n=l}if(i||r||o){let a="ClonedMaterial:"+n.uuid+":";i&&(a+="derivative-tangents:"),r&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let l=this.cache.get(a);l||(l=n.clone(),r&&(l.vertexColors=!0),o&&(l.flatShading=!0),i&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(a,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return yi}loadMaterial(e){let t=this,n=this.json,i=this.extensions,r=n.materials[e],o,a={},l=r.extensions||{},c=[];if(l[at.KHR_MATERIALS_UNLIT]){let u=i[at.KHR_MATERIALS_UNLIT];o=u.getMaterialType(),c.push(u.extendParams(a,r,t))}else{let u=r.pbrMetallicRoughness||{};if(a.color=new se(1,1,1),a.opacity=1,Array.isArray(u.baseColorFactor)){let d=u.baseColorFactor;a.color.setRGB(d[0],d[1],d[2],dn),a.opacity=d[3]}u.baseColorTexture!==void 0&&c.push(t.assignTexture(a,"map",u.baseColorTexture,Pt)),a.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,a.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(a,"metalnessMap",u.metallicRoughnessTexture)),c.push(t.assignTexture(a,"roughnessMap",u.metallicRoughnessTexture))),o=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,a)})))}r.doubleSided===!0&&(a.side=an);let h=r.alphaMode||pu.OPAQUE;if(h===pu.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,h===pu.MASK&&(a.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&o!==pt&&(c.push(t.assignTexture(a,"normalMap",r.normalTexture)),a.normalScale=new ye(1,1),r.normalTexture.scale!==void 0)){let u=r.normalTexture.scale;a.normalScale.set(u,u)}if(r.occlusionTexture!==void 0&&o!==pt&&(c.push(t.assignTexture(a,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&o!==pt){let u=r.emissiveFactor;a.emissive=new se().setRGB(u[0],u[1],u[2],dn)}return r.emissiveTexture!==void 0&&o!==pt&&c.push(t.assignTexture(a,"emissiveMap",r.emissiveTexture,Pt)),Promise.all(c).then(function(){let u=new o(a);return r.name&&(u.name=r.name),oi(u,r),t.associations.set(u,{materials:e}),r.extensions&&Rs(i,u,r),u})}createUniqueName(e){let t=St.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,i=this.primitiveCache;function r(a){return n[at.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(l){return mm(l,a,t)})}let o=[];for(let a=0,l=e.length;a<l;a++){let c=e[a],h=lM(c),u=i[h];if(u)o.push(u.promise);else{let d;c.extensions&&c.extensions[at.KHR_DRACO_MESH_COMPRESSION]?d=r(c):d=mm(new Ut,c,t),c.mode===Bn.TRIANGLE_STRIP?d=d.then(f=>hu(f,Po)):c.mode===Bn.TRIANGLE_FAN&&(d=d.then(f=>hu(f,xr))),i[h]={primitive:c,promise:d},o.push(d)}}return Promise.all(o)}loadMesh(e){let t=this,n=this.json,i=this.extensions,r=n.meshes[e],o=r.primitives,a=[];for(let l=0,c=o.length;l<c;l++){let h=o[l].material===void 0?rM(this.cache):this.getDependency("material",o[l].material);a.push(h)}return a.push(t.loadGeometries(o)),Promise.all(a).then(async function(l){let c=l.slice(0,l.length-1),h=l[l.length-1],u=[];for(let f=0,p=h.length;f<p;f++){let y=h[f],g=o[f],m,b=c[f];if(g.mode===Bn.TRIANGLES||g.mode===Bn.TRIANGLE_STRIP||g.mode===Bn.TRIANGLE_FAN||g.mode===void 0){let T=r.isSkinnedMesh===!0,M=y.hasAttribute("skinIndex")&&y.hasAttribute("skinWeight");T&&M===!1&&console.warn("THREE.GLTFLoader: Missing skinIndex or skinWeight attributes. Skinning disabled."),m=T&&M?new Kr(y,b):new k(y,b),m.isSkinnedMesh===!0&&m.normalizeSkinWeights()}else if(g.mode===Bn.LINES)m=new Zr(y,b);else if(g.mode===Bn.LINE_STRIP)m=new ds(y,b);else if(g.mode===Bn.LINE_LOOP)m=new $r(y,b);else if(g.mode===Bn.POINTS)m=new jr(y,b);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+g.mode);Object.keys(m.geometry.morphAttributes).length>0&&aM(m,r),m.name=t.createUniqueName(r.name||"mesh_"+e),oi(m,r),g.extensions&&Rs(i,m,g),t.assignFinalMaterial(m),u.push(m)}for(let f=0,p=u.length;f<p;f++)t.associations.set(u[f],{meshes:e,primitives:f});if(u.length===1)return r.extensions&&Rs(i,u[0],r),u[0];let d=new Xe;r.extensions&&Rs(i,d,r),t.associations.set(d,{meshes:e});for(let f=0,p=u.length;f<p;f++)d.add(u[f]);return d})}loadCamera(e){let t,n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Vt(Kl.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new gs(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),oi(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let i=0,r=t.joints.length;i<r;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){let r=i.pop(),o=i,a=[],l=[];for(let c=0,h=o.length;c<h;c++){let u=o[c];if(u){a.push(u);let d=new We;r!==null&&d.fromArray(r.array,c*16),l.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new Jr(a,l)})}loadAnimation(e){let t=this.json,n=this,i=t.animations[e],r=i.name?i.name:"animation_"+e,o=[],a=[],l=[],c=[],h=[];for(let u=0,d=i.channels.length;u<d;u++){let f=i.channels[u],p=i.samplers[f.sampler],y=f.target,g=y.node,m=i.parameters!==void 0?i.parameters[p.input]:p.input,b=i.parameters!==void 0?i.parameters[p.output]:p.output;y.node!==void 0&&(o.push(this.getDependency("node",g)),a.push(this.getDependency("accessor",m)),l.push(this.getDependency("accessor",b)),c.push(p),h.push(y))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l),Promise.all(c),Promise.all(h)]).then(function(u){let d=u[0],f=u[1],p=u[2],y=u[3],g=u[4],m=[];for(let T=0,M=d.length;T<M;T++){let w=d[T],v=f[T],x=p[T],_=y[T],P=g[T];if(w===void 0)continue;w.updateMatrix&&w.updateMatrix();let R=n._createAnimationTracks(w,v,x,_,P);if(R)for(let C=0;C<R.length;C++)m.push(R[C])}let b=new ms(r,void 0,m);return oi(b,i),b})}createNodeMesh(e){let t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(r){let o=n._getNodeRef(n.meshCache,i.mesh,r);return i.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let l=0,c=i.weights.length;l<c;l++)a.morphTargetInfluences[l]=i.weights[l]}),o})}loadNode(e){let t=this.json,n=this,i=t.nodes[e],r=n._loadNodeShallow(e),o=[],a=i.children||[];for(let c=0,h=a.length;c<h;c++)o.push(n.getDependency("node",a[c]));let l=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([r,Promise.all(o),l]).then(function(c){let h=c[0],u=c[1],d=c[2];d!==null&&h.traverse(function(f){f.isSkinnedMesh&&f.bind(d,hM)});for(let f=0,p=u.length;f<p;f++)h.add(u[f]);if(h.userData.pivot!==void 0&&u.length>0){let f=h.userData.pivot,p=u[0];h.pivot=new N().fromArray(f),h.position.x-=f[0],h.position.y-=f[1],h.position.z-=f[2],p.position.set(0,0,0),delete h.userData.pivot}return h})}_loadNodeShallow(e){let t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let r=t.nodes[e],o=r.name?i.createUniqueName(r.name):"",a=[],l=i._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&a.push(l),r.camera!==void 0&&a.push(i.getDependency("camera",r.camera).then(function(c){return i._getNodeRef(i.cameraCache,r.camera,c)})),i._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){a.push(c)}),this.nodeCache[e]=Promise.all(a).then(function(c){let h;if(r.isBone===!0?h=new er:c.length>1?h=new Xe:c.length===1?h=c[0]:h=new Rt,h!==c[0])for(let u=0,d=c.length;u<d;u++)h.add(c[u]);if(r.name&&(h.userData.name=r.name,h.name=o),oi(h,r),r.extensions&&Rs(n,h,r),r.matrix!==void 0){let u=new We;u.fromArray(r.matrix),h.applyMatrix4(u)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);if(!i.associations.has(h))i.associations.set(h,{});else if(r.mesh!==void 0&&i.meshCache.refs[r.mesh]>1){let u=i.associations.get(h);i.associations.set(h,{...u})}return i.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],i=this,r=new Xe;n.name&&(r.name=i.createUniqueName(n.name)),oi(r,n),n.extensions&&Rs(t,r,n);let o=n.nodes||[],a=[];for(let l=0,c=o.length;l<c;l++)a.push(i.getDependency("node",o[l]));return Promise.all(a).then(function(l){for(let h=0,u=l.length;h<u;h++){let d=l[h];d.parent!==null?r.add(mc(d)):r.add(d)}let c=h=>{let u=new Map;for(let[d,f]of i.associations)(d instanceof pn||d instanceof Wt)&&u.set(d,f);return h.traverse(d=>{let f=i.associations.get(d);f!=null&&u.set(d,f)}),u};return i.associations=c(r),r})}_createAnimationTracks(e,t,n,i,r){let o=[],a=e.name?e.name:e.uuid,l=[];function c(f){f.morphTargetInfluences&&l.push(f.name?f.name:f.uuid)}Zi[r.path]===Zi.weights?(c(e),e.isGroup&&e.children.forEach(c)):l.push(a);let h;switch(Zi[r.path]){case Zi.weights:h=Mi;break;case Zi.rotation:h=bi;break;case Zi.translation:case Zi.scale:h=Vi;break;default:n.itemSize===1?h=Mi:h=Vi;break}let u=i.interpolation!==void 0?sM[i.interpolation]:cs,d=this._getArrayFromAccessor(n);for(let f=0,p=l.length;f<p;f++){let y=new h(l[f]+"."+Zi[r.path],t.array,d,u);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(y),o.push(y)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let n=ku(t.constructor),i=new Float32Array(t.length);for(let r=0,o=t.length;r<o;r++)i[r]=t[r]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){let i=this instanceof bi?Bu:vc;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function uM(s,e,t){let n=e.attributes,i=new fn;if(n.POSITION!==void 0){let a=t.json.accessors[n.POSITION],l=a.min,c=a.max;if(l!==void 0&&c!==void 0){if(i.set(new N(l[0],l[1],l[2]),new N(c[0],c[1],c[2])),a.normalized){let h=ku(br[a.componentType]);i.min.multiplyScalar(h),i.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let r=e.targets;if(r!==void 0){let a=new N,l=new N;for(let c=0,h=r.length;c<h;c++){let u=r[c];if(u.POSITION!==void 0){let d=t.json.accessors[u.POSITION],f=d.min,p=d.max;if(f!==void 0&&p!==void 0){if(l.setX(Math.max(Math.abs(f[0]),Math.abs(p[0]))),l.setY(Math.max(Math.abs(f[1]),Math.abs(p[1]))),l.setZ(Math.max(Math.abs(f[2]),Math.abs(p[2]))),d.normalized){let y=ku(br[d.componentType]);l.multiplyScalar(y)}a.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(a)}s.boundingBox=i;let o=new xn;i.getCenter(o.center),o.radius=i.min.distanceTo(i.max)/2,s.boundingSphere=o}function mm(s,e,t){let n=e.attributes,i=[];function r(o,a){return t.getDependency("accessor",o).then(function(l){s.setAttribute(a,l)})}for(let o in n){let a=Hu[o]||o.toLowerCase();a in s.attributes||i.push(r(n[o],a))}if(e.indices!==void 0&&!s.index){let o=t.getDependency("accessor",e.indices).then(function(a){s.setIndex(a)});i.push(o)}return st.workingColorSpace!==dn&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${st.workingColorSpace}" not supported.`),oi(s,e),uM(s,e,t),Promise.all(i).then(function(){return e.targets!==void 0?oM(s,e.targets,t):s})}async function Gu(s){let e=await new _c().parseAsync(s,""),t=new Map;return e.scene.traverse(n=>{let i=n;if(!i.isMesh)return;let r=i.material,o=t.get(r.uuid);if(!o){let a=r.transparent||r.alphaTest>0;o=new re({map:r.map,color:r.map?new se(16777215):r.color,alphaTest:a?.5:0,side:r.side}),o.name=r.name,r.map&&(r.map.anisotropy=4),t.set(r.uuid,o),r.dispose()}i.material=o}),e}async function Vu(s){let e=await fetch(s);if(!e.ok)throw new Error("HTTP "+e.status+" "+s);return e.arrayBuffer()}var Mc=class{constructor(){H(this,"ctx",null);H(this,"master");H(this,"musicGain");H(this,"noise");H(this,"muted",!1);H(this,"musicOn",!1);H(this,"nextBeat",0);H(this,"beat",0);H(this,"timer",0);H(this,"tempo",112);H(this,"rumbleGain",null)}unlock(){if(!this.ctx){let e=window.AudioContext||window.webkitAudioContext;if(!e)return;this.ctx=new e,this.master=this.ctx.createGain(),this.master.gain.value=this.muted?0:.7;let t=this.ctx.createDynamicsCompressor();this.master.connect(t).connect(this.ctx.destination),this.musicGain=this.ctx.createGain(),this.musicGain.gain.value=.32,this.musicGain.connect(this.master);let n=this.ctx.sampleRate;this.noise=this.ctx.createBuffer(1,n,this.ctx.sampleRate);let i=this.noise.getChannelData(0);for(let r=0;r<n;r++)i[r]=Math.random()*2-1}this.ctx.state==="suspended"&&this.ctx.resume().catch(()=>{})}setMuted(e){this.muted=e,this.ctx&&this.master.gain.setTargetAtTime(e?0:.7,this.ctx.currentTime,.02)}tone(e,t,n,i,r,o=0,a){let l=this.ctx;if(!l)return;let c=l.currentTime+o,h=l.createOscillator(),u=l.createGain();h.type=n,h.frequency.setValueAtTime(e,c),r&&h.frequency.exponentialRampToValueAtTime(r,c+t),u.gain.setValueAtTime(1e-4,c),u.gain.exponentialRampToValueAtTime(i,c+.008),u.gain.exponentialRampToValueAtTime(1e-4,c+t),h.connect(u).connect(a||this.master),h.start(c),h.stop(c+t+.02)}hiss(e,t,n,i,r=0,o="bandpass",a){let l=this.ctx;if(!l)return;let c=l.currentTime+r,h=l.createBufferSource();h.buffer=this.noise;let u=l.createBiquadFilter();u.type=o,u.Q.value=1.2,u.frequency.setValueAtTime(n,c),u.frequency.exponentialRampToValueAtTime(i,c+e);let d=l.createGain();d.gain.setValueAtTime(1e-4,c),d.gain.exponentialRampToValueAtTime(t,c+.01),d.gain.exponentialRampToValueAtTime(1e-4,c+e),h.connect(u).connect(d).connect(a||this.master),h.start(c,Math.random()*.5),h.stop(c+e+.02)}jump(e){this.tone(e?260:330,e?.32:.18,"square",.12,e?1100:760),e&&this.tone(520,.3,"sine",.1,1600,.04)}slide(){this.hiss(.28,.35,2400,500)}lane(){this.hiss(.1,.18,900,2600,0,"bandpass")}bump(){this.tone(140,.12,"triangle",.25,80)}land(){this.tone(110,.08,"sine",.25,60)}coin(e){let t=Math.min(e,12),n=880*Math.pow(2,t%6/12);this.tone(n,.09,"square",.07),this.tone(n*1.5,.16,"square",.06,void 0,.055)}power(){[523,659,784,1047].forEach((e,t)=>this.tone(e,.14,"square",.08,void 0,t*.06))}powerEnd(){this.tone(660,.18,"triangle",.1,330)}stumble(){this.hiss(.18,.5,1500,300),this.tone(200,.2,"sawtooth",.12,90),this.policeWhistle(),this.dogBark()}crash(){this.hiss(.6,.8,3e3,120,0,"lowpass"),this.tone(160,.5,"sawtooth",.22,40),this.tone(90,.7,"sine",.35,30,.02),this.policeWhistle()}policeWhistle(){let e=this.ctx;if(!e)return;let t=e.currentTime,n=.42,i=e.createOscillator(),r=e.createOscillator(),o=e.createGain(),a=e.createGain();i.type="triangle",i.frequency.setValueAtTime(2350,t),r.type="sine",r.frequency.setValueAtTime(22,t),o.gain.setValueAtTime(190,t),r.connect(i.frequency),a.gain.setValueAtTime(.001,t),a.gain.exponentialRampToValueAtTime(.28,t+.02),a.gain.exponentialRampToValueAtTime(.001,t+n),i.connect(a).connect(this.master),r.start(t),i.start(t),r.stop(t+n),i.stop(t+n),this.hiss(n,.14,3200,2400,0,"bandpass")}dogBark(){this.tone(280,.16,"sawtooth",.22,130),this.tone(190,.16,"triangle",.18,90,.01),this.hiss(.16,.2,1400,400,0,"bandpass")}star(){[1046,1318,1568,2093].forEach((e,t)=>{this.tone(e,.24,"sine",.12,void 0,t*.05),this.tone(e*1.5,.18,"triangle",.06,void 0,t*.05)})}rocketJet(){this.hiss(.85,.45,1200,3600,0,"bandpass"),this.tone(150,.6,"sawtooth",.25,300),this.tone(80,.8,"sine",.35,140)}click(){this.tone(660,.05,"square",.06)}level(){[660,880].forEach((e,t)=>this.tone(e,.12,"triangle",.1,void 0,t*.08))}horn(){[[415,0],[311,0],[415,.26],[311,.26]].forEach(([e,t])=>{this.tone(e,.35,"sawtooth",.11,void 0,t),this.tone(e*1.5,.35,"square",.05,void 0,t)})}rumble(e){let t=this.ctx;if(t){if(!this.rumbleGain){let n=t.createBufferSource();n.buffer=this.noise,n.loop=!0;let i=t.createBiquadFilter();i.type="lowpass",i.frequency.value=160,this.rumbleGain=t.createGain(),this.rumbleGain.gain.value=0,n.connect(i).connect(this.rumbleGain).connect(this.master),n.start()}this.rumbleGain.gain.setTargetAtTime(Math.max(0,Math.min(1,e))*.9,t.currentTime,.08)}}startMusic(){!this.ctx||this.musicOn||(this.musicOn=!0,this.nextBeat=this.ctx.currentTime+.05,this.beat=0,this.timer=window.setInterval(()=>this.schedule(),25))}stopMusic(){this.musicOn=!1,window.clearInterval(this.timer)}schedule(){let e=this.ctx;if(!e||!this.musicOn)return;let t=[55,55,65.4,49];for(;this.nextBeat<e.currentTime+.12;){let n=this.nextBeat-e.currentTime,i=this.beat%16,r=Math.floor(this.beat/16)%4;i%4===0&&this.kick(n),i%4===2&&this.hiss(.04,.12,8e3,6e3,n,"highpass",this.musicGain),(i===4||i===12)&&this.hiss(.12,.22,1800,900,n,"bandpass",this.musicGain),i%2===0&&i!==6&&i!==14&&this.tone(t[r]*(i===10?2:1),.12,"sawtooth",.09,void 0,n,this.musicGain),(i===0||i===7||i===10)&&this.tone(t[r]*4*(i===7?1.5:1),.1,"triangle",.05,void 0,n,this.musicGain),this.nextBeat+=60/this.tempo/4,this.beat++}}kick(e){let t=this.ctx,n=t.currentTime+e,i=t.createOscillator(),r=t.createGain();i.frequency.setValueAtTime(150,n),i.frequency.exponentialRampToValueAtTime(45,n+.12),r.gain.setValueAtTime(.5,n),r.gain.exponentialRampToValueAtTime(1e-4,n+.18),i.connect(r).connect(this.musicGain),i.start(n),i.stop(n+.2)}};function xm(s,e,t){let n={ArrowLeft:"left",KeyA:"left",ArrowRight:"right",KeyD:"right",ArrowUp:"up",KeyW:"up",Space:"up",ArrowDown:"down",KeyS:"down",Escape:"pause",KeyP:"pause",Enter:"confirm",KeyM:"mute"};window.addEventListener("keydown",d=>{let f=n[d.code];f&&(d.target?.tagName==="BUTTON"&&(d.code==="Space"||d.code==="Enter")||(d.preventDefault(),!(d.repeat&&f!=="left"&&f!=="right")&&e(f)))});let i=22,r=!1,o=0,a=0,l=!1,c=(d,f,p)=>{t()&&(p&&p.closest&&p.closest("button, .icon-btn, .chip, .big, .ghost, .nav-btn, .lb-panel")||(r=!0,l=!1,o=d,a=f))},h=(d,f,p)=>{if(!r||!t())return;let y=d-o,g=f-a,m=Math.abs(y),b=Math.abs(g);(m>=i||b>=i)&&(p&&p.cancelable&&p.preventDefault(),l||(l=!0,m>b?e(y>0?"right":"left"):e(g>0?"down":"up"),o=d,a=f))},u=(d,f)=>{if(r){if(r=!1,!l&&t()){let p=d-o,y=f-a,g=Math.abs(p),m=Math.abs(y);(g>=14||m>=14)&&(g>m?e(p>0?"right":"left"):e(y>0?"down":"up"))}l=!1}};window.addEventListener("touchstart",d=>{if(d.touches.length>0){let f=d.touches[0];c(f.clientX,f.clientY,d.target)}},{passive:!0}),window.addEventListener("touchmove",d=>{if(r&&d.touches.length>0){let f=d.touches[0];h(f.clientX,f.clientY,d)}},{passive:!1}),window.addEventListener("touchend",d=>{if(r&&d.changedTouches.length>0){let f=d.changedTouches[0];u(f.clientX,f.clientY)}else r=!1},{passive:!0}),window.addEventListener("touchcancel",()=>{r=!1,l=!1},{passive:!0}),window.addEventListener("pointerdown",d=>{d.pointerType!=="touch"&&c(d.clientX,d.clientY,d.target)}),window.addEventListener("pointermove",d=>{d.pointerType!=="touch"&&h(d.clientX,d.clientY,d)}),window.addEventListener("pointerup",d=>{d.pointerType!=="touch"&&u(d.clientX,d.clientY)})}var _m="subway.";function Li(s,e){try{let t=window.localStorage.getItem(_m+s);return t===null?e:JSON.parse(t)}catch{return e}}function ai(s,e){try{window.localStorage.setItem(_m+s,JSON.stringify(e))}catch{}}var dM={en:{title:"Subway Surfers: Mumbai",tagline:"Run across Indian Railways! Dodge trains & escape the Inspector!",play:"Play",best:"High Score",coinsTotal:"Coins",stars:"Stars",star:"5\xD7 Star Multiplier",ctrlKeys:"\u2190 \u2192 / A D change track \xB7 \u2191 W Space jump \xB7 \u2193 S roll \xB7 Esc pause",ctrlTouch:"Swipe left/right to change track \xB7 up to jump \xB7 down to roll",tapToStart:"Tap or press Space to start",paused:"Paused",resume:"Resume",restart:"Restart",home:"Home",over:"Inspector Caught You!",score:"Score",coins:"Coins",distance:"Distance",newBest:"New High Score!",again:"Play Again",preparing:"Arriving at Mumbai Central\u2026",loading:"Loading",loadFail:"Could not load. Please refresh.",hintJumpKeys:"Press \u2191 to jump over hurdles",hintJumpTouch:"Swipe up to jump over hurdles",hintSlideKeys:"Press \u2193 to roll under barriers",hintSlideTouch:"Swipe down to roll under barriers",hintLaneKeys:"Press \u2190 \u2192 to switch tracks",hintLaneTouch:"Swipe left or right to switch tracks",hintRamp:"Run up the ramp onto the train roof",magnet:"Magnet",shoes:"Spring Shoes",double:"Double Score (2\xD7)",jet:"Rocket Jet",careful:"Watch out! The Police Inspector is right behind you!",mute:"Mute",sound:"Sound",mult:"Multiplier",meters:"m",lang:"Language"},hi:{title:"\u0938\u092C\u0935\u0947 \u0938\u0930\u094D\u092B\u0930\u094D\u0938: \u092E\u0941\u0902\u092C\u0908",tagline:"\u092D\u093E\u0930\u0924\u0940\u092F \u0930\u0947\u0932\u0935\u0947 \u092A\u091F\u0930\u093F\u092F\u094B\u0902 \u092A\u0930 \u0926\u094C\u0921\u093C\u0947\u0902! \u091F\u094D\u0930\u0947\u0928\u094B\u0902 \u0938\u0947 \u092C\u091A\u0947\u0902 \u0914\u0930 \u0907\u0902\u0938\u094D\u092A\u0947\u0915\u094D\u091F\u0930 \u0938\u0947 \u092D\u093E\u0917\u0947\u0902!",play:"\u0936\u0941\u0930\u0942 \u0915\u0930\u0947\u0902",best:"\u0938\u0930\u094D\u0935\u0936\u094D\u0930\u0947\u0937\u094D\u0920 \u0938\u094D\u0915\u094B\u0930",coinsTotal:"\u0938\u093F\u0915\u094D\u0915\u0947",stars:"\u0938\u093F\u0924\u093E\u0930\u0947",star:"5\xD7 \u0938\u094D\u091F\u093E\u0930 \u092C\u0942\u0938\u094D\u091F\u0930",ctrlKeys:"\u2190 \u2192 / A D \u092A\u091F\u0930\u0940 \u092C\u0926\u0932\u0947\u0902 \xB7 \u2191 W \u0938\u094D\u092A\u0947\u0938 \u0915\u0942\u0926\u0947\u0902 \xB7 \u2193 S \u092B\u093F\u0938\u0932\u0947\u0902 \xB7 Esc \u0930\u094B\u0915\u0947\u0902",ctrlTouch:"\u092C\u093E\u090F\u0901/\u0926\u093E\u090F\u0901 \u0938\u094D\u0935\u093E\u0907\u092A \u0915\u0930\u0947\u0902 \u092A\u091F\u0930\u0940 \u092C\u0926\u0932\u0947\u0902 \xB7 \u090A\u092A\u0930 \u0915\u0942\u0926\u0947\u0902 \xB7 \u0928\u0940\u091A\u0947 \u092B\u093F\u0938\u0932\u0947\u0902",tapToStart:"\u0936\u0941\u0930\u0942 \u0915\u0930\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u091F\u0948\u092A \u092F\u093E \u0938\u094D\u092A\u0947\u0938 \u0926\u092C\u093E\u090F\u0902",paused:"\u0916\u0947\u0932 \u0930\u0941\u0915\u093E \u0939\u0941\u0906 \u0939\u0948",resume:"\u091C\u093E\u0930\u0940 \u0930\u0916\u0947\u0902",restart:"\u092A\u0941\u0928\u0903 \u0906\u0930\u0902\u092D \u0915\u0930\u0947\u0902",home:"\u0939\u094B\u092E",over:"\u0907\u0902\u0938\u094D\u092A\u0947\u0915\u094D\u091F\u0930 \u0928\u0947 \u092A\u0915\u0921\u093C \u0932\u093F\u092F\u093E!",score:"\u0938\u094D\u0915\u094B\u0930",coins:"\u0938\u093F\u0915\u094D\u0915\u0947",distance:"\u0926\u0942\u0930\u0940",newBest:"\u0928\u092F\u093E \u0930\u093F\u0915\u0949\u0930\u094D\u0921!",again:"\u092B\u093F\u0930 \u0938\u0947 \u0916\u0947\u0932\u0947\u0902",preparing:"\u092E\u0941\u0902\u092C\u0908 \u0938\u0947\u0902\u091F\u094D\u0930\u0932 \u0906\u0917\u092E\u0928 \u0924\u0948\u092F\u093E\u0930\u0940\u2026",loading:"\u0932\u094B\u0921 \u0939\u094B \u0930\u0939\u093E \u0939\u0948",loadFail:"\u0932\u094B\u0921 \u0928\u0939\u0940\u0902 \u0939\u094B \u0938\u0915\u093E, \u092A\u0941\u0928\u0903 \u092A\u094D\u0930\u092F\u093E\u0938 \u0915\u0930\u0947\u0902",hintJumpKeys:"\u0915\u0942\u0926\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u2191 \u0926\u092C\u093E\u090F\u0902",hintJumpTouch:"\u0915\u0942\u0926\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u090A\u092A\u0930 \u0938\u094D\u0935\u093E\u0907\u092A \u0915\u0930\u0947\u0902",hintSlideKeys:"\u0928\u0940\u091A\u0947 \u0938\u0947 \u0928\u093F\u0915\u0932\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u2193 \u0926\u092C\u093E\u090F\u0902",hintSlideTouch:"\u0928\u0940\u091A\u0947 \u0938\u0947 \u0928\u093F\u0915\u0932\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u0928\u0940\u091A\u0947 \u0938\u094D\u0935\u093E\u0907\u092A \u0915\u0930\u0947\u0902",hintLaneKeys:"\u092C\u091A\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u2190 \u2192 \u0926\u092C\u093E\u090F\u0902",hintLaneTouch:"\u092C\u091A\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u092C\u093E\u090F\u0901/\u0926\u093E\u090F\u0901 \u0938\u094D\u0935\u093E\u0907\u092A \u0915\u0930\u0947\u0902",hintRamp:"\u091F\u094D\u0930\u0947\u0928 \u0915\u0940 \u091B\u0924 \u092A\u0930 \u091C\u093E\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u0930\u0948\u0902\u092A \u092A\u0930 \u0926\u094C\u0921\u093C\u0947\u0902",magnet:"\u091A\u0941\u0902\u092C\u0915",shoes:"\u091C\u0902\u092A \u0936\u0942\u091C\u093C",double:"\u0926\u094B\u0917\u0941\u0928\u093E \u0938\u094D\u0915\u094B\u0930 (2\xD7)",jet:"\u0930\u0949\u0915\u0947\u091F \u091C\u0947\u091F",careful:"\u0938\u093E\u0935\u0927\u093E\u0928! \u0907\u0902\u0938\u094D\u092A\u0947\u0915\u094D\u091F\u0930 \u0920\u0940\u0915 \u092A\u0940\u091B\u0947 \u0939\u0948!",mute:"\u092E\u094D\u092F\u0942\u091F",sound:"\u0927\u094D\u0935\u0928\u093F",mult:"\u092E\u0932\u094D\u091F\u0940\u092A\u094D\u0932\u093E\u092F\u0930",meters:"\u092E\u0940\u091F\u0930",lang:"\u092D\u093E\u0937\u093E"},"zh-TW":{title:"\u5730\u9435\u8DD1\u9177\uFF1A\u5B5F\u8CB7",tagline:"\u5954\u99B3\u5728\u5370\u5EA6\u9435\u8DEF\u4E0A\uFF01\u8EB2\u904E\u706B\u8ECA\uFF0C\u7529\u958B\u8B66\u5BDF\u8FFD\u6355\uFF01",play:"\u958B\u59CB",best:"\u6700\u9AD8\u7D00\u9304",coinsTotal:"\u91D1\u5E63",stars:"\u661F\u661F",star:"5\u500D\u661F\u661F\u52A0\u6210",ctrlKeys:"\u2190\u2192 \u6216 A D \u63DB\u8ECC\u3000\u2191 W \u7A7A\u767D\u9375 \u8DF3\u3000\u2193 S \u6ED1\u884C\u3000Esc \u66AB\u505C",ctrlTouch:"\u5DE6\u53F3\u6ED1\u63DB\u8ECC\u3000\u5F80\u4E0A\u6ED1\u8DF3\u3000\u5F80\u4E0B\u6ED1\u6ED1\u884C",tapToStart:"\u9EDE\u4E00\u4E0B\u6216\u6309\u7A7A\u767D\u9375\u958B\u59CB",paused:"\u66AB\u505C",resume:"\u7E7C\u7E8C",restart:"\u91CD\u4F86",home:"\u56DE\u9996\u9801",over:"\u88AB\u5370\u5EA6\u8B66\u5BDF\u6293\u5230\u4E86\uFF01",score:"\u5206\u6578",coins:"\u91D1\u5E63",distance:"\u8DDD\u96E2",newBest:"\u65B0\u7D00\u9304\uFF01",again:"\u518D\u73A9\u4E00\u6B21",preparing:"\u5B5F\u8CB7\u4E2D\u592E\u8ECA\u7AD9\u6E96\u5099\u4E2D\u2026",loading:"\u8F09\u5165\u4E2D",loadFail:"\u8F09\u5165\u5931\u6557\uFF0C\u8ACB\u91CD\u65B0\u6574\u7406",hintJumpKeys:"\u6309 \u2191 \u8DF3\u904E\u53BB",hintJumpTouch:"\u5F80\u4E0A\u6ED1\u8DF3\u904E\u53BB",hintSlideKeys:"\u6309 \u2193 \u5F9E\u4E0B\u9762\u6ED1\u904E",hintSlideTouch:"\u5F80\u4E0B\u6ED1\u5F9E\u4E0B\u9762\u6ED1\u904E",hintLaneKeys:"\u6309 \u2190 \u2192 \u63DB\u8ECC\u9583\u958B",hintLaneTouch:"\u5DE6\u53F3\u6ED1\u63DB\u8ECC\u9583\u958B",hintRamp:"\u8DD1\u4E0A\u659C\u5761\u53EF\u4EE5\u4E0A\u8ECA\u9802",magnet:"\u78C1\u9435",shoes:"\u5F48\u7C27\u978B",double:"\u96D9\u500D\u5206\u6578",jet:"\u706B\u7BAD\u98DB\u884C\u5668",careful:"\u5C0F\u5FC3\uFF01\u8B66\u5BDF\u5C31\u5728\u4F60\u8EAB\u5F8C\uFF01",mute:"\u975C\u97F3",sound:"\u97F3\u6548",mult:"\u500D\u7387",meters:"\u516C\u5C3A",lang:"\u8A9E\u8A00"},"zh-CN":{title:"\u5730\u94C1\u8DD1\u9177\uFF1A\u5B5F\u4E70",tagline:"\u9A70\u9A8B\u5728\u5370\u5EA6\u94C1\u9053\u4E0A\uFF01\u8EB2\u5F00\u5217\u8F66\uFF0C\u7529\u5F00\u8B66\u5BDF\uFF01",play:"\u5F00\u59CB",best:"\u6700\u9AD8\u7EAA\u5F55",coinsTotal:"\u91D1\u5E01",stars:"\u661F\u661F",star:"5\u500D\u661F\u661F\u52A0\u6210",ctrlKeys:"\u2190\u2192 \u6216 A D \u6362\u9053\u3000\u2191 W \u7A7A\u683C \u8DF3\u3000\u2193 S \u6ED1\u94F2\u3000Esc \u6682\u505C",ctrlTouch:"\u5DE6\u53F3\u6ED1\u6362\u9053\u3000\u4E0A\u6ED1\u8DF3\u3000\u4E0B\u6ED1\u6ED1\u94F2",tapToStart:"\u70B9\u4E00\u4E0B\u6216\u6309\u7A7A\u683C\u5F00\u59CB",paused:"\u6682\u505C",resume:"\u7EE7\u7EED",restart:"\u91CD\u65B0\u5F00\u59CB",home:"\u8FD4\u56DE\u9996\u9875",over:"\u88AB\u5370\u5EA6\u8B66\u5BDF\u6293\u4F4F\u4E86\uFF01",score:"\u5F97\u5206",coins:"\u91D1\u5E01",distance:"\u8DDD\u79BB",newBest:"\u65B0\u7EAA\u5F55\uFF01",again:"\u518D\u6765\u4E00\u5C40",preparing:"\u5B5F\u4E70\u4E2D\u592E\u8F66\u7AD9\u51C6\u5907\u4E2D\u2026",loading:"\u52A0\u8F7D\u4E2D",loadFail:"\u52A0\u8F7D\u5931\u8D25\uFF0C\u8BF7\u5237\u65B0\u9875\u9762",hintJumpKeys:"\u6309 \u2191 \u8DF3\u8FC7\u53BB",hintJumpTouch:"\u4E0A\u6ED1\u8DF3\u8FC7\u53BB",hintSlideKeys:"\u6309 \u2193 \u4ECE\u4E0B\u9762\u6ED1\u8FC7\u53BB",hintSlideTouch:"\u4E0B\u6ED1\u4ECE\u4E0B\u9762\u6ED1\u8FC7\u53BB",hintLaneKeys:"\u6309 \u2190 \u2192 \u6362\u9053\u8EB2\u5F00",hintLaneTouch:"\u5DE6\u53F3\u6ED1\u6362\u9053\u8EB2\u5F00",hintRamp:"\u8DD1\u4E0A\u659C\u5761\u5C31\u80FD\u4E0A\u8F66\u9876",magnet:"\u78C1\u94C1",shoes:"\u5F39\u7C27\u978B",double:"\u53CC\u500D\u5F97\u5206",jet:"\u706B\u7BAD\u98DE\u884C\u5668",careful:"\u5C0F\u5FC3\uFF01\u8B66\u5BDF\u5C31\u5728\u4F60\u8EAB\u540E\uFF01",mute:"\u9759\u97F3",sound:"\u97F3\u6548",mult:"\u500D\u6570",meters:"\u7C73",lang:"\u8BED\u8A00"}};function fM(){let s=Li("lang",null);if(s==="en"||s==="hi"||s==="zh-TW"||s==="zh-CN")return s;let e=(navigator.languages&&navigator.languages.length?navigator.languages:[navigator.language||"en"]).map(t=>t.toLowerCase());for(let t of e){if(t.startsWith("hi"))return"hi";if(t.startsWith("zh"))return/hant|tw|hk|mo/.test(t)?"zh-TW":"zh-CN";if(t.startsWith("en"))return"en"}return"en"}var Wu=fM(),bc=()=>Wu;function ym(s){Wu=s,ai("lang",s),document.documentElement.lang=s}var cn=s=>dM[Wu][s],Sc=["en","hi","zh-TW","zh-CN"],vm={en:"EN",hi:"\u0939\u093F\u0928\u094D\u0926\u0940","zh-TW":"\u7E41\u4E2D","zh-CN":"\u7B80\u4E2D"};var Mm=[{id:"1",name:"Aarav Sharma (Mumbai)",score:148500,stars:18,avatar:"\u{1F451}",date:"Today",badge:"diamond"},{id:"2",name:"Priya Patel (Surat)",score:96200,stars:12,avatar:"\u26A1",date:"Yesterday",badge:"diamond"},{id:"3",name:"Jake (Surfer Pro)",score:68400,stars:8,avatar:"\u{1F6F9}",date:"3d ago",badge:"gold"},{id:"4",name:"Rohan Verma (Delhi)",score:45100,stars:5,avatar:"\u{1F680}",date:"5d ago",badge:"silver"},{id:"5",name:"Ananya Roy (Kolkata)",score:28900,stars:3,avatar:"\u{1F31F}",date:"1w ago",badge:"bronze"}];function Ec(){let s=Li("top_scorers",[]);return!s||s.length===0?(ai("top_scorers",Mm),Mm):s.sort((e,t)=>t.score-e.score)}function bm(s,e){if(s<=0)return{rank:-1,entries:Ec(),isNewTop:!1};let t=Ec().map(l=>({...l,isPlayer:!!l.isPlayer})),n=t.findIndex(l=>l.isPlayer),i={id:"player_me",name:"You (Jake)",score:Math.max(s,n>=0?t[n].score||0:s),stars:Math.max(e,n>=0?t[n].stars||0:e),avatar:"\u{1F6F9}",date:"Just now",badge:s>=9e4?"diamond":s>=6e4?"gold":s>=35e3?"silver":"bronze",isPlayer:!0};n>=0?t[n]=i:t.push(i),t.sort((l,c)=>c.score-l.score);let r=t.slice(0,10);ai("top_scorers",r);let o=r.findIndex(l=>l.isPlayer)+1;return{rank:o,entries:r,isNewTop:o===1}}function Sm(s){return s.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}var Sr={pause:'<svg viewBox="0 0 24 24"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>',sound:'<svg viewBox="0 0 24 24"><path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',muted:'<svg viewBox="0 0 24 24"><path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M16 9l5 6M21 9l-5 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',coin:'<span class="coin-ico"></span>'},pM={magnet:"\u{1F9F2}",shoes:"\u{1F45F}",double:"\xD72",star:"\u2605",jet:"\u{1F680}"},Tc=class{constructor(e,t,n){H(this,"root");H(this,"el",{});H(this,"screen","start");H(this,"hintTimer",0);H(this,"toastTimer",0);H(this,"touch",matchMedia("(pointer: coarse)").matches);H(this,"last",{score:-1,coins:-1,stars:-1,mult:-1,power:""});this.root=e;let i=Ci();e.innerHTML=`
      <div class="hud" id="hud">
        <div class="hud-left">
          <button class="icon-btn" id="btn-pause" aria-label="pause" title="Pause Game">${Sr.pause}</button>
          <button class="icon-btn" id="btn-mute" aria-label="mute" title="Toggle Sound"></button>
        </div>
        <div class="hud-right">
          <div class="score" id="score">000000</div>
          <div class="hud-row">
            <span class="mult" id="mult">\xD71</span>
            <span class="stars"><span style="margin-right:2px">\u2605</span><b id="stars">0</b></span>
            <span class="coins">${Sr.coin}<b id="coins">0</b></span>
          </div>
          <div class="powers" id="powers"></div>
        </div>
        <div class="hint" id="hint"></div>
        <div class="toast" id="toast"></div>
      </div>
      <div class="flash" id="flash"></div>

      <!-- Start / Title Screen -->
      <section class="screen start" id="s-start">
        <div class="panel">
          <div class="mumbai-badge">\u{1F1EE}\u{1F1F3} MUMBAI WORLD TOUR</div>
          <h1 data-k="title">Subway Surfers: Mumbai</h1>
          <p class="tag" data-k="tagline"></p>
          <div class="stats">
            <div><small data-k="best"></small><b id="best">0</b></div>
            <div class="stat-sep"></div>
            <div><small data-k="coinsTotal"></small><b id="bank">0</b></div>
          </div>
          <button class="big" id="btn-play">
            <span class="btn-play-text" data-k="play">PLAY NOW</span>
            <span class="btn-play-sub">TAP OR PRESS SPACE</span>
          </button>
          <div class="ctrl-pills">
            <span class="ctrl-pill"><kbd>\u25C4</kbd> <kbd>\u25BA</kbd> Dodge</span>
            <span class="ctrl-pill"><kbd>\u25B2</kbd> <kbd>SPACE</kbd> Jump</span>
            <span class="ctrl-pill"><kbd>\u25BC</kbd> Roll</span>
          </div>
          <p class="ctrl" id="ctrl" style="display:none"></p>
          <div class="row chip-row">
            <button class="chip" id="btn-character">\u{1F3C3} Runner: <span id="char-name-label">${i.name}</span></button>
            <button class="chip" id="btn-leaderboard">\u{1F3C6} Top Scorers</button>
            <button class="chip" id="btn-controls">\u{1F3AE} Controls</button>
            <button class="chip" id="btn-lang"></button>
            <button class="chip" id="btn-mute2"></button>
            <button class="chip" id="btn-fullscreen">\u26F6 Fullscreen</button>
          </div>
        </div>
      </section>

      <!-- Pause Screen -->
      <section class="screen pause" id="s-pause">
        <div class="panel">
          <h2 data-k="paused">Game Paused</h2>
          <button class="big" id="btn-resume" data-k="resume">Resume Run</button>
          <button class="ghost" id="btn-restart" data-k="restart">Restart</button>
          <button class="ghost" id="btn-home" data-k="home">Main Menu</button>
        </div>
      </section>

      <!-- Game Over Screen -->
      <section class="screen over" id="s-over">
        <div class="panel">
          <h2 data-k="over">Run Ended</h2>
          <div class="badge" id="newbest" data-k="newBest">New Best Score!</div>
          <div class="result">
            <div><small data-k="score">Score</small><b id="r-score">0</b></div>
            <div><small data-k="stars">Stars</small><b id="r-stars" style="color:#f59e0b">0</b></div>
            <div><small data-k="coins">Coins</small><b id="r-coins">0</b></div>
            <div><small data-k="distance">Distance</small><b id="r-dist">0</b></div>
            <div><small data-k="best">Best</small><b id="r-best">0</b></div>
          </div>
          <button class="big" id="btn-again" data-k="again">Play Again</button>
          <div class="row" style="display:flex;gap:8px;justify-content:center;width:100%">
            <button class="ghost" id="btn-leaderboard2" style="flex:1;display:inline-flex;align-items:center;justify-content:center;gap:4px">\u{1F3C6} Leaderboard</button>
            <button class="ghost" id="btn-home2" data-k="home" style="flex:1">Main Menu</button>
          </div>
        </div>
      </section>

      <!-- Leaderboard Modal -->
      <section class="lb-modal" id="s-leaderboard">
        <div class="lb-panel">
          <div class="lb-header">
            <div class="lb-title-row">
              <span style="font-size:24px">\u{1F3C6}</span>
              <h2>TOP SCORERS \xB7 MUMBAI</h2>
            </div>
            <p class="lb-subtitle">World Tour Champion Leaderboard</p>
          </div>
          <div class="lb-list" id="lb-list"></div>
          <button class="big" id="btn-lb-close" style="margin-top:6px;padding:12px">Close</button>
        </div>
      </section>

      <!-- Controls Guide Modal -->
      <section class="lb-modal" id="s-controls">
        <div class="lb-panel" style="max-width: 440px">
          <div class="lb-header">
            <div class="lb-title-row">
              <span style="font-size:24px">\u{1F3AE}</span>
              <h2>HOW TO PLAY</h2>
            </div>
            <p class="lb-subtitle">Subway Surfers: Mumbai Controls & Tips</p>
          </div>
          <div class="guide-list">
            <div class="guide-item">
              <b style="color:#38bdf8">Switch Tracks:</b>
              <span>Swipe Left / Right or press <b>A / D</b> (or <b>\u25C4 / \u25BA</b>) to dodge incoming Indian trains.</span>
            </div>
            <div class="guide-item">
              <b style="color:#f59e0b">Jump & Roof Running:</b>
              <span>Swipe Up or press <b>W / \u25B2 / Space</b> to leap over hurdles and climb onto train roofs.</span>
            </div>
            <div class="guide-item">
              <b style="color:#10b981">Slide & Fast Fall:</b>
              <span>Swipe Down or press <b>S / \u25BC</b> to roll under signs or quickly land from high altitudes.</span>
            </div>
            <div class="guide-item">
              <b style="color:#ef4444">Special Mumbai Power-Ups:</b>
              <span>
                \u{1F680} <b>Rocket Jetpack</b>: Soar high above Mumbai skyline collecting gold!<br>
                \u2605 <b>Star Multiplier</b>: Multiplies run score by 5X / 10X!<br>
                \u{1F9F2} <b>Coin Magnet</b>: Magnetizes all 3 tracks of coins.<br>
                \u{1F45F} <b>Super Sneakers</b>: High super-jumping abilities.
              </span>
            </div>
          </div>
          <button class="big" id="btn-ctrl-close" style="margin-top:4px;padding:12px">Got It!</button>
        </div>
      </section>

      <!-- Character Selector Modal -->
      <section class="lb-modal" id="s-character">
        <div class="lb-panel" style="max-width: 460px">
          <div class="lb-header">
            <div class="lb-title-row">
              <span style="font-size:24px">\u{1F3C3}</span>
              <h2>CHOOSE YOUR RUNNER</h2>
            </div>
            <p class="lb-subtitle">Select a Mumbai character with unique perks</p>
          </div>
          <div class="char-grid" id="char-grid"></div>
          <button class="big" id="btn-char-close" style="margin-top:6px;padding:12px">Select Runner</button>
        </div>
      </section>
    `,e.querySelectorAll("[id]").forEach(c=>this.el[c.id]=c);let r=()=>{try{"vibrate"in navigator&&navigator.vibrate(18)}catch{}},o=(c,h)=>{let u=this.el[c]||document.getElementById(c);if(!u)return;u.style.touchAction="manipulation",u.style.cursor="pointer";let d=!1,f=p=>{p.preventDefault(),p.stopPropagation(),!d&&(d=!0,setTimeout(()=>{d=!1},120),r(),h())};u.addEventListener("pointerdown",p=>p.stopPropagation()),u.addEventListener("touchstart",p=>p.stopPropagation(),{passive:!0}),u.addEventListener("pointerup",f),u.addEventListener("click",f)};o("btn-play",()=>t.play()),o("btn-pause",()=>t.pause()),o("btn-resume",()=>t.resume()),o("btn-restart",()=>t.restart()),o("btn-home",()=>t.home()),o("btn-home2",()=>t.home()),o("btn-again",()=>t.restart()),o("btn-mute",()=>t.toggleMute()),o("btn-mute2",()=>t.toggleMute()),o("btn-leaderboard",()=>{this.renderLeaderboard(),this.el["s-leaderboard"]?.classList.add("on")}),o("btn-leaderboard2",()=>{this.renderLeaderboard(),this.el["s-leaderboard"]?.classList.add("on")}),o("btn-lb-close",()=>{this.el["s-leaderboard"]?.classList.remove("on")}),o("btn-controls",()=>{this.el["s-controls"]?.classList.add("on")}),o("btn-ctrl-close",()=>{this.el["s-controls"]?.classList.remove("on")}),o("btn-character",()=>{this.renderCharacters(t.onCharacterSelect),this.el["s-character"]?.classList.add("on")}),o("btn-char-close",()=>{this.el["s-character"]?.classList.remove("on")}),o("btn-fullscreen",()=>{document.fullscreenElement?document.exitFullscreen().catch(()=>{}):document.documentElement.requestFullscreen().catch(()=>{})}),o("btn-lang",()=>{let c=Sc.indexOf(bc());ym(Sc[(c+1)%Sc.length]),this.texts(),t.langChanged()});let l=c=>{c.target.closest("button, select, a, .chip, .big, .ghost, .icon-btn, .nav-btn, .lb-panel, .char-card")||(r(),t.play())};this.el["s-start"].addEventListener("click",l),this.setMuted(n),this.texts()}renderCharacters(e){let t=this.el["char-grid"];if(!t)return;let n=Ci();t.innerHTML=Vo.map(i=>{let r=i.id===n.id;return`
        <div class="char-card ${r?"active":""}" data-char="${i.id}">
          <div class="char-top">
            <span class="char-avatar">${i.avatar}</span>
            <div class="char-info">
              <span class="char-name">${i.name}</span>
              <span class="char-title">${i.title}</span>
            </div>
            ${r?'<span class="char-badge">SELECTED</span>':""}
          </div>
          <div class="char-perk">\u26A1 ${i.perk}</div>
          <div class="char-desc">${i.desc}</div>
        </div>
      `}).join(""),t.querySelectorAll(".char-card").forEach(i=>{let r=i.dataset.char;r&&i.addEventListener("click",o=>{o.preventDefault(),o.stopPropagation(),lm(r);let a=Ci(),l=this.el["char-name-label"];l&&(l.textContent=a.name),this.renderCharacters(e),e&&e(a)})})}texts(){document.documentElement.lang=bc(),document.title=cn("title"),this.root.querySelectorAll("[data-k]").forEach(e=>e.textContent=cn(e.dataset.k)),this.el.ctrl.textContent=this.touch?cn("ctrlTouch"):cn("ctrlKeys"),this.el["btn-lang"].textContent=cn("lang")+" \xB7 "+vm[bc()]}setMuted(e){this.el["btn-mute"].innerHTML=e?Sr.muted:Sr.sound,this.el["btn-mute2"].innerHTML=(e?Sr.muted:Sr.sound)+`<span>${cn(e?"mute":"sound")}</span>`}show(e){this.screen=e,this.root.dataset.screen=e;let t=document.querySelector(".arcade-header");if(t){let n=e==="start";t.classList.toggle("hidden",!n),t.style.display=n?"flex":"none"}this.el["s-leaderboard"]&&this.el["s-leaderboard"].classList.remove("on"),this.el["s-controls"]&&this.el["s-controls"].classList.remove("on"),this.el["s-character"]&&this.el["s-character"].classList.remove("on");for(let n of["start","pause","over"]){let i=this.el["s-"+n];i&&i.classList.toggle("on",e===n)}this.el.hud&&this.el.hud.classList.toggle("on",e==="play"||e==="pause"),e!=="play"&&this.hint(""),e==="start"&&this.el["btn-play"]?.focus({preventScroll:!0}),e==="over"&&this.el["btn-again"]?.focus({preventScroll:!0}),e==="pause"&&this.el["btn-resume"]?.focus({preventScroll:!0})}renderLeaderboard(){let e=this.el["lb-list"];if(!e)return;let t=Ec();e.innerHTML=t.map((n,i)=>{let r=i+1,o=r===1?"gold":r===2?"silver":r===3?"bronze":"",a=r===1?"\u{1F947} #1":r===2?"\u{1F948} #2":r===3?"\u{1F949} #3":`#${r}`;return`
        <div class="lb-row ${n.isPlayer?"player":""}">
          <div class="lb-left">
            <span class="lb-rank ${o}">${a}</span>
            <span class="lb-avatar">${n.avatar}</span>
            <div class="lb-name-col">
              <span class="lb-name">${n.name}</span>
              <span class="lb-date">${n.date}</span>
            </div>
          </div>
          <div class="lb-right">
            <span class="lb-score">${Sm(n.score)}</span>
            <span class="lb-stars">\u2605 ${n.stars}</span>
          </div>
        </div>
      `}).join("")}setStart(e,t){this.el.best.textContent=String(e),this.el.bank.textContent=String(t);let n=Ci(),i=this.el["char-name-label"];i&&(i.textContent=n.name)}hud(e,t,n,i,r=0){e!==this.last.score&&(this.el.score.textContent=String(e).padStart(6,"0"),this.last.score=e),t!==this.last.coins&&(this.el.coins.textContent=String(t),this.last.coins=t,this.el.coins.parentElement.classList.remove("pop"),this.el.coins.offsetWidth,this.el.coins.parentElement.classList.add("pop")),r!==this.last.stars&&this.el.stars&&(this.el.stars.textContent=String(r),this.last.stars=r),n!==this.last.mult&&(this.el.mult.textContent="\xD7"+n,this.el.mult.classList.toggle("hot",n>1),this.last.mult=n);let o=Object.keys(i).map(a=>i[a]>0?a+Math.ceil(i[a]*10):"").join();o!==this.last.power&&(this.last.power=o,this.el.powers.innerHTML=Object.keys(i).filter(a=>i[a]>0).map(a=>`<div class="pw ${a}"><i>${pM[a]}</i><span>${cn(a)}</span><em style="transform:scaleX(${(i[a]/sc[a]).toFixed(3)})"></em></div>`).join(""))}hint(e,t=2200){let n=this.el.hint;window.clearTimeout(this.hintTimer),n.textContent=e,n.classList.toggle("on",!!e),e&&(this.hintTimer=window.setTimeout(()=>n.classList.remove("on"),t))}toast(e,t=1400){let n=this.el.toast;window.clearTimeout(this.toastTimer),n.textContent=e,n.classList.add("on"),this.toastTimer=window.setTimeout(()=>n.classList.remove("on"),t)}flash(e){let t=this.el.flash;t.className="flash",t.offsetWidth,t.className="flash "+e}result(e){this.el["r-score"].textContent=String(e.score),this.el["r-stars"]&&(this.el["r-stars"].textContent=String(e.stars||0)),this.el["r-coins"].textContent=String(e.coins),this.el["r-dist"].textContent=e.distance+" "+cn("meters"),this.el["r-best"].textContent=String(e.best),this.el.newbest.classList.toggle("on",e.newBest)}};var wc=new URLSearchParams(location.search).has("test"),mM=window.__CORE_URL||"/assets/games/subway/core.glb",gM=window.__SCENERY_URL||"/assets/games/subway/scenery.glb",Cs=window.__boot||{set(){},core:Vu(mM),done(){document.getElementById("loader")?.remove()},fail(s){console.error(s)}},Xu=()=>new Promise(s=>requestAnimationFrame(()=>setTimeout(s,0)));async function xM(){let s=document.getElementById("game"),e=window.devicePixelRatio||1,t=Math.min(e,2.25),n=t,i=new jl({canvas:s,antialias:!0,powerPreference:"high-performance",alpha:!1,stencil:!1,depth:!0});i.outputColorSpace=Pt,i.toneMapping=So,i.toneMappingExposure=1.08,i.shadowMap.enabled=!0,i.shadowMap.type=nl,i.setPixelRatio(n);let r=await Cs.core;Cs.set(.92,cn("preparing")),await Xu();let o=await Gu(r);Cs.set(.95),await Xu();let a=new xc(o,{shadowSize:2048}),l=new ws(1),c=new Mc;c.setMuted(Li("muted",!1));let h=Li("best",0),u=Li("bank",0),d="start",f=0,p=new Set,y=()=>{let B=window.innerWidth,F=window.innerHeight;i.setSize(B,F,!1),s.style.width=B+"px",s.style.height=F+"px",a.resize(B,F)};window.addEventListener("resize",y),window.addEventListener("orientationchange",()=>setTimeout(y,200)),y();let g=()=>{c.unlock(),c.setMuted(!c.muted),ai("muted",c.muted),m.setMuted(c.muted)},m=new Tc(document.getElementById("ui"),{play:()=>w(),resume:()=>x(),pause:()=>v(),restart:()=>{M(!1),w()},home:()=>M(!0),toggleMute:g,langChanged:()=>{},onCharacterSelect:B=>{l.characterId=B.id,a.player.applyCharacter(B)}},c.muted),b=()=>(Date.now()^Math.floor(performance.now()*1e3)^Math.floor(Math.random()*2147483647))>>>0||1,T=b();function M(B){T=b(),l.reset(T,!1),a.resetScenery(T^1542469173),a.fx.clear(),c.stopMusic(),f=0,d="start",m.setStart(h,u),B&&m.show("start")}function w(){if(c.unlock(),c.click(),d==="over"&&M(!1),d!=="start")return;T=b(),l.reset(T,!1),a.resetScenery(T^1025616255);let B=Ci();l.characterId=B.id,a.player.applyCharacter(B),d="play",l.start(),c.startMusic(),m.show("play")}function v(){d==="play"&&(d="pause",c.stopMusic(),m.show("pause"))}function x(){d==="pause"&&(c.unlock(),d="play",c.startMusic(),m.show("play"))}function _(B){if(B==="mute"){g();return}if(d==="start"){(B==="up"||B==="confirm")&&w();return}if(d==="over"){(B==="up"||B==="confirm")&&f>.6&&(M(!1),w());return}if(d==="pause"){(B==="pause"||B==="confirm")&&x();return}c.unlock(),B==="pause"?v():B==="left"?l.left():B==="right"?l.right():B==="up"?l.jump():B==="down"&&l.down()}xm(document.getElementById("ui"),_,()=>d==="play"),document.addEventListener("visibilitychange",()=>{document.hidden&&!wc&&v()});function P(B){switch(a.event(B),B.type){case"jump":c.jump(B.super);break;case"slide":c.slide();break;case"lane":c.lane();break;case"bump":c.bump();break;case"land":B.fall>.5&&c.land();break;case"coin":c.coin(B.streak);break;case"power":B.kind==="star"?c.star():c.power(),m.toast(cn(B.kind)),m.flash("power");break;case"powerEnd":c.powerEnd();break;case"level":c.level(),m.toast(cn("mult")+" \xD7"+B.mult);break;case"stumble":c.stumble(),m.flash("hit"),m.toast(cn("careful"),1600);break;case"crash":{c.crash(),c.stopMusic(),m.flash("crash");let F=Math.floor(l.score),K=F>h;K&&(h=F,ai("best",h)),u+=l.coins,ai("bank",u),bm(F,l.stars),m.result({score:F,coins:l.coins,stars:l.stars,distance:Math.floor(l.d),best:h,newBest:K}),f=0;break}case"hint":{let F=B.hint,K=F==="ramp"?"hintRamp":"hint"+F[0].toUpperCase()+F.slice(1)+(m.touch?"Touch":"Keys");m.hint(cn(K),2400);break}}}let R=0,C=0,D=0;function q(B){if(wc||d!=="play"||(R+=B,C++,C<60))return;let F=R/C;R=0,C=0,F>1/45&&n>.75?(n=Math.max(.75,n-.25),i.setPixelRatio(n),y(),D=0):F<1/57?(D+=1,D>5&&n<t&&(n=Math.min(t,n+.25),i.setPixelRatio(n),y(),D=0)):D=0}function I(B,F=!0){d==="play"&&l.update(B);let K=l.drainEvents();for(let he of K)P(he);d==="play"&&!l.alive?(f+=B,f>1.2&&(d="over",m.show("over"))):d==="over"&&(f+=B),d==="play"&&l.d>260&&!Li("tutorialDone",!1)&&ai("tutorialDone",!0),d!=="start"&&a.player.update(l,d==="pause"?0:B,K),a.sync(l,d==="pause"?0:B,d==="start"),c.tempo=108+(l.speed-vr.start)*1.6;let Z=0;if(d==="play"&&l.alive){for(let he of l.obs){if(he.kind!=="mtrain"||he.d1<l.d)continue;let Re=Math.max(0,he.d0-l.d);Re<130&&(Z=Math.max(Z,1-Re/130)),Re<90&&!p.has(he.id)&&(p.add(he.id),c.horn())}p.size>50&&p.clear()}c.rumble(Z),m.hud(Math.floor(l.score),l.coins,l.mult,l.power,l.stars),F&&i.render(a.scene,a.camera)}M(!1),Cs.set(.97),await Xu(),a.sync(l,0,!0),a.warm(i),Cs.set(1),m.show("start"),Cs.done();let z=performance.now(),Y=B=>{let F=Math.min(.05,(B-z)/1e3);z=B,I(F),q(F),requestAnimationFrame(Y)};wc?i.render(a.scene,a.camera):requestAnimationFrame(Y);let V=Vu(gM).then(Gu).then(B=>(a.addScenery(B),a.warmScenery(i),!0)).catch(B=>(console.warn("scenery",B),!1));if(wc){let B=F=>l.d+F;window.__run={ready:!0,sceneryReady:V,sim:l,world:a,renderer:i,start(F={}){return l.noSpawn=!!F.noSpawn,l.invincible=!!F.invincible,l.speedOverride=F.speed||0,l.reset(F.seed??7,!!F.tutorial),a.resetScenery(),a.fx.clear(),d="start",w(),l.snapshot()},title(){return M(!0),I(0),!0},step(F,K=1/60,Z=!1){let he=Math.max(1,Math.round(F/K));for(let Re=0;Re<he;Re++)I(K,!1);return Z&&i.render(a.scene,a.camera),l.snapshot()},stepTo(F,K=1/60,Z=!1){let he=0;for(;l.d<F&&he++<2e4&&d==="play"&&l.alive;)I(K,!1);return Z&&i.render(a.scene,a.camera),l.snapshot()},render(){return i.render(a.scene,a.camera),!0},state(){return{screen:d,...l.snapshot()}},clear(){return l.clearWorld(),!0},place(F,K,Z,he=1){let Re=B(Z),$=F==="train"?Jn(he):F==="mtrain"?Jn(he)/(1+wn.ratio):$t[F].depth;return l.addOb({kind:F,lane:K,d0:Re,d1:Re+$,cars:he}).id},coin(F,K,Z=.85){return l.addCoin(F,B(K),Z),!0},power(F,K,Z){return l.addPower(F,K,B(Z),1.1),!0},input(F){return _(F),!0},stats(){let F=0;a.scene.traverse(()=>F++);let K=i.info;return{objects:F,programs:K.programs?K.programs.length:-1,calls:K.render.calls,triangles:K.render.triangles,geometries:K.memory.geometries,textures:K.memory.textures,pixelRatio:i.getPixelRatio(),created:l.created}},autopilot(F,K,Z=1/60){for(l.noSpawn=!0,l.invincible=!1,l.speedOverride=0,l.reset(F,!1);l.track.frontier<K+50;)l.track.ensure(K+50);let he=l.obs.map(ke=>ws.specOf(ke)),Re=Mr(he,0,l.track.frontier,[1],Kn,!0,1);if(!Re.path)return{ok:!1,reason:"no path"};d="start",w();let $=0,ge=0,de=0,De=0,ae=.5,Fe=ke=>Re.path[Math.max(0,Math.min(Re.path.length-1,Math.round(ke/ae)))].lane,Et=0;for(;l.d<K&&l.alive&&Et++<4e5;){let ke=l.speed,ne=Fe(l.d+ke*.1+.6);ne!==l.lane&&l.laneT>=1&&(ne<l.lane?l.left():l.right(),De++);for(let ce of l.obs){if(ce.lane!==l.lane&&Math.abs(l.x-Ht(ce.lane))>.9)continue;let Ce=ce.d0-l.d;(ce.kind==="low"||ce.kind==="hurdle")&&l.grounded&&Ce>0&&Ce<ke*.2+.8&&(l.jump(),ge++),ce.kind==="overhead"&&Ce>0&&Ce<ke*.1+1&&!l.sliding&&(l.down(),de++)}let fe=l.sinceStumble;I(Z,!1),l.sinceStumble<fe&&$++}let Ge=l.alive?[]:l.obs.filter(ke=>ke.d1>l.d-12&&ke.d0<l.d+12).map(ke=>`${ke.kind}:${ke.lane}:${ke.d0.toFixed(1)}-${ke.d1.toFixed(1)}`),et=l.alive?"":[-10,-8,-6,-4,-2,0,2,4,6].map(ke=>Fe(l.d+ke)+(Re.path[Math.round((l.d+ke)/ae)]?.top?"t":"")).join(",");return{ok:l.alive&&l.d>=K,d:+l.d.toFixed(1),x:+l.x.toFixed(2),y:+l.y.toFixed(2),lane:l.lane,stumbles:$,jumps:ge,slides:de,lanes:De,alive:l.alive,near:Ge,pl:et,sliding:l.sliding}},mapCheck(F,K){let Z=new ws(F);for(Z.noSpawn=!0,Z.reset(F,!1);Z.track.frontier<K;)Z.track.ensure(K);let he=Z.obs.map(de=>ws.specOf(de)),Re=Mr(he,0,Z.track.frontier,[1],Kn,!1),$={};for(let de of he)$[de.kind]=($[de.kind]||0)+1;let ge=0;for(let de=0;de<3;de++){let De=he.filter(ae=>ae.lane===de&&ae.kind!=="train"&&ae.kind!=="ramp"&&ae.kind!=="mtrain").sort((ae,Fe)=>ae.d0-Fe.d0);for(let ae=1;ae<De.length;ae++)De[ae].d0-De[ae-1].d1<Kn(De[ae].d0)*.7&&ge++}return{ok:Re.ok,failAt:Math.round(Re.failAt),near:Re.ok?[]:he.filter(de=>de.d1>Re.failAt-30&&de.d0<Re.failAt+15).map(de=>`${de.kind}:${de.lane}:${de.d0.toFixed(1)}-${de.d1.toFixed(1)}`),length:Math.round(Z.track.frontier),obstacles:he.length,kinds:$,chunks:Z.track.chunks,fallbacks:Z.track.failures,tight:ge,coins:Z.coinList.length,powers:Z.powers.length}}}}}xM().catch(s=>{console.error(s),Cs.fail(cn("loadFail"))});})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
