# NASA-SPACE-EXPLORER-
NASA Space Explorer is a simple and interactive website that lets you explore the universe one picture at a time. It connects with NASA’s Astronomy Picture of the Day (APOD) API, bringing you stunning daily images of space along with detailed descriptions straight from NASA scientists.

#NASA-SPACE-EXPLORER-CODE-
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>NASA Space Explorer</title>

  <!-- css -->
  <link rel="stylesheet" href="./nasa.css?v=2" />
</head>
<body>
  <!-- your HTML content here -->

  <!-- js (load last) -->
  <script src="./nasa.js?v=2"></script>
</body>
</html>

#css
/* base */
:root{
  --bg-primary:#0b1020; --bg-secondary:#0e132a;
  --panel:rgba(25,25,40,.95); --panel-border:rgba(255,255,255,.1);
  --text:#e6eef8; --text-muted:#8aa0b4;
  --accent:#4da3ff; --accent-2:#8b5cf6; --accent-glow:rgba(77,163,255,.3);
  --success:#10b981; --error:#ef4444;
  --shadow:0 25px 50px rgba(0,0,0,.5); --shadow-glow:0 0 30px rgba(77,163,255,.2);
  --radius:20px; --transition:all .3s cubic-bezier(.4,0,.2,1);
}
*{box-sizing:border-box;margin:0;padding:0}
body{
  background:linear-gradient(120deg,var(--bg-primary),var(--bg-secondary));
  color:var(--text);
  font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',system-ui,sans-serif;
  line-height:1.6;min-height:100vh;overflow-x:hidden;
}
.app{max-width:1200px;margin:0 auto;padding:20px;position:relative}

/* header */
header.appbar{
  background:var(--panel);backdrop-filter:blur(20px);
  border:1px solid var(--panel-border);border-radius:var(--radius);
  box-shadow:var(--shadow);padding:24px 32px;margin-bottom:32px;
  display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:20px;
  position:relative;overflow:hidden;
}
.appbar::before{
  content:'';position:absolute;top:0;left:-100%;width:100%;height:100%;
  background:linear-gradient(90deg,transparent,rgba(255,255,255,.05),transparent);
  animation:shimmer 3s infinite;
}
@keyframes shimmer{0%{left:-100%}100%{left:100%}}
.title{
  font-weight:800;font-size:clamp(1.5rem,4vw,2.5rem);
  background:linear-gradient(135deg,var(--accent),var(--accent-2));
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
  letter-spacing:-.02em;position:relative;
}
.title::after{
  content:'';position:absolute;bottom:-4px;left:0;width:100%;height:2px;
  background:linear-gradient(90deg,var(--accent),var(--accent-2));border-radius:2px;opacity:.3;
}
.controls{display:flex;gap:12px;align-items:center;flex-wrap:wrap}
.btn{
  padding:12px 20px;border-radius:12px;cursor:pointer;border:1px solid var(--panel-border);
  background:rgba(255,255,255,.05);color:var(--text);font-weight:600;font-size:14px;
  transition:var(--transition);backdrop-filter:blur(10px);position:relative;overflow:hidden;
}
.btn::before{
  content:'';position:absolute;top:0;left:-100%;width:100%;height:100%;
  background:linear-gradient(90deg,transparent,rgba(255,255,255,.1),transparent);
  transition:var(--transition);
}
.btn:hover::before{left:100%}
.btn:hover{border-color:var(--accent);box-shadow:0 0 20px var(--accent-glow);transform:translateY(-2px)}
.btn:active{transform:translateY(0)}
input[type="date"]{
  padding:12px 16px;border-radius:12px;border:1px solid var(--panel-border);
  background:rgba(255,255,255,.05);color:var(--text);font-size:14px;backdrop-filter:blur(10px);
  transition:var(--transition);
}
input[type="date"]:focus{outline:none;border-color:var(--accent);box-shadow:0 0 20px var(--accent-glow)}

