export const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const getFileIcon = (fileName: string, contentType: string): string => {
    const extension = fileName.split('.').pop()?.toLowerCase();

    if (contentType.includes('pdf') || extension === 'pdf') return '📄';
    if (contentType.includes('image') || ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension || '')) return '🖼️';
    if (contentType.includes('video') || ['mp4', 'avi', 'mov', 'wmv'].includes(extension || '')) return '🎥';
    if (contentType.includes('audio') || ['mp3', 'wav', 'flac', 'aac'].includes(extension || '')) return '🎵';
    if (['zip', 'rar', '7z', 'tar', 'gz'].includes(extension || '')) return '📦';
    if (['doc', 'docx'].includes(extension || '')) return '📝';
    if (['xls', 'xlsx'].includes(extension || '')) return '📊';
    return '📎';
};

export const isPdfFile = (asset: { name: string; content_type: string }): boolean => {
    return asset.content_type.includes('pdf') || asset.name.toLowerCase().endsWith('.pdf');
};