// src/hooks/useVoiceInterview.ts
'use client';

import { useState, useRef, useCallback } from 'react';

export const useVoiceInterview = () => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  const startSession = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;
      setIsConnected(true);
      setIsSpeaking(true); // AI response indicator simulation
    } catch (err) {
      console.error('Microphone permission denied:', err);
    }
  }, []);

  const stopSession = useCallback(() => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
    }
    setIsConnected(false);
    setIsSpeaking(false);
  }, []);

  const toggleMute = useCallback(() => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsMuted((prev) => !prev);
    }
  }, []);

  return {
    isConnected,
    isMuted,
    isSpeaking,
    startSession,
    stopSession,
    toggleMute,
  };
};