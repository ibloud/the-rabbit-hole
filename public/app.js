const roomIds=["seven-sins","sick-boi","money-game-pt-3"];
const roomNames={"seven-sins":"Seven Sins","sick-boi":"Sick Boi","money-game-pt-3":"Money Game Pt. 3"};
const rooms={};
const nav=document.querySelector("#rooms");
const root=document.querySelector("#room");

function makeNav(){
  roomIds.forEach((id,i)=>{
    const b=document.createElement("button");
    b.type="button"; b.dataset.room=id;
    b.innerHTML=`<span class="num">ROOM 0${i+1}</span>${roomNames[id]}`;
    b.addEventListener("click",()=>render(id));
    nav.append(b);
  });
}
async function loadRoom(id){
  const response=await fetch(`content/rooms/${id}.json`);
  if(!response.ok) throw new Error(`Unable to load ${id}: ${response.status}`);
  return response.json();
}
function render(id){
  const r=rooms[id]; if(!r) return;
  document.querySelectorAll("#rooms button").forEach(b=>b.setAttribute("aria-current",b.dataset.room===id?"true":"false"));
  root.style.setProperty("--x",`${r.hotspots?.[0]?.position?.x ?? 50}%`);
  root.style.setProperty("--y",`${r.hotspots?.[0]?.position?.y ?? 45}%`);
  root.innerHTML=`
    <article class="scene-inner">
      <div class="scene-meta"><span>ROOM / ${String(roomIds.indexOf(id)+1).padStart(2,"0")}</span><span>${r.track?.toUpperCase() ?? "NARRATIVE"}</span></div>
      <h2>${r.title}</h2>
      <p class="description">${r.description}</p>
      <div class="hotspots" id="hotspots" aria-label="Room clues"></div>
    </article>`;
  const h=document.querySelector("#hotspots");
  (r.hotspots||[]).forEach((x,i)=>{
    const b=document.createElement("button"); b.type="button"; b.className="hotspot";
    b.innerHTML=`<small>CLUE 0${i+1}</small>${x.label}`;
    b.setAttribute("aria-label",x.accessibilityLabel||x.label);
    b.addEventListener("click",()=>{
      const p=document.createElement("div"); p.className="dialogue";
      p.innerHTML="<strong>FOUND</strong>";
      const span=document.createElement("span"); span.textContent=x.dialogue; p.append(span); h.append(p);
      p.scrollIntoView({behavior:"smooth",block:"nearest"});
    });
    h.append(b);
  });
}
async function load(){
  makeNav();
  const results=await Promise.allSettled(roomIds.map(async id=>rooms[id]=await loadRoom(id)));
  const failures=results.map((x,i)=>x.status==="rejected"?roomIds[i]:null).filter(Boolean);
  if(failures.length) console.warn("Room load failures:",failures);
  render(roomIds.find(id=>rooms[id])||roomIds[0]);
}
load().catch(err=>{root.innerHTML=`<div class="loading">Build error: ${err.message}</div>`;});
