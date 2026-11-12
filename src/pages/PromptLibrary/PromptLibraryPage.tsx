import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Bookmark,
  Sparkles,
  Check,
  X,
  ArrowRight,
  SlidersHorizontal,
  Award,
  Copy,
} from 'lucide-react';
import { usePrompts } from '../../hooks/usePrompts';
import { useProfile } from '../../hooks/useProfile';
import { useApp } from '../../context/AppContext';
import { PromptCategory, PromptFramework } from '../../types';

const CATEGORIES: ('All' | PromptCategory)[] = [
  'All',
  'Business & Entrepreneurship',
  'Career & Leadership',
  'Relationships & Communication',
  'Beauty, Skincare & Wellness',
  'Self Mastery & Mindset',
];

const INDUSTRIES = [
  'All Industries',
  'Business Coaching',
  'Coaching',
  'Consulting',
  'E-commerce',
  'Beauty & Wellness',
  'Marketing',
  'Education',
  'Technology',
  'Creative Services',
];

const OBJECTIVES = [
  'All Objectives',
  'Content Creation',
  'Marketing',
  'Sales',
  'Business Strategy',
  'Communication',
  'Personal Development',
];

export const PromptLibraryPage: React.FC = () => {
  const { library, savedFrameworkIds, toggleSaveFramework, setBuilderDraft } = usePrompts();
  const { profile } = useProfile();
  const { showToast } = useApp();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | PromptCategory>('All');
  const [selectedIndustry, setSelectedIndustry] = useState('All Industries');
  const [selectedObjective, setSelectedObjective] = useState('All Objectives');
  const [sortBy, setSortBy] = useState<'popular' | 'recent'>('popular');

  const [activeFrameworkModal, setActiveFrameworkModal] = useState<PromptFramework | null>(null);

  const filteredPrompts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return library
      .filter((fw) => {
        if (selectedCategory !== 'All' && fw.category !== selectedCategory) return false;
        if (
          selectedIndustry !== 'All Industries' &&
          !fw.industry.some((ind) => ind.toLowerCase() === selectedIndustry.toLowerCase())
        ) {
          return false;
        }
        if (selectedObjective !== 'All Objectives' && fw.objective !== selectedObjective) {
          return false;
        }
        if (q) {
          const haystack = `${fw.title} ${fw.shortDescription} ${fw.category} ${fw.relevantAudience} ${fw.industry.join(' ')}`.toLowerCase();
          return haystack.includes(q);
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'popular') {
          return a.popularRank - b.popularRank;
        }
        return b.dateAdded.localeCompare(a.dateAdded);
      });
  }, [library, searchQuery, selectedCategory, selectedIndustry, selectedObjective, sortBy]);

  const handlePersonalizeWithProfile = (fw: PromptFramework) => {
    setBuilderDraft({
      roughRequest: fw.defaultRoughRequest,
      objective: fw.objective,
      destination: 'Claude',
      frameworkId: fw.id,
      autoGenerate: true,
    });
    setActiveFrameworkModal(null);
    navigate('/builder');
  };

  const handleUseThisPrompt = (fw: PromptFramework) => {
    setBuilderDraft({
      roughRequest: fw.defaultRoughRequest,
      objective: fw.objective,
      destination: 'Claude',
      frameworkId: fw.id,
      autoGenerate: false,
    });
    setActiveFrameworkModal(null);
    showToast('Framework loaded in Smart Builder', `Loaded "${fw.title}".`);
    navigate('/builder');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#9B7775]">
            Human-Written Prompt Library
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#292722] mt-1">
            Expert thinking. Ready when you are.
          </h1>
          <p className="text-sm text-[#817B73] mt-1 max-w-2xl">
            Every framework in our library is crafted by a domain specialist and designed to merge seamlessly with your saved {profile.businessName} profile.
          </p>
        </div>

        <div className="text-xs text-[#817B73]">
          Showing <strong className="text-[#292722]">{filteredPrompts.length}</strong> of{' '}
          {library.length} expert frameworks
        </div>
      </div>

      {/* Search & Filter Controls Panel */}
      <div className="editorial-panel p-5 sm:p-6 bg-white space-y-5">
        {/* Top Row: Search Input + Industry + Objective + Sort */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-[#817B73] absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by topic, framework title, or audience..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC] text-xs sm:text-sm text-[#292722] focus:outline-none focus:border-[#9B7775]"
            />
          </div>

          <div className="md:col-span-3">
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              aria-label="Filter by Industry"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC] text-xs sm:text-sm text-[#292722] focus:outline-none focus:border-[#9B7775]"
            >
              {INDUSTRIES.map((ind) => (
                <option key={ind} value={ind}>
                  {ind}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <select
              value={selectedObjective}
              onChange={(e) => setSelectedObjective(e.target.value)}
              aria-label="Filter by Objective"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC] text-xs sm:text-sm text-[#292722] focus:outline-none focus:border-[#9B7775]"
            >
              {OBJECTIVES.map((obj) => (
                <option key={obj} value={obj}>
                  {obj}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'popular' | 'recent')}
              aria-label="Sort Frameworks"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC] text-xs sm:text-sm text-[#292722] focus:outline-none focus:border-[#9B7775]"
            >
              <option value="popular">Most Popular</option>
              <option value="recent">Recently Added</option>
            </select>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#E9E4DC]">
          {CATEGORIES.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all border ${
                  active
                    ? 'bg-[#292722] text-white border-[#292722]'
                    : 'bg-[#FAF8F5] text-[#292722] border-[#E9E4DC] hover:bg-[#F2EEE8]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Prompt Cards Grid */}
      {filteredPrompts.length === 0 ? (
        <div className="editorial-card p-12 text-center bg-white space-y-3">
          <SlidersHorizontal className="w-8 h-8 text-[#9B7775] mx-auto" />
          <h3 className="font-serif text-2xl text-[#292722]">No matching frameworks found</h3>
          <p className="text-xs text-[#817B73] max-w-md mx-auto">
            Try clearing one of your active filters or searching with a broader keyword.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setSelectedIndustry('All Industries');
              setSelectedObjective('All Objectives');
            }}
            className="px-5 py-2.5 rounded-xl bg-[#9B7775] text-white text-xs font-medium"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPrompts.map((fw) => {
            const isSaved = savedFrameworkIds.includes(fw.id);
            return (
              <div
                key={fw.id}
                className="editorial-card editorial-card-hover p-6 bg-white flex flex-col justify-between"
              >
                <div>
                  {/* Top Row: Category + Expert-Written Badge + Save Icon */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#F2EEE8] text-[#50434F] text-[10px] font-semibold">
                        {fw.category}
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#EAEDE5] text-[#728C75] text-[10px] font-medium">
                        <Award className="w-3 h-3" />
                        Expert-Written
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleSaveFramework(fw.id)}
                      className={`p-1.5 rounded-lg border transition-colors ${
                        isSaved
                          ? 'bg-[#E9DAD5]/60 border-[#9B7775] text-[#50434F]'
                          : 'bg-[#FAF8F5] border-[#E9E4DC] text-[#817B73] hover:text-[#292722]'
                      }`}
                      aria-label={isSaved ? 'Remove bookmark' : 'Bookmark framework'}
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  {/* Title & Short Description */}
                  <h3 className="font-serif text-xl text-[#292722] mb-2">{fw.title}</h3>
                  <p className="text-xs text-[#817B73] leading-relaxed mb-4">
                    {fw.shortDescription}
                  </p>

                  {/* Relevant Audience */}
                  <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC]/80 text-[11px] text-[#817B73]">
                    <strong className="text-[#292722]">Relevant audience:</strong>{' '}
                    {fw.relevantAudience}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="mt-5 pt-4 border-t border-[#E9E4DC] flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveFrameworkModal(fw)}
                    className="px-3.5 py-2 rounded-xl bg-[#FAF8F5] hover:bg-[#F2EEE8] border border-[#E9E4DC] text-xs font-medium text-[#292722] transition-colors"
                  >
                    View details
                  </button>

                  <button
                    type="button"
                    onClick={() => handlePersonalizeWithProfile(fw)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#9B7775] hover:bg-[#886563] text-white text-xs font-medium transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Personalize</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Detailed Prompt Framework Modal */}
      {activeFrameworkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#292722]/45 backdrop-blur-[2px] p-4 overflow-y-auto">
          <div className="bg-white border border-[#E9E4DC] rounded-[22px] max-w-2xl w-full p-6 sm:p-8 shadow-editorial-lg relative my-8 max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setActiveFrameworkModal(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-[#817B73] hover:text-[#292722] hover:bg-[#FAF8F5]"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full bg-[#F2EEE8] text-[#50434F] text-xs font-medium">
                {activeFrameworkModal.category}
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#EAEDE5] text-[#728C75] text-xs font-medium">
                <Award className="w-3.5 h-3.5" />
                Expert-Written by {activeFrameworkModal.authorRole}
              </span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl text-[#292722] mb-2">
              {activeFrameworkModal.title}
            </h2>
            <p className="text-sm text-[#817B73] leading-relaxed mb-6">
              {activeFrameworkModal.fullDescription}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {/* What it helps achieve */}
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC]">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#50434F] mb-2.5">
                  What It Helps Achieve
                </h4>
                <ul className="space-y-2 text-xs text-[#292722]">
                  {activeFrameworkModal.whatItHelpsAchieve.map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#728C75] shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Who it is for & Overview */}
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC]">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#50434F] mb-1">
                    Who It Is For
                  </h4>
                  <p className="text-xs text-[#292722]/90 leading-relaxed">
                    {activeFrameworkModal.whoItIsFor}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E9E4DC]">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#50434F] mb-1">
                    Framework Overview
                  </h4>
                  <p className="text-xs text-[#292722]/90 leading-relaxed">
                    {activeFrameworkModal.frameworkOverview}
                  </p>
                </div>
              </div>
            </div>

            {/* Original Framework Preview */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#817B73]">
                  Original Human-Written Framework Preview
                </span>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard?.writeText(
                      activeFrameworkModal.originalFrameworkPreview
                    );
                    showToast('Framework structure copied');
                  }}
                  className="inline-flex items-center gap-1 text-xs text-[#9B7775] hover:underline"
                >
                  <Copy className="w-3 h-3" /> Copy Structure
                </button>
              </div>
              <pre className="whitespace-pre-wrap font-sans text-xs leading-relaxed text-[#292722] bg-[#FAF8F5] border border-[#E9E4DC] rounded-xl p-4">
                {activeFrameworkModal.originalFrameworkPreview.replace(
                  /\{\{BUSINESS_NAME\}\}/g,
                  profile.businessName
                ).replace(/\{\{TARGET_AUDIENCE\}\}/g, profile.targetAudience)}
              </pre>
            </div>

            {/* Bottom Modal CTAs: Personalize with My Profile & Use This Prompt */}
            <div className="pt-4 border-t border-[#E9E4DC] flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => handleUseThisPrompt(activeFrameworkModal)}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#F2EEE8] hover:bg-[#E9DAD5] text-[#292722] text-xs sm:text-sm font-medium transition-colors"
              >
                Use This Prompt
              </button>

              <button
                type="button"
                onClick={() => handlePersonalizeWithProfile(activeFrameworkModal)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#9B7775] hover:bg-[#886563] text-white text-xs sm:text-sm font-medium transition-colors shadow-sm"
              >
                <Sparkles className="w-4 h-4" />
                <span>Personalize with My Profile ({profile.businessName})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

