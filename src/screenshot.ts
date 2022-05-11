import { Context } from './extension';

interface ScreenshotOptions {
    url: string,
    path: string,
}

export const screenshot = async (context: Context, { url, path }: ScreenshotOptions) => {
    const page = await context.browserContext.newPage();
    await page.goto(url);

    await page.screenshot({ path, fullPage: true });
};
