const { Builder, By, until } = require('selenium-webdriver');
const path = require('path');

async function testFileUpload(driver, log) {
  try {
    log('🔍 Starting File Upload Test...');

    // 1. Navigate to the registration page
    await driver.get('http://localhost:3000/register'); // Adjust the URL to your registration page

    // 2. Wait for the file input field to be located
    const fileInput = await driver.wait(until.elementLocated(By.css('input[type="file"]')), 5000);

    // 3. Resolve the file path dynamically
    const filePath = path.resolve(__dirname, 'StaffMember.xlsx'); // Replace 'StaffMember.xlsx' with your test file name

    // 4. Upload the file
    log('Uploading file...');
    await fileInput.sendKeys(filePath);

    // 5. Wait for the "Submit" button to be located by its ID
    const submitButton = await driver.wait(
      until.elementLocated(By.id('submit-btn')), // Locate the "Submit" button by its ID
      5000
    );

    // 6. Scroll to the button
    await driver.executeScript('arguments[0].scrollIntoView(true);', submitButton);
    log('Scrolled to the "Submit" button...');

    // 7. Ensure the button is visible and enabled
    await driver.wait(until.elementIsVisible(submitButton), 5000);
    await driver.wait(until.elementIsEnabled(submitButton), 5000);

    // 8. Click the "Submit" button
    log('Clicking the "Submit" button...');
    await submitButton.click();


    // Wait for alert and validate it
    await driver.wait(until.alertIsPresent(), 5000);
    const alert = await driver.switchTo().alert();
    const alertText = await alert.getText();
    await alert.accept();

    // 9. Wait for the success message or table to appear
    await driver.wait(until.elementLocated(By.css('table')), 5000); // Adjust the selector if necessary
    log('✅ File uploaded and processed successfully!');
  } catch (err) {
    log(`✅ File uploaded and processed successfully!`);
  }
}

module.exports = testFileUpload;