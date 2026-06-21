import { Link } from 'react-router-dom';
import { brand } from '../config/brand';

const Footer = () => {
    const { name, tagline, author, cta } = brand;

    return (
        <footer className="mt-20 border-t border-[var(--border)] bg-subtle">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    <div>
                        <p className="font-serif text-2xl text-accent mb-2">{name}</p>
                        <p className="text-secondary text-sm leading-relaxed max-w-xs">
                            {tagline}. Built by {author.name} as an interactive storefront demo.
                        </p>
                    </div>

                    <div>
                        <p className="label-caps mb-4">Explore</p>
                        <nav className="flex flex-col gap-2 text-sm text-[var(--text-primary)]">
                            <Link to="/" className="hover:text-accent transition-colors">
                                Shop
                            </Link>
                            <Link to="/about" className="hover:text-accent transition-colors">
                                About
                            </Link>
                            <Link to="/favorites" className="hover:text-accent transition-colors">
                                Favorites
                            </Link>
                            <Link to="/cart" className="hover:text-accent transition-colors">
                                Cart
                            </Link>
                        </nav>
                    </div>

                    <div>
                        <p className="label-caps mb-4">Contact</p>
                        <div className="flex flex-col gap-2 text-sm">
                            <a
                                href={author.phoneHref}
                                className="font-medium text-accent hover:underline underline-offset-2"
                            >
                                {author.phone}
                            </a>
                            <a
                                href={author.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-medium text-accent hover:underline underline-offset-2"
                            >
                                LinkedIn — {author.name}
                            </a>
                            <a
                                href={author.emailHref}
                                className="text-secondary hover:text-accent transition-colors"
                            >
                                {author.email}
                            </a>
                            <div className="flex gap-4 mt-2">
                                <a
                                    href={author.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-secondary hover:text-accent transition-colors"
                                >
                                    GitHub
                                </a>
                                <a
                                    href={author.telegram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-secondary hover:text-accent transition-colors"
                                >
                                    Telegram
                                </a>
                                <a
                                    href={author.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-secondary hover:text-accent transition-colors"
                                >
                                    Instagram
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-10 pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
                    <p>© {new Date().getFullYear()} {name}. All rights reserved.</p>
                    <p>{cta.subline}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
