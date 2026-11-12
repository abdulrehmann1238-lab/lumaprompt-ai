import { IntegrationConfig } from '../types';

export const INITIAL_INTEGRATIONS: IntegrationConfig[] = [
  {
    id: 'claude',
    name: 'Claude',
    subtitle: 'Remote MCP Server · OAuth 2.0',
    description:
      'Invoke Luma’s prompt engine and your saved business profile directly inside Claude Desktop and Claude Web via our dedicated Model Context Protocol (MCP) server.',
    connected: true,
    connectedAt: 'Connected Nov 9, 2026',
    badgeText: 'Remote MCP Server',
    milestoneTag: 'Milestone 1 & 2 Primary',
    isPrimaryContract: true,
    permissions: [
      'Read your saved Luma business profile, audience, and brand voice attributes',
      'Access curated human-written expert frameworks matched to your prompt intent',
      'Expose the `luma_build_expert_prompt` MCP tool inside your Claude workspace',
      'Verify monthly generation allowance via OAuth 2.0 session token',
    ],
    technicalDetails: {
      architecture: 'Remote Model Context Protocol (MCP) Server over SSE / Streamable HTTP',
      authProtocol: 'OAuth 2.0 Authorization Code Flow with PKCE',
      capabilities: [
        'Tool: `luma_enhance_prompt(rough_request, objective)`',
        'Resource: `luma://profile/current` (Live Business & Voice Context)',
        'Resource: `luma://frameworks/catalog` (Curated Expert Library)',
        'Powered by Claude Haiku API for low-latency context assembly',
      ],
      endpointPreview: 'https://mcp.lumaprompt.ai/v1/sse (Simulated Prototype Endpoint)',
      notes:
        'Prepared for Anthropic MCP Directory submission with full OAuth 2.0 discovery metadata and rate-limit headers.',
    },
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    subtitle: 'OpenAI Apps SDK · MCP-Compatible Backend',
    description:
      'Bring your Bloom & Co. profile and Luma’s expert frameworks directly into ChatGPT conversations through the official Apps SDK integration and Chrome companion.',
    connected: false,
    badgeText: 'Apps SDK Integration',
    milestoneTag: 'Milestone 2 Primary',
    isPrimaryContract: true,
    permissions: [
      'Authenticate your LumaPrompt.ai account via OAuth 2.0 handshake',
      'Retrieve saved brand voice guardrails and target audience context on demand',
      'Assemble structured expert prompts before ChatGPT generates its response',
      'Sync prompt generation count with your Luma monthly usage allowance',
    ],
    technicalDetails: {
      architecture: 'OpenAI Apps SDK Connector + Shared Luma MCP Engine Backend',
      authProtocol: 'OAuth 2.0 Delegated User Token + Scoped Profile Claims',
      capabilities: [
        'Action: `generatePersonalizedPrompt` with real-time profile injection',
        'Context Synchronization: Automatic refresh when Sarah updates her profile',
        'Directory Readiness: Manifest validated for ChatGPT App Directory guidelines',
      ],
      endpointPreview: 'https://api.lumaprompt.ai/v1/chatgpt-app/manifest.json (Simulated)',
      notes:
        'Shares the unified Milestone 1 Luma Engine backend so profile updates reflect across Claude and ChatGPT simultaneously.',
    },
  },
  {
    id: 'gemini',
    name: 'Google Gemini',
    subtitle: 'Chrome Extension Inline Composer',
    description:
      'Enhance rough thoughts inside Google Gemini with one click using the Luma Chrome Extension button embedded directly inside the Gemini prompt bar.',
    connected: true,
    connectedAt: 'Active via Extension Preview',
    badgeText: 'Chrome Extension Ready',
    milestoneTag: 'Milestone 3 Primary',
    isPrimaryContract: true,
    permissions: [
      'Render the Luma enhancement button inside `gemini.google.com` prompt composer',
      'Read draft text in the active input box when you click Enhance with Luma',
      'Replace draft text with your structured, profile-aware Luma prompt',
    ],
    technicalDetails: {
      architecture: 'Manifest V3 Content Script + Luma Engine API Bridge',
      authProtocol: 'Secure Browser Session Token (OAuth 2.0 PKCE)',
      capabilities: [
        'DOM Composer Injection for ChatGPT, Claude, and Google Gemini',
        'Zero-latency Shadow DOM popup with framework selector',
        'One-click prompt replacement into contenteditable & textarea inputs',
      ],
      endpointPreview: 'chrome-extension://luma-companion-v3/content-bridge.js (Simulated)',
      notes:
        'Configured for Chrome Web Store publication with strict host permissions limited to supported AI chat domains.',
    },
  },
  {
    id: 'perplexity',
    name: 'Perplexity',
    subtitle: 'Structured Copy & Deep Research Framing',
    description:
      'Format market research, competitor analysis, and audience discovery prompts with your exact business context for Perplexity Pro searches.',
    connected: false,
    badgeText: 'Copy Destination Support',
    milestoneTag: 'Extended Ecosystem',
    isPrimaryContract: false,
    permissions: [
      'Format prompts with citation-first and industry-specific research constraints',
      'One-click copy optimized for Perplexity Deep Research threads',
    ],
    technicalDetails: {
      architecture: 'Destination-Specific Prompt Formatting Adapter',
      authProtocol: 'Local Workspace Profile Binding',
      capabilities: [
        'Appends source-verification and industry benchmark instructions',
        'Tailors research scope to your specific business stage and audience',
      ],
      endpointPreview: 'Local Clipboard & Smart Builder Destination Preset',
      notes: 'Available immediately in Smart Builder via the Destination Selector.',
    },
  },
];

