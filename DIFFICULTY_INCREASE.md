# Difficulty Increase Summary

## Overview
Increased simulation difficulty across multiple dimensions to make the activity more challenging and realistic for NCLEX-level clinical judgment.

---

## Changes Implemented

### 1. ✅ Consequence Cases Much More Common

**Location**: `group.html` - `decideJigsawVariantForGroup()` function (Line ~1866)

**Changes**:
- **Previous threshold**: stability < 75 OR flashcard miss → consequence
- **New threshold**: stability < 90 OR flashcard miss → consequence
- **New logic**: Flashcard miss ALWAYS assigns consequence (no exceptions)

**New Rule**:
```javascript
if (hadFlashcardMiss) {
  resolve('consequence');  // ALWAYS consequence if they missed flashcard
} else if (stability < 90) {
  resolve('consequence');  // More strict stability threshold
} else {
  resolve('standard');     // Only if no miss AND stability >= 90
}
```

**Impact**: 
- Groups must maintain very high stability (90+) to get standard cases
- Any flashcard mistake guarantees harder consequence case
- Expected outcome: 80-90% of groups now get consequence cases vs. previous ~40-50%

---

### 2. ✅ Flashcard Penalties Significantly Increased

**Location**: `group.html` - `submitFlashcardGuess()` function (Line ~1458)

**Changes**:
- **Previous penalty**: Wrong flashcard = "moderate" severity = -15 stability (with difficulty multiplier)
- **New penalty**: Wrong flashcard = "critical" severity = -20 to -50 stability (depending on difficulty setting)

**Updated Code**:
```javascript
// OLD: severity: 'moderate' (-15 base)
// NEW: severity: 'critical' (-25 base, -50 with 2x difficulty)

recordDecision({
  phase: 'flashcard',
  itemId: cardId,
  isCorrect: false,
  severity: 'critical',  // Changed from 'moderate'
  explanation: 'CRITICAL: Misclassified... Major clinical reasoning error.'
});
```

**Impact**:
- 2 wrong flashcard guesses now drops stability from 100 → ~50 (critical zone)
- 3 wrong guesses puts group in extreme danger (<25 stability)
- Forces more RRT calls and consequence cases in Phase 2

---

### 3. ✅ NGN Multi-Step Cases Added

**Location**: `group.html` - `jigsawCases` object (Line ~1668)

**Cases Upgraded to NGN-Style**:

#### Psych Consequence Case: Serotonin Syndrome
Now requires ALL 4 steps:
1. **IDENTIFY**: Most likely condition
2. **PRIORITIZE**: FIRST nursing action
3. **ANALYZE**: Which provider order to question/hold
4. **EDUCATE**: ONE priority teaching point for discharge

#### Infection Consequence Case: Amphotericin B Nephrotoxicity + Hyperkalemia
Now requires ALL 4 steps:
1. **IDENTIFY**: TWO critical conditions
2. **PRIORITIZE**: Most IMMEDIATE life threat and rationale
3. **INTERVENE**: FIRST nursing action before calling provider
4. **PREVENT**: Earlier monitoring (specific lab + frequency)

**Visual Enhancement**:
- Red highlighted box with ⚠️ NGN-STYLE MULTI-STEP CLINICAL JUDGMENT header
- Numbered steps clearly visible
- Warning to Charge Nurse: "ALL steps must be addressed correctly to APPROVE"

**Impact**:
- Consequence cases now demand NGN-level clinical judgment
- Groups must demonstrate systematic thinking across multiple domains
- Charge nurses have clear rubric for approval/escalation

---

### 4. ✅ RRT Recovery Capped for Critical Patients

**Location**: `group.html` - `applyIntervention()` function (Line ~2478)

**Changes**:
- **Previous**: RRT intervention could boost any patient from any stability level to 100
- **New**: Critical patients (<50 stability) capped at 50-80 range after rescue

