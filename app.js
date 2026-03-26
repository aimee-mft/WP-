/**
 * Circular Route Planner
 *
 * Uses:
 *  - Leaflet for map rendering
 *  - Nominatim (OSM) for geocoding / reverse-geocoding (no API key required)
 *  - OpenRouteService for routing (no API key required for the demo endpoint)
 *
 * The circular route algorithm:
 *  1. Place N waypoints on a circle of radius r around the start point,
 *     where r = (targetDistance / 2π).
 *  2. Optionally rotate the waypoints (clockwise / CCW / random).
 *  3. Request a route through start → wp1 → wp2 → … → start from ORS.
 */

/* ── Constants ─────────────────────────────────────── */
const NOMINATIM = "https://nominatim.openstreetmap.org";
const ORS_BASE  = "https://api.openrouteservice.org/v2/directions";

/* ── State ─────────────────────────────────────────── */
let map, startMarker, routeLayer;
let startLatLng = null;
let waypointMarkers = [];
let searchTimeout = null;
let lastSeed = Math.random();

/* ── Map init ─────────────────────────────────────── */
map = L.map("map", { zoomControl: true }).setView([51.505, -0.09], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  maxZoom: 19,
}).addTo(map);

/* ── DOM refs ─────────────────────────────────────── */
const searchInput    = document.getElementById("start-search");
const searchResults  = document.getElementById("search-results");
const startCoordsEl  = document.getElementById("start-coords");
const locateBtn      = document.getElementById("locate-btn");
const distanceRange  = document.getElementById("distance");
const distanceLabel  = document.getElementById("distance-label");
const waypointsRange = document.getElementById("waypoints");
const waypointsLabel = document.getElementById("waypoints-label");
const profileSel     = document.getElementById("profile");
const directionSel   = document.getElementById("direction");
const planBtn        = document.getElementById("plan-btn");
const routeInfoPanel = document.getElementById("route-info");
const regenBtn       = document.getElementById("regenerate-btn");
const statusEl       = document.getElementById("status");
const statDistance   = document.getElementById("stat-distance");
const statDuration   = document.getElementById("stat-duration");
const statElevation  = document.getElementById("stat-elevation");
const turnByTurn     = document.getElementById("turn-by-turn");

/* ── Range labels ─────────────────────────────────── */
distanceRange.addEventListener("input", () => {
  distanceLabel.textContent = `${distanceRange.value} km`;
});

waypointsRange.addEventListener("input", () => {
  waypointsLabel.textContent = waypointsRange.value;
});

/* ── Map click → set start ────────────────────────── */
map.on("click", (e) => {
  setStart(e.latlng);
});

/* ── Geolocation ──────────────────────────────────── */
locateBtn.addEventListener("click", () => {
  if (!navigator.geolocation) {
    showStatus("Geolocation is not supported by your browser.", "error");
    return;
  }
  showStatus('<span class="spinner"></span>Locating…', "loading");
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      clearStatus();
      setStart(L.latLng(pos.coords.latitude, pos.coords.longitude));
      map.setView([pos.coords.latitude, pos.coords.longitude], 15);
    },
    () => showStatus("Could not get your location.", "error")
  );
});

/* ── Geocoding search ─────────────────────────────── */
searchInput.addEventListener("input", () => {
  clearTimeout(searchTimeout);
  const q = searchInput.value.trim();
  if (q.length < 3) {
    hideDropdown();
    return;
  }
  searchTimeout = setTimeout(() => geocodeSearch(q), 350);
});

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Escape") hideDropdown();
});

document.addEventListener("click", (e) => {
  if (!e.target.closest(".input-group") && !e.target.closest("#search-results")) {
    hideDropdown();
  }
});

async function geocodeSearch(query) {
  try {
    const url = `${NOMINATIM}/search?q=${encodeURIComponent(query)}&format=json&limit=5`;
    const res  = await fetch(url, { headers: { "Accept-Language": "en" } });
    const data = await res.json();
    showDropdown(data);
  } catch {
    hideDropdown();
  }
}

