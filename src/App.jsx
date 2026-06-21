import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import DemoBanner from './components/DemoBanner';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import BackToTop from './components/BackToTop';
import ErrorBoundary from './components/ErrorBoundary';
import { ToastProvider } from './components/Toast';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Favorites from './pages/Favorites';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import About from './pages/About';
import NotFound from './pages/NotFound';
import { FavoritesProvider } from './context/FavoritesContext';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';

function App() {
    return (
        <ThemeProvider>
            <CartProvider>
                <FavoritesProvider>
                    <ToastProvider>
                        <ErrorBoundary>
                            <Router>
                                <ScrollToTop />
                                <div className="min-h-screen flex flex-col bg-cream dark:bg-espresso transition-colors duration-300">
                                    <DemoBanner />
                                    <Navbar />
                                    <main className="flex-1 container mx-auto py-8 px-4 sm:px-6 lg:px-8">
                                        <Routes>
                                            <Route path="/product/:id" element={<ProductDetail />} />
                                            <Route path="/favorites" element={<Favorites />} />
                                            <Route path="/cart" element={<Cart />} />
                                            <Route path="/checkout" element={<Checkout />} />
                                            <Route path="/about" element={<About />} />
                                            <Route path="/" element={<Home />} />
                                            <Route path="*" element={<NotFound />} />
                                        </Routes>
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
