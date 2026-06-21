import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../api/fakeStore';
import { brand, formatCategory } from '../config/brand';
import ProductList from '../components/ProductList';
import ProductFilter from '../components/ProductFilter';
import ContactCTA from '../components/ContactCTA';
import Loader from '../components/Loader';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('all');

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await getProducts();
            setProducts(data);
            setFilteredProducts(data);
            setLoading(false);
        };
        fetchProducts();
    }, []);

    const categories = ['all', ...new Set(products.map((p) => p.category))];

    const handleFilterChange = (filters) => {
        let filtered = [...products];

        if (filters.search) {
            filtered = filtered.filter((product) =>
                product.title.toLowerCase().includes(filters.search.toLowerCase())
            );
        }

        if (filters.category !== 'all') {
            filtered = filtered.filter((product) => product.category === filters.category);
            setActiveCategory(filters.category);
        } else {
            setActiveCategory('all');
        }

        if (filters.priceRange !== 'all') {
            const [min, max] = filters.priceRange.split('-').map(Number);
            filtered = filtered.filter((product) => {
                if (max) return product.price >= min && product.price <= max;
                return product.price >= min;
            });
        }

        if (filters.rating !== 'all') {
            const minRating = parseFloat(filters.rating.replace('+', ''));
            filtered = filtered.filter((product) => product.rating.rate >= minRating);
        }

        setFilteredProducts(filtered);
    };

    const handleCategoryPill = (category) => {
        setActiveCategory(category);
        handleFilterChange({
            category,
            priceRange: 'all',
            rating: 'all',
            search: '',
        });
    };

    if (loading) {
        return <Loader />;
    }

    const featured = products.slice(0, 3);

    return (
        <div className="space-y-16 animate-fade-in">
            <section className="pt-8 pb-4 md:pt-16">
                <div className="max-w-2xl">
                    <p className="text-xs uppercase tracking-[0.2em] text-stone-muted dark:text-latte/60 mb-4">
                        {brand.demo.label}
                    </p>
                    <h1 className="heading-display text-4xl md:text-5xl lg:text-6xl text-[var(--text-primary)] mb-5">
                        {brand.tagline}
                    </h1>
                    <p className="text-stone-muted dark:text-latte/70 text-base md:text-lg leading-relaxed mb-8 max-w-lg">
                        {brand.description}
                    </p>
                    <div className="flex flex-wrap gap-3">
                        <a href="#catalog" className="btn-primary">
                            Browse collection
                        </a>
                        <a
                            href={brand.cta.secondary.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-outline"
                        >
                            Work with {brand.author.name.split(' ')[0]}
                        </a>
                    </div>
                </div>
            </section>

            <section>
                <div className="flex items-end justify-between mb-8">
                    <div>
                        <p className="text-xs uppercase tracking-widest text-stone-muted dark:text-latte/60 mb-2">
                            Selected
                        </p>
                        <h2 className="heading-display text-2xl md:text-3xl">Featured pieces</h2>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {featured.map((product) => (
                        <Link
                            key={product.id}
                            to={`/product/${product.id}`}
                            className="group surface-card rounded-xl overflow-hidden"
                        >
                            <div className="aspect-square bg-cream-dark dark:bg-espresso flex items-center justify-center p-8">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className="p-4">
                                <p className="text-xs text-stone-muted dark:text-latte/60 mb-1">
                                    {formatCategory(product.category)}
                                </p>
                                <h3 className="text-sm font-medium line-clamp-2 group-hover:text-coffee dark:group-hover:text-latte transition-colors">
                                    {product.title}
                                </h3>
                                <p className="mt-2 font-serif text-lg text-coffee dark:text-latte">
                                    ${product.price.toFixed(2)}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            <section id="catalog" className="scroll-mt-24">
                <div className="flex flex-wrap gap-2 mb-8">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => handleCategoryPill(category)}
                            className={`px-4 py-1.5 rounded-full text-sm transition-colors ${
                                activeCategory === category
                                    ? 'bg-coffee dark:bg-latte text-cream dark:text-espresso'
                                    : 'border border-[var(--border)] text-stone-muted dark:text-latte/70 hover:border-coffee dark:hover:border-latte'
                            }`}
                        >
                            {category === 'all' ? 'All' : formatCategory(category)}
                        </button>
                    ))}
                </div>

                <ProductFilter products={products} onFilterChange={handleFilterChange} />

                <div className="flex justify-between items-center mb-6 mt-8">
                    <h2 className="heading-display text-xl md:text-2xl">
                        Collection
                        <span className="text-stone-muted dark:text-latte/50 font-sans text-base ml-2">
                            ({filteredProducts.length})
                        </span>
                    </h2>
                </div>

                <ProductList products={filteredProducts} />
            </section>

            <ContactCTA />
        </div>
    );
};

export default Home;
