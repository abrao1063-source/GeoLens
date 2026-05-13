/* ============================================================
   GEO LENS — Shared JavaScript
   app.js · All pages import this
   ============================================================ */

// ============ Topic switcher (topics.html) ============
function selectTopic(el, topic) {
  document.querySelectorAll('.topic').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  // If chat area exists (chat.html is open in same tab via iframe — no-op otherwise)
  if (typeof addBotMessage === 'function') {
    addBotMessage(`Switching context to **${topic}**. I'm ready for your questions on this domain.`, 'CONTEXT SWITCH');
  }
}

// ============ Chat helpers (chat.html) ============
function timeNow() {
  const d = new Date();
  return `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')} GMT`;
}

function escapeHtml(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function addUserMessage(text) {
  const chatArea = document.getElementById('chatArea');
  if (!chatArea) return;
  const div = document.createElement('div');
  div.className = 'msg user';
  div.innerHTML = `<div class="meta-line">▸ YOU · ${timeNow()}</div>
    <div class="bubble">${escapeHtml(text)}</div>`;
  chatArea.appendChild(div);
  chatArea.scrollTop = chatArea.scrollHeight;
}

function addTyping() {
  const chatArea = document.getElementById('chatArea');
  if (!chatArea) return;
  const div = document.createElement('div');
  div.className = 'msg bot';
  div.id = 'typingIndicator';
  div.innerHTML = `<div class="meta-line">▸ THE ANALYST · ANALYZING…</div>
    <div class="typing"><span></span><span></span><span></span></div>`;
  chatArea.appendChild(div);
  chatArea.scrollTop = chatArea.scrollHeight;
}

function removeTyping() {
  const t = document.getElementById('typingIndicator');
  if (t) t.remove();
}

function addBotMessage(text, label = 'THE ANALYST') {
  const chatArea = document.getElementById('chatArea');
  if (!chatArea) return;
  const formatted = text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g,   '<em>$1</em>');
  const div = document.createElement('div');
  div.className = 'msg bot';
  div.innerHTML = `<div class="meta-line">▸ ${label} · ${timeNow()}</div>
    <div class="bubble">${formatted}
      <span class="source">SOURCES: GEMINI 2.5 · CRISIS GROUP · REUTERS · IEA</span>
    </div>`;
  chatArea.appendChild(div);
  chatArea.scrollTop = chatArea.scrollHeight;
}

// ============ Canned responses ============
const responses = {
  oil:     "Brent is trading at **$86.10/bbl**, up 2.4% on renewed concerns over Strait of Hormuz traffic. **OPEC+** is holding voluntary cuts of ~2.2m bpd through Q3 2026. Demand from China remains the swing factor — *expect range-bound trading between $82–$92* unless geopolitical risk premium widens.",
  gaza:    "The situation remains **critical**. Humanitarian access has improved marginally following the April 2026 corridor agreement, but reconstruction has not begun at scale. *Civilian displacement* exceeds 1.7m. International mediation continues via Egypt and Qatar; a durable political framework remains absent.",
  iran:    "As of 2026, Iran faces layered sanctions across **oil exports, banking (SWIFT), shipping, and dual-use technology**. The 2015 JCPOA framework remains formally suspended. Recent EU adjustments target IRGC-affiliated entities. *Snapback provisions* expired in October 2025.",
  lebanon: "Lebanon is rated **ELEVATED**. The presidential vacancy was resolved in late 2025, but the economic crisis persists — currency down ~98% from 2019 peak. Hezbollah-Israel border tensions remain a daily risk. IMF program negotiations are in their *fourth round*.",
  accords: "The **Abraham Accords** (UAE, Bahrain, Morocco, Sudan) remain in force, with expanded economic cooperation. Saudi normalization talks were paused after October 2023 but resumed *quietly* in 2025. A formal agreement is contingent on a credible Palestinian political horizon.",
  default: "Based on current intelligence streams, this is an **evolving situation**. Key actors are recalibrating positions, and the next 48–72 hours will be telling. I recommend monitoring *primary sources*: Crisis Group situation reports, Reuters wire, and Al-Monitor regional desks. Would you like me to drill into a specific country or vector?"
};

function getResponse(q) {
  const lower = q.toLowerCase();
  if (/oil|brent|opec|crude|barrel|wti/.test(lower))       return responses.oil;
  if (/gaza|palestin|israel|west bank/.test(lower))        return responses.gaza;
  if (/iran|tehran|sanction/.test(lower))                  return responses.iran;
  if (/lebanon|beirut|hezbollah/.test(lower))              return responses.lebanon;
  if (/abraham|accord|normaliz/.test(lower))               return responses.accords;
  return responses.default;
}

function sendMessage() {
  const input = document.getElementById('userInput');
  if (!input) return;
  const text = input.value.trim();
  if (!text) return;
  addUserMessage(text);
  input.value = '';
  addTyping();
  setTimeout(() => {
    removeTyping();
    addBotMessage(getResponse(text));
  }, 1100 + Math.random() * 900);
}

function quickAsk(q) {
  const input = document.getElementById('userInput');
  if (input) input.value = q;
  sendMessage();
}

// Bind Enter key
document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('userInput');
  if (input) input.addEventListener('keydown', e => { if (e.key === 'Enter') sendMessage(); });
});
