# AI Agent System & Workflow Framework

> **Permanent Architectural Memory & Engineering System**  
> Based on SenaiVerse React Native / Expo AI Agent System & Extended for Multi-Product Web, Mobile & Fullstack Development.

---

## 📌 Executive Summary

The **AI Agent System** is a modular, multi-tier agent architecture designed to eliminate recurring engineering bottlenecks:
- **Design Inconsistencies**: Eradicates hardcoded hex colors, magic spacing numbers, and ad-hoc typography.
- **Accessibility Failures**: Guarantees WCAG 2.2 AA compliance across mobile and web interfaces.
- **Performance Regressions**: Enforces strict performance budgets and predicts runtime bottlenecks before deployment.
- **Security Vulnerabilities**: Automatically validates code against OWASP Mobile/Web Top 10 standards.
- **Manual Review Overhead**: Replaces subjective code reviews with a systematic, 6-pillar multi-agent audit.

---

## 🏛️ System Architecture At A Glance

```
┌─────────────────────────────────────────────────────────────┐
│                 TIER S: META ORCHESTRATION                  │
│                 Grand Architect (Conductor)                 │
└──────────────────────────────┬──────────────────────────────┘
                               │
               ┌───────────────┴───────────────┐
               │                               │
       ┌───────▼───────┐               ┌───────▼───────┐
       │    TIER 1:    │               │    TIER 2:    │
       │     Daily     │               │     Power     │
       │   Workflow    │               │    Agents     │
       │  (5 Agents)   │               │  (5 Agents)   │
       └───────┬───────┘               └───────┬───────┘
               │                               │
               └───────────────┬───────────────┘
                               │
                       ┌───────▼───────┐
                       │    TIER 3:    │
                       │  Specialized  │
                       │  (10 Agents)  │
                       └───────────────┘
```

---

## 📂 Documentation Directory Index

1. **[System Architecture](SYSTEM-ARCHITECTURE.md)**: Detailed breakdown of the 3-tier hierarchy, execution lifecycles, configuration templates, and hook automation.
2. **[Agents Specifications](AGENTS-SPECIFICATIONS.md)**: Complete persona definitions, prompts, tool definitions, triggers, and examples for all 20 agents (7 production + 13 expansion blueprints).
3. **[Workflows & Commands](WORKFLOWS-AND-COMMANDS.md)**: Multi-agent execution manuals for `/feature`, `/review`, and `/test` commands.
4. **[Cross-Product Adaptation Guide](CROSS-PRODUCT-ADAPTATION-GUIDE.md)**: Instructions for applying these principles to React Native, Expo, React Web, Next.js, Astro, and Backend APIs.

---

## ⚡ Quick Usage

### 1. In Antigravity / Cursor / Claude Code
The system is automatically integrated into `.agents/rules/ai-agent-system-workflow.md` and `.agents/skills/ai-agent-system/SKILL.md`.

You can trigger any workflow naturally or via command prompt:
- **Feature Planning**: Ask the agent to act as **Grand Architect** to break down a new feature.
- **Code Audit**: Ask for a **Multi-Agent Review** of any file or pull request.
- **Accessibility**: Ask for an **A11y Enforcer Audit** on any component.
- **Security**: Run a **Security Specialist Audit** for auth, storage, and API flows.
- **Testing**: Request **Smart Test Generation** with ROI calculation.
