# Fix Plan: Rehab Centers Page Header Overlap Issue

## Information Gathered:
- **Navbar (`.nav-wrapper`)**: Fixed position at top, z-index 1000, uses backdrop-filter blur
- **Header Height**: Approximately 130-140px (22px padding + 90px logo + 22px padding)
- **Current Issue**: The `.rehab-page-header` has only 80px padding-top, which is insufficient to clear the fixed header
- **No offset mechanism**: Missing body padding-top or main margin-top for fixed header

## Plan:
1. Add `body` padding-top equal to header height (~100px) to push all content below the fixed header
2. This will fix the overlap for all pages using this CSS
3. Ensure responsive behavior for mobile/tablet

## Dependent Files:
- `white.css` - Main CSS file that needs modification

## Implementation Steps:
1. Add body padding-top in white.css to account for fixed header
2. Test the fix ensures content starts below the fixed header
3. Verify responsiveness on mobile and tablet

## Followup:
- No installation required (CSS only)
- No additional testing needed (visual verification)

