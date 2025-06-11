import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const owner = searchParams.get('owner');
    const repo = searchParams.get('repo');
    const page = searchParams.get('page') || '1';
    const per_page = searchParams.get('per_page') || '10';

    if (!owner || !repo) {
        return NextResponse.json(
            { error: 'Owner and repo parameters are required' },
            { status: 400 }
        );
    }

    try {
        const githubUrl = `https://api.github.com/repos/${owner}/${repo}/releases?page=${page}&per_page=${per_page}`;

        const response = await fetch(githubUrl, {
            headers: {
                'Accept': 'application/vnd.github.v3+json',
                'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
                'X-GitHub-Api-Version': '2022-11-28',
                'User-Agent': 'github-releases-viewer'
            }
        });

        if (!response.ok) {
            console.error('GitHub API Error:', response.status, response.statusText);
            return NextResponse.json(
                { error: `GitHub API error: ${response.status}` },
                { status: response.status }
            );
        }

        const releases = await response.json();

        return NextResponse.json(releases, {
            headers: {
                'Cache-Control': 'public, max-age=300'
            }
        });
    } catch (error) {
        console.error('Error fetching GitHub releases:', error);
        return NextResponse.json(
            { error: 'Failed to fetch releases' },
            { status: 500 }
        );
    }
}
