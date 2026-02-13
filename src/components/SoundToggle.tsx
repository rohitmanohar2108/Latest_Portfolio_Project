import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import wolfkingslast from "@/assets/lvbratija-the-wolf-kings-last-horn-440237.mp3";

const AMBIENT_SOUNDS = [wolfkingslast];

const SoundToggle = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(AMBIENT_SOUNDS[0]);
    audio.loop = true;
    audio.volume = 0;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const fadeAudio = (
    audio: HTMLAudioElement,
    targetVolume: number,
    duration: number,
  ) => {
    const startVolume = audio.volume;
    const diff = targetVolume - startVolume;
    const steps = 30;
    const stepDuration = duration / steps;
    let step = 0;

    const interval = setInterval(() => {
      step++;
      audio.volume = Math.max(
        0,
        Math.min(1, startVolume + (diff * step) / steps),
      );
      if (step >= steps) clearInterval(interval);
    }, stepDuration);
  };

  const toggle = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      fadeAudio(audioRef.current, 0, 800);
      setTimeout(() => audioRef.current?.pause(), 850);
    } else {
      audioRef.current.play().catch((error) => {
        console.error("Audio playback error:", error);
      });
      fadeAudio(audioRef.current, 0.12, 1200);
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.8 }}
      onClick={toggle}
      className="fixed bottom-6 right-6 md:right-10 z-50 flex items-center gap-3 group"
      aria-label={isPlaying ? "Mute sound" : "Play sound"}
      data-cursor-hover
    >
      <motion.span
        animate={!isPlaying ? { opacity: [0.4, 1, 0.4] } : { opacity: 1 }}
        transition={{
          duration: 2,
          repeat: !isPlaying ? Infinity : 0,
          ease: "easeInOut",
        }}
        className="text-[14px] font-body tracking-[0.2em] uppercase 
  text-muted-foreground group-hover:text-foreground 
  transition-colors duration-300 hidden md:block"
        style={{ writingMode: "vertical-rl" }}
      >
        Sound {isPlaying ? "On" : "Off"}
      </motion.span>

      <div className="relative">
        {/* Audio visualizer bars when playing */}
        <AnimatePresence>
          {isPlaying && (
            <div className="absolute right-14 top-1/2 -translate-y-1/2 flex items-end gap-[2px]">
              {[0, 1, 2].map((bar) => (
                <motion.div
                  key={bar}
                  initial={{ height: 2 }}
                  animate={{ height: [4, 12, 6, 14, 4] }}
                  exit={{ height: 2 }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: bar * 0.15,
                    ease: "easeInOut",
                  }}
                  className="w-[2px] bg-primary rounded-full"
                />
              ))}
            </div>
          )}
        </AnimatePresence>

        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={!isPlaying ? { scale: [1, 1.1, 1] } : { scale: 1 }}
          transition={{
            duration: 1.5,
            repeat: !isPlaying ? Infinity : 0,
            ease: "easeInOut",
          }}
          className="text-muted-foreground group-hover:text-foreground transition-colors duration-300"
        >
          {isPlaying ? <Volume2 size={18} /> : <VolumeX size={18} />}
        </motion.div>
      </div>
    </motion.button>
  );
};

export default SoundToggle;
