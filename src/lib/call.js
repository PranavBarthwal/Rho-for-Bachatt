export async function placeGoldCall() {
  const response = await fetch("/api/call", { method: "POST" });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || "Could not place the call");
  }
  return data;
}
