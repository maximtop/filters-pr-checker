import * as core from '@actions/core';
import * as github from '@actions/github';
import { GitHub } from '@actions/github/lib/utils';

import { GetPullRequestParams, GetPullRequestResponse } from './GithubApiInterfaces';

class GithubApi {
    private octokit: InstanceType<typeof GitHub>;

    constructor() {
        const repoToken = core.getInput('repo_token', { required: true });
        this.octokit = github.getOctokit(repoToken);
    }

    getPullRequest = async (params: GetPullRequestParams): Promise<GetPullRequestResponse> => {
        const {
            owner,
            repo,
            pullNumber,
        } = params;

        const response = await this.octokit.rest.pulls.get({
            owner,
            repo,
            pull_number: pullNumber,
        });

        return response;
    };
}

export const githubApi = new GithubApi();
