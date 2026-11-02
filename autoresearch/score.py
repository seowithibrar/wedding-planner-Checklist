"""Fixed evaluator for the autoresearch loop. The agent must NEVER edit this file.

Scores one blog article (src/content/blog/<slug>.mdx) from 0 to 100 against the
rules in AGENTS.md. Higher is better. Also enforces the "never remove content"
rule: if the article has fewer words, headings, FAQs or images than its baseline,
the run is marked INVALID and must be reverted.

Usage:
  python autoresearch/score.py <slug>              # print score
  python autoresearch/score.py <slug> --baseline   # save current state as baseline
"""
import json, re, sys
from pathlib import Path
import yaml

ROOT = Path(__file__).resolve().parent.parent
BLOG = ROOT / "src" / "content" / "blog"
PUBLIC = ROOT / "public"
PAGES = ROOT / "src" / "pages"
DIST = ROOT / "dist"
BASE_DIR = Path(__file__).resolve().parent / "baselines"

BANNED = ["lorem ipsum", "evera", "test brand", "sample text", "placeholder",
          "example.com", "todo", "tbd", "[insert", "dummy"]
FILLER = ["in today's world", "in conclusion", "it is important to note", "delve",
          "unlock the", "game-changer", "look no further", "without further ado",
          "elevate your", "seamless", "tapestry", "embark on"]
ULTIMATE = ("ultimate",)


def load(slug):
    text = (BLOG / f"{slug}.mdx").read_text(encoding="utf-8")
    m = re.match(r"^---\r?\n(.*?)\r?\n---\r?\n(.*)$", text, re.S)
    if not m:
        raise SystemExit("No frontmatter found")
    return yaml.safe_load(m.group(1)) or {}, m.group(2)


def stats(fm, body):
    plain = re.sub(r"<[^>]+>|import .*|[#*_>`\[\]()!|-]", " ", body)
    h2 = re.findall(r'^\s*(?:## (.+)|<h2[^>]*>(.*?)</h2>)', body, re.M)
    h3 = re.findall(r'^\s*(?:### (.+)|<h3[^>]*>(.*?)</h3>)', body, re.M)
    imgs = re.findall(r'!\[([^\]]*)\]\(([^)]+)\)', body)
    imgs += [(re.search(r'alt="([^"]*)"', t).group(1) if 'alt="' in t else "",
              re.search(r'src="([^"]+)"', t).group(1) if 'src="' in t else "")
             for t in re.findall(r"<img[^>]*>", body)]
    links = re.findall(r'(?<!!)\[([^\]]+)\]\((/[^)\s]*)\)', body)
    links += [(a, h) for h, a in re.findall(r'<a[^>]*href="(/[^"]*)"[^>]*>(.*?)</a>', body)]
    return dict(words=len(plain.split()), h2=len(h2), h3=len(h3), imgs=imgs,
                links=links, faqs=len(fm.get("faqs") or []), plain=plain.lower())


def route_ok(href):
    path = href.split("#")[0].split("?")[0].rstrip("/")
    if not path:
        return True
    if (PUBLIC / path.lstrip("/")).exists():
        return True
    parts = path.strip("/").split("/")
    if parts[0] == "blog" and len(parts) == 2:
        return (BLOG / f"{parts[1]}.mdx").exists()
    if (PAGES / f"{path.strip('/')}.astro").exists() or (PAGES / path.strip("/") / "index.astro").exists():
        return True
    return (DIST / path.strip("/") / "index.html").exists()


