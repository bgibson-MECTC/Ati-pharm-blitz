# Ati-pharm-blitz
Interactive ATI Pharm Blitz game for RN pharm review — flashcards, expert huddles, patient charts, and NCLEX-style lightning rounds in one 1-hour activity.

## Access Control

### Student Access (Default)
- Homepage displays 6 group selection links (Groups 1-6)
- Each group corresponds to a pharmacology system (Neuro, Psych, Pain, etc.)
- Students click their assigned group to begin simulation

### Instructor Access (Passcode-Protected)
- Click "Enter Instructor Mode" button on homepage
- Enter passcode: `mednurse2024`
- Unlocks full instructor dashboard with:
  - Live group monitoring (patient stability, errors, alerts)
  - Debrief board (charge nurse notes from all groups)
  - Phase timer controls
  - Adaptive difficulty settings
  - Performance metrics & session export

See [ACCESS_CONTROL.md](ACCESS_CONTROL.md) for detailed documentation.

## Tests

Automated smoke tests for the static pages run with Playwright.

1. Install deps: `npm install`
2. (First time) Install browsers: `npx playwright install --with-deps`
3. Run tests: `npm test`

