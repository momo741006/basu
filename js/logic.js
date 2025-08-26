// 核心計算邏輯 - 八字分析計算函數
import { gans, zhis, sixtyJiazi, wushuDun, hourZhiMap, nayinTable, tenGods, nayinElements, ganElements, shenShaData } from './data.js';

// 解析干支字符串
export function parseGZ(gz) {
    if (!gz || gz.length !== 2) return null;
    const gan = gz[0];
    const zhi = gz[1];
    if (!gans.includes(gan) || !zhis.includes(zhi)) return null;
    return [gan, zhi];
}

// 根據時間推斷時支
export function hourToBranch(hour) {
    return hourZhiMap[hour] || null;
}

// 時柱計算
export function hourPillar(dayGan, hourZhi) {
    if (!gans.includes(dayGan) || !zhis.includes(hourZhi)) return null;
    
    const hourGanBase = wushuDun[dayGan];
    const hourGanBaseIndex = gans.indexOf(hourGanBase);
    const hourZhiIndex = zhis.indexOf(hourZhi);
    const hourGanIndex = (hourGanBaseIndex + hourZhiIndex) % 10;
    const hourGan = gans[hourGanIndex];
    
    return [hourGan, hourZhi];
}

// 十神計算
export function tenGod(dayGan, otherGan) {
    if (!dayGan || !otherGan || !tenGods[dayGan]) return null;
    return tenGods[dayGan][otherGan] || null;
}

// 納音查詢
export function nayin(pillar) {
    if (!pillar || pillar.length !== 2) return null;
    const pillarStr = Array.isArray(pillar) ? pillar.join('') : pillar;
    return nayinTable[pillarStr] || null;
}

// 納音對應五行
export function nayinEl(nayinName) {
    return nayinElements[nayinName] || "未知";
}

// 天干對應五行
export function ganEl(gan) {
    return ganElements[gan] || "未知";
}

// 五行力量計算
export function computeFiveElementStrength(pillars, nayinData) {
    const elements = ["金", "木", "水", "火", "土"];
    const weight = {};
    
    // 初始化
    elements.forEach(el => weight[el] = 0);
    
    // 天干權重 = 1
    [pillars.Y, pillars.M, pillars.D, pillars.H].forEach(pillar => {
        if (pillar && pillar[0]) {
            const el = ganEl(pillar[0]);
            if (weight[el] !== undefined) weight[el] += 1;
        }
    });
    
    // 納音權重 = 0.5
    Object.values(nayinData).forEach(ny => {
        const el = nayinEl(ny);
        if (weight[el] !== undefined) weight[el] += 0.5;
    });
    
    // 計算總權重和平均值
    const total = Object.values(weight).reduce((sum, val) => sum + val, 0);
    const avg = total / elements.length;
    
    // 判斷旺弱狀態
    const status = {};
    elements.forEach(el => {
        if (weight[el] > avg * 1.3) status[el] = "旺";
        else if (weight[el] < avg * 0.7) status[el] = "弱";
        else status[el] = "平";
    });
    
    return { weight, total, avg, status };
}

// 神煞分類
export function classifyShenSha(pillars) {
    const list = [];
    const cats = { "貴人": [], "吉星": [], "桃花": [], "動星": [], "陰煞": [], "刑煞": [] };
    
    // 簡化神煞計算（教學版本）
    Object.entries(shenShaData).forEach(([name, data]) => {
        const sources = [];
        
        // 檢查年柱
        if (data.rule.includes("年") && pillars.Y) {
            if (data.zhis.includes(pillars.Y[1])) sources.push("年軍團");
        }
        
        // 檢查日柱
        if (data.rule.includes("日") && pillars.D) {
            if (data.zhis.includes(pillars.D[1])) sources.push("日軍團");
        }
        
        // 檢查月柱
        if (data.rule.includes("月") && pillars.M) {
            if (data.zhis.includes(pillars.M[1])) sources.push("月軍團");
        }
        
        // 檢查時柱
        if (data.rule.includes("時") && pillars.H) {
            if (data.zhis.includes(pillars.H[1])) sources.push("時軍團");
        }
        
        if (sources.length > 0) {
            const shensha = { name, cat: data.cat, sources };
            list.push(shensha);
            cats[data.cat].push(shensha);
        }
    });
    
    return { list, cats };
}

// 故事敘事生成
export function buildStory(who, pillar, tenGod, relatedCats, nayin, name, elStatus) {
    const gan = pillar[0];
    const zhi = pillar[1];
    const pillarStr = pillar.join('');
    
    let story = `${who}柱 ${pillarStr}，納音${nayin}（五行${elStatus}）。`;
    
    // 添加十神描述
    if (tenGod) {
        story += `十神為${tenGod}，`;
        switch(tenGod) {
            case "比肩": case "劫財": story += "主個性獨立，有領導才能；"; break;
            case "食神": case "傷官": story += "富創造力與表達能力；"; break;
            case "偏財": case "正財": story += "具理財頭腦，重視物質；"; break;
            case "七殺": case "正官": story += "有權威感，適合管理職；"; break;
            case "偏印": case "正印": story += "學習能力強，重視精神修養；"; break;
        }
    }
    
    // 添加神煞影響
    Object.entries(relatedCats).forEach(([cat, items]) => {
        if (items.length > 0) {
            switch(cat) {
                case "貴人": story += `得${cat}${items.map(x => x.name).join('、')}助力，人際關係佳；`; break;
                case "吉星": story += `有${items.map(x => x.name).join('、')}護佑，運勢順遂；`; break;
                case "桃花": story += `帶${items.map(x => x.name).join('、')}，人緣魅力強；`; break;
                case "動星": story += `逢${items.map(x => x.name).join('、')}，喜動不喜靜；`; break;
                case "陰煞": story += `遇${items.map(x => x.name).join('、')}，宜謹慎行事；`; break;
                case "刑煞": story += `帶${items.map(x => x.name).join('、')}，需化解沖突；`; break;
            }
        }
    });
    
    // 添加軍團特色描述
    switch(who) {
        case "年":
            story += `此為家族軍團，影響${name}的根基與傳承，塑造人生價值觀與起點。`;
            break;
        case "月":
            story += `此為成長軍團，主導${name}的學習發展與青年時期的機遇挑戰。`;
            break;
        case "日":
            story += `此為本我軍團，代表${name}的核心個性與主要人生態度。`;
            break;
        case "時":
            story += `此為未來軍團，指引${name}的發展方向與晚年運勢。`;
            break;
    }
    
    return story;
}