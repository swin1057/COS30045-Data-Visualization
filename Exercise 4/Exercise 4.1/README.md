# Appliance Energy Consumption Website

A light, responsive, multi-page web application designed to track, calculate, and evaluate appliance energy consumption across Australian households. This project demonstrates core web development concepts, modular design practices, and vanilla JavaScript integration.

---

## Features

- **Multi-Page Architecture:** Includes Home, Televisions, Interactive Calculator, and About Us pages.
- **Reusable UI Components:** Centralized JavaScript rendering engine (`components.js`) for dynamic, DRY header navigation and footer components across all pages.
- **Active Navigation Tracking:** Automatically detects the current page route and highlights the active link in the navigation menu.
- **Material Design Theme Integration:** Built on top of Bootstrap 5 with custom CSS variable overrides driven by a Material Design theme palette (`light.css`).
- **Interactive FAQ Accordion:** Native Bootstrap accordion on the home page for collapsible query responses.
- **Appliance Energy Calculator:** Real-time vanilla JavaScript calculator that:
  - Validates client-side form inputs (Wattage, Usage hours, Tariff rate).
  - Calculates daily energy consumption (kWh), monthly usage (kWh), and total estimated yearly cost ($ AUD).
  - Dynamically updates the DOM without full page reloads or external dependencies.

---

## Project Folder Structure

```text
/
├── index.html          # Home page with appliance insights & FAQ accordion
├── televisions.html    # Power consumption comparison table for TVs
├── calculator.html     # Interactive energy consumption calculator
├── about.html          # Project overview and mission statement
├── README.md           # Documentation
└── assets/
    ├── css/
    │   ├── light.css   # Material Design light theme palette variables
    │   └── style.css   # Custom site styling and Bootstrap component overrides
    ├── js/
    │   ├── components.js # Reusable navbar and footer rendering logic
    │   └── calculator.js # Input validation & energy calculation logic
    └── img/
        └── PowerIcon.png # Brand logo displayed in navigation