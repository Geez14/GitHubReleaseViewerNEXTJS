import React, { useState} from 'react';
import { GitHubAsset } from '@/types/github';
import { formatFileSize, getFileIcon, isPdfFile } from '@/utils/fileUtils';
import { formatDate } from '@/utils/dateUtils';
import { Download, Eye, Calendar, User, BarChart3 } from 'lucide-react';
import fetchAssetStream from '@/lib/streamFetchApi';

interface AssetItemProps {
    asset: GitHubAsset;
    onPreview?: () => void;
}

export const AssetItem: React.FC<AssetItemProps> = ({ asset, onPreview }) => {
    const [clicked, setClicked] = useState<boolean>(false);

    const handleDownload = async () => {
        if (clicked) {
            const cachedUrl = localStorage.getItem(asset.url);
            if (cachedUrl) {
                // Use cached URL
                const link = document.createElement('a');
                link.href = cachedUrl;
                link.download = asset.name;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                return;
            }
        }
        // Fetch new URL if not cached
        else {
            try {
                setClicked(true);
                console.log("calling server component on: " + asset.url);
                const url = await fetchAssetStream(asset.url, asset.content_type);

                // Store the URL in localStorage
                localStorage.setItem(asset.url, url);

                // Download the file
                const link = document.createElement('a');
                link.href = url;
                link.download = asset.name;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } catch (err) {
                console.error('Failed to load file:', err);
                setClicked(false);
            }
        }
    };
    return (
        <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                    <span className="text-2xl flex-shrink-0">{getFileIcon(asset.name, asset.content_type)}</span>
                    <div className="min-w-0 flex-1">
                        <h3 className="font-medium text-gray-900 truncate" title={asset.name}>
                            {asset.name}
                        </h3>
                        <p className="text-sm text-gray-500">{formatFileSize(asset.size)}</p>
                    </div>
                </div>
            </div>

            <div className="space-y-2 text-xs text-gray-600 mb-4">
                <div className="flex items-center gap-2">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(asset.created_at)}</span>
                </div>
                <div className="flex items-center gap-2">
                    <User className="w-3 h-3" />
                    <span>{asset.uploader.login}</span>
                </div>
                <div className="flex items-center gap-2">
                    <BarChart3 className="w-3 h-3" />
                    <span>{asset.download_count} downloads</span>
                </div>
            </div>

            <div className="flex gap-2">
                <button
                    onClick={handleDownload}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                >
                    <Download className="w-4 h-4" />
                    Download
                </button>

                {onPreview && isPdfFile(asset) && (
                    <button
                        onClick={onPreview}
                        className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 text-sm rounded-md hover:bg-gray-200 transition-colors"
                    >
                        <Eye className="w-4 h-4" />
                        Preview
                    </button>
                )}
            </div>
        </div>
    );
};