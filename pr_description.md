# Refactor + Feature Enhancement: BaZi Report App v1.6

## Summary
This PR introduces an upgrade to the prior single-file BaZi (八字) report tool:
1. Structural refactor → modularization (data / logic / UI separation).
2. Feature additions → Five Element strength analytics, refined ShenSha classification with sources, enhanced PDF, narrative enrichment.

## Motivation
- Improve maintainability & clarity of responsibilities.
- Provide more analytical insight (element weighting & categorized ShenSha).
- Offer richer, shareable PDF output (timestamp, distribution, disclaimer).
- Lay groundwork for future: 藏干/透干, 大運, 流年 overlay.

## Key Changes
- New file structure: index.html + js/data.js + js/logic.js + js/ui.js.
- Five Element strength (天干=1, 納音=0.5); status 旺 / 平 / 弱 (deviation threshold ±0.8 from average).
- Refined ShenSha (teaching subset): 天乙貴人, 桃花, 紅鸞, 天喜, 驛馬, 華蓋, 孤辰, 寡宿, 羊刃, 咸池(桃花) with source pillars (年/月/日/時) & categorized badges.
- Narrative now includes element status + per-army ShenSha subset.
- PDF: timestamp, ShenSha categories, element distribution, disclaimer, multi-page safety.
- UI polish: color-coded elements, smooth scroll, highlight on auto-guessed hour branch.

## Not Included (Future)
- 地支藏干 strength weighting.
- 大運 / 流年 cycles.
- Precise 節氣換日 auto-computation.
- Full ShenSha catalogue.

## Testing Checklist
- Compare legacy output vs new (core pillars, Ten Gods, NaYin unchanged).
- Hour edge cases: 23:xx & 00:xx under both 子時 policies.
- ShenSha source pillars match expectations.
- Five Element total baseline = 4 stems + 4×0.5 NaYin = 6.0 (unless future weighting changes).
- PDF generation across page breaks (long narratives still paginate correctly).

## Rollback Plan
If issues arise, revert to the previous commit or retain original single-file version (if still present) as fallback.

## License
- jsPDF (MIT) via CDN.
- Data tables manually curated (educational subset).

---
Let me know if you'd like a simplified English-only version or additional documentation.