import { motion } from "framer-motion";

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-start justify-between px-8 py-6 md:px-12 md:py-8">
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.6,
          delay: 0.2,
          type: "spring",
          stiffness: 900,
        }}
        className="relative z-50"
        data-cursor-hover
      >
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className="w-24 h-24 rounded-full bg-foreground/10 border border-foreground/20 flex items-center justify-center backdrop-blur-sm"
        >
          <span className="font-display text-primary text-2xl mt-1">Rohit</span>
        </motion.div>
      </motion.div>

      {/* Nav Links */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="flex flex-col items-end gap-2 text-base font-body tracking-[0.2em] uppercase"
      >
        {[
          "About",
          "Work",
          "My Journey",
          "Tech Stack",
          "Projects",
          "Contact",
        ].map((item, i) => (
          <motion.a
            key={item}
            href={`#${item.toLowerCase()}`}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
            whileHover={{ x: -5 }}
            className="text-muted-foreground hover:text-foreground transition-colors duration-300 relative group"
            data-cursor-hover
          >
            {item}
            <span className="absolute -left-4 top-1/2 -translate-y-1/2 w-0 h-[1px] bg-primary group-hover:w-3 transition-all duration-300" />
          </motion.a>
        ))}
      </motion.div>
    </nav>
  );
};

export default Navigation;
