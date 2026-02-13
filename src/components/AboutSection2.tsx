import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const AboutSection2 = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const circleY = useTransform(scrollYProgress, [0, 1], [200, -200]);
  const circleScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.6, 1.1, 0.8],
  );
  const textY = useTransform(scrollYProgress, [0, 1], [100, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const words = [
  { text: "I'm a", highlight: true },
  { text: "skilled", highlight: false },
  { text: "full-stack", highlight: false },
  { text: "Developer", highlight: false },
];

const words2 = [
  { text: "focused on", highlight: false },
  { text: "software", highlight: false },
  { text: "engineering,", highlight: false },
];

const words3 = [
  { text: "artificial", highlight: false },
  { text: "intelligence &", highlight: false },
  { text: "scalable", highlight: false },
];

const words4 = [
  { text: "systems,", highlight: false },
  { text: "building", highlight: false },
  { text: "impactful products.", highlight: false },
];


  const allLines = [words, words2, words3, words4];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-[vh] overflow-hidden "
    >
      {/* Sticky container */}
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {/* Parallax Circle */}
        <motion.div
          style={{ y: circleY, scale: circleScale }}
          className="absolute z-0 h-[500px] w-[500px] rounded-full bg-accent md:h-[650px] md:w-[650px] lg:h-[750px] lg:w-[750px]"
        />

        {/* Content */}
        <motion.div
          style={{ y: textY, opacity }}
          className="relative z-10 w-full max-w-7xl  px-6 md:px-12"
        >
          {/* Label */}
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="mb-8 text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground section-label"
          >
            About Me
          </motion.p>

          {/* Big Typography */}
          <div className="space-y-1 md:space-y-2">
            {allLines.map((line, lineIndex) => (
              <div
                key={lineIndex}
                className="flex flex-wrap gap-x-3 md:gap-x-5 leading-[0.9] tracking-tight"
              >
                {line.map((word, wordIndex) => (
                  <motion.span
                    key={`${lineIndex}-${wordIndex}`}
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.7,
                      delay: lineIndex * 0.15 + wordIndex * 0.08,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    viewport={{ once: true, margin: "-50px" }}
                    className={`text-4xl font-bold leading-[1.05] md:text-6xl lg:text-8xl ${
                      word.highlight ? "text-accent" : "text-white"
                    }`}
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {word.text}
                  </motion.span>
                ))}
              </div>
            ))}
          </div>

          {/* Stats row */}
        </motion.div>

        {/* Decorative floating elements */}
      </div>
    </section>
  );
};

export default AboutSection2;
