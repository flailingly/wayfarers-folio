# The Wayfarer's Folio

> **An Enchanted Urban Exploration & Physical Recovery Engine**  
> *Walk. Chart. Heal.*

The Wayfarer's Folio is an urban walking companion and subtle magical-realism RPG designed around physical convalescence (specifically post-operative joint rehabilitation / ACL recovery). As you walk real streets, the fog of war lifts from your hand-inked folio map, revealing a hidden municipal layer of leylines, archivists, and living history.

---

## 🚀 Quickstart (Running Locally)

This project is built with vanilla modern web technologies (ES Modules, Canvas 2D, Web Audio API) with zero heavy framework bloat.

### Option 1: Instant Local Server (Recommended)
You can serve the directory using any static file server:

```bash
# Using Python 3
python3 -m http.server 8000

# Or using Node / npx
npx serve .
```
Then open `http://localhost:8000` in your browser or phone.

### Option 2: Sideloading onto Android (Capacitor)
See [ARCHITECTURE.md](ARCHITECTURE.md) for full native build instructions using Capacitor and Android Studio.

---

## 📂 Project Structure

```
├── ROADMAP.md          # Active sprint tasks and backlog
├── ARCHITECTURE.md     # Technical specification & Android constraints
├── CODEX.md            # Worldbuilding bible, 16 sectors, and narrative rules
├── index.html          # HTML5 entry point & UI parchment container
├── package.json        # Project metadata and development scripts
└── src/
    ├── core/           # State management, audio, and loop math
    │   ├── state.js
    │   ├── loop_enclosure.js
    │   └── audio.js
    ├── narrative/      # Sectors, vignettes, items, and NPCs
    │   ├── sectors.js
    │   ├── encounters.js
    │   ├── items.js
    │   └── characters.js
    ├── telemetry/      # GPS tracking, cadence pacing, and click-to-walk
    │   └── walking.js
    ├── render/         # Canvas map, fog-of-war, sprites, and tiles
    │   ├── map.js
    │   └── sprites.js
    ├── ui/             # Sheet navigation, debrief modals, and HUD
    │   └── sheets.js
    └── main.js         # Game loop orchestrator and event bus
```

---

## 🐙 Pushing to GitHub

To sync this project with your own GitHub account:

1. Create an empty repository on GitHub named `wayfarers-folio`.
2. In your local terminal, run:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/wayfarers-folio.git
   git branch -M main
   git push -u origin main
   ```
