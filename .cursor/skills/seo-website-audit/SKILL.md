---
name: seo-website-audit
description: Audits websites from a single URL and produces a full SEO report covering technical SEO, on-page content, schema, internal linking, UX, and prioritized fixes. Use when the user shares a website URL or asks for a website SEO audit, site review, or full SEO workflow from one URL.
disable-model-invocation: true
---

# SEO Website Audit

## Purpose

Turn one website URL into a complete SEO audit with clear findings, priorities, and next actions.

## When to use

Use this skill when the user:

- Shares a website URL
- Asks for an SEO audit, site audit, or website review
- Wants a full workflow that starts from only a URL
- Wants technical SEO, content SEO, or UX issues identified from a live site

## Workflow

1. Use the provided URL as the only required input.
2. Inspect the live page, page source, metadata, headings, links, schema, and visible content.
3. Identify the page type and search intent.
4. Audit the site in this order:
   - Crawlability and indexability
   - Metadata and headings
   - Content quality and intent match
   - Internal links and navigation
   - Schema and structured data
   - UX and conversion clarity
   - Mobile usability
   - Performance and core web vitals signals
   - Trust signals and E-E-A-T
5. Summarize issues by severity.
6. Provide prioritized fixes and quick wins.
7. End with a concise action plan the user can execute next.

## Audit checklist

### Technical SEO

- Check indexability, canonicals, robots directives, and status codes
- Check title tags, meta descriptions, H1s, and heading order
- Check sitemap and internal crawl paths when available
- Check schema presence and validity

### On-page SEO

- Confirm the page targets one clear primary topic
- Check keyword placement in title, H1, intro, and subheads
- Review thin content, duplication, and missing intent coverage
- Check image alt text and filename quality when relevant

### Content and intent

- Match page content to informational, commercial, transactional, or navigational intent
- Identify missing sections that users would expect
- Flag fluff, keyword stuffing, and vague copy

### Internal linking

- Check contextual links to relevant pages
- Flag orphan pages or weak anchor text
- Suggest better link targets and anchors

### UX and trust

- Check readability, layout clarity, CTA visibility, and mobile experience
- Check author, brand, contact, and trust signals
- Note confusing navigation or weak conversion paths

## Output format

Use this report structure:

```markdown
# SEO Audit: [Site Name or URL]

## Executive summary
[2 to 4 sentences on the overall SEO health and biggest blockers]

## What I checked
- Technical SEO
- On-page SEO
- Content and intent
- Internal linking
- Schema
- UX and trust

## Key findings
### Critical
- Finding

### High priority
- Finding

### Medium priority
- Finding

### Low priority
- Finding

## Quick wins
1. Fix
2. Fix
3. Fix

## Recommended next steps
1. Action
2. Action
3. Action

## Notes
- Include assumptions if the site blocks access or data is limited
```

## Quality rules

- Be specific and evidence-based.
- Rank issues by impact on rankings, crawlability, and conversions.
- Do not give generic SEO advice unless it directly applies to the URL.
- If access is limited, say what could not be verified and why.
- Keep recommendations actionable and ordered.

