"""Technical SEO audit of the built site. Run `npm run build` first.
Usage: python seo-audit/audit.py   -> writes seo-audit/report.json and prints a summary."""
import json, os, re
from collections import defaultdict, Counter
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse, unquote

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / ".vercel" / "output" / "static"
SITE = "https://www.weddingplanningchecklists.org"
cfg = (ROOT / "astro.config.mjs").read_text(encoding="utf-8")
REDIRECTS = set(re.findall(r"'(/[^']*)'\s*:", cfg))
def longp(p):
    p = str(Path(p).resolve())
    # Windows paths over 260 chars need the \\?\ prefix
    return "\\\\?\\" + p if os.name == "nt" and not p.startswith("\\\\") else p


LANGS = ("ar", "ur", "hi", "es", "fr", "de")


class P(HTMLParser):
    def __init__(s):
        super().__init__()
        s.d = defaultdict(list)
        s._t = None
        s._buf = ""

    def handle_starttag(s, tag, a):
        a = dict(a)
        if tag == "html":
            s.d["lang"].append(a.get("lang"))
        if tag == "meta":
            k = (a.get("name") or a.get("property") or "").lower()
            if k:
                s.d["meta:" + k].append(a.get("content") or "")
        if tag == "link":
            rel = (a.get("rel") or "").lower()
            if rel == "canonical":
                s.d["canonical"].append(a.get("href"))
            if rel == "alternate" and a.get("hreflang"):
                s.d["hreflang"].append((a["hreflang"], a.get("href")))
        if tag == "a" and a.get("href"):
            s.d["a"].append(a["href"])
        if tag == "img":
            s.d["img"].append(a)
        if tag in ("title", "h1") or (tag == "script" and a.get("type") == "application/ld+json"):
            s._t = "ld" if tag == "script" else tag
            s._buf = ""

    def handle_data(s, data):
        if s._t:
            s._buf += data

    def handle_endtag(s, tag):
        if s._t and (tag == s._t or (s._t == "ld" and tag == "script")):
            s.d[s._t].append(s._buf.strip())
            s._t = None


def url_of(f):
    rel = f.relative_to(OUT).as_posix()
    rel = re.sub(r"(^|/)index\.html$", "", rel)
    rel = re.sub(r"\.html$", "", rel)
    return "/" + rel.rstrip("/") if rel else "/"


def norm(path):
    return path.rstrip("/") or "/"


pages, issues = {}, defaultdict(list)


def flag(kind, sev, url, detail=""):
    issues[kind].append(dict(sev=sev, url=url, detail=str(detail)[:220]))


for f in sorted(OUT.rglob("*.html")):
    u = url_of(f)
    html = f.read_text(encoding="utf-8", errors="ignore")
    if 'http-equiv="refresh"' in html and len(html) < 3000:
        continue  # redirect stub
    p = P()
    p.feed(html)
    pages[u] = dict(d=p.d, size=len(html.encode()))

existing = set(pages)
assets = set()
for dp, _, fs in os.walk(longp(OUT)):
    for fn in fs:
        assets.add("/" + os.path.relpath(os.path.join(dp, fn), longp(OUT)).replace(os.sep, "/"))
titles, descs = defaultdict(list), defaultdict(list)

