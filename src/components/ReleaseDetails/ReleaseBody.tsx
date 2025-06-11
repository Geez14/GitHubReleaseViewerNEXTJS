import React from 'react';
import { GitHubRelease } from '@/types/github';
import { FileText } from 'lucide-react';

interface ReleaseBodyProps {
    release: GitHubRelease;
}

export const ReleaseBody: React.FC<ReleaseBodyProps> = ({ release }) => {
    if (!release.body) return null;

    return (
        <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-gray-600" />
                <h2 className="text-xl font-semibold text-gray-900">Release Notes</h2>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <div className="prose prose-sm max-w-none">
                    {release.body.split('\n').map((line, index) => (
                        <p key={index} className="mb-2 text-gray-700">
                            {line || '\u00A0'}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );
};