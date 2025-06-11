import { GitHubRelease } from "@/types/github";

export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

export const formatRelativeTime = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
    return `${Math.floor(diffInDays / 365)} years ago`;
};

export const groupReleasesByYear = (releases: GitHubRelease[]) => {
    return releases.reduce((acc, release) => {
        const year = new Date(release.published_at || release.created_at).getFullYear();
        if (!acc[year]) {
            acc[year] = [];
        }
        acc[year].push(release);
        return acc;
    }, {} as Record<number, GitHubRelease[]>);
};