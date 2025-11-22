# Circle Safety App - Complete User Flows

## 1. Onboarding & Setup Flow

```mermaid
graph TD
    A[App Launch] --> B{First Time?}
    B -->|Yes| C[Splash Screen]
    B -->|No| D{Logged In?}
    
    C --> E[Welcome Screen 1]
    E --> F[Welcome Screen 2]
    F --> G[Welcome Screen 3]
    G --> H[Get Started]
    
    H --> I[Phone/Email Entry]
    I --> J[Verification Code]
    J --> K{Code Valid?}
    K -->|No| L[Show Error]
    L --> J
    K -->|Yes| M[Create Profile]
    
    M --> N[Add Name]
    N --> O[Add Photo]
    O --> P[Add Emergency Contact]
    P --> Q[Request Permissions]
    
    Q --> R[Location Permission]
    R --> S[Notification Permission]
    S --> T[Call Permission]
    T --> U[Create Circle]
    
    U --> V[Add Circle Members]
    V --> W{Added 1+ Members?}
    W -->|No| X[Skip for Now]
    W -->|Yes| Y[Learning Mode Intro]
    X --> Y
    
    Y --> Z[Home Screen - Learning]
    
    D -->|Yes| AA[Home Screen - Protected]
    D -->|No| I
```

## 2. Daily Monitoring Flow

```mermaid
graph TD
    A[User Leaves Home] --> B[App Detects Movement]
    B --> C[Background Tracking Active]
    
    C --> D{Matches Routine?}
    D -->|Yes| E[Silent Monitoring]
    D -->|No| F{Deviation Significant?}
    
    F -->|No| E
    F -->|Yes| G{Risk Factors?}
    
    G -->|Low| E
    G -->|Medium| H[Tier 1: Gentle Check-In]
    G -->|High| I[Tier 2: Safety Prompt]
    
    H --> J{User Response?}
    J -->|I'm Safe| K[Log & Learn]
    J -->|Extend Time| L[Update Expected Time]
    J -->|Need Help| M[Tier 3: Emergency]
    J -->|No Response 15min| I
    
    I --> N[Call User]
    N --> O{Answered?}
    O -->|Yes| P[User OK?]
    O -->|No| Q[2nd Call Attempt]
    
    Q --> R{Answered?}
    R -->|Yes| P
    R -->|No| S[3rd Call Attempt]
    
    S --> T{Answered?}
    T -->|Yes| P
    T -->|No| M
    
    P -->|Yes| K
    P -->|No| M
    
    M --> U[Alert All Circle]
    U --> V[Share Real-Time Location]
    V --> W[Enable Audio Recording]
    W --> X[Circle Coordination]
    
    L --> E
    K --> E
    
    E --> Y[User Arrives Home]
    Y --> Z[Auto Check-In]
    Z --> AA[Monitoring Paused]
```

## 3. Manual Check-In Flow

```mermaid
graph TD
    A[User Opens App] --> B[Home Screen]
    B --> C[Quick Actions]
    
    C --> D{Select Action}
    D -->|Walking Home| E[Start Walking Mode]
    D -->|Going Out| F[Set Return Time]
    D -->|Traveling| G[Travel Mode Setup]
    D -->|Check In| H[Manual Check-In]
    
    E --> I[Expected Arrival: 15 min]
    I --> J[Active Monitoring]
    J --> K[Arrival Detection]
    K --> L[Auto Check-In]
    
    F --> M[How Long Out?]
    M --> N[Select Duration]
    N --> O[Expected Return Set]
    O --> J
    
    G --> P[Where Traveling?]
    P --> Q[Enter Destination]
    Q --> R[Trip Dates]
    R --> S[Travel Mode Active]
    S --> T[Suspended Normal Patterns]
    
    H --> U[Confirm Safe Now]
    U --> V[Circle Notified]
    V --> W[Timestamp Logged]
```

## 4. Emergency Activation Flow

```mermaid
graph TD
    A[Emergency Trigger] --> B{Trigger Method?}
    
    B -->|Triple Press Power| C[Confirm Emergency]
    B -->|Voice Command| C
    B -->|App Button| C
    B -->|Auto-Detected| D[Skip Confirmation]
    
    C --> E{Confirmed?}
    E -->|No| F[Cancel]
    E -->|Yes| D
    
    D --> G[Emergency Active]
    G --> H[Send Urgent Push to Circle]
    H --> I[Start Real-Time Location]
    I --> J[Begin Audio Recording]
    
    J --> K[Circle Member Actions]
    K --> L[Member 1: Calling User]
    K --> M[Member 2: Heading to Location]
    K --> N[Member 3: Viewing Location]
    K --> O[Member 4: Calling 911]
    
    O --> P[Police Dispatched]
    
    L --> Q{User Answers?}
    Q -->|Yes| R[Situation Update]
    Q -->|No| S[Voicemail Left]
    
    R --> T{False Alarm?}
    T -->|Yes| U[Cancel Emergency]
    T -->|No| V[Continue Emergency]
    
    U --> W[Enter PIN]
    W --> X{PIN Correct?}
    X -->|Yes| Y[Emergency Canceled]
    X -->|No| Z[Duress Detected]
    Z --> V
    
    Y --> AA[All Clear Sent]
    AA --> AB[Incident Report]
    
    V --> AC[Ongoing Response]
    AC --> AD[Resolution]
    AD --> AB
```

