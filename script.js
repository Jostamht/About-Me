document.addEventListener("DOMContentLoaded",()=>{
 const progress=document.querySelector(".reading-progress");
 const updateProgress=()=>{const height=document.documentElement.scrollHeight-innerHeight;progress.style.width=(height>0?scrollY/height*100:0)+"%";};
 addEventListener("scroll",updateProgress,{passive:true});updateProgress();
 const initial=[
 [0,0,0,0,0,1,0,0,2,7],
 [0,0,0,0,0,0,3,1,3,3],
 [0,0,0,0,0,0,0,1,3,6],
 [0,0,0,0,0,0,0,1,3,6] // overwritten below for intelligence
 ];
 initial[3]=[0,0,0,0,0,0,1,5,1,3];
 const cards=[...document.querySelectorAll(".chart-card[data-metric]")];
 const inputs=[...document.querySelectorAll(".rating-form input[type=range]")];
 const feedback=document.getElementById("poll-feedback"),reset=document.getElementById("vote-reset"),submit=document.getElementById("vote-submit");
 const storageKey="jp-about-vote-v2";
 function valid(data){return Array.isArray(data)&&data.length===4&&data.every(n=>Number.isInteger(n)&&n>=1&&n<=10);}
 let myVote=null;
 try{let saved=JSON.parse(localStorage.getItem(storageKey));if(valid(saved))myVote=saved;}catch(_){}
 function render(){
  cards.forEach((card,i)=>{
   const counts=[...initial[i]];
   if(myVote)counts[myVote[i]-1]++;
   const total=counts.reduce((a,b)=>a+b,0);
   const average=counts.reduce((sum,count,index)=>sum+count*(index+1),0)/total;
   card.querySelector(".response-count").textContent=total+" RESPUESTAS";
   card.querySelector(".metric-average").innerHTML=average.toFixed(1)+'<span>/10</span>';
   let chart=card.querySelector(".histogram");chart.innerHTML="";
   const max=Math.max(1,...counts);
   counts.forEach((count,index)=>{
    const col=document.createElement("div");col.className="bar-column";
    const bar=document.createElement("i");bar.style.height=count?Math.max(5,count/max*100)+"%":"0";bar.title=count+" respuesta(s) con "+(index+1)+"/10";
    const label=document.createElement("span");label.textContent=String(index+1);
    col.append(bar,label);chart.append(col);
   });
   chart.setAttribute("aria-label",total+" respuestas. Promedio "+average.toFixed(1)+" de 10. Distribución: "+counts.map((n,j)=>(j+1)+": "+n).join(", "));
  });
  if(myVote){inputs.forEach((input,i)=>{input.value=String(myVote[i]);input.nextElementSibling.textContent=String(myVote[i]);});reset.hidden=false;submit.textContent="Actualizar mi evaluación ↗";}
  else{reset.hidden=true;submit.textContent="Enviar mis respuestas ↗";}
 }
 inputs.forEach(input=>input.addEventListener("input",()=>{input.nextElementSibling.textContent=input.value;}));
 document.getElementById("rating-form")?.addEventListener("submit",event=>{
  event.preventDefault();const values=inputs.map(x=>Number(x.value));if(!valid(values))return;
  myVote=values;try{localStorage.setItem(storageKey,JSON.stringify(values));}catch(_){}
  render();feedback.textContent="¡Gracias! Tu evaluación ya está incluida en los gráficos de esta página.";
 });
 reset?.addEventListener("click",()=>{myVote=null;try{localStorage.removeItem(storageKey);}catch(_){}render();feedback.textContent="Quitamos tu evaluación. Se ven las 10 respuestas iniciales.";});
 render();
 const carousel=document.getElementById("quote-carousel"),prev=document.getElementById("quote-prev"),next=document.getElementById("quote-next"),counter=document.getElementById("quote-counter");
 const slides=carousel?[...carousel.querySelectorAll(".quote-card")]:[];
 function carouselState(){if(!carousel||!slides.length)return;const left=carousel.scrollLeft;let index=0,closest=Infinity;slides.forEach((slide,i)=>{let d=Math.abs(slide.offsetLeft-slides[0].offsetLeft-left);if(d<closest){closest=d;index=i;}});counter.textContent=String(index+1).padStart(2,"0")+" / "+String(slides.length).padStart(2,"0");prev.disabled=left<5;next.disabled=left+carousel.clientWidth>=carousel.scrollWidth-5;}
 function moveQuote(delta){let index=0,closest=Infinity;slides.forEach((slide,i)=>{let d=Math.abs(slide.offsetLeft-slides[0].offsetLeft-carousel.scrollLeft);if(d<closest){closest=d;index=i;}});let target=slides[Math.max(0,Math.min(slides.length-1,index+delta))];if(target)carousel.scrollTo({left:target.offsetLeft-slides[0].offsetLeft,behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"});}
 prev?.addEventListener("click",()=>moveQuote(-1));next?.addEventListener("click",()=>moveQuote(1));carousel?.addEventListener("scroll",carouselState,{passive:true});addEventListener("resize",carouselState);carouselState();
 const reveal=document.querySelectorAll(".reveal");
 if("IntersectionObserver" in window&&!matchMedia("(prefers-reduced-motion: reduce)").matches){let obs=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");obs.unobserve(entry.target);}}),{threshold:.06});reveal.forEach(el=>obs.observe(el));}else reveal.forEach(el=>el.classList.add("visible"));
 const sections=document.querySelectorAll("main section[id]");const links=document.querySelectorAll(".site-nav a");
 if("IntersectionObserver" in window){let nav=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)links.forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+entry.target.id));}),{rootMargin:"-20% 0px -65% 0px"});sections.forEach(el=>nav.observe(el));}
});