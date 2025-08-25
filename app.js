/**
 * 虹靈御所八字人生兵法 - 完整整合版主程序
 * 整合新的計算系統和豐富功能
 */

// 全局變數
let currentBaziResult = null;
let wuxingChart = null;
let yinyangChart = null;

// 天干地支角色映射
const tianGanRoles = {
    "甲": { name: "森林將軍", icon: "🌲", element: "木", trait: "堅毅規劃者" },
    "乙": { name: "花草軍師", icon: "🌸", element: "木", trait: "柔韌適應者" },
    "丙": { name: "烈火戰神", icon: "🔥", element: "火", trait: "熱情領航者" },
    "丁": { name: "燭光智者", icon: "🕯️", element: "火", trait: "溫暖啟蒙者" },
    "戊": { name: "大地守護", icon: "🏔️", element: "土", trait: "穩重支柱" },
    "己": { name: "沃土培育", icon: "🌱", element: "土", trait: "務實培育者" },
    "庚": { name: "鋼鐵戰士", icon: "⚔️", element: "金", trait: "果斷戰士" },
    "辛": { name: "珠寶鑑賞", icon: "💎", element: "金", trait: "優雅鑑賞者" },
    "壬": { name: "江河探險", icon: "🌊", element: "水", trait: "靈活探索者" },
    "癸": { name: "甘露療癒", icon: "💧", element: "水", trait: "溫柔療癒者" }
};

const diZhiRoles = {
    "子": { name: "機智鼠", icon: "🐭", element: "水", trait: "機智靈活" },
    "丑": { name: "勤勞牛", icon: "🐂", element: "土", trait: "勤勞踏實" },
    "寅": { name: "勇猛虎", icon: "🐅", element: "木", trait: "勇猛果敢" },
    "卯": { name: "溫和兔", icon: "🐰", element: "木", trait: "溫和謹慎" },
    "辰": { name: "神龍", icon: "🐲", element: "土", trait: "變化多端" },
    "巳": { name: "智慧蛇", icon: "🐍", element: "火", trait: "智慧深沉" },
    "午": { name: "奔騰馬", icon: "🐎", element: "火", trait: "熱情奔放" },
    "未": { name: "溫順羊", icon: "🐑", element: "土", trait: "溫順善良" },
    "申": { name: "聰明猴", icon: "🐒", element: "金", trait: "聰明活潑" },
    "酉": { name: "精明雞", icon: "🐓", element: "金", trait: "精明能幹" },
    "戌": { name: "忠誠狗", icon: "🐕", element: "土", trait: "忠誠可靠" },
    "亥": { name: "純真豬", icon: "🐷", element: "水", trait: "純真善良" }
};

// 軍團故事模板
const legionStoryTemplates = {
    family: {
        title: "家族軍團傳承故事",
        template: "在{name}的家族軍團中，{commander}擔任主將，以{commanderTrait}的特質領導著整個軍團。軍師{advisor}以{advisorTrait}的智慧輔佐，共同守護著家族的傳承與榮耀。這個軍團代表著您的根基與傳統，影響著您的價值觀和人生方向。"
    },
    growth: {
        title: "成長軍團發展故事", 
        template: "在{name}的成長軍團中，{commander}作為主將，憑藉{commanderTrait}的能力引領成長之路。軍師{advisor}運用{advisorTrait}的特質提供策略指導，幫助您在人生的各個階段不斷進步。這個軍團象徵著您的學習能力和適應變化的天賦。"
    },
    self: {
        title: "本我軍團核心故事",
        template: "在{name}的本我軍團中，{commander}是您內心的主將，體現了{commanderTrait}的核心特質。軍師{advisor}以{advisorTrait}的智慧指引內心的聲音，這是您最真實的自我表達。這個軍團代表著您的本質和核心競爭力。"
    },
    future: {
        title: "未來軍團潛能故事",
        template: "在{name}的未來軍團中，{commander}作為主將，蘊含著{commanderTrait}的無限潛能。軍師{advisor}以{advisorTrait}的遠見規劃未來藍圖，這個軍團代表著您的發展方向和人生目標，指引著您走向更美好的明天。"
    }
};

