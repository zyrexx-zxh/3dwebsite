import siteConfig from "../../../config/siteConfig";
import { computeBreakdown, formatCurrency } from "../../../utils/pricing";

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-white/[0.06] last:border-none">
      <span className="text-sm text-[#9aa0b0]">{label}</span>
      <span className="text-sm text-[#e8eaf0]">{value}</span>
    </div>
  );
}

export default function Step7Review({ selections }) {
  const breakdown = computeBreakdown(selections, siteConfig);
  const { stack, project, hosting, domain, lines, buildTotal } = breakdown;

  return (
    <div>
      <h3 className="text-xl text-[#e8eaf0]">Review your order</h3>
      <p className="mt-2 text-sm text-[#9aa0b0]">Confirm the details below before proceeding to payment.</p>

      <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.02] p-5">
        <Row label="Service" value={project?.name || "—"} />
        <Row label="Platform" value={stack?.name || "—"} />
        <Row label="Package" value={hosting?.name || "—"} />
        <Row label="Contact Method" value={domain?.label || "—"} />
        <Row label="Alias" value={selections.client.name || "—"} />
        <Row label="Email" value={selections.client.email || "—"} />
      </div>

      {selections.notes && (
        <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.02] p-5">
          <div className="text-xs text-[#7d8394] mb-2">Additional Details</div>
          <p className="text-sm text-[#9aa0b0] leading-relaxed whitespace-pre-wrap">
            {selections.notes}
          </p>
        </div>
      )}

      <div className="mt-4 rounded-xl border border-[#a3ff00]/25 bg-[#a3ff00]/[0.04] p-5">
        <div className="text-xs text-[#7d8394] mb-2">Price breakdown</div>
        {lines.map((l) => (
          <Row key={l.label} label={l.label} value={formatCurrency(l.amount, siteConfig)} />
        ))}
        <div className="flex items-center justify-between pt-3 mt-1 border-t border-white/[0.08]">
          <span className="text-[#e8eaf0]">Total</span>
          <span className="font-mono text-xl text-[#e8eaf0]">
            {formatCurrency(buildTotal, siteConfig)}
          </span>
        </div>
      </div>
    </div>
  );
}
