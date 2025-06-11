'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/Sidebar/Sidebar';
import { ReleaseDetails } from '@/components/ReleaseDetails/ReleaseDetail';
import { EmptyState } from '@/components/EmptyState/EmptyState';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorMessage } from '@/components/ErrorMessage';
import { useGitHubReleases } from '@/hooks/useGitHubReleases';
import { GitHubRelease } from '@/types/github';
import { RefreshCw } from 'lucide-react';
import { GitHubIcon } from '@/icons/Icons';

export default function HomePage() {
  const { releases, loading, error, refetch } = useGitHubReleases();
  const [selectedRelease, setSelectedRelease] = useState<GitHubRelease | null>(null);

  // Auto-select first release when releases are loaded
  React.useEffect(() => {
    if (releases.length > 0 && !selectedRelease) {
      setSelectedRelease(releases[0]);
    }
  }, [releases, selectedRelease]);

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center">
        <ErrorMessage message={error} onRetry={refetch} />
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <GitHubIcon className="w-8 h-8 text-gray-900" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">GitHub Releases</h1>
              <p className="text-sm text-gray-600">
                {process.env.NEXT_PUBLIC_GITHUB_REPO_OWNER}/{process.env.NEXT_PUBLIC_GITHUB_REPO_NAME}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {!loading && (
              <button
                onClick={refetch}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        <Sidebar
          releases={releases}
          selectedRelease={selectedRelease}
          onReleaseSelect={setSelectedRelease}
          loading={loading}
        />

        <main className="flex-1 flex">
          {loading && !releases.length ? (
            <div className="flex-1 flex items-center justify-center">
              <LoadingSpinner size="large" text="Loading releases..." />
            </div>
          ) : selectedRelease ? (
            <ReleaseDetails release={selectedRelease} />
          ) : (
            <EmptyState
              title="No Release Selected"
              description="Select a release from the sidebar to view its details and download assets."
              onRefresh={releases.length === 0 ? refetch : undefined}
            />
          )}
        </main>
      </div>
    </div>
  );
}