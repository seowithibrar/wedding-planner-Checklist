# Cross-Product Adaptation Guide

How to apply the 20-Agent System and Multi-Agent Workflows across diverse tech stacks: Mobile, Web, and Backend.

---

## 1. Stack Comparison & Mapping

| Workflow Pillar | React Native / Expo | Astro / React Web / Next.js | Node / Python Backend |
|---|---|---|---|
| **Design Tokens** | `theme.colors.*`, `theme.spacing.*`, `StyleSheet` | CSS variables (`var(--color-*)`), Tailwind theme, CSS Modules | JSON Schema API response specs, DTO serialization |
| **Accessibility (A11y)** | `accessibilityLabel`, `accessibilityRole`, `hitSlop` | Semantic HTML5 (`<main>`, `<nav>`, `<button>`), `aria-*`, focus outlines | Screen-reader friendly metadata, WCAG contrast in rendered views |
| **Performance** | Hermes engine, FlatList virtualization, 60fps frame budget | SSR/SSG hydration, zero-JS by default, Web Vitals (LCP, CLS, INP) | Query latency (<50ms), connection pooling, Redis caching |
| **Security** | `SecureStore`, no API keys in client, deep link whitelisting | CSP headers, `HttpOnly` `SameSite` cookies, XSS sanitization | OWASP API Top 10, rate limiting, JWT rotation, parameterized queries |
| **Testing** | Jest, React Native Testing Library, Detox | Playwright, Vitest, Testing Library | Vitest, Pytest, Supertest, Contract testing |

---

## 2. Adaptation for Astro / Modern Web (This Workspace)

In an Astro / Web project (like `wedding-planner-Checklist`):
1. **Design Token Guardian**:
   - Verify all CSS and components use CSS custom properties or design system classes from `src/styles/` rather than hardcoded inline hex values or arbitrary margins.
2. **A11y Compliance Enforcer**:
   - Audit interactive elements (accordions, checklists, dropdowns, calculators).
   - Ensure all buttons have descriptive labels, modals have focus traps, and checklist checkboxes have clear labels and keyboard navigation.
3. **Performance Budget Enforcer**:
   - Maintain Astro's zero-JS architecture wherever possible.
   - For interactive islands, lazy-load client scripts using `client:visible` or `client:idle`.
4. **Security Specialist**:
   - Validate metadata, open-graph inputs, and prevent client-side script injection in dynamic markdown or template components.
5. **Smart Test Generator**:
   - Provide unit tests for utility calculators, date formatters, and checklist state handlers, plus Playwright smoke tests for key pages.

---

## 3. Adaptation for React Native / Mobile Apps

1. **Design Token Guardian**:
   - Centralize tokens in `src/theme/colors.ts`, `src/theme/spacing.ts`, and `src/theme/typography.ts`.
   - Never accept inline styles like `style={{ color: '#ff0000', margin: 15 }}`.
2. **A11y Compliance Enforcer**:
   - Enforce 44x44 points touch target rule. If an icon is 24x24, enforce `hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}`.
3. **Security Specialist**:
   - Block `AsyncStorage.setItem('token', ...)`; enforce `expo-secure-store`.
   - Never embed un-proxied API secret keys in client bundles.
4. **Performance Prophet**:
   - Analyze list renders for missing `getItemLayout`, unmemoized callbacks, and image caching strategies.

---

## 4. Universal Verification Checklist Before Every Merge

Before merging or publishing any feature in any product:
- [ ] **Token Check**: Zero hardcoded magic values.
- [ ] **A11y Check**: Fully keyboard/screen-reader operable with valid contrast.
- [ ] **Security Check**: Zero exposed credentials; secure data transport and storage.
- [ ] **Performance Check**: Passes performance budgets without memory or rendering leaks.
- [ ] **Test Coverage**: Critical user paths validated with passing automated tests.
