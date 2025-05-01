const fs = require('fs');
const path = require('path');
const { Builder } = require('selenium-webdriver');
const testLogin = require('./tests/testLogin');
const testSaffMemberReg = require('./tests/SaffMemberRegTest');
const testStudentLoginOTP = require('./tests/StudentLoginOTPtest');
const testAdminPage = require('./tests/testAdminPage');
const testFileUpload = require('./tests/fileUploadTest');

// Setup log file
const logDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);
const logFile = path.join(logDir, 'test.log');

// Logging function
function writeLog(message) {
  const time = new Date().toISOString();
  const logMessage = `[${time}] ${message}\n`;
  fs.appendFileSync(logFile, logMessage, 'utf8'); 
    console.log(logMessage);
}

// Run tests
(async () => {
  writeLog('🚀 Starting Testing.    SQA - IT21265174...\n');

  // Create a single browser instance
  const driver = await new Builder().forBrowser('chrome').build();

  try {
    // Run user login test
    writeLog('user login test started');
    await testLogin(driver, writeLog);
    writeLog('----------------------------------\n');

    // Run staff member registration test
    writeLog('staff member registration test started');
    await testSaffMemberReg.testSaffMemberReg(driver, writeLog);
    writeLog('----------------------------------\n');

     // Run file upload test
     writeLog('file upload test started');
     await testFileUpload(driver, writeLog);
     writeLog('----------------------------------\n');

     // Run admin page test
    writeLog('user role management test started');
    await testAdminPage(driver, writeLog);
    writeLog('----------------------------------\n');

    // Run student login OTP test
    writeLog('student login OTP test started');
    await testStudentLoginOTP(driver, writeLog);
    writeLog('----------------------------------\n');


     
    writeLog('\n✅ All tests finished.\n');
  } catch (error) {
    writeLog(`❌ Test suite failed: ${error.message}`);
  } finally {
    // Quit the browser after all tests
    await driver.quit();
  }
})();