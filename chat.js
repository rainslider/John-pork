// ---------- chat ----------
const P=[['Emma','#e91e63'],['Liam','#ff9800'],['Noah','#4caf50'],['Sophie','#9c27b0'],['Jayden','#00bcd4'],['Mila','#f44336'],['Lucas','#3f51b5'],['Zoë','#795548']];
const R=['haha nice 😄','anyone up for a match?','I just beat level 5!','which game are you playing?','gg 🔥','try Turbo Racer, it is so fun','omg same','lol I keep crashing','wanna team up later?','just published my first game!','that is awesome','brb 2 min'];
let cp=P[0];
$('fr').innerHTML=P.map((p,i)=>`<div onclick="cp=P[${i}]"><div class="av" style="background:${p[1]}">${p[0][0]}</div>${p[0]}</div>`).join('');
function add(n,t,me){const d=document.createElement('div');d.className='m'+(me?' me':'');d.innerHTML=(me?'':'<i>'+n+'</i>')+t.replace(/</g,'&lt;');$('msgs').append(d);$('msgs').scrollTop=1e9}
function send(){const t=$('cin').value.trim();if(!t)return;$('cin').value='';add('',t,1);const p=cp;setTimeout(()=>add(p[0],R[Math.floor(Math.random()*R.length)]),900+Math.random()*1500)}
add('Emma','Welcome to BlueArcade! 👋');setInterval(()=>{const p=P[Math.floor(Math.random()*8)];add(p[0],R[Math.floor(Math.random()*R.length)])},14000);
