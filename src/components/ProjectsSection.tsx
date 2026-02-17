import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Github } from "lucide-react";
import TextScramble from "./TextScramble";

const projects = [
  {
    title: "AirWise",
    category: "Full-Stack System",
    year: "2025",
    description:
      "A scalable airline reservation platform enabling seamless flight discovery, secure bookings, and transaction tracking. Built with a normalized MySQL architecture and token-based authentication for reliability and security.",
    github: "https://github.com/rohitmanohar2108/Airline_Reservation_System",
  },
  {
    title: "Imagery",
    category: "AI / Deep Learning",
    year: "2025",
    description:
      "An intelligent image enhancement platform focused on low-light correction and super-resolution. Powered by CNN architectures and self-supervised learning techniques for visually refined outputs.",
    github: "https://github.com/rohitmanohar2108/image-resolution",
  },
  {
    title: "Scalable",
    category: "Real-Time Systems",
    year: "2025",
    description:
      "A distributed real-time chat application engineered for performance and responsiveness. Achieved ultra-low latency messaging using event-driven architecture and efficient data synchronization.",
    github: "https://github.com/rohitmanohar2108/Real_Time_Chat_Application",
  },
  {
    title: "Crypto Simulator",
    category: "Quantitative Systems",
    year: "2025",
    description:
      "A low-latency execution cost simulator modeling real-time orderbook dynamics. Designed to analyze slippage and trading impact using data-driven quantitative techniques.",
    github: "https://github.com/rohitmanohar2108/Crypto-Trade-Simulator",
  },
];

const ProjectsSection = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      id="projects"
      ref={ref}
      className="relative py-32 md:py-48 overflow-hidden"
    >
      {/* Section Label */}
      <div className="px-8 md:px-20 lg:px-52">
        <motion.p
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-label mb-16"
        >
          Projects
        </motion.p>
      </div>

      {/* Project List */}
      <div>
        {projects.map((project, i) => {
          const isHovered = hoveredIndex === i;
          const isAnyHovered = hoveredIndex !== null;

          return (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.08 * i }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              data-cursor-text="</>"
              className="relative group cursor-pointer font-display"
            >
              {/* Hover background */}
              <motion.div
                className="absolute inset-0 bg-primary"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: isHovered ? 1 : 0 }}
                transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                style={{ originY: 0.5 }}
              />

              <div className="relative flex items-center justify-between px-8 md:px-20 lg:px-52 py-5 md:py-6 border-b border-border/30">
                {/* Left: Index + Title */}
                <div className="flex items-center gap-6 md:gap-10">
                  <motion.span
                    animate={{
                      color: isHovered
                        ? "hsl(20, 8%, 8%)"
                        : "hsl(38, 10%, 50%)",
                    }}
                    transition={{ duration: 0.3 }}
                    className="project-index hidden sm:block"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </motion.span>

                  <motion.h3
                    animate={{
                      color: isHovered
                        ? "hsl(20, 8%, 8%)"
                        : isAnyHovered
                          ? "hsl(38, 10%, 40%)"
                          : "hsl(38, 25%, 82%)",
                      x: isHovered ? 16 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-8xl leading-none tracking-tight"
                  >
                    <TextScramble
                      text={project.title}
                      trigger="scroll"
                      speed={0.04}
                    />
                  </motion.h3>
                </div>

                {/* Right: Description + GitHub */}
                <div className="flex items-center gap-6">
                  <motion.p
                    initial={{ opacity: 0, x: 20 }}
                    animate={{
                      opacity: isHovered ? 1 : 0,
                      x: isHovered ? 0 : 20,
                    }}
                    transition={{ duration: 0.3 }}
                    className="hidden md:block max-w-xs text-base font-body text-primary-foreground/80"
                  >
                    {project.description}
                  </motion.p>

                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    animate={{
                      opacity: isHovered ? 1 : 0,
                      scale: isHovered ? 1 : 0.5,
                    }}
                    transition={{ duration: 0.3 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Github className="w-5 h-5 text-primary-foreground hover:text-primary-foreground/70 transition-colors" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default ProjectsSection;
