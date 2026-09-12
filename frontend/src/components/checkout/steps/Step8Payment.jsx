import { useState } from "react";
import siteConfig from "../../../config/siteConfig";

export default function Step8Payment({ selections, updateSelections }) {
  const [copied, setCopied] = useState(false);
  const payment = selections.payment;
  const network = siteConfig.paymentNetworks.find((n) => n.id === payment.networkId);

  function updatePayment(field, value) {
    updateSelections({ payment: { ...payment, [field]: value } });
  }

  function copyAddress() {
    if (!network) return;
    navigator.clipboard?.writeText(network.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div>
      <h3 className="text-xl text-[#e8eaf0]">Invoice Payment</h3>
      <p className="mt-2 text-sm text-[#9aa0b0]">
        Pick a network to get the wallet address, then paste your Transaction ID (TxHash) once the transfer is sent.
      </p>

      <div className="mt-6">
        <label className="text-xs text-[#7d8394]">Network</label>
        <select
          value={payment.networkId || ""}
          onChange={(e) => updatePayment("networkId", e.target.value)}
          className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-[#e8eaf0] focus:outline-none focus:border-[#22d3ee]/50"
        >
          <option value="" disabled>
            Select a network
          </option>
          {siteConfig.paymentNetworks.map((n) => (
            <option key={n.id} value={n.id} className="bg-[#0e1016]">
              {n.name} — {n.network}
            </option>
          ))}
        </select>
      </div>

      {network && (
        <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.02] p-4">
          <div className="text-xs text-[#7d8394]">Send payment to</div>
          <div className="mt-1.5 flex items-center justify-between gap-3">
            <code className="text-sm text-[#a3ff00] break-all">{network.address}</code>
            <button
              onClick={copyAddress}
              className="shrink-0 rounded-full border border-white/15 px-3 py-1 text-xs text-[#e8eaf0] hover:border-[#a3ff00]/40"
            >
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>
      )}

      <div className="mt-4">
        <label className="text-xs text-[#7d8394]">Transaction ID (TxHash)</label>
        <input
          type="text"
          value={payment.txHash}
          onChange={(e) => updatePayment("txHash", e.target.value)}
          placeholder="Paste your transaction hash here"
          className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 font-mono text-sm text-[#e8eaf0] placeholder:text-[#5a5f6d] focus:outline-none focus:border-[#22d3ee]/50"
        />
        <p className="mt-2 text-xs text-[#7d8394]">
          Our system verifies transactions automatically. You will receive a confirmation once it clears.
        </p>
      </div>
    </div>
  );
}
