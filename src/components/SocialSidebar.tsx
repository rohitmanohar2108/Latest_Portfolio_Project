import { motion } from "framer-motion";
import { Globe, Instagram, Youtube, Linkedin, Github } from "lucide-react";

const socials = [
  { icon: Globe, href: "https://rohit-dev-2026.vercel.app/", label: "Website" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Github, href: "https://github.com/rohitmanohar2108", label: "Github" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/rohit-manohar-80b949207/", label: "LinkedIn" },
];

const SocialSidebar = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 1.2 }}
      className="fixed left-6 md:left-10 top-1/2 -translate-y-1/2 mt-48 ml-9 z-40 hidden md:flex flex-col gap-8"
    >
      {socials.map((s, i) => (
        <motion.a
          key={i}
          href={s.href}
          aria-label={s.label}
          whileHover={{ scale: 1.3, x: 4 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className="text-muted-foreground hover:text-primary transition-colors duration-300"
          data-cursor-hover
        >
          <s.icon size={26} strokeWidth={1.5} />
        </motion.a>
      ))}
    </motion.div>
  );
};

export default SocialSidebar;
