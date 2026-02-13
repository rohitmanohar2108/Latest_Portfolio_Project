import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { motion, useInView } from "framer-motion";
import { FaCalendar, FaCalendarAlt } from "react-icons/fa";
import TextScramble from "./TextScramble";
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

interface Milestone {
  year: string;
  title: string;
  description: string;
  skills: string[];
}

const milestones: Milestone[] = [
  {
    year: "2020",
    title: "Secondary Education",
    description: "School: Murtizapur Highschool Murtizapur",
    skills: [
      "10 Board: 91.80%",
      "Elementary Art Grading Examination: B+",
      "Securing second place at a Taluka-level science exhibition",
    ],
  },
  {
    year: "2022",
    title: "Higher Secondary Education",
    description: "Collage: Dharampeth M.P. Deo Memorial Science College Nagpur",
    skills: [
      "Secured All India Rank (AIR) 4891 in JEE Main with a 99.46 percentile",
      "Received the Gold Medal of Excellence in the SOF National Science Olympiad.",
    ],
  },
  {
    year: "2022-2026",
    title: "Bachelor of Technology",
    description: "Computer Science and Engineering",
    skills: ["Team leader of OS simulator course project "],
  },
  {
    year: "2023-2026",
    title: "Executive Member",
    description: "TEDx NITK Surathkal Club",
    skills: [
      "Mentored 15+ students under a Summer mentorship program on Canva & illustration tools.",
      "Designed event posters and visual content, contributed to media strategies",
    ],
  },
  {
    year: "Now",
    title: "Final Year • Career Focus",
    description:
      "Actively preparing for software engineering roles and interviews while building a strong core CS knowledge.",
    skills: ["DSA", "Full-Stack Dev", "AI/ML"],
  },
];

const SpiralTimeline = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const glowRef = useRef<SVGCircleElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Generate vertical spiral path
  const generateSpiralPath = () => {
    const points: string[] = [];
    const amplitude = 120; // Horizontal wave amplitude
    const verticalSpacing = 200; // Vertical space between peaks
    const totalHeight = (milestones.length - 1) * verticalSpacing + 200;

    points.push(`M 200 50`);

    for (let i = 0; i < milestones.length; i++) {
      const y = 100 + i * verticalSpacing;
      const isLeft = i % 2 === 0;
      const x = isLeft ? 200 - amplitude : 200 + amplitude;

      if (i === 0) {
        points.push(`C 200 80, ${x} ${y - 40}, ${x} ${y}`);
      } else {
        const prevX = (i - 1) % 2 === 0 ? 200 - amplitude : 200 + amplitude;
        const prevY = 100 + (i - 1) * verticalSpacing;
        points.push(`S ${x} ${y - 40}, ${x} ${y}`);
      }
    }

    return points.join(" ");
  };

  const spiralPath = generateSpiralPath();
  const totalHeight = (milestones.length - 1) * 200 + 250;

  // Calculate milestone positions on the spiral
  const getMilestonePosition = (index: number) => {
    const y = 100 + index * 200;
    const isLeft = index % 2 === 0;
    const x = isLeft ? 200 - 120 : 200 + 120;
    return { x, y, isLeft };
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!pathRef.current || !dotRef.current || !glowRef.current) return;

      const path = pathRef.current;
      const pathLength = path.getTotalLength();

      // Set up the path for drawing
      gsap.set(path, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      });

      // Draw path on scroll
      const drawTl = gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "bottom 40%",
          scrub: 0.5,
          onUpdate: (self) => {
            // Update active milestone based on scroll progress
            const progress = self.progress;
            const newIndex = Math.min(
              Math.floor(progress * milestones.length),
              milestones.length - 1,
            );
            setActiveIndex(newIndex);
          },
        },
      });

      // Animate dot along path
      gsap.to([dotRef.current, glowRef.current], {
        motionPath: {
          path: path,
          align: path,
          alignOrigin: [0.5, 0.5],
        },
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "bottom 40%",
          scrub: 0.5,
        },
      });

      // Animate milestone cards on scroll
      milestones.forEach((_, index) => {
        const card = document.querySelector(`[data-milestone="${index}"]`);
        if (card) {
          gsap.fromTo(
            card,
            { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
            {
              opacity: 1,
              x: 0,
              duration: 0.6,
              scrollTrigger: {
                trigger: card,
                start: "top 80%",
                end: "top 60%",
                toggleActions: "play none none reverse",
              },
            },
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div id="my journey" ref={sectionRef} className="relative z-10 mt-32">
         <div className="px-8 md:px-20 lg:px-52">
        <motion.p
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-label mb-16"
        >
         My Journey
        </motion.p>
      </div>
      {milestones.map((milestone, index) => {
        const isHovered = hoveredIndex === index;
        const isAnyHovered = hoveredIndex !== null;

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 * index }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="relative group cursor-pointer overflow-hidden"
          >
            {/* Coral hover background */}
            <motion.div
              className="absolute inset-0 bg-primary"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: isHovered ? 1 : 0 }}
              transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
              style={{ originX: 0 }}
            />

            <div className="relative flex items-center justify-between px-8 md:px-20 lg:px-52 py-6 border-b border-border/30">
              {/* Left Large Title */}
              <motion.div
                animate={{
                  x: isHovered ? 20 : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                <h3
                  className={`font-display text-5xl sm:text-6xl md:text-7xl lg:text-7xl  leading-none tracking-tight transition-colors duration-300 ${
                    isHovered
                      ? "text-black"
                      : isAnyHovered
                        ? "text-muted-foreground"
                        : "text-foreground"
                  }`}
                >
                 <TextScramble text= {milestone.year} trigger="scroll" speed={0.04} />
                </h3>

                <p
                  className={`text-xl font-semibold mt-2 transition-colors duration-300 ${
                    isHovered ? "text-black/80" : "text-muted-foreground"
                  }`}
                >
                   <TextScramble text={milestone.title} trigger="scroll" speed={0.04} />
                </p>
              </motion.div>

              {/* Right Description */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{
                  opacity: isHovered ? 1 : 0,
                  x: isHovered ? 0 : 20,
                }}
                transition={{ duration: 0.3 }}
                className="hidden md:block max-w-md text-xl text-black/80"
              >
                <p className="mb-3">{milestone.description}</p>

                <div className="flex flex-wrap gap-2">
                  {milestone.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-1 bg-black/10 rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default SpiralTimeline;