// 知識庫內容
const knowledgeBase = {
    tiangan: {
        title: "十天干詳解",
        content: `
        <div class="knowledge-content">
            <h4>十天干基本概念</h4>
            <p>天干是中國古代用來記錄時間的符號系統，共有十個：甲、乙、丙、丁、戊、己、庚、辛、壬、癸。</p>
            
            <h4>天干五行屬性</h4>
            <div class="tiangan-grid">
                <div class="tiangan-item">
                    <span class="gan">甲</span><span class="element wood">木</span><span class="yinyang yang">陽</span>
                    <div class="description">森林將軍 - 堅毅規劃者，具有強大的生命力和領導能力</div>
                </div>
                <div class="tiangan-item">
                    <span class="gan">乙</span><span class="element wood">木</span><span class="yinyang yin">陰</span>
                    <div class="description">花草軍師 - 柔韌適應者，善於協調和美化環境</div>
                </div>
                <div class="tiangan-item">
                    <span class="gan">丙</span><span class="element fire">火</span><span class="yinyang yang">陽</span>
                    <div class="description">烈火戰神 - 熱情領航者，具有強烈的表達欲和影響力</div>
                </div>
                <div class="tiangan-item">
                    <span class="gan">丁</span><span class="element fire">火</span><span class="yinyang yin">陰</span>
                    <div class="description">燭光智者 - 溫暖啟蒙者，善於啟發和溫暖他人</div>
                </div>
                <div class="tiangan-item">
                    <span class="gan">戊</span><span class="element earth">土</span><span class="yinyang yang">陽</span>
                    <div class="description">大地守護 - 穩重支柱，具有強大的承載和穩定能力</div>
                </div>
                <div class="tiangan-item">
                    <span class="gan">己</span><span class="element earth">土</span><span class="yinyang yin">陰</span>
                    <div class="description">沃土培育 - 務實培育者，善於照顧和培養他人</div>
                </div>
                <div class="tiangan-item">
                    <span class="gan">庚</span><span class="element metal">金</span><span class="yinyang yang">陽</span>
                    <div class="description">鋼鐵戰士 - 果斷戰士，具有強烈的行動力和決斷力</div>
                </div>
                <div class="tiangan-item">
                    <span class="gan">辛</span><span class="element metal">金</span><span class="yinyang yin">陰</span>
                    <div class="description">珠寶鑑賞 - 優雅鑑賞者，追求精緻和品質</div>
                </div>
                <div class="tiangan-item">
                    <span class="gan">壬</span><span class="element water">水</span><span class="yinyang yang">陽</span>
                    <div class="description">江河探險 - 靈活探索者，具有強烈的好奇心和適應力</div>
                </div>
                <div class="tiangan-item">
                    <span class="gan">癸</span><span class="element water">水</span><span class="yinyang yin">陰</span>
                    <div class="description">甘露療癒 - 溫柔療癒者，善於滋潤和療癒他人</div>
                </div>
            </div>
        </div>
        `
    },
    dizhi: {
        title: "十二地支詳解",
        content: `
        <div class="knowledge-content">
            <h4>十二地支基本概念</h4>
            <p>地支是中國古代用來記錄時間的符號系統，共有十二個：子、丑、寅、卯、辰、巳、午、未、申、酉、戌、亥。</p>
            
            <h4>地支生肖對應</h4>
            <div class="dizhi-grid">
                ${Object.entries(diZhiRoles).map(([zhi, info]) => `
                    <div class="dizhi-item">
                        <span class="zhi">${zhi}</span>
                        <span class="zodiac">${info.icon}</span>
                        <span class="element ${info.element}">${info.element}</span>
                        <div class="description">${info.name} - ${info.trait}</div>
                    </div>
                `).join('')}
            </div>
        </div>
        `
    },
    wuxing: {
        title: "五行理論詳解",
        content: `
        <div class="knowledge-content">
            <h4>五行基本概念</h4>
            <p>五行是中國古代哲學的重要概念，包括木、火、土、金、水五種基本元素，它們之間存在相生相剋的關係。</p>
            
            <h4>五行相生關係</h4>
            <div class="wuxing-cycle">
                <div class="cycle-item">木生火 🌲→🔥</div>
                <div class="cycle-item">火生土 🔥→🏔️</div>
                <div class="cycle-item">土生金 🏔️→⚔️</div>
                <div class="cycle-item">金生水 ⚔️→🌊</div>
                <div class="cycle-item">水生木 🌊→🌲</div>
            </div>
            
            <h4>五行相剋關係</h4>
            <div class="wuxing-cycle">
                <div class="cycle-item">木剋土 🌲⚡🏔️</div>
                <div class="cycle-item">土剋水 🏔️⚡🌊</div>
                <div class="cycle-item">水剋火 🌊⚡🔥</div>
                <div class="cycle-item">火剋金 🔥⚡⚔️</div>
                <div class="cycle-item">金剋木 ⚔️⚡🌲</div>
            </div>
        </div>
        `
    },
    shishen: {
        title: "十神關係詳解",
        content: `
        <div class="knowledge-content">
            <h4>十神基本概念</h4>
            <p>十神是八字命理中重要的概念，表示日干與其他天干之間的關係，分為：比肩、劫財、食神、傷官、偏財、正財、七殺、正官、偏印、正印。</p>
            
            <h4>十神分類</h4>
            <div class="shishen-categories">
                <div class="category">
                    <h5>生我類（印綬系統）</h5>
                    <div class="shishen-item">
                        <strong>正印</strong> - 母親能量，正統學習，保護資源
                    </div>
                    <div class="shishen-item">
                        <strong>偏印</strong> - 繼母能量，非正統學習，偏門技能
                    </div>
                </div>
                
                <div class="category">
                    <h5>克我類（官殺系統）</h5>
                    <div class="shishen-item">
                        <strong>正官</strong> - 丈夫能量，正當約束，社會規範
                    </div>
                    <div class="shishen-item">
                        <strong>七殺</strong> - 小人能量，強力約束，外部壓力
                    </div>
                </div>
                
                <div class="category">
                    <h5>我生類（食傷系統）</h5>
                    <div class="shishen-item">
                        <strong>食神</strong> - 兒子能量，創造享受，才華輸出
                    </div>
                    <div class="shishen-item">
                        <strong>傷官</strong> - 女兒能量，表達才華，叛逆創新
                    </div>
                </div>
                
                <div class="category">
                    <h5>我克類（財星系統）</h5>
                    <div class="shishen-item">
                        <strong>正財</strong> - 妻子能量，正當收入，穩定財源
                    </div>
                    <div class="shishen-item">
                        <strong>偏財</strong> - 情人能量，偏門收入，機會財富
                    </div>
                </div>
                
                <div class="category">
                    <h5>同我類（比劫系統）</h5>
                    <div class="shishen-item">
                        <strong>比肩</strong> - 兄弟能量，平等夥伴，同性朋友
                    </div>
                    <div class="shishen-item">
                        <strong>劫財</strong> - 競爭者能量，搶奪資源，異性朋友
                    </div>
                </div>
            </div>
        </div>
        `
    },
    nayin: {
        title: "納音五行詳解",
        content: `
        <div class="knowledge-content">
            <h4>納音五行基本概念</h4>
            <p>納音五行是將六十甲子配以五行，每兩個干支為一組，共三十組納音。它是對天干地支組合的進一步詮釋。</p>
            
            <h4>納音五行表（部分）</h4>
            <div class="nayin-table">
                <div class="nayin-group">
                    <div class="nayin-pair">甲子、乙丑</div>
                    <div class="nayin-element">海中金</div>
                </div>
                <div class="nayin-group">
                    <div class="nayin-pair">丙寅、丁卯</div>
                    <div class="nayin-element">爐中火</div>
                </div>
                <div class="nayin-group">
                    <div class="nayin-pair">戊辰、己巳</div>
                    <div class="nayin-element">大林木</div>
                </div>
                <div class="nayin-group">
                    <div class="nayin-pair">庚午、辛未</div>
                    <div class="nayin-element">路旁土</div>
                </div>
                <div class="nayin-group">
                    <div class="nayin-pair">壬申、癸酉</div>
                    <div class="nayin-element">劍鋒金</div>
                </div>
            </div>
        </div>
        `
    },
    shensha: {
        title: "神煞系統詳解",
        content: `
        <div class="knowledge-content">
            <h4>神煞基本概念</h4>
            <p>神煞是八字命理中的特殊星煞，分為吉神和凶煞，對命運有特殊的影響作用。</p>
            
            <h4>主要吉神</h4>
            <div class="shensha-list">
                <div class="shensha-item good">
                    <strong>天乙貴人</strong> - 逢凶化吉，貴人扶持
                </div>
                <div class="shensha-item good">
                    <strong>文昌貴人</strong> - 聰明好學，文采出眾
                </div>
                <div class="shensha-item good">
                    <strong>天德貴人</strong> - 德行高尚，福澤深厚
                </div>
                <div class="shensha-item good">
                    <strong>月德貴人</strong> - 品德優良，受人敬重
                </div>
            </div>
            
            <h4>主要凶煞</h4>
            <div class="shensha-list">
                <div class="shensha-item bad">
                    <strong>羊刃</strong> - 性格剛烈，容易衝動
                </div>
                <div class="shensha-item bad">
                    <strong>桃花</strong> - 感情豐富，異性緣佳
                </div>
                <div class="shensha-item bad">
                    <strong>華蓋</strong> - 孤高清雅，宗教緣分
                </div>
                <div class="shensha-item bad">
                    <strong>孤辰寡宿</strong> - 性格孤僻，婚姻不順
                </div>
            </div>
        </div>
        `
    }
};

