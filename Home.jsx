import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function StatCard({label, value}){
  return (
    <div className="card">
      <div className="small">{label}</div>
      <div className="stat">{value}</div>
    </div>
  );
}

export default function Home(){
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [showThanks, setShowThanks] = useState(false);
  const [thanksName, setThanksName] = useState('');

  function handlePledge(e){
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const amount = data.get('amount');
    const name = (data.get('name')||'').toString().trim();
    setThanksName(name || 'Supporter');
    setShowThanks(true);
    setShowPaymentOptions(false);
    // reset form
    e.currentTarget.reset();
  }

  function simulatePayment(provider){
    // In a real app we'd invoke the payment SDK here. For demo, mark as paid and thank user.
    setShowPaymentOptions(false);
    setShowThanks(true);
    setThanksName(prev => prev || provider + ' supporter');
    alert(`Simulated payment via ${provider} — thank you! (demo)`);
  }

  return (
    <>
      <section className="hero">
        <div className="container row grid-2">
          <div>
            <span className="badge">🏅 Gamified Environmental Learning</span>
            <h1 className="h1">Inspire climate action with quests, points, and real impact</h1>
            <p className="lead">EcoQuest turns sustainability into an engaging adventure for schools and colleges. Teach standards‑aligned lessons, complete eco‑quests, and climb leaderboards—together.</p>
            <div className="mt-16 flex gap-10 wrap">
              <Link className="btn" to="/dashboard">Explore dashboard preview</Link>
            </div>
            <div className="mt-12 small">✔ Standards‑aligned • ✔ Privacy‑first • ✔ Easy rollout</div>
          </div>
          <div>
            <div className="card">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-12">
                  <span className="badge">🌱</span>
                  <div>
                    <div className="fw-600">Green Guardians</div>
                    <div className="small">Environmental Club</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="small">Campus Rank</div>
                  <div className="fw-700">#1</div>
                </div>
              </div>
              <div className="row grid-3 mt-16">
                <StatCard label="Points" value={<span className="stat">12,480</span>} />
                <div className="card"><div className="small">Badges</div><div className="fw-700">🏆 18</div></div>
                <StatCard label="CO₂e Saved" value={<span className="stat">1,240 kg</span>} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="how">
        <div className="container">
          <h2>How EcoQuest works</h2>
          <div className="row grid-3 mt-16">
            <Link to="/learn" className="card card-link">
              <div className="fw-600">📘 Learn</div>
              <p>Standards‑aligned lessons crafted with educators.</p>
              <span className="btn">Explore</span>
            </Link>
            <Link to="/play" className="card card-link">
              <div className="fw-600">🎯 Play</div>
              <p>Weekly eco‑quests with points, badges, competition.</p>
              <span className="btn">Explore</span>
            </Link>
            <Link to="/impact" className="card card-link">
              <div className="fw-600">🌍 Impact</div>
              <p>Track CO₂e saved and waste diverted.</p>
              <span className="btn">Explore</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section" id="outcomes">
        <div className="container">
          <h2>Activities and benefits</h2>
          <div className="row grid-3 mt-16">
            <div className="card"><div className="fw-600">🎮 Gamified learning platform</div><p>Interactive lessons, challenges, quizzes, and real‑world tasks like tree‑planting and waste segregation.</p></div>
            <div className="card"><div className="fw-600">🏆 Eco‑points & competitions</div><p>Track eco‑points at class, house, and school levels.</p></div>
            <div className="card"><div className="fw-600">🎖 Rewards & recognition</div><p>Celebrate sustainable practices with digital badges.</p></div>
          </div>
        </div>
      </section>

      <section className="section" id="features">
        <div className="container">
          <h2>Built for schools and colleges</h2>
          <div className="row grid-3 mt-16">
            <div className="card">🏠 Leaderboards & Houses</div>
            <div className="card">📊 Impact Analytics</div>
            <div className="card">🛡 Privacy & Safety</div>
          </div>
        </div>
      </section>

      <section className="section" id="funding-sponsorship">
        <div className="container">
          <h2>Funding & Sponsorship</h2>
          <p className="lead">Support projects that expand internet access for rural learners, plant trees, run community cleanups, and fund local sustainability campaigns.</p>

          <div className="row grid-2 mt-16">
            <div className="card donation-card">
              <div className="fw-700">Fund Rural Internet Access</div>
              <div className="small mt-6">Help connect schools and community centers so children can access learning resources online.</div>
              <ul className="small mt-8">
                <li>Install connectivity and hardware</li>
                <li>Train local champions</li>
                <li>Maintain service and provide offline resources</li>
              </ul>
              <div className="mt-12">
                <form className="donation-form" onSubmit={handlePledge}>
                  <label className="small" htmlFor="amount">Pledge amount (USD)</label>
                  <select className="select mt-6" name="amount" id="amount" defaultValue="25">
                    <option value="10">$10 — Basic materials</option>
                    <option value="25">$25 — Connectivity credits</option>
                    <option value="50">$50 — Devices & supplies</option>
                    <option value="100">$100 — Sponsor a classroom</option>
                    <option value="250">$250 — Community hub</option>
                  </select>

                  <input className="input mt-10" type="text" name="name" placeholder="Your name (optional)" />
                  <input className="input mt-10" type="email" name="email" placeholder="Email (we'll follow up)" />
                  <textarea className="input mt-10" name="message" placeholder="Message (optional)" rows="4" />

                  <div className="mt-12 flex gap-8 wrap">
                    <button className="btn primary" type="submit">Pledge Support</button>
                    <button type="button" className="btn" onClick={()=>setShowPaymentOptions(true)}>Payment Options</button>
                    <a className="btn" href="/impact">Learn about funded projects</a>
                  </div>
                </form>

                {showPaymentOptions && (
                  <div className="card payment-options mt-12">
                    <div className="fw-700">Payment Options (Demo)</div>
                    <div className="small mt-6">Choose a simulated payment provider to complete your pledge.</div>
                    <div className="mt-10 flex gap-8 wrap">
                      <button className="btn primary" onClick={()=>{ simulatePayment('Stripe'); }}>Pay with Stripe</button>
                      <button className="btn" onClick={()=>{ simulatePayment('PayPal'); }}>Pay with PayPal</button>
                      <button className="btn ghost" onClick={()=>setShowPaymentOptions(false)}>Close</button>
                    </div>
                  </div>
                )}

                {showThanks && (
                  <div className="card mt-12 thanks-banner">
                    <div className="fw-700">Thank you{thanksName ? `, ${thanksName}` : ''}!</div>
                    <div className="small mt-6">Your pledge has been received. We will follow up via email with next steps and payment instructions (demo).</div>
                  </div>
                )}

              </div>
            </div>

            <div>
              <div className="card">
                <div className="fw-700">Sponsor a Tree‑Planting or Cleanup Campaign</div>
                <div className="small mt-6">Partner with local schools and organizations to fund campaigns that remove waste, restore habitats, and engage students in stewardship.</div>
                <div className="mt-10">
                  <ul className="small">
                    <li>Fund tree seedlings and planting events</li>
                    <li>Sponsor local waste collection drives</li>
                    <li>Support youth-led environmental projects</li>
                  </ul>
                </div>
                <div className="mt-12">
                  <a className="btn" href="/contact">Become a sponsor</a>
                </div>
              </div>

              <div className="card mt-12">
                <div className="fw-700">Corporate Partnerships & Grants</div>
                <div className="small mt-6">We welcome long-term partners to scale programs across regions and measure impact.</div>
                <div className="mt-12 flex gap-8 wrap">
                  <a className="btn" href="/contact">Partner with us</a>
                  <a className="btn ghost" href="/impact">View impact reports</a>
                </div>
              </div>
            </div>
          </div>

          <div className="small mt-12">All donations in this demo app are simulated. For production, integrate a payment provider (Stripe, PayPal) and legal donation flow.</div>
        </div>
      </section>
    </>
  );
}
