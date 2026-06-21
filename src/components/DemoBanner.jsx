import { brand } from '../config/brand';

const DemoBanner = () => {
    const { demo, author, cta } = brand;

    return (
        <div
            className="text-sm py-2.5 px-4"
            style={{ backgroundColor: 'var(--banner-bg)', color: 'var(--banner-text)' }}
        >
            <div className="container mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-center">
                <span className="opacity-95">
                    {demo.label} · {demo.message}
                </span>
                <span className="hidden sm:inline opacity-40">|</span>
                <div className="flex items-center gap-4">
                    <a
                        href={cta.primary.href}
                        className="font-medium underline-offset-2 hover:underline"
                    >
                        {cta.primary.label}
                    </a>
                    <a
                        href={cta.secondary.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium underline-offset-2 hover:underline"
                    >
                        {cta.secondary.label}
                    </a>
                    <span className="hidden md:inline opacity-75 text-xs">
                        {author.name}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default DemoBanner;
