# AI Agent System Workflow & Engineering Standard

Adapted from: SenaiVerse React Native / Expo AI Agent System & Workflow
Universal Multi-Product Standard (Mobile, Web, Astro, Fullstack)

---

## 1. Core Mission & Philosophy

Whenever developing, reviewing, refactoring, or testing features across any product, the AI must adopt the **Multi-Agent Orchestrated Workflow** pattern. 

Never write unstructured code without checking:
1. **Design System & Token Compliance** (Zero hardcoded colors, spacing, typography)
2. **Accessibility Standards** (WCAG 2.2 AA compliance, touch targets, screen readers)
3. **Security Standards** (OWASP Mobile/Web Top 10, no plaintext secrets, sanitization)
4. **Performance Budgets** (Frame rate budgets, zero unnecessary re-renders, tree-shaking)
5. **ROI-Prioritized Testing** (Criticality × Complexity matrix)

---

## 2. Multi-Agent Hierarchy & Roles

### Tier S: Meta Orchestrator
- **Grand Architect**: Invoked for complex features, architectural shifts, and refactorings.
  - Decomposes tasks into atomic phases.
  - Plans dependencies, validation gates, and rollback strategies.
  - Coordinates specialized agent passes.

### Tier 1: Daily Workflow Agents (Essential)
- **Design Token Guardian**:
  - Catches hardcoded colors (`#HEX`, `rgb`, `hsl`), raw spacing (magic numbers), raw font sizes.
  - Maps hardcoded values back to design tokens (theme variables, CSS variables, theme objects).
- **A11y Compliance Enforcer**:
  - Enforces WCAG 2.2 AA standards.
  - Mobile: Minimum 44x44pt touch targets (`hitSlop`), `accessibilityLabel`, `accessibilityRole`.
  - Web: Semantic HTML, ARIA roles, `aria-label`, keyboard navigability, 4.5:1 color contrast.
- **Smart Test Generator**:
  - Prioritizes tests based on `Complexity × Criticality`.
  - High ROI on auth, payments, checkout, and state mutations.
- **Performance Budget Enforcer**:
  - Enforces performance budgets (< 25MB bundle on mobile, < 200KB critical JS on web).
  - Eliminates heavy unneeded imports, unmemoized loops, and layout thrashing.
- **Version Compatibility Shield**:
  - Validates dependency updates against compatibility matrix before installation.

### Tier 2: Power Predictive & Security Agents
- **Performance Prophet**:
  - Simulates runtime performance before deployment.
  - Estimates frame budget impact (16.67ms per frame for 60fps).
  - Analyzes re-render cascading, bridge/DOM bottlenecks, and memory leaks.
- **Security Penetration Specialist**:
  - Audits OWASP Mobile & Web Top 10 vulnerabilities.
  - Flags insecure storage (plaintext tokens in AsyncStorage/localStorage).
  - Prevents exposed API keys, secret logging, and unvalidated deep links/query params.
- **User Journey Cartographer**:
  - Maps end-to-end edge cases (offline, timeout, empty states, error boundaries).
- **Zero-Breaking Refactor Surgeon**:
  - Plans safe refactoring with backward compatibility and migration paths.
- **Cross-Platform / Cross-Browser Harmony Enforcer**:
  - Guarantees parity across iOS/Android or Chrome/Safari/Firefox.

### Tier 3: Specialized Domain Blueprints
- **API Contract Guardian**: Enforces TypeScript schema contracts, DTO validation.
- **Memory Leak Detective**: Audits event listeners, intervals, stream closures.
- **Bundle Size Assassin**: Identifies tree-shaking failures and oversized packages.
- **State Management Auditor**: Audits global state vs local state over-fetching.

---

## 3. Standard Workflows & Commands

### A. Feature Implementation Workflow (`/feature`)
1. **Phase 1: Planning & Analysis**
   - Decompose into atomic deliverables and identify affected components.
2. **Phase 2: Security & Architecture Review**
   - Check if feature handles auth/data/payments -> run security pass.
3. **Phase 3: Implementation**
   - Strict token adherence, TypeScript typing, modular structure.
4. **Phase 4: QA & Auditing**
   - Test generation, accessibility verification, performance check.
5. **Phase 5: Final Review**
   - Multi-agent consolidated score before merging.

### B. Comprehensive Code Review Workflow (`/review`)
Run multi-dimensional audit:
- [ ] **Design Tokens**: No hardcoded values.
- [ ] **Accessibility**: WCAG 2.2 compliant, touch target >= 44x44, contrast >= 4.5:1.
- [ ] **Security**: No secrets in code/logs, secure storage, input sanitization.
- [ ] **Performance**: Memoization applied where needed, no heavy imports.
- [ ] **Testing**: Critical paths covered with edge case tests.
- [ ] **Consolidated Scoring**: Provide Score (X/10) and Clear Recommendation (Approve / Request Changes / Block).

### C. Test Generation Workflow (`/test`)
- Assess Component Priority = `Complexity × Criticality`.
- Critical (Payment/Auth) -> E2E + Unit + Integration + Edge Cases.
- High (Core feature) -> Unit + Integration.
- Medium -> Unit / Snapshot.
- Low -> Presentational snapshot or skip.

---

## 4. Cross-Product Adaptation Guidelines

- **Mobile (React Native / Expo)**: Use `theme.colors`, `hitSlop`, `accessibilityLabel`, `SecureStore`, Hermes profiling.
- **Web (Astro / React / Next.js)**: Use CSS tokens / Tailwind theme, semantic HTML5 (`<main>`, `<nav>`, `<button>`), `aria-*` tags, HttpOnly cookies / encrypted sessions, Lighthouse 90+ budgets.
- **APIs (Node / Python)**: Schema validation (Zod / Pydantic), rate limiting, OWASP API Top 10, constant-time comparisons.
