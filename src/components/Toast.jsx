import { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((message, type = 'info', duration = 3000) => {
        const id = Date.now();
        const toast = { id, message, type, duration };

        setToasts((prev) => [...prev, toast]);

        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, duration);
    }, []);

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ addToast, removeToast }}>
            {children}
            <ToastContainer toasts={toasts} removeToast={removeToast} />
        </ToastContext.Provider>
    );
};

const ToastContainer = ({ toasts, removeToast }) => {
    return (
        <div
            className="fixed top-20 right-4 z-[60] space-y-2 max-w-sm w-full pointer-events-none"
            aria-live="polite"
            aria-relevant="additions"
        >
            {toasts.map((toast) => (
                <div key={toast.id} className="pointer-events-auto">
                    <Toast toast={toast} onRemove={removeToast} />
                </div>
            ))}
        </div>
    );
};

const toastStyles = {
    success: 'border-coffee/20 dark:border-latte/30 bg-cream dark:bg-espresso-light text-[var(--text-primary)]',
    error: 'border-red-300/50 dark:border-red-500/30 bg-red-50 dark:bg-red-950/40 text-red-900 dark:text-red-200',
    warning: 'border-caramel/40 bg-cream-dark dark:bg-espresso-light text-[var(--text-primary)]',
    info: 'border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)]',
};

const Toast = ({ toast, onRemove }) => {
    const style = toastStyles[toast.type] ?? toastStyles.info;

    return (
        <div
            role="status"
            className={`surface-card rounded-lg px-4 py-3 shadow-md animate-slide-up border ${style}`}
        >
            <div className="flex items-start justify-between gap-3">
                <span className="text-sm font-medium leading-snug">{toast.message}</span>
                <button
                    type="button"
                    onClick={() => onRemove(toast.id)}
                    className="shrink-0 p-0.5 text-stone-muted hover:text-coffee dark:hover:text-latte transition-colors"
                    aria-label="Dismiss notification"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};
