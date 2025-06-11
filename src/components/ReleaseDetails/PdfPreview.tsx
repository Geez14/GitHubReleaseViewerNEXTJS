'use client';

import React, { useEffect, useState } from 'react';
import { GitHubAsset } from '@/types/github';
import { X, Download } from 'lucide-react';
import fetchAssetStream from '@/lib/streamFetchApi';

interface PdfPreviewProps {
    asset: GitHubAsset;
    onClose: () => void;
}

export const PdfPreview: React.FC<PdfPreviewProps> = ({ asset, onClose }) => {
    const [fileUrl, setFileUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const loadFile = async () => {
            try {

                setLoading(true);
                setError(null);
                console.log("calling server component on: " + `${asset.url}`)
                const url = await fetchAssetStream(asset.url, asset.content_type);
                if (isMounted) {
                    setFileUrl(url);
                }
            } catch (err) {
                console.error('Failed to load PDF:', err);
                if (isMounted) {
                    setError(err instanceof Error ? err.message : 'Failed to load PDF preview.');
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        loadFile();

        return () => {
            isMounted = false;
        };
    }, [asset.url, asset]);

    useEffect(() => {
        return () => {
            if (fileUrl) {
                URL.revokeObjectURL(fileUrl);
            }
        };
    }, [fileUrl]);
    const handleDownload = () => {
        if (fileUrl) {
            const link = document.createElement('a');
            link.href = fileUrl;
            link.download = asset.name;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-2 sm:p-4">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl h-full max-h-[95vh] sm:max-h-[90vh] flex flex-col">
                <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-200">
                    <div className="flex-1 min-w-0 mr-2">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">{asset.name}</h3>
                        <p className="text-xs sm:text-sm text-gray-600">PDF Preview</p>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2">
                        <button
                            onClick={handleDownload}
                            disabled={!fileUrl || loading}
                            className="flex items-center gap-1 sm:gap-2 px-2 py-1.5 sm:px-3 sm:py-2 bg-blue-600 text-white text-xs sm:text-sm rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="hidden sm:inline">Download</span>
                        </button>
                        <button
                            onClick={onClose}
                            className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                <div className="flex-1 p-2 sm:p-4">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center h-full">
                            <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-blue-600"></div>
                            <span className="ml-2 text-sm sm:text-base mt-2">Loading preview...</span>
                        </div>
                    ) : error ? (
                        <div className="flex flex-col items-center justify-center h-full text-center px-4">
                            <p className="text-red-600 mb-4 text-sm sm:text-base">{error}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="px-3 py-2 sm:px-4 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-sm"
                            >
                                Retry
                            </button>
                        </div>
                    ) : fileUrl ? (
                        <iframe
                            src={fileUrl}
                            className="w-full h-full border border-gray-300 rounded-md"
                            title={`Preview of ${asset.name}`}
                            allow="autoplay"
                        >
                        </iframe>
                    ) : null}
                </div>
            </div>
        </div>
    );
};
