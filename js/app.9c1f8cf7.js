(function(){"use strict";var t={1408:function(t,e,r){var s=r(9963),n=r(6252);const o={class:"container"},a=(0,n._)("body",null,null,-1);function i(t,e,r,s,i,c){const u=(0,n.up)("Header"),h=(0,n.up)("router-view"),l=(0,n.up)("Footer");return(0,n.wg)(),(0,n.iD)(n.HY,null,[(0,n._)("div",o,[(0,n.Wm)(u),(0,n.Wm)(h),a]),(0,n.Wm)(l)],64)}const c=t=>((0,n.dD)("data-v-e9c8b58e"),t=t(),(0,n.Cn)(),t),u=c((()=>(0,n._)("h1",null,"Spotify Matcher",-1)));function h(t,e,r,s,o,a){const i=(0,n.up)("AuthenticatedPrev"),c=(0,n.up)("Button");return(0,n.wg)(),(0,n.iD)(n.HY,null,[(0,n._)("header",null,[u,1==a.tokenIsValid()?((0,n.wg)(),(0,n.j4)(i,{key:0})):(0,n.kq)("",!0)]),(0,n._)("body",null,[(0,n._)("div",null,["/"==this.$route.path?((0,n.wg)(),(0,n.j4)(c,{key:0,text:"Login",color:"green",size:"20px 100px",route:"login"})):(0,n.kq)("",!0)])])],64)}var l=r(3577);function p(t,e,r,s,o,a){return(0,n.wg)(),(0,n.iD)("button",{onClick:e[0]||(e[0]=e=>t.$router.push(r.route)),style:(0,l.j5)({background:r.color,padding:r.size,width:r.width,height:r.height}),class:"btn customButton"},(0,l.zw)(r.text),5)}var d={name:"Button",props:{text:String,color:String,route:String,size:String,width:String,height:String},methods:{onClick(){}}},m=r(3744);const g=(0,m.Z)(d,[["render",p]]);var f=g;function w(t,e,r,s,o,a){const i=(0,n.up)("Button");return(0,n.wg)(),(0,n.j4)(i,{color:"green",route:"home",text:"🏠"})}var v={name:"AuthenticatedPrev",components:{Button:f}};const y=(0,m.Z)(v,[["render",w]]);var k=y,b={name:"Header",components:{Button:f,AuthenticatedPrev:k},methods:{tokenIsValid(){Date.now();return null!=localStorage.getItem("jwt")}}};const _=(0,m.Z)(b,[["render",h],["__scopeId","data-v-e9c8b58e"]]);var S=_;const I=(0,n.Uk)("About"),C=(0,n.Uk)(" | Login Page");function D(t,e,r,s,o,a){const i=(0,n.up)("router-link");return(0,n.wg)(),(0,n.iD)(n.HY,null,[(0,n.Wm)(i,{class:"about",to:"/about"},{default:(0,n.w5)((()=>[I])),_:1}),"/"!=this.$route.path?((0,n.wg)(),(0,n.j4)(i,{key:0,class:"about",to:"/"},{default:(0,n.w5)((()=>[C])),_:1})):(0,n.kq)("",!0)],64)}var j={name:"Footer"};const O=(0,m.Z)(j,[["render",D],["__scopeId","data-v-9d78b4d8"]]);var x=O,H={name:"App",components:{Header:S,Footer:x}};const T=(0,m.Z)(H,[["render",i]]);var U=T,E=(r(6699),r(2119));function Z(t,e,r,s,o,a){const i=(0,n.up)("User");return(0,n.wg)(),(0,n.j4)(i,{user:o.profile},null,8,["user"])}var $=r(9669),q=r.n($);const B={class:"card",style:{width:"18rem"}},W=["src"],Y={class:"card-body"},N={class:"card-text"},M={class:"card-text"},P={class:"card-text"},z=(0,n._)("br",null,null,-1),J={key:2};function A(t,e,r,o,a,i){return(0,n.wg)(),(0,n.iD)("div",B,[(0,n._)("img",{src:r.user.image,class:"card-img-top",onError:e[0]||(e[0]=t=>t.target.src="https://static.thenounproject.com/png/82455-200.png")},null,40,W),(0,n._)("div",Y,[(0,n._)("p",N,"Country: "+(0,l.zw)(r.user.country),1),(0,n._)("p",M,"Email: "+(0,l.zw)(r.user.email),1),(0,n._)("p",P,"Biography: "+(0,l.zw)(r.user.biography),1),"/profile"==this.$route.path?(0,n.wy)(((0,n.wg)(),(0,n.iD)("input",{key:0,id:"bioinput",type:"text",class:"form-control",ref:"inp","aria-describedby":"emailHelp",placeholder:"change biography","onUpdate:modelValue":e[1]||(e[1]=e=>t.bid=e)},null,512)),[[s.nr,t.bid]]):(0,n.kq)("",!0),z,"/profile"==this.$route.path?((0,n.wg)(),(0,n.iD)("button",{key:1,type:"button",onClick:e[2]||(e[2]=t=>i.setBio()),class:"btn setBio"}," Set Bio ")):(0,n.kq)("",!0),1==a.enough?((0,n.wg)(),(0,n.iD)("label",J,"Minimum 20 characters")):(0,n.kq)("",!0)])])}var V={name:"User",props:{user:Object},data(){return{id:String,enough:Boolean}},methods:{setBio(){if(!this.checkInput())return void(this.enough=!0);let t=localStorage.getItem("jwt");t=t.substring(1,t.length),q().post("https://spotifymatcher-api.herokuapp.com/spotifymatcher/users/bio",this.bid,{headers:{"Content-Type":"text/plain",jwt:t}}).then((()=>location.reload())).catch((t=>{200!==t.response.status&&this.$router.push("error")}))},checkInput(){return this.bid.length>=20}}};const K=(0,m.Z)(V,[["render",A]]);var R=K,F={name:"ProfileView",components:{User:R},data(){return{profile:Object,token:String}},async created(){let t=localStorage.getItem("jwt");t=t.substring(1,t.length);try{const e=await q().get("https://spotifymatcher-api.herokuapp.com/spotifymatcher/users/profile",{headers:{jwt:t}});this.profile=e.data}catch(e){this.$router.push("error"),console.error(e)}}};const L=(0,m.Z)(F,[["render",Z]]);var G=L;const Q={class:"buttonsContainer"},X={key:0};function tt(t,e,r,s,o,a){const i=(0,n.up)("Button"),c=(0,n.up)("profile-view");return(0,n.wg)(),(0,n.iD)(n.HY,null,[(0,n._)("div",Q,[(0,n.Wm)(i,{text:"profile",color:"green",route:"profile"}),(0,n.Wm)(i,{text:"tracks",color:"green",route:"tracks"}),(0,n.Wm)(i,{text:"matches",color:"green",route:"matches"}),(0,n.Wm)(i,{width:"28.6%",text:"chat",color:"green",route:"chat"}),(0,n.Wm)(i,{width:"100%",height:"100%",text:"match",route:"matcher"})]),"profile"==o.currentPage?((0,n.wg)(),(0,n.iD)("div",X,[(0,n.Wm)(c)])):(0,n.kq)("",!0)],64)}var et={name:"Home",data(){return{currentPage:"home"}},components:{Button:f}};const rt=(0,m.Z)(et,[["render",tt],["__scopeId","data-v-b5d3053c"]]);var st=rt;function nt(t,e,r,s,o,a){const i=(0,n.up)("Tracks");return(0,n.wg)(),(0,n.j4)(i,{tracks:o.tracks},null,8,["tracks"])}const ot={class:"row row-cols-1 row-cols-md-5"},at={class:"col mb-4"};function it(t,e,r,s,o,a){const i=(0,n.up)("Track");return(0,n.wg)(),(0,n.iD)("div",ot,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(r.tracks,(t=>((0,n.wg)(),(0,n.iD)("div",{key:t.id},[(0,n._)("div",at,[(0,n.Wm)(i,{track:t},null,8,["track"])])])))),128))])}const ct={class:"card",style:{width:"10rem"}},ut=["src"],ht={class:"card-body"},lt=["href"];function pt(t,e,r,s,o,a){return(0,n.wg)(),(0,n.iD)("div",ct,[(0,n._)("img",{src:r.track.imageUrl,onError:e[0]||(e[0]=t=>t.target.src="https://static.thenounproject.com/png/82455-200.png"),width:"100",height:"100"},null,40,ut),(0,n._)("div",ht,[(0,n._)("a",{href:r.track.href,style:{"text-decoration":"none"}},(0,l.zw)(r.track.name),9,lt)])])}var dt={name:"Track",props:{track:Object}};const mt=(0,m.Z)(dt,[["render",pt]]);var gt=mt,ft={name:"Tracks",components:{Track:gt},props:{tracks:Array}};const wt=(0,m.Z)(ft,[["render",it]]);var vt=wt,yt={name:"TracksView",components:{Tracks:vt},data(){return{tracks:[]}},async created(){let t=localStorage.getItem("jwt");t=t.substring(1,t.length);try{const e=await q().get("https://spotifymatcher-api.herokuapp.com/spotifymatcher/users/tracks",{headers:{jwt:t}});this.tracks=e.data}catch(e){this.$router.push("error"),console.error(e)}}};const kt=(0,m.Z)(yt,[["render",nt]]);var bt=kt;const _t={key:0};function St(t,e,r,s,o,a){const i=(0,n.up)("Users");return(0,n.wg)(),(0,n.iD)(n.HY,null,[(0,n.Wm)(i,{users:o.users},null,8,["users"]),o.users.length?(0,n.kq)("",!0):((0,n.wg)(),(0,n.iD)("h4",_t,"No matches found"))],64)}const It={class:"row row-cols-1 row-cols-md-3"},Ct={class:"col mb-4"};function Dt(t,e,r,s,o,a){const i=(0,n.up)("User");return(0,n.wg)(),(0,n.iD)("div",It,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(r.users,(t=>((0,n.wg)(),(0,n.iD)("div",{key:t.id},[(0,n._)("div",Ct,[(0,n.Wm)(i,{user:t},null,8,["user"])])])))),128))])}var jt={name:"Users",components:{User:R},props:{users:Array}};const Ot=(0,m.Z)(jt,[["render",Dt]]);var xt=Ot,Ht={name:"Matches",components:{Users:xt},data(){return{users:[]}},async created(){let t=localStorage.getItem("jwt");t=t.substring(1,t.length);try{const e=await q().get("https://spotifymatcher-api.herokuapp.com/spotifymatcher/users/matches",{headers:{jwt:t}});this.users=e.data}catch(e){this.$router.push("error"),console.error(e)}}};const Tt=(0,m.Z)(Ht,[["render",St]]);var Ut=Tt;const Et={key:0};function Zt(t,e,r,s,o,a){const i=(0,n.up)("Users");return(0,n.wg)(),(0,n.iD)(n.HY,null,[(0,n.Wm)(i,{users:o.users},null,8,["users"]),o.users.length?(0,n.kq)("",!0):((0,n.wg)(),(0,n.iD)("h4",Et,"No matches found"))],64)}var $t={name:"Matcher",components:{Users:xt},data(){return{users:[]}},async created(){let t=localStorage.getItem("jwt");t=t.substring(1,t.length);try{const e=await q().get("https://spotifymatcher-api.herokuapp.com/spotifymatcher/users/match",{headers:{jwt:t}});this.users=e.data}catch(e){401==e.response.status?this.$router.push({name:"Error",params:{message:"You need to link your socials in biography before trying to match."}}):this.$router.push("error")}}};const qt=(0,m.Z)($t,[["render",Zt]]);var Bt=qt;const Wt=(0,n._)("p",null," The main functionality of this app is to match users depending on their most listend to songs on Spotify. ",-1),Yt=(0,n._)("p",null,[(0,n.Uk)(" Website was developed for learning purposes and is still under developement by "),(0,n._)("a",{href:"https://github.com/dev-rifaii/"},"dev-rifaii")],-1);function Nt(t,e,r,s,o,a){return(0,n.wg)(),(0,n.iD)(n.HY,null,[Wt,Yt],64)}var Mt={name:"About"};const Pt=(0,m.Z)(Mt,[["render",Nt]]);var zt=Pt;const Jt=(0,n._)("h1",null,"Error",-1),At={key:0};function Vt(t,e,r,s,o,a){return(0,n.wg)(),(0,n.iD)(n.HY,null,[Jt,null!=r.message?((0,n.wg)(),(0,n.iD)("p",At,"💥"+(0,l.zw)(r.message),1)):(0,n.kq)("",!0)],64)}var Kt={name:"Error",props:{message:String}};const Rt=(0,m.Z)(Kt,[["render",Vt]]);var Ft=Rt;const Lt={key:0},Gt={class:"wrapper"},Qt={class:"content"},Xt=["onClick"],te=["src"],ee={class:"chatbox"},re={id:"messages",class:"convo-container"},se={key:0,class:"message sender"},ne=["src"],oe={class:"sender-message-content"},ae={key:1,class:"message recipient"},ie=["src"],ce={class:"recipient-message-content"},ue={class:"chatboxfooter"},he={key:1};function le(t,e,r,o,a,i){return(0,n.wg)(),(0,n.iD)(n.HY,null,[this.matches.length>0?((0,n.wg)(),(0,n.iD)("div",Lt,[(0,n._)("div",Gt,[(0,n._)("div",Qt,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(a.matches,(t=>((0,n.wg)(),(0,n.iD)("div",{key:t.id},[(0,n._)("div",{onClick:e=>i.setCurrentRecipient(t)},[(0,n._)("img",{class:"img",src:t.image},null,8,te)],8,Xt)])))),128))]),(0,n._)("div",ee,[(0,n._)("div",re,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(a.received_messages,((t,e)=>((0,n.wg)(),(0,n.iD)("div",{key:e},[t.senderId==a.user.id?((0,n.wg)(),(0,n.iD)("div",se,[(0,n._)("img",{class:"avatar",src:a.user.image},null,8,ne),(0,n._)("p",oe,(0,l.zw)(t.content),1)])):(0,n.kq)("",!0),t.senderId==a.current_recipient.id?((0,n.wg)(),(0,n.iD)("div",ae,[(0,n._)("img",{class:"avatar",src:a.current_recipient.image},null,8,ie),(0,n._)("p",ce,(0,l.zw)(t.content),1)])):(0,n.kq)("",!0)])))),128))]),(0,n._)("div",ue,[(0,n.wy)((0,n._)("input",{class:"form-control",placeholder:"enter message","onUpdate:modelValue":e[0]||(e[0]=e=>t.msg=e),onKeyup:e[1]||(e[1]=(0,s.D2)((t=>i.send()),["enter"]))},null,544),[[s.nr,t.msg]]),(0,n._)("button",{class:"btn btn-default",onClick:e[2]||(e[2]=t=>i.send())},"send")])])])])):(0,n.kq)("",!0),0===this.matches.length?((0,n.wg)(),(0,n.iD)("h1",he," Come back when you match with someone! ")):(0,n.kq)("",!0)],64)}var pe=r(8e3),de=r.n(pe),me=r(5016),ge=r.n(me),fe={components:{Button:f},name:"Chat",data(){return{matches:[],received_messages:[],user:null,current_recipient:null}},async created(){let t=localStorage.getItem("jwt");t=t.substring(1,t.length-1),await this.getUser(t),await this.getMatches(t),this.connect(t)},methods:{setCurrentRecipient(t){this.current_recipient=t,null!=localStorage.getItem(this.getCurrentConvoId())?this.received_messages=JSON.parse(localStorage.getItem(this.getCurrentConvoId())):this.received_messages=[]},async getMatches(t){try{const e=await q().get("https://spotifymatcher-api.herokuapp.com/spotifymatcher/users/matches",{headers:{jwt:t}});this.matches=e.data,this.matches.length>0&&(this.current_recipient=e.data[0],null!=localStorage.getItem(this.getCurrentConvoId())&&(this.received_messages=JSON.parse(localStorage.getItem(this.getCurrentConvoId()))))}catch(e){this.$router.push("error"),console.error(e)}},async getUser(t){try{const e=await q().get("https://spotifymatcher-api.herokuapp.com/spotifymatcher/users/profile",{headers:{jwt:t}});this.user=e.data}catch(e){this.$router.push("error"),console.error(e)}},send(){if(this.msg.length>0){const t={senderId:this.user.id,recipientId:this.current_recipient.id,content:this.msg};this.stompClient.send("/app/private",JSON.stringify(t),{}),this.persistMessage(t),this.received_messages.push(t),this.msg="",this.scrollToEnd()}},scrollToEnd(){var t=this.$el.querySelector("#messages");t.scrollTop=t.scrollHeight},persistMessage(t){const e=this.calConvoId(t);if(null==localStorage.getItem(e)){const r=[t];localStorage.setItem(e,JSON.stringify(r))}else{let r=JSON.parse(localStorage.getItem(e));r.push(t),localStorage.setItem(e,JSON.stringify(r))}},connect(t){this.socket=new(de())("https://music-matcher-chatapp.herokuapp.com/chat"),this.stompClient=ge().over(this.socket),this.stompClient.connect({},(e=>{this.stompClient.subscribe(`/user/${this.user.id}/dm`,(t=>{console.log("messag received"+t.body);const e=JSON.parse(t.body);this.persistMessage(e),this.received_messages.push(e),this.getCurrentConvoId()===this.calConvoId(e)&&this.scrollToEnd()}),{id:this.user.id,jwt:t})}),(t=>{this.$router.push({name:"Error",params:{message:"Chat server is down"}}),console.log(t)}))},getCurrentConvoId(){return this.hashCode(this.user.id)+this.hashCode(this.current_recipient.id)},calConvoId(t){return this.hashCode(t.senderId)+this.hashCode(t.recipientId)},hashCode(t){for(var e=0,r=0;r<t.length;r++){var s=t.charCodeAt(r);e=(e<<5)-e+s,e&=e}return e}}};const we=(0,m.Z)(fe,[["render",le],["__scopeId","data-v-9a0e2420"]]);var ve=we;const ye=r(9669),ke=((0,E.yj)(),["/","/login","/callback","/error","/about"]),be=[{path:"/chat",name:"Chat",component:ve},{path:"/error",name:"Error",component:Ft,props:!0},{path:"/about",name:"About",component:zt},{path:"/matcher",name:"Matcher",component:Bt},{path:"/matches",name:"Matches",component:Ut},{path:"/tracks",name:"TracksView",component:bt},{path:"/home",name:"Home",component:st},{path:"/profile",name:"ProfileView",component:G},{path:"/refresh",beforeEnter(t,e,r){Util.refreshToken()}},{path:"/login",beforeEnter(t,e,r){async function s(){return await ye.get("https://spotifymatcher-api.herokuapp.com/spotifymatcher/authentication/url",{headers:{baseRoute:"https://dev-rifaii.github.io/spotify-matcher-frontend"}}).catch((function(t){De.push({name:"Error",params:{message:"Server is down"}})}))}async function n(){const t=await s();null!=t&&window.location.replace(t.data)}n()}},{path:"/callback",async beforeEnter(t,e){let r=new URLSearchParams(window.location.search),s=r.get("code");await Se(s);let n=await _e();await Ie(n),je()?De.push("/home"):setTimeout((function(){De.push("/home")}),2e3)}}];async function _e(){const t=JSON.parse(localStorage.getItem("token"));try{const e=await ye.get("https://spotifymatcher-api.herokuapp.com/spotifymatcher/authentication/id",{headers:{token:t.access_token}});return e.data}catch(e){De.push("error"),console.error(e)}}async function Se(t){async function e(){return await ye.get("https://spotifymatcher-api.herokuapp.com/spotifymatcher/authentication/token",{headers:{code:t,baseRoute:"https://dev-rifaii.github.io/spotify-matcher-frontend"}}).catch((function(t){return t.response}))}async function r(){const t=await e();if(400===t.status)De.push({name:"Error",params:{message:"There was a problem logging in."}});else{new Date;Ce(t.data.access_token),localStorage.setItem("token",JSON.stringify(t.data))}}await r()}async function Ie(t){async function e(){return await ye.get("https://music-matcher-jwt.herokuapp.com/api/token",{headers:{userId:t}}).catch((function(t){return t.response}))}async function r(){const t=await e();400===t.status?De.push({name:"Error",params:{message:"There was a problem logging in."}}):localStorage.setItem("jwt",JSON.stringify(t.data))}await r()}function Ce(t){ye.post("https://spotifymatcher-api.herokuapp.com/spotifymatcher/authentication/persist",null,{headers:{token:t}})}const De=(0,E.p7)({history:(0,E.PO)("/spotify-matcher-frontend/"),routes:be});function je(){return null!=localStorage.getItem("token")}function Oe(){const t=Date.now();return JSON.parse(localStorage.getItem("token")).expires_at>t}De.beforeEach(((t,e)=>!!(je()&&Oe()||ke.includes(t.path))));var xe=De;(0,s.ri)(U).use(xe).mount("#app")}},e={};function r(s){var n=e[s];if(void 0!==n)return n.exports;var o=e[s]={exports:{}};return t[s].call(o.exports,o,o.exports,r),o.exports}r.m=t,function(){var t=[];r.O=function(e,s,n,o){if(!s){var a=1/0;for(h=0;h<t.length;h++){s=t[h][0],n=t[h][1],o=t[h][2];for(var i=!0,c=0;c<s.length;c++)(!1&o||a>=o)&&Object.keys(r.O).every((function(t){return r.O[t](s[c])}))?s.splice(c--,1):(i=!1,o<a&&(a=o));if(i){t.splice(h--,1);var u=n();void 0!==u&&(e=u)}}return e}o=o||0;for(var h=t.length;h>0&&t[h-1][2]>o;h--)t[h]=t[h-1];t[h]=[s,n,o]}}(),function(){r.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(e,{a:e}),e}}(),function(){r.d=function(t,e){for(var s in e)r.o(e,s)&&!r.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:e[s]})}}(),function(){r.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){var t={143:0};r.O.j=function(e){return 0===t[e]};var e=function(e,s){var n,o,a=s[0],i=s[1],c=s[2],u=0;if(a.some((function(e){return 0!==t[e]}))){for(n in i)r.o(i,n)&&(r.m[n]=i[n]);if(c)var h=c(r)}for(e&&e(s);u<a.length;u++)o=a[u],r.o(t,o)&&t[o]&&t[o][0](),t[o]=0;return r.O(h)},s=self["webpackChunkst"]=self["webpackChunkst"]||[];s.forEach(e.bind(null,0)),s.push=e.bind(null,s.push.bind(s))}();var s=r.O(void 0,[998],(function(){return r(1408)}));s=r.O(s)})();
//# sourceMappingURL=app.9c1f8cf7.js.map