import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FavoritesContext } from '../context/FavoritesContext';
import ProductCard from '../components/ProductCard';
import ContactCTA from '../components/ContactCTA';

const Favorites = () => {
    const { favorites } = useContext(FavoritesContext);

    if (favorites.length === 0) {
        return (
            <div className="max-w-lg mx-auto text-center py-16 animate-fade-in">
                <div className="surface-card rounded-xl p-12">
                    <svg
                        className="w-16 h-16 text-stone-muted dark:text-latte/40 mx-auto mb-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                    </svg>
                    <h2 className="heading-display text-2xl mb-3">No saved items yet</h2>
                    <p className="text-sm text-stone-muted dark:text-latte/70 mb-8">
                        Tap the heart on any product to keep it here for later.
                    </p>
                    <Link to="/" className="btn-primary">
                        Browse collection
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
                <div>
                    <h1 className="heading-display text-3xl md:text-4xl mb-2">Saved items</h1>
                    <p className="text-sm text-stone-muted dark:text-latte/60">
                        {favorites.length} {favorites.length === 1 ? 'piece' : 'pieces'}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {favorites.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            <div className="mt-16">
                <ContactCTA variant="compact" />
            </div>
        </div>
    );
};

export default Favorites;
