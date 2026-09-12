export default function Step6Notes({ selections, updateSelections }) {
  return (
    <div>
      <h3 className="text-xl text-[#e8eaf0]">Additional Details</h3>
      <p className="mt-2 text-sm text-[#9aa0b0]">
        Provide the account handle, exact platform messages received, and any steps you've already taken.
      </p>

      <textarea
        value={selections.notes}
        onChange={(e) => updateSelections({ notes: e.target.value })}
        rows={7}
        placeholder="e.g. Account link: instagram.com/... &#10;Message: 'Your account has been disabled...'"
        className="mt-6 w-full rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-[#e8eaf0] placeholder:text-[#5a5f6d] focus:outline-none focus:border-[#22d3ee]/50 resize-none"
      />
    </div>
  );
}