/* viewer */
.viewer{
  background:var(--panel);backdrop-filter:blur(20px);border:1px solid var(--panel-border);
  border-radius:var(--radius);box-shadow:var(--shadow);overflow:hidden;position:relative;transition:var(--transition);
}
.viewer:hover{box-shadow:var(--shadow),var(--shadow-glow);transform:translateY(-4px)}
.media-wrap{
  position:relative;background:#0a0f1e;min-height:400px;display:grid;place-items:center;overflow:hidden;
}
.media{
  width:100%;max-height:75vh;object-fit:contain;display:none;opacity:0;
  transition:opacity .5s ease,transform .5s ease;transform:scale(.95);
}
.media.show{display:block;opacity:1;transform:scale(1)}
iframe.media{aspect-ratio:16/9;border:0;border-radius:12px;box-shadow:0 10px 30px rgba(0,0,0,.5)}
.thumb-link{position:relative;display:none;width:100%;max-width:800px;border-radius:12px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,.5);transition:var(--transition)}
.thumb-link:hover{transform:scale(1.02)}
.thumb-link img{width:100%;height:auto;display:block;object-fit:contain}
.thumb-link .play{position:absolute;inset:0;display:grid;place-items:center;background:rgba(0,0,0,.3);backdrop-filter:blur(2px);transition:var(--transition)}
.thumb-link:hover .play{background:rgba(0,0,0,.5)}
.thumb-link .play>div{width:80px;height:80px;border-radius:50%;background:rgba(77,163,255,.9);display:grid;place-items:center;box-shadow:0 0 30px var(--accent-glow);transition:var(--transition)}
.thumb-link:hover .play>div{transform:scale(1.1);box-shadow:0 0 50px var(--accent-glow)}

/* meta */
.meta{padding:32px;background:linear-gradient(135deg,rgba(255,255,255,.02) 0%,rgba(255,255,255,.05) 100%)}
.meta h2{font-size:clamp(1.5rem,3vw,2.2rem);font-weight:700;margin-bottom:16px;line-height:1.2;letter-spacing:-.02em}
.chips{display:flex;gap:12px;flex-wrap:wrap;margin:16px 0 24px}
.chip{
  font-size:12px;font-weight:600;padding:8px 16px;border-radius:20px;
  background:rgba(77,163,255,.1);border:1px solid rgba(77,163,255,.3);color:var(--accent);
  backdrop-filter:blur(10px);transition:var(--transition);
}
.chip:hover{background:rgba(77,163,255,.2);box-shadow:0 0 15px rgba(77,163,255,.3)}
.meta p{font-size:16px;line-height:1.7;color:var(--text-muted);text-align:justify}

/* bottom nav */
.footerbar{display:flex;justify-content:center;align-items:center;gap:40px;padding:32px;border-top:1px solid var(--panel-border);background:rgba(255,255,255,.02);position:relative}
.circle-btn{
  width:70px;height:70px;border-radius:50%;border:2px solid var(--panel-border);
  background:rgba(77,163,255,.1);color:var(--accent);font-size:28px;font-weight:700;cursor:pointer;
  display:flex;align-items:center;justify-content:center;transition:var(--transition);backdrop-filter:blur(20px);position:relative;overflow:hidden;
}
.circle-btn::before{
  content:'';position:absolute;inset:-2px;border-radius:50%;padding:2px;background:linear-gradient(135deg,var(--accent),var(--accent-2));
  mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);mask-composite:exclude;opacity:0;transition:var(--transition);
}
.circle-btn:hover::before{opacity:1}
.circle-btn:hover{background:rgba(77,163,255,.2);box-shadow:0 0 30px var(--accent-glow);transform:translateY(-3px) scale(1.05)}
.circle-btn:active{transform:translateY(-1px) scale(1.02)}
.circle-btn:disabled{opacity:.5;cursor:not-allowed;transform:none!important;box-shadow:none!important}

/* loading + errors */
.loading{position:absolute;inset:0;display:grid;place-items:center;background:rgba(0,0,0,.8);backdrop-filter:blur(10px);color:#fff;z-index:10}
.spinner{width:40px;height:40px;border:3px solid rgba(77,163,255,.3);border-top-color:var(--accent);border-radius:50%;animation:spin 1s linear infinite;margin-bottom:16px}
@keyframes spin{to{transform:rotate(360deg)}}
.loading-text{font-size:16px;font-weight:600;color:var(--accent);animation:pulse 2s ease-in-out infinite}
@keyframes pulse{0%,100%{opacity:.6}50%{opacity:1}}
.error{padding:32px;text-align:center;background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.3);border-radius:12px;margin:20px}
.error h3{color:var(--error);font-size:20px;margin-bottom:12px}
.error p{color:var(--text-muted);margin-bottom:20px}

