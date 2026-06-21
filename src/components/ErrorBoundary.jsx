import React from 'react';
import { brand } from '../config/brand';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            const { cta, author } = brand;

            return (
                <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
                    <div className="surface-card rounded-xl p-10 md:p-12 max-w-md mx-auto">
                        <svg
                            className="w-14 h-14 text-muted mx-auto mb-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z"
                            />
                        </svg>
                        <h1 className="heading-display text-2xl mb-3">Something went wrong</h1>
                        <p className="text-sm text-secondary mb-8 leading-relaxed">
                            An unexpected error occurred. Refresh the page to try again, or reach out if
                            the issue persists.
                        </p>
                        <div className="flex flex-col gap-3">
                            <button
                                type="button"
                                onClick={() => window.location.reload()}
                                className="btn-primary w-full"
                            >
                                Refresh page
                            </button>
                            <a href={cta.primary.href} className="btn-outline w-full">
                                {cta.primary.label}
                            </a>
                        </div>
                        <p className="mt-6 text-xs text-muted">
                            {author.name} · {author.email}
                        </p>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
