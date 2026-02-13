import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  SiReact,
  SiNodedotjs,
  SiJavascript,
  SiTypescript,
  SiThreedotjs,
  SiTailwindcss,
  SiFigma,
  SiPython,
  SiCplusplus,
  SiC,
  SiMysql,
  SiExpress,
  SiPostgresql,
  SiMongodb,
  SiGithub,
  SiGit,
  SiPostman,
  SiDocker,
  SiKubernetes,
} from "react-icons/si";
import TextScramble from "@/components/TextScramble";
import { C } from "vitest/dist/chunks/reporters.d.BFLkQcL6.js";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  {
    name: "C",
    icon: SiC,
    description:
      "Low-level programming, memory management, and high-performance system development",
    color: "210 60% 45%", // Blue
  },
  {
    name: "C++",
    icon: SiCplusplus,
    description:
      "Object-oriented design, STL, and performance-critical applications",
    color: "210 60% 50%",
  },
  {
    name: "Python",
    icon: SiPython,
    description:
      "Data structures, automation, scripting, and backend development",
    color: "210 60% 50%",
  },
  {
    name: "SQL",
    icon: SiMysql,
    description:
      "Relational database design, complex queries, indexing, and optimization",
    color: "200 60% 50%",
  },
  {
    name: "JavaScript",
    icon: SiJavascript,
    description:
      "Modern ES2024+, asynchronous programming, closures, and DOM manipulation",
    color: "50 95% 55%",
  },
  {
    name: "TypeScript",
    icon: SiTypescript,
    description:
      "Type-safe scalable architectures with generics and advanced typing",
    color: "210 70% 55%",
  },
  {
    name: "ReactJS",
    icon: SiReact,
    description:
      "Component-driven UI, hooks, state management, and high-performance rendering",
    color: "190 90% 55%",
  },
  {
    name: "Node.js",
    icon: SiNodedotjs,
    description:
      "Scalable backend systems, REST APIs, and event-driven architecture",
    color: "120 45% 45%",
  },
  {
    name: "Express.js",
    icon: SiExpress,
    description: "Minimal and flexible Node.js framework for robust APIs",
    color: "0 0% 80%",
  },
  {
    name: "MySQL",
    icon: SiMysql,
    description:
      "Structured data storage, normalization, indexing, and ACID compliance",
    color: "200 70% 45%",
  },
  {
    name: "PostgreSQL",
    icon: SiPostgresql,
    description:
      "Advanced relational database features, indexing, and performance tuning",
    color: "210 60% 40%",
  },
  {
    name: "MongoDB",
    icon: SiMongodb,
    description:
      "NoSQL document databases, schema design, and aggregation pipelines",
    color: "120 55% 40%",
  },

  {
    name: "GitHub",
    icon: SiGithub,
    description:
      "Version control collaboration, pull requests, and CI/CD workflows",
    color: "0 0% 90%",
  },
  {
    name: "Git",
    icon: SiGit,
    description:
      "Distributed version control, branching strategies, and team collaboration",
    color: "15 90% 55%",
  },

  {
    name: "Postman",
    icon: SiPostman,
    description: "API testing, automation, and request lifecycle debugging",
    color: "20 95% 55%",
  },

  {
    name: "Docker",
    icon: SiDocker,
    description:
      "Containerization, image management, and deployment consistency",
    color: "200 80% 55%",
  },
  {
    name: "Kubernetes",
    icon: SiKubernetes,
    description:
      "Container orchestration, scaling, and production-grade deployments",
    color: "220 70% 55%",
  },
];

