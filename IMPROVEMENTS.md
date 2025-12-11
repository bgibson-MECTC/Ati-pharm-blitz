# Pharm Blitz Simulation - Recent Improvements

## Overview
Enhanced the Pharm Blitz simulation with 6 major feature sets to improve educational value, engagement, and instructor control.

---

## ✅ 1. Reflection Prompts After RRT Interventions

### What It Does
- **Reflection Modal**: When RRT applies an intervention, affected group sees a modal with reflection questions
- **Questions Asked**:
  - "Why did your patient's stability drop?"
  - "What could your team do differently to prevent this next time?"
- **Data Storage**: Responses stored in Firebase under `reflections/` for instructor review
- **Instructor View**: Reflection count displayed on dashboard

### Educational Value
- Forces critical thinking about clinical errors
- Encourages team discussion of safety practices
- Provides insights for debrief sessions

### Code Location
- **Group View**: `group.html` - `showReflectionPrompt()`, `submitReflection()`
- **Instructor View**: `index.html` - Reflections counter in RRT metrics section

---

## ✅ 2. Randomization System

### What It Does
- **Flashcard Randomization**: Cards shuffle on page load using Fisher-Yates algorithm
- **Prevents Memorization**: Different order each session
- **Jigsaw Cases**: Already randomized based on performance (consequence vs standard)

### Implementation
- **Code**: `group.html` - `randomizeFlashcards()` function
- **Trigger**: Runs on `DOMContentLoaded` event
- **Method**: Reorders DOM elements in flashcard container

---

## ✅ 3. Visual Feedback Animations

### What It Does
- **Success Animations**: Green pulse effect when answer is correct (✅ celebration icon)
- **Error Animations**: Red shake effect when answer is wrong (❌ warning icon)
- **Stability Changes**: Large animated number shows +/- stability changes
- **Celebration Icons**: Appear center-screen with rotation/scale animation

### CSS Animations Added
- `@keyframes successPulse` - Green glow on correct answers
- `@keyframes errorShake` - Horizontal shake on errors
- `@keyframes stabilityBounce` - Bounce effect for stability display
- `@keyframes celebration` - Scale/rotate for celebration icons

### Code Location
- **Styles**: `group.html` - Lines 63-105 (animations)
- **Functions**: `showCelebration()`, `showStabilityFeedback()`
- **Triggers**: `submitFlashcardGuess()`, `recordDecision()`

---

## ✅ 4. Communication Tools

### Team Chat
- **Real-time Chat**: Groups can message each other within their team
- **Firebase Sync**: Messages stored in `chat/group{id}/`
- **Auto-scroll**: Chat window auto-scrolls to newest messages
- **Timestamp**: Each message shows time sent

### Quick Messages to Charge Nurse
- **3 Preset Buttons**:
  - 🆘 "Need help with patient stability"
  - ✅ "Ready for next phase"
  - ❓ "Question about medication"
- **Firebase Storage**: Messages sent to `messages/toChargeNurse/`
- **Read Tracking**: Messages have `read: false` flag for instructor filtering

### Code Location
- **UI**: `group.html` - Team Chat section after Jigsaw Learning
- **Functions**: `sendChatMessage()`, `quickMessage()`, `setupChatListener()`
- **Initialization**: Called in `selectGroup()` function

---

## ✅ 5. Adaptive Difficulty System

### Instructor Controls
- **Slider Control**: 0.5x (Easy) to 2.0x (Hard) multiplier
- **Real-time Display**: Shows current penalty values for each severity
- **Firebase Storage**: Settings saved to `settings/difficulty/`

### Difficulty Levels
| Level | Multiplier | Minor | Moderate | Critical |
|-------|-----------|-------|----------|----------|
| Easy | 0.5x | -2 | -7 | -12 |
| Normal | 1.0x | -5 | -15 | -25 |
| Hard | 2.0x | -10 | -30 | -50 |