// DOM 載入完成後初始化
document.addEventListener('DOMContentLoaded', async function() {
    console.log('🌟 虹靈御所八字人生兵法 - 完整整合版啟動');
    
    // 顯示載入狀態
    showLoadingStatus('正在載入節氣資料庫...');
    
    // 載入節氣資料庫
    const loaded = await window.baziCalculator.loadSolarTermsDatabase();
    if (loaded) {
        hideLoadingStatus();
        console.log('✅ 節氣資料庫載入成功');
    } else {
        hideLoadingStatus();
        console.warn('⚠️ 節氣資料庫載入失敗，將使用備用計算方法');
    }
    
    // 初始化事件監聽器
    initializeEventListeners();
    
    // 初始化標籤切換
    initializeTabSwitching();
    
    // 初始化百科功能
    initializeEncyclopedia();
});

// 顯示載入狀態
function showLoadingStatus(message) {
    const loadingStatus = document.getElementById('loadingStatus');
    const loadingText = loadingStatus.querySelector('.loading-text');
    loadingText.textContent = message;
    loadingStatus.classList.remove('hidden');
}

// 隱藏載入狀態
function hideLoadingStatus() {
    const loadingStatus = document.getElementById('loadingStatus');
    loadingStatus.classList.add('hidden');
}

