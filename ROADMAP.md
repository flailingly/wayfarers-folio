# The Wayfarer's Folio — Project Roadmap & Sprint Backlog

**Version**: 0.2.0-dev  
**Methodology**: Vertical Slice Development (One Ticket per Turn)  
**Lead Engineer**: Gemini  
**Product / Creative Director**: User

---

## 🎯 Current Sprint: Milestone 1 — Narrative Graft & Engine Modularization
*Goal: Decompose monolithic single-file prototype into clean ES modules, wire the 16 Mission sectors, and introduce Citizen Sleeper-style progress clocks for vignette encounters.*

- [x] **M1.0: Project Repo Initialization**
  - Establish modular file hierarchy (`src/core`, `src/narrative`, `src/render`, `src/ui`, `src/telemetry`).
  - Set up `ROADMAP.md`, `ARCHITECTURE.md`, `CODEX.md`, `.gitignore`, and `package.json`.
  - Initialize local Git repository with baseline commit.
- [ ] **M1.1: Modular Engine Architecture**
  - Decompose `lamplighter.html` into independent ES modules.
  - Centralize `AppState` with reactive listeners and schema migration.
  - Modularize canvas map rendering and loop-enclosure math.
- [ ] **M1.2: 16 Mission Sectors Integration**
  - Replace 38 distant citywide coordinates with the contiguous 16 Mission District sectors.
  - Wire real elevation data and ACL rehabilitation surface profiles into sector metadata.
  - Implement sector territory status tracking (Uncharted -> 50% Surveyed -> Claimed).
- [ ] **M1.3: Citizen Sleeper Vignette Clocks**
  - Implement 4-segment progress clocks (`[ ][ ][ ][ ]`) for narrative decisions.
  - Script branching encounters for Dolores Cellar Runes, Archivist Julian's Herbary, 16th Street Transit Surge, and Balmy Murals.
- [ ] **M1.4: Convalescent Camp & Debrief**
  - Link post-walk knee pain check-in (0–10 scale) to weekly distance ramp algorithms.
  - Introduce Rest Day / Camp Maintenance protocol to protect healing streaks.

---

## 📌 Milestone 2: Offline Mapping & Data Hardening
*Goal: Remove external scraping risks and establish robust offline persistence.*
- [ ] **M2.1**: Replace direct OpenStreetMap tile scraping with cached vector/raster tile service (Stamen/Stadia Sepia or Mapbox).
- [ ] **M2.2**: Add one-click base64 JSON save code export/import for disaster recovery.
- [ ] **M2.3**: Calibrate real elevation smoothing (Kalman filter for GNSS barometric altitude).

---

## 📌 Milestone 3: Android Native Bridge (Screen-Off Tracking)
*Goal: True pocket-mode tracking without keeping the screen lit.*
- [ ] **M3.1**: Initialize Capacitor Android project wrapper.
- [ ] **M3.2**: Configure `ForegroundService` with `android:foregroundServiceType="location"`.
- [ ] **M3.3**: Set up persistent Android notification (*"Scout Patrol Active — Monitoring Territory"*).
- [ ] **M3.4**: Test screen-off location logging and battery consumption benchmark (<3% / hr).

---

## 📌 Milestone 4: Audio Polish & Expansion
*Goal: Complete sensory experience.*
- [ ] **M4.1**: Expand Web Audio API 8-bit synthesizer with distinct melodic motifs for territory claiming and clock completion.
- [ ] **M4.2**: Write Phase 2 (Weeks 7–12) field dispatches for progressive hill climbing.
