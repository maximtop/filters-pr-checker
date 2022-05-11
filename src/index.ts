import 'dotenv/config';

import * as core from '@actions/core';
import fs from 'fs-extra';
import { chromium } from 'playwright-chromium';
import { api } from './api';
import { getUrlFromDescription } from './helpers';

import { screenshot } from './screenshot';
import { Context, extension } from './extension';
import browser from 'webextension-polyfill';

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

        const browserContext = await chromium.launchPersistentContext('/tmp/user-data-dir', {
            headless: false,
            // args: [
            //     `--disable-extensions-except=${EXTENSION_PATH}`,
            //     `--load-extension=${EXTENSION_PATH}`,
            // ],
        });
        console.log('start instance');

        const page = await browserContext.newPage();
        console.log('open new page');
        await page.goto('https:///example.org');
        console.log('went to page');
        await browserContext.close();
        console.log('browser closed');

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
