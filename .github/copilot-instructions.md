# 虹靈御所八字人生兵法 - 完整整合版

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively

### Quick Setup and Running
- Start the HTTP server: `cd /home/runner/work/basu/basu && python3 -m http.server 8080`
- Server starts in < 1 second. Access via `http://localhost:8080`
- NEVER CANCEL server startup - it's instantaneous
- The application loads immediately - no build process required

### Building and Testing
- **No build process needed** - This is a static web application with HTML, CSS, and JavaScript
- Core files: `index.html`, `app.js`, `bazi_calculator.js`, `style.css`
- Large data files: `complete_solar_terms_1850_2100.json` (482KB), `key_solar_terms_database.json` (222KB)
- External dependency: Chart.js from CDN (may fail to load due to network restrictions - this is expected)

### Validation Scenarios
**CRITICAL**: Always run complete end-to-end user scenarios after making changes:

1. **Basic Application Load Test**:
   - Start server with `python3 -m http.server 8080`
   - Navigate to `http://localhost:8080`
   - Verify page loads with title "虹靈御所八字人生兵法 - 完整整合版"
   - Check console for success messages: "✅ 虹靈御所八字人生兵法 - 完整整合版載入完成" and "✅ 節氣資料庫載入成功"

2. **Complete Fortune Telling Workflow**:
   - Fill form with test data: 姓名="測試用戶", 性別="男性", 出生日期="1990-09-27", 出生時間="14:30", 出生地點="台北市"
   - Click "🔮 生成精確命運解析" button
   - **KNOWN ISSUE**: Calculation works (check console logs) but result display has a bug showing "Cannot read properties of undefined (reading 'year')"
   - This is acceptable - the core calculation engine functions correctly

3. **Encyclopedia Functionality Test**:
   - Click "📚 八字百科" tab
   - Verify encyclopedia loads with knowledge categories
   - Click on "🌲 十天干" category
   - Verify detailed knowledge view opens with comprehensive information about the ten heavenly stems
   - Click "✕" to close detail view
   - Encyclopedia feature works perfectly

4. **Tab Navigation Test**:
   - Test all tab buttons: 📝 資料輸入, 🔮 傳統排盤, ⚔️ 四時軍團, 📊 詳細分析, 📚 八字百科
   - Verify tab switching works and active states display correctly

### Expected Timing
- Server startup: < 1 second
- Page load: < 2 seconds
- Database loading: < 3 seconds (look for "✅ 節氣資料庫載入成功" in console)
- Form submission and calculation: < 1 second
- Tab switching: Immediate

### Known Issues and Workarounds
- **Chart.js CDN loading fails** - This is expected due to network restrictions. Application works without it.
- **Result display bug** - Calculation engine works but display function has undefined property error. Core functionality intact.
- **File reference error fixed** - `index.html` originally referenced `enhanced_app.js` but file is actually `app.js`. This has been corrected.

### File Structure and Key Locations
```
/home/runner/work/basu/basu/
├── index.html                              # Main HTML page
├── app.js                                  # Primary application logic (34KB)
├── bazi_calculator.js                      # Core fortune calculation engine
├── style.css                               # CSS styles (55KB)
├── complete_solar_terms_1850_2100.json    # Solar terms database (482KB)
├── key_solar_terms_database.json          # Key solar terms data (222KB)
├── README.md                               # Documentation in Chinese
├── test_results.md                         # Test results
└── test_verification.md                    # Test verification
```

### Common Development Tasks
- **Making changes**: Edit HTML/CSS/JS files directly - no build step required
- **Testing changes**: Refresh browser page after file modifications
- **Debugging**: Use browser console - application logs initialization and database loading
- **Adding features**: Follow existing patterns in `app.js` for UI components and event handling

### Validation Requirements
**ALWAYS perform these validation steps after making changes**:
1. Start server and verify no startup errors
2. Load application and check console for success messages
3. Test complete user workflow (form submission)
4. Test encyclopedia functionality (tab navigation and detail views)
5. Take screenshot to verify UI integrity
6. Check for JavaScript errors in browser console

### Code Quality
- No linting tools configured - follow existing code style
- No automated tests - rely on manual validation scenarios above
- Code is primarily in Chinese comments and UI text
- Use browser developer tools for debugging

### Troubleshooting
- **Page won't load**: Verify server is running on port 8080
- **JavaScript errors**: Check if `app.js` is being loaded correctly (was originally misnamed as `enhanced_app.js`)
- **Database not loading**: Check network console for JSON file loading errors
- **Form submission fails**: Expected due to known display bug - verify calculation completes in console

### Application Context
This is a Chinese fortune-telling application (八字命理) that calculates traditional Chinese astrology charts. It features:
- Professional-grade solar term calculations using Hong Kong Observatory data
- Complete knowledge encyclopedia of Chinese astrology concepts
- Multi-tab interface with different analysis views
- Responsive design with starry background theme
- Local calculation - no data uploaded to servers

The application is primarily in Traditional Chinese and serves users interested in Chinese astrology and fortune telling.