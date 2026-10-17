import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import qrcode from "../vendor/qrcode.js";
import { REFERRAL_CODE, copyText, inviteLink, openWhatsApp, shareInvite } from "../lib/share.js";
import { useAppState } from "../state.jsx";

function Chevron() {
  return (
    <svg className="chevron" viewBox="0 0 20 20" aria-hidden="true">
      <path d="M5 7.5l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Rule({ tone, children }) {
  return (
    <div className={`rule ${tone}`}>
      <span className="rule-line" />
      {children}
      <span className="rule-line right" />
    </div>
  );
}

function Earnings() {
  return (
    <section className="card earnings-card" aria-label="Referral earnings">
      <div className="earn-grid">
        <div>
          <p className="earn-label">Earned this month</p>
          <p className="earn-amount">₹0</p>
          <p className="earn-meta">0/5 referrals done</p>
        </div>
        <div>
          <p className="earn-label">Lifetime earnings</p>
          <p className="earn-amount">₹0</p>
          <p className="earn-meta">Resets 1 November</p>
        </div>
      </div>
      <div className="segments" role="img" aria-label="0 of 5 referrals completed">
        <span /><span /><span /><span /><span />
      </div>
    </section>
  );
}

const FAQS = [
  {
    q: "How to earn?",
    a: "terms",
  },
  {
    q: "How does my friend use my referral code?",
    a: `Your friend can open your invite link, or enter ${REFERRAL_CODE} while setting up their Bachatt account. Once the code is applied and their account is activated, the referral is linked to you.`,
  },
  {
    q: "How to withdraw this reward?",
    a: "Scratch the card you receive after a successful referral. The reward is added to your Bachatt rewards. These rewards are for bringing new users onto Bachatt and are not linked to any investment.",
  },
  {
    q: "Is there a limit on how many friends I can refer?",
    a: "You can keep inviting friends. Each successful referral can earn up to ₹100. The bumper prize tracks 5 successful referrals in this cycle — you have completed 0 of 5, and it resets on 1 November.",
  },
  {
    q: "When will I get my referral reward?",
    a: "You get a scratch card when your friend sets up their Bachatt account with your referral code. Scratch the card to reveal the reward.",
  },
];

export default function ReferPage({ rewards = false }) {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const join = Boolean(params.get("ref")) && !rewards;
  const { showToast } = useAppState();
  const [more, setMore] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);
  const [svg, setSvg] = useState("");

  useEffect(() => {
    const qr = qrcode(0, "M");
    qr.addData(inviteLink());
    qr.make();
    setSvg(qr.createSvgTag({ cellSize: 5, margin: 1, scalable: true, title: "Referral QR code" }));
  }, []);

  const copyCode = async () => {
    const ok = await copyText(REFERRAL_CODE);
    showToast(ok ? "Referral code copied" : "Could not copy code");
  };

  const title = rewards ? "All rewards" : join ? "You're invited" : "Refer & Earn";

  return (
    <div className="refer-page">
      <header className="topbar">
        <div className="nav">
          <button className="icon-btn" type="button" aria-label="Back" onClick={() => navigate(rewards || join ? "/refer" : "/")}>
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
              <path d="M14.5 5.5L8 12l6.5 6.5" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <h1 className="nav-title">{title}</h1>
          {!rewards && !join && (
            <button className="pill" type="button" onClick={() => navigate("/rewards")}>
              All rewards
              <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
                <path d="M7.5 4.5L13 10l-5.5 5.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}
        </div>
      </header>

      <main>
        {rewards && (
          <>
            <Earnings />
            <section className="card empty-rewards">
              <img src="/assets/ticket.png" alt="" width="180" height="108" />
              <h2>No rewards yet</h2>
              <p>Scratch cards from successful referrals will show up here. Share your code to start earning up to ₹100 per friend.</p>
            </section>
          </>
        )}

        {join && (
          <>
            <section className="hero join-hero">
              <h2>You're invited to Bachatt</h2>
              <img className="ticket" src="/assets/ticket.png" alt="" />
            </section>
            <section className="card code-card">
              <Rule tone="purple"><h2>Use this referral code</h2></Rule>
              <p className="code-box join-code">{REFERRAL_CODE}</p>
              <p className="join-copy">Enter this code while setting up your Bachatt account. When your account is activated, your friend gets a scratch card.</p>
              <button className="btn btn-solid btn-block" type="button" onClick={copyCode}>Copy code</button>
            </section>
          </>
        )}

        {!rewards && !join && (
          <>
            <section className="hero">
              <h2>
                Dosto ko bulao,<br />
                har referral par ₹1500 tak<br />
                kamao
              </h2>
              <img className="ticket" src="/assets/ticket.png" alt="Purple rewards ticket" />
            </section>
            <section className="card offer-card" aria-label="Referral offer">
              <Rule tone="gold"><p>Earn upto ₹100 per referral</p></Rule>
              <p className="bumper">+ Bumper prize after 5 referrals</p>
            </section>
            <section className="card code-card">
              <Rule tone="purple"><h2>Your referral code</h2></Rule>
              <div className="code-row">
                <p className="code-box">{REFERRAL_CODE}</p>
                <button className="copy-btn" type="button" aria-label="Copy referral code" onClick={copyCode}>
                  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                    <rect x="8.2" y="8.2" width="10.2" height="10.2" rx="2.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
                    <path d="M6.2 15.2H5.4A1.8 1.8 0 0 1 3.6 13.4V5.4A1.8 1.8 0 0 1 5.4 3.6h8A1.8 1.8 0 0 1 15.2 5.4v.8" fill="none" stroke="currentColor" strokeWidth="1.8" />
                  </svg>
                </button>
              </div>
              <div className="action-row">
                <button className="btn btn-soft" type="button" onClick={() => setQrOpen(true)}>
                  Show QR
                  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M3 3h7v7H3zm2 2v3h3V5zm9-2h7v7h-7zm2 2v3h3V5zM3 14h7v7H3zm2 2v3h3v-3zm9 1h2v2h-2zm3-1h2v2h-2zm-3 4h2v2h-2zm3 1h2v2h-2zm2-3h2v4h-2z" /></svg>
                </button>
                <button className="btn btn-solid" type="button" onClick={async () => {
                  const result = await shareInvite();
                  if (result === "copied") showToast("Invite link copied");
                  if (result === "failed") showToast("Could not share link");
                }}>
                  Share Link
                  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                    <circle cx="6.5" cy="12" r="2.1" fill="none" stroke="currentColor" strokeWidth="1.8" />
                    <circle cx="17" cy="6.5" r="2.1" fill="none" stroke="currentColor" strokeWidth="1.8" />
                    <circle cx="17" cy="17.5" r="2.1" fill="none" stroke="currentColor" strokeWidth="1.8" />
                    <path d="M8.4 11.1l6.4-3.6M8.4 12.9l6.4 3.6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </section>
            <Earnings />
            <section className="card how-card">
              <Rule tone="purple"><h2>How it works?</h2></Rule>
              <ol className="steps">
                <li className="step"><img src="/assets/step-share.png" alt="" /><p>Share your link with a friend</p></li>
                <li className="step"><img src="/assets/step-scratch.png" alt="" /><p>Get scratch card when they set up their account</p></li>
                <li className="step"><img src="/assets/step-piggy.png" alt="" /><p>Scratch to get rewards</p></li>
              </ol>
            </section>
            <section className="card disclaimer-card">
              <h2>Disclaimer</h2>
              <p>
                {more
                  ? "Referral rewards are for bringing new users onto Bachatt. They are not linked to any investment, return, or fund performance. A referral is confirmed when your friend activates their account on the Bachatt app with your code. You can earn up to ₹100 on each referral and a bumper prize after 5 referrals, with total rewards up to ₹1500. Rewards are promotional, can change, and are not an investment product."
                  : "Referral rewards are for bringing new users onto Bachatt. They are not linked to any investment..."}
                <button className="read-more" type="button" onClick={() => setMore((v) => !v)}>{more ? "Read less" : "Read More"}</button>
              </p>
            </section>
            <section className="faq-section">
              <h2><span>Question?</span> We got solutions</h2>
              {FAQS.map((item, index) => (
                <details key={item.q} className="faq" open={index === 0}>
                  <summary><span>{item.q}</span><Chevron /></summary>
                  {item.a === "terms" ? (
                    <p>
                      When your friend activates account on Bachatt app by using your referral code, your referral is confirmed. By proceeding to share your referral code, you agree to{" "}
                      <button className="inline-link" type="button" onClick={() => setTermsOpen(true)}>Bachatt Referral Terms & Conditions</button>.
                    </p>
                  ) : <p>{item.a}</p>}
                </details>
              ))}
            </section>
          </>
        )}
      </main>

      {!join && (
        <div className="cta-bar">
          <button className="whatsapp" type="button" onClick={openWhatsApp}>
            Invite over WhatsApp
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path fill="currentColor" d="M12 2.2A9.7 9.7 0 0 0 3.6 16.7L2.4 21.6l5-1.2A9.8 9.8 0 1 0 12 2.2zm5.5 13.6c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-1.7-.1-.4-.1-.9-.3-1.5-.6-2.7-1.2-4.4-3.8-4.6-4-.1-.2-1.1-1.4-1.1-2.7s.7-1.9.9-2.2c.2-.2.6-.3.9-.3h.3c.2 0 .4 0 .5.4.2.5.7 1.8.8 1.9.1.1.1.3 0 .5-.1.2-.2.3-.3.5l-.4.4c-.1.1-.2.3-.1.5.2.3.7 1.1 1.4 1.7 1 .9 1.8 1.1 2 .1.2-.2.6-.7.8-1 .2-.2.3-.2.6-.1.2.1 1.4.7 1.6.8.2.1.4.2.4.3.1.2.1.6-.1 1.2z" /></svg>
          </button>
        </div>
      )}

      {qrOpen && (
        <div className="overlay">
          <button className="overlay-backdrop" type="button" aria-label="Close" onClick={() => setQrOpen(false)} />
          <div className="overlay-sheet" role="dialog" aria-label="Your referral QR">
            <div className="sheet-handle" />
            <h2>Your referral QR</h2>
            <div className="qr-host" dangerouslySetInnerHTML={{ __html: svg }} />
            <p className="sheet-code">{REFERRAL_CODE}</p>
            <p className="sheet-note">Ask your friend to scan this while they set up their Bachatt account.</p>
            <button className="btn btn-solid btn-block" type="button" onClick={() => setQrOpen(false)}>Close</button>
          </div>
        </div>
      )}

      {termsOpen && (
        <div className="overlay">
          <button className="overlay-backdrop" type="button" aria-label="Close" onClick={() => setTermsOpen(false)} />
          <div className="overlay-sheet" role="dialog" aria-label="Referral terms">
            <div className="sheet-handle" />
            <h2>Referral Terms & Conditions</h2>
            <div className="terms-body">
              <p>Referral rewards are for bringing new users onto Bachatt. They are not linked to any investment, return, or fund performance.</p>
              <p>A referral is confirmed when your friend activates their account on the Bachatt app using your referral code or invite link.</p>
              <p>You can earn up to ₹100 per successful referral. A bumper prize is tracked after 5 successful referrals in the current cycle. This cycle resets on 1 November. Total referral rewards can go up to ₹1500.</p>
              <p>You receive a scratch card when the referral is confirmed. Scratch it to reveal the reward. Rewards are promotional, may vary, and Bachatt may change or withdraw the offer.</p>
              <p>By sharing your referral code, you agree to these Referral Terms & Conditions.</p>
            </div>
            <button className="btn btn-solid btn-block" type="button" onClick={() => setTermsOpen(false)}>Got it</button>
          </div>
        </div>
      )}
    </div>
  );
}
