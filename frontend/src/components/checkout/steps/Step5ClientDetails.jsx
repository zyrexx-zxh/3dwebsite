const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-[#e8eaf0] placeholder:text-[#5a5f6d] focus:outline-none focus:border-[#22d3ee]/50";

export default function Step5ClientDetails({ selections, updateSelections }) {
  const client = selections.client;

  function updateField(field, value) {
    updateSelections({ client: { ...client, [field]: value } });
  }

  return (
    <div>
      <h3 className="text-xl text-[#e8eaf0]">Customer Details</h3>
      <p className="mt-2 text-sm text-[#9aa0b0]">Where should we send the updates?</p>

      <div className="mt-6 space-y-4">
        <div>
          <label className="text-xs text-[#7d8394]">Alias / Handle (Optional)</label>
          <input
            type="text"
            value={client.name}
            onChange={(e) => updateField("name", e.target.value)}
            placeholder="e.g. @claxen"
            className={`mt-1.5 ${inputClass}`}
          />
        </div>
        <div>
          <label className="text-xs text-[#7d8394]">Email *</label>
          <input
            type="email"
            required
            value={client.email}
            onChange={(e) => updateField("email", e.target.value)}
            placeholder="contact@example.com"
            className={`mt-1.5 ${inputClass}`}
          />
        </div>
      </div>
    </div>
  );
}
