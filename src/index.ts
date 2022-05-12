import 'dotenv/config';

import * as core from '@actions/core';
// import fs from 'fs-extra';
// import { chromium } from 'playwright-chromium';
// import browser from 'webextension-polyfill';
import path from 'path';
import { chromium } from 'playwright-chromium';
// import { api } from './api';
// import { getUrlFromDescription } from './helpers';
//
// import { screenshot } from './screenshot';
// import { Context, extension } from './extension';

/**
 * - get filter before pr
 * - make screenshot before.jpg
 * - get filter after pr
 * - make screenshot after.jpg
 * - append screenshots in comments
 */
const run = async () => {
    try {
        // // const owner = 'maximtop';
        // // const repo = 'AdguardFilters';
        // // // FIXME get current pr
        // // const pullNumber = 1;
        // //
        // // const prInfo = await api.getPullRequest({
        // //     owner,
        // //     repo,
        // //     pullNumber,
        // // });
        // //
        // // if (!prInfo.body) {
        // //     throw new Error('Pull request description is required');
        // // }
        // //
        // // const pullRequestFiles = await api.getPullRequestFiles({
        // //     owner,
        // //     repo,
        // //     pullNumber,
        // // });
        // //
        // // const baseFileContent = await api.getContent({
        // //     owner: prInfo.base.owner,
        // //     repo: prInfo.base.repo,
        // //     path: pullRequestFiles[0],
        // //     ref: prInfo.base.sha,
        // // });
        // //
        // // const headFileContent = await api.getContent({
        // //     owner: prInfo.head.owner,
        // //     repo: prInfo.head.repo,
        // //     path: pullRequestFiles[0],
        // //     ref: prInfo.head.sha,
        // // });
        // //
        // // await fs.writeFile('head.txt', headFileContent);
        // // await fs.writeFile('base.txt', baseFileContent);
        //
        // const url = getUrlFromDescription(prInfo.body);
        //
        // if (!url) {
        //     throw new Error('URL in the pull request is required');
        // }

        const pathToExtension = path.join(__dirname, './extension');
        console.log(pathToExtension);

        const userDataDir = '/tmp/test-user-data-dir';
        const browserContext = await chromium.launchPersistentContext(userDataDir, {
            headless: false,
            args: [
                `--disable-extensions-except=${pathToExtension}`,
                `--load-extension=${pathToExtension}`,
            ],
        });

        try {
            const backgroundPages = browserContext.backgroundPages();
            const backgroundPage = backgroundPages.length
                ? backgroundPages[0]
                : await browserContext.waitForEvent('backgroundpage');
            console.log(backgroundPage);
        } catch (e) {
            console.log(e.message);
        }

        // const result = await backgroundPage.evaluate(() => window.playwright);
        // assert(result === 'test');
        // console.log('Found expected value');

        const page = await browserContext.newPage();
        await page.goto('https:///example.org');
        const h1 = await page.locator('h1');
        console.log(await h1.textContent());

        // Test the background page as you would any other page.
        await browserContext.close();

        // const browserContext = await chromium.launchPersistentContext('/tmp/user-data-dir');

        // const context = await extension.start();
        // await extension.config(context, headFileContent.toString());
        // await screenshot(context, { url, path: 'image.jpeg' });
        // await extension.config(context, 'example.org##h1');
        // await screenshot(context, { url: 'https://example.org', path: 'image.jpeg' });

        // await extension.config(context, baseFileContent.toString());
        // await screenshot(context, { url, path: 'image2.jpeg' });

        // TODO unite in one module
        // await context.browserContext.close();

        // eslint-disable-next-line no-console
        // console.log(JSON.stringify(pullRequest));
    } catch (e) {
        core.setFailed(e.message);
    }
};

const main = async () => {
    await run();
};

(async () => {
    try {
        await main();
    } catch (e) {
        core.setFailed(e.message);
    }
})();
