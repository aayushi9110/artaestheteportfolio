import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Book = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [selected, setSelected] = useState<Record<number, number>>({});

  const [form, setForm] = useState({
    budget: '',
    name: '',
    email: '',
    location: '',
    details: '',
    source: ''
  });

  const selectOption = (stepIndex: number, optionIndex: number) => {
    setSelected((prev) => ({ ...prev, [stepIndex]: optionIndex }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div id="pg-book" className="pg on">
      <div className="book-page">
        <div className="book-l">
          <div className="book-l-c">
            <button className="page-back" onClick={() => navigate('/')}>
              <svg width="13" height="9" viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 5H2M2 5L6 1M2 5l4 4"/></svg> Back
            </button>
            <span className="sec-label gold">Book a Consultation</span>
            <h2>Let's start with<br/>your <em>story</em></h2>
            <p>Tell us about your space, your vision, and what you're hoping to feel when you walk through the door. We'll take it from there.</p>
            <div className="book-faq">
              <div className="bfaq-item"><h5>How soon will I hear back?</h5><p>Within 24 hours on weekdays. We read every submission personally.</p></div>
              <div className="bfaq-item"><h5>What does a consultation cost?</h5><p>Initial discovery calls are complimentary. Project quotes follow after our first conversation.</p></div>
              <div className="bfaq-item"><h5>Can I book a virtual consult?</h5><p>Absolutely. We work with clients across 12 countries — location is never a barrier.</p></div>
              <div className="bfaq-item"><h5>How long do projects take?</h5><p>Virtual E-Design: 2-4 weeks. Full interior design: 8-16 weeks depending on scope.</p></div>
            </div>
          </div>
        </div>
        <div className="book-r">
          {!submitted && (
            <>
              <div className="bk-prog">
                {[0, 1, 2, 3].map((i) => (
                  <>
                    <div key={`dot-${i}`} className={`bk-step-dot ${i === step ? 'act' : ''} ${i < step ? 'done' : ''}`}>{i + 1}</div>
                    {i < 3 && <div key={`line-${i}`} className={`bk-step-line ${i < step ? 'done' : ''}`}></div>}
                  </>
                ))}
              </div>

              <div className={`bk-form-step ${step === 0 ? 'on' : ''}`}>
                <div className="bk-q">What kind of project are you looking for?</div>
                <div className="bk-sub">This helps us match you with the right designer and service.</div>
                <div className="bk-opts">
                  {[
                    { t: 'Interior Design', p: 'Full-service, in-person project for your home or commercial space.' },
                    { t: 'Virtual Consultation', p: 'Online E-Design package — perfect for any location, any budget.' },
                    { t: 'Fine Art Curation', p: 'Art sourcing, commissioning, and placement for your space.' },
                    { t: "I'm not sure yet", p: "Tell us about your space and we'll recommend the right service." }
                  ].map((opt, i) => (
                    <div key={opt.t} className={`bk-opt ${selected[0] === i ? 'sel' : ''}`} onClick={() => selectOption(0, i)}><span className="opt-icon">0{i + 1}</span><h4>{opt.t}</h4><p>{opt.p}</p></div>
                  ))}
                </div>
                <div className="bk-nav"><div></div><button className="btn-tr" onClick={() => setStep(1)}><span>Continue →</span></button></div>
              </div>

              <div className={`bk-form-step ${step === 1 ? 'on' : ''}`}>
                <div className="bk-q">Tell us about your space</div>
                <div className="bk-sub">The more you share, the better we can prepare for our conversation.</div>
                <div className="bk-opts">
                  {[
                    { t: 'Living Room', p: 'The room everyone sees — and feels.' },
                    { t: 'Bedroom', p: 'Where the day begins and ends.' },
                    { t: 'Kitchen / Dining', p: 'The heart of the home.' },
                    { t: 'Full Home / Commercial', p: 'A larger scope — multiple rooms or a workplace.' }
                  ].map((opt, i) => (
                    <div key={opt.t} className={`bk-opt ${selected[1] === i ? 'sel' : ''}`} onClick={() => selectOption(1, i)}><span className="opt-icon">0{i + 1}</span><h4>{opt.t}</h4><p>{opt.p}</p></div>
                  ))}
                </div>
                <div className="bk-nav"><button className="bk-back-btn" onClick={() => setStep(0)}><svg width="12" height="8" viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 5H2M2 5L6 1M2 5l4 4"/></svg> Back</button><button className="btn-tr" onClick={() => setStep(2)}><span>Continue →</span></button></div>
              </div>

              <div className={`bk-form-step ${step === 2 ? 'on' : ''}`}>
                <div className="bk-q">What's your aesthetic direction?</div>
                <div className="bk-sub">Don't overthink it — a gut feeling is enough.</div>
                <div className="bk-opts">
                  {[
                    { t: 'Warm & Organic', p: 'Natural materials, earthy tones, textures that invite touch.' },
                    { t: 'Sleek & Contemporary', p: 'Clean lines, considered restraint, modern confidence.' },
                    { t: 'Classic & Timeless', p: 'Rich layers, antiques, a sense of history and belonging.' },
                    { t: 'Eclectic & Personal', p: 'Collected over time, full of stories, nothing matching perfectly.' }
                  ].map((opt, i) => (
                    <div key={opt.t} className={`bk-opt ${selected[2] === i ? 'sel' : ''}`} onClick={() => selectOption(2, i)}><span className="opt-icon">0{i + 1}</span><h4>{opt.t}</h4><p>{opt.p}</p></div>
                  ))}
                </div>
                <div className="bk-field" style={{ marginTop: '8px' }}>
                  <label>Approximate Budget (optional)</label>
                  <select value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })}>
                    <option value="">I'd prefer to discuss this</option>
                    <option>Under £2,000 / $2,500</option>
                    <option>£2,000-£5,000 / $2,500-$6,500</option>
                    <option>£5,000-£15,000 / $6,500-$20,000</option>
                    <option>£15,000+ / $20,000+</option>
                  </select>
                </div>
                <div className="bk-nav"><button className="bk-back-btn" onClick={() => setStep(1)}><svg width="12" height="8" viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 5H2M2 5L6 1M2 5l4 4"/></svg> Back</button><button className="btn-tr" onClick={() => setStep(3)}><span>Continue →</span></button></div>
              </div>

              <div className={`bk-form-step ${step === 3 ? 'on' : ''}`}>
                <div className="bk-q">How do we reach you?</div>
                <div className="bk-sub">We'll send a personal reply — not a template, not a bot.</div>
                <div className="bk-field"><label>Your Full Name</label><input type="text" placeholder="Jane Smith" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}/></div>
                <div className="bk-field"><label>Email Address</label><input type="email" placeholder="jane@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}/></div>
                <div className="bk-field"><label>Location / City</label><input type="text" placeholder="New York, London, Sydney..." value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })}/></div>
                <div className="bk-field"><label>Tell us more (optional)</label><textarea rows={4} placeholder="Any context you'd like to share — links, images, a feeling. Anything helps." value={form.details} onChange={(e) => setForm({ ...form, details: e.target.value })}></textarea></div>
                <div className="bk-field"><label>How did you find us?</label><select value={form.source} onChange={(e) => setForm({ ...form, source: e.target.value })}><option value="">Select one</option><option>Instagram</option><option>Pinterest</option><option>Google</option><option>Friend or referral</option><option>Press / Editorial</option><option>Other</option></select></div>
                <div className="bk-nav"><button className="bk-back-btn" onClick={() => setStep(2)}><svg width="12" height="8" viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 5H2M2 5L6 1M2 5l4 4"/></svg> Back</button><button className="btn-tr" onClick={handleSubmit}><span>Send My Enquiry →</span></button></div>
              </div>
            </>
          )}

          {submitted && (
            <div className="bk-success" style={{ display: 'block' }}>
              <div className="check">✓</div>
              <h3>We've got your<br/><em>message</em></h3>
              <p>Thank you for reaching out. A real person on our team will read your enquiry and reply within 24 hours. In the meantime, feel free to explore our work.</p>
              <button className="btn-dk" onClick={() => navigate('/portfolio')}><span>Explore Portfolio</span></button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Book;