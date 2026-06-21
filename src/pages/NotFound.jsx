import { Link } from 'react-router-dom';
import ContactCTA from '../components/ContactCTA';
import { usePageMeta } from '../hooks/usePageMeta';

const NotFound = () => {
    usePageMeta({ title: 'Page not found', description: 'The page you requested could not be found.' });
    return (
        <div className="max-w-lg mx-auto text-center py-16 animate-fade-in">
            <div className="surface-card rounded-xl p-12 mb-12">
                <p className="font-serif text-7xl text-accent mb-4">404</p>
                <h1 className="heading-display text-2xl mb-3">Page not found</h1>
                <p className="text-sm text-secondary mb-8">
                    The page you are looking for does not exist or has been moved.
                </p>
                <Link to="/" className="btn-primary">
                    Back to shop
                </Link>
            </div>
            <ContactCTA variant="compact" />
        </div>
    );
};

export default NotFound;
