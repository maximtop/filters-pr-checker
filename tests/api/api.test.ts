import { api } from '../../src/api';
import { githubApi } from '../../src/api/GithubApi';
import { GetPullRequestResponse } from '../../src/api/GithubApiInterfaces';

jest.mock('@actions/core');
jest.mock('@actions/github');

describe('api', () => {
    describe('getPullRequest', () => {
        it('picks data from pull request', async () => {
            const headOwner = 'headOwner';
            const headRepo = 'filtersHead';
            const baseOwner = 'baseOwner';
            const baseRepo = 'filtersBase';

            jest
                .spyOn(githubApi, 'getPullRequest')
                .mockResolvedValue({
                    status: 200,
                    data: {
                        head: {
                            user: {
                                login: headOwner,
                            },
                            repo: {
                                name: headRepo,
                            },
                        },
                        base: {
                            user: {
                                login: baseOwner,
                            },
                            repo: {
                                name: baseRepo,
                            },
                        },
                    },
                } as GetPullRequestResponse);

            const pullRequestData = await api.getPullRequest({ owner: 'test', repo: 'test', pullNumber: 1 });
            expect(pullRequestData).toEqual({
                head: {
                    owner: headOwner,
                    repo: headRepo,
                },
                base: {
                    owner: baseOwner,
                    repo: baseRepo,
                },
            });
        });
    });
});
