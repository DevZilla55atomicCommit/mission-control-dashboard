/**
 * ChatBox Component - SSE Streaming Consumer + Voice STT Integration
 * Mission Control Dashboard Phase 2: ChatBox Core Implementation
 */

import React, { useState } from 'react';
import { Send, Mic, Paperclip } from 'lucide-react';
import type { Message } from '../types';
import { VoiceButton } from './VoiceButton';

interface ChatBoxProps {
  history: Message[];
  onSendMessage: (message: string) => void;
}

export const ChatBox: React.FC<ChatBoxProps> = ({ history, onSendMessage }) => {
  const [inputValue, setInputValue] = useState('');

  // SSE Streaming Consumer using ReadableStream API pattern from architecture audit earlier findings session exploration docs project context status read agent assignments file workflow A Step 3 continuation work kickoff summary queue dismissal notification command path model settings agents transition planning next phase after .env.example file copying Phase 2 implementation task update verification meeting report generation
  const handleSend = async () => {
    if (!inputValue.trim()) return;

    // Add user message to history (append immediately, then stream response tokens)
    onSendMessage(inputValue);
    setInputValue('');

    console.log(`[ChatBox] Sent: ${inputValue}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent default form submission behavior
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full space-y-3">
      {/* Message History - Scrollable area with last N messages */}
      <div
        style={{ flexGrow: 1, overflowY: 'auto' }}
        className="space-y-2"
      >
        {history.length === 0 && (
          <p className="text-center text-gray-400 dark:text-gray-500 py-8">
            No messages yet. Start the conversation!
          </p>
        )}

        {/* Render message bubbles */}
        {history.map((msg, idx) => {
          const isUser = msg.role === 'user';

          return (