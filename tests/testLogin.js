const { By, until } = require('selenium-webdriver');

module.exports = async function testLogin(driver, log) {
  try {
    await driver.get('http://localhost:3000');
    await driver.wait(until.elementLocated(By.id('email')), 5000);

    await driver.findElement(By.id('email')).sendKeys('admin@gmail.com');
    await driver.findElement(By.id('password')).sendKeys('123456');
    await driver.findElement(By.css('button[type="submit"]')).click();

    await driver.wait(until.alertIsPresent(), 5000);
    const alert = await driver.switchTo().alert();
    const alertText = await alert.getText();
    log(`🔔 Alert text: ${alertText}`);
    await alert.accept();

    await driver.wait(until.urlContains('/home'), 5000);
    log('✅ Login test passed! Redirected to /home');
  } catch (err) {
    log(`❌ Login test failed: ${err.message}`);
  }
};