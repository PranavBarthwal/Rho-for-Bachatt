import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sheet from "../components/Sheet.jsx";
import { useAppState } from "../state.jsx";
import { openWhatsApp } from "../lib/share.js";

const FUNDS = [
  {
    id: "axis",
    name: "Axis ICICI Insta Fund",
    rate: "6.63%",
    sip: "₹100",
    target: "Target predictable growth",
  },
  {
    id: "liquid",
    name: "ICICI Pru Liquid Fund",
    rate: "6.59%",
    sip: "₹100",
    target: "Target steady liquidity",
  },
];

function Spark() {
  return (
    <svg className="spark" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M8 1.2l1.1 4.2L13.4 8 9.1 9.1 8 13.4 6.9 9.1 2.6 8l4.3-1.1L8 1.2z" />
    </svg>
  );
}

function Segments() {
  return (
    <div className="mini-segments" aria-hidden="true">
      <span /><span /><span /><span /><span />
    </div>
  );
}

function AmcRow() {
  return (
    <div className="amc-row" aria-hidden="true">
      <img src="/home/amc-0.png" alt="" />
      <img src="/home/amc-1.png" alt="" />
      <img src="/home/amc-2.png" alt="" />
      <img src="/home/amc-3.png" alt="" />
    </div>
  );
}

