// Urban Cafe & Restaurant — mobile menu, tabs, lightbox, scroll-spy, back-to-top
(function(){
  "use strict";

  // Mobile menu — instant toggle, no transition
  var toggle=document.querySelector("[data-menu-toggle]");
  var menu=document.querySelector("[data-mobile-menu]");
  function closeMenu(){
    menu.classList.remove("open");
    menu.hidden=true;
    toggle.setAttribute("aria-expanded","false");
  }
  toggle.addEventListener("click",function(){
    var willOpen=menu.hidden;
    menu.hidden=!willOpen;
    menu.classList.toggle("open",willOpen);
    toggle.setAttribute("aria-expanded",String(willOpen));
  });
  menu.querySelectorAll("a").forEach(function(a){
    a.addEventListener("click",closeMenu);
  });
  document.addEventListener("keydown",function(e){
    if(e.key==="Escape"&&!menu.hidden){closeMenu();}
  });

  // Menu tabs
  var tabBtns=document.querySelectorAll(".tab-btn");
  var panels=document.querySelectorAll(".menu-panel");
  tabBtns.forEach(function(btn){
    btn.addEventListener("click",function(){
      tabBtns.forEach(function(b){b.setAttribute("aria-selected","false");});
      btn.setAttribute("aria-selected","true");
      panels.forEach(function(p){p.hidden=(p.dataset.panel!==btn.dataset.tab);});
    });
  });

  // Lightbox
  var lightbox=document.getElementById("lightbox");
  var lbImg=document.getElementById("lbImg");
  var lbCap=document.getElementById("lbCap");
  var lbClose=document.getElementById("lbClose");
  var lastFocus=null;
  function openLb(btn){
    lastFocus=document.activeElement;
    lbImg.src=btn.dataset.lightbox;
    lbImg.alt=btn.querySelector("img").alt;
    lbCap.textContent=btn.dataset.cap||"";
    lightbox.hidden=false;
    lbClose.focus();
  }
  function closeLb(){
    lightbox.hidden=true;
    lbImg.src="";
    if(lastFocus){lastFocus.focus();}
  }
  document.querySelectorAll("[data-lightbox]").forEach(function(btn){
    btn.addEventListener("click",function(){openLb(btn);});
  });
  lbClose.addEventListener("click",closeLb);
  lightbox.addEventListener("click",function(e){if(e.target===lightbox){closeLb();}});
  document.addEventListener("keydown",function(e){
    if(e.key==="Escape"&&!lightbox.hidden){closeLb();}
  });

  // Scroll-spy
  var navLinks=document.querySelectorAll("nav.main a");
  var map={};
  navLinks.forEach(function(a){map[a.getAttribute("href").slice(1)]=a;});
  var sections=document.querySelectorAll("section[id]");
  var spy=new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if(en.isIntersecting){
        navLinks.forEach(function(a){a.classList.remove("active");});
        var link=map[en.target.id];
        if(link){link.classList.add("active");}
      }
    });
  },{rootMargin:"-40% 0px -55% 0px"});
  sections.forEach(function(s){spy.observe(s);});

  // Back to top
  var backTop=document.getElementById("backTop");
  window.addEventListener("scroll",function(){
    backTop.hidden=window.scrollY<600;
  },{passive:true});
  backTop.addEventListener("click",function(){
    window.scrollTo({top:0,behavior:"smooth"});
  });

  // (No scroll-reveal: content renders statically so every section is
  // visible in any capture, with or without JS timing.)
})();
