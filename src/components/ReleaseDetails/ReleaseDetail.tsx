import React from 'react';
import { GitHubRelease } from '@/types/github';
import { ReleaseHeader } from './ReleaseHeader';
import { ReleaseBody } from './ReleaseBody';
import { AssetsList } from './AssetsList';

interface ReleaseDetailsProps {
    release: GitHubRelease;
}

export const ReleaseDetails: React.FC<ReleaseDetailsProps> = ({ release }) => {
    return (
        <div className="flex-1 bg-white overflow-y-auto">
            <div className="max-w-4xl mx-auto p-8">
                <ReleaseHeader release={release} />
                <ReleaseBody release={release} />
                <AssetsList assets={release.assets} />
            </div>
        </div>
    );
};
