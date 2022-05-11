import { chromium, BrowserContext, Page } from 'playwright-chromium';
import path from 'path';

const EXTENSION_PATH = path.resolve(__dirname, './extension');

export interface Context {
    browserContext: BrowserContext,
    backgroundPage: Page,
}

const start = async () => {
    const browserContext = await chromium.launchPersistentContext('tmp', {
        headless: false,
        args: [
            `--disable-extensions-except=${EXTENSION_PATH}`,
            `--load-extension=${EXTENSION_PATH}`,
        ],
    });

    const backgroundPage = await browserContext.waitForEvent('backgroundpage');

    await backgroundPage.waitForFunction(
        () => window.tsWebExtension.isStarted,
        null,
        { polling: 100 },
    );

    return {
        browserContext,
        backgroundPage,
    };
};

const config = async (context: Context, rulesText: string) => {
    await context.backgroundPage.evaluate(async (rulesText: string) => {
        await window.tsWebExtension.configure(Object.assign(window.tsWebExtension.configuration, {
            filters: [{
                filterId: 1,
                content: rulesText,
            }],
        }));
    }, rulesText);
};

export const extension = {
    start,
    config,
};
