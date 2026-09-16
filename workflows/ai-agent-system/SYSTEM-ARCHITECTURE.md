# System Architecture: AI Agent Development Framework

This document outlines the architectural principles, configuration schema, and execution mechanisms behind the AI Agent System.

---

## 1. Multi-Tier Agent Hierarchy

### Tier S: Meta Orchestration (1 Agent)
- **Role**: Conductor / Project Director.
- **Model Recommendation**: Opus / High-reasoning model.
- **Agents**:
  - `grand-architect`: Breaks down multi-step features into atomic tasks, identifies architectural dependencies, assigns tasks to specialized agents, plans rollback strategies, and enforces quality gates.

### Tier 1: Daily Essential Workflow (5 Agents)
- **Role**: Continuous quality assurance during every coding session.
- **Model Recommendation**: Sonnet / Fast balanced model.
- **Agents**:
  - `design-token-guardian`: Enforces design system tokens, flagging hardcoded hex colors, arbitrary spacing, and unstyled typography.
  - `a11y-enforcer`: Ensures WCAG 2.2 AA accessibility, minimum 44x44pt touch targets, screen reader labels, and color contrast.
  - `test-generator`: Automatically writes unit, integration, and E2E tests prioritized by ROI (`Complexity × Criticality`).
  - `performance-enforcer`: Tracks bundle size, memory footprint, unnecessary re-renders, and tree-shaking efficacy.
  - `version-shield`: Validates dependency upgrades against framework and platform compatibility matrices.

### Tier 2: Power Predictive & Security Agents (5 Agents)
- **Role**: Deep static analysis and simulated runtime forecasting.
- **Model Recommendation**: Opus / Advanced reasoning model.
- **Agents**:
  - `performance-prophet`: Predicts frame drops, bridge bottlenecks, and rendering lags before execution.
  - `security-specialist`: Audits against OWASP Mobile/Web Top 10, insecure storage, token leaks, and deep-link injection.
  - `journey-cartographer`: Maps complete user flows, identifying missing error states, offline states, and edge cases.
  - `refactor-surgeon`: Plans zero-breaking large-scale refactors with compatibility layers and rollback steps.
  - `cross-platform-enforcer`: Guarantees UX/UI and functional parity between iOS and Android (or cross-browser).

### Tier 3: Specialized Domain Agents (9 Blueprints)
- **Role**: Targeted deep-dive audits.
- **Agents**:
  - `api-guardian`: Type-safe contracts, Zod/TypeScript schema sync, and serialization checks.
  - `memory-detective`: Identifies uncollected event listeners, open streams, timer leaks, and retain cycles.
  - `design-enforcer`: Comprehensive UI consistency and component library re-use audit.
  - `debt-quantifier`: Measures cyclomatic complexity, code duplication, and technical debt metrics.
  - `test-architect`: Formulates test plans, pyramid ratios, and test environment strategies.
  - `bundle-assassin`: Granular bundle visualizer analysis and deep import optimization.
  - `migration-strategist`: Step-by-step framework version migration planning.
  - `state-auditor`: Analyzes state distribution, re-render cascades, and context fragmentation.
  - `impact-analyzer`: Evaluates the blast radius of changes across dependants.

---

## 2. Configuration & Priority Architecture

### Scoping Order
When AI agents resolve tools, rules, and settings, they follow strict hierarchical precedence:
1. **Workspace / Project Scope** (`.agents/`, `.claude/`, project configuration) - Highest priority.
2. **Global / User Scope** (`~/.agents/`, `~/.claude/`) - Fallback priority.

### Settings Configuration (`settings.json`)
```json
{
  "permissions": {
    "allow": ["Read", "Grep", "Glob", "Bash(npm:*)", "Bash(git:*)"],
    "deny": ["Read(.env*)", "Read(*.key)", "Read(*.pem)"]
  },
  "hooks": {
    "PreToolUse": [
      {
        "name": "Accessibility & Token Check",
        "matcher": "Write|Edit",
        "filter": "*.{tsx,jsx,astro,html}"
      }
    ],
    "PostToolUse": [
      {
        "name": "Security & Secret Scan",
        "matcher": "Write|Edit",
        "filter": "*{auth,payment,api,secure}*"
      }
    ]
  },
  "budgets": {
    "bundleSizeMobileMB": 25,
    "bundleSizeWebKB": 200,
    "targetFPS": 60,
    "wcagLevel": "AA"
  }
}
```

---

## 3. Automation Hook Lifecycle

```
[User Request] 
      │
      ▼
[Grand Architect Decomposition]
      │
      ├── Pre-Write Hook: Token & A11y Validation
      │
      ├── Tool Execution: Code Generation
      │
      ├── Post-Write Hook: Security & Performance Scan
      │
      └── Final Quality Gate: Consolidated Review Score
```
