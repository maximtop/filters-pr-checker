import { RestEndpointMethodTypes } from '@octokit/plugin-rest-endpoint-methods';

export type GetPullRequestResponse = RestEndpointMethodTypes['pulls']['get']['response'];

export interface GetPullRequestParams {
    owner: string,
    repo: string,
    pullNumber: number,
}
