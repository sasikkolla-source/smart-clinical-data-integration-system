# SCDIS — Smart Clinical Data Integration System

A production-grade frontend for managing clinical data integration across
HL7, FHIR R4, EDI X12, and REST source systems.

## Project Structure

```
scdis/
├── index.html          # Main entry point
├── css/
│   ├── base.css        # CSS variables, reset, typography
│   ├── layout.css      # Topbar, sidebar, shell layout
│   ├── components.css  # Cards, tables, buttons, forms
│   └── pages.css       # Page-specific styles, animations
├── js/
│   ├── data.js         # Mock clinical data layer
│   ├── charts.js       # Canvas-based chart utilities
│   ├── pages.js        # Page renderer functions
│   └── app.js          # App controller, routing, interactions
└── README.md
```

## How to Run

No build tools required. Open directly in a browser:

```bash
# Option 1: Open directly
open index.html

# Option 2: Serve locally (recommended for full features)
npx serve .
# or
python3 -m http.server 8080
# then visit http://localhost:8080
```

## Pages / Features

| Page           | Description                                                  |
|----------------|--------------------------------------------------------------|
| Dashboard      | Live stats, recent integrations, source status, activity feed |
| Patient Records| Searchable/filterable patient table with modal detail view   |
| Data Sources   | All 8 connected systems with protocol, latency, uptime       |
| Pipelines      | 6 integration pipelines with step progress & error details   |
| Field Mapping  | HL7 segment → FHIR R4 element mapping table + schemas        |
| Alerts         | Active & resolved alerts with severity classification        |
| Audit Log      | Full event log with actor, resource, outcome filtering       |
| Analytics      | 7-day trend charts, format distribution, error breakdown     |

## Supported Formats

- **HL7 v2.5 / v2.8 / v3** via MLLP
- **FHIR R4** via HTTPS REST
- **EDI X12** (837P, 835, 270/271, 278) via SFTP / AS2
- **REST / SMART on FHIR** via OAuth2 + HTTPS

## Tech Stack

- Vanilla HTML5 + CSS3 + JavaScript (ES2020)
- No frameworks, no build step
- Google Fonts: DM Mono + Fraunces
- Canvas 2D API for charts
- CSS custom properties for theming

## Extending the Project

### Add a real backend
Replace `js/data.js` mock data with `fetch()` calls to your API endpoints:
```js
const patients = await fetch('/api/patients').then(r => r.json());
```

### Add real HL7 parsing
Integrate `simple-hl7` (npm) or `hl7.js` on Node.js backend.

### Add real FHIR client
Use the `fhirclient` npm package for SMART on FHIR authentication flows.

### Connect to real EDI
Use `edifact` or `x12-parser` npm packages for EDI segment parsing.
