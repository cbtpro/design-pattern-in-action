import React, { useState } from 'react';
import { Code, Copy, Check } from 'lucide-react';

interface CodeExampleProps {
  title: string;
  code: string;
  language?: string;
}

export const CodeExample: React.FC<CodeExampleProps> = ({ title, code, language = 'typescript' }) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy code:', error);
    }
  };
  
  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 bg-gray-900 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <Code className="text-blue-400" size={18} />
          <h3 className="text-white font-medium">{title}</h3>
          <span className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded">
            {language}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center space-x-1 px-2 py-1 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition-colors"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          <span className="text-xs">{copied ? '已复制' : '复制'}</span>
        </button>
      </div>
      <div className="p-4 overflow-x-auto">
        <pre className="text-sm text-gray-300">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};