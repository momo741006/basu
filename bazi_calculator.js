/**
 * 虹靈御所八字計算系統 - 瀏覽器版（修正版）
 * 使用精確節氣資料庫和修正的日柱基準點
 */

class BaziCalculatorCorrected {
    constructor() {
        // 天干地支
        this.gans = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
        this.zhis = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
        
        // 五鼠遁時表 (日干配時干)
        this.wushuDun = {
            "甲": "甲", "己": "甲",  // 甲己日起甲子時
            "乙": "丙", "庚": "丙",  // 乙庚日起丙子時
            "丙": "戊", "辛": "戊",  // 丙辛日起戊子時
            "丁": "庚", "壬": "庚",  // 丁壬日起庚子時
            "戊": "壬", "癸": "壬"   // 戊癸日起壬子時
        };
        
        // 五虎遁月表 (年干配月干)
        this.wuhuDun = {
            "甲": "丙", "己": "丙",  // 甲己年起丙寅月
            "乙": "戊", "庚": "戊",  // 乙庚年起戊寅月
            "丙": "庚", "辛": "庚",  // 丙辛年起庚寅月
            "丁": "壬", "壬": "壬",  // 丁壬年起壬寅月
            "戊": "甲", "癸": "甲"   // 戊癸年起甲寅月
        };

        // 納音五行表
        this.nayin = {
            "甲子": "海中金", "乙丑": "海中金",
            "丙寅": "爐中火", "丁卯": "爐中火",
            "戊辰": "大林木", "己巳": "大林木",
            "庚午": "路旁土", "辛未": "路旁土",
            "壬申": "劍鋒金", "癸酉": "劍鋒金",
            "甲戌": "山頭火", "乙亥": "山頭火",
            "丙子": "澗下水", "丁丑": "澗下水",
            "戊寅": "城頭土", "己卯": "城頭土",
            "庚辰": "白蠟金", "辛巳": "白蠟金",
            "壬午": "楊柳木", "癸未": "楊柳木",
            "甲申": "泉中水", "乙酉": "泉中水",
            "丙戌": "屋上土", "丁亥": "屋上土",
            "戊子": "霹靂火", "己丑": "霹靂火",
            "庚寅": "松柏木", "辛卯": "松柏木",
            "壬辰": "長流水", "癸巳": "長流水",
            "甲午": "砂中金", "乙未": "砂中金",
            "丙申": "山下火", "丁酉": "山下火",
            "戊戌": "平地木", "己亥": "平地木",
            "庚子": "壁上土", "辛丑": "壁上土",
            "壬寅": "金箔金", "癸卯": "金箔金",
            "甲辰": "覆燈火", "乙巳": "覆燈火",
            "丙午": "天河水", "丁未": "天河水",
            "戊申": "大驛土", "己酉": "大驛土",
            "庚戌": "釵釧金", "辛亥": "釵釧金",
            "壬子": "桑柘木", "癸丑": "桑柘木",
            "甲寅": "大溪水", "乙卯": "大溪水",
            "丙辰": "砂中土", "丁巳": "砂中土",
            "戊午": "天上火", "己未": "天上火",
            "庚申": "石榴木", "辛酉": "石榴木",
            "壬戌": "大海水", "癸亥": "大海水"
        };

        // 十神關係表
        this.shishen = {
            "甲": {"甲": "比肩", "乙": "劫財", "丙": "食神", "丁": "傷官", "戊": "偏財", "己": "正財", "庚": "七殺", "辛": "正官", "壬": "偏印", "癸": "正印"},
            "乙": {"甲": "劫財", "乙": "比肩", "丙": "傷官", "丁": "食神", "戊": "正財", "己": "偏財", "庚": "正官", "辛": "七殺", "壬": "正印", "癸": "偏印"},
            "丙": {"甲": "偏印", "乙": "正印", "丙": "比肩", "丁": "劫財", "戊": "食神", "己": "傷官", "庚": "偏財", "辛": "正財", "壬": "七殺", "癸": "正官"},
            "丁": {"甲": "正印", "乙": "偏印", "丙": "劫財", "丁": "比肩", "戊": "傷官", "己": "食神", "庚": "正財", "辛": "偏財", "壬": "正官", "癸": "七殺"},
            "戊": {"甲": "七殺", "乙": "正官", "丙": "偏印", "丁": "正印", "戊": "比肩", "己": "劫財", "庚": "食神", "辛": "傷官", "壬": "偏財", "癸": "正財"},
            "己": {"甲": "正官", "乙": "七殺", "丙": "正印", "丁": "偏印", "戊": "劫財", "己": "比肩", "庚": "傷官", "辛": "食神", "壬": "正財", "癸": "偏財"},
            "庚": {"甲": "偏財", "乙": "正財", "丙": "七殺", "丁": "正官", "戊": "偏印", "己": "正印", "庚": "比肩", "辛": "劫財", "壬": "食神", "癸": "傷官"},
            "辛": {"甲": "正財", "乙": "偏財", "丙": "正官", "丁": "七殺", "戊": "正印", "己": "偏印", "庚": "劫財", "辛": "比肩", "壬": "傷官", "癸": "食神"},
            "壬": {"甲": "食神", "乙": "傷官", "丙": "偏財", "丁": "正財", "戊": "七殺", "己": "正官", "庚": "偏印", "辛": "正印", "壬": "比肩", "癸": "劫財"},
            "癸": {"甲": "傷官", "乙": "食神", "丙": "正財", "丁": "偏財", "戊": "正官", "己": "七殺", "庚": "正印", "辛": "偏印", "壬": "劫財", "癸": "比肩"}
        };

        // 節氣資料庫
        this.solarTermsDatabase = null;
    }

