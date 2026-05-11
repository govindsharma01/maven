// CURSOR
const cur=document.getElementById('cur'),ring=document.getElementById('ring');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cur.style.left=mx+'px';cur.style.top=my+'px'});
(function anim(){rx+=(mx-rx)*.1;ry+=(my-ry)*.1;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(anim)})();
document.querySelectorAll('a,button,[data-hover]').forEach(el=>{
  el.addEventListener('mouseenter',()=>document.body.classList.add('hov'));
  el.addEventListener('mouseleave',()=>document.body.classList.remove('hov'));
});
document.addEventListener('mousedown',()=>document.body.classList.add('clk'));
document.addEventListener('mouseup',()=>document.body.classList.remove('clk'));

// NAV SCROLL
window.addEventListener('scroll',()=>{
  document.querySelector('nav').classList.toggle('sc',window.scrollY>60);
});

// MOBILE MENU
const hbg=document.querySelector('.hbg'),mm=document.querySelector('.mm');
if(hbg&&mm){
  hbg.addEventListener('click',()=>mm.classList.toggle('on'));
  mm.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>mm.classList.remove('on')));
}

// PAGE HERO BG LOAD
const phBg=document.querySelector('.ph-bg');
if(phBg){setTimeout(()=>phBg.classList.add('ld'),80)}

// SCROLL REVEAL
const io=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');if(e.target.classList.contains('mn-m')||e.target.classList.contains('metric'))e.target.classList.add('in')}});
},{threshold:.1});
document.querySelectorAll('.sr,.ss').forEach(el=>io.observe(el));
const mio=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in')});
},{threshold:.15});
document.querySelectorAll('.mn-m').forEach(el=>mio.observe(el));

// CHAR REVEAL
const statEl=document.getElementById('st');
if(statEl){
  const txt=statEl.dataset.text||'';
  txt.split('').forEach((ch,i)=>{
    const s=document.createElement('span');
    s.className=ch===' '?'char sp':'char';
    s.textContent=ch===' '?'\u00a0':ch;
    s.style.transitionDelay=(i*16)+'ms';
    statEl.appendChild(s);
  });
  new IntersectionObserver(entries=>{
    if(entries[0].isIntersecting)statEl.querySelectorAll('.char').forEach(c=>c.classList.add('vis'));
  },{threshold:.3}).observe(statEl);
}

// MAGNETIC BUTTON
document.querySelectorAll('.mg').forEach(mg=>{
  const inner=mg.querySelector('.mgi');
  if(!inner)return;
  mg.addEventListener('mousemove',e=>{
    const r=mg.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2;
    inner.style.transform=`translate(${(e.clientX-cx)*.3}px,${(e.clientY-cy)*.4}px)`;
  });
  mg.addEventListener('mouseleave',()=>{inner.style.transform='translate(0,0)'});
});

// HORIZONTAL SCROLL (work page)
const wt=document.getElementById('wt');
if(wt){
  let drag=false,sx=0,sl=0;
  wt.style.overflowX='auto';wt.style.scrollbarWidth='none';wt.style.cursor='grab';
  wt.addEventListener('mousedown',e=>{drag=true;sx=e.pageX-wt.offsetLeft;sl=wt.scrollLeft;wt.style.cursor='grabbing'});
  document.addEventListener('mouseup',()=>{drag=false;wt.style.cursor='grab'});
  document.addEventListener('mousemove',e=>{if(!drag)return;wt.scrollLeft=sl-(e.pageX-wt.offsetLeft-sx)*1.2});
  document.getElementById('ww')?.addEventListener('wheel',e=>{e.preventDefault();wt.scrollLeft+=e.deltaY*1.5},{passive:false});
}

// PARALLAX HERO BG
const heroBgEl=document.querySelector('.ph-bg img');
if(heroBgEl){
  window.addEventListener('scroll',()=>{
    heroBgEl.style.transform=`scale(1) translateY(${window.scrollY*.25}px)`;
  });
}

// FOOTER CURRENT YEAR
const yr=document.getElementById('yr');
if(yr)yr.textContent=new Date().getFullYear();
