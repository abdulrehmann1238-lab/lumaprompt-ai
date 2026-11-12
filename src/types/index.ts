export type IndustryType =
  | 'Business Coaching'
  | 'Coaching'
  | 'Consulting'
  | 'E-commerce'
  | 'Beauty & Wellness'
  | 'Marketing'
  | 'Education'
  | 'Technology'
  | 'Creative Services'
  | 'Other';

export type BrandVoiceAttribute =
  | 'Warm'
  | 'Confident'
  | 'Professional'
  | 'Conversational'
  | 'Sophisticated'
  | 'Playful'
  | 'Educational'
  | 'Bold'
  | 'Empathetic';

export type PromptObjective =
  | 'Content Creation'
  | 'Marketing'
  | 'Sales'
  | 'Business Strategy'
  | 'Communication'
  | 'Personal Development';

export type AIDestination = 'Claude' | 'ChatGPT' | 'Gemini' | 'Perplexity' | 'Copy Only';

export type PromptCategory =
  | 'Business & Entrepreneurship'
  | 'Career & Leadership'
  | 'Relationships & Communication'
  | 'Beauty, Skincare & Wellness'
  | 'Self Mastery & Mindset';

export interface UserProfile {
  name: string;
  email: string;
  avatarUrl?: string;
  businessName: string;
  website: string;
  industry: string;
  businessDescription: string;
  businessStage: string;
  targetAudience: string;
  audienceAgeRange: string;
  customerChallenges: string;
  transformationProvided: string;
  brandVoice: string[];
  wordsToUse: string;
  wordsToAvoid: string;
  additionalInstructions: string;
  goals: string[];
  onboardingCompleted: boolean;
}

export interface PromptFramework {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: PromptCategory;
  industry: string[];
  objective: PromptObjective;
  relevantAudience: string;
  popularRank: number;
  dateAdded: string;
  authorRole: string;
  whatItHelpsAchieve: string[];
  whoItIsFor: string;
  frameworkOverview: string;
  originalFrameworkPreview: string;
  roleDefinition: string;
  contentRequirements: string[];
  outputFormat: string;
  successCriteria: string[];
  defaultRoughRequest: string;
}

export interface PromptBreakdown {
  role: string;
  businessContext: string;
  audience: string;
  brandVoice: string;
  objective: string;
  requirements: string[];
  constraints: string[];
  outputFormat: string;
  successCriteria: string[];
}

export interface GeneratedPrompt {
  id: string;
  title: string;
  roughRequest: string;
  objective: PromptObjective;
  destination: AIDestination;
  frameworkId: string;
  frameworkTitle: string;
  fullPrompt: string;
  breakdown: PromptBreakdown;
  createdAt: string;
  isSaved: boolean;
  variationIndex?: number;
}

export interface IntegrationConfig {
  id: 'claude' | 'chatgpt' | 'gemini' | 'perplexity';
  name: string;
  subtitle: string;
  description: string;
  connected: boolean;
  connectedAt?: string;
  badgeText: string;
  milestoneTag: string;
  isPrimaryContract: boolean;
  permissions: string[];
  technicalDetails: {
    architecture: string;
    authProtocol: string;
    capabilities: string[];
    endpointPreview: string;
    notes: string;
  };
}

export interface ExtensionSettings {
  enabled: boolean;
  defaultDestination: 'ChatGPT' | 'Claude' | 'Gemini';
  autoApplyProfile: boolean;
  showEnhancementPreview: boolean;
  preferredBrandVoice: string;
  keyboardShortcut: string;
}

export interface UsageLogEntry {
  id: string;
  promptTitle: string;
  destination: AIDestination;
  frameworkUsed: string;
  timestamp: string;
}

export interface UsageState {
  monthlyAllowance: number;
  used: number;
  plan: 'Free' | 'Pro';
  resetDate: string;
  weeklyUsage: { day: string; count: number }[];
  proWaitlistJoined: boolean;
  proWaitlistEmail: string;
}

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: 'success' | 'info' | 'warning';
}

