webpackJsonp([1],{"4fL8":function(t,i){},BAWA:function(t,i){},"ES/+":function(t,i,e){t.exports=e.p+"static/media/CroatianRhapsodyMini.6a75a4d.mp3"},NHnr:function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var n=e("7+uW"),s={render:function(){var t=this.$createElement,i=this._self._c||t;return i("div",{attrs:{id:"app"}},[i("router-view")],1)},staticRenderFns:[]};var a=e("VU/8")({name:"App"},s,!1,function(t){e("BAWA")},null,null).exports,o=e("/ocq"),r=e("woOf"),h=e.n(r),c=e("Zrlr"),u=e.n(c),d=e("wxAW"),l=e.n(d),f=function(){function t(i,e,n,s){u()(this,t),this.ctx=i,this.width=e,this.height=n,this.radiusConst=s,this.reset(0,0,"",!1)}return l()(t,[{key:"paint",value:function(){this.ctx.fillStyle=this.color,this.ctx.beginPath(),this.ctx.arc(this.x,this.y,this.radius,0,2*Math.PI),this.ctx.fill()}},{key:"reset",value:function(t,i){var e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",n=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];this.x=t,this.y=i,this.vx=0,this.vy=0,this.radius=0,this.color=e,this.visible=n,this.drop=!1}},{key:"goDrop",value:function(){var t=Math.random()*this.width/75+10;this.drop=!0,this.vx=Math.random()>=.5?t:-t,this.vy=-(Math.random()*this.width/20+10)}},{key:"update",value:function(t){if(this.drop){this.x+=this.vx*t,this.y+=this.vy*t;var i=this.vy+10*t;this.y>=this.height-this.radiusConst&&(this.y=this.height-this.radiusConst,i=.8*-i),this.vy=i,(this.x<=-this.radiusConst||this.x>=this.width+this.radiusConst)&&(this.visible=!1)}this.radius<this.radiusConst&&(this.radius+=.5)}}]),t}(),v={0:["1111","1001","1001","1001","1001","1001","1111"],1:["0001","0001","0001","0001","0001","0001","0001"],2:["1111","0001","0001","1111","1000","1000","1111"],3:["1111","0001","0001","1111","0001","0001","1111"],4:["1001","1001","1001","1111","0001","0001","0001"],5:["1111","1000","1000","1111","0001","0001","1111"],6:["1111","1000","1000","1111","1001","1001","1111"],7:["1111","0001","0001","0001","0001","0001","0001"],8:["1111","1001","1001","1111","1001","1001","1111"],9:["1111","1001","1001","1111","0001","0001","1111"],A:["0000","0000","0000","0000","0000","0000","0000"],":":["0000","0000","0010","0000","0010","0000","0000"]},m=["#7c5be6","#4292e4","#ffffff","#01c9d2","#9cd321","#ffffff","#ff8556","#fecd0f"],p=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)},w=window.AudioContext||window.webkitAudioContext||window.mozAudioContext,y=null,g=0,x=0,A=new Date,C=new Date,S=!1,b=0,R=0,k=0,_=0,q=0,E=0,F=[],M={name:"cool-clock",mounted:function(){b=window.innerWidth,R=b/2|0,E=4*(2*(k=b/125|0)+(_=b/100|0))+(q=b/100|0);var t=this.$refs.topLayer,i={width:b,height:R};h()(t,i),y=t.getContext("2d"),g=(t.width-(4*(2*k+_)*8+7*q))/2|0,x=(t.height-6*(2*k+_))/3|0;for(var e=0;e<200;++e)F.push(new f(y,b,R,k));this.setTime(A),this.goAnimate()},methods:{getXY:function(t,i,e){return{x:g+E*t+(2*k+_)*e,y:x+i*(2*k+_)}},goAnimate:function(){y.clearRect(0,0,b,R),(C=new Date)-A>=1e3&&(this.setTime(C),A=C,S=!S),F.forEach(function(t){t.visible&&(t.update(16/70),t.paint())}),p(this.goAnimate)},setTime:function(t){var i=this,e=this.getHandleTime(t.getHours()),n=this.getHandleTime(t.getMinutes()),s=this.getHandleTime(t.getSeconds()),a=e+(S?":":"A")+n+(S?":":"A")+s,o=0;for("";o<a.length;++o)for(var r=0;r<7;++r)for(var h=function(t){var e=i.getXY(o,r,t),n=e.x,s=e.y,h=null,c=null,u=v[a[o]][r][t];F.some(function(t){return t.visible&&t.x===n&&t.y===s?h=t:t.visible||c||(c=t),h&&c}),h&&"0"===u?h.goDrop():h||"1"!==u||c.reset(n,s,m[o])},c=0;c<4;++c)h(c)},getHandleTime:function(t){return t>=10?""+t:"0"+t}}},T={render:function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"cool-clock-container"},[i("canvas",{ref:"topLayer",staticClass:"top"},[this._v("抱歉，您的浏览器不支持canvas")])])},staticRenderFns:[]};var B=e("VU/8")(M,T,!1,function(t){e("4fL8")},"data-v-0c702dc2",null).exports,H=void 0,D=void 0,L=void 0,W=void 0,$=void 0,P=void 0,U=document.createElement("canvas"),X=U.getContext("2d");U.width=0,U.height=270;var z=X.createLinearGradient(0,0,0,270);z.addColorStop(0,"red"),z.addColorStop(.4,"yellow"),z.addColorStop(1,"#00E800");var I=[],V=new w,Z=function(){function t(i,e,n,s,a){u()(this,t),this.x=i,this.y=e,this.w=n,this.h=s,this.dy=e,this.space=a}return l()(t,[{key:"update",value:function(t){(t|=0)>=this.y-this.dy?this.dy=this.y-t:this.dy+=1,this.draw(t)}},{key:"draw",value:function(t){X.fillStyle=z;var i=t/(this.h+this.space)|0,e=i*(this.h+this.space);X.fillRect(this.x,this.y-e,this.w,t);for(var n=1;n<=i;++n)X.clearRect(this.x,this.y-n*(this.h+this.space),this.w,this.space);X.fillStyle="#950000",X.fillRect(this.x,this.dy-this.h,this.w,this.h)}}]),t}(),G={name:"music-player",mounted:function(){this.init();var t=document.querySelector("#music"),i=V.createMediaElementSource(t),e=V.createGain();P=V.createAnalyser(),e.gain.value=1,i.connect(P),P.connect(e),e.connect(V.destination);for(var n=0;n<32;++n)I.push(new Z(n*(D+5),270,D,L,2));this.animate()},methods:{init:function(){H=document.querySelector(".right").getBoundingClientRect().width,D=H/32-5|0,L=5,W=document.querySelector("#bottomCanvas"),U.width=W.width=H,W.height=540,$=W.getContext("2d")},createAudioSource:function(){P.fftSize=64;var t=P.frequencyBinCount,i=new Uint8Array(t);return P.getByteFrequencyData(i),i},drawBottom:function(){$.drawImage(U,0,0),$.save(),$.scale(1,-1),$.drawImage(U,0,-540),$.restore(),$.fillStyle="rgba(0, 0, 0, 0.8)",$.fillRect(0,270,H,270)},animate:function(){var t=this.createAudioSource();$.clearRect(0,0,H,540),X.clearRect(0,0,H,270);for(var i=0;i<32;++i)I[i].update(t[i]);this.drawBottom(),p(this.animate)}}},N={render:function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"music-player-container"},[i("audio",{attrs:{id:"music",loop:"",autoplay:"",src:e("ES/+")}}),this._v(" "),this._m(0)])},staticRenderFns:[function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"right"},[i("canvas",{attrs:{id:"bottomCanvas"}})])}]};var O=e("VU/8")(G,N,!1,function(t){e("bgZX")},null,null).exports;n.a.use(o.a);var Y=new o.a({routes:[{path:"/cool-clock",name:"CoolClock",component:B},{path:"/music-player",name:"MusicPlayer",component:O}]});n.a.config.productionTip=!1,new n.a({el:"#app",router:Y,components:{App:a},template:"<App/>"})},bgZX:function(t,i){}},["NHnr"]);
//# sourceMappingURL=app.7d744f1942b6f13a6efb.js.map