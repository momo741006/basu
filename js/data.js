export const Stems=["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"];
export const Branches=["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"];
export const HourByDayStem={
  "甲":["甲子","乙丑","丙寅","丁卯","戊辰","己巳","庚午","辛未","壬申","癸酉","甲戌","乙亥"],
  "乙":["丙子","丁丑","戊寅","己卯","庚辰","辛巳","壬午","癸未","甲申","乙酉","丙戌","丁亥"],
  "丙":["戊子","己丑","庚寅","辛卯","壬辰","癸巳","甲午","乙未","丙申","丁酉","戊戌","己亥"],
  "丁":["庚子","辛丑","壬寅","癸卯","甲辰","乙巳","丙午","丁未","戊申","己酉","庚戌","辛亥"],
  "戊":["壬子","癸丑","甲寅","乙卯","丙辰","丁巳","戊午","己未","庚申","辛酉","壬戌","癸亥"],
  "己":["甲子","乙丑","丙寅","丁卯","戊辰","己巳","庚午","辛未","壬申","癸酉","甲戌","乙亥"],
  "庚":["丙子","丁丑","戊寅","己卯","庚辰","辛巳","壬午","癸未","甲申","乙酉","丙戌","丁亥"],
  "辛":["戊子","己丑","庚寅","辛卯","壬辰","癸巳","甲午","乙未","丙申","丁酉","戊戌","己亥"],
  "壬":["庚子","辛丑","壬寅","癸卯","甲辰","乙巳","丙午","丁未","戊申","己酉","庚戌","辛亥"],
  "癸":["壬子","癸丑","甲寅","乙卯","丙辰","丁巳","戊午","己未","庚申","辛酉","壬戌","癸亥"]
};
export const NaYin={"甲子":"海中金","乙丑":"海中金","丙寅":"爐中火","丁卯":"爐中火","戊辰":"大林木","己巳":"大林木","庚午":"路旁土","辛未":"路旁土","壬申":"劍鋒金","癸酉":"劍鋒金","甲戌":"山頭火","乙亥":"山頭火","丙子":"澗下水","丁丑":"澗下水","戊寅":"城牆土","己卯":"城牆土","庚辰":"白蠟金","辛巳":"白蠟金","壬午":"楊柳木","癸未":"楊柳木","甲申":"泉中水","乙酉":"泉中水","丙戌":"屋上土","丁亥":"屋上土","戊子":"霹靂火","己丑":"霹靂火","庚寅":"松柏木","辛卯":"松柏木","壬辰":"長流水","癸巳":"長流水","甲午":"沙中金","乙未":"沙中金","丙申":"山下火","丁酉":"山下火","戊戌":"平地木","己亥":"平地木","庚子":"壁上土","辛丑":"壁上土","壬寅":"金箔金","癸卯":"金箔金","甲辰":"覆燈火","乙巳":"覆燈火","丙午":"天河水","丁未":"天河水","戊申":"大驛土","己酉":"大驛土","庚戌":"釵釧金","辛亥":"釵釧金","壬子":"桑柘木","癸丑":"桑柘木","甲寅":"大溪水","乙卯":"大溪水","丙辰":"沙中土","丁巳":"沙中土","戊午":"天上火","己未":"天上火","庚申":"石榴木","辛酉":"石榴木","壬戌":"大海水","癸亥":"大海水"};
export const FiveEl = { "甲":"木","乙":"木","丙":"火","丁":"火","戊":"土","己":"土","庚":"金","辛":"金","壬":"水","癸":"水" };
export const Yang = new Set(["甲","丙","戊","庚","壬"]);

