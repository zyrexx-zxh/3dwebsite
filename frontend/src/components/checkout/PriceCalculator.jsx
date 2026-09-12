import siteConfig from "../../config/siteConfig";
import { computeBreakdown, formatCurrency } from "../../utils/pricing";

export default function PriceCalculator({ selections }) {
  const { project, hosting, buildTotal, hostingMonthly } = computeBreakdown(
    selections,
    siteConfig
  );

  const hasSelection = Boolean(project || hosting);

  return (
    <div className="flex items-center justify-between gap-4 border-t border-white/10 bg-[#0a0b10]/90 px-6 py-4">
      <div>
        <div className="text-[11px] text-[#7d8394]">Current selection</div>
        <div className="font-mono text-lg text-[#e8eaf0]">
          {hasSelection ? formatCurrency(buildTotal, siteConfig) : "—"}
          {hosting && (
            <span className="ml-2 text-xs text-[#7d8394] font-sans">
              + {formatCurrency(hostingMonthly, siteConfig)}/mo hosting
            </span>
          )}
        </div>
      </div>
      {project && (
        <div className="hidden sm:block text-xs text-[#9aa0b0] font-mono">{project.name}</div>
      )}
    </div>
  );
}
