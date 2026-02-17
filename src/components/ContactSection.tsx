import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useCallback, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import TextScramble from "./TextScramble";

const SocialLink = ({ label, href, index }: { label: string; href: string; index: number }) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3 text-foreground font-display text-3xl md:text-5xl lg:text-6xl tracking-wide relative overflow-hidden"
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Orange arrow marker */}
      <motion.span
        className="text-primary text-lg md:text-xl inline-block"
        initial={{ rotate: 0, scale: 1 }}
        whileHover={{ rotate: 90, scale: 1.3 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        ◥
      </motion.span>

      <span className="relative">
        {/* Main text */}
        <motion.span
          className="inline-block transition-colors duration-300 group-hover:text-primary"
        >
          <TextScramble text={label} trigger="scroll" speed={0.01} />
        </motion.span>

        {/* Underline */}
        <motion.span
          className="absolute bottom-0 left-0 h-[2px] bg-primary"
          initial={{ width: "0%" }}
          whileHover={{ width: "100%" }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          style={{ width: 0 }}
        />
      </span>

      {/* Hover glow */}
      <motion.span
        className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />
    </motion.a>
  );
};

const ContactSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const Magnetic = ({ children }: { children: React.ReactNode }) => {
    const magneticRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 200, damping: 20 });
    const springY = useSpring(y, { stiffness: 200, damping: 20 });

    const handleMouse = useCallback((e: React.MouseEvent) => {
      const rect = magneticRef.current?.getBoundingClientRect();
      if (!rect) return;
      x.set((e.clientX - rect.left - rect.width / 2) * 0.3);
      y.set((e.clientY - rect.top - rect.height / 2) * 0.3);
    }, [x, y]);

    const reset = useCallback(() => { x.set(0); y.set(0); }, [x, y]);

    return (
      <motion.div
        ref={magneticRef}
        onMouseMove={handleMouse}
        onMouseLeave={reset}
        style={{ x: springX, y: springY }}
        className="inline-block"
      >
        {children}
      </motion.div>
    );
  };

  return (
    <section className="relative py-32 md:py-48 px-8 md:px-20 lg:px-32">
      <div ref={ref}>
        <motion.p
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-label mb-12"
        >
          Contact
        </motion.p>

        <div className="overflow-hidden">
          <motion.h2
            initial={{ y: "100%" }}
            animate={isInView ? { y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.33, 1, 0.68, 1] }}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-none"
          >
            LET'S WORK
          </motion.h2>
        </div>
        <div className="overflow-hidden">
          <motion.h2
            initial={{ y: "100%" }}
            animate={isInView ? { y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.33, 1, 0.68, 1] }}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-none text-primary"
          >
            TOGETHER
          </motion.h2>
        </div>
        

        <motion.a
          href="mailto:hello@example.com"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          whileHover={{ x: 10 }}
          className="inline-flex items-center gap-3 mt-12 font-body text-lg md:text-xl text-muted-foreground hover:text-primary transition-colors duration-300 group"
          data-cursor-text="Email"
        >
          hello@example.com
          <ArrowUpRight
            size={20}
            className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
          />
        </motion.a>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-32 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        >
          <p className="text-xs text-muted-foreground font-body tracking-wide">
            © {new Date().getFullYear()} — All rights reserved
          </p>
          <p className="text-xs text-muted-foreground font-body tracking-wide">
            Designed with passion
          </p>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const socialLinks = [
    
    { label: "Linkedin", href: "https://www.linkedin.com/in/rohit-manohar-80b949207/" },
  ];

  const socialLinks2 = [
    { label: "Github", href: "https://github.com/rohitmanohar2108" },
    
  ];
  const socialLinks3 = [
    
    { label: "Linkedin", href: "https://www.linkedin.com/in/rohit-manohar-80b949207/" },
  ];

  const socialLinks4 = [
    { label: "Github", href: "https://github.com/rohitmanohar2108" },
    
  ];

  return (
    <footer id="contact" ref={ref} className="relative py-16 md:py-24 px-6 md:px-16 lg:px-56 overflow-hidden">
      {/* Floating orb */}
      

      {/* CONNECT label */}
      <motion.p
        className="font-body text-muted-foreground text-xs md:text-sm tracking-[0.3em] uppercase mb-10 md:mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Connect
      </motion.p>

      {/* Main grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
        {/* Column 1 */}
        <div className="flex flex-col gap-2 md:gap-3">
          {socialLinks.map((link, i) => (
            <SocialLink key={link.label} {...link} index={i} />
          ))}
        </div>
        

        {/* Column 2 */}
        <div className="flex flex-col gap-2 md:gap-3">
          {socialLinks2.map((link, i) => (
            <SocialLink key={link.label} {...link} index={i + 3} /> 
          ))}
        </div>
        

        {/* Column 3 - Contact */}
        <motion.div
          className="flex flex-col gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <div className="group cursor-pointer">
            <p className="font-body text-foreground font-semibold text-sm mb-1">Email</p>
            <motion.p
              className="font-body text-muted-foreground text-sm group-hover:text-primary transition-colors duration-300"
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              manoharrohit372@gmail.com
            </motion.p>
          </div>
          <div className="group cursor-pointer">
            <p className="font-body text-foreground font-semibold text-sm mb-1">Phone</p>
            <motion.p
              className="font-body text-muted-foreground text-sm group-hover:text-primary transition-colors duration-300"
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              +1 234 567 890
            </motion.p>
          </div>
        </motion.div>
      </div>

      {/* Bottom divider with animated line */}
      <motion.div
        className="mt-16 md:mt-24 h-px bg-border relative overflow-hidden"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
        style={{ transformOrigin: "left" }}
      >
        <motion.div
          className="absolute top-0 left-0 h-full w-1/4 bg-primary/50"
          animate={{ x: ["0%", "400%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>

      <motion.p
        className="mt-6 font-body text-muted-foreground text-xs tracking-widest text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        © 2026 — All rights reserved
      </motion.p>
    </footer>
  );
};

export { ContactSection, Footer };
export default Footer;