/* trivia */
.trivia{
  padding:32px;border-top:1px solid var(--panel-border);
  background:linear-gradient(135deg,rgba(139,92,246,.05) 0%,rgba(77,163,255,.05) 100%),rgba(255,255,255,.02);
  position:relative;
}
.trivia::before{
  content:'';position:absolute;top:0;left:50%;transform:translateX(-50%);width:100px;height:2px;
  background:linear-gradient(90deg,var(--accent-2),var(--accent));border-radius:2px;
}
.trivia h3{
  font-size:24px;font-weight:700;margin-bottom:24px;text-align:center;
  background:linear-gradient(135deg,var(--accent-2),var(--accent));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
}
.trivia-question{font-size:18px;font-weight:600;margin-bottom:20px;text-align:center;color:var(--text);padding:20px;background:rgba(255,255,255,.05);border-radius:12px;border:1px solid var(--panel-border)}
.trivia .options{display:grid;gap:12px;margin-bottom:24px}
.trivia .btn{text-align:left;padding:16px 20px;background:rgba(255,255,255,.05);border:1px solid var(--panel-border);transition:var(--transition);font-size:15px}
.trivia .btn:hover:not(:disabled){background:rgba(255,255,255,.1);transform:translateX(8px)}
.trivia .btn.correct{border-color:var(--success)!important;background:rgba(16,185,129,.2)!important;color:var(--success)!important;box-shadow:0 0 20px rgba(16,185,129,.3)}
.trivia .btn.wrong{border-color:var(--error)!important;background:rgba(239,68,68,.2)!important;color:var(--error)!important;box-shadow:0 0 20px rgba(239,68,68,.3)}
.trivia .actions{display:flex;gap:16px;align-items:center;justify-content:center;flex-wrap:wrap}
#tres{text-align:center;font-weight:600;margin-top:16px;padding:16px;border-radius:12px;background:rgba(255,255,255,.05);border:1px solid var(--panel-border);font-size:16px;line-height:1.5}

/* mobile */
@media (max-width:768px){
  .app{padding:16px}
  header.appbar{flex-direction:column;align-items:stretch;padding:20px;gap:16px}
  .controls{justify-content:center}.controls>*{flex:1;max-width:200px}
  .media{max-height:60vh}.meta{padding:24px}
  .footerbar{gap:30px;padding:24px;position:sticky;bottom:0;background:var(--panel);backdrop-filter:blur(20px)}
  .circle-btn{width:60px;height:60px;font-size:24px}
  .trivia{padding:24px}
}
@media (max-width:480px){
  .title{font-size:1.8rem}
  .circle-btn{width:55px;height:55px;font-size:22px}
  .footerbar{gap:20px}
}

// basic setup
const KEY = 'dGlrQyzXkbxo3s8StVrEapBIg3SedAQCGb28zj3I';
const el = {
  img: document.getElementById('img'),
  vid: document.getElementById('vid'),
  tlink: document.getElementById('tlink'),
  th: document.getElementById('th'),
  ttl: document.getElementById('ttl'),
  dsc: document.getElementById('dsc'),
  dchip: document.getElementById('dchip'),
  tchip: document.getElementById('tchip'),
  cr: document.getElementById('cr'),
  date: document.getElementById('date'),
  tbtn: document.getElementById('tbtn'),
  pbtn: document.getElementById('pbtn'),
  nbtn: document.getElementById('nbtn'),
  load: document.getElementById('load'),
  err: document.getElementById('err'),
  errmsg: document.getElementById('errmsg'),
  rbtn: document.getElementById('rbtn'),
  mwrap: document.getElementById('mwrap'),
  tv: document.getElementById('tv'),
  tq: document.getElementById('tq'),
  opts: document.getElementById('opts'),
  tres: document.getElementById('tres'),
  tprog: document.getElementById('tprog'),
  nq: document.getElementById('nq'),
};

#js
// dates (UTC helpers)
const MIN = new Date('1995-06-16');
const iso = d => new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())).toISOString().slice(0,10);
const fiso = s => new Date(s + 'T00:00:00Z');

const TODAY = iso(new Date());
let cur = fiso(TODAY);

// request control
let inFly = null;

// ui state
const busy = on => {
  document.querySelector('.viewer').setAttribute('aria-busy', on ? 'true' : 'false');
  el.load.hidden = !on;
  el.pbtn.disabled = el.nbtn.disabled = on;
};
const hide = () => {
  [el.img, el.vid, el.tlink].forEach(x => { x.classList.remove('show'); x.style.display = 'none'; });
};
const show = x => { x.style.display = 'block'; requestAnimationFrame(() => x.classList.add('show')); };
const oops = msg => { hide(); el.errmsg.textContent = msg || 'Something went wrong.'; el.err.hidden = false; };
const clrErr = () => { el.err.hidden = true; };

// youtube helper
const ytembed = url => {
  const m = url && url.match(/(?:v=|youtu\.be\/)([A-Za-z0-9_-]{6,})/);
  return m ? `https://www.youtube.com/embed/${m[1]}` : null;
};

