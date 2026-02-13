
import { useRef } from "react";
import { motion, useInView } from "framer-motion";


const socialLinks = [
  { label: "Dribbble", href: "#" },
  { label: "Youtube", href: "#" },
  { label: "Linkedin", href: "#" },
];

const socialLinks2 = [
  { label: "Instagram", href: "#" },
  { label: "Facebook", href: "#" },
  { label: "Behance", href: "#" },
];

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
          {label}
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

const Footer = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <footer ref={ref} className="relative bg-black border-t border-border py-16 md:py-24 px-6 md:px-16 lg:px-24 overflow-hidden">
      {/* Floating orb */}
      <motion.div
        className="absolute top-0 right-1/3 w-24 h-24 md:w-32 md:h-32 rounded-full bg-primary/80 blur-sm -translate-y-1/2"
        animate={isInView ? {
          y: ["-50%", "-45%", "-50%"],
          scale: [1, 1.05, 1],
        } : {}}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

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
              hello@yourname.com
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

export default Footer;
