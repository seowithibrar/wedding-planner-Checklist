from __future__ import annotations

import argparse
import os
import sys

from openai import OpenAI


def build_client() -> OpenAI:
    base_url = os.getenv("OPENAI_BASE_URL", "http://localhost:11434/v1")
    api_key = os.getenv("OPENAI_API_KEY", "ollama")
    return OpenAI(base_url=base_url, api_key=api_key, timeout=600.0)


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Run a local OpenAI-compatible model from VS Code."
    )
    parser.add_argument(
        "prompt",
        nargs="?",
        default="Write a short poem about integration.",
        help="Prompt to send to the model.",
    )
    parser.add_argument(
        "--model",
        default=os.getenv("OPENAI_MODEL", "muse-glimmer"),
        help="Model name exposed by your local server.",
    )
    args = parser.parse_args()

    client = build_client()

    try:
        response = client.chat.completions.create(
            model=args.model,
            messages=[{"role": "user", "content": args.prompt}],
            stream=True,
        )
    except Exception as exc:
        print(f"Error: {exc}", file=sys.stderr)
        return 1

    chunks: list[str] = []
    for chunk in response:
        delta = chunk.choices[0].delta.content if chunk.choices else None
        if delta:
            chunks.append(delta)
            print(delta, end="", flush=True)

    if chunks:
        print()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
