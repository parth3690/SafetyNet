# Circle App - Screen Designs & Specifications

## Design System

### Colors

**Primary Palette:**
```
Primary (Safety Blue): #4A90E2
Primary Dark: #2E5C8A
Primary Light: #7BB5F0

Secondary (Alert Orange): #FF9500
Secondary Dark: #CC7700
Secondary Light: #FFAD33

Success Green: #34C759
Warning Amber: #FF9500
Error Red: #FF3B30

Background: #FFFFFF (light mode), #000000 (dark mode)
Surface: #F8F9FA
Border: #E1E4E8

Text Primary: #1C1C1E (87% opacity)
Text Secondary: #8E8E93 (60% opacity)
Text Tertiary: #C7C7CC (38% opacity)
```

**Tier-Specific Colors:**
```
Tier 0 (Monitor): Gray #8E8E93
Tier 1 (Check-In): Blue #4A90E2
Tier 2 (Concern): Amber #FF9500
Tier 3 (Emergency): Red #FF3B30
```

### Typography

**Font Family:** SF Pro (iOS) / Roboto (Android)

**Type Scale:**
```
Display: 34pt Bold - Main titles, hero text
Title 1: 28pt Regular - Screen titles
Title 2: 22pt Regular - Section headers
Title 3: 20pt Semibold - Card titles
Headline: 17pt Semibold - Emphasized text
Body: 17pt Regular - Main content
Callout: 16pt Regular - Secondary content
Subhead: 15pt Regular - Labels
Footnote: 13pt Regular - Captions
Caption: 12pt Regular - Timestamps
```

### Spacing

**Grid:** 8pt base unit

```
Micro: 4pt - Between related items
Small: 8pt - Compact spacing
Medium: 16pt - Standard spacing (most common)
Large: 24pt - Section spacing
XLarge: 32pt - Major sections
XXLarge: 48pt - Screen margins
```

### Components

#### Primary Button
```
Height: 56pt
Corner radius: 16pt
Background: Primary color (#4A90E2)
Text: White, 17pt Semibold
Padding: 16pt horizontal
Shadow: 0 2pt 8pt rgba(74, 144, 226, 0.2)

States:
- Default: Full opacity
- Pressed: 90% opacity, scale 98%
- Disabled: 40% opacity
```

#### Secondary Button
```
Height: 56pt
Corner radius: 16pt
Border: 2pt, Primary color
Background: Transparent
Text: Primary color, 17pt Semibold
Padding: 16pt horizontal

States:
- Default: Border + text color
- Pressed: Light background (5% primary)
- Disabled: 40% opacity
```

#### Text Input
```
Height: 56pt
Corner radius: 12pt
Background: Surface (#F8F9FA)
Border: 1pt, Border color (focused: Primary)
Text: 17pt Regular
Placeholder: Text Secondary color
Padding: 16pt horizontal

States:
- Default: Gray background
- Focused: Primary border (2pt)
- Error: Red border + error text below
- Disabled: 60% opacity
```

#### Status Card
```
Border radius: 16pt
Background: Surface
Padding: 20pt
Shadow: 0 1pt 3pt rgba(0, 0, 0, 0.06)

Contents:
- Icon (24pt × 24pt) or Status indicator
- Title (17pt Semibold)
- Description (15pt Regular, Secondary color)
- Optional action button
```

## Screen Designs

## 1. Splash Screen

**Duration:** 500ms - 1 second

**Layout:**
```
┌──────────────────────────────────────┐
│              Status Bar              │
├──────────────────────────────────────┤
│                                      │
│                                      │
│                                      │
│           [App Logo 120pt]           │
│                                      │
│              CIRCLE                  │
│         Your AI Safety Companion     │
│                                      │
│                                      │
│          [Loading spinner]           │
│                                      │
│                                      │
└──────────────────────────────────────┘
```

**Specifications:**
- Background: Gradient (Primary → Primary Dark)
- Logo: White, 120pt × 120pt
- App name: 34pt Bold, White
- Tagline: 17pt Regular, White 80% opacity
- Loading spinner: White, small size

---

## 2. Welcome Screen 1

**Title:** "AI That Learns Your Routine"

