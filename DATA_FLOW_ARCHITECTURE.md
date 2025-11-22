# Circle App - Data Flow Architecture
## Real-Time Maps & Database Integration

**Version:** 1.0  
**Date:** November 14, 2025  
**Status:** Prototype Implementation

---

## Overview

This document describes the data flow architecture for the Circle app prototype, including real-time maps integration with Austin, TX as the example city, temporary database structure, and data refresh mechanisms.

---

## Architecture Components

### 1. Data Store Layer (`dataStore.js`)

**Purpose:** Centralized data management with localStorage persistence

**Location:** `src/services/dataStore.js`

**Key Features:**
- Singleton pattern for global state
- localStorage persistence
- Real-time data updates
- Location history tracking
- Activity logging
- Session management

**Data Structure:**
```javascript
{
  user: {
    name, email, phone,
    isLearningMode, learningProgress, learningDay,
    currentLocation: { lat, lng, address, timestamp },
    locationHistory: [...],
    status: "safe" | "walking" | "going_out" | "traveling" | "emergency",
    emergencyTier: null | 1 | 2 | 3,
    lastCheckIn: timestamp
  },
  circle: [
    { id, name, relation, initial, phone, email, isActive, lastSeen }
  ],
  activities: [
    { id, type, message, timestamp, icon }
  ],
  activeSessions: {
    walking: null | { destination, startTime },
    goingOut: null | { duration, startTime },
    traveling: null | { destination, startTime }
  },
  settings: {
    monitoring, sensitivity, safeZones, notifications
  }
}
```

---

### 2. React Hook Layer (`useDataStore.js`)

**Purpose:** React integration for data store with auto-refresh

**Location:** `src/hooks/useDataStore.js`

**Features:**
- React state management
- Auto-refresh every 2 seconds
- Update methods for all data types
- Reset functionality
- Convenience methods

**Usage:**
```javascript
const { user, circle, activities, update, reset, refresh } = useDataStore();
```

---

### 3. Map Component (`MapView.js`)

**Purpose:** Real-time map display using Leaflet/OpenStreetMap

**Location:** `src/components/MapView.js`

**Features:**
- OpenStreetMap tiles (free, no API key needed)
- Custom markers with colors
- User location display
- Path visualization
- Popup information
- Responsive design

**Props:**
- `center`: [lat, lng] - Map center
- `zoom`: number - Zoom level (default: 13)
- `markers`: Array of marker objects
- `showUserLocation`: boolean
- `userLocation`: Location object
- `showPath`: boolean
- `pathCoordinates`: Array of coordinates

---

## Data Flow Diagrams

### Location Update Flow

```
User Action (Walking Home)
    ↓
HomeScreen.handleWalkingHome()
    ↓
dataStore.startSession('walking', {destination})
    ↓
dataStore.updateUser({status: 'walking'})
    ↓
dataStore.addActivity({type: 'walking', ...})
    ↓
dataStore.simulateMovement(destination, duration)
    ↓
[Every 250ms] Update location (interpolated)
    ↓
dataStore.updateLocation(newLocation)
    ↓
localStorage.save()
    ↓
useDataStore.refresh() (auto every 2s)
    ↓
React re-renders with new location
    ↓
MapView updates marker position
```

### Emergency Flow

```
Emergency Trigger
    ↓
EmergencyScreen.handleResponse('help')
    ↓
dataStore.triggerEmergency(3)
    ↓
dataStore.updateUser({emergencyTier: 3, status: 'emergency'})
    ↓
dataStore.addActivity({type: 'emergency', tier: 3})
    ↓
localStorage.save()
    ↓
useDataStore.refresh()
    ↓
EmergencyScreen displays Tier 3 UI
    ↓
MapView shows real-time location
    ↓
Circle members notified (simulated)
```

### Check-In Flow

```
User Clicks Check In
    ↓
HomeScreen.handleCheckIn()
    ↓
dataStore.updateUser({lastCheckIn: now, status: 'safe'})
    ↓
dataStore.addActivity({type: 'check_in', ...})
    ↓
localStorage.save()
    ↓
useDataStore.refresh()
    ↓
HomeScreen shows updated activity
    ↓
MapView shows current location
```

---

## Austin, TX Locations

**Default Locations for Demo:**

