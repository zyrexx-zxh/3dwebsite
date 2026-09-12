import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import siteConfig from "../config/siteConfig";

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <div className="border-b border-white/[0.08]">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left"
      >
        <span className="text-[#e8eaf0] text-base pr-6">{faq.question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          className="shrink-0 text-xl text-[#22d3ee] leading-none"
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm text-[#9aa0b0] leading-relaxed max-w-xl">{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQAccordion() {
  const [openId, setOpenId] = useState(0);

  return (
    <section id="faq" className="relative px-6 py-28">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-3xl text-[#e8eaf0] tracking-tight">Questions, answered</h2>
        <div className="mt-10">
          {siteConfig.faq.map((faq, i) => (
            <FAQItem
              key={faq.question}
              faq={faq}
              isOpen={openId === i}
              onToggle={() => setOpenId(openId === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