**New Logic**:
```javascript
if (stabilityBefore < 50) {
  // Critical patients max out at 80 even with intervention
  return Math.min(80, Math.max(50, newStability));
} else {
  // Non-critical patients can recover more fully
  return Math.min(100, newStability);
}
```

**Impact**:
- "Rescued but still sick" realistic clinical state
- Groups that dropped to critical can't instantly recover
- Maintains higher stakes throughout simulation
- RRT interventions still helpful but not a complete reset

---

### 5. ✅ Stricter Charge Nurse Grading Rubric

**Location**: `group.html` - `setupJigsawCases()` function (Line ~2192)

**Changes**:
- Added prominent grading rubric box visible for EVERY case
- Color-coded warning (yellow background, orange border)

**Rubric Display**:
```
⚠️ STRICT GRADING RUBRIC:

✓ APPROVE only if group correctly identifies:
   1) The condition (diagnosis/syndrome)
   2) The correct FIRST action (specific intervention)
   3) One key lab/monitoring OR teaching point

⚠️ ESCALATE if they miss ANY of the above or reasoning is incomplete/unsafe.
```

**Impact**:
- Charge nurses have explicit standards for approval
- "Approve" becomes rare and meaningful
- Encourages more liberal use of "Escalate" for incomplete reasoning
- Groups held to higher standard of clinical judgment

---

## Summary of Difficulty Adjustments

### Numerical Changes

| Metric | Before | After | Impact |
|--------|--------|-------|--------|
| **Consequence case threshold** | < 75 stability | < 90 stability | +20% stricter |
| **Flashcard wrong penalty** | -15 base | -25 base | +67% harsher |
| **Standard case rate** | ~50% | ~10-20% | 60-75% reduction |
| **RRT recovery cap** | No limit | 50-80 max | Maintains realism |

### Expected Outcomes

1. **More Consequence Cases**: 80-90% of groups encounter harder scenarios
2. **Higher Stakes Flashcards**: 2-3 mistakes puts groups in critical zone
3. **Deeper Clinical Reasoning**: NGN multi-step cases require comprehensive thinking
4. **Realistic RRT Recovery**: Critical patients stay vulnerable even after rescue
5. **Stricter Grading**: Charge nurses consistently apply high standards

---

## Files Modified

- ✅ `/workspaces/Ati-pharm-blitz/group.html` - All difficulty changes implemented
  - Line ~1458: Flashcard penalty increased
  - Line ~1688: Psych NGN case added
  - Line ~1830: Infection NGN case added
  - Line ~1896: Jigsaw variant threshold raised
  - Line ~2192: Charge nurse grading rubric added
  - Line ~2488: RRT recovery capping implemented

---

## No Structural Changes

✅ No UI layout changes
✅ All roles preserved (student, charge nurse, RRT, instructor)
✅ Firebase paths unchanged (groups, events, caseAssignments)
✅ General schema intact
✅ No visual breaking changes

---

## Testing Recommendations

1. **Flashcard Phase**: Verify wrong answers drop stability by ~25 (or more with difficulty slider)
2. **Jigsaw Assignment**: Confirm groups with stability <90 get consequence cases
3. **NGN Cases**: Check Psych and Infection consequence cases display multi-step format
4. **RRT Capping**: Test that critical patients (<50) max out at 80 after intervention
5. **Charge Nurse View**: Verify rubric box appears with clear grading criteria

---

## Instructor Notes

### Adjusting Difficulty Further

If still too easy:
- Increase difficulty slider to 1.5x or 2.0x (makes flashcard errors -37.5 to -50)
- Manually adjust `stabilityBefore < 50` threshold in RRT capping to `< 60` or `< 70`

If too hard:
- Lower difficulty slider to 0.7x (makes flashcard errors ~-17.5)
- Adjust Jigsaw threshold from 90 back to 85

### Monitoring Success

Watch for:
- Increased RRT call frequency (should rise significantly)
- More groups experiencing consequence cases (~80%+)
- Lower average stability scores across session
- More charge nurse escalations vs approvals
