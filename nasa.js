
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
