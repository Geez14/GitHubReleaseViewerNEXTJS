import React from 'react';
import { GitHubRelease } from '@/types/github';
import { ReleaseItem } from './ReleaseItem';
import { groupReleasesByYear } from '@/utils/dateUtils';
import { LoadingSpinner } from '../LoadingSpinner';

interface ReleaseTimelineProps {
    releases: GitHubRelease[];
    selectedRelease: GitHubRelease | null;
    onReleaseSelect: (release: GitHubRelease) => void;
    loading: boolean;
}

export const ReleaseTimeline: React.FC<ReleaseTimelineProps> = ({
    releases,
    selectedRelease,
    onReleaseSelect,
    loading
}) => {
    if (loading) {
        return <LoadingSpinner size="small" text="Loading releases..." />;
    }

    if (releases.length === 0) {
        return (
            <div className="text-center py-8">
                <p className="text-gray-500">No releases found</p>
            </div>
        );
    }

    const groupedReleases = groupReleasesByYear(releases);
    const years = Object.keys(groupedReleases)
        .map(Number)
        .sort((a, b) => b - a);

    return (
        <div className="space-y-6">
            {years.map(year => (
                <div key={year} className="space-y-3">
                    <h3 className="text-lg font-semibold text-gray-800 sticky top-0 bg-gray-50 py-2">
                        {year}
                    </h3>
                    <div className="space-y-2 pl-4 border-l-2 border-gray-200">
                        {groupedReleases[year]
                            .sort((a, b) => new Date(b.published_at || b.created_at).getTime() - new Date(a.published_at || a.created_at).getTime())
                            .map(release => (
                                <ReleaseItem
                                    key={release.id}
                                    release={release}
                                    isSelected={selectedRelease?.id === release.id}
                                    onSelect={() => onReleaseSelect(release)}
                                />
                            ))
                        }
                    </div>
                </div>
            ))}
        </div>
    );
};