**Layout:**
```
┌──────────────────────────────────────┐
│              Status Bar              │
├──────────────────────────────────────┤
│                                      │
│                                      │
│        [Illustration 280pt]          │
│        (Brain + Clock icon)          │
│                                      │
│                                      │
│  AI That Learns Your Routine         │
│                                      │
│  Circle understands your daily       │
│  patterns so it knows when           │
│  something's wrong—without you       │
│  lifting a finger.                   │
│                                      │
│                                      │
│            ● ○ ○                     │
│                                      │
│  [Skip]              [Next →]        │
└──────────────────────────────────────┘
```

**Specifications:**
- Illustration: Primary color theme, centered
- Title: 28pt Regular, centered
- Body: 17pt Regular, Text Secondary, centered, max 280pt wide
- Page indicators: 8pt circles, Primary (active), Gray (inactive)
- Skip button: 15pt Regular, Text Secondary, top-right
- Next button: Primary button, bottom-right

---

## 3. Welcome Screen 2

**Title:** "Your Trusted Circle Protects You"

**Layout:**
```
┌──────────────────────────────────────┐
│              Status Bar              │
├──────────────────────────────────────┤
│                                      │
│                                      │
│        [Illustration 280pt]          │
│        (People icons connected)      │
│                                      │
│                                      │
│  Your Trusted Circle                 │
│  Protects You                        │
│                                      │
│  Invite friends and family to        │
│  your Circle. They'll get alerts     │
│  only when you might need help.      │
│                                      │
│                                      │
│            ○ ● ○                     │
│                                      │
│  [Skip]              [Next →]        │
└──────────────────────────────────────┘
```

---

## 4. Registration Screen

**Title:** "Get Started"

**Layout:**
```
┌──────────────────────────────────────┐
│  [← Back]  Get Started               │
├──────────────────────────────────────┤
│                                      │
│  Let's create your account           │
│                                      │
│  ┌────────────────────────────────┐ │
│  │ 📱 Phone Number               │ │
│  │ +1 (___) ___-____             │ │
│  └────────────────────────────────┘ │
│                                      │
│              OR                      │
│                                      │
│  ┌────────────────────────────────┐ │
│  │ 📧 Email Address              │ │
│  │ your@email.com                │ │
│  └────────────────────────────────┘ │
│                                      │
│                                      │
│  ┌────────────────────────────────┐ │
│  │      Continue                  │ │
│  └────────────────────────────────┘ │
│                                      │
│  By continuing, you agree to our     │
│  Terms and Privacy Policy            │
│                                      │
└──────────────────────────────────────┘
```

**Specifications:**
- Input fields: Text Input component
- Phone field: Auto-formats with mask
- Email field: Keyboard type = email
- Continue button: Primary button, disabled until valid input
- Terms text: 13pt Regular, Text Tertiary, links in Primary color

---

## 5. Home Screen - Learning Mode (Days 1-14)

**Layout:**
```
┌──────────────────────────────────────┐
│  9:41   🔋📶        Circle     [⚙️]  │
├──────────────────────────────────────┤
│                                      │
│  👋 Hey Sarah                        │
│                                      │
│  ┌────────────────────────────────┐ │
│  │ 🧠 Learning Your Routine        │ │
│  │                                 │ │
│  │ Day 5 of 14                     │ │
│  │ ████████░░░░░░░░ 35%           │ │
│  │                                 │ │
│  │ I'm learning when you leave     │ │
│  │ home, where you go, and when    │ │
│  │ you return. Help me learn       │ │
│  │ faster by labeling activities.  │ │
│  │                                 │ │
│  │ [Help Me Learn →]               │ │
│  └────────────────────────────────┘ │
│                                      │
│  Quick Actions                       │
│                                      │
│  ┌──────────┐  ┌──────────┐        │
│  │    🏃‍♀️    │  │    📅    │        │
│  │ Walking  │  │  Going   │        │
│  │  Home    │  │   Out    │        │
│  └──────────┘  └──────────┘        │
│                                      │
│  ┌──────────┐  ┌──────────┐        │
│  │    ✈️     │  │    ✅    │        │
│  │Traveling │  │  Check   │        │
│  │          │  │   In     │        │
│  └──────────┘  └──────────┘        │
│                                      │
│  Your Circle (3)                     │
│  👤 👤 👤  [View All →]              │
│                                      │
│                                      │
│  ─────────────────────────────────  │
│  🏠  🔍  ❤️  👤                       │
└──────────────────────────────────────┘
```

**Specifications:**

