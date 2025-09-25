# Project Overview

S&P 500 Map visualizes the headquarters of the largest US companies on an interactive world map. It allows users to explore geographic distributions, see company details, and spot patterns across industries.

## Data Collection

* Started with a Google Sheet for structured input.
* Collected: company name, ticker, headquarters address, logo/photo, latitude & longitude.
* Mention any challenges (address normalization, missing logos, etc.).

## Data Processing

* Cleaned up addresses → converted to lat/lng.
* Verified company info manually / with sources.
* Organized into a JSON/CSV → ready for frontend.

## Frontend Development

* Built with React + Vite + TypeScript.
* Used Leaflet.js for the interactive map.
* Created custom markers with company logos.
* Added popups for company info (address, industry, etc.).

## UI/UX

* Mobile-first layout.
* Minimalist dark/light theme.
* Performance optimization (lazy loading images, only rendering visible markers).

## Deployment

* Hosted on GitHub page (CI/CD from GitHub).

## Lessons Learned

* Working with geospatial data.
* Data wrangling from multiple sources.
* Integrating external libraries (Leaflet, etc.) into React.
