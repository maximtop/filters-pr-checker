import * as core from '@actions/core';
import * as github from '@actions/github';

import { screenshot } from './screenshot';

console.log(process.env);

const run = async () => {
    try {
        const repoToken = core.getInput('repo-token', { required: true });
        const octokit = github.getOctokit(repoToken);

        const { data: pullRequest } = await octokit.rest.pulls.get({
            owner: 'maximtop',
            repo: 'AdguardFilters',
            // TODO get current pr number
            pull_number: 1,
            mediaType: {
                format: 'diff',
            },
        });

        await screenshot({ url: 'https://example.org', path: './scripts/example.jpeg' });

        // eslint-disable-next-line no-console
        console.log(pullRequest);
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