**Status Card (Learning):**
- Background: Light blue gradient
- Icon: Brain emoji or icon
- Progress bar: Primary color, 8pt height
- Text: Body style
- CTA button: Secondary button

**Quick Actions:**
- Grid: 2×2, 16pt spacing
- Card size: (Screen width - 48pt - 16pt) / 2
- Height: 100pt
- Background: Surface
- Icon: 32pt
- Label: 15pt Semibold
- Shadow: Subtle

**Tab Bar:**
- Height: 83pt (includes safe area)
- Icons: 24pt
- Labels: 10pt
- Selected: Primary color
- Unselected: Text Secondary

---

## 6. Home Screen - Protected Mode

**Layout:**
```
┌──────────────────────────────────────┐
│  9:41   🔋📶        Circle     [⚙️]  │
├──────────────────────────────────────┤
│                                      │
│  👋 Hey Sarah                        │
│                                      │
│  ┌────────────────────────────────┐ │
│  │ 🛡️ You're Protected             │ │
│  │                                 │ │
│  │ Everything looks normal          │ │
│  │                                 │ │
│  │ You typically leave work        │ │
│  │ around 6pm. I'll check on       │ │
│  │ you if you're running late.     │ │
│  │                                 │ │
│  │ [View My Patterns →]            │ │
│  └────────────────────────────────┘ │
│                                      │
│  Quick Actions                       │
│  [Same as Learning Mode]             │
│                                      │
│  Recent Activity                     │
│                                      │
│  ┌────────────────────────────────┐ │
│  │ ✅ Checked in safe              │ │
│  │    2 hours ago                  │ │
│  └────────────────────────────────┘ │
│                                      │
│  ┌────────────────────────────────┐ │
│  │ 👤 Emily asked about you        │ │
│  │    Yesterday at 9:30 PM         │ │
│  └────────────────────────────────┘ │
│                                      │
│  ─────────────────────────────────  │
│  🏠  🔍  ❤️  👤                       │
└──────────────────────────────────────┘
```

**Status Card (Protected):**
- Background: Light green gradient
- Icon: Shield emoji or icon
- Success state styling
- More confident tone

---

## 7. Check-In Alert (Tier 1)

**Full Screen Modal:**
```
┌──────────────────────────────────────┐
│                                      │
│                                      │
│            [Icon 80pt]               │
│            (Wave emoji)              │
│                                      │
│       Just Checking In               │
│                                      │
│  You're usually home by now.         │
│  Everything okay?                    │
│                                      │
│                                      │
│  ┌────────────────────────────────┐ │
│  │         I'm Safe              │ │
│  └────────────────────────────────┘ │
│                                      │
│  ┌────────────────────────────────┐ │
│  │      Need More Time           │ │
│  └────────────────────────────────┘ │
│                                      │
│  [Need Help]                         │
│                                      │
│                                      │
└──────────────────────────────────────┘
```

**Specifications:**
- Background: White with slight blue tint
- Icon: 80pt, friendly color
- Title: 28pt Regular
- Message: 17pt Regular, Text Secondary, centered
- Primary button: "I'm Safe" (green background)
- Secondary button: "Need More Time"
- Tertiary button: "Need Help" (red text)
- Buttons: 56pt height, 16pt vertical spacing

---

## 8. Safety Prompt (Tier 2)

**Full Screen Modal:**
```
┌──────────────────────────────────────┐
│                                      │
│            [Icon 80pt]               │
│         (Alert symbol)               │
│                                      │
│      We're Concerned                 │
│                                      │
│  You haven't responded to our        │
│  check-in. We've tried calling       │
│  twice with no answer.               │
│                                      │
│  ┌────────────────────────────────┐ │
│  │  📍 Last Known Location         │ │
│  │  [Map Preview]                  │ │
│  │  123 Main St                    │ │
│  │  10 minutes ago                 │ │
│  └────────────────────────────────┘ │
│                                      │
│  Your circle has been notified.      │
│                                      │
│  ┌────────────────────────────────┐ │
│  │      I'm Safe Now             │ │
│  └────────────────────────────────┘ │
│                                      │
│  [I Need Help]                       │
│                                      │
└──────────────────────────────────────┘
```

**Specifications:**
- Background: Amber tint
- Icon: Alert symbol, amber color
- Title: 28pt Semibold
- Message: 17pt Regular, centered
- Location card: Status card component, map thumbnail
- Primary button: "I'm Safe Now" (green)
- Danger button: "I Need Help" (red text)