def score(slug):
    fm, body = load(slug)
    s = stats(fm, body)
    checks = []  # (name, points_earned, points_max, note)

    def add(name, ok, pts, note=""):
        earned = pts * (ok if isinstance(ok, float) else (1.0 if ok else 0.0))
        checks.append((name, round(earned, 2), pts, note))

    title = fm.get("seoTitle") or fm.get("title", "")
    desc = fm.get("description", "")
    add("seo_title_length 30-65", 30 <= len(title) <= 65, 5, f"{len(title)} chars")
    add("meta_description 120-160", 120 <= len(desc) <= 160, 5, f"{len(desc)} chars")
    add("slug matches file", fm.get("slug") == slug, 3)
    add("author is production brand", fm.get("author", "Wedding Planning Checklists Team") == "Wedding Planning Checklists Team", 3)

    hero = fm.get("heroImage", "")
    add("hero image exists", bool(hero) and (PUBLIC / hero.lstrip("/")).exists(), 5, hero)
    add("hero image alt", len(fm.get("heroImageAlt") or "") >= 10, 3)

    qa = fm.get("quickAnswer") or ""
    add("quick answer 25-70 words", 25 <= len(qa.split()) <= 70, 5, f"{len(qa.split())} words")
    kt = fm.get("keyTakeaways") or []
    add("key takeaways 4-7", 4 <= len(kt) <= 7, 4, f"{len(kt)}")

    toc = fm.get("tableOfContents") or []
    ids = set(re.findall(r'id="([^"]+)"', body))
    toc_hits = sum(1 for t in toc if t.get("id") in ids)
    add("table of contents anchors resolve", (toc_hits / len(toc)) if toc else 0.0, 6, f"{toc_hits}/{len(toc)}")

    is_ultimate = any(k in title.lower() for k in ULTIMATE)
    need = 8 if is_ultimate else 5
    add(f"faqs >= {need}", min(s["faqs"] / need, 1.0), 8, f"{s['faqs']}")
    faq_ans = [len((f.get("a") or "").split()) for f in fm.get("faqs") or []]
    add("faq answers 20-80 words", (sum(20 <= n <= 80 for n in faq_ans) / len(faq_ans)) if faq_ans else 0.0, 4)

    add("h2 sections >= 5", min(s["h2"] / 5, 1.0), 5, f"{s['h2']}")
    add("h3 subsections >= 4", min(s["h3"] / 4, 1.0), 3, f"{s['h3']}")
    add("word count >= 1500", min(s["words"] / 1500, 1.0), 6, f"{s['words']}")

    uniq = {h for _, h in s["links"]}
    add("internal links 3-15", 1.0 if 3 <= len(uniq) <= 15 else (0.5 if uniq else 0.0), 6, f"{len(uniq)}")
    bad = [h for h in uniq if not route_ok(h)]
    add("no broken internal links", 1.0 if uniq and not bad else max(0.0, 1 - len(bad) / max(len(uniq), 1)), 8, ", ".join(bad[:5]))
    generic = sum(a.strip().lower() in ("click here", "here", "read more", "this") for a, _ in s["links"])
    add("descriptive anchor text", generic == 0, 3, f"{generic} generic")

    imgs = s["imgs"]
    missing = [src for _, src in imgs if src.startswith("/") and not (PUBLIC / src.lstrip("/")).exists()]
    add("body images >= 2", min(len(imgs) / 2, 1.0), 3, f"{len(imgs)}")
    add("all images exist", not missing, 4, ", ".join(missing[:3]))
    add("all images have alt", all(len(a.strip()) >= 5 for a, _ in imgs) if imgs else False, 3)

    bad_words = [w for w in BANNED if re.search(r"(?<![a-z])" + re.escape(w) + r"(?![a-z])", s["plain"])]
    add("no placeholder/template text", not bad_words, 5, ", ".join(bad_words))
    fill = sum(s["plain"].count(w) for w in FILLER)
    add("low filler phrases", 1.0 if fill == 0 else max(0.0, 1 - fill / 6), 3, f"{fill} found")

    total = round(sum(c[1] for c in checks), 2)
    maxi = sum(c[2] for c in checks)
    return round(100 * total / maxi, 2), checks, s


def main():
    if len(sys.argv) < 2:
        raise SystemExit(__doc__)
    slug = sys.argv[1]
    sc, checks, s = score(slug)
    BASE_DIR.mkdir(exist_ok=True)
    bfile = BASE_DIR / f"{slug}.json"
    snap = dict(score=sc, words=s["words"], h2=s["h2"], h3=s["h3"], faqs=s["faqs"], imgs=len(s["imgs"]))
    if "--baseline" in sys.argv:
        bfile.write_text(json.dumps(snap, indent=2))
        print(f"baseline saved: {snap}")
        return
    for name, e, m, note in checks:
        flag = "OK " if e == m else "-- "
        print(f"{flag}{e:>5}/{m:<3} {name}  {note}")
    valid = True
    if bfile.exists():
        base = json.loads(bfile.read_text())
        for k in ("words", "h2", "h3", "faqs", "imgs"):
            if snap[k] < base[k]:
                print(f"INVALID: {k} dropped {base[k]} -> {snap[k]} (AGENTS.md: never remove content)")
                valid = False
    print(f"\nscore: {sc if valid else 0}")
    print(f"status: {'valid' if valid else 'INVALID'}")


if __name__ == "__main__":
    main()
