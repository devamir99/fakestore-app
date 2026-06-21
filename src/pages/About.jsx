import { Link } from 'react-router-dom';
import { brand } from '../config/brand';
import ContactCTA from '../components/ContactCTA';
import { usePageMeta } from '../hooks/usePageMeta';

const About = () => {
    const { about, author } = brand;

    usePageMeta({
        title: 'About',
        description: `Learn about ${brand.name} — a curated storefront demo built by ${author.name}.`,
    });

    return (
        <div className="max-w-3xl mx-auto animate-fade-in">
            <p className="label-caps mb-4">
                About {brand.name}
            </p>
            <h1 className="heading-display text-4xl md:text-5xl mb-6">{about.title}</h1>
            <p className="text-base md:text-lg text-secondary leading-relaxed mb-8">
                {about.intro}
            </p>

            <div className="space-y-6 text-sm text-secondary leading-relaxed mb-16">
                {about.story.map((paragraph) => (
                    <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                ))}
            </div>

            <section className="mb-16">
                <h2 className="heading-display text-2xl mb-8">What we stand for</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {about.values.map((value) => (
                        <div key={value.title} className="surface-card rounded-xl p-6">
                            <h3 className="text-sm font-medium mb-2">{value.title}</h3>
                            <p className="text-xs text-secondary leading-relaxed">
                                {value.text}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="surface-card rounded-xl p-8 mb-16">
                <p className="text-xs uppercase tracking-widest text-muted mb-3">
                    Behind the build
                </p>
                <h2 className="heading-display text-xl mb-3">{author.name}</h2>
                <p className="text-sm text-secondary leading-relaxed mb-6">
                    {author.role} crafting front-end experiences with attention to layout, performance,
                    and detail. This demo is part of a portfolio of interactive storefront concepts —
                    available to adapt for your products, brand, and customers.
                </p>
                <div className="flex flex-wrap gap-3">
                    <a href={brand.cta.primary.href} className="btn-primary">
                        {brand.cta.primary.label}
                    </a>
                    <a
                        href={brand.cta.secondary.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-outline"
                    >
                        {brand.cta.secondary.label}
                    </a>
                    <Link to="/" className="btn-outline">
                        View shop
                    </Link>
                </div>
            </section>

            <ContactCTA />
        </div>
    );
};

export default About;
