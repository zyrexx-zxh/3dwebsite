import siteConfig from "../../../config/siteConfig";
import { formatCurrency } from "../../../utils/pricing";

export default function Step2ProjectType({ selections, updateSelections }) {
  return (
    <div>
      <h3 className="text-xl text-[#e8eaf0]">Select Service</h3>
      <p className="mt-2 text-sm text-[#9aa0b0]">Choose the specific service you need from the catalog.</p>

      <div className="mt-6 space-y-3">
        {siteConfig.projectTypes.map((type) => {
          const active = selections.projectTypeId === type.id;
          return (
            <button
              key={type.id}
              onClick={() => updateSelections({ projectTypeId: type.id })}
              className={`w-full text-left rounded-xl border p-4 flex items-center justify-between gap-4 transition-colors ${
                active
                  ? "border-[#a3ff00]/50 bg-[#a3ff00]/[0.06]"
                  : "border-white/10 bg-white/[0.02] hover:border-white/20"
              }`}
            >
              <div>
                <span className="text-[#e8eaf0]">{type.name}</span>
                <p className="mt-1 text-xs text-[#9aa0b0] max-w-sm">{type.description}</p>
              </div>
              <span className="font-mono text-sm text-[#e8eaf0] shrink-0">
                {formatCurrency(type.basePrice, siteConfig)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
