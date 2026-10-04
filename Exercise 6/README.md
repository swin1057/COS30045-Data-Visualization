# Appliance Energy Consumption Website

A light, responsive, multi-page web application designed to track, calculate, and evaluate appliance energy consumption across Australian households. This project demonstrates core web development concepts, modular design practices, data visualization insights, and vanilla JavaScript integration.

---

## Features

- **Multi-Page & Exercise Lab Architecture:** Includes core pages (Home, Televisions, Calculator, About Us) alongside dedicated exercise subdirectories (`lab4/`, `lab5/`, `lab6/`).
- **Reusable UI Components:** Centralized JavaScript rendering engine (`assets/js/components.js`) for dynamic, DRY header navigation and footer injection across all pages.
- **Active Navigation & Dropdown Tracking:** Automatically detects the current page route—including exercise lab paths—and highlights the corresponding top-level navigation link or dropdown menu item.
- **Material Design Theme Integration:** Built on top of Bootstrap 5 with custom CSS variable overrides driven by a Material Design theme palette (`assets/css/light.css`).
- **Interactive FAQ Accordion:** Native Bootstrap accordion on the home page for collapsible query responses.
- **Appliance Energy Calculator:** Real-time vanilla JavaScript calculator that:
  - Validates client-side form inputs (Wattage, Usage hours, Tariff rate).
  - Calculates daily energy consumption (kWh), monthly usage (kWh), and total estimated yearly cost ($ AUD).
  - Dynamically updates the DOM without full page reloads or external dependencies.
- **SVG Vector Refactoring (Exercise 4.1):** Side-by-side comparative analysis and tabular documentation of vector graphic enhancements (colors, paths, tree canopy, chimney addition, and `<g>` grouping with `translate()`).

---

## Project Folder Structure

```text
/
├── index.html              # Home page with appliance insights & FAQ accordion
├── televisions.html        # Power consumption comparison table for TVs
├── calculator.html         # Interactive energy consumption calculator
├── exercise3.html          # Exercise 3 Data Story & Visualisation Insights
├── exercise4-1.html        # Exercise 4.1 SVG House graphic comparison
├── about.html             # Project overview and mission statement
├── README.md               # Documentation & AI Declaration
├── lab4/
│   ├── svgBefore.html      # Original SVG house graphic
│   ├── svgAfter.html       # Enhanced SVG house graphic
│   └── exercise4-7.html    # Exercise 4.7 Website with bar chart
├── lab5/
│   └── index.html          # Exercise 5 Multi-chart page
├── lab6/
│   └── index.html          # Exercise 6 Interactivity page
└── assets/
    ├── css/
    │   ├── light.css       # Material Design light theme palette variables
    │   └── style.css       # Custom site styling and Bootstrap component overrides
    ├── js/
    │   ├── components.js   # Reusable navbar and footer rendering logic
    │   └── calculator.js   # Input validation & energy calculation logic
    └── img/
        ├── PowerIcon.png             # Brand logo displayed in navigation
        └── tv_size_energy_chart.png  # Exercise 3 visualization screenshot