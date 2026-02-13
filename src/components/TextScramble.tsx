import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CHARS = "!<>-_\\/[]{}—=+*^?#________ABCDEFGHIJKLMNOPQRSTUVWXYZ";

interface TextScrambleProps {
  text: string;
  trigger?: "load" | "scroll" | "hover";
  className?: string;
  speed?: number;
  delay?: number;
  as?: string;
}

const TextScramble = ({
  text,
  trigger = "load",
  className = "",
  speed = 0.04,
  delay = 0,
  as: Tag = "span",
}: TextScrambleProps) => {
  const containerRef = useRef<HTMLElement>(null);
  const [displayed, setDisplayed] = useState(trigger === "load" ? "" : text);
  const animatingRef = useRef(false);
  const hasTriggeredRef = useRef(false);

  const scramble = useCallback(() => {
    if (animatingRef.current) return;
    animatingRef.current = true;

    const chars = text.split("");
    const resolved = new Array(chars.length).fill(false);
    const current = new Array(chars.length).fill("");
    let frame = 0;

    const update = () => {
      frame++;
      for (let i = 0; i < chars.length; i++) {
        if (resolved[i]) {
          current[i] = chars[i];
        } else if (chars[i] === " ") {
          current[i] = " ";
          resolved[i] = true;
        } else {
          current[i] = CHARS[Math.floor(Math.random() * CHARS.length)];
          if (frame > (i + 1) * (1 / speed) * 0.06) {
            resolved[i] = true;
          }
        }
      }
      setDisplayed(current.join(""));

      if (resolved.every(Boolean)) {
        animatingRef.current = false;
        setDisplayed(text);
      } else {
        requestAnimationFrame(update);
      }
    };

    // Start with all scrambled
    setDisplayed(chars.map(c => c === " " ? " " : CHARS[Math.floor(Math.random() * CHARS.length)]).join(""));
    requestAnimationFrame(update);
  }, [text, speed]);

  useEffect(() => {
    if (trigger === "load" && !hasTriggeredRef.current) {
      hasTriggeredRef.current = true;
      const timer = setTimeout(scramble, delay * 1000);
      return () => clearTimeout(timer);
    }

    if (trigger === "scroll" && containerRef.current) {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 80%",
        once: true,
        onEnter: () => {
          setTimeout(scramble, delay * 1000);
        },
      });
      return () => ScrollTrigger.getAll().forEach(t => t.kill());
    }
  }, [trigger, scramble, delay]);

  const handleMouseEnter = () => {
    if (trigger === "hover") {
      scramble();
    }
  };

  return (
    <div
      ref={containerRef as any}
      className={`font-mono ${className}`}
      onMouseEnter={handleMouseEnter}
      style={{ whiteSpace: "pre-wrap", display: Tag === "span" ? "inline" : undefined }}
    >
      {displayed}
    </div>
  );
};

export default TextScramble;
