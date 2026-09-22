import { useRef, useState } from "react";

const tracks = [
  {
    name: "Relaxing Piano",
    artist: "SoundHelix",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    color: "#e8d5c4",
  },
  {
    name: "Ambient Chill",
    artist: "SoundHelix",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    color: "#c4d5e8",
  },
  {
    name: "Electronic Vibes",
    artist: "SoundHelix",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    color: "#d5c4e8",
  },
];

export default function AudioPlayer() {
  const audioRef = useRef(null);
  const progressRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const track = tracks[currentTrack];

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handlePrev = () => {
    const prevIndex = currentTrack === 0 ? tracks.length - 1 : currentTrack - 1;
    setCurrentTrack(prevIndex);
    setCurrentTime(0);
    setTimeout(() => {
      audioRef.current.load();
      audioRef.current.play();
      setIsPlaying(true);
    }, 100);
  };

  const handleNext = () => {
    const nextIndex = (currentTrack + 1) % tracks.length;
    setCurrentTrack(nextIndex);
    setCurrentTime(0);
    setTimeout(() => {
      audioRef.current.load();
      audioRef.current.play();
      setIsPlaying(true);
    }, 100);
  };

  const handleToggleMute = () => {
    audioRef.current.muted = !audioRef.current.muted;
    setIsMuted(!isMuted);
  };

  const handleVolumeUp = () => {
    const newVol = Math.min(1, +(volume + 0.1).toFixed(1));
    audioRef.current.volume = newVol;
    setVolume(newVol);
    if (isMuted) {
      audioRef.current.muted = false;
      setIsMuted(false);
    }
  };

  const handleVolumeDown = () => {
    const newVol = Math.max(0, +(volume - 0.1).toFixed(1));
    audioRef.current.volume = newVol;
    setVolume(newVol);
  };

  const handleProgressClick = (e) => {
    const rect = progressRef.current.getBoundingClientRect();
    const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    audioRef.current.currentTime = percent * duration;
  };

  const formatTime = (t) => {
    if (isNaN(t)) return "0:00";
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center pt-10">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-6 border border-gray-100">

        {/* Album Art */}
        <div
          className="w-full aspect-square rounded-2xl mb-6 relative overflow-hidden border-2 border-gray-200 flex items-center justify-center"
          style={{ backgroundColor: track.color }}
        >
          <div
            className={`w-28 h-28 border-[6px] border-gray-800/10 rounded-full flex items-center justify-center ${isPlaying ? "animate-spin" : ""}`}
            style={{ animationDuration: "4s" }}
          >
            <div className="w-10 h-10 bg-gray-800/10 rounded-full" />
          </div>
        </div>

        {/* Song Info */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-gray-900 font-bold text-lg leading-tight">{track.name}</h2>
            <p className="text-gray-400 text-sm">{track.artist}</p>
          </div>
          <button
            onClick={handleToggleMute}
            className="w-10 h-10 flex items-center justify-center cursor-pointer"
            title={isMuted ? "Bật tiếng" : "Tắt tiếng"}
          >
            {isMuted ? (
              <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            )}
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mb-5">
          <div
            ref={progressRef}
            onClick={handleProgressClick}
            className="w-full h-1.5 bg-gray-200 rounded-full cursor-pointer group relative"
          >
            <div
              className="h-full bg-gray-800 rounded-full relative transition-all duration-100"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-gray-800 rounded-full shadow-md -mr-1.5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-1.5">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Main Controls */}
        <div className="flex items-center justify-center gap-6 mb-6">
          {/* Volume Down */}
          <button
            onClick={handleVolumeDown}
            className="flex flex-col items-center gap-0.5 text-gray-400 hover:text-gray-800 transition-colors cursor-pointer"
            title="Giảm âm lượng"
          >
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" d="M5 12h14" />
              </svg>
            </div>
            <span className="text-[9px] font-medium">VOL-</span>
          </button>

          {/* Previous */}
          <button
            onClick={handlePrev}
            className="w-9 h-9 flex items-center justify-center text-gray-800 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
            </svg>
          </button>

          {/* Play / Pause */}
          <button
            onClick={handlePlayPause}
            className="w-14 h-14 bg-gray-900 rounded-full flex items-center justify-center text-white hover:bg-gray-700 active:scale-95 transition-all cursor-pointer shadow-md"
          >
            {isPlaying ? (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              <svg className="w-6 h-6 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          {/* Next */}
          <button
            onClick={handleNext}
            className="w-9 h-9 flex items-center justify-center text-gray-800 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
            </svg>
          </button>

          {/* Volume Up */}
          <button
            onClick={handleVolumeUp}
            className="flex flex-col items-center gap-0.5 text-gray-400 hover:text-gray-800 transition-colors cursor-pointer"
            title="Tăng âm lượng"
          >
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" d="M12 5v14M5 12h14" />
              </svg>
            </div>
            <span className="text-[9px] font-medium">VOL+</span>
          </button>
        </div>

        {/* Volume bar */}
        <div className="flex items-center gap-2 mb-6 px-2">
          <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M11 5L6 9H2v6h4l5 4V5z" />
          </svg>
          <div className="flex-1 h-1 bg-gray-200 rounded-full">
            <div
              className="h-full bg-gray-800 rounded-full transition-all duration-200"
              style={{ width: `${Math.round(volume * 100)}%` }}
            />
          </div>
          <span className="text-xs text-gray-400 w-8 text-right">{Math.round(volume * 100)}%</span>
        </div>

        {/* Waveform decoration */}
        <div className="flex items-end justify-center gap-[3px] h-10 px-4">
          {Array.from({ length: 30 }).map((_, i) => {
            const h = isPlaying
              ? 8 + Math.abs(Math.sin((i * 0.7) + (currentTime * 2))) * 24
              : 4 + Math.abs(Math.sin(i * 0.5)) * 12;
            return (
              <div
                key={i}
                className="w-[3px] bg-gray-800 rounded-full transition-all duration-200"
                style={{ height: `${h}px` }}
              />
            );
          })}
        </div>

        {/* Track list */}
        <div className="mt-6 pt-4 border-t border-gray-100">
          <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold mb-3">
            Danh sách phát
          </p>
          <div className="space-y-1">
            {tracks.map((t, i) => (
              <button
                key={i}
                onClick={() => {
                  setCurrentTrack(i);
                  setCurrentTime(0);
                  setTimeout(() => {
                    audioRef.current.load();
                    audioRef.current.play();
                    setIsPlaying(true);
                  }, 100);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors cursor-pointer text-left ${
                  currentTrack === i
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                <span className={`w-7 h-7 flex items-center justify-center rounded-md text-xs font-medium ${
                  currentTrack === i ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-400"
                }`}>
                  {currentTrack === i && isPlaying ? "♪" : i + 1}
                </span>
                <div>
                  <p className="text-sm font-medium">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.artist}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Hidden Audio */}
      <audio
        ref={audioRef}
        src={tracks[currentTrack].src}
        onTimeUpdate={() => setCurrentTime(audioRef.current.currentTime)}
        onLoadedMetadata={() => setDuration(audioRef.current.duration)}
        onEnded={handleNext}
      />
    </div>
  );
}