/* Refined (teaching subset) ShenSha rules returning source pillars */
const TianYiMap={"甲":["丑","未"],"己":["丑","未"],"乙":["子","申"],"庚":["子","申"],"丙":["亥","酉"],"丁":["亥","酉"],"戊":["丑","未"],"辛":["午","寅"],"壬":["卯","巳"],"癸":["卯","巳"]};
const PeachGroup={"申子辰":"酉","寅午戌":"卯","巳酉丑":"午","亥卯未":"子"};
function groupOf(branch){ if("申子辰".includes(branch)) return "申子辰"; if("寅午戌".includes(branch)) return "寅午戌"; if("巳酉丑".includes(branch)) return "巳酉丑"; return "亥卯未"; }
const YimaMap={"申子辰":"寅","寅午戌":"申","巳酉丑":"亥","亥卯未":"巳"};
const HuagaiMap={"申子辰":"戌","寅午戌":"丑","巳酉丑":"未","亥卯未":"辰"};
const GuchenMap={"申子辰":"寅","寅午戌":"申","巳酉丑":"亥","亥卯未":"巳"};
const GuaSuMap={"申子辰":"戌","寅午戌":"辰","巳酉丑":"巳","亥卯未":"亥"};
const HongLuanMap={"子":"午","丑":"未","寅":"申","卯":"酉","辰":"戌","巳":"亥","午":"子","未":"丑","申":"寅","酉":"卯","戌":"辰","亥":"巳"};
const TianXiMap={"子":"未","丑":"申","寅":"酉","卯":"戌","辰":"亥","巳":"子","午":"丑","未":"寅","申":"卯","酉":"辰","戌":"巳","亥":"午"};
const YangRenMap={"甲":"卯","乙":"寅","丙":"午","丁":"巳","戊":"午","己":"巳","庚":"酉","辛":"申","壬":"子","癸":"亥"};
export const ShenShaRules=[
  {name:"天乙貴人",cat:"貴人",rule:(ctx)=>{const targets=TianYiMap[ctx.dayStem]||[];return ctx.branches.filter(b=>targets.includes(b)).map(b=>ctx.pillarsByBranch(b));}},
  {name:"桃花",cat:"桃花",rule:(ctx)=>{const g=groupOf(ctx.yearBranch);const target=PeachGroup[g];return ctx.branches.filter(b=>b===target).map(b=>ctx.pillarsByBranch(b));}},
  {name:"紅鸞",cat:"桃花",rule:(ctx)=>{const t=HongLuanMap[ctx.yearBranch];return ctx.branches.filter(b=>b===t).map(b=>ctx.pillarsByBranch(b));}},
  {name:"天喜",cat:"桃花",rule:(ctx)=>{const t=TianXiMap[ctx.yearBranch];return ctx.branches.filter(b=>b===t).map(b=>ctx.pillarsByBranch(b));}},
  {name:"驛馬",cat:"動星",rule:(ctx)=>{const target=YimaMap[groupOf(ctx.dayBranch)];return ctx.branches.filter(b=>b===target).map(b=>ctx.pillarsByBranch(b));}},
  {name:"華蓋",cat:"吉星",rule:(ctx)=>{const target=HuagaiMap[groupOf(ctx.dayBranch)];return ctx.branches.filter(b=>b===target).map(b=>ctx.pillarsByBranch(b));}},
  {name:"孤辰",cat:"陰煞",rule:(ctx)=>{const target=GuchenMap[groupOf(ctx.yearBranch)];return ctx.branches.filter(b=>b===target).map(b=>ctx.pillarsByBranch(b));}},
  {name:"寡宿",cat:"陰煞",rule:(ctx)=>{const target=GuaSuMap[groupOf(ctx.yearBranch)];return ctx.branches.filter(b=>b===target).map(b=>ctx.pillarsByBranch(b));}},
  {name:"羊刃",cat:"刑煞",rule:(ctx)=>{const target=YangRenMap[ctx.dayStem];return ctx.branches.filter(b=>b===target).map(b=>ctx.pillarsByBranch(b));}},
  {name:"咸池(桃花)",cat:"桃花",rule:(ctx)=>{const target=PeachGroup[groupOf(ctx.dayBranch)];return ctx.branches.filter(b=>b===target).map(b=>ctx.pillarsByBranch(b));}}
];