    /**
     * 載入節氣資料庫 - 瀏覽器版（修復）
     */
    async loadSolarTermsDatabase() {
        try {
            const response = await fetch('./complete_solar_terms_1850_2100.json');
            const data = await response.json();
            this.solarTermsDatabase = data.solar_terms;
            
            console.log('✅ 節氣資料庫載入成功');
            return true;
        } catch (error) {
            console.error('❌ 載入節氣資料庫失敗:', error.message);
            return false;
        }
    }

    /**
     * 計算年柱 - 以立春為界
     */
    calculateYearPillar(date) {
        let year = date.getFullYear();
        
        // 查詢該年立春日期
        if (this.solarTermsDatabase && this.solarTermsDatabase[year]) {
            const lichun = this.solarTermsDatabase[year]['立春'];
            if (lichun) {
                const lichunDate = new Date(lichun.date);
                if (date < lichunDate) {
                    year = year - 1; // 立春前屬於前一年
                }
            }
        } else {
            // 備用邏輯：立春通常在2月4日前後
            const month = date.getMonth() + 1;
            const day = date.getDate();
            if (month < 2 || (month === 2 && day < 4)) {
                year = year - 1;
            }
        }
        
        // 計算天干地支（以甲子年為基準，公元4年為甲子年）
        const ganIndex = (year - 4) % 10;
        const zhiIndex = (year - 4) % 12;
        
        // 處理負數
        const finalGanIndex = ganIndex < 0 ? ganIndex + 10 : ganIndex;
        const finalZhiIndex = zhiIndex < 0 ? zhiIndex + 12 : zhiIndex;
        
        const gan = this.gans[finalGanIndex];
        const zhi = this.zhis[finalZhiIndex];
        
        return {
            gan: gan,
            zhi: zhi,
            ganZhi: gan + zhi,
            nayin: this.nayin[gan + zhi] || "未知",
            year: year
        };
    }

    /**
     * 計算月柱 - 使用精確節氣資料庫（修復版）
     */
    calculateMonthPillar(date, yearGan) {
        const year = date.getFullYear();
        
        let monthZhi = "寅"; // 默認正月
        
        // 使用節氣資料庫精確判斷月支
        if (this.solarTermsDatabase && this.solarTermsDatabase[year]) {
            const yearTerms = this.solarTermsDatabase[year];
            
            // 節氣與月支的對應關係
            const termToZhi = {
                "立春": "寅", "驚蟄": "卯", "清明": "辰", "立夏": "巳",
                "芒種": "午", "小暑": "未", "立秋": "申", "白露": "酉",
                "寒露": "戌", "立冬": "亥", "大雪": "子", "小寒": "丑"
            };
            
            // 按順序檢查節氣
            const termOrder = ["立春", "驚蟄", "清明", "立夏", "芒種", "小暑", 
                             "立秋", "白露", "寒露", "立冬", "大雪", "小寒"];
            
            // 找到當前日期所在的月份
            for (let i = 0; i < termOrder.length; i++) {
                const currentTerm = termOrder[i];
                const nextTerm = termOrder[(i + 1) % termOrder.length];
                
                const currentTermDate = new Date(yearTerms[currentTerm].date);
                let nextTermDate;
                
                if (nextTerm === "立春") {
                    // 下一年的立春
                    const nextYear = year + 1;
                    if (this.solarTermsDatabase[nextYear] && this.solarTermsDatabase[nextYear]["立春"]) {
                        nextTermDate = new Date(this.solarTermsDatabase[nextYear]["立春"].date);
                    } else {
                        nextTermDate = new Date(year + 1, 1, 4); // 備用
                    }
                } else {
                    nextTermDate = new Date(yearTerms[nextTerm].date);
                }
                
                if (date >= currentTermDate && date < nextTermDate) {
                    monthZhi = termToZhi[currentTerm];
                    break;
                }
            }
        }
        
        // 計算月干（五虎遁）
        const startGan = this.wuhuDun[yearGan];
        const startGanIndex = this.gans.indexOf(startGan);
        const zhiIndex = this.zhis.indexOf(monthZhi);
        const yinIndex = this.zhis.indexOf("寅"); // 寅月為起始
        
        const offset = (zhiIndex - yinIndex + 12) % 12;
        const monthGanIndex = (startGanIndex + offset) % 10;
        const monthGan = this.gans[monthGanIndex];
        
        return {
            gan: monthGan,
            zhi: monthZhi,
            ganZhi: monthGan + monthZhi,
            nayin: this.nayin[monthGan + monthZhi] || "未知"
        };
    }

