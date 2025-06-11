import React from 'react';
import { GitHubRelease } from '@/types/github';
import { ReleaseTimeline } from './ReleaseTimeline';

import { Calendar, Package } from 'lucide-react';

interface SidebarProps {
    releases: GitHubRelease[];
    selectedRelease: GitHubRelease | null;
    onReleaseSelect: (release: GitHubRelease) => void;
    loading: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
    releases,
    selectedRelease,
    onReleaseSelect,
    loading
}) => {
    return (
        <div className="w-80 bg-gray-50 border-r border-gray-200 h-full overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
                <div className="flex items-center gap-3 mb-2">
                    <Package className="w-6 h-6 text-blue-600" />
                    <h2 className="text-xl font-bold text-gray-900">Releases</h2>
                </div>
                <p className="text-sm text-gray-600">
                    {releases.length} release{releases.length !== 1 ? 's' : ''} available
                </p>
            </div>

            <div className="p-4">
                <div className="flex items-center gap-2 mb-4">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">Timeline</span>
                </div>

                <ReleaseTimeline
                    releases={releases}
                    selectedRelease={selectedRelease}
                    onReleaseSelect={onReleaseSelect}
                    loading={loading}
                />
            </div>
        </div>
    );
};