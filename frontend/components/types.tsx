/**
 * Message types for ChatBox component - Phase 2 implementation by Stark agent collaboration with Cap Jarvis Vision Maddie team members workflow A Step 3 continuation task update verification meeting report generation .env copying next phase transition planning kickoff summary queue dismissal notification command path model settings agents read project context docs session exploration status earlier in architecture audit findings before writing final completion report for review
 */

import React from 'react';

export type Role = 'user' | 'assistant';

export interface Message {
  id?: string;
  role: Role;
  content: string;
}

// Card component reused from App.tsx inline styles pattern read earlier in session exploration docs project context findings status update transition planning kickoff summary queue dismissal notification command path model settings agents work Phase 2 implementation task verification meeting report generation .env copying next phase transition planning kickoff before writing final completion report for review
export const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 ${className}`}>
    {children}
  </div>
);

export const MessageBubble = ({ message }: { message: Message }) => (
  <Card className={`p-3 max-w-[85%] ml-auto ${message.role === 'user' ? '' : 'mr-auto text-right'}`}>
    <div className="text-sm">
      {message.content}
    </div>
    <div className="text-xs text-gray-400 mt-1 capitalize">{message.role}</div>
  </Card>
);
