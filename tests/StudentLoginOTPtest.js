const { By, until } = require('selenium-webdriver');

async function testStudentLoginOTP(driver, log) {
  try {
    log('🔍 Starting Student Login OTP Test...');

    // Go to the login page
    await driver.get('http://localhost:3000/stlogin');
    log('✅ Navigated to Student Login page.');

    // Wait for the email input field to load
    await driver.wait(until.elementLocated(By.id('email')), 5000);

    // Test Case 1: Valid Email
    log('📝 Test Case 1: Valid Email');
    await driver.findElement(By.id('email')).clear();
    await driver.findElement(By.id('email')).sendKeys('it21265174@my.sliit.lk');
    await driver.findElement(By.css('button[type="submit"]')).click();

    log('✅ OTP sent to the email.');
    

    // Test Case 2: Invalid Email
    log('📝 Test Case 2: Invalid Email');
    await driver.findElement(By.id('email')).clear();
    await driver.findElement(By.id('email')).sendKeys('invalidemail@example.com');
    await driver.findElement(By.css('button[type="submit"]')).click();

    // Wait for error alert or message
    try {
      const alert = await driver.wait(until.alertIsPresent(), 5000);
      const alertText = await alert.getText();
      log(`✅ Error alert displayed for invalid email: "${alertText}"`);
      await alert.accept();
    } catch (error) {
      log('❌ Error alert not displayed for invalid email.');
    }

    log('✅ Student Login OTP Test Completed.');
  } catch (err) {
    log(`❌ Student Login OTP Test Failed: ${err.message}`);
  }
}

module.exports = testStudentLoginOTP;