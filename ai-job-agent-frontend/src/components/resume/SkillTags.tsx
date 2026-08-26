'use client';

import React, { useState } from 'react';
import { X, Plus, Sparkles, Code2 } from 'lucide-react';
import { cn } from '../../lib/utils';

interface SkillTagsProps {
  skills?: string[];
  onAddSkill?: (skill: string) => void;
  onRemoveSkill?: (skill: string) => void;
  isEditable?: boolean;
}

export const SkillTags: React.FC<SkillTagsProps> = ({
  skills = [],
  onAddSkill,
  onRemoveSkill,
  isEditable = true,
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const trimmed = inputValue.trim();
      if (trimmed && !skills.includes(trimmed)) {
        onAddSkill?.(trimmed);
        setInputValue('');
      }
    }
  };

  const handleAddClick = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !skills.includes(trimmed)) {
      onAddSkill?.(trimmed);
      setInputValue('');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-50 dark:bg-blue-950/50 text-blue-600 rounded-xl">
            <Code2 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-gray-900 dark:text-white">
              Extracted Skills & Frameworks
            </h3>
            <p className="text-[11px] text-gray-500">
              Parsed from your uploaded resume for Multi-Agent AI matching.
            </p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 px-2.5 py-1 rounded-full">
          <Sparkles className="w-3 h-3" /> {skills.length} Skills Detected
        </span>
      </div>

      {/* Input Field for Adding Skills */}
      {isEditable && (
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add a skill (e.g., Express.js, TypeScript) & press Enter"
            className="flex-1 px-3 py-1.5 text-xs bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:border-blue-500 rounded-xl outline-none text-gray-900 dark:text-gray-100 placeholder:text-gray-400 transition-all"
          />
          <button
            type="button"
            onClick={handleAddClick}
            disabled={!inputValue.trim()}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl text-xs font-medium flex items-center gap-1 transition-all shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" /> Add
          </button>
        </div>
      )}

      {/* Tags Grid */}
      <div className="flex flex-wrap gap-2 pt-1">
        {skills.map((skill, index) => (
          <span
            key={index}
            className={cn(
              'inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-medium transition-all shadow-xs',
              'bg-gray-100 dark:bg-gray-700/60 text-gray-800 dark:text-gray-200 border border-gray-200/80 dark:border-gray-600/60 hover:border-gray-300'
            )}
          >
            {skill}
            {isEditable && onRemoveSkill && (
              <button
                type="button"
                onClick={() => onRemoveSkill(skill)}
                className="text-gray-400 hover:text-red-500 rounded-md p-0.5 transition-colors"
                aria-label={`Remove ${skill}`}
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </span>
        ))}

        {skills.length === 0 && (
          <p className="text-xs text-gray-400 italic py-2">
            No skills extracted yet. Upload a resume or add skills manually above.
          </p>
        )}
      </div>
    </div>
  );
};