import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import DemoBanner from './components/DemoBanner';
import Footer from './components/Footer';
import SkipLink from './components/SkipLink';
import ScrollToTop from './components/ScrollToTop';
import BackToTop from './components/BackToTop';
import ErrorBoundary from './components/ErrorBoundary';
import Loader from './components/Loader';
import { ToastProvider } from './components/Toast';
import { FavoritesProvider } from './context/FavoritesContext';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';

const Home = lazy(() => import('./pages/Home'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Favorites = lazy(() => import('./pages/Favorites'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const About = lazy(() => import('./pages/About'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
    return (
        <ThemeProvider>
            <CartProvider>
                <FavoritesProvider>
                    <ToastProvider>
                        <ErrorBoundary>
                            <Router>
                                <SkipLink />
                                <ScrollToTop />
                                <div className="min-h-screen flex flex-col bg-cream dark:bg-espresso transition-colors duration-300">
                                    <DemoBanner />
                                    <Navbar />
                                    <main
                                        id="main-content"
                                        className="flex-1 container mx-auto py-8 px-4 sm:px-6 lg:px-8"
                                    >
                                        <Suspense fallback={<Loader />}>
                                            <Routes>
                                                <Route path="/product/:id" element={<ProductDetail />} />
                                                <Route path="/favorites" element={<Favorites />} />
                                                <Route path="/cart" element={<Cart />} />
                                                <Route path="/checkout" element={<Checkout />} />
                                                <Route path="/about" element={<About />} />
                                                <Route path="/" element={<Home />} />
                                                <Route path="*" element={<NotFound />} />
                                            </Routes>
                                        </Suspense>
                                    </main>
                                    <Footer />
                                    <BackToTop />
                                </div>
                            </Router>
                        </ErrorBoundary>
                    </ToastProvider>
                </FavoritesProvider>
            </CartProvider>
        </ThemeProvider>
    );
}

export default App;
