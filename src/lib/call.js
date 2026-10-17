const BOLNA_API = "https://api.bolna.ai";
const RECIPIENT_PHONE_NUMBER = "+918920710046";

const CALLS = {
  gold: {
    apiKey: "bn-654661afa6974a89894ad7006978cb52",
    agentId: "23128ef4-1c4d-4922-9802-7045ddf2ef9b",
  },
  referral: {
    apiKey: "bn-60e146f866ef4ab2ad399d219abb606e",
    agentId: "b70f6c27-7281-427e-864f-99e9c41ee97e",
  },
};

async function placeCall(profile) {
  const { apiKey, agentId } = CALLS[profile];
  const response = await fetch(`${BOLNA_API}/call`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      agent_id: agentId,
      recipient_phone_number: RECIPIENT_PHONE_NUMBER,
    }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || "Could not place the call");
  }
  return data;
}

export function placeGoldCall() {
  return placeCall("gold");
}

export function placeReferralCall() {
  return placeCall("referral");
}
