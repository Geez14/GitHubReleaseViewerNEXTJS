export interface GitHubAsset {
    id: number;
    url: string;
    name: string;
    content_type: string;
    size: number;
    download_count: number;
    created_at: string;
    updated_at: string;
    browser_download_url: string;
    uploader: {
        login: string;
        avatar_url: string;
    };
}

export interface GitHubRelease {
    id: number;
    tag_name: string;
    name: string;
    body: string;
    draft: boolean;
    prerelease: boolean;
    created_at: string;
    published_at: string;
    author: {
        login: string;
        avatar_url: string;
    };
    assets: GitHubAsset[];
    html_url: string;
    tarball_url: string;
    zipball_url: string;
}

export interface ApiResponse {
    data: GitHubRelease[];
    loading: boolean;
    error: string | null;
}