for u, pg in pages.items():
    d = pg["d"]
    is404 = "404" in u
    t = (d["title"] or [""])[0]
    if not t:
        flag("Missing <title>", "high", u)
    elif not 30 <= len(t) <= 65:
        flag("Title length outside 30-65 chars", "low", u, f"{len(t)}: {t}")
    if len(d["title"]) > 1:
        flag("Multiple <title> tags", "medium", u)
    if not is404:
        titles[t].append(u)
    desc = (d["meta:description"] or [""])[0]
    if not desc:
        flag("Missing meta description", "high", u)
    elif not 70 <= len(desc) <= 160:
        flag("Meta description length outside 70-160 chars", "low", u, len(desc))
    if not is404:
        descs[desc].append(u)
    robots = " ".join(d["meta:robots"]).lower()
    noindex = "noindex" in robots
    if noindex and not is404:
        flag("Page set to noindex", "high", u, robots)
    can = d["canonical"]
    pg["canon_self"] = False
    if not can:
        flag("Missing canonical", "high", u)
    else:
        if len(can) > 1:
            flag("Multiple canonical tags", "high", u, can)
        c = can[0] or ""
        if not c.startswith(SITE):
            flag("Canonical is not an absolute production URL", "high", u, c)
        cp = norm(urlparse(c).path)
        pg["canon_self"] = cp == u
        if cp != u and not is404:
            flag("Canonical points to a different URL", "medium", u, c)
        if c.endswith("/") and c != SITE + "/":
            flag("Canonical has trailing slash (config says never)", "medium", u, c)
    pg["noindex"] = noindex
    if not d["lang"] or not d["lang"][0]:
        flag("Missing <html lang>", "medium", u)
    if not d["meta:viewport"]:
        flag("Missing viewport meta", "high", u)
    h1 = d["h1"]
    if not h1:
        flag("Missing H1", "high", u)
    elif len(h1) > 1:
        flag("Multiple H1 tags", "medium", u, len(h1))
    for k in ("og:title", "og:description", "og:image"):
        if not d["meta:" + k]:
            flag(f"Missing {k}", "low", u)
    for img in d["meta:og:image"][:1]:
        if img and not img.startswith("http"):
            flag("og:image is not an absolute URL", "medium", u, img)
    if not d["meta:twitter:card"]:
        flag("Missing twitter:card", "low", u)

    types = []
    for raw in d["ld"]:
        try:
            j = json.loads(raw)
            items = j if isinstance(j, list) else j.get("@graph", [j])
            types += [str(i.get("@type")) for i in items if isinstance(i, dict)]
        except Exception as e:
            flag("Invalid JSON-LD (Google ignores it)", "high", u, e)
    pg["schema"] = types
    if "/blog/" in u and not u.endswith("/blog"):
        if not any(x in ("Article","BlogPosting","NewsArticle") for x in types):
            flag("Blog post without Article schema", "medium", u, types)
        if not any("Breadcrumb" in x for x in types):
            flag("Blog post without BreadcrumbList schema", "low", u)
    if Counter(types).get("FAQPage", 0) > 1:
        flag("Duplicate FAQPage schema on one page", "medium", u)

    hl = d["hreflang"]
    if hl:
        codes = [c for c, _ in hl]
        if "x-default" not in codes:
            flag("hreflang set without x-default", "low", u)
        if not any(norm(urlparse(h or "").path) == u for _, h in hl):
            flag("hreflang set has no self-reference", "medium", u)
        for c, h in hl:
            if norm(urlparse(h or "").path) not in existing:
                flag("hreflang points to a page that does not exist", "high", u, f"{c} -> {h}")

    for img in d["img"]:
        src = img.get("src") or ""
        if "alt" not in img:
            flag("Image missing alt attribute", "medium", u, src)
        if not (img.get("width") and img.get("height")):
            flag("Image without width/height (layout shift)", "low", u, src)
        if src.startswith("/"):
            path = unquote(src.split("?")[0])
            if path not in assets and not path.startswith("/_"):
                flag("Broken image", "high", u, src)
            elif path in assets:
                sz = os.stat(longp(OUT / path.lstrip("/"))).st_size
                if sz > 300_000:
                    flag("Image larger than 300 KB", "medium", u, f"{src} ({sz // 1024} KB)")
            name = path.rsplit("/", 1)[-1].rsplit(".", 1)[0]
            if re.search(r"[ $A-Z…,]", name):
                flag("Image filename not SEO friendly (spaces, capitals, symbols)", "low", u, src)

    for h in set(d["a"]):
        if h.startswith(("mailto:", "tel:", "#", "javascript:")):
            continue
        pu = urlparse(h)
        if pu.netloc and "weddingplanningchecklists.org" not in pu.netloc:
            continue
        if pu.scheme == "http":
            flag("Internal link uses http://", "medium", u, h)
        path = unquote(pu.path) or "/"
        if path in REDIRECTS:
            flag("Internal link goes through a redirect", "low", u, h)
            continue
        if path != "/" and path.endswith("/"):
            flag("Internal link has trailing slash", "low", u, h)
        if norm(path) not in existing and path not in assets:
            flag("Broken internal link (404)", "high", u, h)
    if pg["size"] > 500_000:
        flag("HTML larger than 500 KB", "medium", u, f"{pg['size'] // 1024} KB")