### Student Impact
- **Dynamic Penalties**: Student errors apply penalties based on current difficulty
- **Automatic Adjustment**: `recordDecision()` reads Firebase settings before applying delta
- **Fallback**: Uses default 1.0x if no settings found

### Code Location
- **Instructor UI**: `index.html` - Adaptive Difficulty section
- **Control Function**: `updateDifficulty(value)`
- **Student Implementation**: `group.html` - `recordDecision()` function

---

## ✅ 6. RRT Response Metrics Tracking

### Metrics Captured
1. **Response Time**: Milliseconds from RRT call to intervention
2. **Stability Before/After**: Patient state change
3. **Stability Gain**: Amount of improvement
4. **Intervention Type**: Which intervention was used

### Instructor Dashboard Display
- **Avg Response Time**: Shows in seconds (e.g., "45.3s")
- **Avg Stability Gain**: Shows improvement (e.g., "+22.5")
- **Most Used Intervention**: Shows type and count (e.g., "MEDICATION (12)")
- **Reflections Count**: Number of groups who submitted reflections

### Firebase Structure
```
rrt/
  metrics/
    {pushKey}/
      groupId: number
      interventionType: string
      stabilityBefore: number
      stabilityAfter: number
      stabilityGain: number
      responseTimeMs: number
      timestamp: number
```

### Code Location
- **Metrics Capture**: `group.html` - `applyIntervention()` function
- **Display**: `index.html` - RRT Performance Metrics section
- **Listener**: `database.ref('rrt/metrics').on('value', ...)`

---

## Summary of Changes

### Files Modified
1. **group.html**
   - Added 6 CSS animations
   - Added reflection modal system (3 functions)
   - Added flashcard randomization
   - Added visual feedback for answers and stability
   - Added team chat UI and functions
   - Modified `recordDecision()` for adaptive difficulty
   - Enhanced `applyIntervention()` for metrics tracking

2. **index.html**
   - Added RRT Performance Metrics section
   - Added Adaptive Difficulty controls
   - Added metrics listeners for response time, stability gain, intervention types
   - Added reflection counter

### Firebase Paths Added
- `reflections/{pushKey}` - Stores group reflections
- `chat/group{id}/{pushKey}` - Team chat messages
- `messages/toChargeNurse/{pushKey}` - Quick messages to instructor
- `settings/difficulty/` - Difficulty multiplier settings
- `rrt/metrics/{pushKey}` - RRT intervention analytics

### Educational Impact
- **Reflection**: Encourages critical thinking about errors
- **Randomization**: Prevents pattern memorization
- **Visual Feedback**: Immediate reinforcement of learning
- **Communication**: Promotes teamwork and quick help-seeking
- **Adaptive Difficulty**: Allows instructor to match challenge to student level
- **RRT Metrics**: Data-driven insights for debrief discussions

---

## Usage Instructions

### For Instructors
1. **Set Difficulty**: Adjust slider before session starts (default 1.0x)
2. **Monitor Metrics**: Watch RRT performance in real-time
3. **Review Reflections**: Check reflection count and review responses after session
4. **Respond to Messages**: Monitor quick messages from groups

### For Students
1. **Use Team Chat**: Communicate with teammates during phases
2. **Submit Reflections**: Answer reflection questions when RRT intervenes
3. **Watch for Visual Feedback**: Pay attention to success/error animations
4. **Quick Messages**: Use preset buttons to contact charge nurse quickly

---

## Testing Recommendations
1. Test reflection modal appears after RRT intervention
2. Verify flashcards randomize on page reload
3. Check animations trigger on correct/incorrect answers
4. Test team chat messages sync in real-time
5. Verify difficulty slider changes penalty values
6. Confirm RRT metrics display on instructor dashboard

---

## Future Enhancement Ideas
- Add voice/video chat integration
- Create reflection report export
- Add difficulty auto-adjustment based on performance trends
- Implement peer chat between groups during jigsaw
- Add analytics dashboard for post-session review
