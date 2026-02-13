import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import portraitImg from "@/assets/portraitImg.webp";

const MottoSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const circleScale = useTransform(
    scrollYProgress,
    [0, 0.4, 0.6],
    [0.3, 1, 1.1],
  );
  const circleY = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -60]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [80, 0]);
  const labelOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
  const portraitOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 0.5]);

  const lines = [
    { text: "GOOD DESIGN", outlineOnly: true },
    { text: "IS HONEST", outlineOnly: false },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center py-32"
    >
      {/* Portrait background */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ opacity: portraitOpacity }}
      >
        <img
          src={portraitImg}
          alt="Portrait"
          className="h-auto w-auto object-cover object-center"
        />
      </motion.div>

      {/* SVG mask with circle */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1920 1080"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <clipPath id="circle-mask">
              <motion.circle
                cx="960"
                cy="500"
                r="280"
                style={{
                  scale: circleScale,
                  translateY: circleY,
                }}
              />
            </clipPath>
          </defs>

          {/* Orange circle background */}
          <motion.circle
            cx="960"
            cy="500"
            r="280"
            fill="hsl(16, 85%, 58%)"
            style={{
              scale: circleScale,
              translateY: circleY,
            }}
          />
        </svg>
      </div>

      {/* Text layer - behind the circle (outline text) */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center"
        style={{ y: textY }}
      >
        {/* Label */}
        <motion.span
          className="font-body text-black tracking-[0.4em] uppercase mb-8 z-50"
          style={{ opacity: labelOpacity }}
        >
          My Motto
        </motion.span>

        {/* Main text lines */}
        <div className="relative">
          {lines.map((line, i) => (
            <motion.h2
              key={i}
              className={`font-display text-[clamp(3rem,10vw,19rem)] leading-[0.9] tracking-tight ${
                line.outlineOnly ? "text-stroke-foreground" : "text-foreground"
              }`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.15, duration: 0.6, ease: "easeOut" }}
            >
              {line.text}
            </motion.h2>
          ))}

          {/* Overlapping text inside circle - uses SVG foreignObject */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ clipPath: "url(#circle-mask)" }}
          >
            <div className="flex flex-col items-center text-center w-full">
              <span className="font-body text-black tracking-[0.4em] uppercase  mb-8">
                My Motto
              </span>
              {lines.map((line, i) => (
                <h2
                  key={i}
                  className="font-display text-[clamp(3rem,10vw,9rem)] leading-[0.9] tracking-tight text-background"
                >
                  {line.text}
                </h2>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary/40"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.4,
          }}
        />
      ))}
    </section>
  );
};

export default MottoSection;
