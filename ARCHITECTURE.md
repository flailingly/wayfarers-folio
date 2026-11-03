# The Wayfarer's Folio — Technical Build Specification & Systems Architecture

**Project**: Enchanted Urban Exploration & Physical Recovery Engine (Android Native / Hybrid Architecture)

**Target Environment**: Android (API Level 29+ / Android 10–14+)

**Primary Focus**: Background Location, Low-Power Sensor Telemetry, Fog-of-War Cartography, and Offline Systems Architecture

## 1. Brutal Reality Check & Engineering Constraints

### 1.1 Can We "Piggyback" on Google Maps' Location Access?

* **The Short Answer**: **No.**

* **The Technical Reality**:

  * Android operates on a strict process sandbox model. Each application runs with a distinct Linux User ID (`UID`).

  * App A (your app) cannot intercept, eavesdrop on, or share runtime location coordinates, geofences, or GPS hardware sockets owned by App B (Google Maps) unless App B deliberately exposes an exported Content Provider or Broadcast Receiver for that purpose. Google Maps does not expose a real-time location stream to third-party apps for security, battery, and privacy reasons.

  * **Architectural Requirement**: Your application *must* declare and request its own Android runtime location permissions:

    * `ACCESS_FINE_LOCATION` (GPS / GNSS high-precision coordinates)

    * `ACCESS_COARSE_LOCATION` (Cell tower / Wi-Fi trilateration)

    * `ACCESS_BACKGROUND_LOCATION` (Required for tracking while the app is minimized or the screen is off)

### 1.2 Screen-Off Tracking vs. Android Doze Mode & Battery Life

* **The Trap**:

  * Running a mobile web app in Chrome or an unconfigured webview will fail the moment the user locks the phone.

  * Within 15–60 seconds of screen-off, Android's **Doze Mode** and background execution limits throttle JavaScript event loops, freeze `requestAnimationFrame`, suspend Web Workers, and sever high-frequency HTML5 `navigator.geolocation.watchPosition` sockets.

* **The Engineering Fix**:

  * **Foreground Service with Persistent Notification**:

    * Android 10+ requires a `Service` declared with `android:foregroundServiceType="location"`.

    * It must display an ongoing, non-dismissible notification (e.g., *"Scout Patrol Active — Monitoring Territory & Recovery Budget"*). Without this, Android's `ActivityManager` and low-memory killer (LMK) will kill the background process within 1–3 minutes.

  * **Continuous GPS vs. Geofencing Battery Tradeoff**:

    * Continuous raw GPS hardware streaming drains 15%–25% battery per hour and causes device overheating in pockets.

    * **Optimal Production Strategy**:

      1. **Hardware Step Sensor (`TYPE_STEP_DETECTOR` / `TYPE_STEP_COUNTER`)**: Runs on the ultra-low-power on-chip Sensor Hub without waking the main application processor (CPU).

      2. **Android Activity Recognition API (`ACTIVITY_RECOGNITION`)**: Wakes the location stack only when the user transitions to `STILL` → `ON_FOOT` or `WALKING`.

      3. **Google Play Services Geofencing API (`GeofenceClient`)**: Offloads circular zone triggers (POIs, safe benches, sector boundaries) to baseband/Wi-Fi/cell hardware, only firing an Intent when a zone transition occurs.

### 1.3 Step & Health Telemetry: Custom Pedometer vs. Health Connect

* **Option A: Direct Hardware Step Sensor**:

  * Access `SensorManager.getDefaultSensor(Sensor.TYPE_STEP_COUNTER)`.

  * Returns cumulative steps since last device reboot. Ultra low latency, no third-party account required.

* **Option B: Google Health Connect API**:

  * Android's unified health data layer (replacing legacy Google Fit APIs).

  * Seamlessly reads steps, walking speed, and elevation gain recorded by the user's existing health apps (Google Fit, Samsung Health, Garmin, Withings).

  * Requires user permission grant via Android Health Connect system modal (`android.permission.health.READ_STEPS`).

## 2. System Architecture & Component Breakdown

```
+---------------------------------------------------------------------------------+
|                                APPLICATION LAYER                                |
|  +-----------------------+  +-----------------------+  +---------------------+  |
|  |     Leaflet / Map     |  |   Recovery Telemetry  |  |   Grimoire / Quests |  |
|  | (Custom Parchment SF) |  |   (Budget & Flexion)  |  |  (Dolores Sectors)  |  |
|  +-----------+-----------+  +-----------+-----------+  +----------+----------+  |
|              |                          |                         |             |
+--------------|--------------------------|-------------------------|-------------+
|              v                          v                         v             |
|                               CORE RUNTIME ENGINE                               |
|  +---------------------------------------------------------------------------+  |
|  | State Store: Reactive Player Profile, Unlocked Sectors, Route History     |  |
|  | Offline Persistence: IndexedDB / SQLite / Room DB                         |  |
|  | Fog-of-War Engine: Dynamic Canvas 2D / Polygon Clipping & Alpha Masking    |  |
|  +-------------------------------------+-------------------------------------+  |
+----------------------------------------|----------------------------------------+
|                                        v                                        |
|                          HARDWARE & OS INTERACTION LAYER                        |
|  +------------------------+ +------------------------+ +---------------------+  |
|  |  Foreground Service    | | Geofencing API / GPS   | | Sensor Hub / Health |  |
|  |  (Status Notification) | | (FusedLocationClient)  | | (Steps & Activity)  |  |
|  +------------------------+ +------------------------+ +---------------------+  |
+---------------------------------------------------------------------------------+

```