---

## 9. Emergency Screen (Tier 3 - User View)

**Full Screen:**
```
┌──────────────────────────────────────┐
│  🚨 EMERGENCY ACTIVE                 │
├──────────────────────────────────────┤
│                                      │
│  Your circle has been alerted        │
│                                      │
│  📍 Sharing real-time location       │
│  🎙️  Audio recording started         │
│                                      │
│  ┌────────────────────────────────┐ │
│  │ 👤 Mom         📞 Calling you  │ │
│  │ 👤 Sarah       🏃 On the way   │ │
│  │ 👤 Jake        👁️ Watching     │ │
│  └────────────────────────────────┘ │
│                                      │
│  Circle Chat                         │
│  ┌────────────────────────────────┐ │
│  │ Mom: I'm calling 911           │ │
│  │ Sarah: 2 minutes away!         │ │
│  │ [Type message...]              │ │
│  └────────────────────────────────┘ │
│                                      │
│                                      │
│  ┌────────────────────────────────┐ │
│  │   Cancel Emergency             │ │
│  │   (Requires PIN)               │ │
│  └────────────────────────────────┘ │
│                                      │
│  Started 3 minutes ago               │
└──────────────────────────────────────┘
```

**Specifications:**
- Background: Red gradient
- All text: White
- Header: 22pt Semibold, emergency icon
- Status icons: Location, microphone
- Member status: List with avatars and current action
- Chat: Messaging interface, scrollable
- Cancel button: Outlined button (white), bottom
- Timer: 13pt Regular, white 60% opacity

---

## 10. Emergency View (Circle Member)

**Full Screen:**
```
┌──────────────────────────────────────┐
│  🚨 URGENT - Sarah Needs Help        │
├──────────────────────────────────────┤
│                                      │
│  ┌────────────────────────────────┐ │
│  │                                 │ │
│  │         [Live Map]              │ │
│  │     📍 Sarah's Location         │ │
│  │                                 │ │
│  └────────────────────────────────┘ │
│                                      │
│  📍 123 Main St, Dallas             │
│  ⏱️  Alert: 3 minutes ago            │
│  🔋 Phone battery: 40%              │
│  🚶 No movement detected            │
│                                      │
│  What You Can Do                     │
│                                      │
│  ┌────────────────────────────────┐ │
│  │    📞 Call Sarah               │ │
│  └────────────────────────────────┘ │
│                                      │
│  ┌────────────────────────────────┐ │
│  │    🏃 I'm Going (2.5 mi)       │ │
│  └────────────────────────────────┘ │
│                                      │
│  ┌────────────────────────────────┐ │
│  │    🚨 Contact 911              │ │
│  └────────────────────────────────┘ │
│                                      │
│  Other Circle Members                │
│  • Mom - Tried calling               │
│  • Jake - Watching                   │
│                                      │
└──────────────────────────────────────┘
```

**Specifications:**
- Background: Red theme (less intense than user view)
- Map: Full-width, 240pt height, showing user location
- Info cards: Status card style with icons
- Action buttons: Full-width, 56pt height, 8pt spacing
- Primary: "Call Sarah" (blue)
- Secondary: "I'm Going" (shows distance)
- Danger: "Contact 911" (red)
- Member status: List format, compact

---

## Component Specifications Reference

### Avatar Component
```
Size: 40pt × 40pt (default), 32pt, 24pt (small)
Shape: Circle
Border: 2pt, white (when on colored background)
Placeholder: Initials, colored background
```

### Badge Component
```
Size: 20pt × 20pt (small), 24pt × 24pt (medium)
Shape: Circle
Position: Top-right of parent element
Background: Red (notifications), Green (online)
Border: 2pt white
Text: 12pt Bold, white, centered
```

### Progress Bar
```
Height: 8pt
Corner radius: 4pt (fully rounded)
Background: Gray (20% opacity)
Fill: Primary color
Animation: Smooth, 0.3s ease
```

### Map Component
```
Height: 240pt (fullscreen), 120pt (preview)
Corner radius: 16pt
Marker: User avatar or pin icon
Controls: Zoom buttons (bottom-right)
Dark mode: Dark map style
```

This design system and screen specifications provide everything needed to build high-fidelity prototypes and hand off to developers!
