const RECIPIENT_PHONE_NUMBER = "+918920710046";

let cachedAgentId;

async function bolna(path, key, options = {}) {
  const response = await fetch(`https://api.bolna.ai${path}`, {
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

async function resolveAgentId(key, preferred) {
  if (preferred) return preferred;
  if (cachedAgentId) return cachedAgentId;
  const agents = await bolna("/v2/agent/all", key);
  const list = Array.isArray(agents) ? agents : [];
  const agent = list.find((item) => item.agent_status === "processed") || list[0];
  if (!agent?.id) {
    const error = new Error("No Bolna agent is available for this account");
    error.status = 400;
    throw error;
  }
  cachedAgentId = agent.id;
  return agent.id;
}

export async function placeBolnaCall(env) {
  const key = env.BOLNA_API_KEY;
  if (!key) {
    const error = new Error("Bolna API key is not configured");
    error.status = 500;
    throw error;
  }
  const agentId = await resolveAgentId(key, env.BOLNA_AGENT_ID);
  return bolna("/call", key, {
    method: "POST",
    body: JSON.stringify({
      agent_id: agentId,
      recipient_phone_number: RECIPIENT_PHONE_NUMBER,
    }),
  });
}