// fetch apod
async function getApod(d) {
  const ds = iso(d);
  if (inFly) inFly.abort();
  inFly = new AbortController();

  busy(true); clrErr(); hide();

  try {
    const url = `https://api.nasa.gov/planetary/apod?api_key=${encodeURIComponent(KEY)}&date=${ds}&thumbs=true`;
    const res = await fetch(url, { signal: inFly.signal, headers: { 'Accept':'application/json' } });
    const raw = await res.text();
    let data;
    try { data = JSON.parse(raw); } catch { throw new Error('Invalid JSON from NASA API'); }
    if (!res.ok) {
      const m = data && (data.msg || (data.error && data.error.message) || data.message);
      throw new Error(m ? String(m) : `HTTP ${res.status}`);
    }
    paint(data);
  } catch (e) {
    if (e.name !== 'AbortError') oops(e.message);
  } finally {
    busy(false);
  }
}

// render
function paint(data) {
  el.ttl.textContent = data.title || 'Astronomy Picture of the Day';
  el.dsc.textContent = data.explanation || '—';
  el.dchip.textContent = new Date(data.date + 'T00:00:00Z').toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });

  if (data.copyright) {
    el.cr.textContent = `© ${data.copyright}`;
    el.cr.style.display = 'inline-block';
  } else {
    el.cr.style.display = 'none';
  }

  el.tchip.textContent = (data.media_type || '').toUpperCase();
  el.tchip.style.display = 'inline-block';

  hide();
  el.img.src = ''; el.vid.src = ''; el.th.src = '';

  if (data.media_type === 'image') {
    el.img.onload = () => show(el.img);
    el.img.alt = data.title || 'APOD image';
    el.img.src = data.url || data.hdurl;
  } else if (data.media_type === 'video') {
    const yt = ytembed(data.url);
    if (yt) {
      el.vid.onload = () => show(el.vid);
      el.vid.src = yt;
    } else if (data.thumbnail_url) {
      el.tlink.onload = () => show(el.tlink);
      el.th.src = data.thumbnail_url;
      el.tlink.href = data.url;
      el.tlink.target = '_blank';
      el.tlink.style.display = 'block';
    } else {
      el.vid.onload = () => show(el.vid);
      el.vid.src = data.url;
    }
  } else {
    el.dsc.textContent = 'Unsupported media type for this date.';
  }

  cur = fiso(data.date);
  el.date.value = data.date;

  seed(data.date);
  nextQ();
}

// date navigation
function nav(delta) {
  const d = new Date(cur);
  d.setUTCDate(d.getUTCDate() + delta);
  if (d < MIN || d > fiso(TODAY)) return;
  getApod(d);
}

// touch nav
let startX = null;
el.mwrap.addEventListener('touchstart', e => { startX = e.changedTouches[0].clientX; }, { passive:true });
el.mwrap.addEventListener('touchend', e => {
  if (startX == null) return;
  const dx = e.changedTouches[0].clientX - startX;
  if (Math.abs(dx) > 50) (dx > 0 ? nav(-1) : nav(1));
  startX = null;
}, { passive:true });

