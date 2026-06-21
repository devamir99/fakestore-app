const steps = [
    { id: 1, label: 'Shipping' },
    { id: 2, label: 'Review' },
    { id: 3, label: 'Payment' },
];

const stepActiveStyle = {
    backgroundColor: 'var(--accent)',
    color: 'var(--on-accent)',
    borderColor: 'var(--accent)',
};

const CheckoutSteps = ({ currentStep }) => {
    return (
        <ol className="flex items-center justify-center gap-2 sm:gap-4 mb-10">
            {steps.map((step, index) => {
                const isComplete = currentStep > step.id;
                const isCurrent = currentStep === step.id;
                const isActive = isComplete || isCurrent;

                return (
                    <li key={step.id} className="flex items-center gap-2 sm:gap-4">
                        <div className="flex items-center gap-2">
                            <span
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border transition-colors ${
                                    isActive ? '' : 'border-[var(--border)] text-muted'
                                }`}
                                style={isActive ? stepActiveStyle : undefined}
                            >
                                {isComplete ? (
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                ) : (
                                    step.id
                                )}
                            </span>
                            <span
                                className={`hidden sm:inline text-sm ${
                                    isCurrent ? 'text-accent font-medium' : 'text-muted'
                                }`}
                            >
                                {step.label}
                            </span>
                        </div>
                        {index < steps.length - 1 && (
                            <span
                                className="w-8 sm:w-12 h-px"
                                style={{
                                    backgroundColor: isComplete ? 'var(--accent)' : 'var(--border)',
                                }}
                                aria-hidden="true"
                            />
                        )}
                    </li>
                );
            })}
        </ol>
    );
};

export default CheckoutSteps;
