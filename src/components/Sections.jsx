"use client";
import { FOODPANDA, QUOTES, STEPS } from "@/lib/data";

const WORDS = ["Smashed to order", "Crispy chicken", "Loaded fries", "Fresh never frozen", "Cheese pulls", "Bahria Enclave", "Dynamite sauce", "Onion rings"];

export function Strip() {
  const row = [...WORDS, ...WORDS];
  return (
    <div className="strip" aria-hidden="true">
      <div className="strip-track">
        {[...row, ...row].map((w, i) => <span key={i}>{w}{i % 2 === 0 ? " ✦" : " ✦"}</span>)}
      </div>
    </div>
  );
}

export function Promo() {
  const go = () => {
    window.dispatchEvent(new CustomEvent("smashed:filter", { detail: "deals" }));
    const el = document.getElementById("menu");
    if (window.__lenis) window.__lenis.scrollTo(el, { offset: -88 }); else el.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="wrap">
      <section className="band" id="deals" data-reveal>
        <div>
          <span className="eyebrow">Feeding the crew?</span>
          <h2>Deals that <em className="flourish">actually</em> fill the table.</h2>
          <p>Burgers, sides and drinks bundled together — from a solo box at Rs. 1,899 up to the 6-burger Big Bang.</p>
          <button className="btn btn-pop" onClick={go} data-magnetic>See all deals <span aria-hidden="true">→</span></button>
        </div>
        <div className="fan" aria-hidden="true">
          <figure><img src="/images/menu/dual-box.jpg" alt="" loading="lazy" /></figure>
          <figure><img src="/images/menu/deal-2.jpg" alt="" loading="lazy" /></figure>
          <figure><img src="/images/menu/big-bang.jpg" alt="" loading="lazy" /></figure>
        </div>
      </section>
    </div>
  );
}

export function Steps() {
  return (
    <section className="sec" id="smash">
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow" data-reveal>How we smash</span>
          <h2 className="h2" data-split>Three moves. <em className="flourish">Sixty</em> seconds.</h2>
          <p className="sec-sub" data-reveal>The whole trick is heat, pressure and not messing about.</p>
        </div>
        <div className="steps">
          {STEPS.map((s) => (
            <article className="step" key={s.n} data-reveal-card>
              <div className="step-img">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.img} alt={s.title} loading="lazy" />
                <span className="step-n">{s.n}</span>
              </div>
              <div className="step-body"><h3>{s.title}</h3><p>{s.body}</p></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Reviews() {
  const row = [...QUOTES, ...QUOTES];
  return (
    <section className="sec" id="reviews">
      <div className="wrap">
        <div className="rev-head">
          <div className="sec-head" style={{ marginBottom: 0 }}>
            <span className="eyebrow" data-reveal>Reviews</span>
            <h2 className="h2" data-split>Loved by <em className="flourish">Bahria</em>.</h2>
          </div>
          <div className="score" data-reveal><strong>4.9</strong><span><b>★★★★★</b>on foodpanda</span></div>
        </div>
      </div>
      <div className="revs" aria-label="Customer reviews from foodpanda">
        <div className="revs-track">
          {row.map((q, i) => (
            <figure className="rev" key={i} aria-hidden={i >= QUOTES.length}>
              <div className="stars">★★★★★</div>
              <p>“{q.body}”</p>
              <footer><i>{q.name[0]}</i>{q.name}<span>foodpanda</span></footer>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Find() {
  return (
    <section className="sec" id="find">
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow" data-reveal>Find us</span>
          <h2 className="h2" data-split>Hungry? <em className="flourish">Come hungry.</em></h2>
        </div>
        <div className="find">
          <div className="find-card" data-reveal-card>
            <h3>Bahria Enclave, Sector A</h3>
            <p>Islamabad. Dine in, take away, or let us come to you.</p>
            <a className="btn btn-primary" href="https://www.google.com/maps/search/?api=1&query=SMASHED+Bahria+Enclave+Sector+A+Islamabad" target="_blank" rel="noopener noreferrer">Get directions</a>
          </div>
          <div className="find-card alt" data-reveal-card>
            <h3>Order on foodpanda</h3>
            <p>Live hours, live delivery times, and your saved address.</p>
            <a className="btn btn-primary" href={FOODPANDA} target="_blank" rel="noopener noreferrer">Open foodpanda</a>
          </div>
          <div className="find-card" data-reveal-card>
            <h3>Order direct on WhatsApp</h3>
            <p>Build your cart above and send it to us in one tap.</p>
            <a className="btn btn-ghost" href="#menu">Start your order</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-in">
        <div className="footer-big" aria-hidden="true">SMASHED</div>
        <div className="footer-meta">
          <span>© SMASHED · Bahria Enclave, Sector A, Islamabad</span>
          <nav aria-label="Footer"><a href="#menu">Menu</a><a href="#reviews">Reviews</a><a href="#find">Find us</a></nav>
        </div>
        <p className="footer-meta" style={{ fontSize: ".75rem" }}>Design demo · menu &amp; prices from the foodpanda listing · add-on prices are placeholders.</p>
      </div>
    </footer>
  );
}
