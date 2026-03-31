# 🌳 The Happiness Tree

**An interactive D3.js visualisation exploring what truly makes a nation happy.**

🔗 **Live Demo:** [https://abonazari.github.io/world_happiness_visualization/](https://abonazari.github.io/world_happiness_visualization/)

## About

The Happiness Tree presents the World Happiness Report (2005–2023) as a living tree. Each branch represents a world region, each flower a country, and each petal a factor contributing to happiness — GDP, social support, health, freedom, generosity, and trust in institutions. The visualisation invites users to explore an open-ended question: *What truly makes a nation happy, and why do some countries bloom beautifully with very little while others wilt despite having everything?*

## Dataset

- **Source:** [World Happiness Report 2024 (Yearly Updated)](https://www.kaggle.com/datasets/jainaru/world-happiness-report-2024-yearly-updated)
- **Coverage:** ~165 countries, 2005–2023
- **File:** `data.csv`
- **Key attributes:** Life Ladder (happiness score), Log GDP per capita, Social support, Healthy life expectancy at birth, Freedom to make life choices, Generosity, Perceptions of corruption

Countries with missing data for a given year are simply omitted for that year.

## How to Run Locally

The visualisation loads `data.csv` via `d3.csv()`, which requires an HTTP server (browsers block local file requests for security). Follow one of these options:

### Option 1 — Python (recommended)

```bash
cd world_happiness_visualization
python3 -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000) in your browser.

### Option 2 — Node.js

```bash
npx http-server . -p 8000
```

Then open [http://localhost:8000](http://localhost:8000).

### Option 3 — VS Code Live Server

If you use Visual Studio Code, install the **Live Server** extension, right-click `index.html`, and select "Open with Live Server".

## Project Structure

```
├── index.html      Main HTML page
├── styles.css      Stylesheet (seasons, layout, responsive)
├── main.js         D3.js visualisation logic
├── data.csv        World Happiness Report dataset
├── favicon.ico     Website favicon
└── README.md       This file
```

## Features & Interactions

- **Happiness Tree:** Regions as branches, countries as flowers, factors as coloured petals. Happier countries have larger flowers; stronger factor values produce longer, more vivid petals.
- **Factor Filters:** Toggle individual factors (GDP, Social, Health, Freedom, Generosity, Trust) on/off. When a subset is selected, flower size and petals reflect only those factors.
- **Year Slider:** Slide between 2005–2023 to see how the tree changes over time. Press Play to animate through years automatically.
- **All Years Average:** View the average happiness across all available years per country.
- **Tooltips:** Hover or click any flower to see the country's full factor breakdown and happiness score.
- **Branch Interaction:** Click a branch to open a stacked area chart below the tree showing that region's countries (x-axis) with factors stacked to total happiness (y-axis).
- **Season Themes:** Toggle between Spring, Summer, Autumn, and Winter — changes the entire colour palette, background, foliage, and falling particles.
- **Falling Particles:** Petals in spring, sunlight in summer, leaves in autumn, snowflakes in winter.

## Technologies

- **D3.js v7** — all visual encoding, scales, axes, layout, and interaction
- **Vanilla HTML/CSS/JavaScript** — no frameworks (React, Vue, etc.)
- No chart-generating libraries (Plotly, DC.js, etc.) — the visualisation is built from scratch with D3

## External Sources & Acknowledgements

- [D3.js](https://d3js.org/) — BSD-3-Clause licence
- [Google Fonts](https://fonts.google.com/) — Playfair Display, Lora, Source Sans 3
- World Happiness Report data via [Kaggle](https://www.kaggle.com/datasets/jainaru/world-happiness-report-2024-yearly-updated)
- Country-to-region mapping based on the World Happiness Report regional groupings