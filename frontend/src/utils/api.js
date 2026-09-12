const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export async function submitInvoice(payload) {
  const res = await fetch(`${API_BASE_URL}/api/verify-invoice`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const message = data?.detail || `Request failed with status ${res.status}`;
    throw new Error(message);
  }

  return data;
}