```javascript
AUSTIN_LOCATIONS = {
  downtown: { lat: 30.2672, lng: -97.7431, address: "Downtown Austin, TX" },
  university: { lat: 30.2849, lng: -97.7341, address: "University of Texas, Austin" },
  airport: { lat: 30.1945, lng: -97.6699, address: "Austin-Bergstrom International Airport" },
  zilker: { lat: 30.2669, lng: -97.7728, address: "Zilker Park, Austin" },
  capitol: { lat: 30.2747, lng: -97.7403, address: "Texas State Capitol" },
  southAustin: { lat: 30.2000, lng: -97.7500, address: "South Austin" },
  northAustin: { lat: 30.3500, lng: -97.7500, address: "North Austin" }
}
```

---

## Real-Time Updates

### Auto-Refresh Mechanism

**Implementation:**
- `useDataStore` hook refreshes every 2 seconds
- Checks `lastUpdated` timestamp
- Updates React state if data changed
- Triggers re-render of components

**Benefits:**
- Real-time feel without WebSockets
- Works with localStorage
- Low overhead
- Easy to implement

**Future Enhancement:**
- Replace with WebSocket for true real-time
- Add server-side push notifications
- Implement optimistic updates

---

## Data Persistence

### localStorage Structure

**Key:** `circle_app_data`

**Format:** JSON string

**Size Limits:**
- Browser limit: ~5-10MB
- Our usage: ~100KB typical
- Location history: Max 100 entries
- Activities: Max 50 entries

**Persistence:**
- Survives page refresh
- Survives browser restart
- Cleared on "Reset All Data"
- Can be cleared manually via browser settings

---

## Reset Functionality

### Reset Button

**Location:** Top-left of HomeScreen nav bar

**Functionality:**
1. Confirms with user
2. Calls `dataStore.reset()`
3. Restores default data structure
4. Reloads page to refresh all components

**What Gets Reset:**
- ✅ User data (back to defaults)
- ✅ Location history (cleared)
- ✅ Activities (cleared)
- ✅ Active sessions (cleared)
- ✅ Learning progress (reset to 35%)
- ✅ Emergency status (cleared)
- ✅ Circle members (restored to defaults)

**What Preserves:**
- Nothing - complete reset

---

## Workflow Examples

### 1. Walking Home Workflow

```
1. User clicks "Walking Home" quick action
   → Opens modal with map showing route

2. User clicks "Start Monitoring"
   → dataStore.startSession('walking', {destination: downtown})
   → dataStore.updateUser({status: 'walking'})
   → dataStore.addActivity({type: 'walking', ...})

3. Location simulation begins
   → dataStore.simulateMovement(destination, 5000ms)
   → Updates location every 250ms
   → Map marker moves in real-time

4. Arrival
   → dataStore.endSession('walking')
   → dataStore.updateUser({status: 'safe'})
   → dataStore.addActivity({type: 'check_in', ...})
   → Map shows final location
```

### 2. Going Out Workflow

```
1. User clicks "Going Out"
   → Opens modal with duration options

2. User selects "2-3 Hours"
   → dataStore.startSession('goingOut', {duration: '2-3 hours'})
   → dataStore.updateUser({status: 'going_out'})
   → dataStore.addActivity({type: 'going_out', ...})

3. Status updated
   → HomeScreen shows "Going Out" status
   → Activity list updated
   → Timer starts (simulated)
```

### 3. Travel Mode Workflow

```
1. User clicks "Traveling"
   → Opens modal with destination dropdown

2. User selects "Austin Airport"
   → dataStore.startSession('traveling', {destination: airport})
   → dataStore.updateUser({status: 'traveling'})
   → dataStore.addActivity({type: 'traveling', ...})

3. Map updates
   → Shows route to airport
   → Updates location (simulated)
   → Displays destination marker
```

### 4. Emergency Workflow

```
1. User triggers emergency (Tier 1)
   → EmergencyScreen displays check-in prompt
   → Map shows current location

2. User doesn't respond
   → Escalates to Tier 2
   → dataStore.triggerEmergency(2)
   → Circle members notified (simulated)
   → Map shows last known location

3. Still no response
   → Escalates to Tier 3
   → dataStore.triggerEmergency(3)
   → Real-time location sharing
   → Map updates continuously
   → Circle coordination enabled
```