// 初始化事件監聽器
function initializeEventListeners() {
    // 表單提交事件
    const birthForm = document.getElementById('birthForm');
    birthForm.addEventListener('submit', handleFormSubmit);
}

// 處理表單提交
async function handleFormSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const userData = {
        name: formData.get('userName'),
        gender: formData.get('gender'),
        birthDate: formData.get('birthDate'),
        birthTime: formData.get('birthTime'),
        birthLocation: formData.get('birthLocation')
    };
    
    // 驗證資料
    if (!validateUserData(userData)) {
        return;
    }
    
    try {
        showLoadingStatus('正在計算八字...');
        
        // 計算八字
        console.log('開始計算八字...');
        currentBaziResult = window.baziCalculator.calculateBazi(userData.birthDate, userData.birthTime);
        currentBaziResult.userData = userData;
        console.log('八字計算完成:', currentBaziResult);
        
        // 延遲一下確保載入動畫顯示
        setTimeout(() => {
            try {
                hideLoadingStatus();
                console.log('載入狀態已隱藏');
                
                // 顯示結果
                displayBaziResult(currentBaziResult);
                console.log('八字結果已顯示');
                
                displayMilitaryAnalysis(currentBaziResult);
                console.log('軍團分析已顯示');
                
                displayDetailedAnalysis(currentBaziResult);
                console.log('詳細分析已顯示');
                
                // 自動切換到傳統排盤標籤
                switchTab('traditional');
                console.log('已切換到傳統排盤標籤');
                
                console.log('✅ 八字計算完成', currentBaziResult);
                
            } catch (displayError) {
                console.error('❌ 顯示結果時發生錯誤:', displayError);
                hideLoadingStatus();
                alert('顯示結果時發生錯誤: ' + displayError.message);
            }
        }, 1000);
        
    } catch (error) {
        hideLoadingStatus();
        console.error('❌ 八字計算失敗:', error);
        alert('計算失敗，請檢查輸入資料: ' + error.message);
    }
}

