#!/usr/bin/env node
/**
 * 精选账号商城 · Allbirds 风格生成器
 * 风格：温暖自然 · 干净极简 · 柔和质感
 */

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, 'data');
const DIST_DIR = path.join(__dirname, 'dist');

function loadJSON(name) {
    const fp = path.join(DATA_DIR, name);
    if (!fs.existsSync(fp)) return null;
    return JSON.parse(fs.readFileSync(fp, 'utf8'));
}

function esc(s) { return (s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function fixImg(url, base) {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    if (url.startsWith('/')) return base + url;
    return url;
}

// ── SEO 配置 ──
function loadRootJSON(name) {
    const fp = path.join(__dirname, name);
    if (!fs.existsSync(fp)) return null;
    return JSON.parse(fs.readFileSync(fp, 'utf8'));
}
const SEO = loadRootJSON('seo.json') || {};
const SEO_KEYWORDS = SEO.keywords || '';
const SEO_DESC = SEO.description || '';
const SITE_TITLE = SEO.title || '精选账号商城';
const SEO_TITLE_SUFFIX = SEO.titleSuffix || '';
const SEO_AUTHOR = SEO.author || SITE_TITLE;
const SEO_ROBOTS = SEO.robots || 'index, follow';
const SEO_CANONICAL = SEO.canonical || '';
const SEO_OG = SEO.og || {};
const SEO_TWITTER = SEO.twitter || {};
const SEO_JSON_LD = SEO.jsonLd || {};
const SEO_FAVICON = SEO.favicon || '';

// ── CSS · Allbirds-inspired warm minimal ──
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap');

:root {
  --white: #FFFFFF;
  --cream: #FAFAF8;
  --sand: #F5F3EF;
  --tan: #E8DFD0;
  --tan-dark: #C4A882;
  --sage: #5B7553;
  --sage-light: #8B9D83;
  --sage-bg: #EDF2EB;
  --charcoal: #2D2D2D;
  --gray: #6B6B6B;
  --gray-light: #9B9B9B;
  --gray-border: #E5E2DC;
  --accent: #5B7553;
  --accent-hover: #4A6344;
  --bg: var(--cream);
  --bg-alt: var(--sand);
  --text: var(--charcoal);
  --text-secondary: var(--gray);
  --text-muted: var(--gray-light);
  --radius: 12px;
  --radius-lg: 20px;
  --radius-xl: 28px;
  --max-w: 1200px;
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.04);
  --shadow-card: 0 2px 12px rgba(0,0,0,0.06);
  --shadow-card-hover: 0 8px 30px rgba(0,0,0,0.1);
  --ease: cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }

body {
  font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background: var(--bg); color: var(--text); line-height: 1.7;
  min-height: 100vh; overflow-x: hidden; -webkit-font-smoothing: antialiased;
}

a { color: var(--accent); text-decoration: none; transition: color .3s var(--ease); }
a:hover { color: var(--accent-hover); }
img { max-width: 100%; height: auto; display: block; }
.container { max-width: var(--max-w); margin: 0 auto; padding: 0 24px; }

/* ── Header ── */
.header {
  position: sticky; top: 0; z-index: 1000; height: 68px;
  background: rgba(250, 250, 248, 0.92); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--gray-border); transition: box-shadow .3s var(--ease);
}
.header.scrolled { box-shadow: 0 1px 8px rgba(0,0,0,0.06); }
.header-inner { max-width: var(--max-w); margin: 0 auto; padding: 0 24px; height: 100%; display: flex; align-items: center; justify-content: space-between; }
.logo-area { display: flex; align-items: center; gap: 12px; }
.logo-mark { height: 38px; border-radius: 10px; overflow: hidden; flex-shrink: 0; }
.logo-mark img { height: 100%; width: auto; border-radius: 10px; display: block; }
.logo-text-group { display: flex; flex-direction: column; gap: 1px; }
.logo-text { font-family: 'Space Grotesk', sans-serif; font-size: 1.1rem; font-weight: 700; color: var(--charcoal); letter-spacing: -0.02em; }
.logo-sub { font-size: .68rem; color: var(--gray-light); letter-spacing: .3px; }
.logo-sub a { color: var(--gray-light); } .logo-sub a:hover { color: var(--sage); }
.header-actions { display: flex; align-items: center; gap: 12px; }
.header-badge-sm { display: flex; align-items: center; gap: 6px; padding: 6px 14px; border-radius: 100px; background: var(--sage-bg); font-size: .72rem; color: var(--sage); font-weight: 600; }
.pulse-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--sage); animation: pulse 2s ease-in-out infinite; }
@keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: .5; transform: scale(1.3); } }
.header-pill {
  padding: 8px 22px; border-radius: 100px; font-size: .8rem; font-weight: 600;
  background: var(--sage); color: var(--white); letter-spacing: .2px;
  transition: all .3s var(--ease); box-shadow: 0 2px 8px rgba(91,117,83,0.2);
}
.header-pill:hover { background: var(--accent-hover); transform: translateY(-1px); box-shadow: 0 4px 16px rgba(91,117,83,0.25); color: var(--white); }