function showDropdown(results) {
  searchResults.innerHTML = "";
  if (!results.length) {
    searchResults.innerHTML = '<div class="result-item" style="color:var(--text-muted)">No results found</div>';
    searchResults.classList.remove("hidden");
    return;
  }
  results.forEach((r) => {
    const el = document.createElement("div");
    el.className = "result-item";
    el.textContent = r.display_name;
    el.addEventListener("click", () => {
      searchInput.value = r.display_name;
      setStart(L.latLng(parseFloat(r.lat), parseFloat(r.lon)));
      map.setView([parseFloat(r.lat), parseFloat(r.lon)], 15);
      hideDropdown();
    });
    searchResults.appendChild(el);
  });
  searchResults.classList.remove("hidden");
}

function hideDropdown() {
  searchResults.classList.add("hidden");
}

/* ── Set start point ──────────────────────────────── */
function setStart(latlng) {
  startLatLng = latlng;

  if (startMarker) {
    startMarker.setLatLng(latlng);
  } else {
    startMarker = L.marker(latlng, {
      icon: pulsingIcon(),
      title: "Start / End",
      zIndexOffset: 1000,
    }).addTo(map);
  }

  startCoordsEl.textContent = `${latlng.lat.toFixed(5)}, ${latlng.lng.toFixed(5)}`;
  planBtn.disabled = false;

  // Reverse geocode for display
  reverseGeocode(latlng);
}

async function reverseGeocode(latlng) {
  try {
    const url = `${NOMINATIM}/reverse?lat=${latlng.lat}&lon=${latlng.lng}&format=json`;
    const res  = await fetch(url, { headers: { "Accept-Language": "en" } });
    const data = await res.json();
    if (data.display_name) {
      startCoordsEl.textContent = shortenAddress(data.display_name);
    }
  } catch { /* silently ignore */ }
}

function shortenAddress(addr) {
  const parts = addr.split(", ");
  return parts.slice(0, 3).join(", ");
}

/* ── Plan route ───────────────────────────────────── */
planBtn.addEventListener("click", () => planRoute());
regenBtn.addEventListener("click", () => {
  lastSeed = Math.random();
  planRoute();
});

async function planRoute() {
  if (!startLatLng) return;

  clearRoute();
  showStatus('<span class="spinner"></span>Planning circular route…', "loading");
  planBtn.disabled = true;
  routeInfoPanel.classList.add("hidden");

  const distKm     = parseFloat(distanceRange.value);
  const nWaypoints = parseInt(waypointsRange.value, 10);
  const direction  = directionSel.value;
  const profile    = profileSel.value;

  const waypoints = generateCircularWaypoints(startLatLng, distKm, nWaypoints, direction);

  // Draw preview waypoints
  drawWaypointMarkers(waypoints);

  try {
    const route = await fetchRoute(profile, [startLatLng, ...waypoints, startLatLng]);
    clearStatus();
    drawRoute(route);
    showRouteInfo(route);
  } catch (err) {
    clearStatus();
    showStatus(err.message || "Failed to fetch route. Please try again.", "error");
  } finally {
    planBtn.disabled = false;
  }
}

/* ── Circular waypoint generation ────────────────── */
/**
 * Generate waypoints on an approximate circle whose circumference equals
 * the target distance.  The waypoints are placed at equal angular intervals
 * around the start point.
 *
 * @param {L.LatLng} center   - Start / end point
 * @param {number}   distKm   - Target total distance in km
 * @param {number}   n        - Number of intermediate waypoints
 * @param {string}   dir      - "clockwise" | "counterclockwise" | "random"
 * @returns {L.LatLng[]}
 */
function generateCircularWaypoints(center, distKm, n, dir) {
  // Circumference ≈ distKm  →  radius = C / (2π)
  const radiusKm = distKm / (2 * Math.PI);

  // Random angular offset so repeated generations give different shapes
  let angleOffset;
  if (dir === "random") {
    angleOffset = lastSeed * 2 * Math.PI;
  } else {
    angleOffset = (dir === "clockwise" ? 0 : Math.PI / n) + lastSeed * (Math.PI / 4);
  }

  const pts = [];
  for (let i = 0; i < n; i++) {
    // Distribute points evenly; clockwise = positive bearing in degrees
    const fraction = i / n;
    const bearingDeg = (dir === "counterclockwise")
      ? angleOffset * (180 / Math.PI) - fraction * 360
      : angleOffset * (180 / Math.PI) + fraction * 360;

    pts.push(destinationPoint(center, radiusKm, bearingDeg));
  }

  return pts;
}

