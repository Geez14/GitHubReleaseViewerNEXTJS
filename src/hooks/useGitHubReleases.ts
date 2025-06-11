'use client';
import { useState, useEffect, useCallback } from 'react';
import { GitHubRelease } from '@/types/github';
import githubApi from '@/lib/githubApi';

interface UseGitHubReleasesReturn {
    releases: GitHubRelease[];
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}

export const useGitHubReleases = (): UseGitHubReleasesReturn => {
    const [releases, setReleases] = useState<GitHubRelease[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchReleases = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            // Check if required env vars are set
            const owner = process.env.NEXT_PUBLIC_GITHUB_REPO_OWNER;
            const repo = process.env.NEXT_PUBLIC_GITHUB_REPO_NAME;

            if (!owner || !repo) {
                throw new Error('GitHub repository configuration missing. Please set NEXT_PUBLIC_GITHUB_REPO_OWNER and NEXT_PUBLIC_GITHUB_REPO_NAME in .env.local');
            }

            const fetchedReleases = await githubApi.fetchReleases();
            setReleases(fetchedReleases);
        } catch (err) {
            console.error('Error fetching releases:', err);
            setError(err instanceof Error ? err.message : 'Failed to fetch releases');
            setReleases([]);
        } finally {
            setLoading(false);
        }
    }, []);

    const refetch = useCallback(async () => {
        await fetchReleases();
    }, [fetchReleases]);

    useEffect(() => {
        fetchReleases();
    }, [fetchReleases]);

    return {
        releases,
        loading,
        error,
        refetch
    };
};