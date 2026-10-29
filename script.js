document.addEventListener("DOMContentLoaded",function(){
  const progress=document.querySelector(".reading-progress");
  const updateProgress=function(){const total=document.documentElement.scrollHeight-window.innerHeight;progress.style.width=(total>0?window.scrollY/total*100:0)+"%";};
  window.addEventListener("scroll",updateProgress,{passive:true});updateProgress();
  document.querySelectorAll(".histogram").forEach(function(chart){
    const data=chart.dataset.series.split(",").map(Number);
    const max=Math.max(...data,1);
    data.forEach(function(n,i){
      const col=document.createElement("div");col.className="bar-column";
      const bar=document.createElement("i");bar.style.height=n?Math.max(5,n/max*100)+"%":"0";bar.title=String(n)+" respuesta(s) con "+String(i+1)+"/10";
      const label=document.createElement("span");label.textContent=String(i+1);
      col.append(bar,label);chart.appendChild(col);
    });
  });
  const reveal=document.querySelectorAll(".reveal");
  if("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches){
    const observer=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target);}});},{threshold:.08});
    reveal.forEach(function(el){observer.observe(el);});
  }else{reveal.forEach(function(el){el.classList.add("visible");});}
  const sections=document.querySelectorAll("main section[id]");
  const navLinks=document.querySelectorAll(".site-nav a");
  if("IntersectionObserver" in window){const navObserver=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting){navLinks.forEach(function(a){a.classList.toggle("active",a.getAttribute("href")==="#"+entry.target.id);});}});},{rootMargin:"-20% 0px -65% 0px"});sections.forEach(function(el){navObserver.observe(el);});}
  const message=document.getElementById("answer-message");
  document.querySelectorAll("[data-answer]").forEach(function(button){button.addEventListener("click",function(){const isRed=button.dataset.answer==="red";message.hidden=false;message.textContent=isRed?"❤️ Elegiste la opción roja. Excelente gusto estético. ¡Amistad aceptada (en esta demo)!":"💚 Sabía que los números no mentían. ¡Amistad aceptada (en esta demo)!";message.scrollIntoView({behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth",block:"nearest"});});});
});