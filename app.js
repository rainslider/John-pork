// ---------- auth ----------
let mode='signup';
function setMode(m){mode=m;$('at').textContent=m=='signup'?'Create account':'Log in';$('go').textContent=m=='signup'?'Create account':'Log in';$('fe').style.display=m=='signup'?'':'none';$('sw').textContent=m=='signup'?'I already have an account':'Create a new account';$('sw').onclick=()=>setMode(m=='signup'?'login':'signup');$('ae').textContent=''}
function plusClick(){if(user)openStudio();else{setMode('signup');$('auth').classList.add('show')}}
function closeAuth(){$('auth').classList.remove('show')}
async function hash(s){const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode('ba:'+s));return[...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')}
async function submitAuth(){const em=$('em').value.trim(),un=$('un').value.trim(),pw=$('pw').value,us=LS('ba_users',[]);let h;
try{h=await hash(pw)}catch(e){h=pw}
if(mode=='signup'){if(!/^\S+@\S+\.\S+$/.test(em))return $('ae').textContent='Enter a valid email.';if(un.length<3)return $('ae').textContent='Username needs 3+ characters.';if(pw.length<6)return $('ae').textContent='Password needs 6+ characters.';
if(us.some(u=>u.un.toLowerCase()==un.toLowerCase()||u.em==em))return $('ae').textContent='Email or username already exists.';us.push({em,un,h});SV('ba_users',us);login(un)}
else{const u=us.find(u=>(u.un.toLowerCase()==un.toLowerCase()||u.em==em||u.un.toLowerCase()==em.toLowerCase())&&u.h==h);if(!u)return $('ae').textContent='Wrong username or password.';login(u.un)}}
function login(un){user=un;SV('ba_cur',un);closeAuth();upd();openStudio()}
function upd(){$('who').textContent=user?'👤 '+user:'';}
// ---------- studio ----------
let okRun=false;
function home(){$('studio').style.display='none';$('home').style.display='';stopG();render()}
function openStudio(){$('home').style.display='none';$('studio').style.display='block';if(!$('code').value)tpl('car')}
function tpl(k){$('code').value=TPL[k];okRun=false;$('pub').disabled=true;run()}
function ins(s){const t=$('code');t.setRangeText(s,t.selectionStart,t.selectionEnd,'end');t.focus();okRun=false;$('pub').disabled=true}
function run(){okRun=false;$('pub').disabled=true;$('status').textContent='Running…';$('prev').srcdoc=wrap($('code').value)}
function stopG(){$('prev').srcdoc='';$('status').textContent=''}
$('code').addEventListener('keydown',e=>{if(e.key=='Tab'){e.preventDefault();ins('  ')}});
onmessage=e=>{if(e.data&&e.data.err){okRun=false;$('pub').disabled=true;$('status').innerHTML='<span style="color:var(--er)">❌ '+e.data.err.replace(/</g,'&lt;')+'</span>'}else if(e.data&&e.data.ok&&$('studio').style.display=='block'){okRun=true;$('pub').disabled=false;$('status').innerHTML='<span style="color:var(--ok)">✅ Runs without errors – ready to publish</span>'}};
function publish(){const n=$('gname').value.trim();if(!okRun)return alert('Run your game first.');if(n.length<2){$('gname').focus();return alert('Give your game a name first.')}
const g=mine();g.unshift({name:n,code:$('code').value,multi:$('multi').checked,by:user,pl:1});SV('ba_games',g);alert('🎉 "'+n+'" is published! Everyone can play it now.');$('gname').value='';cat='Mine';home()}
upd();render();
