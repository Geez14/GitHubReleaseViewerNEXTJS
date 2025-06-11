import { GitHubAsset, GitHubRelease } from "@/types/github";

export interface GitHubApiConfig {
    owner: string;
    repo: string;
    perPage?: number;
}

export class GitHubApiService {
    private config: GitHubApiConfig;

    constructor(config: GitHubApiConfig) {
        this.config = config;
    }

    async fetchReleases(page: number = 1): Promise<GitHubRelease[]> {
        try {
            // Use your Next.js API route instead of direct GitHub API
            const response = await fetch(
                `/api/github-releases?owner=${this.config.owner}&repo=${this.config.repo}&page=${page}&per_page=${this.config.perPage || 10}`
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `HTTP ${response.status}`);
            }

            const releases = await response.json();
            return releases;
        } catch (error) {
            console.error('Error fetching releases:', error);
            throw new Error(`Failed to fetch releases: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    async fetchReleaseAssets(releaseId: number): Promise<GitHubAsset[]> {
        try {
            const response = await fetch(
                `/api/github-releases?owner=${this.config.owner}&repo=${this.config.repo}&release_id=${releaseId}`
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `HTTP ${response.status}`);
            }
            const assets = await response.json();
            return assets;
        } catch (error) {
            console.error('Error fetching release assets:', error);
            throw new Error(`Failed to fetch assets: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
}
// Create default instance
const githubApi = new GitHubApiService({
    owner: process.env.NEXT_PUBLIC_GITHUB_REPO_OWNER || '',
    repo: process.env.NEXT_PUBLIC_GITHUB_REPO_NAME || '',
    perPage: 20
});

export default githubApi;