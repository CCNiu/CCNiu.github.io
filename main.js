// ---------- 技能刻度表:依 data-lv 產生 10 格刻度 ----------
document.querySelectorAll('.meter').forEach(m=>{
  const lv = parseFloat(m.dataset.lv||0);
  for(let i=1;i<=10;i++){
    const seg = document.createElement('i');
    if(i<=Math.floor(lv)) seg.classList.add('on');
    if(i<=Math.floor(lv) && i>8) seg.classList.add('hot'); // 9格以上用銅色標示強項
    m.appendChild(seg);
  }
});

// ---------- 捲動進場(尊重減少動態偏好) ----------
if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window){
  const io = new IntersectionObserver(es=>{
    es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  },{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
}else{
  document.querySelectorAll('.reveal').forEach(el=>el.classList.add('in'));
}

// ---------- 深淺色主題切換 ----------
const themeBtn = document.getElementById('theme-btn');
if(themeBtn){
  const applyTheme = t=>{
    document.documentElement.setAttribute('data-theme', t);
    themeBtn.textContent = t==='dark' ? '☀' : '☾';
    localStorage.setItem('theme', t);
  };
  applyTheme(document.documentElement.getAttribute('data-theme') || 'light');
  themeBtn.addEventListener('click', ()=>{
    applyTheme(document.documentElement.getAttribute('data-theme')==='dark' ? 'light' : 'dark');
  });
}

// ---------- 中英文切換 ----------
// 有 data-en 屬性的元素會在切換時替換內容;原始中文存回 data-zh。
// 各頁面可在 <html> 加 data-title-en 指定英文版網頁標題。
const langBtn = document.getElementById('lang-btn');
if(langBtn){
  const i18nEls = document.querySelectorAll('[data-en]');
  i18nEls.forEach(el=>{ el.dataset.zh = el.innerHTML; });
  const titleZh = document.title;
  const titleEn = document.documentElement.getAttribute('data-title-en') || titleZh;
  const applyLang = l=>{
    document.documentElement.lang = l==='en' ? 'en' : 'zh-Hant';
    i18nEls.forEach(el=>{ el.innerHTML = l==='en' ? el.dataset.en : el.dataset.zh; });
    document.title = l==='en' ? titleEn : titleZh;
    langBtn.textContent = l==='en' ? '中' : 'EN';
    localStorage.setItem('lang', l);
  };
  if((localStorage.getItem('lang')||'zh')==='en') applyLang('en');
  langBtn.addEventListener('click', ()=>{
    applyLang((localStorage.getItem('lang')||'zh')==='en' ? 'zh' : 'en');
  });
}
