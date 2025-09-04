"use client";

import { useState } from "react";
import AudioPlayer from "./AudioPlayer";
import TrackList from "./TrackList";

interface Track {
  id: number;
  title: string;
  artist: string;
  duration: string;
  genre: string;
  mood: string;
  filePath: string;
}

interface MusicAppProps {
  tracks: Track[];
}

export default function MusicApp({ tracks }: MusicAppProps) {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);

  const handleTrackSelect = (track: Track) => {
    setCurrentTrack(track);
  };

  const handleTrackEnd = () => {
    setCurrentTrack(null);
  };

  return (
    <>
      <AudioPlayer currentTrack={currentTrack} onTrackEnd={handleTrackEnd} />

      <TrackList
        tracks={tracks}
        currentTrack={currentTrack}
        onTrackSelect={handleTrackSelect}
      />
    </>
  );
}