/* ── Hero · Full-width banner ── */
.hero {
  position: relative; overflow: hidden;
  background: linear-gradient(135deg, #EDF2EB 0%, #F5F3EF 40%, #E8DFD0 100%);
  padding: 80px 24px 72px; text-align: center;
}
.hero::before {
  content: ''; position: absolute; inset: 0; pointer-events: none;
  background: radial-gradient(ellipse at 30% 20%, rgba(91,117,83,0.08) 0%, transparent 60%),
              radial-gradient(ellipse at 70% 80%, rgba(196,168,130,0.1) 0%, transparent 60%);
}
.hero-inner { position: relative; z-index: 1; }
.hero-badge {
  display: inline-flex; align-items: center; gap: 8px; padding: 8px 20px;
  border-radius: 100px; margin-bottom: 28px;
  background: var(--white); border: 1px solid var(--gray-border);
  font-size: .8rem; color: var(--sage); font-weight: 600;
  box-shadow: var(--shadow-sm);
}
.hero-badge .badge-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--sage); }
.hero h1 {
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(2.2rem, 5.5vw, 3.6rem); font-weight: 800;
  letter-spacing: -0.03em; line-height: 1.12; margin-bottom: 20px; color: var(--charcoal);
}
.hero h1 .accent-text { color: var(--sage); }
.hero-desc { font-size: 1.05rem; color: var(--gray); max-width: 520px; margin: 0 auto 44px; font-weight: 400; line-height: 1.8; }

.stats-row { display: flex; justify-content: center; gap: 10px; flex-wrap: wrap; max-width: 680px; margin: 0 auto; }
.stat-chip {
  display: flex; align-items: center; gap: 10px; padding: 14px 24px;
  border-radius: var(--radius); background: var(--white); border: 1px solid var(--gray-border);
  transition: all .3s var(--ease); box-shadow: var(--shadow-sm);
}
.stat-chip:hover { transform: translateY(-2px); box-shadow: var(--shadow-card); }
.stat-chip .stat-num { font-family: 'Space Grotesk', sans-serif; font-size: 1.5rem; font-weight: 700; color: var(--sage); }
.stat-chip .stat-label { font-size: .75rem; color: var(--gray-light); font-weight: 500; letter-spacing: .5px; text-transform: uppercase; }

/* ── Filter ── */
.filter-section { padding: 32px 0 20px; }
.filter-bar { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; }
.filter-btn {
  padding: 10px 22px; border-radius: 100px; cursor: pointer;
  font-size: .82rem; font-weight: 600; transition: all .3s var(--ease);
  background: var(--white); color: var(--gray); border: 1px solid var(--gray-border);
  letter-spacing: .2px; user-select: none;
}
.filter-btn:hover { background: var(--sand); color: var(--charcoal); border-color: var(--tan); }
.filter-btn.active { background: var(--sage); color: var(--white); border-color: var(--sage); box-shadow: 0 2px 10px rgba(91,117,83,0.2); }

/* ── Products ── */
.products-section { padding: 12px 0 80px; }
.products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; }

.product-card {
  position: relative; display: block;
  background: var(--white); border: 1px solid var(--gray-border);
  border-radius: var(--radius-lg); overflow: hidden;
  transition: all .4s var(--ease); cursor: pointer;
  text-decoration: none; color: inherit;
  box-shadow: var(--shadow-sm);
}
.product-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-card-hover);
  border-color: var(--tan);
}

.card-img-wrap { position: relative; overflow: hidden; height: 200px; background: var(--sand); }
.card-img-wrap img { width: 100%; height: 100%; object-fit: cover; transition: transform .6s var(--ease); }
.product-card:hover .card-img-wrap img { transform: scale(1.06); }

