const $=id=>document.getElementById(id),LS=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch(e){return d}},SV=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}};
const PRE=`<body style="margin:0;background:#06122a"><canvas id=c style="width:100%;display:block"></canvas><script>const cv=document.getElementById('c'),ctx=cv.getContext('2d'),W=cv.width=480,H=cv.height=320,keys={};let mx=W/2,my=H/2;onkeydown=e=>{keys[e.key]=1;if(e.key.startsWith('Arrow'))e.preventDefault()};onkeyup=e=>keys[e.key]=0;cv.onmousemove=e=>{const r=cv.getBoundingClientRect();mx=(e.clientX-r.left)*W/r.width;my=(e.clientY-r.top)*H/r.height};ctx.font='16px sans-serif';function loop(f){(function t(){ctx.clearRect(0,0,W,H);f();requestAnimationFrame(t)})()}onerror=m=>parent.postMessage({err:String(m)},'*');setTimeout(()=>parent.postMessage({ok:1},'*'),600);<\/script><script>`;
const wrap=c=>PRE+c.replace(/<\/script/gi,'<\\/script')+'<\/script>';
const TPL={
car:`// Drive with the arrow keys
let x=W/2,y=H-60,s=0;
loop(()=>{
  if(keys.ArrowLeft)x-=4; if(keys.ArrowRight)x+=4;
  if(keys.ArrowUp)y-=4; if(keys.ArrowDown)y+=4;
  x=Math.max(20,Math.min(W-20,x)); y=Math.max(30,Math.min(H-30,y));
  ctx.fillStyle='#2f7bff'; ctx.fillRect(x-16,y-28,32,56);
  ctx.fillStyle='#fff'; ctx.fillRect(x-12,y-20,24,14);
});`,
catch:`let px=W/2,s=0,it=[];
loop(()=>{ px=mx;
  if(Math.random()<.04)it.push({x:Math.random()*W,y:0});
  ctx.fillStyle='#5aa2ff'; ctx.fillRect(px-30,H-20,60,12);
  it.forEach(o=>{o.y+=3;ctx.beginPath();ctx.arc(o.x,o.y,8,0,7);ctx.fill();if(o.y>H-20&&Math.abs(o.x-px)<34){s++;o.y=999}});
  it=it.filter(o=>o.y<H); ctx.fillStyle='#fff'; ctx.fillText('Score '+s,10,22);
});`,
click:`let t={x:100,y:100},s=0;
cv.onclick=()=>{ if(Math.hypot(mx-t.x,my-t.y)<24){s++;t={x:30+Math.random()*(W-60),y:40+Math.random()*(H-80)}} };
loop(()=>{ ctx.fillStyle='#2f7bff';ctx.beginPath();ctx.arc(t.x,t.y,24,0,7);ctx.fill();
  ctx.fillStyle='#fff';ctx.fillText('Hits '+s,10,22); });`,
blank:`// Write your game here\nloop(()=>{\n  ctx.fillStyle='#fff';\n  ctx.fillText('Hello world',20,40);\n});`};
const SN={score:"ctx.fillStyle='#fff';ctx.fillText('Score '+s,10,22);\n",rand:"const col='hsl('+Math.floor(Math.random()*360)+',80%,60%)';\n",key:"if(keys.ArrowLeft){/* left */}\nif(keys.ArrowRight){/* right */}\n"};
// ---------- games ----------
const A=['Turbo','Pixel','Neon','Cosmic','Jungle','Frozen','Mega','Ninja','Dragon','Galaxy','Lava','Ocean','Robo','Candy','Shadow','Sky','Thunder','Crystal','Mystic','Royal'],
B=['Racer','Rush','Quest','Blitz','Dash','Catcher','Clicker','Runner','Arena','Legends','Heroes','Drift','Tower','Panic','Party','Kingdom','Raid','Match','Jump','Storm'],
CAT=['All','Racing','Action','Puzzle','Party','Multiplayer','Mine'],EM=['🚗','🎯','🧺','🚀','🐉','⚡','🎲','🏰','🛸','🍬'];
function rnd(s){return()=>(s=(s*16807)%2147483647)/2147483647}
const GAMES=[...Array(996)].map((_,i)=>{const r=rnd(i+7),a=A[Math.floor(r()*20)],b=B[Math.floor(r()*20)],t=i%3;
return{id:i,name:a+' '+b+(i>399?' '+(Math.floor(i/20)):''),type:t,hue:Math.floor(r()*360),cat:['Racing','Action','Puzzle','Party'][Math.floor(r()*4)],multi:r()>.55,pl:Math.floor(r()*90000)+500,em:EM[Math.floor(r()*10)]}});
function builtin(g){const c=`hsl(${g.hue},85%,60%)`;
if(g.type==0)return`let px=W/2,s=0,it=[];loop(()=>{px=mx;if(Math.random()<.04+s/900)it.push({x:Math.random()*W,y:0});ctx.fillStyle='${c}';ctx.fillRect(px-30,H-20,60,12);it.forEach(o=>{o.y+=3;ctx.beginPath();ctx.arc(o.x,o.y,8,0,7);ctx.fill();if(o.y>H-20&&Math.abs(o.x-px)<34){s++;o.y=999}});it=it.filter(o=>o.y<H);ctx.fillStyle='#fff';ctx.fillText('Score '+s,10,22)})`;
if(g.type==1)return`let t={x:200,y:100},s=0;cv.onclick=()=>{if(Math.hypot(mx-t.x,my-t.y)<26){s++;t={x:30+Math.random()*(W-60),y:40+Math.random()*(H-80)}}};loop(()=>{ctx.fillStyle='${c}';ctx.beginPath();ctx.arc(t.x,t.y,26,0,7);ctx.fill();ctx.fillStyle='#fff';ctx.fillText('Hits '+s,10,22)})`;
return`let b=[],s=0,f=0;loop(()=>{f++;s=Math.floor(f/30);if(f%25==0)b.push({x:Math.random()*W,y:-20});ctx.fillStyle='#ff5470';b.forEach(o=>{o.y+=3+f/900;ctx.fillRect(o.x,o.y,22,22);if(Math.abs(o.x+11-mx)<20&&Math.abs(o.y+11-my)<20){f=0;b=[]}});b=b.filter(o=>o.y<H);ctx.fillStyle='${c}';ctx.beginPath();ctx.arc(mx,my,10,0,7);ctx.fill();ctx.fillStyle='#fff';ctx.fillText('Survived '+s+'s – dodge the red!',10,22)})`}
let cat='All',shown=60,user=LS('ba_cur',null);
const mine=()=>LS('ba_games',[]);
function all(){return[...mine().map((g,i)=>({id:'u'+i,name:g.name,type:-1,hue:210,cat:g.multi?'Multiplayer':'Action',multi:g.multi,pl:g.pl||1,em:'🆕',code:g.code,by:g.by})),...GAMES]}
function render(){const q=$('search').value.toLowerCase();
$('tabs').innerHTML=CAT.map(c=>`<button class="${c==cat?'on':''}" onclick="cat='${c}';shown=60;render()">${c}</button>`).join('');
let l=all().filter(g=>(cat=='All'||(cat=='Multiplayer'?g.multi:cat=='Mine'?String(g.id).startsWith('u'):g.cat==cat))&&g.name.toLowerCase().includes(q));
$('grid').innerHTML=l.slice(0,shown).map(g=>`<div class="card"><div class="th" style="background:linear-gradient(135deg,hsl(${g.hue},70%,35%),hsl(${g.hue+40},70%,20%))">${g.em}</div><div class="cb"><b>${g.name}</b><small>${g.by?'by '+g.by:g.cat} · ${g.pl.toLocaleString()} plays</small>${g.multi?' <span class="tag">multiplayer</span>':''}<button onclick="playG('${g.id}')">▶ Play</button></div></div>`).join('')||'<p style="color:var(--mu)">No games found.</p>'}
function more(){shown+=60;render()}
function playG(id){const g=all().find(x=>String(x.id)==id);$('pt').textContent=g.name;$('pf').srcdoc=wrap(g.code||builtin(g));$('pm').textContent=g.multi?'Multiplayer: '+(2+Math.floor(Math.random()*6))+' players in this lobby (simulated).':'Move with the mouse or arrow keys.';$('play').classList.add('show')}
function closePlay(){$('pf').srcdoc='';$('play').classList.remove('show')}
