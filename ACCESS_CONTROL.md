# Access Control Summary

## Student View (Default)

When students access [index.html](index.html), they see:

### Visible Elements:
- **Page Title**: "ATI Pharm Blitz"
- **Subtitle**: "1-Hour High-Yield NCLEX Pharmacology Review"
- **Instructions**: "Select your assigned group to begin:"
- **Group Links** (6 total):
  - Group 1 - Neurological 🧠
  - Group 2 - Psychopharmacology 💊
  - Group 3 - Pain Management 😣
  - Group 4 - Inflammation 🔥
  - Group 5 - Endocrine 🩺
  - Group 6 - Infection 🦠
- **Instructor Access Button**: "🔓 Enter Instructor Mode" (triggers passcode modal)

### Hidden Elements:
- All instructor dashboard sections
- Debrief board
- Live monitoring dashboard
- Performance metrics
- Random assignment tool
- Timer controls
- Adaptive difficulty settings
- RRT performance metrics
- Session export functionality

---

## Instructor View (After Passcode)

When instructors click "Enter Instructor Mode" and enter the correct passcode (`mednurse2024`), they gain access to:

### Visible Elements:
- **Student Home Screen Link**: Navigate back to group selection
- **Reset Game Button**: Clear all Firebase data (with confirmation)
- **Debrief Board**: Review charge nurse notes from all 6 groups
  - Charge Nurse 1 section (Groups 1-3)
  - Charge Nurse 2 section (Groups 4-6)
  - Export Session Report button
- **Instructor Dashboard - Live View**:
  - **Phase Timer Controls**: Start/stop timers for Warm-Up, Huddle, Jigsaw, Speed Round
  - **Adaptive Difficulty Controls**: Adjust error penalty multipliers (0.5x - 2.0x)
  - **Patient Stability Monitoring**: Real-time stability bars for all 6 groups
  - **Performance Metrics**:
    - Average stability across all groups
    - Total errors made
    - RRT calls count
    - Interventions applied
  - **RRT Performance Metrics**:
    - Average response time
    - Average stability gain
    - Most used intervention type
    - Reflections submitted count
  - **Recent Alerts Panel**: Last 25 events with severity indicators
  - **Expert Huddle Submissions**: Live updates from all 6 groups

---

## Passcode Protection

### Implementation Details:
- **Passcode**: `mednurse2024` (hardcoded, same as group.html leadership roles)
- **Modal Features**:
  - Styled passcode input field
  - Error message display for incorrect attempts
  - Keyboard support (Enter to submit, Escape to cancel)
  - Shake animation on incorrect password
  - Cancel button to return to student view

### Security Level:
- Client-side passcode protection (suitable for educational/classroom use)
- Same passcode used for Charge Nurse and RRT leadership roles in group.html
- Prevents casual access but not cryptographically secure
- Appropriate for controlled classroom/lab environments

---

## Navigation Flow

### Student Path:
1. Load index.html → See group selection
2. Click Group 1-6 → Navigate to group.html?group=N
3. Complete simulation activities

### Instructor Path:
1. Load index.html → See group selection
2. Click "Enter Instructor Mode" → Passcode modal appears
3. Enter `mednurse2024` → Access instructor dashboard
4. Monitor all groups, adjust difficulty, export reports

---

## Testing Coverage

All access control features are validated by automated tests:
- ✅ Group selection links visible to students
- ✅ Instructor mode button visible to students
- ✅ Passcode modal triggered on instructor mode click
- ✅ Correct passcode unlocks instructor dashboard
- ✅ Instructor content displayed after authentication

Run tests with: `npm test`
