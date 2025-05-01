const { By, until } = require('selenium-webdriver');

async function testSaffMemberReg(driver, log) {
  try {
    // Go to the registration page
    await driver.get('http://localhost:3000/register');  

    // Wait for form fields to load
    await driver.wait(until.elementLocated(By.css('input[type="text"]')), 5000);

    // Fill in Username
    await driver.findElement(By.css('input[type="text"]')).sendKeys('testuser');

    // Fill in Email
    await driver.findElement(By.css('input[type="email"]')).sendKeys('testuser@example.com');

    // Fill in Password
    await driver.findElement(By.css('input[type="password"]')).sendKeys('Test1234');

    // Select Role from dropdown
    const roleSelect = await driver.findElement(By.css('select'));
    await roleSelect.click();
    await roleSelect.sendKeys('Supervisor'); // Can also use 'Admin', etc.

    // Submit form
    const submitButton = await driver.findElement(By.css('button[type="submit"]'));
    await submitButton.click();

    // Wait for alert and validate it
    await driver.wait(until.alertIsPresent(), 5000);
    const alert = await driver.switchTo().alert();
    const alertText = await alert.getText();
    await alert.accept();

    log(`✅ Staff registration passed. Alert: ${alertText}`);

  } catch (err) {
    log(`❌ Staff registration test failed: ${err.message}`);
  }
}

module.exports = {
  testSaffMemberReg,
};