// 驗證用戶資料
function validateUserData(userData) {
    if (!userData.name.trim()) {
        alert('請輸入姓名');
        return false;
    }
    
    if (!userData.gender) {
        alert('請選擇性別');
        return false;
    }
    
    if (!userData.birthDate) {
        alert('請選擇出生日期');
        return false;
    }
    
    if (!userData.birthTime) {
        alert('請選擇出生時間');
        return false;
    }
    
    if (!userData.birthLocation.trim()) {
        alert('請輸入出生地點');
        return false;
    }
    
    return true;
}

// 顯示八字結果
function displayBaziResult(baziResult) {
    // 顯示基本資訊
    document.getElementById('displayName').textContent = baziResult.userData.name;
    document.getElementById('displayGender').textContent = baziResult.userData.gender;
    document.getElementById('displayDate').textContent = baziResult.userData.birthDate;
    document.getElementById('displayTime').textContent = baziResult.userData.birthTime;
    
    // 顯示四柱八字
    document.getElementById('yearGan').textContent = baziResult.year.gan;
    document.getElementById('yearZhi').textContent = baziResult.year.zhi;
    document.getElementById('yearShishen').textContent = baziResult.shishen.year;
    document.getElementById('yearNayin').textContent = baziResult.year.nayin;
    
    document.getElementById('monthGan').textContent = baziResult.month.gan;
    document.getElementById('monthZhi').textContent = baziResult.month.zhi;
    document.getElementById('monthShishen').textContent = baziResult.shishen.month;
    document.getElementById('monthNayin').textContent = baziResult.month.nayin;
    
    document.getElementById('dayGan').textContent = baziResult.day.gan;
    document.getElementById('dayZhi').textContent = baziResult.day.zhi;
    document.getElementById('dayShishen').textContent = baziResult.shishen.day;
    document.getElementById('dayNayin').textContent = baziResult.day.nayin;
    
    document.getElementById('hourGan').textContent = baziResult.hour.gan;
    document.getElementById('hourZhi').textContent = baziResult.hour.zhi;
    document.getElementById('hourShishen').textContent = baziResult.shishen.hour;
    document.getElementById('hourNayin').textContent = baziResult.hour.nayin;
    
    // 顯示藏干
    displayCanggan(baziResult.canggan);
    
    // 顯示相關區域
    document.getElementById('basicInfo').classList.remove('hidden');
    document.getElementById('baziTable').classList.remove('hidden');
    document.getElementById('cangganDetails').classList.remove('hidden');
    
    // 隱藏佔位符
    document.getElementById('baziResult').querySelector('.result-placeholder').style.display = 'none';
}

// 顯示藏干
function displayCanggan(canggan) {
    const positions = ['year', 'month', 'day', 'hour'];
    
    positions.forEach(position => {
        const container = document.getElementById(`${position}Canggan`);
        const cangganData = canggan[position];
        
        container.innerHTML = cangganData.map(item => 
            `<div class="canggan-item">
                <span class="canggan-gan">${item.gan}</span>
                <span class="canggan-shishen">${item.shishen}</span>
            </div>`
        ).join('');
    });
}

// 顯示軍團分析
function displayMilitaryAnalysis(baziResult) {
    const legions = [
        { id: 'family', pillar: baziResult.year, type: 'family' },
        { id: 'growth', pillar: baziResult.month, type: 'growth' },
        { id: 'self', pillar: baziResult.day, type: 'self' },
        { id: 'future', pillar: baziResult.hour, type: 'future' }
    ];
    
    legions.forEach(legion => {
        const commander = tianGanRoles[legion.pillar.gan];
        const advisor = diZhiRoles[legion.pillar.zhi];
        
        // 設置主將和軍師
        document.getElementById(`${legion.id}Commander`).textContent = commander.name;
        document.getElementById(`${legion.id}Advisor`).textContent = advisor.name;
        
        // 生成軍團故事
        const story = generateLegionStory(legion.type, baziResult.userData.name, commander, advisor);
        document.getElementById(`${legion.id}Story`).textContent = story;
        
        // 生成建議
        const advice = generateLegionAdvice(legion.type, commander, advisor);
        document.getElementById(`${legion.id}Advice`).textContent = advice;
    });
    
    // 顯示軍團卡片
    document.getElementById('militaryCards').classList.remove('hidden');
    
    // 隱藏佔位符
    document.getElementById('militaryStory').querySelector('.result-placeholder').style.display = 'none';
}