for t, us in titles.items():
    if t and len(us) > 1:
        flag("Duplicate title across pages", "medium", us[0], f"{len(us)} pages: {t[:70]} | {', '.join(us[:4])}")
for t, us in descs.items():
    if t and len(us) > 1:
        flag("Duplicate meta description across pages", "medium", us[0], f"{len(us)} pages | {', '.join(us[:4])}")

for u in pages:
    parts = u.strip("/").split("/")
    if parts and parts[0] in LANGS:
        en = "/" + "/".join(parts[1:]) if len(parts) > 1 else "/"
        if en in pages and pages[en]["d"]["title"] == pages[u]["d"]["title"]:
            flag("Translated page still has the English title", "medium", u, f"same as {en}")

sm_urls = []
for sm in OUT.glob("sitemap*.xml"):
    sm_urls += re.findall(r"<loc>\s*([^<]+?)\s*</loc>", sm.read_text(encoding="utf-8"))
sm_pages = [x for x in sm_urls if not x.endswith(".xml")]
sm_paths = {norm(urlparse(x).path) for x in sm_pages}
for x in sm_pages:
    pth = norm(urlparse(x).path)
    if pth not in existing:
        flag("Sitemap URL does not exist", "high", pth, x)
    elif pages[pth]["noindex"]:
        flag("Sitemap lists a noindex page", "high", pth)
    elif not pages[pth]["canon_self"]:
        flag("Sitemap lists a non-canonical URL", "medium", pth)
    if x.endswith("/") and pth != "/":
        flag("Sitemap URL has trailing slash", "low", pth, x)
for u, pg in pages.items():
    if pg["canon_self"] and not pg["noindex"] and "404" not in u and u not in sm_paths:
        flag("Indexable page missing from sitemap", "medium", u)
if not (OUT / "robots.txt").exists():
    flag("robots.txt missing", "high", "/robots.txt")

inl = Counter()
for u, pg in pages.items():
    for h in set(pg["d"]["a"]):
        pth = norm(urlparse(h).path)
        if pth != u and pth in pages:
            inl[pth] += 1
for u in pages:
    if inl[u] == 0 and u != "/" and "404" not in u:
        flag("Orphan page (no internal links point to it)", "medium", u)

SEV = {"high": 0, "medium": 1, "low": 2, "info": 3}
summary = sorted(({"issue": k, "sev": v[0]["sev"], "count": len(v), "examples": v[:12]} for k, v in issues.items()),
                 key=lambda r: (SEV[r["sev"]], -r["count"]))
langs = Counter(u.strip("/").split("/")[0] if u.strip("/").split("/")[0] in LANGS else "en" for u in pages)
report = dict(pages=len(pages), sitemap_urls=len(sm_paths), redirects=len(REDIRECTS), langs=langs, issues=summary)
(Path(__file__).parent / "report.json").write_text(json.dumps(report, indent=1), encoding="utf-8")
print(f"pages={len(pages)} sitemap={len(sm_paths)} langs={dict(langs)}")
for r in summary:
    e = r["examples"][0]
    print(f"[{r['sev']:6}] {r['count']:5}  {r['issue']}  e.g. {e['url']} {e['detail'][:100]}")