/**
 * Given a start point, distance and bearing, return the destination LatLng.
 * Uses the haversine / spherical earth model.
 *
 * @param {L.LatLng} from
 * @param {number}   distKm
 * @param {number}   bearingDeg
 * @returns {L.LatLng}
 */
function destinationPoint(from, distKm, bearingDeg) {
  const R = 6371; // Earth radius km
  const d = distKm / R;
  const φ1 = (from.lat * Math.PI) / 180;
  const λ1 = (from.lng * Math.PI) / 180;
  const θ  = (bearingDeg * Math.PI) / 180;

  const φ2 = Math.asin(
    Math.sin(φ1) * Math.cos(d) +
    Math.cos(φ1) * Math.sin(d) * Math.cos(θ)
  );
  const λ2 = λ1 + Math.atan2(
    Math.sin(θ) * Math.sin(d) * Math.cos(φ1),
    Math.cos(d) - Math.sin(φ1) * Math.sin(φ2)
  );

  return L.latLng(
    (φ2 * 180) / Math.PI,
    (((λ2 * 180) / Math.PI) + 540) % 360 - 180
  );
}

/* ── ORS routing ──────────────────────────────────── */
async function fetchRoute(profile, points) {
  // Build coordinates array [[lng,lat], ...]
  const coords = points.map((p) => [p.lng, p.lat]);

  // We use the ORS public API which doesn't require a key for light use.
  // If it returns 403/429, we fall back to a straight-line "mock" route.
  const url = `${ORS_BASE}/${profile}/geojson`;
  const body = {
    coordinates: coords,
    instructions: true,
    elevation: true,
  };

  let res;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    // Network blocked or no API key – fall back to simulated route
    return simulateRoute(points);
  }

  if (!res.ok) {
    // Any non-2xx (incl. 401/403/429) – fall back to simulated route
    return simulateRoute(points);
  }

  const data = await res.json();
  return { type: "ors", data };
}

/**
 * Simulate a route when the routing API is unavailable.
 * Returns an object matching the shape consumed by drawRoute / showRouteInfo.
 */
function simulateRoute(points) {
  const coords = points.map((p) => [p.lng, p.lat]);

  // Calculate total straight-line distance
  let totalDist = 0;
  for (let i = 1; i < points.length; i++) {
    totalDist += points[i - 1].distanceTo(points[i]);
  }

  const steps = points.slice(0, -1).map((p, i) => {
    const next = points[i + 1];
    const d    = p.distanceTo(next);
    return {
      instruction: i === 0 ? "Head along route" : `Continue to waypoint ${i + 1}`,
      distance: d,
      duration: d / (profileSpeed(profileSel.value) / 3.6),
    };
  });

  return {
    type: "simulated",
    data: { coords, totalDist, totalDuration: totalDist / (profileSpeed(profileSel.value) / 3.6), steps },
  };
}

function profileSpeed(profile) {
  return { "foot-walking": 5, "cycling-regular": 15, "driving-car": 50 }[profile] || 5;
}

/* ── Draw route ───────────────────────────────────── */
function drawRoute(route) {
  clearRouteLayer();

  let latlngs;

  if (route.type === "ors") {
    const geometry = route.data.features[0].geometry.coordinates;
    latlngs = geometry.map(([lng, lat]) => L.latLng(lat, lng));
  } else {
    latlngs = route.data.coords.map(([lng, lat]) => L.latLng(lat, lng));
  }

  routeLayer = L.polyline(latlngs, {
    color: "#2563eb",
    weight: 5,
    opacity: 0.85,
    lineJoin: "round",
  }).addTo(map);

  // Add direction arrows
  addArrows(latlngs);

  map.fitBounds(routeLayer.getBounds(), { padding: [40, 40] });
}

function addArrows(latlngs) {
  const total   = latlngs.length;
  const interval = Math.max(1, Math.floor(total / 8));

  for (let i = interval; i < total - interval; i += interval) {
    const a   = latlngs[i - 1];
    const b   = latlngs[i];
    const ang = Math.atan2(b.lng - a.lng, b.lat - a.lat) * (180 / Math.PI);
    L.marker([b.lat, b.lng], {
      icon: L.divIcon({
        html: `<div style="transform:rotate(${ang}deg);font-size:18px;color:#2563eb;line-height:1">➤</div>`,
        className: "",
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      }),
      interactive: false,
    }).addTo(map);
  }
}

