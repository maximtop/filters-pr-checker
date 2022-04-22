import 'dotenv/config';

import * as core from '@actions/core';
import * as github from '@actions/github';
// import fs from 'fs-extra';
//
// import { screenshot } from './screenshot';

/**
 * - get filter before pr
 * - make screenshot before.jpg
 * - get filter after pr
 * - make screenshot after.jpg
 * - append screenshots in comments
 */
const run = async () => {
    try {
        const repoToken = core.getInput('repo_token', { required: true });
        const octokit = github.getOctokit(repoToken);

        const owner = 'maximtop';
        const repo = 'AdguardFilters';
        const pullNumber = 1;

        const response = await octokit.rest.pulls.get({
            owner,
            repo,
            // TODO get current pr number
            pull_number: pullNumber,
            // mediaType: {
            //     format: 'diff',
            // },
        });

        console.log(JSON.stringify(response));

        // const { data: changedFiles } = await octokit.request(
        //     'GET /repos/{owner}/{repo}/pulls/{pull_number}/files',
        //     {
        //         owner,
        //         repo,
        //         pull_number: pullNumber,
        //     },
        // );

        // const baseRef = 'd0f8fd92c036cb77c281bc19d8b73d15a1c99b3b';
        // const headRef = '4f0d7e15f12d7b9b2f39e68bdbad3e498416f6cd';
        //
        // const headResponse = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
        //     owner,
        //     repo,
        //     path: 'GermanFilter/sections/general_extensions.txt',
        //     ref: headRef,
        //     mediaType: { format: 'raw' },
        // });
        //
        // console.log(headResponse);
        //
        // await fs.writeFile('head.txt', headResponse.data);
        //
        // const baseResponse = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
        //     owner,
        //     repo,
        //     path: 'GermanFilter/sections/general_extensions.txt',
        //     ref: baseRef,
        //     mediaType: { format: 'raw' },
        // });
        //
        // await fs.writeFile('base.txt', baseResponse.data);

        // await screenshot({ url: 'https://example.org', path: './example.jpeg' });

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
