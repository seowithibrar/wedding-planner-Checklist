# autoresearch for WeddingPlanningChecklists.org

Adapted from karpathy/autoresearch. Instead of training a model, an AI agent
improves one blog article in a loop and keeps only changes that raise a fixed score.

| File | Who edits it | Purpose |
|------|--------------|---------|
| `program.md` | Human | Instructions for the agent |
| `score.py` | Nobody | Fixed 0-100 score based on AGENTS.md rules |
| `step.py` | Nobody | Commits an improvement or reverts a failed one |
| `src/content/blog/<slug>.mdx` | Agent | The article being improved |
| `results.tsv` | Generated | Log of every attempt |

## Run it

Open Claude Code in the repo root and say:

> Read autoresearch/program.md and start a run on perfect-guest-list-guide.

Leave out the slug to let the agent pick the weakest article.

Check a score yourself:

    python autoresearch/score.py perfect-guest-list-guide

Review the branch afterwards with `git log` and merge only what reads well.
