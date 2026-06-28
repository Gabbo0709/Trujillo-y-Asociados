# Lessons Learned

## Context: Navigation Header / Brand Color Alignment
- **Mistake/Anti-Pattern:** Attempting to introduce custom scoped color variables (`#2B0C0A` for Dark Burgundy/Wine) instead of adhering strictly to the established brand color palette.
- **Corrected Behavior:** Map the requested Wine color to the existing `--color-chocolate-alto` (`#3F1F13`) variable from the visual identity system. Do not introduce new color variables that are not part of the core brand palette.
