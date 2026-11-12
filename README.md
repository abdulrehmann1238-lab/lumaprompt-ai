# LumaPrompt.ai — Interactive SaaS Product Demo

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/abdulrehmann1238-lab/lumaprompt-ai)

An interactive frontend SaaS demonstration for **LUMAPROMPT.AI** — a personalized AI prompt intelligence platform built around your business profile, target audience, brand voice, and a curated library of human-written expert prompt frameworks.

## Milestones Showcased
- **Milestone 1 — Luma Engine**: 4-Step Personalized Profile Onboarding, Smart Prompt Builder, 18 Human-Written Prompt Frameworks, OAuth 2.0 Simulation, Usage Metering (20/mo Free Allowance), and Future Stripe Readiness.
- **Milestone 2 — AI Integrations**: AI Connections Center for **Claude** (Remote MCP Server + OAuth 2.0) and **ChatGPT** (OpenAI Apps SDK).
- **Milestone 3 — Chrome Extension**: Interactive Multi-Tab Browser Simulator (`ChatGPT`, `Claude`, and `Google Gemini`) with inline **Luma** button, enhancement popup, and one-click prompt insertion.

## Local Development

```bash
npm install
npm run dev
```

## Production Build & Netlify Deployment

```bash
npm run build
```

Configured out-of-the-box for Netlify via `netlify.toml` (`publish = "dist"`, `command = "npm run build"`, and SPA `/* -> /index.html 200` routing).
