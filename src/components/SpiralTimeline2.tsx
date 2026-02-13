import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Milestone {
  year: string;
  title: string;
  description: string;
  skills: string[];
}

const milestones: Milestone[] = [
  {
    year: "2020",
    title: "SECONDARY",
    description: "Murtizapur Highschool — 10th Board: 91.80%, Art Grading B+, 2nd place Taluka-level science exhibition.",
    skills: ["91.80%", "Art B+", "Science Exhibition"],
  },
  {
    year: "2022",
    title: "HIGHER SEC",
    description: "Dharampeth M.P. Deo Memorial Science College, Nagpur — AIR 4891 in JEE Main (99.46 percentile), SOF Gold Medal.",
    skills: ["JEE 99.46%", "SOF Gold"],
  },
  {
    year: "2022–26",
    title: "B.TECH",
    description: "Computer Science & Engineering — Team leader for OS Simulator course project.",
    skills: ["CS Engineering", "OS Simulator"],
  },
  {
    year: "2023–26",
    title: "TEDx NITK",
    description: "Executive Member — Mentored 15+ students, designed event posters, contributed to media strategies.",
    skills: ["Mentorship", "Design", "Media"],
  },
  {
    year: "NOW",
    title: "CAREER",
    description: "Final year — preparing for SWE roles, building core CS knowledge in DSA, Full-Stack, and AI/ML.",
    skills: ["DSA", "Full-Stack", "AI/ML"],
  },
];

const SpiralTimeline2 = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      milestones.forEach((_, index) => {
        const row = document.querySelector(`[data-row="${index}"]`);
        if (row) {
          gsap.fromTo(
            row,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power3.out",
              scrollTrigger: {
                trigger: row,
                start: "top 88%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative">
      {milestones.map((milestone, index) => {
        const isHovered = hoveredIndex === index;
        const isAnyHovered = hoveredIndex !== null;

        return (
          <div
            key={index}
            data-row={index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="relative cursor-pointer overflow-hidden border-b border-border/20"
          >
            {/* Coral background slide */}
            <motion.div
              className="absolute inset-0 bg-primary z-0"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: isHovered ? 1 : 0 }}
              transition={{ duration: 0.45, ease: [0.33, 1, 0.68, 1] }}
              style={{ originX: 0 }}
            />

            <div className="relative z-10 flex items-start md:items-center flex-col md:flex-row gap-4 md:gap-0 px-6 md:px-16 lg:px-24 py-8 md:py-10">
              {/* Bold Year */}
              <motion.h3
                animate={{ x: isHovered ? 12 : 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className={`font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-none tracking-tighter transition-colors duration-300 select-none shrink-0 ${
                  isHovered
                    ? "text-primary-foreground"
                    : isAnyHovered
                      ? "text-muted-foreground/20"
                      : "text-muted-foreground/30"
                }`}
              >
                {milestone.year}
              </motion.h3>

              {/* Title + Description + Skills on hover */}
              <div className="md:ml-12 lg:ml-20 flex-1 min-w-0">
                <motion.p
                  animate={{ x: isHovered ? 8 : 0 }}
                  transition={{ duration: 0.3 }}
                  className={`font-display text-sm md:text-base font-semibold tracking-widest uppercase transition-colors duration-300 ${
                    isHovered
                      ? "text-primary-foreground"
                      : "text-muted-foreground/50"
                  }`}
                >
                  {milestone.title}
                </motion.p>

                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, y: 10, height: 0 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <p className="text-sm leading-relaxed text-primary-foreground/75 mt-2 max-w-lg">
                        {milestone.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mt-3">
                        {milestone.skills.map((skill, i) => (
                          <motion.span
                            key={i}
                            initial={{ opacity: 0, scale: 0.85 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.06 * i, duration: 0.25 }}
                            className="text-xs px-3 py-1 rounded-full bg-primary-foreground/15 text-primary-foreground/90 font-medium"
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default SpiralTimeline2;
