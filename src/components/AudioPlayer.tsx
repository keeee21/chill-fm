"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface Track {
  id: number;
  title: string;
  artist: string;
  duration: string;
  genre: string;
  mood: string;
  filePath: string;
}

interface AudioPlayerProps {
  currentTrack: Track | null;
  onTrackEnd?: () => void;
}

export default function AudioPlayer({
  currentTrack,
  onTrackEnd,
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleLoadedMetadata = useCallback(() => {
    if (audioRef.current) {
      setDuration(Math.floor(audioRef.current.duration));
      setIsLoading(false);
    }
  }, []);

  const handleTimeUpdate = useCallback(() => {
    if (audioRef.current) {
      setCurrentTime(Math.floor(audioRef.current.currentTime));
    }
  }, []);

  const handleEnded = useCallback(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    onTrackEnd?.();
  }, [onTrackEnd]);

  const handleError = useCallback(() => {
    setError("音楽ファイルの読み込みに失敗しました");
    setIsLoading(false);
    setIsPlaying(false);
  }, []);

  const togglePlayPause = useCallback(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().catch((err) => {
          console.error("音楽の再生に失敗しました:", err);
          setError("音楽の再生に失敗しました");
          setIsPlaying(false);
        });
        setIsPlaying(true);
      }
    }
  }, [isPlaying]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    if (currentTrack) {
      setError(null);
      setIsLoading(true);

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata,
        );
        audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
        audioRef.current.removeEventListener("ended", handleEnded);
        audioRef.current.removeEventListener("error", handleError);
      }

      const newAudio = new Audio(currentTrack.filePath);
      audioRef.current = newAudio;

      newAudio.addEventListener("loadedmetadata", handleLoadedMetadata);
      newAudio.addEventListener("timeupdate", handleTimeUpdate);
      newAudio.addEventListener("ended", handleEnded);
      newAudio.addEventListener("error", handleError);

      setCurrentTime(0);
      setIsPlaying(true);

      newAudio.play().catch((err) => {
        console.error("音楽の再生に失敗しました:", err);
        setError("音楽の再生に失敗しました");
        setIsPlaying(false);
        setIsLoading(false);
      });
    }
  }, [
    currentTrack,
    handleLoadedMetadata,
    handleTimeUpdate,
    handleEnded,
    handleError,
  ]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata,
        );
        audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
        audioRef.current.removeEventListener("ended", handleEnded);
        audioRef.current.removeEventListener("error", handleError);
        audioRef.current.src = "";
        audioRef.current = null;
      }
    };
  }, [handleLoadedMetadata, handleTimeUpdate, handleEnded, handleError]);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  if (!currentTrack) return null;

  return (
    <>
      {/* Error Display */}
      {error && (
        <div className="retro-border bg-red-900 bg-opacity-50 p-4 mb-6 text-center">
          <p className="text-red-300 font-mono">⚠️ {error}</p>
        </div>
      )}

      {/* Current Track Display */}
      <div className="retro-border bg-retro-surface p-6 mb-8 retro-glow">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-retro-accent mb-1">
              {currentTrack.title}
            </h2>
            <p className="text-retro-text-dim font-mono">
              {currentTrack.artist} • {currentTrack.genre}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="bg-retro-primary px-3 py-1 rounded-full text-sm font-bold">
              {currentTrack.mood}
            </span>
            <button
              type="button"
              onClick={togglePlayPause}
              disabled={isLoading}
              className="retro-button px-6 py-3 rounded-full font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "🔄 LOADING..." : isPlaying ? "⏸️ PAUSE" : "▶️ PLAY"}
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative">
          <div className="w-full bg-retro-border h-2 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-retro-primary to-retro-accent transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm text-retro-text-dim mt-2 font-mono">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>
    </>
  );
}
