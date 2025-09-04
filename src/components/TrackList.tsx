"use client";

interface Track {
  id: number;
  title: string;
  artist: string;
  duration: string;
  genre: string;
  mood: string;
  filePath: string;
}

interface TrackListProps {
  tracks: Track[];
  currentTrack: Track | null;
  onTrackSelect: (track: Track) => void;
}

export default function TrackList({
  tracks,
  currentTrack,
  onTrackSelect,
}: TrackListProps) {
  return (
    <div className="grid gap-4">
      <h2 className="text-3xl font-bold text-retro-text mb-4 font-mono">
        📻 TRACK LIST
      </h2>

      {tracks.map((track) => (
        <button
          type="button"
          key={track.id}
          onClick={() => onTrackSelect(track)}
          className={`retro-border bg-retro-surface p-4 cursor-pointer transition-all duration-300 hover:retro-glow hover:bg-opacity-80 w-full text-left ${
            currentTrack?.id === track.id ? "retro-glow bg-opacity-60" : ""
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-retro-text mb-1">
                {track.title}
              </h3>
              <p className="text-retro-text-dim font-mono text-sm">
                {track.artist} • {track.genre}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <span className="bg-retro-secondary px-2 py-1 rounded text-xs font-bold">
                {track.mood}
              </span>
              <span className="text-retro-text-dim font-mono text-sm">
                {track.duration}
              </span>
              {currentTrack?.id === track.id && (
                <div className="flex gap-1">
                  <div className="w-1 h-4 bg-retro-accent rounded animate-pulse"></div>
                  <div
                    className="w-1 h-4 bg-retro-primary rounded animate-pulse"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-1 h-4 bg-retro-accent rounded animate-pulse"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              )}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
