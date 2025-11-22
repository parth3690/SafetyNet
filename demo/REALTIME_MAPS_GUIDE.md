# Real-Time Maps & Data Flow - User Guide

## 🗺️ Features

### Real-Time Maps
- **Interactive Maps**: Full Leaflet/OpenStreetMap integration
- **Austin, TX Locations**: Pre-configured locations for demo
- **Live Location Updates**: Real-time marker movement
- **Route Visualization**: Path display for walking/traveling
- **Multiple Markers**: Show destinations, safe zones, etc.

### Data Management
- **Temporary Database**: localStorage-based data store
- **Auto-Refresh**: Updates every 2 seconds
- **Data Persistence**: Survives page refresh
- **Reset Function**: Clear all data with one button

---

## 🎯 How to Use

### 1. View Your Location on Map

**On Home Screen:**
- Click "📍 Show Map" button
- See your current location in Austin
- Blue marker shows your position
- Map updates in real-time

**In Modals:**
- Walking Home: Shows route to destination
- Traveling: Shows selected destination
- Check In: Shows current location

### 2. Test Location Updates

**Walking Home:**
1. Click "🏃‍♀️ Walking Home"
2. Click "Start Monitoring"
3. Watch your marker move on the map
4. Location updates every 250ms
5. Arrives at destination after 5 seconds

**Traveling:**
1. Click "✈️ Traveling"
2. Select destination (Airport, University, etc.)
3. Click "Start Travel Mode"
4. Location updates to destination
5. Activity logged

### 3. Emergency Maps

**Tier 2 Alert:**
- Shows last known location
- Map embedded in alert card
- Address and timestamp displayed

**Tier 3 Emergency:**
- Real-time location map
- Continuous updates
- Red emergency marker
- Circle member coordination

### 4. Reset All Data

**Reset Button:**
- Located in top-left of HomeScreen
- 🔄 Icon (rotates on hover)
- Confirms before resetting
- Clears all data and restores defaults

**What Gets Reset:**
- ✅ Location history
- ✅ Activities
- ✅ Learning progress (back to 35%)
- ✅ Active sessions
- ✅ Emergency status
- ✅ User status (back to "safe")

---

## 📍 Austin Locations

**Available Destinations:**

1. **Downtown Austin** (30.2672, -97.7431)
   - Default starting location
   - Central business district

2. **University of Texas** (30.2849, -97.7341)
   - UT Austin campus
   - North of downtown

3. **Austin Airport** (30.1945, -97.6699)
   - Austin-Bergstrom International
   - Southeast of downtown

4. **Zilker Park** (30.2669, -97.7728)
   - Popular park area
   - West of downtown

5. **Texas State Capitol** (30.2747, -97.7403)
   - State capitol building
   - North of downtown

6. **South Austin** (30.2000, -97.7500)
   - South Austin area
   - South of downtown

7. **North Austin** (30.3500, -97.7500)
   - North Austin area
   - Far north of downtown

---

## 🔄 Data Flow

### Real-Time Updates

**How It Works:**
1. Data store updates location/status
2. Saves to localStorage
3. `useDataStore` hook detects change
4. React state updates
5. Components re-render
6. Map updates marker position

**Update Frequency:**
- Auto-refresh: Every 2 seconds
- Location simulation: Every 250ms
- Manual refresh: On user actions

### Data Persistence

**localStorage:**
- Key: `circle_app_data`
- Format: JSON
- Size: ~100KB typical
- Persists across sessions

**View Data:**
- Open browser DevTools
- Application → Local Storage
- Key: `circle_app_data`
- View/edit JSON directly

---

## 🧪 Testing Workflows

### Complete Workflow Test

1. **Start Fresh**
   - Click reset button (🔄)
   - Confirm reset
   - Page reloads with default data

2. **Walking Home**
   - Click "🏃‍♀️ Walking Home"
   - See map with route
   - Click "Start Monitoring"
   - Watch marker move
   - See activity logged

3. **Check In**
   - Click "✅ Check In"
   - See current location on map
   - Click "Done"
   - Activity appears in list

4. **Travel Mode**
   - Click "✈️ Traveling"
   - Select "Austin Airport"
   - Click "Start Travel Mode"
   - Location updates
   - Activity logged

5. **Emergency**
   - Click Emergency tab
   - See Tier 1 alert
   - Click "Need Help"
   - Escalates to Tier 3
   - See real-time map
   - Location continuously updates

6. **View Map**
   - On HomeScreen
   - Click "📍 Show Map"
   - See your location
   - Map updates in real-time

---

## 🐛 Troubleshooting

### Map Not Showing

**Check:**
- Browser console for errors
- Leaflet CSS loaded
- Internet connection (for tiles)
- Coordinates valid

**Fix:**
- Hard refresh (Cmd+Shift+R)
- Clear browser cache
- Check network tab

### Location Not Updating

**Check:**
- Data store updating
- localStorage saving
- `useDataStore` hook active
- Console for errors

**Fix:**
- Click reset button
- Refresh page
- Check localStorage in DevTools

### Data Not Persisting

**Check:**
- localStorage enabled
- Storage quota not exceeded
- Browser privacy settings
- Incognito mode (disables localStorage)

**Fix:**
- Enable localStorage
- Clear other site data
- Use normal browsing mode

---

## 📊 Data Structure

### Current Location
```javascript
{
  lat: 30.2672,
  lng: -97.7431,
  address: "Downtown Austin, TX",
  timestamp: 1700000000000
}
```

### Activity
```javascript
{
  id: 1234567890,
  type: "check_in",
  message: "Checked in safe",
  timestamp: 1700000000000,
  icon: "✅"
}
```

### Session
```javascript
{
  walking: {
    destination: { lat, lng, address },
    startTime: 1700000000000
  }
}
```

---

## 🚀 Next Steps

### Enhancements
- [ ] Add more Austin locations
- [ ] Show circle members on map
- [ ] Location history timeline
- [ ] Geofencing alerts
- [ ] Route optimization
- [ ] Traffic data integration

### Production
- [ ] Replace localStorage with database
- [ ] Add WebSocket for real-time
- [ ] Integrate real GPS
- [ ] Add Google Maps/Mapbox
- [ ] Server-side location tracking

---

**Enjoy testing the real-time maps! 🗺️**