// 生成軍團故事
function generateLegionStory(type, name, commander, advisor) {
    const template = legionStoryTemplates[type];
    return template.template
        .replace('{name}', name)
        .replace('{commander}', commander.name)
        .replace('{commanderTrait}', commander.trait)
        .replace('{advisor}', advisor.name)
        .replace('{advisorTrait}', advisor.trait);
}

// 生成軍團建議
function generateLegionAdvice(type, commander, advisor) {
    const adviceTemplates = {
        family: `發揮${commander.trait}的優勢，結合${advisor.trait}的智慧，珍惜家族傳承，建立穩固根基。`,
        growth: `運用${commander.trait}的能力，配合${advisor.trait}的特質，持續學習成長，適應環境變化。`,
        self: `展現${commander.trait}的本質，融合${advisor.trait}的內在力量，保持真實自我，發揮核心優勢。`,
        future: `發展${commander.trait}的潛能，結合${advisor.trait}的遠見，規劃未來目標，實現人生理想。`
    };
    
    return adviceTemplates[type];
}

// 顯示詳細分析
function displayDetailedAnalysis(baziResult) {
    // 分析五行平衡
    const wuxingBalance = window.baziCalculator.analyzeWuxingBalance(baziResult);
    displayWuxingChart(wuxingBalance);
    
    // 分析陰陽平衡
    const yinyangBalance = window.baziCalculator.analyzeYinyangBalance(baziResult);
    displayYinyangChart(yinyangBalance);
    
    // 顯示分析區域
    document.getElementById('wuxingAnalysis').classList.remove('hidden');
    document.getElementById('yinyangAnalysis').classList.remove('hidden');
    
    // 隱藏佔位符
    document.getElementById('detailedAnalysis').querySelector('.result-placeholder').style.display = 'none';
}

// 顯示五行圖表
function displayWuxingChart(wuxingBalance) {
    const ctx = document.getElementById('wuxingChart').getContext('2d');
    
    if (wuxingChart) {
        wuxingChart.destroy();
    }
    
    wuxingChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['木', '火', '土', '金', '水'],
            datasets: [{
                label: '五行分布',
                data: [
                    wuxingBalance.木,
                    wuxingBalance.火,
                    wuxingBalance.土,
                    wuxingBalance.金,
                    wuxingBalance.水
                ],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(54, 162, 235, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(54, 162, 235, 1)'
            }]
        },
        options: {
            responsive: true,
            scales: {
                r: {
                    beginAtZero: true,
                    max: Math.max(...Object.values(wuxingBalance)) + 1
                }
            }
        }
    });
    
    // 顯示五行詳情
    const wuxingDetails = document.getElementById('wuxingDetails');
    wuxingDetails.innerHTML = `
        <div class="wuxing-summary">
            <h4>五行分析結果</h4>
            <div class="wuxing-items">
                ${Object.entries(wuxingBalance).map(([element, count]) => 
                    `<div class="wuxing-item">
                        <span class="element-name">${element}</span>
                        <span class="element-count">${count}</span>
                        <div class="element-bar">
                            <div class="element-fill" style="width: ${(count / Math.max(...Object.values(wuxingBalance))) * 100}%"></div>
                        </div>
                    </div>`
                ).join('')}
            </div>
        </div>
    `;
}

