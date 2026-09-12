import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { formatCurrency } from "../utils/pricing";
import siteConfig from "../config/siteConfig";

export default function ServiceCard({ service, onSelect, featured }) {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 200,
    damping: 20,
  });

  function handleMouseMove(e) {
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      whileHover={{ scale: 1.02 }}
      className={`relative rounded-2xl border p-7 backdrop-blur-xl transition-colors ${
        featured
          ? "border-[#a3ff00]/30 bg-white/[0.05]"
          : "border-white/10 bg-white/[0.03] hover:border-white/20"
      }`}
    >
      {featured && (
        <span className="absolute -top-3 left-7 rounded-full bg-[#a3ff00] px-3 py-1 text-[11px] font-medium text-[#08090d]">
          {service.tag}
        </span>
      )}
      {!featured && service.tag && (
        <span className="text-xs font-mono text-[#22d3ee]">{service.tag}</span>
      )}

      <h3 className="mt-3 text-xl text-[#e8eaf0]">{service.name}</h3>
      <p className="mt-2 text-sm text-[#9aa0b0] leading-relaxed">{service.description}</p>

      <div className="mt-6 font-mono text-3xl text-[#e8eaf0]">
        {formatCurrency(service.basePrice, siteConfig)}
        <span className="text-sm text-[#7d8394] font-sans"> starting</span>
      </div>

      <ul className="mt-6 space-y-2">
        {service.features.map((f) => (
          <li key={f} className="flex items-center gap-2 text-sm text-[#9aa0b0]">
            <span className="h-1 w-1 rounded-full bg-[#22d3ee]" />
            {f}
          </li>
        ))}
      </ul>

      <button
        onClick={() => onSelect(service.id)}
        className="mt-7 w-full rounded-full border border-white/15 py-2.5 text-sm text-[#e8eaf0] hover:border-[#a3ff00]/40 hover:text-[#a3ff00] transition-colors"
      >
        Start with {service.name}
      </button>
    </motion.div>
  );
}
