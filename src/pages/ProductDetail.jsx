import { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById, getRelatedProducts } from '../api/fakeStore';
import { FavoritesContext } from '../context/FavoritesContext';
import { useCart } from '../context/CartContext';
import { formatCategory } from '../config/brand';
import Loader from '../components/Loader';
import Breadcrumb from '../components/Breadcrumb';
import ContactCTA from '../components/ContactCTA';
import ProductCard from '../components/ProductCard';
import { useToast } from '../components/Toast';
import { usePageMeta } from '../hooks/usePageMeta';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [related, setRelated] = useState([]);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);

    const { favorites, addFavorite, removeFavorite } = useContext(FavoritesContext);
    const { addToCart } = useCart();
    const { addToast } = useToast();
    const isFavorite = favorites.some((p) => p.id === Number(id));

    usePageMeta({
        title: product?.title,
        description: product?.description?.slice(0, 155),
    });

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            const data = await getProductById(id);
            setProduct(data);
            if (data) {
                setRelated(getRelatedProducts(data.id, data.category));
            }
            setLoading(false);
        };
        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        addToCart(product, quantity);
        addToast('Added to cart', 'success');
    };

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating.rate);

        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <svg key={i} className="w-4 h-4 text-caramel" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            );
        }

        return stars;
    };

    if (loading) return <Loader />;

    if (!product) {
        return (
            <div className="max-w-lg mx-auto text-center py-20">
                <div className="surface-card rounded-xl p-12">
                    <h2 className="heading-display text-2xl mb-4">Product not found</h2>
                    <p className="text-sm text-stone-muted dark:text-latte/70 mb-8">
                        This item may have been removed or the link is incorrect.
                    </p>
                    <Link to="/" className="btn-primary">
                        Back to shop
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto animate-fade-in">
            <Breadcrumb
                items={[
                    { label: 'Shop', href: '/' },
                    { label: formatCategory(product.category), href: '/#catalog' },
                    { label: product.title },
                ]}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
                <div className="surface-card rounded-xl overflow-hidden">
                    <div className="aspect-square bg-cream-dark dark:bg-espresso flex items-center justify-center p-10">
                        <img
                            src={product.image}
                            alt={product.title}
                            className="max-h-full max-w-full object-contain"
                        />
                    </div>
                </div>

                <div className="flex flex-col">
                    <p className="text-xs uppercase tracking-widest text-stone-muted dark:text-latte/60 mb-3">
                        {formatCategory(product.category)}
                    </p>
                    <h1 className="heading-display text-3xl md:text-4xl mb-4">{product.title}</h1>

                    <div className="flex items-center gap-3 mb-6">
                        <div className="flex items-center gap-0.5">{renderStars(product.rating)}</div>
                        <span className="text-sm text-stone-muted dark:text-latte/60">
                            {product.rating.rate} · {product.rating.count} reviews
                        </span>
                    </div>

                    <p className="font-serif text-3xl text-coffee dark:text-latte mb-6">
                        ${product.price.toFixed(2)}
                    </p>

                    <p className="text-sm text-stone-muted dark:text-latte/70 leading-relaxed mb-8">
                        {product.description}
                    </p>

                    <div className="flex items-center gap-4 mb-8">
                        <span className="text-sm text-stone-muted dark:text-latte/60">Quantity</span>
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="w-9 h-9 rounded-full border border-[var(--border)] hover:border-coffee dark:hover:border-latte flex items-center justify-center transition-colors"
                                aria-label="Decrease quantity"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                </svg>
                            </button>
                            <span className="w-8 text-center font-medium">{quantity}</span>
                            <button
                                type="button"
                                onClick={() => setQuantity(quantity + 1)}
                                className="w-9 h-9 rounded-full border border-[var(--border)] hover:border-coffee dark:hover:border-latte flex items-center justify-center transition-colors"
                                aria-label="Increase quantity"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                        <button type="button" onClick={handleAddToCart} className="btn-primary flex-1 py-3">
                            Add to cart
                        </button>
                        <button
                            type="button"
                            onClick={() =>
                                isFavorite ? removeFavorite(product.id) : addFavorite(product)
                            }
                            className="btn-outline flex-1 py-3"
                        >
                            {isFavorite ? 'Saved' : 'Save item'}
                        </button>
                    </div>
                </div>
            </div>

            {related.length > 0 && (
                <section className="mt-20">
                    <p className="text-xs uppercase tracking-widest text-stone-muted dark:text-latte/60 mb-2">
                        You may also like
                    </p>
                    <h2 className="heading-display text-2xl mb-8">Related pieces</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {related.map((item) => (
                            <ProductCard key={item.id} product={item} />
                        ))}
                    </div>
                </section>
            )}

            <div className="mt-16">
                <ContactCTA />
            </div>
        </div>
    );
};

export default ProductDetail;
