import React from 'react';
import Image from 'next/image';
import { GitHubRelease } from '@/types/github';
import { formatDate } from '@/utils/dateUtils';
import { Tag, Calendar, User, ExternalLink } from 'lucide-react';

interface ReleaseHeaderProps {
    release: GitHubRelease;
}

export const ReleaseHeader: React.FC<ReleaseHeaderProps> = ({ release }) => {    return (
        <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-4">
                <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                        <div className="flex items-center gap-2 sm:gap-3">
                            <Tag className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 flex-shrink-0" />
                            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 break-words">
                                {release.name || release.tag_name}
                            </h1>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {release.prerelease && (
                                <span className="px-2 py-1 text-xs sm:text-sm bg-yellow-100 text-yellow-800 rounded-full whitespace-nowrap">
                                    Pre-release
                                </span>
                            )}
                            {release.draft && (
                                <span className="px-2 py-1 text-xs sm:text-sm bg-gray-100 text-gray-800 rounded-full whitespace-nowrap">
                                    Draft
                                </span>
                            )}
                        </div>
                    </div>
                    <p className="text-base sm:text-lg text-gray-600 break-all">{release.tag_name}</p>
                </div>                <div className="flex justify-end sm:justify-start flex-shrink-0">
                    <a
                        href={release.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm whitespace-nowrap"
                    >
                        <ExternalLink className="w-4 h-4" />
                        <span>GitHub</span>
                    </a>
                    {/* <a
                        href={release.zipball_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <Download className="w-4 h-4" />
                        Download ZIP
                    </a> */}
                </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-sm text-gray-600 mb-4 sm:mb-6">
                <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 flex-shrink-0" />
                    <span className="break-words">Published {formatDate(release.published_at || release.created_at)}</span>
                </div>
                <div className="flex items-center gap-2">
                    <User className="w-4 h-4 flex-shrink-0" />
                    <Image
                        src={release.author.avatar_url}
                        alt={release.author.login}
                        width={20}
                        height={20}
                        className="w-5 h-5 rounded-full flex-shrink-0"
                    />
                    <span className="break-words">{release.author.login}</span>
                </div>
            </div>
        </div>
    );
};
