import { brand } from '../config/brand';

const ContactCTA = ({ variant = 'section' }) => {
    const { cta, author } = brand;

    if (variant === 'compact') {
        return (
            <div className="flex flex-wrap gap-3">
                <a href={cta.primary.href} className="btn-primary">
                    {cta.primary.label}
                </a>
                <a
                    href={cta.secondary.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline"
                >
                    {cta.secondary.label}
                </a>
            </div>
        );
    }

    return (
        <section className="surface-card rounded-2xl p-8 md:p-12 text-center">
            <p className="label-caps mb-3">Custom builds</p>
            <h2 className="heading-display text-2xl md:text-3xl mb-3">{cta.headline}</h2>
            <p className="text-secondary max-w-md mx-auto mb-8 text-sm leading-relaxed">
                {cta.subline}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
                <a href={cta.primary.href} className="btn-primary">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {cta.primary.label}
                </a>
                <a
                    href={cta.secondary.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline"
                >
                    {cta.secondary.label}
                </a>
            </div>
            <p className="mt-6 text-xs text-muted">
                {author.name} · {author.role}
            </p>
        </section>
    );
};

export default ContactCTA;
