<div align="center">
  <h1 align="center">🛡️ Cybersecurity Portfolio</h1>
  <p align="center">
    <strong>A responsive, dynamic portfolio built to showcase cybersecurity projects, infrastructure labs, and technical expertise.</strong>
  </p>
</div>

<br />

## 🌟 Overview

This repository contains the source code for my personal cybersecurity portfolio. Designed with a dark-theme-first approach, the site acts as a **Single Page Application (SPA)** using pure Vanilla JavaScript, offering a seamless and fast browsing experience.

## ✨ Features

- **Dynamic SPA Routing:** Fluid navigation without page reloads using JavaScript.
- **Responsive Design:** Fully adapted for Desktop and Mobile with specific routing logic.
- **Theming:** Native Light/Dark mode toggle with local storage persistence.
- **Secure Contact Form:** Integrated form protection with Honeypot fields and rate-limiting logic.
- **Aesthetics:** Modern glassmorphism, dynamic gradients, and smooth CSS micro-animations.

## 🛠️ Tech Stack

- **HTML5:** Semantic and accessible structure.
- **CSS3:** Custom design system without heavy frameworks (CSS Variables, Flexbox, Grid).
- **JavaScript (ES6):** Custom routing, modal handling, and dynamic interaction.
- **FontAwesome:** Scalable vector icons.

## 🗂️ Project Structure

```text
├── index.html                  # Main SPA entry point
├── style.css                   # Core design system & utilities
├── app.js                      # Routing, animations, and core logic
├── data.js                     # Content data mapping for case studies
├── /projets/                   # Standalone HTML pages for projects (Mobile/Direct links)
│   ├── dev-api.html
│   ├── conception-infra.html
│   └── ...
└── /expertise/                 # Standalone HTML pages for technical expertise
    ├── reseau-et-secu-app.html
    ├── iam.html
    └── ...
```

## 🚀 Getting Started

No build process or dependencies are required. To view the project locally:

1. Clone the repository:

   ```bash
   git clone https://github.com/p-chatzi/myweb.git
   ```
2. Navigate to the directory:
   ```bash
   cd myweb
   ```
3. Open `index.html` in your favorite browser, or serve it locally using a simple HTTP server:
   ```bash
   python3 -m http.server 8080
   ```
   Then visit `http://localhost:8080`.

## 🤝 Contact

Feel free to reach out via the contact form on the website, or connect with me directly on [LinkedIn](https://linkedin.com/in/peter-chatzigianis).
