import React from 'react';
import { GitHubAsset } from '@/types/github';
import { formatFileSize, getFileIcon, isPdfFile } from '@/utils/fileUtils';
import { formatDate } from '@/utils/dateUtils';
import { Download, Eye, Calendar, User, BarChart3 } from 'lucide-react';

interface AssetItemProps {
    asset: GitHubAsset;
    onPreview?: () => void;
}

export const AssetItem: React.FC<AssetItemProps> = ({ asset, onPreview }) => {
    return (
        <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
                <div className="ilex items-center gap-2">
                    <span className="text-2xl">{getFileIcon(asset.name, asset.content_type)}</span>
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
                <a
                    href={asset.browser_download_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                >
                    <Download className="w-4 h-4" />
                    Download
                </a>

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