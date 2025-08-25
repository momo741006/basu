// Ba Zi Life Strategy Analysis System JavaScript

// Sample data from application_data_json
const sampleData = {
    legions: {
        family: {
            name: "家族兵團",
            pillar: "年柱",
            colors: ["#FFD700", "#2E8B57"],
            description: "承載家族血脈與祖先智慧"
        },
        growth: {
            name: "成長兵團",
            pillar: "月柱", 
            colors: ["#9ACD32", "#FFD700"],
            description: "代表成長歷程與學習能力"
        },
        self: {
            name: "本我兵團",
            pillar: "日柱",
            colors: ["#4169E1", "#8A2BE2"],
            description: "核心自我與內在本質"
        },
        future: {
            name: "未來兵團",
            pillar: "時柱",
            colors: ["#FF4500", "#DC143C"],
            description: "未來發展與潛在可能"
        }
    },
    heavenly_stems: ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"],
    earthly_branches: ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"],
    sample_bazi: {
        year: {stem: "甲", branch: "子"},
        month: {stem: "乙", branch: "丑"},
        day: {stem: "丙", branch: "寅"},
        hour: {stem: "丁", branch: "卯"}
    },
    sample_stories: {
        family: "家族兵團以甲木為主將，如同森林之王，承載著深厚的家族血脈。子水軍師善於謀略，為主將提供源源不斷的養分與智慧。此兵團代表著您與家族的深層連結，祖先的庇護如影隨形。",
        growth: "成長兵團由乙木統帥，如同春日嫩芽，充滿生機與可塑性。丑土軍師穩重踏實，為成長提供堅實基礎。此兵團象徵您的學習能力與適應力，在人生路上不斷茁壯。",
        self: "本我兵團以丙火為核心，如同太陽般光明磊落，照耀四方。寅木軍師生機勃勃，為主將提供不竭動力。此兵團代表您的真實本性，是整個命格的中心所在。",
        future: "未來兵團由丁火領航，如同燭光般溫暖而專注。卯木軍師機靈敏捷，善於捕捉時機。此兵團預示著您的未來發展方向，充滿無限可能。"
    }
};

// Global variables
let formInitialized = false;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing application...');
    initializeDateSelectors();
    initializeForm();
    addEventListeners();
});

// Initialize date selectors
function initializeDateSelectors() {
    try {
        populateYearSelector();
        populateMonthSelector();
        
        // Add event listener for month change to update days
        const monthSelect = document.getElementById('birthMonth');
        const yearSelect = document.getElementById('birthYear');
        
        if (monthSelect && yearSelect) {
            monthSelect.addEventListener('change', updateDaySelector);
            yearSelect.addEventListener('change', updateDaySelector);
        }
        
        console.log('Date selectors initialized successfully');
    } catch (error) {
        console.error('Error initializing date selectors:', error);
    }
}

// Populate year selector
function populateYearSelector() {
    const yearSelect = document.getElementById('birthYear');
    if (!yearSelect) return;
    
    const currentYear = new Date().getFullYear();
    
    // Clear existing options except the first one
    yearSelect.innerHTML = '<option value="">請選擇年份</option>';
    
    // Add years from current year to 1900
    for (let year = currentYear; year >= 1900; year--) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year + '年';
        yearSelect.appendChild(option);
    }
}

// Populate month selector
function populateMonthSelector() {
    const monthSelect = document.getElementById('birthMonth');
    if (!monthSelect) return;
    
    const months = [
        '1月', '2月', '3月', '4月', '5月', '6月',
        '7月', '8月', '9月', '10月', '11月', '12月'
    ];
    
    // Clear existing options except the first one
    monthSelect.innerHTML = '<option value="">請選擇月份</option>';
    
    months.forEach((month, index) => {
        const option = document.createElement('option');
        option.value = index + 1;
        option.textContent = month;
        monthSelect.appendChild(option);
    });
}

