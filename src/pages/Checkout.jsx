import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatCategory } from '../config/brand';
import CheckoutSteps from '../components/CheckoutSteps';
import DemoModal from '../components/DemoModal';
import Breadcrumb from '../components/Breadcrumb';
import ProductImage from '../components/ProductImage';
import { usePageMeta } from '../hooks/usePageMeta';

const emptyShipping = {
    fullName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
};

const Checkout = () => {
    const navigate = useNavigate();
    const { cartItems, getCartTotal } = useCart();
    const [step, setStep] = useState(1);
    const [shipping, setShipping] = useState(emptyShipping);
    const [showModal, setShowModal] = useState(false);

    usePageMeta({ title: 'Checkout', description: 'Complete your order — demo checkout flow.' });

    const subtotal = getCartTotal();
    const tax = subtotal * 0.1;
    const total = subtotal + tax;
    const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    useEffect(() => {
        if (cartItems.length === 0) {
            navigate('/cart', { replace: true });
        }
    }, [cartItems.length, navigate]);

    if (cartItems.length === 0) {
        return null;
    }

    const inputClass = 'input-field';

    const handleShippingChange = (field) => (e) => {
        setShipping((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const canProceedFromShipping =
        shipping.fullName.trim() &&
        shipping.email.trim() &&
        shipping.address.trim() &&
        shipping.city.trim() &&
        shipping.postalCode.trim();

    const handleCompleteOrder = () => {
        setShowModal(true);
    };

    return (
        <div className="max-w-4xl mx-auto animate-fade-in">
            <Breadcrumb
                items={[
                    { label: 'Shop', href: '/' },
                    { label: 'Cart', href: '/cart' },
                    { label: 'Checkout' },
                ]}
            />

            <div className="mb-8">
                <h1 className="heading-display text-3xl md:text-4xl mb-2">Checkout</h1>
                <p className="text-sm text-muted">
                    {itemCount} {itemCount === 1 ? 'item' : 'items'} · ${total.toFixed(2)} total
                </p>
            </div>

            <CheckoutSteps currentStep={step} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    {step === 1 && (
                        <div className="surface-card rounded-xl p-6 md:p-8 space-y-5">
                            <h2 className="text-sm font-medium uppercase tracking-widest text-muted">
                                Shipping details
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="sm:col-span-2">
                                    <label className="block text-xs text-muted mb-2">
                                        Full name
                                    </label>
                                    <input
                                        type="text"
                                        value={shipping.fullName}
                                        onChange={handleShippingChange('fullName')}
                                        placeholder="Alex Morgan"
                                        className={inputClass}
                                    />
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block text-xs text-muted mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        value={shipping.email}
                                        onChange={handleShippingChange('email')}
                                        placeholder="alex@example.com"
                                        className={inputClass}
                                    />
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block text-xs text-muted mb-2">
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        value={shipping.address}
                                        onChange={handleShippingChange('address')}
                                        placeholder="742 Evergreen Terrace"
                                        className={inputClass}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-muted mb-2">
                                        City
                                    </label>
                                    <input
                                        type="text"
                                        value={shipping.city}
                                        onChange={handleShippingChange('city')}
                                        placeholder="Springfield"
                                        className={inputClass}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-muted mb-2">
                                        Postal code
                                    </label>
                                    <input
                                        type="text"
                                        value={shipping.postalCode}
                                        onChange={handleShippingChange('postalCode')}
                                        placeholder="58008"
                                        className={inputClass}
                                    />
                                </div>
                            </div>
                            <div className="flex justify-between pt-4">
                                <Link to="/cart" className="btn-outline">
                                    Back to cart
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => setStep(2)}
                                    disabled={!canProceedFromShipping}
                                    className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
                                >
                                    Continue
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-6">
                            <div className="surface-card rounded-xl p-6 md:p-8">
                                <h2 className="text-sm font-medium uppercase tracking-widest text-muted mb-4">
                                    Order review
                                </h2>
                                <div className="space-y-4">
                                    {cartItems.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex items-center gap-4 pb-4 border-b border-[var(--border)] last:border-0 last:pb-0"
                                        >
                                            <div className="w-16 h-16 bg-subtle rounded-lg flex items-center justify-center p-2 shrink-0">
                                                <ProductImage
                                                    src={item.image}
                                                    alt={item.title}
                                                    className="max-h-full max-w-full object-contain"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium line-clamp-1">{item.title}</p>
                                                <p className="text-xs text-muted">
                                                    Qty {item.quantity} · {formatCategory(item.category)}
                                                </p>
                                            </div>
                                            <p className="font-serif text-accent shrink-0">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="surface-card rounded-xl p-6 md:p-8">
                                <h2 className="text-sm font-medium uppercase tracking-widest text-muted mb-4">
                                    Delivery address
                                </h2>
                                <p className="text-sm leading-relaxed">
                                    {shipping.fullName}
                                    <br />
                                    {shipping.address}
                                    <br />
                                    {shipping.city}, {shipping.postalCode}
                                    <br />
                                    {shipping.email}
                                </p>
                            </div>

                            <div className="flex justify-between">
                                <button type="button" onClick={() => setStep(1)} className="btn-outline">
                                    Back
                                </button>
                                <button type="button" onClick={() => setStep(3)} className="btn-primary">
                                    Continue to payment
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="surface-card rounded-xl p-6 md:p-8 space-y-5">
                            <h2 className="text-sm font-medium uppercase tracking-widest text-muted">
                                Payment method
                            </h2>
                            <p className="text-sm text-secondary leading-relaxed">
                                Payment fields are shown for layout demonstration only. No card data is collected or
                                transmitted.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="sm:col-span-2">
                                    <label className="block text-xs text-muted mb-2">
                                        Card number
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="4242 4242 4242 4242"
                                        className={inputClass}
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-muted mb-2">
                                        Expiry
                                    </label>
                                    <input type="text" placeholder="MM / YY" className={inputClass} readOnly />
                                </div>
                                <div>
                                    <label className="block text-xs text-muted mb-2">
                                        CVC
                                    </label>
                                    <input type="text" placeholder="123" className={inputClass} readOnly />
                                </div>
                            </div>
                            <div className="flex justify-between pt-4">
                                <button type="button" onClick={() => setStep(2)} className="btn-outline">
                                    Back
                                </button>
                                <button type="button" onClick={handleCompleteOrder} className="btn-primary">
                                    Complete order
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="lg:col-span-1">
                    <div className="surface-card rounded-xl p-6 sticky top-28">
                        <h2 className="text-sm font-medium uppercase tracking-widest text-muted mb-4">
                            Summary
                        </h2>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between text-secondary">
                                <span>Subtotal</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-secondary">
                                <span>Shipping</span>
                                <span>Free</span>
                            </div>
                            <div className="flex justify-between text-secondary">
                                <span>Tax</span>
                                <span>${tax.toFixed(2)}</span>
                            </div>
                            <hr className="border-[var(--border)]" />
                            <div className="flex justify-between font-serif text-lg text-accent">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <DemoModal isOpen={showModal} onClose={() => setShowModal(false)} />
        </div>
    );
};

export default Checkout;
