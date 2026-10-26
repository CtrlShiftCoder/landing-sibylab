const { chromium } = require('playwright');
const fs = require('fs');

async function recordDesktop() {
  console.log('Starting desktop recording (1440x900)...');
  
  const browser = await chromium.launch({
    headless: true,
    args: ['--disable-blink-features=AutomationControlled']
  });
  
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    recordVideo: {
      dir: '/tmp/videos',
      size: { width: 1440, height: 900 }
    }
  });
  
  const page = await context.newPage();
  
  console.log('Loading page...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  
  // Wait for hero animation to complete
  console.log('Waiting for hero animation (5s)...');
  await page.waitForTimeout(5000);
  
  console.log('Taking hero screenshot...');
  await page.screenshot({ 
    path: '/opt/cursor/artifacts/desktop-01-hero.png',
    fullPage: false 
  });
  
  // Scroll through each section slowly
  console.log('Scrolling through sections...');
  
  // Pain points section
  await page.evaluate(() => window.scrollTo({ top: 800, behavior: 'smooth' }));
  await page.waitForTimeout(2000);
  await page.screenshot({ 
    path: '/opt/cursor/artifacts/desktop-02-pain.png',
    fullPage: false 
  });
  
  // Services section
  await page.evaluate(() => window.scrollTo({ top: 1600, behavior: 'smooth' }));
  await page.waitForTimeout(2000);
  await page.screenshot({ 
    path: '/opt/cursor/artifacts/desktop-03-services.png',
    fullPage: false 
  });
  
  // About section
  await page.evaluate(() => window.scrollTo({ top: 2400, behavior: 'smooth' }));
  await page.waitForTimeout(2000);
  
  // Why us section (pinned animation)
  console.log('Scrolling through pinned section...');
  await page.evaluate(() => window.scrollTo({ top: 3000, behavior: 'smooth' }));
  await page.waitForTimeout(2000);
  await page.screenshot({ 
    path: '/opt/cursor/artifacts/desktop-04-why-pinned.png',
    fullPage: false 
  });
  
  await page.evaluate(() => window.scrollTo({ top: 3400, behavior: 'smooth' }));
  await page.waitForTimeout(1500);
  
  await page.evaluate(() => window.scrollTo({ top: 3800, behavior: 'smooth' }));
  await page.waitForTimeout(1500);
  
  // Process section
  await page.evaluate(() => window.scrollTo({ top: 4600, behavior: 'smooth' }));
  await page.waitForTimeout(2000);
  await page.screenshot({ 
    path: '/opt/cursor/artifacts/desktop-05-process.png',
    fullPage: false 
  });
  
  // Experience section
  await page.evaluate(() => window.scrollTo({ top: 5800, behavior: 'smooth' }));
  await page.waitForTimeout(2500);
  await page.screenshot({ 
    path: '/opt/cursor/artifacts/desktop-06-experience.png',
    fullPage: false 
  });
  
  // FAQ
  await page.evaluate(() => window.scrollTo({ top: 7000, behavior: 'smooth' }));
  await page.waitForTimeout(2000);
  
  // Contact
  await page.evaluate(() => window.scrollTo({ top: 8200, behavior: 'smooth' }));
  await page.waitForTimeout(2000);
  await page.screenshot({ 
    path: '/opt/cursor/artifacts/desktop-07-contact.png',
    fullPage: false 
  });
  
  // Scroll back to top to show smooth scroll
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  await page.waitForTimeout(2000);
  
  console.log('Closing desktop recording...');
  await context.close();
  
  const videoPath = await page.video().path();
  await browser.close();
  
  return videoPath;
}

async function recordMobile() {
  console.log('Starting mobile recording (375x667)...');
  
  const browser = await chromium.launch({
    headless: true,
    args: ['--disable-blink-features=AutomationControlled']
  });
  
  const context = await browser.newContext({
    viewport: { width: 375, height: 667 },
    recordVideo: {
      dir: '/tmp/videos-mobile',
      size: { width: 375, height: 667 }
    }
  });
  
  const page = await context.newPage();
  
  console.log('Loading page (mobile)...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  
  // Wait for hero animation
  await page.waitForTimeout(4000);
  
  console.log('Taking mobile hero screenshot...');
  await page.screenshot({ 
    path: '/opt/cursor/artifacts/mobile-01-hero.png',
    fullPage: false 
  });
  
  // Quick scroll through a few sections
  await page.evaluate(() => window.scrollTo({ top: 600, behavior: 'smooth' }));
  await page.waitForTimeout(2000);
  await page.screenshot({ 
    path: '/opt/cursor/artifacts/mobile-02-pain.png',
    fullPage: false 
  });
  
  await page.evaluate(() => window.scrollTo({ top: 1400, behavior: 'smooth' }));
  await page.waitForTimeout(2000);
  await page.screenshot({ 
    path: '/opt/cursor/artifacts/mobile-03-services.png',
    fullPage: false 
  });
  
  await page.evaluate(() => window.scrollTo({ top: 2800, behavior: 'smooth' }));
  await page.waitForTimeout(2000);
  
  await page.evaluate(() => window.scrollTo({ top: 4000, behavior: 'smooth' }));
  await page.waitForTimeout(2000);
  
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  await page.waitForTimeout(1500);
  
  console.log('Closing mobile recording...');
  await context.close();
  
  const videoPath = await page.video().path();
  await browser.close();
  
  return videoPath;
}

(async () => {
  try {
    // Desktop recording
    const desktopVideo = await recordDesktop();
    console.log('Desktop video saved at:', desktopVideo);
    
    // Move and rename desktop video
    const desktopFiles = fs.readdirSync('/tmp/videos');
    if (desktopFiles.length > 0) {
      const sourceVideo = `/tmp/videos/${desktopFiles[0]}`;
      fs.copyFileSync(sourceVideo, '/opt/cursor/artifacts/landing-gsap-demo-desktop.webm');
      console.log('Desktop video copied to artifacts');
    }
    
    // Mobile recording
    const mobileVideo = await recordMobile();
    console.log('Mobile video saved at:', mobileVideo);
    
    // Move and rename mobile video
    const mobileFiles = fs.readdirSync('/tmp/videos-mobile');
    if (mobileFiles.length > 0) {
      const sourceVideo = `/tmp/videos-mobile/${mobileFiles[0]}`;
      fs.copyFileSync(sourceVideo, '/opt/cursor/artifacts/landing-gsap-demo-mobile.webm');
      console.log('Mobile video copied to artifacts');
    }
    
    console.log('\n✅ All recordings and screenshots complete!');
    console.log('Check /opt/cursor/artifacts/ for outputs');
    
  } catch (error) {
    console.error('Error during recording:', error);
    process.exit(1);
  }
})();
