import { useNavigate } from "react-router-dom";
import { useAppState } from "../state.jsx";

function SubHead({ title, onBack }) {
  return (
    <header className="subhead">
      <button type="button" aria-label="Back" onClick={onBack}>‹</button>
      <h1>{title}</h1>
    </header>
  );
}

export function PassbookPage() {
  const navigate = useNavigate();
  return (
    <div className="subpage">
      <SubHead title="Passbook" onBack={() => navigate("/")} />
      <section className="pass-card">
        <p>Referral rewards</p>
        <strong>₹1500</strong>
        <span>Available to earn · not yet scratched</span>
      </section>
      <section className="pass-card flat">
        <h2>No transactions yet</h2>
        <p>Rewards you scratch after a successful referral will show up here.</p>
        <button type="button" onClick={() => navigate("/refer")}>Go to Refer & Earn</button>
      </section>
    </div>
  );
}

export function FundsPage() {
  return (
    <div className="subpage tab-page">
      <h1>Mutual Funds</h1>
      <p className="lead">Insta funds you can start from ₹100. Past performance is not a guarantee.</p>
      <article className="plain-card">
        <h2>Axis ICICI Insta Fund</h2>
        <p>6.63% past 3Y XIRR · SIP from ₹100</p>
        <span>Target predictable growth</span>
      </article>
      <article className="plain-card">
        <h2>ICICI Pru Liquid Fund</h2>
        <p>6.59% past 3Y XIRR · SIP from ₹100</p>
        <span>Target steady liquidity</span>
      </article>
      <p className="fine">*Returns are shown based on past performance of funds</p>
    </div>
  );
}

export function GoldPage() {
  const { showToast } = useAppState();
  return (
    <div className="subpage tab-page">
      <h1>Gold & Silver</h1>
      <p className="lead">Save in digital gold and silver alongside your Insta Fund.</p>
      <article className="plain-card">
        <h2>Digital gold</h2>
        <p>Start small and sell anytime. Prices follow the live market.</p>
        <button type="button" onClick={() => showToast("Gold saving starts after KYC")}>Start with gold</button>
      </article>
      <article className="plain-card">
        <h2>Digital silver</h2>
        <p>A second metal, same anytime withdrawal.</p>
        <button type="button" onClick={() => showToast("Silver saving starts after KYC")}>Start with silver</button>
      </article>
    </div>
  );
}

export function LoansPage() {
  const { showToast } = useAppState();
  return (
    <div className="subpage tab-page">
      <h1>Loans</h1>
      <p className="lead">Personal loans are offered with partner lenders after you finish KYC.</p>
      <article className="plain-card">
        <h2>Check offers</h2>
        <p>Approval, limit, and pricing are decided by the lending partner.</p>
        <button type="button" onClick={() => showToast("Complete KYC to view loan offers")}>See loan offers</button>
      </article>
    </div>
  );
}

export function CardsPage() {
  return (
    <div className="subpage tab-page">
      <h1>Cards</h1>
      <p className="lead">Insta EMI card from Bajaj Finance.</p>
      <img className="cards-hero" src="/home/emi.jpg" alt="Insta EMI Card, limit up to 3 lakh, no annual fee" />
      <p className="fine">Limit up to ₹3 lakh. No annual fee. Terms and conditions apply.</p>
    </div>
  );
}
