'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/Sidebar/Sidebar';
import { ReleaseDetails } from '@/components/ReleaseDetails/ReleaseDetail';
import { EmptyState } from '@/components/EmptyState/EmptyState';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorMessage } from '@/components/ErrorMessage';
import { useGitHubReleases } from '@/hooks/useGitHubReleases';
import { GitHubRelease } from '@/types/github';
import { RefreshCw, Package } from 'lucide-react';
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
      <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <GitHubIcon className="w-6 h-6 sm:w-8 sm:h-8 text-gray-900 flex-shrink-0" />
            <div className="min-w-0">
              <h1 className="text-lg sm:text-2xl font-bold text-gray-900 truncate">GitHub Releases</h1>
              <p className="text-xs sm:text-sm text-gray-600 truncate">
                {process.env.NEXT_PUBLIC_GITHUB_REPO_OWNER}/{process.env.NEXT_PUBLIC_GITHUB_REPO_NAME}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
            {!loading && (
              <button
                onClick={refetch}
                className="flex items-center gap-1 sm:gap-2 px-2 py-1.5 sm:px-4 sm:py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
              >
                <RefreshCw className="w-4 h-4" />
                <span className="hidden sm:inline">Refresh</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Mobile: Sidebar becomes horizontal scrollable list */}
        <div className="md:hidden bg-gray-50 border-b border-gray-200 p-4">
          <div className="flex items-center gap-3 mb-3">
            <Package className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-bold text-gray-900">Releases</h2>
            <span className="text-sm text-gray-600">
              ({releases.length})
            </span>
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2">
            {releases.map((release) => (
              <button
                key={release.id}
                onClick={() => setSelectedRelease(release)}
                className={`flex-shrink-0 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedRelease?.id === release.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {release.name || release.tag_name}
              </button>
            ))}
          </div>
        </div>

        {/* Desktop: Traditional sidebar */}
        <div className="hidden md:block">
          <Sidebar
            releases={releases}
            selectedRelease={selectedRelease}
            onReleaseSelect={setSelectedRelease}
            loading={loading}
          />
        </div>

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