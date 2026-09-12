import siteConfig from "../../../config/siteConfig";
import { formatCurrency } from "../../../utils/pricing";

export default function Step1FrontendStack({ selections, updateSelections }) {
  return (
    <div>
      <h3 className="text-xl text-[#e8eaf0]">Select Platform</h3>
      <p className="mt-2 text-sm text-[#9aa0b0]">
        Choose the platform you need assistance with.
      </p>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {siteConfig.frontendStacks.map((stack) => {
          const active = selections.frontendStackId === stack.id;
          return (
            <button
              key={stack.id}
              onClick={() => updateSelections({ frontendStackId: stack.id })}
              className={`text-left rounded-xl border p-4 transition-colors ${
                active
                  ? "border-[#a3ff00]/50 bg-[#a3ff00]/[0.06]"
                  : "border-white/10 bg-white/[0.02] hover:border-white/20"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[#e8eaf0]">{stack.name}</span>
                {stack.priceModifier !== 0 && (
                  <span className="font-mono text-xs text-[#7d8394]">
                    {stack.priceModifier > 0 ? "+" : ""}
                    {formatCurrency(stack.priceModifier, siteConfig)}
                  </span>
                )}
              </div>
              <p className="mt-1.5 text-xs text-[#9aa0b0]">{stack.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
