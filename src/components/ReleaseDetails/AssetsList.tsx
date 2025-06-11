import React, { useState } from 'react';
import { GitHubAsset } from '@/types/github';
import { AssetItem } from './AssetItem';
import { PdfPreview } from './PdfPreview';
import { Package, Filter } from 'lucide-react';
import { isPdfFile } from '@/utils/fileUtils';

interface AssetsListProps {
    assets: GitHubAsset[];
}

export const AssetsList: React.FC<AssetsListProps> = ({ assets }) => {
    const [selectedAsset, setSelectedAsset] = useState<GitHubAsset | null>(null);
    const [filter, setFilter] = useState<'all' | 'pdf' | 'other'>('all');

    if (assets.length === 0) {
        return (
            <div className="text-center py-8">
                <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No assets available for this release</p>
            </div>
        );
    }

    const filteredAssets = assets.filter(asset => {
        if (filter === 'pdf') return isPdfFile(asset);
        if (filter === 'other') return !isPdfFile(asset);
        return true;
    });

    const pdfAssets = assets.filter(isPdfFile);

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-gray-600" />
                    <h2 className="text-xl font-semibold text-gray-900">
                        Assets ({assets.length})
                    </h2>
                </div>

                <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-gray-500" />
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value as 'all' | 'pdf' | 'other')}
                        className="px-3 py-1 border border-gray-300 rounded-md text-sm"
                    >
                        <option value="all">All Assets</option>
                        <option value="pdf">PDF Files ({pdfAssets.length})</option>
                        <option value="other">Other Files ({assets.length - pdfAssets.length})</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {filteredAssets.map(asset => (
                    <AssetItem
                        key={asset.id}
                        asset={asset}
                        onPreview={isPdfFile(asset) ? () => setSelectedAsset(asset) : undefined}
                    />
                ))}
            </div>

            {selectedAsset && isPdfFile(selectedAsset) && (
                <PdfPreview
                    asset={selectedAsset}
                    onClose={() => setSelectedAsset(null)}
                />
            )}
        </div>
    );
};
