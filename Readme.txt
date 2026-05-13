# GEO·LENS — Middle East Intelligence Briefing

> Academic project · v0.1.0

## File Structure

```
geo-lens/
├── index.html        ← Page 1: Home, Masthead, Ticker (Member 1)
├── topics.html       ← Page 2: Briefing Topics + Stats  (Member 2)
├── chat.html         ← Page 3: The Analyst Chatbot       (Member 3)
├── dashboard.html    ← Page 4: Threat Map + Oil Prices   (Member 4)
├── styles.css        ← Shared stylesheet (all pages use this)
├── app.js            ← Shared JavaScript (all pages use this)
└── README.md
```

## Team Split

| Member | File | Responsibility |
|--------|------|---------------|
| 1 | `index.html` | Top bar navigation, Hero masthead, News ticker, Landing cards |
| 2 | `topics.html` | Briefing topic grid, Stability stat blocks |
| 3 | `chat.html` | AI chatbot interface, message rendering, quick chips |
| 4 | `dashboard.html` | SVG threat map, stability index table, oil price cards |

> **Shared files** (`styles.css`, `app.js`) — agree on changes as a group before pushing.

## How to Run

Just open `index.html` in any browser — no build step required.  
All fonts load from Google Fonts CDN.

## GitHub Workflow

```bash
# Each member works on their assigned file
git checkout -b member-1/navbar      # adjust branch name per your file
# make your changes...
git add index.html
git commit -m "feat: add responsive topbar and hero masthead"
git push origin member-1/navbar
# open a Pull Request → review → merge
```

## Tech Stack

- HTML5 / CSS3 / Vanilla JS
- Google Fonts (Fraunces · JetBrains Mono · Inter)
- Gemini 2.5 Pro (chatbot — wire up real API key in `app.js`)