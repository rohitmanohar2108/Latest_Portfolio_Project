import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import TextScramble from "./TextScramble";

const skills = [
  {
    name: "SOFTWARE ENGINEERING",
    description:
      "Designing maintainable, scalable systems using clean architecture, modular design, SOLID principles, and production-ready development practices.",
  },
  {
    name: "FULL-STACK",
    description:
      "Building end-to-end web applications with React, Node.js, and modern backend stacks, focusing on performance, scalability, and reliability.",
  },
  {
    name: "API DESIGN",
    description:
      "Developing secure and well-structured REST and real-time APIs with JWT authentication, validation layers, and clean service abstractions.",
  },
  {
    name: "DATABASE DESIGN",
    description:
      "Designing normalized schemas, optimizing complex queries, and ensuring ACID compliance across relational and distributed databases.",
  },
  {
    name: "REAL-TIME SYSTEMS",
    description:
      "Engineering low-latency systems using WebSockets, Redis Pub/Sub, and event-driven architectures for high-throughput applications.",
  },
  {
    name: "DISTRIBUTED SYSTEMS",
    description:
      "Understanding scalability patterns, concurrency models, fault tolerance, and system design trade-offs in production-scale environments.",
  },
  {
    name: "AI / MACHINE LEARNING",
    description:
      "Building deep learning pipelines and deploying ML models using TensorFlow, CNN architectures, and optimization-driven training workflows.",
  },
  {
    name: "UI / UX & MOTION",
    description:
      "Crafting intuitive interfaces with thoughtful UX decisions and performance-optimized animations for smooth user experiences.",
  },
  {
    name: "OPTIMIZATION",
    description:
      "Enhancing system performance through profiling, caching strategies, query tuning, and reducing latency under load.",
  },
];

const WhatIDoSection = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="work" ref={ref} className="relative py-32 md:py-48 overflow-hidden">
      <div className="px-8 md:px-20 lg:px-52">
        <motion.p
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-label mb-16"
        >
          What I Do
        </motion.p>
      </div>

      <div>
        {skills.map((skill, i) => {
          const isHovered = hoveredIndex === i;
          const isAnyHovered = hoveredIndex !== null;

          return (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.08 * i }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              data-cursor-text="</>"
              className="relative group cursor-pointer "
            >
              {/* Coral highlight background on hover */}
              <motion.div
                className="absolute inset-0 bg-primary"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: isHovered ? 1 : 0 }}
                transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                style={{ originY: 0.5 }}
              />

              <div className="relative flex items-center justify-between px-8 md:px-20 lg:px-52 py-3 md:py-4 border-b border-border/30">
                <motion.h3
                  animate={{
                    color: isHovered 
                      ? "hsl(20, 6%, 10%)"
                      : isAnyHovered
                      ? "hsl(20, 6%, 25%)"
                      : "hsl(38, 25%, 82%)",
                    x: isHovered ? 20 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-7xl leading-none tracking-tight"
                >
                   <TextScramble text={skill.name} trigger="scroll" speed={0.04} />
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, x: 20 }}
                  animate={{
                    opacity: isHovered ? 1 : 0,
                    x: isHovered ? 0 : 20,
                  }}
                  transition={{ duration: 0.3 }}
                  className="hidden md:block max-w-xs text-sm font-body text-primary-foreground/80"
                >
                  {skill.description}
                </motion.p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default WhatIDoSection;