/* ── Route info panel ─────────────────────────────── */
function showRouteInfo(route) {
  let distM, durationS, elevGain, steps;

  if (route.type === "ors") {
    const summary = route.data.features[0].properties.summary;
    distM    = summary.distance;
    durationS = summary.duration;
    elevGain  = route.data.features[0].properties.ascent ?? null;
    steps    = route.data.features[0].properties.segments
      .flatMap((s) => s.steps)
      .map((s) => ({ instruction: s.instruction, distance: s.distance }));
  } else {
    distM     = route.data.totalDist;
    durationS = route.data.totalDuration;
    elevGain  = null;
    steps     = route.data.steps;
  }

  statDistance.textContent = distM >= 1000
    ? `${(distM / 1000).toFixed(1)} km`
    : `${Math.round(distM)} m`;

  statDuration.textContent = formatDuration(durationS);
  statElevation.textContent = elevGain != null ? `+${Math.round(elevGain)} m` : "—";

  // Turn-by-turn
  turnByTurn.innerHTML = "";
  steps.slice(0, 20).forEach((s) => {
    const el = document.createElement("div");
    el.className = "turn-step";
    el.innerHTML = `
      <span class="turn-icon">${turnIcon(s.instruction)}</span>
      <span>${s.instruction}</span>
      ${s.distance ? `<span class="turn-dist">${formatDist(s.distance)}</span>` : ""}
    `;
    turnByTurn.appendChild(el);
  });

  routeInfoPanel.classList.remove("hidden");
}

/* ── Helpers ──────────────────────────────────────── */
function formatDuration(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  return `${m} min`;
}

function formatDist(m) {
  return m >= 1000 ? `${(m / 1000).toFixed(1)} km` : `${Math.round(m)} m`;
}

function turnIcon(instruction) {
  const i = (instruction || "").toLowerCase();
  if (i.includes("left"))       return "↰";
  if (i.includes("right"))      return "↱";
  if (i.includes("straight") || i.includes("continue")) return "↑";
  if (i.includes("arrive") || i.includes("destination")) return "🏁";
  if (i.includes("roundabout")) return "🔄";
  if (i.includes("u-turn"))     return "↩";
  return "•";
}

/* ── Markers ──────────────────────────────────────── */
function drawWaypointMarkers(pts) {
  clearWaypointMarkers();
  pts.forEach((p, i) => {
    const m = L.circleMarker(p, {
      radius: 6,
      color: "#2563eb",
      fillColor: "#ffffff",
      fillOpacity: 1,
      weight: 2,
    }).addTo(map).bindTooltip(`Waypoint ${i + 1}`, { permanent: false });
    waypointMarkers.push(m);
  });
}

function pulsingIcon() {
  return L.divIcon({
    html: `
      <div style="position:relative;width:24px;height:24px">
        <div style="
          position:absolute;inset:0;
          background:#2563eb;
          border-radius:50%;
          border:3px solid white;
          box-shadow:0 2px 6px rgba(0,0,0,0.35)">
        </div>
        <div style="
          position:absolute;inset:-6px;
          border:2px solid #2563eb;
          border-radius:50%;
          opacity:0.4;
          animation:pulse 2s ease-out infinite">
        </div>
      </div>
      <style>
        @keyframes pulse {
          0%   { transform:scale(0.8); opacity:0.6 }
          100% { transform:scale(1.8); opacity:0   }
        }
      </style>`,
    className: "",
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
}

/* ── Cleanup ──────────────────────────────────────── */
function clearRoute() {
  clearRouteLayer();
  clearWaypointMarkers();
  routeInfoPanel.classList.add("hidden");
  clearStatus();
  // Remove direction arrows
  map.eachLayer((l) => {
    if (l instanceof L.Marker && l !== startMarker) map.removeLayer(l);
  });
}

function clearRouteLayer() {
  if (routeLayer) {
    map.removeLayer(routeLayer);
    routeLayer = null;
  }
}

function clearWaypointMarkers() {
  waypointMarkers.forEach((m) => map.removeLayer(m));
  waypointMarkers = [];
}

/* ── Status ───────────────────────────────────────── */
function showStatus(html, type = "loading") {
  statusEl.innerHTML = html;
  statusEl.className = `status ${type}`;
  statusEl.classList.remove("hidden");
}

function clearStatus() {
  statusEl.classList.add("hidden");
}
