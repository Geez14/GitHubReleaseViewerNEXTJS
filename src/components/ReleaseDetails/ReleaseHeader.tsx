import React from 'react';
import Image from 'next/image';
import { GitHubRelease } from '@/types/github';
import { formatDate } from '@/utils/dateUtils';
import { Tag, Calendar, User, ExternalLink, Download } from 'lucide-react';

interface ReleaseHeaderProps {
    release: GitHubRelease;
}

export const ReleaseHeader: React.FC<ReleaseHeaderProps> = ({ release }) => {
    return (
        <div className="mb-8">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <Tag className="w-6 h-6 text-blue-600" />
                        <h1 className="text-3xl font-bold text-gray-900">
                            {release.name || release.tag_name}
                        </h1>
                        {release.prerelease && (
                            <span className="px-3 py-1 text-sm bg-yellow-100 text-yellow-800 rounded-full">
                                Pre-release
                            </span>
                        )}
                        {release.draft && (
                            <span className="px-3 py-1 text-sm bg-gray-100 text-gray-800 rounded-full">
                                Draft
                            </span>
                        )}
                    </div>
                    <p className="text-lg text-gray-600">{release.tag_name}</p>
                </div>

                <div className="flex gap-2">
                    <a
                        href={release.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                        <ExternalLink className="w-4 h-4" />
                        View on GitHub
                    </a>
                    <a
                        href={release.zipball_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <Download className="w-4 h-4" />
                        Download ZIP
                    </a>
                </div>
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-600 mb-6">
                <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Published {formatDate(release.published_at || release.created_at)}</span>
                </div>
                <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />

                    <Image
                        src={release.author.avatar_url}
                        alt={release.author.login}
                        width={20}
                        height={20}
                        className="w-5 h-5 rounded-full"
                    />
                    <span>{release.author.login}</span>
                </div>
            </div>
        </div>
    );
};
