import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const history = [
  { year: "NOW", title: "Design Lead", subtitle: "Self-lead Designer", company: "Fantasy Interactive" },
  { year: "2016", title: "Senior Product Designer", subtitle: "Regular Web Designer", company: "Interactive Labs" },
  { year: "2012", title: "Art Director", subtitle: "Photoshop Doodler", company: "DR Com Group" },
  { year: "2009", title: "Flash Designer", subtitle: "Jurassic Designer", company: "DR Com Group" },
];

const ExperienceSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-32 md:py-48 px-8 md:px-20 lg:px-32">
      <div ref={ref}>
        <motion.p
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-label mb-8"
        >
          Experience
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-body text-3xl md:text-5xl font-light leading-tight mb-20 max-w-4xl"
        >
          Over <span className="text-primary font-semibold">a decade</span> of experience
          in interactive design and working with some of the most talented people in the business
        </motion.h2>

        <div>
          {history.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.12 }}
              className="flex items-center gap-8 md:gap-16 border-b border-border py-6 md:py-8 group cursor-pointer"
              data-cursor-hover
            >
              <motion.span
                whileHover={{ scale: 1.1 }}
                className="font-display text-2xl md:text-4xl text-primary w-20 md:w-24 shrink-0"
              >
                {item.year}
              </motion.span>
              <div className="flex-1 flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h4 className="font-body text-lg md:text-xl font-medium text-foreground group-hover:text-primary transition-colors duration-500">
                    {item.title}
                  </h4>
                  <p className="text-xs text-muted-foreground/50 font-body mt-0.5 group-hover:text-muted-foreground transition-colors duration-500">
                    {item.subtitle}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground font-body mt-1 md:mt-0">{item.company}</p>
              </div>
              <motion.div
                className="hidden md:block w-8 h-[1px] bg-muted-foreground/30 group-hover:bg-primary group-hover:w-16 transition-all duration-500"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
