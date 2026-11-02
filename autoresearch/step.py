"""Keep-or-revert step for the autoresearch loop. The agent must NEVER edit this file.

Run after each edit to an article:
  python autoresearch/step.py <slug> "<one line: what you changed>"

If the new score is valid and higher than the baseline, the change is committed
and becomes the new baseline. Otherwise the article is restored with git.
Every attempt is appended to autoresearch/results.tsv.
"""
import datetime, json, subprocess, sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent
sys.path.insert(0, str(HERE))
import score as S


def git(*a):
    return subprocess.run(["git", *a], cwd=ROOT, capture_output=True, text=True)


def main():
    slug, note = sys.argv[1], (sys.argv[2] if len(sys.argv) > 2 else "")
    rel = f"src/content/blog/{slug}.mdx"
    bfile = HERE / "baselines" / f"{slug}.json"
    if not bfile.exists():
        raise SystemExit(f"No baseline. Run: python autoresearch/score.py {slug} --baseline")
    base = json.loads(bfile.read_text())
    try:
        sc, _, s = S.score(slug)
        snap = dict(score=sc, words=s["words"], h2=s["h2"], h3=s["h3"], faqs=s["faqs"], imgs=len(s["imgs"]))
        dropped = [k for k in ("words", "h2", "h3", "faqs", "imgs") if snap[k] < base[k]]
    except Exception as e:  # broken frontmatter etc.
        sc, snap, dropped = 0.0, None, [f"crash: {e}"]

    keep = not dropped and sc > base["score"]
    if keep:
        git("add", rel)
        git("commit", "-q", "-m", f"autoresearch({slug}): {base['score']} -> {sc} | {note}")
        bfile.write_text(json.dumps(snap, indent=2))
        status = "keep"
    else:
        git("checkout", "--", rel)
        status = "revert" + (f" ({', '.join(dropped)})" if dropped else "")

    log = HERE / "results.tsv"
    if not log.exists():
        log.write_text("time\tslug\tbaseline\tnew\tstatus\tnote\n", encoding="utf-8")
    with log.open("a", encoding="utf-8") as f:
        f.write(f"{datetime.datetime.now():%Y-%m-%d %H:%M}\t{slug}\t{base['score']}\t{sc}\t{status}\t{note}\n")
    print(f"{status}: {base['score']} -> {sc}")


if __name__ == "__main__":
    main()
