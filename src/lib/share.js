export const REFERRAL_CODE = "B308753825D";

export function inviteLink() {
  const url = new URL("/refer", window.location.origin);
  url.searchParams.set("ref", REFERRAL_CODE);
  return url.toString();
}

export function inviteMessage() {
  return `Dosto ko bulao! Join me on Bachatt and start saving. Use my referral code ${REFERRAL_CODE} when you set up your account.\n${inviteLink()}`;
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
  const url = `https://wa.me/?text=${encodeURIComponent(inviteMessage())}`;
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
