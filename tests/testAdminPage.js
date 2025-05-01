const { By, until, Key } = require('selenium-webdriver');

async function testAdminPage(driver, log) {
  try {
    log('🔍 Starting User Role Management Page Test...');
    await driver.get('http://localhost:3000/admin');
    log('✅ Navigated to User Management page.');

    // Wait for user cards to appear
    await driver.wait(until.elementLocated(By.css('.bg-white.shadow')), 5000);

    // 🧪 Search Functionality
    log('📝 Test Case 1: Search for user "devin"');
    const searchBox = await driver.findElement(By.css('input[placeholder*="Search"]'));
    await searchBox.clear();
    await searchBox.sendKeys('IT21265174@my.sliit.lk');
    await driver.sleep(1000); // wait for filtered results

    const userCards = await driver.findElements(By.css('.bg-white.shadow'));
    log(`✅ Found ${userCards.length} user(s) with "IT21265174@my.sliit.lk"`);

    if (userCards.length === 0) {
      log('❌ No user found matching "IT21265174@my.sliit.lk".');
      return;
    }

    const targetCard = userCards[0]; // assume first match is target

    // 📝 Test Case 2: Edit user role
    log('📝 Test Case 2: Edit User Role');
    const dropdown = await targetCard.findElement(By.css('select'));
    await dropdown.click();
    await dropdown.sendKeys('Examiner');
    log('✅ Changed role to Examiner.');

    // ✅ Handle alert for role update
    await driver.wait(until.alertIsPresent(), 3000);
    const roleAlert = await driver.switchTo().alert();
    const roleAlertText = await roleAlert.getText();
    log(`🔔 Alert after role update: ${roleAlertText}`);
    await roleAlert.accept();
    await driver.sleep(1000);

    // 📝 Test Case 3: Delete User
    log('📝 Test Case 3: Delete User "devin"');
    const deleteBtn = await targetCard.findElement(By.css('button.bg-red-600'));
    await deleteBtn.click();
    log('✅ Clicked delete button.');

    await driver.wait(until.alertIsPresent(), 3000);
    const deleteAlert = await driver.switchTo().alert();
    const deleteAlertText = await deleteAlert.getText();
    log(`🔔 Alert after deletion: ${deleteAlertText}`);
    await deleteAlert.accept();
    await driver.sleep(1000);

    // Confirm deletion by checking if "cdi" is gone
    await searchBox.clear();
    await searchBox.sendKeys('IT21265174@my.sliit.lk');
    await driver.sleep(1000);

    const remaining = await driver.findElements(By.css('.bg-white.shadow'));
    if (remaining.length === 0) {
      log('✅ User "IT21265174@my.sliit.lk" successfully deleted and no longer visible.');
    } else {
      log('❌ User "IT21265174@my.sliit.lk" still appears after deletion.');
    }

    log('✅ User Management Page Test Completed.');
  } catch (err) {
    log(`❌ User Management Test Failed: ${err.message}`);
  }
}

module.exports = testAdminPage;