.card-tag {
  position: absolute; top: 14px; left: 14px; z-index: 2;
  padding: 5px 14px; border-radius: 8px; font-size: .7rem; font-weight: 700;
  background: var(--sage); color: var(--white); letter-spacing: .5px;
  box-shadow: 0 2px 8px rgba(91,117,83,0.25);
}

.card-body { position: relative; padding: 20px; }
.card-cat { font-size: .68rem; color: var(--sage-light); font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 8px; }
.card-title {
  font-size: .92rem; font-weight: 600; line-height: 1.6; margin-bottom: 16px;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
  color: var(--charcoal); min-height: 2.9em;
}
.card-footer { display: flex; align-items: center; justify-content: space-between; }
.card-price { font-family: 'Space Grotesk', sans-serif; font-size: 1.25rem; font-weight: 700; color: var(--charcoal); }
.card-price .from { font-size: .68rem; font-weight: 400; color: var(--gray-light); margin-right: 2px; font-family: 'Plus Jakarta Sans', sans-serif; }
.card-price .amount { color: var(--sage); }
.card-cta {
  width: 38px; height: 38px; border-radius: 12px;
  background: var(--sage-bg); display: flex; align-items: center; justify-content: center;
  color: var(--sage); font-size: 1rem; transition: all .3s var(--ease);
}
.product-card:hover .card-cta { background: var(--sage); color: var(--white); transform: translateX(4px); box-shadow: 0 2px 10px rgba(91,117,83,0.2); }

/* ── Features ── */
.features-section { padding: 40px 0 80px; }
.features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; }
.feature-card {
  background: var(--white); border: 1px solid var(--gray-border);
  border-radius: var(--radius-lg); padding: 32px 24px; text-align: center;
  transition: all .4s var(--ease); box-shadow: var(--shadow-sm);
}
.feature-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-card); border-color: var(--tan); }
.feature-icon {
  width: 56px; height: 56px; border-radius: 16px; margin: 0 auto 18px;
  background: var(--sage-bg); border: 1px solid transparent;
  display: flex; align-items: center; justify-content: center; font-size: 1.5rem;
  transition: all .3s var(--ease);
}
.feature-card:hover .feature-icon { background: var(--sage); box-shadow: 0 2px 12px rgba(91,117,83,0.2); }
.feature-card:hover .feature-icon::after { color: var(--white); }
.feature-card h3 { font-family: 'Space Grotesk', sans-serif; font-size: .95rem; font-weight: 700; margin-bottom: 8px; color: var(--charcoal); letter-spacing: -.01em; }
.feature-card p { font-size: .8rem; color: var(--gray); font-weight: 400; line-height: 1.6; }

/* ── CTA ── */
.cta-section { padding: 0 0 80px; }
.cta-banner {
  position: relative; overflow: hidden; border-radius: var(--radius-xl);
  padding: 60px 40px;
  background: linear-gradient(135deg, var(--sage) 0%, var(--sage-light) 100%);
  text-align: center; color: var(--white);
}
.cta-banner h2 { font-family: 'Space Grotesk', sans-serif; font-size: clamp(1.4rem, 3vw, 2rem); font-weight: 700; margin-bottom: 12px; letter-spacing: -.02em; color: var(--white); }
.cta-banner p { font-size: .95rem; margin-bottom: 28px; opacity: .9; }
.cta-btn {
  display: inline-flex; align-items: center; gap: 8px; padding: 14px 36px;
  border-radius: 100px; background: var(--white); color: var(--sage);
  font-size: .9rem; font-weight: 700; letter-spacing: .3px;
  transition: all .3s var(--ease); box-shadow: 0 4px 16px rgba(0,0,0,0.1);
}
.cta-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 24px rgba(0,0,0,0.15); color: var(--sage); }

/* ── Footer ── */
.footer { text-align: center; padding: 48px 24px 40px; border-top: 1px solid var(--gray-border); }
.footer-line { width: 40px; height: 2px; margin: 0 auto 24px; background: var(--sage); border-radius: 2px; }
.footer p { color: var(--gray-light); font-size: .78rem; line-height: 1.8; }
.footer a { color: var(--gray-light); transition: color .3s; } .footer a:hover { color: var(--sage); }
.footer-links { margin-bottom: 12px; }
.footer-links a {
  display: inline-flex; align-items: center; gap: 6px; padding: 8px 20px;
  border-radius: 100px; background: var(--white); border: 1px solid var(--gray-border);
  color: var(--gray); font-size: .82rem; font-weight: 500; transition: all .3s var(--ease);
}
.footer-links a:hover { border-color: var(--tan); color: var(--sage); transform: translateY(-1px); }

