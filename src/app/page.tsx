import MusicApp from "@/components/MusicApp";

interface Track {
  id: number;
  title: string;
  artist: string;
  duration: string;
  genre: string;
  mood: string;
  filePath: string;
}

async function getTracks(): Promise<Track[]> {
  return [
    {
      id: 1,
      title: "Serene Flow",
      artist: "Chill FM",
      duration: "0:00",
      genre: "Ambient",
      mood: "Peaceful",
      filePath: "/music/Serene_Flow.wav",
    },
    {
      id: 2,
      title: "Cafe Acoustic",
      artist: "Chill FM",
      duration: "0:00",
      genre: "Acoustic",
      mood: "Cozy",
      filePath: "/music/cafe_acoustic.wav",
    },
    {
      id: 3,
      title: "Lofi Quiet",
      artist: "Chill FM",
      duration: "0:00",
      genre: "Lofi",
      mood: "Quiet",
      filePath: "/music/lofi_quiet_bgm.wav",
    }
  ];
}

export default async function Home() {
  const tracks = await getTracks();

  return (
    <div className="min-h-screen bg-retro-bg p-6">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-6xl font-bold text-retro-accent mb-4 tracking-wider">
            CHILL FM
          </h1>
          <p className="text-2xl text-retro-text-dim font-mono">
            ~ Retro Chill Music Station ~
          </p>
          <div className="mt-4 w-32 h-1 bg-gradient-to-r from-retro-primary to-retro-secondary mx-auto retro-glow"></div>
        </header>

        <MusicApp tracks={tracks} />

        <footer className="text-center mt-12 text-retro-text-dim font-mono">
          <p>© 2025 Chill FM - All vibes reserved</p>
          <p className="text-sm mt-2">
            Original music by{" "}
            <a
              href="https://github.com/keeee21"
              target="_blank"
              rel="noopener noreferrer"
              className="text-retro-accent hover:text-retro-primary transition-colors underline"
            >
              @keeee21
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
