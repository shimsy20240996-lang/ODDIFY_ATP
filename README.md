# Oddify — Multilingual Service Marketplace Concept

[![Project: SDGP](https://img.shields.io/badge/Project-SDGP%202026%2F27-0B6E69?style=flat-square)](https://www.iit.ac.lk/)
[![Institution: IIT Sri Lanka](https://img.shields.io/badge/Institution-IIT%20Sri%20Lanka-064E4A?style=flat-square)](https://www.iit.ac.lk/)
[![Architecture: Vanilla Web](https://img.shields.io/badge/Stack-HTML5%20%7C%20CSS3%20%7C%20Vanilla%20JS-F4B223?style=flat-square)](#technology-stack)
[![Accessibility: WCAG AAA Contrast](https://img.shields.io/badge/Accessibility-WCAG%20Compliant-10B981?style=flat-square)](#accessibility--usability)

> **"Got skills? Get paid. Got tasks? Get them done."**  
> Oddify is a mobile-first digital service marketplace concept designed specifically for Sri Lanka, bridging the gap between everyday task owners and skilled local service providers through native trilingual support in **Sinhala (සිංහල)**, **Tamil (தமிழ்)**, and **English**.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Problem Statement](#problem-statement)
3. [Proposed Solution](#proposed-solution)
4. [Key Features & Live Demonstrations](#key-features--live-demonstrations)
   - [A. Multilingual AI Assistant Preview](#a-multilingual-ai-assistant-preview)
   - [B. Interactive Job Marketplace](#b-interactive-job-marketplace)
   - [C. Customer Journey Workflow](#c-customer-journey-workflow)
   - [D. Worker Journey Workflow](#d-worker-journey-workflow)
   - [E. Interactive Process Timeline](#e-interactive-process-timeline)
   - [F. Visual Polish & 3D Background Effects](#f-visual-polish--3d-background-effects)
   - [G. Team Section](#g-team-section)
   - [H. Waitlist Lead Capture](#h-waitlist-lead-capture)
5. [Feature Availability & System Limitations](#feature-availability--system-limitations)
6. [Technology Stack](#technology-stack)
7. [Project Structure](#project-structure)
8. [Running the Project Locally](#running-the-project-locally)
9. [Responsive Design & Viewport Validation](#responsive-design--viewport-validation)
10. [Project Team & Responsibilities](#project-team--responsibilities)
11. [Future Roadmap](#future-roadmap)
12. [Academic Information](#academic-information)
13. [License & Disclaimer](#license--disclaimer)

---

## Project Overview

**Oddify** is a conceptual service platform developed as an undergraduate Agile Team Project (SDGP) at the **Informatics Institute of Technology (IIT), Sri Lanka**. 

In Sri Lanka, finding reliable help for domestic repairs, cleaning, moving, and maintenance is largely fragmented, relying on informal recommendations. Simultaneously, thousands of skilled technicians, independent tradespeople, and part-time earners lack a credible digital space to advertise their services, discover nearby opportunities, and build verifiable reputations.

Oddify aims to solve these challenges through a centralized, location-aware, and multilingual marketplace tailored to the Sri Lankan domestic economy.

---

## Problem Statement

### Challenges Faced by Customers
- **Difficulty Finding Reliable Workers**: Sourcing skilled plumbers, electricians, or handymen on short notice is difficult, typically dependent on unreliable word-of-mouth recommendations.
- **Unclear and Arbitrary Costs**: The informal service market lacks pricing transparency, leading to unexpected charges, bargaining disputes, and inconsistent rates.
- **Difficulty Comparing Quotations**: Customers cannot easily review multiple competitive bids with timeframes and worker credentials before committing to a job.
- **Trust and Safety Concerns**: Inviting unknown service workers into homes carries perceived safety risks due to the absence of background checks or identity review.

### Challenges Faced by Service Workers
- **Inconsistent Task Inflow**: Skilled workers and part-time earners struggle to find a steady stream of clients outside their immediate personal contacts.
- **Limited Marketing Channels**: Tradespeople rarely have access to accessible, cost-effective digital tools to showcase their trade certifications, completed jobs, or customer reviews.
- **Travel Inefficiencies**: Workers frequently accept distant jobs due to lack of local visibility, spending disproportionate time and money commuting.
- **Bid and Agreement Management**: Managing multiple inquiries, job specifications, and agreements informally via phone calls often leads to misunderstandings and delayed payments.

---

## Proposed Solution

Oddify proposes an accessible, mobile-first marketplace platform designed around four foundational pillars:

```
┌────────────────────────────────────────────────────────────────────────┐
│                             ODDIFY PLATFORM                            │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
    ┌─────────────────┬─────────────┴─────┬─────────────────┐
    ▼                 ▼                   ▼                 ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ Multilingual │ │ Proximity    │ │ Transparent  │ │ Planned      │
│ AI Scoping   │ │ Matching     │ │ Quotations   │ │ Safety & ID  │
│ (EN, SI, TA) │ │ (Hyperlocal) │ │ (In LKR)     │ │ Review       │
└──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘
```

1. **Multilingual Inclusivity**: A chat-based interface that allows users to describe tasks in everyday words across Sinhala, Tamil, or English.
2. **Hyperlocal Discovery**: Radius-based matching in cities like Colombo, Nugegoda, Dehiwala, Gampaha, and Negombo so workers spend less time traveling and more time earning.
3. **Competitive Quotation Bidding**: Transparent upfront pricing proposals submitted in Sri Lankan Rupees (LKR).
4. **Planned Security Architecture**: Verification badges, customer ratings, and two-party arrival-code confirmation.

---

## Key Features & Live Demonstrations

The landing page incorporates interactive demonstration modules illustrating the user experience designed in the team's Figma prototype:

### A. Multilingual AI Assistant Preview
Located in the **Key Features** section, this phone mockup showcases how customer task intake works:
- **Trilingual Switching**: Dedicated tabs for **English**, **Sinhala (සිංහල)**, and **Tamil (தமிழ்)**.
- **Interactive Conversation Flow**: Switching languages dynamically renders localized problem statements, customer queries, and assistant recommendations.
- **Quick Suggestion Chips**: Clickable prompts (*"Find a plumber"*, *"I need an electrician"*, *"Find nearby jobs"* / *"ජලනල කාර්මිකයෙකු සොයන්න"*) that automatically generate assistant responses.
- **Typing Indicator**: An animated three-dot indicator simulating natural processing latency.
- *Implementation Note*: This is a **frontend demonstration** using client-side vanilla JavaScript and pre-structured language vectors; it is not connected to a live production LLM backend.

### B. Interactive Job Marketplace
Demonstrates the worker-facing job feed inside an interactive smartphone mockup:
- **Sample Sri Lankan Task Listings**:
  1. *Plumbing repair* – Nugegoda – LKR 3,500 (2 hrs)
  2. *Electrical repair* – Colombo 07 – LKR 4,500 (3 hrs)
  3. *House cleaning* – Dehiwala – LKR 2,500 (4 hrs)
  4. *Furniture moving* – Gampaha – LKR 4,000 (3 hrs)
  5. *Garden maintenance* – Negombo – LKR 3,000 (2 hrs)
- **Category Filter Chips**: Filter by *All*, *Plumbing*, *Electrical*, *Cleaning*, *Moving*, *Gardening*, and *Delivery*.
- **Location Dropdown Filter**: Filter by Sri Lankan cities (*Colombo*, *Nugegoda*, *Dehiwala*, *Gampaha*, *Negombo*).
- **Combined Filtering**: Simultaneous category and location filtering with dynamic counter indicators and empty-state messaging.
- **Three-Tier View Transition**:
  - *View 1: Feed View* — Browse filtered task cards.
  - *View 2: Details View* — Inspect task background, customer notes, and required skill tags.
  - *View 3: Quotation View* — Input a custom price in LKR, add worker availability notes, and simulate proposal submission with validation and confirmation.
- *Implementation Note*: All listings, detail views, and bids are client-side demonstrations; no live financial or transactional data is processed.

### C. Customer Journey Workflow
Outlines the 4-step consumer experience:
1. **01 · Post a Job**: Customers describe tasks in their preferred language with details, photos, and location.
2. **02 · Discover Workers**: Suitable, proposed verified workers in the vicinity review the task requirements.
3. **03 · Receive Quotations**: Customers receive transparent price bids with estimated timeframes directly in-app.
4. **04 · Choose a Worker**: Compare ratings, quotes, and proposed verification before booking with planned arrival-code protection.

### D. Worker Journey Workflow
Outlines the 4-step service provider experience:
1. **01 · Create a Profile**: Showcase skills, service categories, working locations, and proposed identity review.
2. **02 · Discover Opportunities**: Browse nearby task listings filtered by distance and preferred hours.
3. **03 · Submit Quotations**: Propose competitive price estimates in LKR with availability notes.
4. **04 · Manage Accepted Jobs**: Coordinate arrival with planned arrival-code checks, complete tasks safely, and build reputation.

### E. Interactive Process Timeline
- **Journey Switcher**: ARIA-accessible tablist toggling between *Customer Journey* and *Worker Journey*.
- **Connecting Progress Bar**: An animated line that dynamically tracks and fills as steps are activated.
- **Active Step Highlights**: Subtle teal and amber glow indicators emphasizing the current step in the workflow.
- **Keyboard Navigation**: Fully operable using `ArrowLeft`, `ArrowRight`, `Home`, and `End` keys.

### F. Visual Polish & 3D Background Effects
- **Interactive 3D Particle Network**: Pure HTML5 Canvas background in the hero with floating teal and amber nodes, simulated depth ($z$-parallax), proximity connection lines, and cursor repulsion on desktop. Pauses automatically when scrolled out of view.
- **Multi-Layer Aurora**: Dual animated gradient auras (`auraFloat` and `auroraWave`) providing organic, slow-moving backdrops while preserving WCAG text contrast.
- **Floating 3D Geometric Shapes**: Translucent 3D ring (`.geo-ring-1`) and frosted prism (`.geo-poly-1`) with specular rim lighting and rotation keyframes.
- **Topographic Contour Overlay**: Ultra-subtle vector contour pattern (`.mint::before` at 1.8% opacity) layered behind the marketplace section to evoke geographical connection.
- **Desktop Custom Cursor Glow**: Branded trailing indicator (`.cursor-glow`) that expands over interactive elements. Native system cursor remains visible, and the effect is disabled on touch devices and under reduced motion.
- **3D Card Hover Tilt**: Subtle card elevation and tilt calculated via `requestAnimationFrame` on fine-pointer devices.
- **Scroll Progress & Back-to-Top**: Fixed gradient progress bar at the top of the viewport and a floating back-to-top button appearing after 380px of scroll.

### G. Team Section
Features all five undergraduate contributors from Informatics Institute of Technology (IIT), complete with individual role badges and responsibility breakdowns.

### H. Waitlist Lead Capture
- Form inputs for user name, email, and user role selection (*"Get tasks done"* vs. *"Earn with my skills"*).
- Validation for email syntax and required consent checkbox.
- Dynamic submission feedback with loading, success, and error states.
- *Integration Note*: Includes a simulated handler that checks for the placeholder Formspree endpoint (`YOUR_FORM_ID`) before attempting live submission.

---

## Feature Availability & System Limitations

To maintain academic integrity and technical accuracy, the table below clarifies what is implemented in the current frontend code versus what is specified as a Figma prototype concept or proposed for future backend development:

| Feature / Module | Current Implementation Status | How It Is Implemented | Notes & Operational Limitations |
| :--- | :---: | :--- | :--- |
| **Multilingual AI Assistant** | 🟢 Frontend Demo | Vanilla JS conversation trees with typing latency simulation in Sinhala, Tamil, and English | Mock dialogue trees; not connected to a live OpenAI / Gemini API backend. |
| **Job Marketplace Feed** | 🟢 Frontend Demo | 5 realistic Sri Lankan sample jobs with category/location filtering and quotation modal | Client-side memory array; listings and bids are not saved to a database. |
| **Customer/Worker Switcher** | 🟢 Fully Functional | WAI-ARIA tablist with keyboard navigation and animated progress tracking | Demonstrates the workflow concept designed in the team's Figma prototype. |
| **Capability Scope Counters** | 🟢 Fully Functional | IntersectionObserver-triggered animated count-up for genuine project pillars | Represents academic project scope (3 languages, 4 modules, 6 categories, 5 developers). |
| **Interactive 3D Particles** | 🟢 Fully Functional | Hardware-accelerated HTML5 Canvas with proximity lines and desktop pointer repulsion | Automatically pauses when out of view; single static frame on reduced-motion. |
| **Waitlist Validation** | 🟢 Frontend Functional | Client-side validation with sending/success/error feedback alerts | Configured with a placeholder endpoint (`YOUR_FORM_ID`); requires a live Formspree form ID for production lead capture. |
| **Real-Time GPS Tracking** | 🟡 Figma Concept | Static vector map illustration with route path and pulsing beacon dot | Concept only. Real-time driver/worker GPS tracking requires Mapbox/Google Maps API and WebSocket backend. |
| **Worker Identity Verification** | 🔵 Proposed Capability | UI badge chip displaying *"Identity reviewed"* and arrival confirmation code | Concept only. Production requires administrative government ID / police clearance verification pipeline. |
| **Arrival-Code Confirmation** | 🔵 Proposed Capability | Displayed as a code-check row in profile mockup and workflow steps | Concept only. Proposed two-factor arrival confirmation system. |
| **Payment Gateway Integration**| 🔵 Proposed Capability | LKR currency estimates in job listings and quotation submission inputs | Concept only. No financial transactions take place; requires integration with gateways like PayHere. |

*Legend: 🟢 Implemented in Current Codebase | 🟡 Figma Prototype Specification | 🔵 Proposed Future Capability*

---

## Technology Stack

The project is built entirely using standard web technologies without external runtime libraries or frameworks:

- **HTML5**: Semantic document structure (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<nav>`), form validation attributes, and WAI-ARIA attributes (`role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected`, `aria-controls`, `aria-hidden`, `aria-live`).
- **CSS3**:
  - CSS Custom Properties (`--teal: #0B6E69`, `--dark: #064E4A`, `--yellow: #F4B223`, `--mint: #E6F0EC`, `--bg: #F5F8F7`).
  - Modern Layouts: CSS Grid (desktop 6-column team, feature splits) and Flexbox.
  - Visual Depth: 3D perspective transforms (`rotateY`, `rotateX`), backdrop-filter glassmorphism (`backdrop-filter: blur()`), and GPU-accelerated `@keyframes`.
  - Media Queries: Breakpoints at 860px, 580px, 480px, 380px, 360px, and `@media (prefers-reduced-motion: reduce)`.
- **Vanilla JavaScript (ES6+)**:
  - Modular DOM manipulation and event delegation.
  - `IntersectionObserver` for viewport-triggered scroll-reveals, animated counter triggers, and canvas pausing.
  - `requestAnimationFrame` for cursor spotlight tracking, 3D card tilt, and desktop cursor lerping.
- **HTML5 Canvas API**: 2D context rendering for the 3D particle network.
- **Typography**: Google Fonts ([Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) for headings and branding; [Inter](https://fonts.google.com/specimen/Inter) for body copy).
- **Version Control**: Git & GitHub.

---

## Project Structure

```
Oddify/
├── images/
│   ├── aakif.jpeg                 # Team Member 2 photo (Aakif)
│   ├── apple-touch-icon.png       # 180x180 iOS touch icon
│   ├── favicon.ico                # 32x32 multi-resolution browser icon
│   ├── favicon.png                # PNG favicon
│   ├── nethmi.jpg                 # Team Member 1 photo (Nethmi)
│   ├── oddify-logo-full.png       # Full Oddify brand logo
│   ├── oddify-mark.png            # Circular Oddify brand mark
│   ├── og-image.png               # Open Graph 1200x630 social preview card
│   ├── senura.jpg                 # Team Member 4 photo (Senura)
│   ├── shimsy.png                 # Team Member 3 photo (Shimsy Ahamed)
│   └── sulaiman.jpg               # Team Member 5 photo (Sulaiman)
├── index.html                     # Semantic landing page structure & demo mockups
├── style.css                      # Master stylesheet (theme, 3D effects, animations)
├── script.js                      # Application logic (AI demo, marketplace, particles)
└── README.md                      # Comprehensive project documentation
```

---

## Running the Project Locally

Because the project is built with Vanilla HTML, CSS, and JavaScript, it does not require `npm install` or a build step. However, running through a local web server is recommended for proper module loading and Canvas security:

### Prerequisites
- A modern web browser (Google Chrome, Mozilla Firefox, Microsoft Edge, or Safari).
- [Python 3.x](https://www.python.org/) installed (comes standard on most developer systems).

### Windows Instructions

1. **Clone the Repository**:
   ```powershell
   git clone https://github.com/<your-username>/ODDIFY_ATP.git
   cd ODDIFY_ATP
   ```

2. **Navigate to the Project Folder**:
   Ensure you are in the directory containing `index.html`.

3. **Start the Local HTTP Server**:
   ```powershell
   python -m http.server 5500
   ```

4. **View in Your Browser**:
   Open your browser and navigate to:
   ```
   http://localhost:5500
   ```

5. **Stop the Server**:
   Press `Ctrl + C` in your terminal or PowerShell window to shut down the server.

*Alternative*: You can also open the project using the **Live Server** extension in Visual Studio Code by right-clicking `index.html` and selecting **"Open with Live Server"**.

---

## Responsive Design & Viewport Validation

The landing page has been tested across 6 standard viewport widths with **zero horizontal overflow** (`document.documentElement.scrollWidth <= window.innerWidth`):

| Viewport Width | Device Category | Layout Adjustments | Clearance Status |
| :---: | :--- | :--- | :---: |
| **1440px** | Large Desktop | Full 3D hero stage, 4-column timeline, 4-column stats, 6-col team grid | ✅ Verified (Zero Overflow) |
| **1024px** | Laptop / Small Desktop | Proportional grid scaling, preserved 3D phone perspectives | ✅ Verified (Zero Overflow) |
| **768px** | Tablet Portrait | Single-column hero, 2-column timeline, 2-column team cards | ✅ Verified (Zero Overflow) |
| **480px** | Mobile Standard | Stacked vertical timeline, single-column stats banner | ✅ Verified (Zero Overflow) |
| **375px** | Compact Mobile | Scaled phone mockups (210px width), compact padding | ✅ Verified (Zero Overflow) |
| **320px** | Small Mobile | Geometric shapes hidden, flex-wrap on header tags | ✅ Verified (62px Margin Clearance) |

---

## Project Team & Responsibilities

Oddify was conceptualized and developed by a team of five Computer Science undergraduates from **Informatics Institute of Technology (IIT), Sri Lanka**:

| Team Member | Role | Key Project Responsibilities | Profile Avatar |
| :--- | :--- | :--- | :---: |
| **Nethmi** | **Project Coordinator & Documentation Lead** | Project coordination, sprint planning, task management, meeting logs, and comprehensive project documentation. | `images/nethmi.jpg` |
| **Aakif** | **UI/UX Designer** | User interface design, interactive Figma prototype creation, design systems, and UI/UX documentation. | `images/aakif.jpeg` |
| **Shimsy Ahamed** | **Requirements Analyst** | Stakeholder analysis, user personas, user stories, requirements elicitation, and system requirements documentation. | `images/shimsy.png` |
| **Senura** | **System Analyst & Technical Designer** | Research on existing systems, system architecture, UML diagrams, testing documentation, and technical presentation. | `images/senura.jpg` |
| **Sulaiman** | **Project Research & Documentation** | Project introduction, project planning, ethical considerations, and client communication records. | `images/sulaiman.jpg` |

---

## Future Roadmap

The following technical milestones represent proposed future work for extending Oddify from a prototype into a production platform:

- [ ] **Production AI Engine Integration**: Connect the natural language assistant to a live LLM API (e.g., Google Gemini) with custom prompt engineering to automatically categorize, extract budget bounds, and draft structured job specifications from unstructured Sinhala, Tamil, or English audio/text.
- [ ] **Full-Stack Backend Architecture**: Develop a RESTful or GraphQL API backend (Node.js/Express or Python/FastAPI) backed by a relational database (PostgreSQL) for persistent user profiles, job listings, and bids.
- [ ] **Real-Time GPS Tracking**: Integrate Mapbox or Google Maps SDK with WebSocket connections to display live worker transit routes and dynamic ETAs.
- [ ] **Automated KYC Identity Verification**: Implement administrative document verification for National Identity Cards (NIC) and police clearance reports prior to granting verified badges.
- [ ] **Arrival-Code Security Handshake**: Implement a cryptographically generated one-time code shared between customer and worker upon arrival to initiate work securely.
- [ ] **Payment Escrow Gateway**: Integrate a local Sri Lankan payment aggregator (e.g., PayHere) supporting LKR card payments, mobile wallets (eZ Cash, mCash), and milestone-based escrow payouts.
- [ ] **Progressive Web App (PWA) & Mobile Apps**: Package the responsive application into an installable PWA with offline caching and push notifications, followed by native iOS and Android versions.

---

## Academic Information

- **Project Name**: Oddify
- **Module**: Software Development Group Project (SDGP) / Agile Team Project (ATP)
- **Institution**: Informatics Institute of Technology (IIT), Sri Lanka (in collaboration with University of Westminster, UK)
- **Academic Year**: 2026 / 2027
- **Official Domain**: `oddify.com.lk` *(Registered project domain; currently hosting project prototype demonstrations)*

---

## License & Disclaimer

This project is developed solely for academic evaluation as part of the IIT Software Development Group Project (SDGP). 

*Disclaimer: The service workers, ratings, customer quotations, job requests, and map routes displayed across the Oddify website mockups are fictional demonstration data created to illustrate proposed system functionality.*
