import { motion } from "framer-motion";
import siteConfig from "../../config/siteConfig";

export default function Navbar({ onStartCheckout }) {
  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 inset-x-0 z-40 border-b border-white/[0.06] bg-[#08090d]/70 backdrop-blur-md"
    >
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-lg border border-[#a3ff00]/30 bg-[#a3ff00]/[0.06] font-mono text-xs text-[#a3ff00]">
            {siteConfig.brand.mark}
          </span>
          <span className="text-sm text-[#e8eaf0] tracking-tight">
            {siteConfig.brand.fullName}
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {siteConfig.nav.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="text-sm text-[#9aa0b0] hover:text-[#e8eaf0] transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          onClick={onStartCheckout}
          className="rounded-full border border-[#22d3ee]/40 bg-[#22d3ee]/[0.08] px-4 py-2 text-sm text-[#22d3ee] hover:bg-[#22d3ee]/[0.15] transition-colors"
        >
          {siteConfig.hero.ctaPrimary.label}
        </button>
      </div>
    </motion.header>
  );
}