### 2.1 Cartography & Fog-of-War Engine

* **Map Engine**: Leaflet.js (Web/Hybrid) or MapLibre Native (Full Native).

* **Styling**: Parchment-toned CartoDB Dark Matter / Stadia Stamen Watercolor or custom-tinted vector tiles using CSS sepia/hue-rotate filters.

* **Fog-of-War Implementation**:

  * An HTML5 Canvas layer synchronized to the map view coordinates.

  * Screen is filled with dark parchment mist (`rgba(30, 20, 12, 0.88)`).

  * Unlocked sectors and player breadcrumbs are cleared in real time using Canvas composite operation `ctx.globalCompositeOperation = 'destination-out'` with soft radial gradient masks.

* **Geographic Scope (San Francisco Low-Impact Zone)**:

  * Centered on Dolores Park (`37.7596, -122.4269`).

  * Filtered flat routes along Valencia Street corridor (avoiding steep grades on 20th/Church/Cumberland Streets for knee graft safety).

  * POIs categorized by recovery function: *Sanctuaries* (Flat Benches), *Apothecaries* (Ice/Hydration), and *Waypoints* (Gentle Strides).

### 2.2 Recovery Telemetry Engine

* **Step Budget Cap**: Hard daily cap (e.g., 3,000 to 5,000 steps based on rehabilitation phase).

* **Elevation & Grade Penalty**: Walking on steep slopes (>5% incline/decline) consumes 2.5x step budget to discourage patellar tendon or graft strain.

* **Compulsory Rest Cooldowns**: Every 1,200 continuous steps triggers a "Rest at Sanctuary" mission requiring a 10-minute stationary period before XP accumulation resumes.

## 3. Technology Stack & Sideloading Pathways

### 3.1 Three Development Pathways

| Dimension | Path 1: Hybrid Capacitor / PWA (Recommended Now) | Path 2: React Native / Expo | Path 3: Pure Kotlin / Jetpack Compose | 
| ----- | ----- | ----- | ----- | 
| **Core Language** | HTML5, Tailwind CSS, JavaScript | TypeScript, React Native | Kotlin, Android SDK | 
| **Development Speed** | 1–2 days (Immediate conversion of prototype) | 1–2 weeks | 3–4 weeks | 
| **Background Location** | `@capacitor-community/background-geolocation` | `expo-location` + background task | `FusedLocationProviderClient` + `ForegroundService` | 
| **Step Tracking** | Health Connect plugin or web sensor API | `react-native-health` | Android `SensorManager` + Health Connect | 
| **Testing on Device** | Immediate Chrome PWA install or APK sideload | Expo Go or debug APK | Direct Android Studio ADB install | 

## 4. Step-by-Step Guide: Getting the Prototype on Your Android Phone

### Method A: Instant Zero-Install Mobile Testing (PWA Shortcut)

1. Open the generated `wayfarers_folio.html` in Chrome on your Android device (or via local Wi-Fi / Python HTTP server).

2. Tap the Chrome three-dot menu (⋮) in the top right.

3. Select **"Add to Home screen"** or **"Install app"**.

4. Launch "Wayfarer's Folio" from your home screen: it opens in standalone, full-screen mode without browser address bars, with wake-lock toggle and live GPS geolocation active.

### Method B: Standalone Native APK via Capacitor (Full Background Capability)

1. **Initialize Project**:

   ```
   npm init @capacitor/app wayfarers-folio -- --name "Wayfarer's Folio" --app-id "com.wayfarer.folio"
   cd wayfarers-folio
   npm install @capacitor/android @capacitor/geolocation @capawesome/capacitor-android-foreground-service
   
   ```

2. **Copy Web Build**:
   Place `wayfarers_folio.html` (renamed as `index.html`) into the `dist/` or `www/` folder.

3. **Add Android Platform**:

   ```
   npx cap add android
   npx cap sync
   
   ```

4. **Configure Permissions in `android/app/src/main/AndroidManifest.xml`**:

   ```
   <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
   <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
   <uses-permission android:name="android.permission.ACCESS_BACKGROUND_LOCATION" />
   <uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
   <uses-permission android:name="android.permission.FOREGROUND_SERVICE_LOCATION" />
   <uses-permission android:name="android.permission.ACTIVITY_RECOGNITION" />
   
   ```

5. **Build & Sideload APK**:

   * Open the `/android` folder in **Android Studio**.

   * Connect your Android phone via USB with **Developer Options & USB Debugging** enabled.

   * Click **Run** (green play button) or build a debug APK via **Build > Build Bundle(s) / APK(s) > Build APK(s)** and transfer the `.apk` file directly to your phone.

## 5. Summary of Built Prototype Mechanics

* **Interactive Cartography**: Leaflet map centered on Dolores Park & Valencia Street with fog-of-war reveal, sector boundary overlays, and custom scout markers.

* **Live GPS & Walk Simulator**: Live device GPS stream with fallback route simulation for testing without leaving the desk.

* **Scout Recovery Dashboard**: Real-time step counter, graft protection budget gauge, rest timers, and encounter ledger.

* **Offline Local Storage**: Full state serialization to `localStorage` (player rank, unlocked sectors, route waypoints, and completed dispatches).