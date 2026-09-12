import { motion } from "framer-motion";
import ServiceCard from "./ServiceCard";
import siteConfig from "../config/siteConfig";

export default function ServiceCatalog({ onSelectService }) {
  return (
    <section id="services" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-xl"
        >
          <h2 className="text-3xl text-[#e8eaf0] tracking-tight">What we build</h2>
          <p className="mt-3 text-[#9aa0b0]">
            Three project shapes cover most engagements. Pick the closest match to start a
            scoped quote — you can adjust every detail in the next steps.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {siteConfig.projectTypes.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
            >
              <ServiceCard
                service={service}
                featured={service.id === "saas"}
                onSelect={onSelectService}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
