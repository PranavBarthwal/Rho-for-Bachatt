export const REFERRAL_CODE = "B308753825D";

export const WHATSAPP_RECIPIENT = "918920710046";
export const INVITE_URL = `http://bachatt.app/refer?ref=${REFERRAL_CODE}`;

export function inviteLink() {
  return INVITE_URL;
}

export function inviteMessage() {
  return `Hi Pranav, Bachatt join karo aur saving start karo! :)\nAccount setup karte time mera referral code **${REFERRAL_CODE}** use karna. Join here: ${INVITE_URL}`;
}

export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.left = "-9999px";
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand("copy");
    area.remove();
    return ok;
  }
}

export function openWhatsApp() {
  const url = `https://wa.me/${WHATSAPP_RECIPIENT}?text=${encodeURIComponent(inviteMessage())}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

export async function shareInvite() {
  const payload = {
    title: "Join me on Bachatt",
    text: `Use my Bachatt referral code ${REFERRAL_CODE}`,
    url: inviteLink(),
  };
  if (navigator.share) {
    try {
      await navigator.share(payload);
      return "shared";
    } catch (error) {
      if (error && error.name === "AbortError") return "aborted";
    }
  }
  const ok = await copyText(inviteMessage());
  return ok ? "copied" : "failed";
}