## 5. Circle Management Flow

```mermaid
graph TD
    A[My Circle] --> B[View Members]
    
    B --> C{Action?}
    C -->|Add Member| D[Add New Member]
    C -->|Remove Member| E[Select Member]
    C -->|Edit Member| F[Select Member]
    
    D --> G[Enter Contact Info]
    G --> H[Assign Relationship]
    H --> I[Send Invitation]
    I --> J{Accept Method?}
    
    J -->|Has App| K[Push Notification]
    J -->|No App| L[SMS/Email]
    
    K --> M{Accepted?}
    M -->|Yes| N[Member Added]
    M -->|No| O[Pending]
    
    L --> P[Download Link Sent]
    P --> Q[Install App]
    Q --> R[Create Account]
    R --> S[Accept Invitation]
    S --> N
    
    E --> T[Confirm Removal]
    T --> U{Confirmed?}
    U -->|Yes| V[Remove Member]
    U -->|No| B
    
    V --> W[Notify Removed Member]
    W --> X[Member Removed]
    
    F --> Y[Edit Details]
    Y --> Z[Save Changes]
    Z --> AA[Member Updated]
```

## 6. AI Learning & Feedback Flow

```mermaid
graph TD
    A[User Receives Alert] --> B[User Responds]
    
    B --> C{Response Type?}
    C -->|I'm Safe| D[Was This Expected?]
    C -->|False Alarm| E[Tell Us More]
    C -->|Good Catch| F[Log Positive]
    
    D -->|Yes| G[Update Pattern]
    D -->|No| H[Log Exception]
    
    E --> I[What Were You Doing?]
    I --> J[Location Context]
    J --> K[Update ML Model]
    K --> L[Adjust Thresholds]
    
    F --> M[Log Positive Feedback]
    M --> N[Maintain Sensitivity]
    
    G --> O[AI Learns]
    H --> O
    L --> O
    N --> O
    
    O --> P[Next Alert More Accurate]
    
    P --> Q[After 14 Days Learning]
    Q --> R{Accuracy Check}
    R -->|>85%| S[Learning Complete]
    R -->|<85%| T[Continue Learning]
    
    S --> U[Full Protection Active]
    T --> V[Request More Feedback]
    V --> A
```

## 7. Settings & Preferences Flow

```mermaid
graph TD
    A[Settings] --> B{Category?}
    
    B -->|Monitoring| C[Monitoring Settings]
    B -->|Privacy| D[Privacy Settings]
    B -->|Circle| E[Circle Settings]
    B -->|Notifications| F[Notification Settings]
    
    C --> G[Monitoring On/Off]
    G --> H[Schedule-Based?]
    H --> I[Set Schedule]
    I --> J[Sensitivity Level]
    J --> K[Safe Zones]
    
    D --> L[Data Collection]
    L --> M[Location Retention]
    M --> N[Audio Recording]
    N --> O[Share with Circle]
    O --> P[Export Data]
    
    E --> Q[Who Can Alert?]
    Q --> R[Alert Priorities]
    R --> S[Quiet Hours]
    
    F --> T[Push Notifications]
    T --> U[SMS Fallback]
    U --> V[Email Alerts]
    V --> W[Sound & Haptics]
```

## Screen Specifications

### Key Screens to Design:

1. **Splash Screen** (500ms)
   - App logo
   - Brand colors
   - Loading indicator

2. **Onboarding Carousel** (3 screens)
   - Screen 1: "AI learns your routine"
   - Screen 2: "Your trusted circle protects you"
   - Screen 3: "Always watching, never intrusive"
   - Skip button, page indicators, Next/Get Started

3. **Registration** 
   - Phone/Email input
   - Verification code entry
   - Profile creation (name, photo, emergency contact)

4. **Permission Requests**
   - Location (Always Allow)
   - Notifications (Critical Alerts)
   - Phone calls (Emergency)
   - Each with clear explanation

5. **Create Circle**
   - Add members interface
   - Relationship labels
   - Invitation sending
   - Skip option

6. **Home Screen - Learning Mode**
   - Learning progress (0-14 days)
   - Quick actions
   - Manual check-in button
   - "Help me learn" prompts

7. **Home Screen - Protected Mode**
   - Status: "You're protected"
   - Expected next activity
   - Quick actions
   - Circle status

8. **Check-In Prompt (Tier 1)**
   - Friendly greeting
   - "Just checking in!"
   - Three buttons: I'm Safe, Extend Time, Need Help

9. **Safety Prompt (Tier 2)**
   - More urgent tone
   - Last known location
   - "Please respond"
   - Call attempts indicator

10. **Emergency Screen (Tier 3)**
    - Red theme
    - Real-time location map
    - Circle coordination chat
    - Audio recording indicator
    - Cancel button (with PIN requirement)

11. **Circle Member View (Emergency)**
    - User's live location
    - Time since alert
    - Actions: Call, Go to Help, Contact 911
    - Other member status
    - Coordination chat

12. **My Patterns**
    - Learned routines visualization
    - Confidence scores
    - Edit/delete patterns
    - Add safe zones

13. **Circle Management**
    - List of members
    - Add/remove members
    - Member status (active, pending, inactive)
    - Invitation management

14. **Settings**
    - Monitoring toggle
    - Sensitivity slider
    - Safe zones
    - Privacy controls
    - Notification preferences