// Update day selector based on selected month and year
function updateDaySelector() {
    const daySelect = document.getElementById('birthDay');
    const monthSelect = document.getElementById('birthMonth');
    const yearSelect = document.getElementById('birthYear');
    
    if (!daySelect || !monthSelect || !yearSelect) return;
    
    // Clear existing options
    daySelect.innerHTML = '<option value="">請選擇日期</option>';
    
    const selectedMonth = parseInt(monthSelect.value);
    const selectedYear = parseInt(yearSelect.value);
    
    if (selectedMonth && selectedYear) {
        const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
        
        for (let day = 1; day <= daysInMonth; day++) {
            const option = document.createElement('option');
            option.value = day;
            option.textContent = day + '日';
            daySelect.appendChild(option);
        }
    }
}

// Initialize form handling
function initializeForm() {
    const form = document.getElementById('baziForm');
    const generateBtn = document.getElementById('generateBtn');
    
    if (!form || !generateBtn) {
        console.error('Form or generate button not found');
        return;
    }
    
    // Remove any existing event listeners
    form.removeEventListener('submit', handleFormSubmission);
    generateBtn.removeEventListener('click', handleButtonClick);
    
    // Add new event listeners
    form.addEventListener('submit', handleFormSubmission);
    generateBtn.addEventListener('click', handleButtonClick);
    
    formInitialized = true;
    console.log('Form initialized successfully');
}

// Handle button click (separate from form submission)
function handleButtonClick(event) {
    event.preventDefault();
    event.stopPropagation();
    
    console.log('Generate button clicked');
    
    // Close any open dropdowns
    closeAllDropdowns();
    
    if (validateForm()) {
        addLoadingEffect();
        setTimeout(() => {
            generateBaziChart();
            showBaziChart();
            showLegionsSection();
            addFormSuccessEffect();
        }, 1000);
    } else {
        showFormError();
    }
}

// Handle form submission
function handleFormSubmission(event) {
    event.preventDefault();
    event.stopPropagation();
    console.log('Form submitted');
    handleButtonClick(event);
}

// Close all dropdown selects
function closeAllDropdowns() {
    const selects = document.querySelectorAll('select');
    selects.forEach(select => {
        if (select.blur) select.blur();
    });
}

// Validate form inputs
function validateForm() {
    const requiredFields = ['name', 'gender', 'birthYear', 'birthMonth', 'birthDay', 'birthHour'];
    let isValid = true;
    
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (!field) {
            console.error(`Field ${fieldId} not found`);
            return;
        }
        
        const value = field.value.trim();
        
        if (!value) {
            isValid = false;
            addErrorEffect(field);
            console.log(`Validation failed for field: ${fieldId}`);
        } else {
            removeErrorEffect(field);
        }
    });
    
    console.log('Form validation result:', isValid);
    return isValid;
}

// Add error effect to field
function addErrorEffect(field) {
    field.style.borderColor = '#ff0080';
    field.style.boxShadow = '0 0 20px rgba(255, 0, 128, 0.5)';
    
    setTimeout(() => {
        field.style.borderColor = '#00ffff';
        field.style.boxShadow = '0 0 10px rgba(0, 255, 255, 0.3), inset 0 0 10px rgba(0, 255, 255, 0.1)';
    }, 2000);
}

// Remove error effect from field
function removeErrorEffect(field) {
    field.style.borderColor = '#00ffff';
    field.style.boxShadow = '0 0 10px rgba(0, 255, 255, 0.3), inset 0 0 10px rgba(0, 255, 255, 0.1)';
}

// Show form error
function showFormError() {
    const button = document.getElementById('generateBtn');
    const originalText = button.querySelector('.btn-text').textContent;
    
    button.querySelector('.btn-text').textContent = '請完整填寫資料';
    button.style.background = 'linear-gradient(45deg, #ff0080, #ff4000)';
    
    setTimeout(() => {
        button.querySelector('.btn-text').textContent = originalText;
        button.style.background = 'linear-gradient(45deg, #00ffff, #ff00ff)';
    }, 2000);
}

