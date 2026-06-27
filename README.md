<div align="center">
  <h1>Cybersecurity Portfolio</h1>
  <p><strong>A responsive, dynamic portfolio showcasing cybersecurity projects, infrastructure labs, and technical expertise.</strong></p>
</div>

---

## Overview

This repository contains the source code for my personal cybersecurity portfolio. It is engineered as a lightweight, performant **Single Page Application (SPA)** utilizing strictly Vanilla JavaScript and custom CSS to eliminate dependency bloat.

## Features

- **SPA Architecture:** Seamless client-side routing without page reloads.
- **Responsive Layout:** Mobile-first design adapting fluidly to all viewport sizes.
- **Cyber News Aggregator:** Real-time RSS ingestion with localized memory caching.
- **Native Theming:** Client-persisted light and dark mode toggling.
- **Communication Protocol:** Integrated secure contact form with hidden honeypot validation.

## Tech Stack

| Core | Styling | Logic |
| :--- | :--- | :--- |
| HTML5 | CSS3 | JavaScript (ES6) |

## Project Structure

```text
├── index.html       # Main SPA entry point
├── style.css        # Core design system and layout logic
├── app.js           # Client-side router, caching, and DOM manipulation
└── data.js          # Structured data payloads for dynamic case studies
```

## Getting Started

The project requires zero build steps or package managers.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/p-chatzi/myweb.git
   ```

2. **Serve locally:**
   Navigate into the directory and spin up a lightweight HTTP server:
   ```bash
   cd myweb
   python3 -m http.server 8080
   ```

3. **View:**
   Open your browser and navigate to `http://localhost:8080`.

## Contact

Communications can be initiated via the secure contact form on the website, or by connecting directly on [LinkedIn](https://linkedin.com/in/peter-chatzigianis).
