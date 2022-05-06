import 'dotenv/config';

import * as core from '@actions/core';
import fs from 'fs-extra';
import { api } from './api';
import { getUrlFromDescription } from './helpers';

import { screenshot } from './screenshot';

/**
 * - get filter before pr
 * - make screenshot before.jpg
 * - get filter after pr
 * - make screenshot after.jpg
 * - append screenshots in comments
 */
const run = async () => {
    try {
        const owner = 'maximtop';
        const repo = 'AdguardFilters';
        // FIXME get current pr
        const pullNumber = 1;

        const prInfo = await api.getPullRequest({
            owner,
            repo,
            pullNumber,
        });

        if (!prInfo.body) {
            throw new Error('Pull request description is required');
        }

        const pullRequestFiles = await api.getPullRequestFiles({
            owner,
            repo,
            pullNumber,
        });

        const baseFileContent = await api.getContent({
            owner: prInfo.base.owner,
            repo: prInfo.base.repo,
            path: pullRequestFiles[0],
            ref: prInfo.base.sha,
        });

        const headFileContent = await api.getContent({
            owner: prInfo.head.owner,
            repo: prInfo.head.repo,
            path: pullRequestFiles[0],
            ref: prInfo.head.sha,
        });

        await fs.writeFile('head.txt', headFileContent);
        await fs.writeFile('base.txt', baseFileContent);

        const url = getUrlFromDescription(prInfo.body);

        if (!url) {
            throw new Error('URL in the pull request is required');
        }

        await screenshot({ url, path: 'image.jpeg' });

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