const SkillRow = ({
  skill,
  index,
}: {
  skill: (typeof skills)[0];
  index: number;
}) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rowRef.current) return;

    // Slide in from alternating sides
    const fromX = index % 2 === 0 ? -120 : 120;

    gsap.fromTo(
      rowRef.current,
      { opacity: 0, x: fromX, skewX: index % 2 === 0 ? -3 : 3 },
      {
        opacity: 1,
        x: 0,
        skewX: 0,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: rowRef.current,
          start: "top 88%",
          once: true,
        },
      },
    );

    // Animate the separator line
    if (lineRef.current) {
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.4,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: lineRef.current,
            start: "top 90%",
            once: true,
          },
        },
      );
    }

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, [index]);

  // Hover expand animation
  useEffect(() => {
    if (!contentRef.current || !iconRef.current) return;

    if (isHovered) {
      gsap.to(contentRef.current, {
        height: "auto",
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
      });
      gsap.to(iconRef.current, {
        scale: 1.3,
        rotate: 15,
        duration: 0.6,
        ease: "elastic.out(1, 0.5)",
      });
    } else {
      gsap.to(contentRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: "power3.in",
      });
      gsap.to(iconRef.current, {
        scale: 1,
        rotate: 0,
        duration: 0.4,
        ease: "power2.out",
      });
    }
  }, [isHovered]);

  const Icon = skill.icon;

  return (
    <div
    id="tech stack"
      ref={rowRef}
      className="opacity-0 relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Hover background band */}
      <div
        className="absolute inset-0 transition-all duration-500 -mx-6 md:-mx-16 lg:-mx-52 px-6 md:px-16 lg:px-24"
        style={{
          background: isHovered
            ? `linear-gradient(90deg, hsl(${skill.color} / 0.15), hsl(${skill.color} / 0.05))`
            : "transparent",
        }}
      />

      <div className="relative z-10 py-6 md:py-8 flex items-center gap-6 md:gap-12">
        {/* Index number */}
        <span
          className="font-mono text-xs md:text-sm transition-colors duration-300 w-8 shrink-0"
          style={{
            color: isHovered
              ? `hsl(${skill.color})`
              : "hsl(var(--muted-foreground))",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Icon */}
        <div ref={iconRef} className="shrink-0">
          <Icon
            className="w-8 h-8 md:w-10 md:h-10 transition-colors duration-300"
            style={{
              color: isHovered
                ? `hsl(${skill.color})`
                : "hsl(var(--muted-foreground) / 0.4)",
            }}
          />
        </div>

        {/* Skill name - massive typography */}
        <h3
        className="text-4xl sm:text-5xl md:text-7xl lg:text-7xl 
font-bold tracking-tighter leading-none select-none
transition-all duration-500
group-hover:translate-x-4"

          style={{
            color: isHovered
              ? `hsl(${skill.color})`
              : "hsl(var(--muted-white) / 0.25)",
            textShadow: isHovered
              ? `0 0 60px hsl(${skill.color} / 0.3)`
              : "hsl(var(--muted-foreground) / 0.4)",
          }}
        >
          <TextScramble text={skill.name} trigger="scroll" speed={0.04} />
        </h3>

        {/* View circle indicator */}
      </div>

      {/* Expandable description */}

      {/* Separator line */}
      <div
        ref={lineRef}
        className="h-px w-full origin-left"
        style={{
          background: isHovered
            ? `linear-gradient(90deg, hsl(${skill.color} / 0.5), transparent)`
            : "hsl(var(--border) / 0.4)",
        }}
      />
    </div>
  );
};

const SkillsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headingRef.current) return;

    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: 80 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 85%",
          once: true,
        },
      },
    );

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-32 px-6 md:px-16 lg:px-52 relative overflow-hidden"
    >
      <div className="relative z-10">
        {/* Header */}
        <div ref={headingRef} className="mb-16 opacity-0">
          <p className="section-label  mb-4">
            <TextScramble text="Core Stack" trigger="scroll" speed={0.05} />
          </p>

          <div className="line-accent w-24" />
        </div>

        {/* Skill Rows */}
        <div>
          {skills.map((skill, i) => (
            <SkillRow key={skill.name} skill={skill} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
