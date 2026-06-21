import { useEffect } from 'react';
import { brand } from '../config/brand';

const DemoModal = ({ isOpen, onClose, title, message }) => {
    useEffect(() => {
        if (!isOpen) return;

        const handleEscape = (e) => {
            if (e.key === 'Escape') onClose();
        };

        document.body.style.overflow = 'hidden';
        document.addEventListener('keydown', handleEscape);

        return () => {
            document.body.style.overflow = '';
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const { cta, author, demo } = brand;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="demo-modal-title"
        >
            <button
                type="button"
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
                aria-label="Close dialog"
            />

            <div className="relative surface-card rounded-2xl p-8 max-w-md w-full animate-slide-up">
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute top-4 right-4 p-1 text-muted hover:text-accent transition-colors"
                    aria-label="Close"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <p className="text-xs uppercase tracking-widest text-muted mb-3">
                    {demo.label}
                </p>
                <h2 id="demo-modal-title" className="heading-display text-2xl mb-3 pr-6">
                    {title ?? demo.checkoutTitle}
                </h2>
                <p className="text-sm text-secondary leading-relaxed mb-8">
                    {message ?? demo.checkoutMessage}
                </p>

                <div className="flex flex-col gap-3">
                    <a href={cta.primary.href} className="btn-primary w-full">
                        {cta.primary.label}
                    </a>
                    <a
                        href={cta.secondary.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-outline w-full"
                    >
                        {cta.secondary.label}
                    </a>
                    <button type="button" onClick={onClose} className="btn-outline w-full">
                        Continue browsing
                    </button>
                </div>

                <p className="mt-6 text-center text-xs text-muted">
                    {author.name} · {author.role}
                </p>
            </div>
        </div>
    );
};

export default DemoModal;