---

## Map Integration Points

### HomeScreen
- **Toggle Map**: Show/hide map view
- **Quick Actions**: Maps in modals showing routes
- **Check-In**: Map showing current location

### EmergencyScreen
- **Tier 2**: Last known location map
- **Tier 3**: Real-time location map with updates

### Future Screens
- **Circle View**: Show all circle members on map
- **Patterns View**: Show routine locations
- **History View**: Show location history path

---

## Data Refresh Strategy

### Current Implementation

**Auto-Refresh:**
- Every 2 seconds via `useDataStore` hook
- Checks `lastUpdated` timestamp
- Only updates if data changed

**Manual Refresh:**
- `refresh()` method available
- Can be called on user actions
- Immediate update

**Optimistic Updates:**
- Updates happen immediately
- localStorage syncs in background
- No loading states needed

### Future Enhancements

**WebSocket Integration:**
```javascript
// Future implementation
const ws = new WebSocket('wss://api.circle.app/ws');
ws.onmessage = (event) => {
  const update = JSON.parse(event.data);
  dataStore.applyUpdate(update);
  refresh();
};
```

**Server-Sent Events (SSE):**
```javascript
// Alternative approach
const eventSource = new EventSource('/api/updates');
eventSource.onmessage = (event) => {
  const update = JSON.parse(event.data);
  dataStore.applyUpdate(update);
  refresh();
};
```

---

## Performance Considerations

### Location History
- **Limit:** 100 entries max
- **Auto-cleanup:** Removes oldest entries
- **Size:** ~5KB per entry
- **Total:** ~500KB max

### Activities
- **Limit:** 50 entries max
- **Auto-cleanup:** Removes oldest entries
- **Size:** ~1KB per entry
- **Total:** ~50KB max

### Map Rendering
- **Markers:** Limited to visible markers
- **Path:** Simplified for performance
- **Tiles:** Cached by browser
- **Updates:** Debounced to prevent flicker

---

## Testing the Data Flow

### Test Scenarios

1. **Location Updates**
   - Start walking home
   - Watch location update in real-time
   - Verify map marker moves
   - Check location history

2. **Activity Logging**
   - Perform various actions
   - Check activity list updates
   - Verify timestamps
   - Test activity limits

3. **Session Management**
   - Start walking session
   - Check active session data
   - End session
   - Verify cleanup

4. **Reset Functionality**
   - Click reset button
   - Confirm reset
   - Verify all data cleared
   - Check default state restored

5. **Emergency Flow**
   - Trigger Tier 1
   - Escalate to Tier 2
   - Escalate to Tier 3
   - Clear emergency
   - Verify state updates

---

## File Structure

```
demo/
├── src/
│   ├── services/
│   │   └── dataStore.js          # Data store & persistence
│   ├── hooks/
│   │   └── useDataStore.js        # React hook for data
│   ├── components/
│   │   ├── MapView.js            # Map component
│   │   └── MapView.css
│   └── screens/
│       ├── HomeScreen.js         # Uses dataStore & MapView
│       └── EmergencyScreen.js    # Uses dataStore & MapView
```

---

## Next Steps

### Immediate
- ✅ Data store implemented
- ✅ Map integration complete
- ✅ Real-time updates working
- ✅ Reset functionality added

### Short Term
- [ ] Add more Austin locations
- [ ] Implement location history view
- [ ] Add circle member locations on map
- [ ] Enhance path visualization

### Long Term
- [ ] Replace localStorage with real database
- [ ] Add WebSocket for true real-time
- [ ] Implement server-side location tracking
- [ ] Add geofencing alerts
- [ ] Integrate with real mapping APIs (Google Maps, Mapbox)

---

## Troubleshooting

### Map Not Loading
- Check Leaflet CSS imported
- Verify OpenStreetMap tiles accessible
- Check browser console for errors
- Ensure coordinates are valid

### Data Not Persisting
- Check localStorage enabled
- Verify no storage quota exceeded
- Check browser privacy settings
- Clear and retry

### Location Not Updating
- Verify `useDataStore` hook mounted
- Check auto-refresh interval
- Verify `lastUpdated` timestamp changes
- Check console for errors

---

**Document Version:** 1.0  
**Last Updated:** November 14, 2025  
**Status:** ✅ Implemented and Working

