export default async function fetchAssetStream(githubUrl: string, content_type:string): Promise<string> {
    try {
        // Use your Next.js API route instead of direct GitHub API call
        const response = await fetch(`/api/github-asset?url=${encodeURIComponent(githubUrl)}`);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `HTTP ${response.status}`);
        }
        const arrayBuffer = await response.arrayBuffer();
        const blob = new Blob([arrayBuffer], { type: content_type });
        const blobUrl = URL.createObjectURL(blob);
        return blobUrl;
    } catch (error) {
        console.error('Error fetching asset:', error);
        throw new Error(`Failed to fetch asset: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}