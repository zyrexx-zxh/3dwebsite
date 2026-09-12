import siteConfig from "../../../config/siteConfig";
import { formatCurrency } from "../../../utils/pricing";

export default function Step4Domain({ selections, updateSelections }) {
  return (
    <div>
      <h3 className="text-xl text-[#e8eaf0]">Contact Method</h3>
      <p className="mt-2 text-sm text-[#9aa0b0]">Telegram is our fastest communication channel.</p>

      <div className="mt-6">
        <select
          value={selections.domainOptionId || ""}
          onChange={(e) => updateSelections({ domainOptionId: e.target.value })}
          className="w-full rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-[#e8eaf0] focus:outline-none focus:border-[#22d3ee]/50"
        >
          <option value="" disabled>
            Select an option
          </option>
          {siteConfig.domainOptions.map((opt) => (
            <option key={opt.id} value={opt.id} className="bg-[#0e1016]">
              {opt.label}
              {opt.fee > 0 ? ` (+${formatCurrency(opt.fee, siteConfig)})` : ""}
            </option>
          ))}
        </select>

        {selections.domainOptionId && (
          <p className="mt-3 text-xs text-[#7d8394]">
            {siteConfig.domainOptions.find((o) => o.id === selections.domainOptionId)?.description}
          </p>
        )}
      </div>
    </div>
  );
}
