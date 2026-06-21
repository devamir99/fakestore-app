import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatCategory } from '../config/brand';
import ContactCTA from '../components/ContactCTA';
import { usePageMeta } from '../hooks/usePageMeta';

const Cart = () => {
    usePageMeta({ title: 'Cart', description: 'Review items in your shopping cart.' });
    const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

    const subtotal = getCartTotal();
    const tax = subtotal * 0.1;
    const total = subtotal + tax;
    const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    if (cartItems.length === 0) {
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
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
                        />
                    </svg>
                    <h2 className="heading-display text-2xl mb-3">Your cart is empty</h2>
                    <p className="text-sm text-stone-muted dark:text-latte/70 mb-8">
                        Browse the collection and add something you like.
                    </p>
                    <Link to="/" className="btn-primary">
                        Start shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
                <div>
                    <h1 className="heading-display text-3xl md:text-4xl mb-2">Shopping cart</h1>
                    <p className="text-sm text-stone-muted dark:text-latte/60">
                        {itemCount} {itemCount === 1 ? 'item' : 'items'}
                    </p>
                </div>
                <button
                    type="button"
                    onClick={clearCart}
                    className="text-sm text-stone-muted hover:text-coffee dark:hover:text-latte transition-colors self-start sm:self-auto"
                >
                    Clear cart
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                    {cartItems.map((item) => (
                        <div key={item.id} className="surface-card rounded-xl p-5 md:p-6">
                            <div className="flex items-center gap-4">
                                <Link
                                    to={`/product/${item.id}`}
                                    className="w-20 h-20 bg-cream-dark dark:bg-espresso rounded-lg flex items-center justify-center p-2 shrink-0"
                                >
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="max-h-full max-w-full object-contain"
                                    />
                                </Link>
                                <div className="flex-1 min-w-0">
                                    <Link
                                        to={`/product/${item.id}`}
                                        className="text-sm font-medium line-clamp-2 hover:text-coffee dark:hover:text-latte transition-colors"
                                    >
                                        {item.title}
                                    </Link>
                                    <p className="text-xs text-stone-muted dark:text-latte/60 mt-1">
                                        {formatCategory(item.category)}
                                    </p>
                                    <p className="font-serif text-lg text-coffee dark:text-latte mt-2">
                                        ${item.price.toFixed(2)}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                    <button
                                        type="button"
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        className="w-8 h-8 rounded-full border border-[var(--border)] hover:border-coffee dark:hover:border-latte flex items-center justify-center transition-colors"
                                        aria-label="Decrease quantity"
                                    >
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                        </svg>
                                    </button>
                                    <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                                    <button
                                        type="button"
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        className="w-8 h-8 rounded-full border border-[var(--border)] hover:border-coffee dark:hover:border-latte flex items-center justify-center transition-colors"
                                        aria-label="Increase quantity"
                                    >
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                    </button>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => removeFromCart(item.id)}
                                    className="p-2 text-stone-muted hover:text-coffee dark:hover:text-latte transition-colors shrink-0"
                                    aria-label="Remove item"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="lg:col-span-1">
                    <div className="surface-card rounded-xl p-6 sticky top-28">
                        <h2 className="text-sm font-medium uppercase tracking-widest text-stone-muted dark:text-latte/60 mb-4">
                            Order summary
                        </h2>
                        <div className="space-y-3 text-sm mb-6">
                            <div className="flex justify-between text-stone-muted dark:text-latte/70">
                                <span>Subtotal</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-stone-muted dark:text-latte/70">
                                <span>Shipping</span>
                                <span>Free</span>
                            </div>
                            <div className="flex justify-between text-stone-muted dark:text-latte/70">
                                <span>Tax</span>
                                <span>${tax.toFixed(2)}</span>
                            </div>
                            <hr className="border-[var(--border)]" />
                            <div className="flex justify-between font-serif text-xl text-coffee dark:text-latte">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>

                        <Link to="/checkout" className="btn-primary w-full mb-3 py-3">
                            Proceed to checkout
                        </Link>
                        <Link
                            to="/"
                            className="block w-full py-3 text-center text-sm text-stone-muted hover:text-coffee dark:hover:text-latte transition-colors"
                        >
                            Continue shopping
                        </Link>
                    </div>
                </div>
            </div>

            <div className="mt-16">
                <ContactCTA variant="compact" />
            </div>
        </div>
    );
};

export default Cart;