// trivia
const QS = [
  { q:'Which planet has the largest volcano in the Solar System?', a:['Mars','Earth','Venus','Jupiter'], i:0, why:"Olympus Mons on Mars is about 22 km high—nearly 3× taller than Everest—and ~600 km wide." },
  { q:'What is the name of our galaxy?', a:['Andromeda','Milky Way','Triangulum','Whirlpool'], i:1, why:'We live in the Milky Way, ~100–400B stars.' },
  { q:'Which space telescope captured the "Pillars of Creation"?', a:['James Webb','Hubble','Spitzer','Chandra'], i:1, why:'Hubble made the 1995 image iconic; JWST later added more detail.' },
  { q:'What does APOD stand for?', a:['Astronomy Photo of the Day','Astronomy Picture of the Day','Astrophysics Picture Daily','Astronomical Pic of Day'], i:1, why:'APOD = Astronomy Picture of the Day.' },
  { q:'How long for sunlight to reach Earth?', a:['8 sec','8 min','8 hr','8 days'], i:1, why:'~8 min 20 sec from Sun to Earth.' },
  { q:'Which planet has wild temp swings?', a:['Venus','Mercury','Mars','Neptune'], i:1, why:'Mercury has no atmosphere; scorching day, freezing night.' },
  { q:'A light-year is…', a:['time','distance','brightness','age'], i:1, why:'Distance: ~9.46 trillion km.' },
  { q:'Which planet tilts ~98°?', a:['Saturn','Neptune','Uranus','Jupiter'], i:2, why:'Uranus likely took a big hit early on.' },
  { q:'Closest star system after Sun?', a:["Barnard's Star",'Sirius','Proxima Centauri','Vega'], i:2, why:'Proxima Centauri (~4.24 ly) in Alpha Centauri.' },
  { q:'Dwarf planet in asteroid belt?', a:['Pluto','Eris','Makemake','Ceres'], i:3, why:'Ceres lives in the main belt.' },
  { q:'Auroras caused by…', a:["solar wind + magnetic field",'city lights','ice crystals','space lightning'], i:0, why:'Charged particles excite atmospheric gases.' },
  { q:'Approx moons of Jupiter?', a:['27','53','79','95'], i:2, why:'~79 confirmed.' },
  { q:'Great Red Spot is…', a:['a storm','a surface feature',"a moon’s shadow",'volcanic'], i:0, why:'A giant anticyclonic storm.' },
  { q:'Sun will end as…', a:['black hole','neutron star','white dwarf','red giant forever'], i:2, why:'Red giant → white dwarf.' },
  { q:'Coldest place in the solar system?', a:["Pluto","Neptune","Moon’s polar craters",'interstellar space'], i:2, why:'Permanently shadowed lunar craters can hit ~−230°C.' },
  { q:'ISS speed?', a:['17,500 mph','25,000 mph','11,000 mph','5,000 mph'], i:0, why:'~28,000 km/h; ~90 min per orbit.' },
  { q:'Dark matter + energy ≈ ?', a:['25%','50%','75%','95%'], i:3, why:'~27% + ~68% ≈ 95%.' },
  { q:'Strongest winds?', a:['Jupiter','Saturn','Neptune','Uranus'], i:2, why:'Neptune up to ~2,100 km/h.' },
  { q:'Largest moon?', a:["Earth’s Moon",'Titan','Ganymede','Callisto'], i:2, why:'Ganymede > Mercury.' },
  { q:'Age of universe?', a:['4.6B yr','13.8B yr','26B yr','100B yr'], i:1, why:'~13.8B years.' },
];

let order = [], ptr = 0;
const hseed = s => { let h = 2166136261>>>0; for (let i=0;i<s.length;i++){ h^=s.charCodeAt(i); h=Math.imul(h,16777619);} return h>>>0; };
function shuffle(a, seed){
  const out = a.slice(); let r = seed>>>0;
  for (let i=out.length-1;i>0;i--){ r^=r<<13; r^=r>>>17; r^=r<<5; r>>>=0; const j = r % (i+1); [out[i],out[j]] = [out[j],out[i]]; }
  return out;
}
function seed(ds){ order = shuffle([...Array(QS.length).keys()], hseed(ds+'|apod')); ptr = 0; el.tprog.textContent = `${ptr}/${QS.length}`; }
function paintQ(i){
  const { q, a, i:idx, why } = QS[i];
  el.tq.textContent = q; el.opts.innerHTML = ''; el.tres.textContent = '';
  a.forEach((txt,k)=>{
    const b = document.createElement('button');
    b.className = 'btn'; b.textContent = txt; b.disabled = false;
    b.addEventListener('click', ()=>{
      if (k===idx){ b.classList.add('correct'); el.tres.innerHTML = `<strong>✅ Correct!</strong><br>${why}`; }
      else { b.classList.add('wrong'); el.tres.innerHTML = `<strong>❌ Not quite.</strong><br>${why}`; }
      [...el.opts.children].forEach(x=>x.disabled=true);
    }, { once:true });
    el.opts.appendChild(b);
  });
  el.tprog.textContent = `${ptr+1}/${QS.length}`;
}
function nextQ(){ if (ptr>=order.length) ptr=0; paintQ(order[ptr]); ptr++; }

// hooks
el.nq.addEventListener('click', nextQ);
el.pbtn.addEventListener('click', ()=>nav(-1));
el.nbtn.addEventListener('click', ()=>nav(1));
el.tbtn.addEventListener('click', ()=>getApod(fiso(TODAY)));
el.date.addEventListener('change', e=>{
  const v = e.target.value; if (!v) return;
  const d = fiso(v); if (d<MIN || d>fiso(TODAY)) return; getApod(d);
});
el.rbtn.addEventListener('click', ()=>getApod(cur));

// boot
el.date.max = TODAY; el.date.min = iso(MIN);
getApod(cur);
