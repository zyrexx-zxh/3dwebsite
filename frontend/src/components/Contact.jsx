import { motion } from "framer-motion";
import siteConfig from "../config/siteConfig";

export default function Contact({ onStartCheckout }) {
  const { contact } = siteConfig;

  return (
    <section id="contact" className="relative px-6 py-28">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-10 md:p-14"
      >
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-3xl text-[#e8eaf0] tracking-tight">Talk to the studio</h2>
            <p className="mt-3 text-[#9aa0b0]">
              Prefer to skip the wizard and just talk it through? Reach out directly.
            </p>
            <button
              onClick={onStartCheckout}
              className="mt-6 rounded-full bg-[#a3ff00] px-6 py-3 text-sm font-medium text-[#08090d] hover:brightness-110 transition-all"
            >
              Start a project instead
            </button>
          </div>

          <div className="space-y-4 font-mono text-sm">
            <div>
              <div className="text-[#7d8394]">Email</div>
              <div className="text-[#e8eaf0]">{contact.email}</div>
            </div>
            <div>
              <div className="text-[#7d8394]">Phone</div>
              <div className="text-[#e8eaf0]">{contact.phone}</div>
            </div>
            <div>
              <div className="text-[#7d8394]">Based</div>
              <div className="text-[#e8eaf0]">{contact.location}</div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