// Add form success effect
function addFormSuccessEffect() {
    const button = document.getElementById('generateBtn');
    const originalText = button.querySelector('.btn-text').textContent;
    
    button.querySelector('.btn-text').textContent = '命盤生成成功！';
    button.style.background = 'linear-gradient(45deg, #00ff00, #00ffff)';
    
    setTimeout(() => {
        button.querySelector('.btn-text').textContent = originalText;
        button.style.background = 'linear-gradient(45deg, #00ffff, #ff00ff)';
        button.disabled = false;
    }, 3000);
}

// Add loading effect for form submission
function addLoadingEffect() {
    const button = document.getElementById('generateBtn');
    const originalText = button.querySelector('.btn-text').textContent;
    
    button.querySelector('.btn-text').textContent = '正在計算命盤...';
    button.disabled = true;
    button.style.background = 'linear-gradient(45deg, #ffff00, #00ffff)';
}

// Generate Ba Zi chart with sample data
function generateBaziChart() {
    console.log('Generating Ba Zi chart...');
    
    // Update Ba Zi pillars with sample data
    const elements = [
        ['yearStem', sampleData.sample_bazi.year.stem],
        ['yearBranch', sampleData.sample_bazi.year.branch],
        ['monthStem', sampleData.sample_bazi.month.stem],
        ['monthBranch', sampleData.sample_bazi.month.branch],
        ['dayStem', sampleData.sample_bazi.day.stem],
        ['dayBranch', sampleData.sample_bazi.day.branch],
        ['hourStem', sampleData.sample_bazi.hour.stem],
        ['hourBranch', sampleData.sample_bazi.hour.branch]
    ];
    
    elements.forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    });
    
    // Update legion information
    updateLegionData();
    console.log('Ba Zi chart generated successfully');
}

// Update legion data
function updateLegionData() {
    const legionData = [
        // Family Legion
        ['familyGeneral', '甲木統帥'],
        ['familyAdvisor', '子水謀士'],
        ['familyDeputy', '癸水副將'],
        ['familySoldiers', '無'],
        ['familyBattlefield', '海中金戰場'],
        ['familySpirits', '天乙貴人'],
        
        // Growth Legion
        ['growthGeneral', '乙木統帥'],
        ['growthAdvisor', '丑土謀士'],
        ['growthDeputy', '己土副將'],
        ['growthSoldiers', '癸水、辛金'],
        ['growthBattlefield', '海中金戰場'],
        ['growthSpirits', '文昌貴人'],
        
        // Self Legion
        ['selfGeneral', '丙火統帥'],
        ['selfAdvisor', '寅木謀士'],
        ['selfDeputy', '甲木副將'],
        ['selfSoldiers', '丙火、戊土'],
        ['selfBattlefield', '爐中火戰場'],
        ['selfSpirits', '桃花'],
        
        // Future Legion
        ['futureGeneral', '丁火統帥'],
        ['futureAdvisor', '卯木謀士'],
        ['futureDeputy', '乙木副將'],
        ['futureSoldiers', '無'],
        ['futureBattlefield', '爐中火戰場'],
        ['futureSpirits', '驛馬']
    ];
    
    legionData.forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    });
}

// Show Ba Zi chart section
function showBaziChart() {
    const section = document.getElementById('baziChart');
    if (!section) return;
    
    section.style.display = 'block';
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
        section.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
    }, 100);
    
    // Add pillar animation
    const pillars = section.querySelectorAll('.pillar');
    pillars.forEach((pillar, index) => {
        setTimeout(() => {
            pillar.style.transform = 'scale(1.05)';
            setTimeout(() => {
                pillar.style.transform = 'scale(1)';
            }, 300);
        }, index * 200);
    });
    
    console.log('Ba Zi chart section displayed');
}