export default function HomePage({ showBalance, setBankOpen }) {
  const navigate = useNavigate();
  const { sipAmount, setSipAmount, bank, kyc, setKyc, paid, setPaid, progress, showToast } = useAppState();
  const [calcOpen, setCalcOpen] = useState(false);
  const [lumpOpen, setLumpOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const [fund, setFund] = useState(null);
  const [draftAmount, setDraftAmount] = useState(String(sipAmount));
  const [lumpAmount, setLumpAmount] = useState("5000");
  const [freq, setFreq] = useState("daily");
  const [calcAmount, setCalcAmount] = useState(String(sipAmount));

  const contributed = () => {
    const amount = Number(calcAmount) || 0;
    const periods = freq === "daily" ? 365 : freq === "weekly" ? 52 : 12;
    return amount * periods;
  };
  const illustrated = Math.round(contributed() * (1 + 0.0663 / 2));

  return (
    <div className="home">
      <header className="home-head">
        <div className="identity">
          <img src="/home/avatar.png" alt="" className="avatar" />
          <div className="brand-block">
            <p className="brand">Insta Fund <button type="button" className="plus" aria-label="Add investment" onClick={() => setEditOpen(true)}>+</button></p>
            <span className="brand-line" />
            <p className="brand-sub">No lock-in FD funds</p>
          </div>
        </div>
        <div className="head-actions">
          <button className="ghost-chip" type="button" onClick={() => navigate("/passbook")}>Passbook</button>
          {showBalance ? (
            <button className="balance-chip" type="button" onClick={() => navigate("/refer")}>
              <i />₹1500<i />
            </button>
          ) : (
            <button className="refer-chip" type="button" onClick={() => navigate("/refer")}>
              <img src="/home/gift.png" alt="" />
              Refer
            </button>
          )}
        </div>
      </header>

      <section className="earn-hero card-shadow" aria-label="Referral offer">
        <div className="earn-top">
          <div>
            <h2>EARN UPTO ₹1500</h2>
            <button className="details" type="button" onClick={() => navigate("/refer")}>
              View details <span>›</span>
            </button>
          </div>
          <img src="/home/people.png" alt="" className="people" />
        </div>
        <div className="earn-meta-row">
          <span>0/5 referrals done</span>
          <span>Resets 1 November</span>
        </div>
        <Segments />
        <button className="wa" type="button" onClick={openWhatsApp}>
          Invite over WhatsApp
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path fill="currentColor" d="M12 2.2A9.7 9.7 0 0 0 3.6 16.7L2.4 21.6l5-1.2A9.8 9.8 0 1 0 12 2.2zm5.5 13.6c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-1.7-.1-.4-.1-.9-.3-1.5-.6-2.7-1.2-4.4-3.8-4.6-4-.1-.2-1.1-1.4-1.1-2.7s.7-1.9.9-2.2c.2-.2.6-.3.9-.3h.3c.2 0 .4 0 .5.4.2.5.7 1.8.8 1.9.1.1.1.3 0 .5-.1.2-.2.3-.3.5l-.4.4c-.1.1-.2.3-.1.5.2.3.7 1.1 1.4 1.7 1 .9 1.8 1.1 2 .1.2-.2.6-.7.8-1 .2-.2.3-.2.6-.1.2.1 1.4.7 1.6.8.2.1.4.2.4.3.1.2.1.6-.1 1.2z" />
          </svg>
        </button>
      </section>

      <section className="one-time">
        <h2><Spark /> Not ready for SIP? <Spark /></h2>
        <p>Try one-time</p>
      </section>

      <img className="iit-row" src="/home/iit-row.jpg" alt="With top IITs and IIMs" />

      <section className="lump-card">
        <h2>Invest your idle bank money</h2>
        <p className="lump-title">Save lumpsum</p>
        <img src="/home/lumpsum.jpg" alt="Savings bag with fund house logos" />
        <p className="lock-row"><span /><b>No Lock-in ✦ FD like returns*</b><span /></p>
        <p className="social"><img src="/home/faces.png" alt="" /> <b>1570+</b> near you <em>saved today</em></p>
        <button className="purple-cta" type="button" onClick={() => setLumpOpen(true)}>
          Save Lumpsum <span>→</span>
        </button>
      </section>

      <section className="sip-card card-shadow">
        <div className="sip-head">
          <h2>SIP <span>in progress</span></h2>
          <span className="pct">{progress}% complete</span>
        </div>
        <div className="sip-fund">
          <span className="tick done">✓</span>
          <div>
            <strong>₹{sipAmount} daily</strong>
            <p><i>↗</i> Axis Birla Insta Fund</p>
          </div>
          <button type="button" aria-label="Edit SIP amount" onClick={() => { setDraftAmount(String(sipAmount)); setEditOpen(true); }}>
            <svg viewBox="0 0 24 24" width="20" height="20"><path d="M4 16.5V20h3.5L18 9.5 14.5 6 4 16.5z" fill="none" stroke="currentColor" strokeWidth="1.7"/><path d="M13.2 7.3l3.5 3.5" stroke="currentColor" strokeWidth="1.7"/></svg>
          </button>
        </div>
        <div className="sip-step">
          <span className="tick wait">•••</span>
          <p>Select your bank account</p>
          <em className={bank ? "done-pill" : ""}>{bank ? "Added" : "Pending"}</em>
        </div>
        <button className="sip-step as-button" type="button" onClick={() => { setKyc(true); showToast("KYC marked complete"); }}>
          <span className="tick wait">•••</span>
          <p>Complete your KYC</p>
          {kyc ? <em className="done-pill">Done</em> : <em className="ghost-pill" />}
        </button>
        <button className="sip-step as-button" type="button" onClick={() => { if (!bank) { setBankOpen(true); return; } setPaid(true); showToast("First payment recorded"); }}>
          <span className="tick wait">•••</span>
          <p>Make first payment</p>
          {paid ? <em className="done-pill">Paid</em> : <em className="ghost-pill" />}
        </button>
        <button className="bank-cta in-card" type="button" onClick={() => setBankOpen(true)}>
          Select bank account <span>→</span>
        </button>
      </section>

      <p className="mid-rule"><span /> No lock-in ✦ Withdraw anytime <span /></p>

      <section className="video-block">
        <h2>Bachatt: Safest savings app</h2>
        <button className="video" type="button" onClick={() => setVideoOpen(true)}>
          <img src="/home/video.jpg" alt="Safest daily savings app video" />
        </button>
      </section>

      <section className="safe-block">
        <h2>Your money is safe with</h2>
        <AmcRow />
        <p className="mid-rule soft"><span /> India's best AMCs ★ Bachatt secured <span /></p>
      </section>

      <section className="funds-block">
        <h2>All funds & plans</h2>
        <p className="substars"><Spark /> Fund baskets <Spark /> Liquid funds</p>
        <div className="fund-scroller">
          {FUNDS.map((item) => (
            <article key={item.id} className="fund-card">
              <div className="fund-name"><span>↗</span> {item.name}</div>
              <div className="fund-stats">
                <div>
                  <strong>{item.rate}</strong>
                  <p>Past 3Y(XIRR) ⇄</p>
                </div>
                <div className="sip-start">
                  <p>SIP starts with</p>
                  <strong>{item.sip}</strong>
                </div>
              </div>
              <div className="fund-foot">
                <b>{item.target}</b>
                <button type="button" aria-label={`Open ${item.name}`} onClick={() => setFund(item)}>→</button>
              </div>
            </article>
          ))}
        </div>
        <p className="returns-note">*Returns are shown based on past performance of funds</p>
      </section>

      <p className="mid-rule"><span /> Safe ✦ Stable ✦ Trusted <span /></p>

      <button className="calc-card" type="button" onClick={() => setCalcOpen(true)}>
        <span>
          <strong>Bachatt calculator ›</strong>
          <em>See what your savings grow into & compare different plans</em>
        </span>
        <img src="/home/calc.png" alt="" />
      </button>

      <div className="carousel" tabIndex={0} aria-label="Offers">
        <img src="/home/emi.jpg" alt="Bajaj Finserv Insta EMI Card offer, limit up to 3 lakh, no annual fee" />
        <article className="slide-card">
          <p>Daily savings</p>
          <h3>Start with ₹{sipAmount}</h3>
          <span>No lock-in · withdraw anytime</span>
        </article>
      </div>
      <div className="dots" aria-hidden="true"><i className="on" /><i /><i /><i /><i /></div>

      <section className="rewards-block">
        <h2>Unlock rewards</h2>
        <p className="substars"><Spark /> Small tasks <Spark /> Big rewards</p>
        <article className="mile-card">
          <h3>Milestones & Rewards</h3>
          <div className="mile-row">
            <button type="button" onClick={() => navigate("/rewards")}>
              <strong>Locked</strong>
              <span>Lifetime rewards ›</span>
            </button>
            <img src="/home/gift.png" alt="" />
          </div>
          <p className="kyc-lock"><i>⌂</i> Locked <b>Complete KYC to unlock</b></p>
        </article>
      </section>

      <section className="help-block">
        <h2>Need some help?</h2>
        <p className="reach">Reach out to us</p>
        <p className="hours"><Spark /> Mon – Sun</p>
        <p className="hours"><Spark /> 08 AM – 08 PM</p>
        <img src="/home/help.png" alt="Bachatt support specialist" />
        <button className="call" type="button" onClick={() => setHelpOpen(true)}>Call us now</button>
      </section>

      <footer className="brand-foot">
        <div className="arch">
          <p className="logo-row"><span>b</span> bachatt</p>
          <h2>Bachatt karega Bharat</h2>
          <p>Helping India grow, together</p>
          <div className="legal">
            <p>Trusave Fintech Private Limited</p>
            <p>AMFI registered</p>
            <p>ARN: 321640</p>
          </div>
          <div className="badges">
            <div><b>ISO</b><span>Certified</span></div>
            <div><b className="shield">✓</b><span /></div>
            <div><b>▲▲▲</b><span>AMFI registered</span></div>
          </div>
          <p className="secure">✦ Your data is safe & secure ✦</p>
        </div>
      </footer>

      <Sheet open={calcOpen} title="Bachatt calculator" onClose={() => setCalcOpen(false)}>
        <label className="field">Amount
          <input inputMode="numeric" value={calcAmount} onChange={(e) => setCalcAmount(e.target.value.replace(/[^\d]/g, ""))} />
        </label>
        <div className="freq">
          {["daily", "weekly", "monthly"].map((item) => (
            <button key={item} type="button" className={freq === item ? "on" : ""} onClick={() => setFreq(item)}>{item}</button>
          ))}
        </div>
        <p className="calc-out">In 1 year you set aside <strong>₹{contributed().toLocaleString("en-IN")}</strong></p>
        <p className="calc-out">Illustrated value at the fund's past 3Y XIRR of 6.63%: <strong>₹{illustrated.toLocaleString("en-IN")}</strong></p>
        <p className="fine">Illustration only. Past performance is not a guarantee of future returns.</p>
        <button className="purple-cta" type="button" onClick={() => setCalcOpen(false)}>Done</button>
      </Sheet>

      <Sheet open={lumpOpen} title="Save lumpsum" onClose={() => setLumpOpen(false)}>
        <label className="field">Amount
          <input inputMode="numeric" value={lumpAmount} onChange={(e) => setLumpAmount(e.target.value.replace(/[^\d]/g, ""))} />
        </label>
        <p className="fine">One-time amount into Axis Birla Insta Fund. No lock-in.</p>
        <button className="purple-cta" type="button" onClick={() => { setLumpOpen(false); showToast(`Lumpsum of ₹${Number(lumpAmount || 0).toLocaleString("en-IN")} saved`); }}>Continue</button>
      </Sheet>

      <Sheet open={editOpen} title="Edit daily SIP" onClose={() => setEditOpen(false)}>
        <label className="field">Daily amount
          <input inputMode="numeric" value={draftAmount} onChange={(e) => setDraftAmount(e.target.value.replace(/[^\d]/g, ""))} />
        </label>
        <button className="purple-cta" type="button" onClick={() => { const next = Math.max(51, Number(draftAmount) || 51); setSipAmount(next); setEditOpen(false); showToast(`Daily SIP set to ₹${next}`); }}>Save</button>
      </Sheet>

      <Sheet open={!!fund} title={fund?.name || "Fund"} onClose={() => setFund(null)}>
        {fund && (
          <>
            <p className="calc-out">Past 3Y XIRR <strong>{fund.rate}</strong></p>
            <p className="fine">SIP starts with {fund.sip}. {fund.target}. Returns are shown based on past performance of funds.</p>
            <button className="purple-cta" type="button" onClick={() => { setFund(null); setEditOpen(true); }}>Start SIP</button>
          </>
        )}
      </Sheet>

      <Sheet open={helpOpen} title="Call Bachatt" onClose={() => setHelpOpen(false)}>
        <p className="fine">Support is available Monday to Sunday, 8:00 AM to 8:00 PM. Call from the Bachatt app during these hours.</p>
        <button className="purple-cta" type="button" onClick={() => { setHelpOpen(false); showToast("Support is available 8 AM – 8 PM"); }}>Call us now</button>
      </Sheet>

      <Sheet open={videoOpen} title="Safest daily savings app" onClose={() => setVideoOpen(false)}>
        <img src="/home/video.jpg" alt="" className="sheet-video" />
        <p className="fine">Bachatt safety film. Your money is held with India's AMCs and can be withdrawn anytime.</p>
        <button className="purple-cta" type="button" onClick={() => setVideoOpen(false)}>Close</button>
      </Sheet>

      </div>
  );
}
