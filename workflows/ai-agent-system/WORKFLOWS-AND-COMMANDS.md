# Multi-Agent Workflows & Slash Commands

This manual outlines the standardized execution workflows for feature development, code reviews, and test generation.

---

## 1. Feature Implementation Workflow (`/feature`)

The `/feature` command initiates a 5-phase multi-agent development lifecycle.

```
Phase 1: Planning & Analysis (@grand-architect)
     │
     ▼
Phase 2: Security & Architecture Review (@security-specialist)
     │
     ▼
Phase 3: Core Implementation (Token & Convention Compliance)
     │
     ▼
Phase 4: Multi-Agent QA (@test-generator, @a11y-enforcer, @performance-prophet)
     │
     ▼
Phase 5: Consolidated Review & Verification (/@review)
```

### Phase Details

#### Phase 1: Planning & Analysis
- Invoke **Grand Architect** to break down the feature into modular deliverables.
- Map state, routing, and data layer changes.
- Identify potential breaking changes and formulate rollback strategies.

#### Phase 2: Security & Architecture Review
- If user input, session state, payment, or network traffic is touched:
  - Run **Security Penetration Specialist** pass against OWASP criteria.
  - Enforce secret isolation (`.env` / backend proxies).

#### Phase 3: Implementation
- Implement feature following project conventions.
- Strictly use design system tokens (colors, spacing, typography).
- Include comprehensive TypeScript typing without loose `any` types.

#### Phase 4: Quality Assurance
- **Test Generation**: Invoke **Smart Test Generator** to create tests with edge cases.
- **Accessibility**: Invoke **A11y Enforcer** to ensure full WCAG 2.2 AA coverage.
- **Performance**: Invoke **Performance Prophet** to verify frame budget (< 16.67ms) and bundle footprint.

#### Phase 5: Final Review
- Execute `/review` command to obtain consolidated approval before merging.

---

## 2. Comprehensive Code Review Workflow (`/review`)

The `/review` workflow conducts an automated 6-pillar code inspection:

| Pillar | Agent | What is Inspected |
|---|---|---|
| **1. Design Tokens** | `design-token-guardian` | Hardcoded colors, magic numbers, spacing, font sizes |
| **2. Accessibility** | `a11y-enforcer` | Screen reader attributes, touch targets, contrast |
| **3. Security** | `security-specialist` | Exposed credentials, unencrypted data, injection vectors |
| **4. Performance** | `performance-prophet` | Unnecessary re-renders, heavy imports, layout thrashing |
| **5. Test Coverage** | `test-generator` | Uncovered edge cases, missing mocks, async errors |
| **6. Code Quality** | Core Agent | TypeScript cleanliness, duplication, error handling |

### Review Scorecard Format
Every `/review` outputs:
- **Critical Issues (Must Fix)**: Blocker defects, security flaws, WCAG violations.
- **Warnings (Should Fix)**: Performance bottlenecks, missing tokens.
- **Suggestions (Nice to Have)**: Code simplification, readability improvements.
- **Overall Score**: `X / 10`
- **Verdict**: `APPROVE` | `REQUEST CHANGES` | `BLOCK`

---

## 3. Smart Test Generation Workflow (`/test`)

Prioritizes test writing using the **Return on Investment (ROI)** formula:
$$\text{Priority Score} = \text{Cyclomatic Complexity} \times \text{Business Criticality}$$

### Execution Steps
1. **Analyze Target**: Calculate priority score and identify untested logic branches.
2. **Strategy Selection**: Choose appropriate mix of E2E, integration, and unit tests.
3. **Generate Tests**:
   - Provide full mock harnesses (APIs, route parameters, storage).
   - Test happy path, boundary conditions, empty states, and network errors.
4. **Execution Verification**: Run test suite to verify all generated tests pass cleanly.
