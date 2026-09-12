import siteConfig from "../../config/siteConfig";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] mt-32">
      <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <span className="grid h-7 w-7 place-items-center rounded-lg border border-[#a3ff00]/30 bg-[#a3ff00]/[0.06] font-mono text-[11px] text-[#a3ff00]">
            {siteConfig.brand.mark}
          </span>
          <span className="text-sm text-[#7d8394]">{siteConfig.footer.note}</span>
        </div>

        <div className="flex items-center gap-5">
          {siteConfig.contact.social.map((s) => (
            <a
              key={s.id}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-[#7d8394] hover:text-[#e8eaf0] transition-colors"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
