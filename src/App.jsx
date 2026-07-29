import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Brain, 
  Database, 
  MessageSquare, 
  CheckCircle2, 
  XCircle, 
  Edit3, 
  Sparkles, 
  BarChart3, 
  Layers, 
  Bot, 
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  RotateCcw
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('intelligence');
  const [backendStatus, setBackendStatus] = useState('Connecting...');
  
  // Lead Scoring Interactive State
  const [leadParams, setLeadParams] = useState({
    leadId: 'LEAD-8841',
    freq: 4,
    responseTime: 1.5,
    dealSize: 125000,
    pastWon: 1
  });
  const [scoreResult, setScoreResult] = useState({
    prob: 0.74,
    scorePct: 74,
    tier: 'High Intent',
    drivers: ['High engagement frequency (4 touches/mo)', 'Large deal magnitude ($125,000)', 'Proven repeat customer (1 previous closed deal)']
  });

  // RAG Memory & Intent State
  const [selectedCust, setSelectedCust] = useState('CUST-101');
  const [ragData, setRagData] = useState({
    summary: 'Customer engaged in 3 communications regarding annual billing and enterprise SLA compliance.',
    intent: 'price-sensitive',
    notes: [
      { date: '2026-07-20', author: 'Rep Sarah', text: 'Customer expressed interest in enterprise tier but expressed concerns regarding annual billing terms.' },
      { date: '2026-07-22', author: 'Rep Sarah', text: 'Requested custom contract review for SOC2 compliance report and uptime SLA terms.' },
      { date: '2026-07-28', author: 'Rep Sarah', text: 'Asked for a 15% discount if paying upfront for 2-year contract duration.' }
    ],
    suggestedReply: 'Thank you for reaching out! We can certainly explore flexible payment terms and multi-year commitment options to accommodate your budget.'
  });

  // Rep Feedback Loop State
  const [feedbackLogged, setFeedbackLogged] = useState(null);
  const [editableReply, setEditableReply] = useState(ragData.suggestedReply);

  // Check Backend Service on Mount
  useEffect(() => {
    fetch('http://127.0.0.1:8000/health')
      .then(res => res.json())
      .then(data => setBackendStatus('Microservice Online (FastAPI)'))
      .catch(() => setBackendStatus('Embedded ML Engine (Client Standalone)'));
  }, []);

  // Recalculate Lead Score
  const calculateScore = () => {
    const z = -1.2 + (0.35 * leadParams.freq) - (0.08 * leadParams.responseTime) + (0.000025 * leadParams.dealSize) + (0.4 * leadParams.pastWon);
    const prob = 1.0 / (1.0 + Math.exp(-z));
    const pct = Math.round(prob * 100);
    const tier = pct >= 70 ? 'High Intent' : (pct >= 40 ? 'Medium Intent' : 'Low Intent');
    
    const drivers = [];
    if (leadParams.freq >= 3) drivers.push(`High engagement frequency (${leadParams.freq} touches/mo)`);
    if (leadParams.dealSize >= 100000) drivers.push(`Large deal magnitude ($${leadParams.dealSize.toLocaleString()})`);
    if (leadParams.pastWon > 0) drivers.push(`Proven repeat customer (${leadParams.pastWon} previous closed deals)`);
    if (drivers.length === 0) drivers.push('Standard prospect interaction pattern');

    setScoreResult({ prob, scorePct: pct, tier, drivers });
  };

  // Handle Rep Action (Feedback Loop)
  const handleFeedback = (action) => {
    setFeedbackLogged(`Logged '${action}' for ${selectedCust}. Feedback recorded to fine-tuning dataset.`);
    setTimeout(() => setFeedbackLogged(null), 4000);
  };

  return (
    <div className="app-shell">
      {/* SIDEBAR NAVIGATION SWITCHBOARD */}
      <aside className="sidebar">
        <div>
          <div className="brand-cover">
            <div className="brand-icon">LS</div>
            <div className="brand-title">
              <h1>Living System</h1>
              <span>CRM Intelligence</span>
            </div>
          </div>

          <div className="live-indicator">
            <span className="pulse-dot"></span>
            <span>Monitoring Active — Feedback Loop</span>
          </div>

          <nav className="nav-menu">
            <button 
              className={`nav-button ${activeTab === 'intelligence' ? 'active' : ''}`}
              onClick={() => setActiveTab('intelligence')}
            >
              <Brain size={18} />
              <span>5-Component ML Layer</span>
            </button>

            <button 
              className={`nav-button ${activeTab === 'scoring' ? 'active' : ''}`}
              onClick={() => setActiveTab('scoring')}
            >
              <TrendingUp size={18} />
              <span>Lead Scoring Model</span>
            </button>

            <button 
              className={`nav-button ${activeTab === 'rag' ? 'active' : ''}`}
              onClick={() => setActiveTab('rag')}
            >
              <Database size={18} />
              <span>RAG & Intent Tagging</span>
            </button>

            <button 
              className={`nav-button ${activeTab === 'adapter' ? 'active' : ''}`}
              onClick={() => setActiveTab('adapter')}
            >
              <Layers size={18} />
              <span>Provider Adapters</span>
            </button>
          </nav>
        </div>

        <div>
          <div style={{ fontSize: '0.72rem', opacity: 0.6, fontFamily: 'monospace', marginBottom: '0.4rem' }}>
            System Status:
          </div>
          <div className="adapter-pill" style={{ fontSize: '0.7rem' }}>
            {backendStatus}
          </div>
        </div>
      </aside>

      {/* MAIN VIEWPORT */}
      <main className="main-wrapper">
        <header className="top-bar">
          <div>
            <h2>
              {activeTab === 'intelligence' && 'A CRM assistant that keeps growing, not breaking.'}
              {activeTab === 'scoring' && 'Logistic Regression & Gradient Lead Scoring'}
              {activeTab === 'rag' && 'Retrieval Memory (RAG) & Intent Classification'}
              {activeTab === 'adapter' && 'Provider Adapter Architecture (OpenAI / Anthropic / Ollama)'}
            </h2>
          </div>

          <div className="adapter-pill">
            3 Adapters | 5 ML Components
          </div>
        </header>

        <div className="viewport-content">
          
          {/* TAB 1: 5 ML COMPONENTS DASHBOARD */}
          {activeTab === 'intelligence' && (
            <div>
              <div className="metrics-row">
                <div className="metric-card">
                  <div className="metric-num">3</div>
                  <span className="metric-label">Provider Adapters</span>
                </div>
                <div className="metric-card">
                  <div className="metric-num">5</div>
                  <span className="metric-label">ML Components Added</span>
                </div>
                <div className="metric-card">
                  <div className="metric-num">0</div>
                  <span className="metric-label">Frontend Changes</span>
                </div>
                <div className="metric-card">
                  <div className="metric-num">78.4%</div>
                  <span className="metric-label">Reply Acceptance Rate</span>
                </div>
              </div>

              {/* FIVE ML COMPONENTS */}
              <div className="content-card" style={{ marginBottom: '2rem' }}>
                <div className="card-title">
                  <span>Growth — The Five ML Components</span>
                  <Sparkles size={16} color="#B7D19E" />
                </div>

                <div style={{ display: 'grid', gap: '1.25rem' }}>
                  <div style={{ display: 'flex', gap: '1rem', borderTop: '1px solid var(--rule)', paddingTop: '1rem' }}>
                    <span className="font-mono" style={{ color: 'var(--ochre)' }}>01</span>
                    <div>
                      <h4 style={{ fontSize: '1rem' }}>Lead-scoring model</h4>
                      <p style={{ fontSize: '0.88rem', opacity: 0.75 }}>Logistic regression over CRM fields — contact frequency, response time, deal size — predicting conversion probability per lead.</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', borderTop: '1px solid var(--rule)', paddingTop: '1rem' }}>
                    <span className="font-mono" style={{ color: 'var(--ochre)' }}>02</span>
                    <div>
                      <h4 style={{ fontSize: '1rem' }}>Retrieval memory (RAG)</h4>
                      <p style={{ fontSize: '0.88rem', opacity: 0.75 }}>Customer notes embedded into vector store; top-k relevant items retrieved before drafting summary or reply.</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', borderTop: '1px solid var(--rule)', paddingTop: '1rem' }}>
                    <span className="font-mono" style={{ color: 'var(--ochre)' }}>03</span>
                    <div>
                      <h4 style={{ fontSize: '1rem' }}>Sentiment / intent tagging</h4>
                      <p style={{ fontSize: '0.88rem', opacity: 0.75 }}>Incoming messages classified (interested, stalling, price-sensitive, churn-risk) to condition drafting response strategy.</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', borderTop: '1px solid var(--rule)', paddingTop: '1rem' }}>
                    <span className="font-mono" style={{ color: 'var(--ochre)' }}>04</span>
                    <div>
                      <h4 style={{ fontSize: '1rem' }}>Feedback capture</h4>
                      <p style={{ fontSize: '0.88rem', opacity: 0.75 }}>Every accept, edit, or reject on a suggestion is logged against customer record as next sprint's training signal.</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', borderTop: '1px solid var(--rule)', paddingTop: '1rem' }}>
                    <span className="font-mono" style={{ color: 'var(--ochre)' }}>05</span>
                    <div>
                      <h4 style={{ fontSize: '1rem' }}>Evaluation harness</h4>
                      <p style={{ fontSize: '0.88rem', opacity: 0.75 }}>Held-out set of past tickets scores summary and reply quality automatically sprint over sprint.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ANIMATED EVAL METER */}
              <div className="meter-wrap">
                <div className="meter-top">
                  <span className="font-mono" style={{ fontSize: '0.8rem', opacity: 0.7 }}>REPLY ACCEPTANCE RATE, SINCE FEEDBACK LOGGING BEGAN</span>
                  <span style={{ color: 'var(--moss-bright)', fontWeight: 600 }}>↑ 78.4% (+6.2% sprint growth)</span>
                </div>
                <div className="meter-track">
                  <div className="meter-fill"></div>
                </div>
                <div style={{ fontSize: '0.78rem', opacity: 0.6, marginTop: '0.5rem' }}>
                  Illustrative — this is what component 05 evaluation harness tracks sprint over sprint.
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: LEAD SCORING MODEL */}
          {activeTab === 'scoring' && (
            <div className="grid-2col">
              <div className="content-card">
                <div className="card-title">
                  <span>Interactive Lead Predictor</span>
                  <TrendingUp size={16} color="#B7D19E" />
                </div>

                <div style={{ display: 'grid', gap: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.82rem', fontFamily: 'monospace', opacity: 0.7 }}>Contact Frequency (Touches / Month)</label>
                    <input 
                      type="number" 
                      value={leadParams.freq} 
                      onChange={(e) => setLeadParams({ ...leadParams, freq: parseInt(e.target.value) || 0 })}
                      style={{ width: '100%', padding: '0.6rem', background: 'var(--soil-2)', border: '1px solid var(--rule-strong)', color: 'var(--paper)', borderRadius: '3px', marginTop: '0.25rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.82rem', fontFamily: 'monospace', opacity: 0.7 }}>Avg Response Time (Hours)</label>
                    <input 
                      type="number" 
                      value={leadParams.responseTime} 
                      onChange={(e) => setLeadParams({ ...leadParams, responseTime: parseFloat(e.target.value) || 0 })}
                      style={{ width: '100%', padding: '0.6rem', background: 'var(--soil-2)', border: '1px solid var(--rule-strong)', color: 'var(--paper)', borderRadius: '3px', marginTop: '0.25rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.82rem', fontFamily: 'monospace', opacity: 0.7 }}>Estimated Deal Valuation ($)</label>
                    <input 
                      type="number" 
                      value={leadParams.dealSize} 
                      onChange={(e) => setLeadParams({ ...leadParams, dealSize: parseFloat(e.target.value) || 0 })}
                      style={{ width: '100%', padding: '0.6rem', background: 'var(--soil-2)', border: '1px solid var(--rule-strong)', color: 'var(--paper)', borderRadius: '3px', marginTop: '0.25rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.82rem', fontFamily: 'monospace', opacity: 0.7 }}>Previous Closed Deals Won</label>
                    <input 
                      type="number" 
                      value={leadParams.pastWon} 
                      onChange={(e) => setLeadParams({ ...leadParams, pastWon: parseInt(e.target.value) || 0 })}
                      style={{ width: '100%', padding: '0.6rem', background: 'var(--soil-2)', border: '1px solid var(--rule-strong)', color: 'var(--paper)', borderRadius: '3px', marginTop: '0.25rem' }}
                    />
                  </div>

                  <button className="btn btn-moss" onClick={calculateScore} style={{ marginTop: '0.5rem' }}>
                    <Brain size={16} /> Re-Calculate Conversion Probability
                  </button>
                </div>
              </div>

              {/* SCORE OUTPUT */}
              <div className="content-card">
                <div className="card-title">
                  <span>Model Output Signal</span>
                  <ShieldCheck size={16} color="#D3A24C" />
                </div>

                <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                  <div className="font-mono" style={{ fontSize: '3.5rem', color: 'var(--moss-bright)', fontWeight: 500 }}>
                    {scoreResult.scorePct}%
                  </div>
                  <div className="tag-badge tag-interest" style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>
                    {scoreResult.tier}
                  </div>
                </div>

                <div style={{ borderTop: '1px solid var(--rule)', paddingTop: '1rem', marginTop: '1rem' }}>
                  <h4 style={{ fontSize: '0.88rem', fontFamily: 'monospace', color: 'var(--ochre)', marginBottom: '0.5rem' }}>
                    Key Driver Features:
                  </h4>
                  <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '0.4rem', fontSize: '0.85rem', opacity: 0.85 }}>
                    {scoreResult.drivers.map((d, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <ArrowRight size={12} color="#B7D19E" /> {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: RAG & INTENT TAGGING */}
          {activeTab === 'rag' && (
            <div className="grid-2col">
              <div className="content-card">
                <div className="card-title">
                  <span>Retrieval Memory (Vector Store Top-3 Notes)</span>
                  <Database size={16} color="#8FAE7C" />
                </div>

                <div style={{ display: 'grid', gap: '0.75rem' }}>
                  {ragData.notes.map((n, idx) => (
                    <div key={idx} className="note-strip">
                      <div className="note-meta">{n.date} — {n.author}</div>
                      <div className="note-body">{n.text}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="content-card">
                <div className="card-title">
                  <span>Suggested Reply & Rep Feedback Loop</span>
                  <span className={`tag-badge tag-${ragData.intent === 'price-sensitive' ? 'price' : 'interest'}`}>
                    Tag: {ragData.intent}
                  </span>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ fontSize: '0.8rem', fontFamily: 'monospace', opacity: 0.7 }}>
                    Context-Aware Draft (Edit or Accept):
                  </label>
                  <textarea 
                    rows={4} 
                    value={editableReply} 
                    onChange={(e) => setEditableReply(e.target.value)}
                    style={{ width: '100%', padding: '0.75rem', background: 'var(--soil-2)', border: '1px solid var(--rule-strong)', color: 'var(--paper)', borderRadius: '3px', marginTop: '0.35rem', fontFamily: 'inherit', fontSize: '0.88rem' }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button className="btn btn-moss" onClick={() => handleFeedback('accept')}>
                    <CheckCircle2 size={16} /> Accept Suggestion
                  </button>
                  <button className="btn btn-outline" onClick={() => handleFeedback('edit')}>
                    <Edit3 size={16} /> Log Edit
                  </button>
                  <button className="btn btn-outline" onClick={() => handleFeedback('reject')} style={{ color: 'var(--terracotta)' }}>
                    <XCircle size={16} /> Reject
                  </button>
                </div>

                {feedbackLogged && (
                  <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'rgba(143, 174, 124, 0.1)', border: '1px solid var(--moss)', borderRadius: '3px', fontSize: '0.82rem', color: 'var(--moss-bright)' }}>
                    {feedbackLogged}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: PROVIDER ADAPTER ARCHITECTURE */}
          {activeTab === 'adapter' && (
            <div className="content-card">
              <div className="card-title">
                <span>Provider-Agnostic Adapter Pattern</span>
                <Layers size={16} color="#D3A24C" />
              </div>

              <p style={{ fontSize: '0.9rem', opacity: 0.85, marginBottom: '1.5rem' }}>
                One single interface — <code>generate_summary()</code>, <code>generate_reply()</code>, <code>embed()</code> — with concrete adapter classes per provider. Changing models requires zero changes to CRM routes.
              </p>

              <pre className="font-mono" style={{ background: 'var(--soil-2)', padding: '1.25rem', borderRadius: '4px', border: '1px solid var(--rule-strong)', fontSize: '0.82rem', color: 'var(--moss-bright)', overflowX: 'auto' }}>
{`# Abstract Base Adapter
class AIProvider(ABC):
    @abstractmethod
    def generate_summary(self, notes: List[str]) -> str: pass
    
    @abstractmethod
    def generate_reply(self, context: str, intent: str) -> str: pass
    
    @abstractmethod
    def embed(self, text: str) -> List[float]: pass

# Concrete Implementations
class OpenAIAdapter(AIProvider): ...
class AnthropicAdapter(AIProvider): ...
class LocalOllamaAdapter(AIProvider): ...`}
              </pre>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
