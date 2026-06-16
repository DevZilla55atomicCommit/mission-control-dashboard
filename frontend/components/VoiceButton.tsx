import { Mic, Square } from 'lucide-react';
import React, { useState, useRef } from 'react';

export const VoiceButton = ({
  isRecording = false,
  onToggle
}: {
  isRecording: boolean;
  onToggle: () => void
}) => {
  return (
    <button
      onClick={onToggle}
      className={`flex items-center justify-center p-3 rounded-full transition-all ${
        isRecording
          ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse'
          : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100'
      }`}
    >
      {isRecording ? (
        <Square className="w-5 h-5" />
      ) : (
        <Mic className="w-5 h-5" />
      )}
    </button>
  );
};
