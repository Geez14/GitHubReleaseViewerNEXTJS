import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Custom404() {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push('/');
        }, 5000);

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            textAlign: 'center',
            padding: '20px'
        }}>
            <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>404</h1>
            <h2 style={{ marginBottom: '1rem' }}>Resource Not Found</h2>
            <p style={{ marginBottom: '2rem', color: '#666' }}>
                The requested resource could not be found. Please try again later.
            </p>
            <button
                onClick={() => router.push('/')}
                style={{
                    padding: '12px 24px',
                    backgroundColor: '#0070f3',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '16px'
                }}
            >
                Go Home
            </button>
            <p style={{ marginTop: '1rem', fontSize: '14px', color: '#999' }}>
                Redirecting to home page in 5 seconds...
            </p>
        </div>
    );
}