// Show legions section
function showLegionsSection() {
    const section = document.getElementById('legionsSection');
    if (!section) return;
    
    section.style.display = 'block';
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px)';
    
    setTimeout(() => {
        section.style.transition = 'all 1s cubic-bezier(0.16, 1, 0.3, 1)';
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
    }, 500);
    
    // Add legion cards animation
    const legionCards = section.querySelectorAll('.legion-card');
    legionCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
            setTimeout(() => {
                card.style.transform = 'translateY(0) scale(1)';
            }, 400);
        }, index * 300 + 1000);
    });
    
    console.log('Legions section displayed');
}

// Toggle section visibility
function toggleSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;
    
    const button = event.target;
    
    if (section.style.display === 'none' || section.style.display === '') {
        section.style.display = 'block';
        section.style.opacity = '0';
        section.style.transform = 'translateY(-20px)';
        button.textContent = '收合詳情';
        
        setTimeout(() => {
            section.style.transition = 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, 50);
    } else {
        section.style.opacity = '0';
        section.style.transform = 'translateY(-20px)';
        button.textContent = '展開詳情';
        
        setTimeout(() => {
            section.style.display = 'none';
        }, 500);
    }
}

// Toggle story visibility and trigger typewriter effect
function toggleStory(storyId) {
    const storyContent = document.getElementById(storyId);
    const button = event.target;
    const textElement = document.getElementById(storyId + 'Text');
    
    if (!storyContent || !textElement) return;
    
    if (storyContent.style.display === 'none' || storyContent.style.display === '') {
        storyContent.style.display = 'block';
        button.textContent = '收合AI軍團故事';
        
        // Get the appropriate story text
        let storyText = '';
        if (storyId.includes('family')) {
            storyText = sampleData.sample_stories.family;
        } else if (storyId.includes('growth')) {
            storyText = sampleData.sample_stories.growth;
        } else if (storyId.includes('self')) {
            storyText = sampleData.sample_stories.self;
        } else if (storyId.includes('future')) {
            storyText = sampleData.sample_stories.future;
        }
        
        // Trigger typewriter effect
        typewriterEffect(textElement, storyText, 50);
    } else {
        storyContent.style.display = 'none';
        button.textContent = '展開AI軍團故事';
        textElement.textContent = '';
    }
}

// Typewriter effect
function typewriterEffect(element, text, speed = 50) {
    element.textContent = '';
    let index = 0;
    
    const timer = setInterval(() => {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            
            // Add cursor effect
            element.style.borderRight = '2px solid #00ffff';
            element.style.animation = 'blink 1s infinite';
        } else {
            clearInterval(timer);
            // Remove cursor after completion
            setTimeout(() => {
                element.style.borderRight = 'none';
                element.style.animation = 'none';
            }, 1000);
        }
    }, speed);
}

// Add event listeners for interactive elements
function addEventListeners() {
    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('.neon-button, .toggle-btn, .story-toggle');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Add scroll effects
    window.addEventListener('scroll', function() {
        const cards = document.querySelectorAll('.legion-card, .card');
        
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible) {
                card.style.transform = 'translateY(0) scale(1)';
                card.style.opacity = '1';
            }
        });
    });
}

// Add CSS keyframe for blinking cursor
const style = document.createElement('style');
style.textContent = `
    @keyframes blink {
        0%, 50% { border-right-color: transparent; }
        51%, 100% { border-right-color: #00ffff; }
    }
`;
document.head.appendChild(style);

// Add particle effect for background (simplified)
function createParticleEffect() {
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: fixed;
            width: 2px;
            height: 2px;
            background: rgba(0, 255, 255, 0.5);
            border-radius: 50%;
            pointer-events: none;
            z-index: -1;
            left: ${Math.random() * 100}vw;
            top: ${Math.random() * 100}vh;
            animation: float ${3 + Math.random() * 4}s linear infinite;
        `;
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 7000);
    }
}

// Add floating animation
const floatingStyle = document.createElement('style');
floatingStyle.textContent = `
    @keyframes float {
        0% { 
            transform: translateY(100vh) translateX(0);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% { 
            transform: translateY(-100px) translateX(${Math.random() * 200 - 100}px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(floatingStyle);

// Start particle effect
setInterval(createParticleEffect, 2000);