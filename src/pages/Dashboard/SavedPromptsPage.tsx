import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bookmark, Copy, ExternalLink, Sparkles, BookOpen, Trash2 } from 'lucide-react';
import { usePrompts } from '../../hooks/usePrompts';
import { useApp } from '../../context/AppContext';

export const SavedPromptsPage: React.FC = () => {
  const {
    recentPrompts,
    library,
    savedFrameworkIds,
    toggleSaveGeneratedPrompt,
    toggleSaveFramework,
    setBuilderDraft,
    clearSavedPrompts,
  } = usePrompts();
  const { showToast } = useApp();
  const navigate = useNavigate();

  const savedGenerated = recentPrompts.filter((p) => p.isSaved);
  const savedFrameworks = library.filter((f) => savedFrameworkIds.includes(f.id));

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#9B7775]">
            Personal Collection
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#292722] mt-1">
            Saved Prompts & Frameworks
          </h1>
          <p className="text-sm text-[#817B73] mt-1">
            Quickly access your bookmarked custom prompts and favorite human-written frameworks.
          </p>
        </div>

        {(savedGenerated.length > 0 || savedFrameworks.length > 0) && (
          <button
            type="button"
            onClick={clearSavedPrompts}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#E9E4DC] bg-white hover:bg-[#F2EEE8] text-xs font-medium text-[#817B73] hover:text-[#292722]"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear Saved Bookmarks
          </button>
        )}
      </div>

      {/* Saved Custom Generations */}
      <div className="space-y-4">
        <h2 className="font-serif text-2xl text-[#292722]">
          Saved Custom Prompts ({savedGenerated.length})
        </h2>

        {savedGenerated.length === 0 ? (
          <div className="editorial-card p-8 text-center bg-white">
            <Bookmark className="w-8 h-8 text-[#9B7775] mx-auto mb-2" />
            <h3 className="font-serif text-xl text-[#292722] mb-1">
              No saved custom prompts yet
            </h3>
            <p className="text-xs text-[#817B73] mb-4">
              Generate a personalized prompt in Smart Builder and click “Save Prompt” to keep it here.
            </p>
            <Link
              to="/builder"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#9B7775] text-white text-xs font-medium"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Open Smart Builder
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {savedGenerated.map((prompt) => (
              <div
                key={prompt.id}
                className="editorial-card p-6 bg-white flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#F2EEE8] text-[#50434F] text-[11px] font-medium">
                      {prompt.destination} · {prompt.objective}
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleSaveGeneratedPrompt(prompt.id)}
                      className="text-[#9B7775] hover:text-[#292722]"
                      title="Remove from saved"
                    >
                      <Bookmark className="w-4 h-4 fill-current" />
                    </button>
                  </div>
                  <h3 className="font-serif text-xl text-[#292722] mb-1">{prompt.title}</h3>
                  <p className="text-xs text-[#817B73] mb-3">“{prompt.roughRequest}”</p>
                  <pre className="whitespace-pre-wrap font-sans text-xs text-[#292722]/85 bg-[#FAF8F5] border border-[#E9E4DC] rounded-xl p-3 max-h-36 overflow-y-auto">
                    {prompt.fullPrompt}
                  </pre>
                </div>

                <div className="flex items-center gap-2.5 mt-4 pt-3 border-t border-[#E9E4DC]">
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard?.writeText(prompt.fullPrompt);
                      showToast('Copied saved prompt', prompt.title);
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#F2EEE8] hover:bg-[#E9DAD5] text-xs font-medium text-[#292722]"
                  >
                    <Copy className="w-3.5 h-3.5 text-[#9B7775]" />
                    Copy Full Prompt
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setBuilderDraft({
                        roughRequest: prompt.roughRequest,
                        objective: prompt.objective,
                        destination: prompt.destination,
                        frameworkId: prompt.frameworkId,
                      });
                      navigate('/builder');
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#292722] text-white text-xs font-medium"
                  >
                    <span>Open in Builder</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bookmarked Expert Frameworks */}
      <div className="space-y-4">
        <h2 className="font-serif text-2xl text-[#292722]">
          Bookmarked Expert Frameworks ({savedFrameworks.length})
        </h2>

        {savedFrameworks.length === 0 ? (
          <div className="editorial-card p-8 text-center bg-white">
            <BookOpen className="w-8 h-8 text-[#817B73] mx-auto mb-2" />
            <p className="text-xs text-[#817B73] mb-4">
              Bookmark frameworks in the Prompt Library to keep them handy here.
            </p>
            <Link
              to="/library"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#F2EEE8] text-[#292722] text-xs font-medium"
            >
              Browse Prompt Library
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {savedFrameworks.map((fw) => (
              <div
                key={fw.id}
                className="editorial-card p-5 bg-white flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-medium text-[#9B7775]">
                      {fw.category}
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleSaveFramework(fw.id)}
                      className="text-[#9B7775]"
                      title="Remove bookmark"
                    >
                      <Bookmark className="w-4 h-4 fill-current" />
                    </button>
                  </div>
                  <h3 className="font-serif text-lg text-[#292722] mb-1.5">{fw.title}</h3>
                  <p className="text-xs text-[#817B73] leading-relaxed">
                    {fw.shortDescription}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setBuilderDraft({
                      roughRequest: fw.defaultRoughRequest,
                      objective: fw.objective,
                      destination: 'Claude',
                      frameworkId: fw.id,
                      autoGenerate: true,
                    });
                    navigate('/builder');
                  }}
                  className="mt-4 pt-3 border-t border-[#E9E4DC] text-xs font-medium text-[#50434F] hover:text-[#9B7775] text-left"
                >
                  Personalize with My Profile →
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

