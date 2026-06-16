# Frontend Infrastructure Audit & Bootstrap Checklist

**Project:** Mission Control Dashboard  
**Date:** 2026-06-15  

---

## 📋 Current Stack Status

| Component | Version | Notes |
|-----------|---------|-------|
| **React** | 19.0.0 | Latest stable, hooks fully supported |
| **Vite** | ^6.0.0 | Modern bundler, native ESM support |
| **Tailwind CSS** | ^3.4.17 | v3 LTS (not yet upgraded to v4) |
| **TypeScript** | ^5.6.0 | Full type safety enabled |
| **Dev Port** | 3000 | Configured in vite.config.ts |

---

## 🔌 Proxy Configuration Review (`vite.config.ts`)

Current proxy setup:
```ts
proxy: {
  '/ws': {           // WebSocket endpoint
    target: 'ws://localhost:8000',
    ws: true,
    changeOrigin: true,
  },
  '/api': {          // REST API endpoints
    target: 'http://localhost:8000',
    changeOrigin: true,
  }
}
```

**Status:** ✅ Correctly configured for backend at `:8000`  
- `/ws/**` → WebSocket to FastAPI (`ws://localhost:8000`)  
- `/api/**` → HTTP REST calls to FastAPI (`http://localhost:8000`)  

---

## 🌱 Dependencies Audit

### Installed (from `package.json`)
**Production dependencies:**
- React 19 + ReactDOM
- Vite 6.x, @vitejs/plugin-react
- Tailwind CSS 3.4.x with v2 plugin system (`tailwindcss`, postcss, autoprefixer)
- shadcn/ui style components (@base-ui/react, tailwind-merge, tw-animate-css)
- Recharts for metrics visualization
- Zustand (lightweight state management - already used in `store/`)

**All dependencies appear complete.** Run these checks to confirm:

```bash
# Verify lock file exists and is valid
ls frontend/package-lock.json  # or .pnpm-store if using pnpm

# Check node_modules completeness
cd frontend && npm ls --depth=0 || echo "Deps incomplete - run npm install"
```

---

## 🔐 Environment Variables (`.env` not committed)

Create `frontend/.env.local` with:

| Variable | Example Value | Purpose | Committed? |
|----------|---------------|---------|------------|
| `VITE_API_BASE_URL` | `http://localhost:8000/api` | Override proxy target for production builds (default uses vite proxy) | ❌ No - local only |
| `VITE_WS_URI` | `ws://localhost:8000/ws` | WebSocket endpoint URL | ❌ No - local only |

**When to use env vars vs. config file:**
- Use **vite.config.ts proxy** for dev (always points to localhost)
- Set `.env.local` variables when deploying frontend separately from backend
- Example: Production deploy where backend runs at `api.missioncontrol.dev`:

```bash
# .env.local example for production
VITE_API_BASE_URL=https://api.missioncontrol.dev/api
VITE_WS_URI=wss://api.missioncontrol.dev/ws
```

**Security note:** Only `.env` with "local" suffix is ignored by git. Never commit `frontend/.env`.

---

## 🎨 Tailwind CSS Notes

### Current State: v3.x (v2 plugin system)
- Uses standard config (`tailwind.config.js`) format
- No custom theme extensions configured yet  
  - Theme extend currently empty: `{ extend: {} }`

**Is a Tailwind v4 upgrade needed?** ❌ **Not required but optional.**

| Factor | Recommendation |
|--------|----------------|
| App complexity | Simple dashboard UI → stay on v3 LTS |
| Migration effort | Requires updating postcss.config, plugin system changes |
| Current workflow | Works fine for shadcn/ui integration |

**If you want to upgrade to Tailwind v4 later:**
1. Remove `tailwind.config.js`, `postcss.config` (if exists) with old plugins  
2. Use CSS-first approach (`@import "tailwindcss"` in main CSS file)  
3. New config format at build-time only

---

## 🏗️ Top Bar Clutter Audit

Current top bar elements:
1. **CommandHeader** - Mission Control logo + version
2. **MeshStatusBar alert line** - Connection status indicator (green/red dot)
3. **ClockDot** - NOT present in current implementation  
4. **Control buttons** - Pause/Resume/Kill actions
5. **Theme toggle**

**Status:** ✅ Minimal clutter as expected per "sphere-first" layout redesign from commit `eb98c89`. No additional elements needed at this time.

---

## 🚀 Bootstrap Checklist Summary

### Phase 1: Verify Dependencies (Run Once)
```bash
cd frontend
npm install          # If package-lock.json missing or node_modules incomplete
npm ls --depth=0     # Validate all deps resolved
```

### Phase 2: Config Review ✅ Done
- [x] Vite proxy routes verified (`/api`, `/ws` → :8000)  
- [x] Tailwind config valid (content paths correct for SPA structure)  
- [ ] `.env.local` created if deploying separately from backend  

### Phase 3: Environment Setup
```bash
cd frontend

# Create .env.local template with examples ONLY (not committed to git)
cat > .env.example << 'EOF'
VITE_API_BASE_URL=http://localhost:8000/api
VITE_WS_URI=ws://localhost:8000/ws
EOF

# Copy for local development only
cp .env.example .env.local  # Remove .env when committing to git
```

### Phase 4: Development Workflow (Optional Enhancements)
- [ ] Add `frontend/.gitignore` entries for `.env*`, node_modules  
- [ ] Create `.github/workflows/ci.yml` example with lint + build steps  

---

## 📦 Missing Template Files to Bootstrap

These should be created by dev team:

| File | Purpose | Status |
|------|---------|--------|
| `frontend/.env.example` | Environment variable reference (not committed) | ❌ Create if needed |
| `.gitignore` root level | Exclude node_modules, .env files from git repo | ✅ Likely exists in parent |

---

## ✨ Notes for Future Reference

1. **Vite dev server on port 3000** is correct; user-facing docs should reference this (not the vite "v" script which may differ)
2. No WebSocket or API calls are failing currently—proxy config working as designed
3. Tailwind v4 upgrade can be deferred indefinitely unless team standardizes on it

---

*Audit completed by Stark • Workflow A Step 1: UI/Logistics Design Phase*