// 顯示陰陽圖表
function displayYinyangChart(yinyangBalance) {
    const ctx = document.getElementById('yinyangChart').getContext('2d');
    
    if (yinyangChart) {
        yinyangChart.destroy();
    }
    
    yinyangChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['陽', '陰'],
            datasets: [{
                data: [yinyangBalance.陽, yinyangBalance.陰],
                backgroundColor: [
                    'rgba(255, 206, 84, 0.8)',
                    'rgba(75, 192, 192, 0.8)'
                ],
                borderColor: [
                    'rgba(255, 206, 84, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
    
    // 顯示陰陽詳情
    const yinyangDetails = document.getElementById('yinyangDetails');
    const total = yinyangBalance.陽 + yinyangBalance.陰;
    yinyangDetails.innerHTML = `
        <div class="yinyang-summary">
            <h4>陰陽平衡分析</h4>
            <div class="yinyang-items">
                <div class="yinyang-item">
                    <span class="yinyang-name">陽性能量</span>
                    <span class="yinyang-count">${yinyangBalance.陽}</span>
                    <span class="yinyang-percent">${((yinyangBalance.陽 / total) * 100).toFixed(1)}%</span>
                </div>
                <div class="yinyang-item">
                    <span class="yinyang-name">陰性能量</span>
                    <span class="yinyang-count">${yinyangBalance.陰}</span>
                    <span class="yinyang-percent">${((yinyangBalance.陰 / total) * 100).toFixed(1)}%</span>
                </div>
            </div>
            <div class="balance-interpretation">
                ${getYinyangInterpretation(yinyangBalance)}
            </div>
        </div>
    `;
}

// 獲取陰陽平衡解釋
function getYinyangInterpretation(yinyangBalance) {
    const yangRatio = yinyangBalance.陽 / (yinyangBalance.陽 + yinyangBalance.陰);
    
    if (yangRatio > 0.7) {
        return "陽性能量較強，性格偏向主動、外向、積極進取，但需注意平衡內在的陰性能量。";
    } else if (yangRatio < 0.3) {
        return "陰性能量較強，性格偏向內斂、溫和、深思熟慮，但需要適度展現陽性的積極面。";
    } else {
        return "陰陽能量相對平衡，具有良好的內外兼修特質，能夠靈活應對各種情況。";
    }
}

// 初始化標籤切換
function initializeTabSwitching() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.dataset.tab;
            switchTab(targetTab);
        });
    });
}

// 切換標籤
function switchTab(targetTab) {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    // 移除所有活動狀態
    tabBtns.forEach(btn => btn.classList.remove('active'));
    tabPanels.forEach(panel => panel.classList.remove('active'));
    
    // 添加目標標籤的活動狀態
    const targetBtn = document.querySelector(`[data-tab="${targetTab}"]`);
    const targetPanel = document.getElementById(targetTab);
    
    if (targetBtn && targetPanel) {
        targetBtn.classList.add('active');
        targetPanel.classList.add('active');
    }
}

// 初始化百科功能
function initializeEncyclopedia() {
    // 知識分類卡片點擊事件
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.dataset.category;
            showKnowledgeDetails(category);
        });
    });
    
    // 搜尋功能
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('encyclopediaSearch');
    
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // 關閉詳情按鈕
    const closeDetailsBtn = document.getElementById('closeDetails');
    closeDetailsBtn.addEventListener('click', hideKnowledgeDetails);
}

// 顯示知識詳情
function showKnowledgeDetails(category) {
    const knowledge = knowledgeBase[category];
    if (!knowledge) return;
    
    const detailsTitle = document.getElementById('detailsTitle');
    const detailsContent = document.getElementById('detailsContent');
    const knowledgeDetails = document.getElementById('knowledgeDetails');
    
    detailsTitle.textContent = knowledge.title;
    detailsContent.innerHTML = knowledge.content;
    knowledgeDetails.classList.remove('hidden');
}

// 隱藏知識詳情
function hideKnowledgeDetails() {
    const knowledgeDetails = document.getElementById('knowledgeDetails');
    knowledgeDetails.classList.add('hidden');
}

// 執行搜尋
function performSearch() {
    const searchInput = document.getElementById('encyclopediaSearch');
    const searchTerm = searchInput.value.trim().toLowerCase();
    
    if (!searchTerm) {
        alert('請輸入搜尋關鍵字');
        return;
    }
    
    // 簡單的搜尋實現
    let foundCategory = null;
    for (const [category, knowledge] of Object.entries(knowledgeBase)) {
        if (knowledge.title.toLowerCase().includes(searchTerm) || 
            knowledge.content.toLowerCase().includes(searchTerm)) {
            foundCategory = category;
            break;
        }
    }
    
    if (foundCategory) {
        showKnowledgeDetails(foundCategory);
    } else {
        alert('未找到相關內容');
    }
}

// 工具函數：格式化日期
function formatDate(date) {
    return date.toLocaleDateString('zh-TW', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
}

// 工具函數：格式化時間
function formatTime(date) {
    return date.toLocaleTimeString('zh-TW', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
}

console.log('✅ 虹靈御所八字人生兵法 - 完整整合版載入完成');

