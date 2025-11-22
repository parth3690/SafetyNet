# Circle App - Web Demo

A web-based demo of the Circle Safety App that runs in your browser. This is a React app that demonstrates all the screens and features.

## Quick Start

1. **Install dependencies:**
   ```bash
   cd demo
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

3. **Open your browser:**
   The app will automatically open at `http://localhost:3000`

## Features

- ✅ Splash Screen with auto-navigation
- ✅ Onboarding flow (3 screens)
- ✅ Registration screen
- ✅ Home screen with learning/protected modes
- ✅ Emergency screens (Tier 1, 2, 3)
- ✅ Circle management
- ✅ Settings screen
- ✅ Tab bar navigation
- ✅ Mobile-responsive design (390×844px phone frame)

## Navigation Flow

1. **Splash** → Auto-advances to onboarding after 2 seconds
2. **Onboarding** → 3 screens with page indicators
3. **Registration** → Phone/email input
4. **Home** → Main dashboard with quick actions
5. **Emergency** → Test different alert tiers (1, 2, 3)
6. **Circle** → View and manage circle members
7. **Settings** → App configuration

## Testing Emergency Alerts

Click the "Emergency" tab in the bottom navigation to test:
- Tier 1: Gentle check-in alert
- Tier 2: Concern alert with location
- Tier 3: Full emergency mode

Or navigate directly:
- `/emergency/1` - Tier 1 Check-In
- `/emergency/2` - Tier 2 Concern
- `/emergency/3` - Tier 3 Emergency

## Project Structure

```
demo/
├── public/
│   └── index.html
├── src/
│   ├── screens/          # All screen components
│   ├── styles/           # Design system (colors, typography)
│   ├── App.js           # Main app with routing
│   └── index.js         # Entry point
└── package.json
```

## Technologies

- React 18
- React Router DOM 6
- CSS3 (no external UI libraries)
- Mobile-first responsive design

## Notes

This is a **web demo** for quick testing and demonstration. For the actual native iOS/Android app, see the React Native project in the parent directory.

The demo uses:
- CSS gradients for backgrounds
- CSS animations for transitions
- React Router for navigation
- Pure CSS (no CSS-in-JS or styled-components)

## Troubleshooting

**Port already in use?**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill
# Or use a different port
PORT=3001 npm start
```

**Dependencies not installing?**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Styles not loading?**
Make sure all CSS files are in the `src/styles/` directory and imported correctly.