    /**
     * 計算儒略日數
     */
    calculateJulianDay(year, month, day) {
        // 儒略日計算公式
        if (month <= 2) {
            year -= 1;
            month += 12;
        }
        
        const a = Math.floor(year / 100);
        const b = 2 - a + Math.floor(a / 4);
        
        const jd = Math.floor(365.25 * (year + 4716)) + 
                   Math.floor(30.6001 * (month + 1)) + 
                   day + b - 1524.5;
        
        return jd;
    }

    /**
     * 計算日柱 - 使用修正的甲子日基準點
     */
    calculateDayPillar(date) {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        
        // 計算儒略日數
        const jd = this.calculateJulianDay(year, month, day);
        
        // 使用修正的甲子日基準點（JD = 2445730.5）
        const baseJD = 2445730.5;
        const baseGanIndex = 0; // 甲
        const baseZhiIndex = 0; // 子
        
        // 計算天數差
        const daysDiff = Math.floor(jd - baseJD);
        
        // 計算天干地支索引
        let ganIndex = (baseGanIndex + daysDiff) % 10;
        let zhiIndex = (baseZhiIndex + daysDiff) % 12;
        
        // 處理負數
        if (ganIndex < 0) ganIndex += 10;
        if (zhiIndex < 0) zhiIndex += 12;
        
        const gan = this.gans[ganIndex];
        const zhi = this.zhis[zhiIndex];
        
        return {
            gan: gan,
            zhi: zhi,
            ganZhi: gan + zhi,
            nayin: this.nayin[gan + zhi] || "未知",
            julianDay: jd,
            daysDiff: daysDiff
        };
    }

    /**
     * 計算時柱 - 使用五鼠遁算法
     */
    calculateHourPillar(date, dayGan) {
        const hour = date.getHours();
        
        // 確定時支（每個時辰2小時）
        let hourZhi;
        if (hour >= 23 || hour < 1) hourZhi = "子";
        else if (hour >= 1 && hour < 3) hourZhi = "丑";
        else if (hour >= 3 && hour < 5) hourZhi = "寅";
        else if (hour >= 5 && hour < 7) hourZhi = "卯";
        else if (hour >= 7 && hour < 9) hourZhi = "辰";
        else if (hour >= 9 && hour < 11) hourZhi = "巳";
        else if (hour >= 11 && hour < 13) hourZhi = "午";
        else if (hour >= 13 && hour < 15) hourZhi = "未";
        else if (hour >= 15 && hour < 17) hourZhi = "申";
        else if (hour >= 17 && hour < 19) hourZhi = "酉";
        else if (hour >= 19 && hour < 21) hourZhi = "戌";
        else if (hour >= 21 && hour < 23) hourZhi = "亥";
        
        // 計算時干（五鼠遁）
        const startGan = this.wushuDun[dayGan];
        const startGanIndex = this.gans.indexOf(startGan);
        const zhiIndex = this.zhis.indexOf(hourZhi);
        const ziIndex = this.zhis.indexOf("子"); // 子時為起始
        
        const offset = (zhiIndex - ziIndex + 12) % 12;
        const hourGanIndex = (startGanIndex + offset) % 10;
        const hourGan = this.gans[hourGanIndex];
        
        return {
            gan: hourGan,
            zhi: hourZhi,
            ganZhi: hourGan + hourZhi,
            nayin: this.nayin[hourGan + hourZhi] || "未知",
            hour: hour
        };
    }

    /**
     * 計算完整八字
     */
    calculateBazi(birthDate, birthTime) {
        // 確保節氣資料庫已載入
        if (!this.solarTermsDatabase) {
            this.loadSolarTermsDatabase();
        }
        
        const dateTime = new Date(`${birthDate}T${birthTime}`);
        
        // 計算四柱
        const yearPillar = this.calculateYearPillar(dateTime);
        const monthPillar = this.calculateMonthPillar(dateTime, yearPillar.gan);
        const dayPillar = this.calculateDayPillar(dateTime);
        const hourPillar = this.calculateHourPillar(dateTime, dayPillar.gan);
        
        // 計算十神
        const dayGan = dayPillar.gan;
        const shishenResult = {
            year: this.shishen[dayGan][yearPillar.gan],
            month: this.shishen[dayGan][monthPillar.gan],
            day: this.shishen[dayGan][dayPillar.gan],
            hour: this.shishen[dayGan][hourPillar.gan]
        };
        
        return {
            year: yearPillar,
            month: monthPillar,
            day: dayPillar,
            hour: hourPillar,
            shishen: shishenResult,
            dayGan: dayGan
        };
    }
}

// 全局實例 - 瀏覽器版
window.baziCalculator = new BaziCalculatorCorrected();

