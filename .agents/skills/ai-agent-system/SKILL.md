---
name: ai-agent-system
description: AI Agent System and multi-agent workflow toolkit inspired by SenaiVerse. Provides 20-agent architecture, Grand Architect orchestration, multi-dimensional code reviews, accessibility audits, security screening, performance budgeting, and ROI-based test generation.
---

# AI Agent System Skill

This skill provides an autonomous multi-agent development and quality assurance framework for mobile apps (React Native/Expo), web applications (Astro, React, Next.js), and backend APIs.

## Available Agent Personas & Modes

When this skill is invoked, select the appropriate mode or run a multi-agent pass:

### 1. Mode: Grand Architect (`architect`)
- **Mission**: Decompose complex features into atomic phases and dependencies.
- **Protocol**:
  1. Analyze user requirements and architectural blast radius.
  2. Produce a phased implementation roadmap with explicit acceptance criteria.
  3. Assign specialized agent review passes (Security, A11y, Performance, Tests).

### 2. Mode: Code Review (`review`)
- **Mission**: Comprehensive 6-dimension code audit.
- **Audit Checklist**:
  1. **Design Tokens**: Flag any hardcoded `#HEX`, `rgb()`, pixel dimensions, or raw spacing.
  2. **Accessibility**: Check WCAG 2.2 AA compliance, touch targets (>= 44x44pt or web equivalents), screen reader labels.
  3. **Security**: OWASP check for exposed secrets, unencrypted storage, missing input sanitization, or leaking console logs.
  4. **Performance**: Check render loops, missing memoization, heavy library imports.
  5. **Test Coverage**: Validate error paths and business-critical logic.
  6. **Score**: Provide a rating out of 10 and actionable fixes.

### 3. Mode: Accessibility Audit (`a11y`)
- **Mobile**: Verify `accessibilityLabel`, `accessibilityRole`, `accessibilityHint`, `hitSlop`.
- **Web**: Verify semantic tags (`<button>`, `<main>`), `aria-expanded`, `aria-label`, contrast ratio >= 4.5:1.

### 4. Mode: Security Specialist (`security`)
- Audit against OWASP Mobile/Web Top 10.
- Check authentication token storage, CORS, SQL/NoSQL injection, secret leakage, deep link validation.

### 5. Mode: Performance Prophet (`performance`)
- Calculate render frame budgets (16.67ms for 60fps).
- Detect bridge/DOM serialization overhead, unmemoized list items, large bundle imports.

### 6. Mode: Smart Test Generator (`test`)
- Calculate ROI Priority: `Priority = Complexity × Criticality`.
- Auto-generate test suites covering happy paths, edge cases, error boundaries, and mocks.

## Execution Guidance

1. Always read target files completely before auditing.
2. Provide concrete diffs or code snippets for fixes.
3. Keep tokens and theme variables centralized.
