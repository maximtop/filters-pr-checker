import _ from 'lodash';

import { githubApi } from './GithubApi';
import { GetPullRequestParams } from './GithubApiInterfaces';

class GithubApiProvider {
    // eslint-disable-next-line class-methods-use-this
    async getPullRequest(params: GetPullRequestParams) {
        const response = await githubApi.getPullRequest(params);

        if (response.status !== 200) {
            throw new Error(`Couldn't get pull request by params: ${JSON.stringify(params)}, status: ${response.status}`);
        }

        const { data } = response;

        return {
            head: {
                owner: _.get(data.head, 'user.login'),
                repo: _.get(data.head, 'repo.name'),
            },
            base: {
                owner: _.get(data.base, 'user.login'),
                repo: _.get(data.base, 'repo.name'),
            },
        };
    }
}

export { GithubApiProvider };
