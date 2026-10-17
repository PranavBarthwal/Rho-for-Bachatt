const BOLNA_API = "https://api.bolna.ai";
const RECIPIENT_PHONE_NUMBER = "+918920710046";
const GOLD_AGENT_ID = "23128ef4-1c4d-4922-9802-7045ddf2ef9b";
const REFERRAL_AGENT_ID = "b70f6c27-7281-427e-864f-99e9c41ee97e";

async function bolna(path, key, options = {}) {
  const response = await fetch(`${BOLNA_API}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${key}`,
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...options.headers,
    },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data.message || "Bolna could not place the call");
    error.status = response.status;
    throw error;
  }
  return data;
}

export async function placeBolnaCall(env, profile = "gold") {
  const referral = profile === "referral";
  const key = referral ? env.BOLNA_REFERRAL_API_KEY : env.BOLNA_API_KEY;
  const agentId = referral
    ? (env.BOLNA_REFERRAL_AGENT_ID || REFERRAL_AGENT_ID)
    : (env.BOLNA_AGENT_ID || GOLD_AGENT_ID);
  if (!key) {
    const error = new Error("Bolna API key is not configured");
    error.status = 500;
    throw error;
  }
  return bolna("/call", key, {
    method: "POST",
    body: JSON.stringify({
      agent_id: agentId,
      recipient_phone_number: RECIPIENT_PHONE_NUMBER,
    }),
  });
}
