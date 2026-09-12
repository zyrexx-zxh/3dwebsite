import { motion } from "framer-motion";
import siteConfig from "../config/siteConfig";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export default function Hero({ onStartCheckout, onScrollServices }) {
  const { hero } = siteConfig;

  return (
    <section id="top" className="relative pt-40 pb-28 px-6">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto max-w-3xl text-center"
      >
        <motion.p variants={item} className="text-sm text-[#22d3ee] font-mono">
          {hero.eyebrow}
        </motion.p>

        <motion.h1
          variants={item}
          className="mt-5 text-5xl md:text-6xl font-semibold tracking-tight text-[#e8eaf0] leading-[1.08]"
        >
          {hero.title}
        </motion.h1>

        <motion.p variants={item} className="mt-6 text-lg text-[#9aa0b0] leading-relaxed">
          {hero.subtitle}
        </motion.p>

        <motion.p variants={item} className="mt-3 text-base text-[#7d8394] leading-relaxed">
          {hero.description}
        </motion.p>

        <motion.div variants={item} className="mt-10 flex items-center justify-center gap-4">
          <button
            onClick={onStartCheckout}
            className="rounded-full bg-[#a3ff00] px-6 py-3 text-sm font-medium text-[#08090d] hover:brightness-110 transition-all"
          >
            {hero.ctaPrimary.label}
          </button>
          <button
            onClick={onScrollServices}
            className="rounded-full border border-white/15 px-6 py-3 text-sm text-[#e8eaf0] hover:bg-white/5 transition-colors"
          >
            {hero.ctaSecondary.label}
          </button>
        </motion.div>

        <motion.div
          variants={item}
          className="mt-20 grid grid-cols-3 gap-6 border-t border-white/[0.06] pt-8"
        >
          {hero.stats.map((stat) => (
            <div key={stat.label}>
              <div className="font-mono text-2xl text-[#e8eaf0]">{stat.value}</div>
              <div className="mt-1 text-xs text-[#7d8394]">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
