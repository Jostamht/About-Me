document.addEventListener("DOMContentLoaded",()=>{
  const progress=document.querySelector(".reading-progress");
  function updateProgress(){const max=document.documentElement.scrollHeight-window.innerHeight;progress.style.width=(max>0?(window.scrollY/max)*100:0)+"%";}
  window.addEventListener("scroll",updateProgress,{passive:true});updateProgress();
  // Ten immutable baseline answers per question. Each visitor can contribute one local answer per card.
  const baseline=[
    [0,0,0,0,0,1,0,0,2,7],
    [0,0,0,0,0,0,3,1,3,3],
    [0,0,0,0,0,0,0,1,3,6],
    [0,0,0,0,0,0,1,5,1,3]
  ];
  const key="jp-about-card-votes-v1";
  const cards=[...document.querySelectorAll(".chart-card[data-metric]")];
  function valid(n){return Number.isInteger(n)&&n>=1&&n<=10;}
  let votes=[null,null,null,null];
  try{
    let stored=JSON.parse(localStorage.getItem(key));
    if(Array.isArray(stored)&&stored.length===4&&stored.every(x=>x===null||valid(x)))votes=stored;
  }catch(_){}
  function average(counts){
    const total=counts.reduce((a,b)=>a+b,0);
    return counts.reduce((sum,count,index)=>sum+count*(index+1),0)/total;
  }
  function save(){try{localStorage.setItem(key,JSON.stringify(votes));}catch(_){}}
  function renderMetric(i){
    const card=cards[i];
    if(!card)return;
    const original=baseline[i];
    const adjusted=[...original],current=votes[i];
    if(valid(current))adjusted[current-1]++;
    const originalAvg=average(original),adjustedAvg=average(adjusted);
    // Original is never overwritten or hidden, even when the visitor adds a vote.
    card.querySelector(".original-average").textContent=originalAvg.toFixed(1)+" / 10";
    card.querySelector(".metric-average").innerHTML=adjustedAvg.toFixed(1)+'<span>/10</span>';
    card.querySelector(".chart-top span:last-child").textContent=valid(current)?"11 RESPUESTAS CON TU VOTO":"10 ENCUESTAS ORIGINALES";
    const chart=card.querySelector(".histogram");
    chart.replaceChildren();
    const max=Math.max(1,...adjusted);
    adjusted.forEach((count,index)=>{
      const column=document.createElement("div");column.className="bar-column";
      const bar=document.createElement("i");
      bar.style.height=(count?Math.max(5,count/max*100):0)+"%";
      const originalCount=original[index];
      const label=document.createElement("span");label.textContent=String(index+1);
      bar.title=(index+1)+"/10: "+originalCount+" originales"+(valid(current)&&current===index+1?" + tu voto":"");
      column.append(bar,label);chart.append(column);
    });
    chart.setAttribute("aria-label", "Resultado de "+(valid(current)?"11":"10")+" respuestas; promedio "+adjustedAvg.toFixed(1)+"/10. Resultado original: "+originalAvg.toFixed(1)+"/10.");
    const slider=card.querySelector(".card-vote-slider");
    if(valid(current))slider.value=String(current);
    const shown=Number(slider.value);
    card.querySelector(".vote-value").textContent=shown+" / 10";
    card.querySelector(".vote-help").textContent=valid(current)?"Tu voto está incluido en el resultado (11 en total).":"Desliza para sumar tu voto a las 10 respuestas.";
    card.querySelector(".vote-reset").hidden=!valid(current);
    card.classList.toggle("has-local-vote",valid(current));
    const fill=(shown-1)/9*100;
    slider.style.setProperty("--slider-progress",fill+"%");
  }
  cards.forEach((card,i)=>{
    const slider=card.querySelector(".card-vote-slider");
    slider.addEventListener("input",()=>{
      const value=Number(slider.value);
      if(!valid(value))return;
      votes[i]=value;save();renderMetric(i);
    });
    card.querySelector(".vote-reset").addEventListener("click",()=>{
      votes[i]=null;save();slider.value="8";renderMetric(i);
    });
    renderMetric(i);
  });
  const quotes=[
    {author:"ANÓNIMO 1",text:"El José Pablo es tan buen tipazo y dice chistes tan funables, le cuento mis cosas y no le dice nada, es ambiente 10/10."},
    {author:"ANÓNIMO 2",text:"Que dejes de farmear bosque y entres a las mechas ndeahh"},
    {author:"ANÓNIMO 3",text:"Aventurero, le encanta viajar y una persona q logra todo lo q se propone."},
    {author:"ANÓNIMO 4",text:"Bueno primero el mensaje, hubiera sido un 10 en clave como el Perú pero no juegas ranked en dotita xd jajaja. Y. Pues mi anécdota es la vez que me creaste la cuenta de dota elegiste mi nombre Rsidex que hasta del día de hoy no sabemos el porque pero me agrada saber que fue dado por un amigo confiable como lo eres tú. Papu."},
    {author:"ANÓNIMO 5",text:"Ojito 😘"},
    {author:"ANÓNIMO 6",text:"🥹👍"}
  ];
  let quoteIndex=0,showAll=false;
  const quoteText=document.getElementById("testimonial-text");
  const quoteAuthor=document.getElementById("testimonial-author");
  const quoteCounter=document.getElementById("quote-counter");
  const expand=document.getElementById("testimonial-expand");
  const prev=document.getElementById("quote-prev"),next=document.getElementById("quote-next");
  function showQuote(){
    const item=quotes[quoteIndex],long=quoteIndex===3;
    quoteText.textContent=long&&!showAll?item.text.slice(0,155).trimEnd()+"…":item.text;
    quoteAuthor.textContent=item.author;
    quoteCounter.textContent=String(quoteIndex+1).padStart(2,"0")+" / "+String(quotes.length).padStart(2,"0");
    expand.hidden=!long;
    expand.textContent=showAll?"Mostrar menos ↑":"Leer comentario completo ↗";
    expand.setAttribute("aria-expanded",String(long&&showAll));
  }
  function move(delta){quoteIndex=(quoteIndex+delta+quotes.length)%quotes.length;showAll=false;showQuote();}
  prev?.addEventListener("click",()=>move(-1));next?.addEventListener("click",()=>move(1));
  expand?.addEventListener("click",()=>{showAll=!showAll;showQuote();});
  const quoteCarousel=document.querySelector(".testimonial-slider");
  quoteCarousel?.addEventListener("keydown",e=>{if(e.key==="ArrowRight"){e.preventDefault();move(1);}if(e.key==="ArrowLeft"){e.preventDefault();move(-1);}});
  showQuote();
  const reveal=document.querySelectorAll(".reveal");
  if("IntersectionObserver" in window&&!matchMedia("(prefers-reduced-motion: reduce)").matches){
    const obs=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");obs.unobserve(entry.target);}}),{threshold:.05});
    reveal.forEach(el=>obs.observe(el));
  }else reveal.forEach(el=>el.classList.add("visible"));
  const sections=document.querySelectorAll("main section[id]"),navLinks=document.querySelectorAll(".site-nav a");
  if("IntersectionObserver" in window){
    const nav=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)navLinks.forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+entry.target.id));}),{rootMargin:"-20% 0px -65% 0px"});
    sections.forEach(el=>nav.observe(el));
  }
});