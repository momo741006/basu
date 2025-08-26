# GitHub Copilot Instructions for BaZi Fortune Telling Web Application

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Project Overview
This is 虹靈御所八字人生兵法 (Rainbow Spirit Palace BaZi Life Military Strategy), a Chinese astrology/fortune telling web application that calculates and analyzes traditional Chinese BaZi (Eight Characters) charts. The application is built with pure HTML5, CSS3, and JavaScript with no build system or package management.

## Quick Setup and Testing

### Bootstrap and Run the Application
Always run these commands to start working with the repository:

```bash
cd /home/runner/work/basu/basu
python3 -m http.server 8080
```

- **NEVER CANCEL**: Server starts instantly (< 1 second). Always use HTTP server - file:// protocol has CORS limitations.
- Open browser to `http://localhost:8080`
- Application loads in under 1 second, total size is 1.1MB

### Core Application Structure
```
.
├── index.html                              # Main UI (contains all pages in tabs)
├── style.css                               # Complete styling (CSS variables, dark theme)
├── app.js                                  # Main application logic (34KB)
├── bazi_calculator.js                      # Core calculation engine (44KB)
├── complete_solar_terms_1850_2100.json    # Solar terms database (472KB)
├── key_solar_terms_database.json          # Key solar terms data (217KB)
├── test_results.md                         # Validation results
├── test_verification.md                    # Known test cases
└── README.md                               # Project documentation
```

## Validation and Testing

### CRITICAL Validation Test Cases
Always test these exact scenarios after making any changes:

**Test Case 1** (from test_verification.md):
- Name: 默默超
- Gender: 男性 
- Birth Date: 1985-10-06
- Birth Time: 19:30
- Birth Location: 台北市
- Expected Result: 乙丑 乙酉 戊寅 壬戌

**Test Case 2** (from test_results.md):
- Name: 測試用戶
- Gender: 男性
- Birth Date: 1990-09-27  
- Birth Time: 14:30
- Birth Location: 台北市

### Manual Validation Steps
After making any changes, ALWAYS:

1. Start HTTP server: `python3 -m http.server 8080`
2. Navigate to `http://localhost:8080`
3. Fill out form with Test Case 1 data
4. Click "🔮 生成精確命運解析"
5. Check all 5 navigation tabs work: 資料輸入, 傳統排盤, 四時軍團, 詳細分析, 八字百科
6. Verify calculations complete (URL should contain form parameters)
7. Take screenshot to verify UI renders correctly

## Known Issues and Limitations

### JavaScript Errors (Non-blocking)
- Chart.js CDN may be blocked (`net::ERR_BLOCKED_BY_CLIENT`)
- `TypeError: Cannot read properties of null` in showLoadingStatus function
- These errors do NOT prevent core functionality from working

### Dependencies
- **Python 3**: Required for HTTP server (any version 3.x works, tested with 3.12.3)
- **Chart.js CDN**: External dependency for charts (`https://cdn.jsdelivr.net/npm/chart.js`)
- **Modern Browser**: Chrome, Firefox, Safari, Edge with JavaScript enabled

## Working with the Code

### No Build System
- This is a pure frontend application with NO package.json, webpack, or build tools
- Make direct edits to HTML, CSS, and JavaScript files
- No linting tools configured - be careful with syntax
- No automated tests - use manual validation scenarios above

### Key Files to Understand

**index.html**: Single-page application with tabbed interface
- Contains all UI elements for 5 different views
- Form processing triggers page reload with URL parameters
- Responsive design with dark theme

**app.js**: Main application logic
- Tab switching functionality  
- Form processing and validation
- UI state management
- Military legion (四時軍團) story generation

**bazi_calculator.js**: Core calculation engine
- Chinese calendar conversion algorithms
- Solar terms calculation using JSON databases
- BaZi chart generation (year/month/day/hour pillars)
- Five elements and Yin/Yang analysis

**style.css**: Complete styling system
- CSS custom properties for consistent theming
- Responsive grid layouts
- Dark theme with starry background animations
- Modern UI components with gradients and shadows

### Performance Characteristics
- **Server startup**: < 1 second
- **Page load**: < 1 second  
- **JSON data loading**: < 0.01 seconds (both 472KB and 217KB files)
- **Calculation processing**: Instant (client-side JavaScript)
- **Total application size**: 1.1MB

## Development Workflow

### Making Changes
1. Edit HTML/CSS/JavaScript files directly
2. Refresh browser to see changes (no build step required)
3. Run validation test cases immediately
4. Check browser console for any new JavaScript errors
5. Test all navigation tabs still function
6. Verify responsive design on different screen sizes

### Debugging
- Use browser Developer Tools console for JavaScript debugging
- Network tab shows loading of JSON data files
- Check for CORS errors if using file:// protocol
- JavaScript errors may appear but don't necessarily break functionality

### Code Style
- Chinese comments and variable names throughout codebase
- Mix of traditional Chinese characters in UI
- Functional programming style in JavaScript
- CSS uses modern features (custom properties, grid, flexbox)

## Validation Scenarios for Changes

### When modifying calculation logic (bazi_calculator.js):
- Run both test cases and verify correct BaZi results
- Check that solar terms data loads properly  
- Verify date conversion accuracy

### When modifying UI (index.html, style.css):
- Test tab switching functionality
- Verify form submission works
- Check responsive design on mobile and desktop
- Ensure dark theme renders correctly

### When modifying app logic (app.js):
- Test form validation and processing
- Verify story generation for military legions
- Check knowledge base search functionality
- Test all interactive elements

## Common Tasks Reference

### Starting Development Session
```bash
cd /home/runner/work/basu/basu
python3 -m http.server 8080 &
# Browser: http://localhost:8080
```

### Stopping HTTP Server
```bash
pkill -f "python3 -m http.server"
```

### Checking Application Status
```bash
curl -s http://localhost:8080 | head -5  # Should return HTML
netstat -tlnp | grep :8080              # Should show python3 process
```

### File Size Monitoring  
```bash
ls -lah *.js *.json *.css *.html        # Monitor file sizes
du -sh .                                # Total project size
```

This application provides traditional Chinese fortune telling calculations with a modern web interface. Always prioritize manual validation of the exact test scenarios provided, as there are no automated tests.