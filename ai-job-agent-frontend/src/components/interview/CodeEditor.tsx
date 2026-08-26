'use client';

import React, { useState } from 'react';
import { Code, Play } from 'lucide-react';
import { Button } from '../../components/ui/button';

export const CodeEditor = () => {
  const [code, setCode] = useState<string>(
    `// Write your technical interview solution here\nfunction twoSum(nums: number[], target: number): number[] {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const diff = target - nums[i];\n    if (map.has(diff)) return [map.get(diff), i];\n    map.set(nums[i], i);\n  }\n  return [];\n}`
  );

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden text-gray-200">
      <div className="bg-gray-950 px-4 py-2.5 flex justify-between items-center border-b border-gray-800">
        <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
          <Code className="w-4 h-4 text-blue-400" /> solution.ts
        </div>
        <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white">
          <Play className="w-3 h-3" /> Run Tests
        </Button>
      </div>

      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        rows={10}
        className="w-full p-4 bg-transparent font-mono text-xs leading-relaxed outline-none resize-none text-emerald-400"
      />
    </div>
  );
};