import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FavoritesContext } from '../context/FavoritesContext';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { brand } from '../config/brand';

const Navbar = () => {
    const { favorites } = useContext(FavoritesContext);
    const { getCartItemsCount } = useCart();
    const { isDark, toggleTheme } = useTheme();
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    const navLinks = [
        { to: '/', label: 'Shop' },
        { to: '/favorites', label: 'Favorites', badge: favorites.length },
        { to: '/cart', label: 'Cart', badge: getCartItemsCount() },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <header className="sticky top-0 z-50 bg-cream/90 dark:bg-espresso/90 backdrop-blur-md border-b border-[var(--border)]">
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                <Link
                    to="/"
                    className="font-serif text-2xl text-coffee dark:text-latte tracking-tight"
                    onClick={() => setMenuOpen(false)}
                >
                    {brand.name}
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map(({ to, label, badge }) => (
                        <Link
                            key={to}
                            to={to}
                            className={`relative text-sm font-medium transition-colors ${
                                isActive(to)
                                    ? 'text-coffee dark:text-latte'
                                    : 'text-stone-muted dark:text-latte/70 hover:text-coffee dark:hover:text-latte'
                            }`}
                        >
                            {label}
                            {badge > 0 && (
                                <span className="absolute -top-2 -right-4 bg-coffee dark:bg-latte text-cream dark:text-espresso text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                                    {badge}
                                </span>
                            )}
                        </Link>
                    ))}

                    <a
                        href={brand.cta.primary.href}
                        className="btn-primary text-sm py-2 px-4"
                    >
                        {brand.cta.primary.label}
                    </a>

                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-lg border border-[var(--border)] hover:bg-cream-dark dark:hover:bg-espresso-light transition-colors"
                        aria-label="Toggle theme"
                    >
                        {isDark ? (
                            <svg className="w-5 h-5 text-latte" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5 text-coffee" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                            </svg>
                        )}
                    </button>
                </div>

                <div className="flex md:hidden items-center gap-3">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-lg border border-[var(--border)]"
                        aria-label="Toggle theme"
                    >
                        {isDark ? (
                            <svg className="w-5 h-5 text-latte" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5 text-coffee" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                            </svg>
                        )}
                    </button>
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="p-2 rounded-lg border border-[var(--border)]"
                        aria-label="Toggle menu"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {menuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </nav>

            {menuOpen && (
                <div className="md:hidden border-t border-[var(--border)] bg-cream dark:bg-espresso px-4 py-4 space-y-3">
                    {navLinks.map(({ to, label, badge }) => (
                        <Link
                            key={to}
                            to={to}
                            onClick={() => setMenuOpen(false)}
                            className="flex items-center justify-between py-2 text-sm font-medium"
                        >
                            {label}
                            {badge > 0 && (
                                <span className="bg-coffee dark:bg-latte text-cream dark:text-espresso text-xs px-2 py-0.5 rounded-full">
                                    {badge}
                                </span>
                            )}
                        </Link>
                    ))}
                    <a href={brand.cta.primary.href} className="btn-primary w-full mt-2">
                        {brand.cta.primary.label}
                    </a>
                    <a
                        href={brand.cta.secondary.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-outline w-full"
                    >
                        {brand.cta.secondary.label}
                    </a>
                </div>
            )}
        </header>
    );
};

export default Navbar;
