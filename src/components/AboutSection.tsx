import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const AboutSection = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-150px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const dotY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  // Split text for word-by-word animation
  const words1 = "I'm a".split(" ");
  const highlight = ["selectively", "skilled"];
  const words2 = "product designer with strong focus on producing high quality &".split(" ");
  const words3 = "impactful digital experience.".split(" ");
  const allWords = [
    ...words1.map((w) => ({ text: w, type: "normal" as const })),
    ...highlight.map((w) => ({ text: w, type: "highlight" as const })),
    ...words2.map((w) => ({ text: w, type: "normal" as const })),
    ...words3.map((w) => ({ text: w, type: "dim" as const })),
  ];

  return (
    <section id="about" ref={ref} className="relative py-32 md:py-48 px-8 md:px-20 lg:px-32">
      {/* Floating coral dot */}
      <motion.div
        style={{ y: dotY }}
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="w-5 h-5 rounded-full bg-primary absolute right-1/4 top-24"
      />

      <motion.p
        initial={{ opacity: 0, x: -30 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="section-label mb-12"
      >
        About Me
      </motion.p>

      <div className="max-w-5xl">
        <h2 className="font-body text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-light max-w-max leading-tight">
          {allWords.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.05 * i, ease: "easeOut" }}
              className={`inline-block mr-[0.3em] ${
                word.type === "highlight"
                  ? "text-primary font-semibold"
                  : word.type === "dim"
                  ? "text-muted-foreground"
                  : "text-foreground"
              }`}
            >
              {word.text}
            </motion.span>
          ))}
        </h2>
      </div>
    </section>
  );
};

export default AboutSection;
