// Pure functions that turn wizard selections into a price breakdown.
// Kept separate from components so Step 7 (Review) and the sticky
// calculator always agree on the total.

export function computeBreakdown(selections, config) {
  const { frontendStacks, projectTypes, hostingPlans, domainOptions } = config;

  const stack = frontendStacks.find((s) => s.id === selections.frontendStackId) || null;
  const project = projectTypes.find((p) => p.id === selections.projectTypeId) || null;
  const hosting = hostingPlans.find((h) => h.id === selections.hostingPlanId) || null;
  const domain = domainOptions.find((d) => d.id === selections.domainOptionId) || null;

  const lines = [];

  if (project) {
    lines.push({ label: project.name, amount: project.basePrice });
  }
  if (stack && stack.priceModifier !== 0) {
    lines.push({
      label: `${stack.name} stack adjustment`,
      amount: stack.priceModifier,
    });
  }
  if (domain && domain.fee > 0) {
    lines.push({ label: "Domain registration", amount: domain.fee });
  }

  const buildTotal = lines.reduce((sum, l) => sum + l.amount, 0);
  const hostingMonthly = hosting ? hosting.price : 0;

  return {
    stack,
    project,
    hosting,
    domain,
    lines,
    buildTotal,
    hostingMonthly,
  };
}

export function formatCurrency(amount, config) {
  const symbol = config?.currency?.symbol ?? "$";
  const sign = amount < 0 ? "-" : "";
  return `${sign}${symbol}${Math.abs(amount).toLocaleString()}`;
}
