import React from 'react';
import { GitHubRelease } from '@/types/github';
import { formatRelativeTime } from '@/utils/dateUtils';
import { Tag, Calendar, User, FileText } from 'lucide-react';

interface ReleaseItemProps {
    release: GitHubRelease;
    isSelected: boolean;
    onSelect: () => void;
}

export const ReleaseItem: React.FC<ReleaseItemProps> = ({
    release,
    isSelected,
    onSelect
}) => {
    return (
        <div
            className={`p-4 rounded-lg cursor-pointer transition-all duration-200 border-2 ${isSelected
                ? 'bg-blue-50 border-blue-300 shadow-md'
                : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm'
                }`}
            onClick={onSelect}
        >
            <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-blue-600" />
                    <span className="font-semibold text-gray-900 truncate">
                        {release.name || release.tag_name}
                    </span>
                </div>
                {release.prerelease && (
                    <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                        Pre-release
                    </span>
                )}
            </div>

            <div className="space-y-1 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                    <Calendar className="w-3 h-3" />
                    <span>{formatRelativeTime(release.published_at || release.created_at)}</span>
                </div>

                <div className="flex items-center gap-2">
                    <User className="w-3 h-3" />
                    <span>{release.author.login}</span>
                </div>

                <div className="flex items-center gap-2">
                    <FileText className="w-3 h-3" />
                    <span>{release.assets.length} asset{release.assets.length !== 1 ? 's' : ''}</span>
                </div>
            </div>

            {release.body && (
                <p className="mt-2 text-xs text-gray-500 line-clamp-2">
                    {release.body.length > 100
                        ? `${release.body.substring(0, 100)}...`
                        : release.body
                    }
                </p>
            )}
        </div>
    );
};