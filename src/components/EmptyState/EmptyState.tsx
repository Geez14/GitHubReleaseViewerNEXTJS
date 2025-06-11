import React from 'react';
import { Package, RefreshCw } from 'lucide-react';

interface EmptyStateProps {
    title?: string;
    description?: string;
    onRefresh?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
    title = "No Release Selected",
    description = "Select a release from the sidebar to view its details and assets.",
    onRefresh
}) => {
    return (
        <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center max-w-md px-8">
                <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">{title}</h2>
                <p className="text-gray-600 mb-6">{description}</p>
                {onRefresh && (
                    <button
                        onClick={onRefresh}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mx-auto"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Refresh Releases
                    </button>
                )}
            </div>
        </div>
    );
};