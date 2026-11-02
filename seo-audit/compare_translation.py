"""Check a translated blog post has the same structure as the English source.
Usage: python seo-audit/compare_translation.py es [slug ...]   (no slug = every translated post)"""
import re, sys
from pathlib import Path
import yaml

ROOT = Path(__file__).resolve().parent.parent
EN = ROOT / "src/content/blog"

def parse(p):
    t = p.read_text(encoding="utf-8")
    m = re.match(r"^---\r?\n(.*?)\r?\n---\r?\n(.*)$", t, re.S)
    return yaml.safe_load(m.group(1)) or {}, m.group(2)

def stats(fm, body):
    return {
        "h2": len(re.findall(r"^\s*(## |<h2)", body, re.M)),
        "h3": len(re.findall(r"^\s*(### |<h3)", body, re.M)),
        "list": len(re.findall(r"^\s*([-*] |\d+\. |<li)", body, re.M)),
        "table_rows": len(re.findall(r"^\s*\|", body, re.M)),
        "images": len(re.findall(r"!\[[^\]]*\]\(|<img", body)),
        "links": len(re.findall(r"(?<!!)\[[^\]]+\]\([^)]+\)|<a ", body)),
        "components": len(re.findall(r"<[A-Z][A-Za-z]+", body)),
        "faqs": len(fm.get("faqs") or []),
        "takeaways": len(fm.get("keyTakeaways") or []),
        "toc": len(fm.get("tableOfContents") or []),
        "ids": len(re.findall(r'id="', body)),
    }

lang = sys.argv[1]
slugs = sys.argv[2:] or [p.stem for p in sorted((ROOT / "src/content/blog-translations" / lang).glob("*.mdx"))]
bad = 0
for s in slugs:
    tr_path = ROOT / "src/content/blog-translations" / lang / f"{s}.mdx"
    if not tr_path.exists():
        print(f"MISSING  {s}"); bad += 1; continue
    a, b = stats(*parse(EN / f"{s}.mdx")), stats(*parse(tr_path))
    diff = {k: (a[k], b[k]) for k in a if a[k] != b[k]}
    fm = parse(tr_path)[0]
    en_slug = parse(EN / f"{s}.mdx")[0].get("slug") or s
    if fm.get("lang") != lang or fm.get("sourceSlug") != en_slug: diff["frontmatter"] = (fm.get("lang"), fm.get("sourceSlug"))
    ratio = len(parse(tr_path)[1]) / max(len(parse(EN / f"{s}.mdx")[1]), 1)
    status = "OK " if not diff else "DIFF"
    bad += bool(diff)
    print(f"{status} {s}  length={ratio:.2f}  {diff if diff else ''}")
sys.exit(1 if bad else 0)
