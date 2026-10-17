const REFERRAL_CODE = "B308753825D";

const viewRefer = document.querySelector("#view-refer");
const viewRewards = document.querySelector("#view-rewards");
const viewJoin = document.querySelector("#view-join");
const navTitle = document.querySelector("#nav-title");
const rewardsBtn = document.querySelector("#rewards-btn");
const toastEl = document.querySelector("#toast");
const qrDialog = document.querySelector("#qr-dialog");
const termsDialog = document.querySelector("#terms-dialog");
const qrHost = document.querySelector("#qr-host");

let toastTimer = 0;
let qrReady = false;

function inviteLink() {
  const url = new URL("./", window.location.href);
  url.searchParams.set("ref", REFERRAL_CODE);
  url.hash = "";
  return url.toString();
}

function inviteMessage() {
  return `Dosto ko bulao! Join me on Bachatt and start saving. Use my referral code ${REFERRAL_CODE} when you set up your account.\n${inviteLink()}`;
}

function showToast(message) {
  toastEl.textContent = message;
  toastEl.classList.add("show");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toastEl.classList.remove("show"), 1800);
}

async function copyText(text) {
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

function tickClock() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");
  hours = hours % 12 || 12;
  const label = `${hours}:${minutes}`;
  document.querySelectorAll("[data-clock]").forEach((node) => {
    node.textContent = label;
  });
}

function currentView() {
  const params = new URLSearchParams(window.location.search);
  if (params.get("ref") && window.location.hash !== "#/rewards") return "join";
  if (window.location.hash === "#/rewards") return "rewards";
  return "refer";
}

function renderRoute() {
  const view = currentView();
  viewRefer.hidden = view !== "refer";
  viewRewards.hidden = view !== "rewards";
  viewJoin.hidden = view !== "join";
  rewardsBtn.hidden = view !== "refer";
  document.querySelector(".cta-bar").hidden = view === "join";

  if (view === "rewards") {
    navTitle.textContent = "All rewards";
    document.title = "All rewards · Bachatt";
  } else if (view === "join") {
    navTitle.textContent = "You're invited";
    document.title = "You're invited · Bachatt";
  } else {
    navTitle.textContent = "Refer & Earn";
    document.title = "Refer & Earn · Bachatt";
  }
  window.scrollTo(0, 0);
}

function ensureQr() {
  if (qrReady || typeof qrcode !== "function") return;
  const qr = qrcode(0, "M");
  qr.addData(inviteLink());
  qr.make();
  qrHost.innerHTML = qr.createSvgTag({
    cellSize: 5,
    margin: 1,
    scalable: true,
    title: "Referral QR code",
    alt: `QR code for referral code ${REFERRAL_CODE}`,
  });
  qrReady = true;
}

document.querySelector("#back-btn").addEventListener("click", () => {
  if (currentView() !== "refer") {
    const url = new URL(window.location.href);
    url.searchParams.delete("ref");
    url.hash = "";
    history.pushState({}, "", url);
    renderRoute();
    return;
  }
  if (history.length > 1) history.back();
});

rewardsBtn.addEventListener("click", () => {
  const url = new URL(window.location.href);
  url.searchParams.delete("ref");
  url.hash = "/rewards";
  history.pushState({}, "", url);
  renderRoute();
});

document.querySelector("#copy-btn").addEventListener("click", async () => {
  const ok = await copyText(REFERRAL_CODE);
  showToast(ok ? "Referral code copied" : "Could not copy code");
});

document.querySelector("#join-copy").addEventListener("click", async () => {
  const ok = await copyText(REFERRAL_CODE);
  showToast(ok ? "Referral code copied" : "Could not copy code");
});

document.querySelector("#share-btn").addEventListener("click", async () => {
  const payload = {
    title: "Join me on Bachatt",
    text: `Use my Bachatt referral code ${REFERRAL_CODE}`,
    url: inviteLink(),
  };
  if (navigator.share) {
    try {
      await navigator.share(payload);
      return;
    } catch (error) {
      if (error && error.name === "AbortError") return;
    }
  }
  const ok = await copyText(inviteMessage());
  showToast(ok ? "Invite link copied" : "Could not share link");
});

document.querySelector("#qr-btn").addEventListener("click", () => {
  ensureQr();
  if (typeof qrDialog.showModal === "function") qrDialog.showModal();
});

document.querySelector("#qr-close").addEventListener("click", () => qrDialog.close());

document.querySelector("#whatsapp-btn").addEventListener("click", () => {
  const url = `https://wa.me/?text=${encodeURIComponent(inviteMessage())}`;
  window.open(url, "_blank", "noopener,noreferrer");
});

document.querySelector("#read-more").addEventListener("click", () => {
  const short = document.querySelector("#disclaimer-short");
  const full = document.querySelector("#disclaimer-full");
  const button = document.querySelector("#read-more");
  const expanded = full.hidden;
  short.hidden = expanded;
  full.hidden = !expanded;
  button.textContent = expanded ? "Read less" : "Read More";
  button.setAttribute("aria-expanded", String(expanded));
});

document.querySelectorAll("[data-open-terms]").forEach((button) => {
  button.addEventListener("click", () => {
    if (typeof termsDialog.showModal === "function") termsDialog.showModal();
  });
});

document.querySelector("#terms-close").addEventListener("click", () => termsDialog.close());

window.addEventListener("popstate", renderRoute);
window.addEventListener("hashchange", renderRoute);

tickClock();
window.setInterval(tickClock, 10000);
renderRoute();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  });
}
