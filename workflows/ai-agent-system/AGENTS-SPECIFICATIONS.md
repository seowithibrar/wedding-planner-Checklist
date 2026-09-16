# 20 Agent Library Specifications

This document contains complete behavioral specifications for all 20 agents in the architecture.

---

## TIER S: Meta Orchestration

### 1. Grand Architect (`grand-architect`)
- **Category**: Tier S (Meta)
- **Role**: Conductor of the agent orchestra.
- **Model**: Opus / High Reasoning
- **Tools**: Task, Read, Grep, Glob, Edit
- **Trigger**: New major features, large-scale refactorings, multi-agent workflows.
- **Reasoning Protocol**:
  ```xml
  <thinking>
  1. Requirement Analysis (Scope, acceptance criteria, edge cases)
  2. Architectural Impact (Data, UI, Navigation, State layers)
  3. Task Decomposition (Phases, atomic tasks, dependencies)
  4. Agent Assignment (Delegation sequence, parallel paths)
  5. Risk Assessment (Failure modes, validation gates, rollback strategy)
  </thinking>
  ```
- **Deliverables**: Phased implementation roadmap, agent task list, risk mitigations.

---

## TIER 1: Daily Workflow Agents

### 2. Design Token Guardian (`design-token-guardian`)
- **Category**: Tier 1 (Daily)
- **Role**: Design system enforcement.
- **Tools**: Read, Grep, Glob, Edit
- **Detections**:
  - Hardcoded HEX / RGB / HSL colors in styles or templates.
  - Hardcoded padding, margin, or gap numbers (e.g. `padding: 16`).
  - Hardcoded typography sizes (e.g. `fontSize: 14`).
- **Remediation**: Maps literal values directly to centralized theme tokens (`theme.colors.*`, `theme.spacing.*`, CSS variables).

### 3. A11y Compliance Enforcer (`a11y-enforcer`)
- **Category**: Tier 1 (Daily)
- **Role**: WCAG 2.2 AA validation.
- **Tools**: Read, Grep, Edit, Bash
- **Detections**:
  - Missing accessibility labels / screen reader attributes on interactive elements.
  - Touch target size < 44x44 points (remediated via `hitSlop` or explicit min-sizing).
  - Low contrast text (< 4.5:1 for standard text, < 3:1 for large text).
  - Missing semantic roles (`button`, `link`, `header`, `image`).

### 4. Smart Test Generator (`test-generator`)
- **Category**: Tier 1 (Daily)
- **Role**: ROI-prioritized test suite creator.
- **Tools**: Read, Write, Grep, Bash
- **Prioritization Formula**:
  $$\text{Priority} = \text{Complexity} \times \text{Criticality}$$
- **Tiering**:
  - *Critical* (Auth, Payments, Data Mutation): E2E + Integration + Unit + Edge Cases.
  - *High* (User flows, settings): Unit + Integration.
  - *Medium* (Secondary features): Unit tests.
  - *Low* (Static presentations): Snapshot or skip.

### 5. Performance Budget Enforcer (`performance-enforcer`)
- **Category**: Tier 1 (Daily)
- **Role**: Performance budget tracker.
- **Tools**: Read, Grep, Bash
- **Budgets**:
  - Mobile Bundle: < 25MB (Android), < 30MB (iOS).
  - Web Initial JS: < 200KB critical bundle.
  - Re-render frequency: Zero re-renders on unrelated parent updates (`React.memo`, selectors).
  - Tree-shaking: Avoid barrel imports (`import _ from 'lodash'` -> `import { debounce } from 'lodash'`).

### 6. Version Compatibility Shield (`version-shield`)
- **Category**: Tier 1 (Daily)
- **Role**: Dependency upgrade validator.
- **Tools**: Read, Bash, WebFetch
- **Mission**: Validates `package.json` updates against SDK matrices to avoid runtime crashes or build failures.

---

## TIER 2: Power Predictive & Security Agents

### 7. Performance Prophet (`performance-prophet`)
- **Category**: Tier 2 (Power)
- **Role**: Predictive performance simulator.
- **Tools**: Read, Grep, Glob
- **Mission**: Calculates expected frame times ($16.67\text{ ms}$ budget for 60fps) and flags bottlenecks (excessive bridge calls, large lists without virtualization, layout thrashing) before code is run.

### 8. Security Penetration Specialist (`security-specialist`)
- **Category**: Tier 2 (Power)
- **Role**: OWASP vulnerability scanner.
- **Tools**: Read, Grep, Bash
- **Detections**:
  - Plaintext tokens in `AsyncStorage` or `localStorage` (remediates to `SecureStore` or encrypted cookies).
  - Unencrypted HTTP endpoints.
  - Hardcoded API keys and secrets in code or git history.
  - Unsanitized URL scheme deep-link parameters.
  - Sensitive logging in production console outputs.

### 9. User Journey Cartographer (`journey-cartographer`)
- **Category**: Tier 2 (Power)
- **Role**: Edge case and user journey validator.
- **Mission**: Verifies complete states for every screen: Loading, Error, Empty, Offline, Success, and Partial Data.

### 10. Zero-Breaking Refactor Surgeon (`refactor-surgeon`)
- **Category**: Tier 2 (Power)
- **Role**: Safe architecture refactoring.
- **Mission**: Executes multi-file refactors using deprecation warnings, facade patterns, and dual-run paths to guarantee zero regressions.

### 11. Cross-Platform Harmony Enforcer (`cross-platform-enforcer`)
- **Category**: Tier 2 (Power)
- **Role**: Parity validator across platforms and browsers.
- **Mission**: Ensures identical features, accessibility semantics, and layouts across iOS, Android, and web engines.

---

## TIER 3: Specialized Domain Agents (Blueprints)

12. **API Contract Guardian (`api-guardian`)**: Synchronizes frontend interfaces with backend OpenAPI/GraphQL/Zod schemas.
13. **Memory Leak Detective (`memory-detective`)**: Scans for dangling subscriptions, unremoved event listeners, and uncollected timers.
14. **Design System Consistency Enforcer (`design-enforcer`)**: Flags duplicate custom components that recreate existing UI library components.
15. **Technical Debt Quantifier (`debt-quantifier`)**: Computes cyclomatic complexity scores and identifies high-debt modules.
16. **Test Strategy Architect (`test-architect`)**: Designs testing pyramids, mock service workers, and CI pipelines.
17. **Bundle Size Assassin (`bundle-assassin`)**: Deep-analyzes Webpack/Metro/Vite bundle maps to prune redundant transitive dependencies.
18. **Migration Strategist (`migration-strategist`)**: Produces structured upgrade roadmaps for major framework version transitions.
19. **State Management Auditor (`state-auditor`)**: Audits state stores to eliminate over-fetching, duplicated state, and context churn.
20. **Feature Impact Analyzer (`impact-analyzer`)**: Predicts the regression blast radius across the repository when touching core utilities.
