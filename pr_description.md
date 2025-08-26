# Refactor + Feature Enhancement: BaZi Report App v1.6 (Finalized)

## Summary
Modular upgrade from legacy single-file v1.4, adding Five Element strength analytics, categorized ShenSha with source pillars, narrative enrichment, enhanced PDF, plus (newly added) auto hour-branch inference and live Gan-Zhi format validation.

## Key Features
- Modular structure: index.html + js/data.js + js/logic.js + js/ui.js
- Five Element weighting: stems=1, NaYin=0.5 → 旺 / 平 / 弱 classification
- Categorized ShenSha (teaching subset) with source pillar tags
- Narrative per pillar (家族/成長/本我/未來軍團)
- Enhanced PDF: timestamp, Five Element distribution, categorized ShenSha, multi-page safety, disclaimer
- Auto 時支 inference (when time provided & user left hour branch blank)
- Live 干支 validation (visual feedback; calc blocked if invalid)

## Acceptance Criteria
- Core outputs (四柱、十神、納音) remain identical to legacy for same inputs
- Five Element panel displays weights totalling 6.0 baseline (4*1 + 4*0.5)
- ShenSha entries list correct categories + source pillar tags
- Auto 時支 triggers only if input time present and user did not manually choose hour branch
- Invalid 干支 inputs prevent calculation; valid inputs show success styling
- PDF exports without console errors and includes all new analytical sections

## Testing Checklist
- 23:40 & 00:20 子時提示 under both policies
- Leave hour branch empty, supply time → auto inference highlight appears
- Enter malformed 干支 (e.g. 甲甲) → cannot calculate
- Compare a known chart vs v1.4 outputs for pillar integrity
- Long ShenSha list (edge case) still wraps in PDF

## Non-Goals (Future)
- 地支藏干 / 季節強弱 weighting
- 大運 / 流年 overlays
- Full ShenSha catalogue toggle
- i18n resource externalization

## Rollback Plan
Revert commit or temporarily serve prior single-file version if critical regression detected.

## Notes
Fix for ShenSha function call bug tracked separately in PR #7.