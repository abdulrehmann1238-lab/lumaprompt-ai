import { useApp } from '../context/AppContext';
import { EXPERT_PROMPT_LIBRARY } from '../data/prompts';

export function usePrompts() {
  const {
    recentPrompts,
    addGeneratedPrompt,
    updateGeneratedPrompt,
    toggleSaveGeneratedPrompt,
    clearSavedPrompts,
    savedFrameworkIds,
    toggleSaveFramework,
    builderDraft,
    setBuilderDraft,
  } = useApp();

  return {
    library: EXPERT_PROMPT_LIBRARY,
    recentPrompts,
    addGeneratedPrompt,
    updateGeneratedPrompt,
    toggleSaveGeneratedPrompt,
    clearSavedPrompts,
    savedFrameworkIds,
    toggleSaveFramework,
    builderDraft,
    setBuilderDraft,
  };
}