/* ── Animations ── */
@keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
.anim { opacity: 0; animation: fadeUp .6s var(--ease) forwards; }
.anim-d1 { animation-delay: .08s; } .anim-d2 { animation-delay: .16s; } .anim-d3 { animation-delay: .24s; }
.anim-d4 { animation-delay: .32s; } .anim-d5 { animation-delay: .4s; } .anim-d6 { animation-delay: .48s; }
.reveal { opacity: 0; transform: translateY(20px); transition: all .6s var(--ease); }
.reveal.visible { opacity: 1; transform: translateY(0); }

/* ── Responsive ── */
@media (max-width: 768px) {
  .hero { padding: 50px 16px 48px; } .hero h1 { font-size: 1.8rem; }
  .hero-desc { font-size: .92rem; margin-bottom: 32px; }
  .stats-row { gap: 6px; } .stat-chip { padding: 10px 16px; } .stat-chip .stat-num { font-size: 1.2rem; }
  .products-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
  .card-img-wrap { height: 150px; } .card-body { padding: 14px; } .card-title { font-size: .82rem; min-height: auto; }
  .card-price { font-size: 1.05rem; } .header-badge-sm { display: none; } .container { padding: 0 16px; }
  .features-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; } .feature-card { padding: 24px 16px; }
  .cta-banner { padding: 40px 24px; } .filter-bar { gap: 6px; } .filter-btn { padding: 8px 16px; font-size: .75rem; }
}
@media (max-width: 480px) {
  .products-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
  .card-img-wrap { height: 130px; } .card-body { padding: 10px; }
  .card-tag { font-size: .6rem; padding: 4px 10px; top: 8px; left: 8px; }
  .card-cta { width: 30px; height: 30px; border-radius: 8px; font-size: .8rem; }
  .stat-chip { padding: 8px 12px; } .stat-chip .stat-num { font-size: 1rem; } .stat-chip .stat-label { font-size: .65rem; }
  .logo-sub { display: none; }
}
`;

// ── JS · Filter + Scroll animations ──
const JS = `
function filterCategory(id, el) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  if (el) el.classList.add('active');
  document.querySelectorAll('.product-card').forEach((c, i) => {
    if (id === 'all' || c.dataset.cat == id) {
      c.style.display = '';
      c.style.opacity = '0'; c.style.transform = 'translateY(16px)';
      setTimeout(() => { c.style.transition = 'all .4s cubic-bezier(0.25,0.46,0.45,0.94)'; c.style.opacity = '1'; c.style.transform = 'translateY(0)'; }, i * 40);
    } else { c.style.display = 'none'; }
  });
}
window.addEventListener('scroll', () => { document.getElementById('header').classList.toggle('scrolled', window.scrollY > 20); });
document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => { if (entry.isIntersecting) { setTimeout(() => entry.target.classList.add('visible'), i * 60); observer.unobserve(entry.target); } });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});
`;

function main() {
    const config = loadJSON('config.json') || {};
    const categories = loadJSON('categories.json') || [];
    const products = loadJSON('products.json') || [];
    const meta = loadJSON('meta.json') || {};

    if (!products.length) { console.error('❌ 没有商品数据'); process.exit(1); }

    const siteUrl = meta.siteUrl || process.env.SITE_URL;
    const siteName = SITE_TITLE;
    const GITHUB_PAGES_URL = process.env.GITHUB_PAGES_URL;

    if (!fs.existsSync(DIST_DIR)) fs.mkdirSync(DIST_DIR, { recursive: true });

    // 简化分类名用于 filter 按钮
    function shortCatName(name) {
        return name
            .replace(/谷歌美国电话\/?/i, '')
            .replace(/GoogleVoice\s*\/?\s*GV靓号/i, 'GV靓号')
            .replace(/谷歌邮箱\s*\/?\s*油管\s*\/?\s*Google\s*\/?\s*Gmail/i, '谷歌邮箱')
            .replace(/苹果id\s*\/?\s*Apple\s*id\s*\/?\s*AppStore/i, '苹果ID')
            .replace(/服务类/i, '服务类')
            .trim() || name;
    }

    const activeCats = categories.filter(c => products.some(p => p.category_id === c.id));
    const catBtns = activeCats
        .sort((a, b) => (b.sort || 0) - (a.sort || 0))
        .map(c => `<div class="filter-btn" onclick="filterCategory(${c.id}, this)">${esc(shortCatName(c.name))}</div>`)
        .join('\n            ');

    const cards = products.filter(p => p.active !== 0).sort((a, b) => (b.sort||0) - (a.sort||0)).map((p, i) => {
        const cat = categories.find(c => c.id === p.category_id);
        const catName = cat ? shortCatName(cat.name) : '';
        const img = p.image_url ? fixImg(p.image_url, siteUrl) : '';
        const variants = p.variants || [];
        const minPrice = variants.length ? Math.min(...variants.map(v => v.price)) : 0;
        const tags = (p.tags || '').split(',').map(t => t.trim()).filter(Boolean);
        const cleanTag = t => t.replace(/b[12]#[0-9a-fA-F]{3,6}/g, '').replace(/#[0-9a-fA-F]{3,6}$/g, '').replace(/\s+/g, ' ').trim();
        const tagLabel = cleanTag(tags[0] || '');

        return `
            <a class="product-card reveal" href="${siteUrl}/product?id=${p.id}" target="_blank" rel="noopener" data-cat="${p.category_id}">
                <div class="card-img-wrap">
                    ${img ? `<img src="${esc(img)}" alt="${esc(p.name)}" loading="lazy">` : ''}
                    ${tagLabel ? `<div class="card-tag">${esc(tagLabel)}</div>` : ''}
                </div>
                <div class="card-body">
                    <div class="card-cat">${esc(catName)}</div>
                    <div class="card-title">${esc(p.name)}</div>
                    <div class="card-footer">
                        <div class="card-price"><span class="from">起</span><span class="amount">¥${minPrice.toFixed(2)}</span></div>
                        <div class="card-cta">→</div>
                    </div>
                </div>
            </a>`;
    }).join('\n');

    const ogImage = products[0]?.image_url ? fixImg(products[0].image_url, siteUrl) : (meta.siteLogo ? fixImg(meta.siteLogo, siteUrl) : '');

    const jsonLd = { "@context": "https://schema.org", "@type": "WebSite", "name": siteName, "description": SEO_DESC, "url": GITHUB_PAGES_URL, "potentialAction": { "@type": "SearchAction", "target": `${siteUrl}/product?id={search_term_string}`, "query-input": "required name=search_term_string" } };
    const itemListLd = { "@context": "https://schema.org", "@type": "ItemList", "itemListElement": products.filter(p => p.active !== 0).map((p, i) => ({ "@type": "ListItem", "position": i + 1, "item": { "@type": "Product", "name": p.name, "url": `${siteUrl}/product?id=${p.id}`, "image": p.image_url ? fixImg(p.image_url, siteUrl) : '', "offers": { "@type": "Offer", "price": p.variants?.length ? Math.min(...p.variants.map(v => v.price)) : 0, "priceCurrency": "CNY" } } })) };

    const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${esc(siteName)}${SEO_TITLE_SUFFIX ? ' - ' + esc(SEO_TITLE_SUFFIX) : ''}</title>
    <meta name="description" content="${esc(SEO_DESC)}">
    <meta name="keywords" content="${esc(SEO_KEYWORDS)}">
    <meta name="author" content="${esc(SEO_AUTHOR)}">
    <meta name="robots" content="${esc(SEO_ROBOTS)}">
    <meta name="googlebot" content="${esc(SEO_ROBOTS)}">
    ${SEO_CANONICAL ? `<link rel="canonical" href="${esc(SEO_CANONICAL)}">` : ''}
    <meta property="og:type" content="${esc(SEO_OG.type || 'website')}">
    <meta property="og:url" content="${esc(SEO_OG.url || GITHUB_PAGES_URL)}">
    <meta property="og:title" content="${esc(siteName)}">
    <meta property="og:description" content="${esc(SEO_DESC)}">
    ${ogImage ? `<meta property="og:image" content="${esc(ogImage)}">` : ''}
    <meta property="og:locale" content="${esc(SEO_OG.locale || 'zh_CN')}">
    <meta property="og:site_name" content="${esc(SEO_OG.siteName || siteName)}">
    <meta name="twitter:card" content="${esc(SEO_TWITTER.card || 'summary_large_image')}">
    <meta name="twitter:title" content="${esc(siteName)}">
    <meta name="twitter:description" content="${esc(SEO_DESC)}">
    ${ogImage ? `<meta name="twitter:image" content="${esc(ogImage)}">` : ''}
    <script type="application/ld+json">${JSON.stringify({...SEO_JSON_LD, ...jsonLd})}</script>
    <script type="application/ld+json">${JSON.stringify(itemListLd)}</script>
    ${SEO_FAVICON ? `<link rel="icon" href="${esc(SEO_FAVICON)}">` : ''}
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>${CSS}</style>
</head>
<body>

<header class="header" id="header">
    <div class="header-inner">
        <div class="logo-area">
            <div class="logo-mark">
                <img src="${esc(fixImg(meta.siteLogo || '', siteUrl))}" alt="${esc(siteName)}">
            </div>
            <div class="logo-text-group">
                <div class="logo-text">${esc(siteName)}</div>
                <div class="logo-sub">商城原址：<a href="${siteUrl}" target="_blank" rel="noopener">${esc(siteUrl)}</a></div>
            </div>
        </div>
        <div class="header-actions">
            <div class="header-badge-sm"><div class="pulse-dot"></div>自动发货中</div>
            <a href="${siteUrl}" target="_blank" rel="noopener" class="header-pill">进入商城 →</a>
        </div>
    </div>
</header>

<section class="hero">
    <div class="hero-inner container">
        <div class="hero-badge anim"><div class="badge-dot"></div>全场自动发货 · 安全可靠</div>
        <h1 class="anim anim-d1">精选优质<br><span class="accent-text">数字账号资源</span></h1>
        <p class="hero-desc anim anim-d2">一站式解决账号与网站需求，稳定可靠，支持长期使用</p>
        <div class="stats-row">
            <div class="stat-chip anim anim-d3"><span class="stat-num">${categories.length}</span><span class="stat-label">分类</span></div>
            <div class="stat-chip anim anim-d4"><span class="stat-num">${products.filter(p=>p.active!==0).length}</span><span class="stat-label">商品</span></div>
            <div class="stat-chip anim anim-d5"><span class="stat-num">${products.reduce((s,p) => s + (p.variants?.length||0), 0)}</span><span class="stat-label">规格</span></div>
            <div class="stat-chip anim anim-d6"><span class="stat-num">24h</span><span class="stat-label">发货</span></div>
        </div>
    </div>
</section>

<div class="container filter-section">
    <div class="filter-bar">
        <div class="filter-btn active" onclick="filterCategory('all', this)">全部商品</div>
        ${catBtns}
    </div>
</div>

<section class="products-section">
    <div class="container">
        <div class="products-grid">
            ${cards}
        </div>
    </div>
</section>

<section class="features-section">
    <div class="container">
        <div class="features-grid">
            <div class="feature-card reveal"><div class="feature-icon">⚡</div><h3>即时发货</h3><p>付款后自动发货，无需等待人工处理</p></div>
            <div class="feature-card reveal"><div class="feature-icon">🛡️</div><h3>品质保障</h3><p>质保期内首登有问题免费更换</p></div>
            <div class="feature-card reveal"><div class="feature-icon">💎</div><h3>源头价格</h3><p>一手资源，拒绝中间商差价</p></div>
            <div class="feature-card reveal"><div class="feature-icon">🎯</div><h3>可选靓号</h3><p>支持自选号码，精准匹配需求</p></div>
        </div>
    </div>
</section>

<section class="cta-section">
    <div class="container">
        <div class="cta-banner reveal">
            <h2>找到你需要的账号了吗？</h2>
            <p>全场自动发货，安全可靠，支持长期使用</p>
            <a href="${siteUrl}" target="_blank" rel="noopener" class="cta-btn">立即前往商城 →</a>
        </div>
    </div>
</section>

<footer class="footer">
    <div class="container">
        <div class="footer-line"></div>
        <div class="footer-links"><a href="${siteUrl}" target="_blank" rel="noopener">🏪 进入商城</a></div>
        <p style="margin-bottom:6px">© ${new Date().getFullYear()} ${esc(siteName)} · 所有商品均为虚拟数字商品</p>
        <p>商城原址：<a href="${siteUrl}" target="_blank" rel="noopener">${esc(siteUrl)}</a></p>
    </div>
</footer>

<script>${JS}</script>
</body>
</html>`;

    fs.writeFileSync(path.join(DIST_DIR, 'index.html'), html);
    console.log(`✅ dist/index.html (${(Buffer.byteLength(html)/1024).toFixed(1)}KB)`);
    console.log(`   商品: ${products.filter(p=>p.active!==0).length} 个`);
    console.log(`   分类: ${activeCats.length} 个`);
    console.log(`   风格: Allbirds 温暖极简 · 自然色调 · 柔和质感`);
    console.log(`   链接: 全部指向 ${siteUrl}/product?id=xxx`);
}

main();
