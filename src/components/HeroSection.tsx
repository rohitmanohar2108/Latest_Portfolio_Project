import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroPortrait from "@/assets/rohit.jpg";

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const circleScale = useTransform(scrollYProgress, [0, 1], [1, 0.6]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const ease: [number, number, number, number] = [0.33, 1, 0.68, 1];

  return (
    <section ref={sectionRef} className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background portrait with parallax */}
      <motion.div
        className="absolute inset-0"
        style={{ y: imageY, scale: imageScale }}
      >
        <motion.img
          initial={{ opacity: 0, scale: 1.15 }}
          animate={{ opacity: 0.35, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          src={heroPortrait}
          alt=""
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-background/50" />
      </motion.div>

      {/* Coral circle with parallax */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
        style={{ scale: circleScale }}
        className="absolute w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full bg-primary/85"
        data-cursor-hover
      />

      {/* Text content with parallax */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-5xl"
        style={{ y: textY, opacity }}
      >
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0em" }}
          animate={{ opacity: 1, letterSpacing: "0.3em" }}
          transition={{ duration: 1, delay: 0.2 }}
          className="section-label mb-6 md:mb-8"
        >
          Rohit Vijay Manohar
        </motion.p>

        {[
          { text: "MAKING", color: "text-foreground", delay: 0.4 },
          { text: "GOOD", color: "text-black", delay: 0.55 },
          { text: "Things", color: "text-black", delay: 0.7 },
          { text: "SINCE", color: "text-foreground", delay: 0.85 },
          { text: "2022", color: "text-foreground", delay: 1.0 },
        ].map((line) => (
          <div key={line.text} className="overflow-hidden">
          <motion.h1
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, delay: line.delay, ease }}
              className={`font-display ${line.color} text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] xl:text-[10rem] leading-[0.9] tracking-tight`}
            >
              {line.text}
            </motion.h1>
          </div>
        ))}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-8 bg-muted-foreground/50"
        />
        <span className="text-[10px] font-body tracking-[0.3em] uppercase text-muted-foreground/50">
          Scroll
        </span>
      </motion.div>
    </section>
  );
};

export default HeroSection;
