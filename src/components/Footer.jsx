import { Link } from 'react-router-dom';
import { brand } from '../config/brand';

const Footer = () => {
    const { name, tagline, author, cta } = brand;

    return (
        <footer className="mt-20 border-t border-[var(--border)] bg-cream-dark dark:bg-espresso-light">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    <div>
                        <p className="font-serif text-2xl text-coffee dark:text-latte mb-2">
                            {name}
                        </p>
                        <p className="text-stone-muted dark:text-latte/70 text-sm leading-relaxed max-w-xs">
                            {tagline}. Built by {author.name} as an interactive storefront demo.
                        </p>
                    </div>

                    <div>
                        <p className="text-xs uppercase tracking-widest text-stone-muted dark:text-latte/60 mb-4">
                            Explore
                        </p>
                        <nav className="flex flex-col gap-2 text-sm">
                            <Link to="/" className="hover:text-coffee dark:hover:text-latte transition-colors">
                                Shop
                            </Link>
                            <Link to="/about" className="hover:text-coffee dark:hover:text-latte transition-colors">
                                About
                            </Link>
                            <Link to="/favorites" className="hover:text-coffee dark:hover:text-latte transition-colors">
                                Favorites
                            </Link>
                            <Link to="/cart" className="hover:text-coffee dark:hover:text-latte transition-colors">
                                Cart
                            </Link>
                        </nav>
                    </div>

                    <div>
                        <p className="text-xs uppercase tracking-widest text-stone-muted dark:text-latte/60 mb-4">
                            Contact
                        </p>
                        <div className="flex flex-col gap-2 text-sm">
                            <a
                                href={author.phoneHref}
                                className="font-medium text-coffee dark:text-latte hover:underline underline-offset-2"
                            >
                                {author.phone}
                            </a>
                            <a
                                href={author.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-medium text-coffee dark:text-latte hover:underline underline-offset-2"
                            >
                                LinkedIn — {author.name}
                            </a>
                            <a
                                href={author.emailHref}
                                className="text-stone-muted dark:text-latte/70 hover:text-coffee dark:hover:text-latte transition-colors"
                            >
                                {author.email}
                            </a>
                            <div className="flex gap-4 mt-2">
                                <a
                                    href={author.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-stone-muted dark:text-latte/70 hover:text-coffee dark:hover:text-latte transition-colors"
                                    aria-label="GitHub"
                                >
                                    GitHub
                                </a>
                                <a
                                    href={author.telegram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-stone-muted dark:text-latte/70 hover:text-coffee dark:hover:text-latte transition-colors"
                                    aria-label="Telegram"
                                >
                                    Telegram
                                </a>
                                <a
                                    href={author.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-stone-muted dark:text-latte/70 hover:text-coffee dark:hover:text-latte transition-colors"
                                    aria-label="Instagram"
                                >
                                    Instagram
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-10 pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-muted dark:text-latte/50">
                    <p>© {new Date().getFullYear()} {name}. All rights reserved.</p>
                    <p>{cta.subline}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
