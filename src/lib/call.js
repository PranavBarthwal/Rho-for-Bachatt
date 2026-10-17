async function placeCall(path) {
  const response = await fetch(path, { method: "POST" });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || "Could not place the call");
  }
  return data;
}

export function placeGoldCall() {
  return placeCall("/api/call");
}

export function placeReferralCall() {
  return placeCall("/api/referral-call");
}
