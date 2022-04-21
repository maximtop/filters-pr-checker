import { chromium } from 'playwright-chromium';

interface ScreenshotOptions {
    url: string,
    path: string,
}

export const screenshot = async ({ url, path }: ScreenshotOptions) => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(url);

    await page.screenshot({ path, fullPage: true });

    await browser.close();
};
