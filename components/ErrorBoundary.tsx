/**
 * Error Boundary Component
 * Catches runtime errors in React component tree and displays fallback UI
 * Following React best practices and production resilience principles
 */

'use client';

import { Component, ReactNode } from 'react';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
    onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface State {
    hasError: boolean;
    error?: Error;
}

/**
 * Error Boundary that catches JavaScript errors anywhere in the child component tree
 * Logs errors and displays a fallback UI instead of crashing the whole app
 */
export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        // Update state so the next render shows the fallback UI
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        // Log error to console in development
        if (process.env.NODE_ENV === 'development') {
            console.error('Error caught by ErrorBoundary:', error, errorInfo);
        }

        // Call custom error handler if provided
        this.props.onError?.(error, errorInfo);

        // In production, you would send this to an error reporting service
        // Example: Sentry.captureException(error, { extra: errorInfo });
    }

    render() {
        if (this.state.hasError) {
            // Render custom fallback if provided
            if (this.props.fallback) {
                return this.props.fallback;
            }

            // Default fallback UI
            return (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '50vh',
                    padding: '2rem',
                    textAlign: 'center',
                }}>
                    <div style={{
                        fontSize: '4rem',
                        marginBottom: '1rem',
                    }}>
                        ⚠️
                    </div>
                    <h1 style={{
                        fontSize: '1.5rem',
                        fontWeight: 600,
                        marginBottom: '0.5rem',
                        color: 'var(--text-primary)',
                    }}>
                        Oops! Something went wrong
                    </h1>
                    <p style={{
                        fontSize: '1rem',
                        color: 'var(--text-secondary)',
                        marginBottom: '1.5rem',
                        maxWidth: '500px',
                    }}>
                        We're sorry for the inconvenience. Please try refreshing the page or contact support if the problem persists.
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        style={{
                            padding: '0.75rem 1.5rem',
                            fontSize: '1rem',
                            fontWeight: 500,
                            color: 'white',
                            background: 'var(--accent-gradient)',
                            border: 'none',
                            borderRadius: 'var(--radius-md)',
                            cursor: 'pointer',
                            transition: 'transform 0.2s',
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = 'scale(1.05)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                        }}
                    >
                        Refresh Page
                    </button>
                    {process.env.NODE_ENV === 'development' && this.state.error && (
                        <details style={{
                            marginTop: '2rem',
                            padding: '1rem',
                            background: 'var(--glass-bg)',
                            borderRadius: 'var(--radius-md)',
                            textAlign: 'left',
                            maxWidth: '600px',
                            width: '100%',
                        }}>
                            <summary style={{
                                cursor: 'pointer',
                                fontWeight: 600,
                                marginBottom: '0.5rem',
                            }}>
                                Error Details (Development Only)
                            </summary>
                            <pre style={{
                                fontSize: '0.875rem',
                                overflow: 'auto',
                                padding: '1rem',
                                background: 'rgba(0,0,0,0.05)',
                                borderRadius: '4px',
                            }}>
                                {this.state.error.toString()}
                            </pre>
                        </details>
                    )}
                </div>
            );
        }

        return this.props.children;
    }
}

/**
 * Custom fallback component for more specific error scenarios
 */
export function ErrorFallback({
    title = 'Something went wrong',
    message = 'Please try again later',
    onRetry,
}: {
    title?: string;
    message?: string;
    onRetry?: () => void;
}) {
    return (
        <div className="error-fallback">
            <div className="error-icon">⚠️</div>
            <h2>{title}</h2>
            <p>{message}</p>
            {onRetry && (
                <button onClick={onRetry} className="btn btn-primary">
                    Try Again
                </button>
            )}
        </div>
    );
}

export default ErrorBoundary;
