import siteConfig from "../../../config/siteConfig";
import { formatCurrency } from "../../../utils/pricing";

export default function Step3Hosting({ selections, updateSelections }) {
  return (
    <div>
      <h3 className="text-xl text-[#e8eaf0]">Select a Package</h3>
      <p className="mt-2 text-sm text-[#9aa0b0]">Choose your processing queue and priority level.</p>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {siteConfig.hostingPlans.map((plan) => {
          const active = selections.hostingPlanId === plan.id;
          return (
            <button
              key={plan.id}
              onClick={() => updateSelections({ hostingPlanId: plan.id })}
              className={`text-left rounded-xl border p-4 transition-colors ${
                active
                  ? "border-[#a3ff00]/50 bg-[#a3ff00]/[0.06]"
                  : "border-white/10 bg-white/[0.02] hover:border-white/20"
              }`}
            >
              <span className="text-[#e8eaf0]">{plan.name}</span>
              <div className="mt-1 font-mono text-lg text-[#e8eaf0]">
                {formatCurrency(plan.price, siteConfig)}
              </div>
              <p className="mt-2 text-xs text-[#9aa0b0]">{plan.description}</p>
              <ul className="mt-3 space-y-1">
                {plan.features.map((f) => (
                  <li key={f} className="text-xs text-[#7d8394] flex items-center gap-1.5">
                    <span className="h-1 w-1 rounded-full bg-[#22d3ee]" />
                    {f}
                  </li>
                ))}
              </ul>
            </button>
          );
        })}
      </div>
    </div>
  );
}
