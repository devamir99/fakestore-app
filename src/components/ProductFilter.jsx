import { useState } from 'react';

const ProductFilter = ({ products, onFilterChange }) => {
    const [filters, setFilters] = useState({
        category: 'all',
        priceRange: 'all',
        rating: 'all',
        search: '',
    });

    const categories = ['all', ...new Set(products.map((p) => p.category))];
    const priceRanges = [
        { value: 'all', label: 'All Prices' },
        { value: '0-25', label: '$0 – $25' },
        { value: '25-50', label: '$25 – $50' },
        { value: '50-100', label: '$50 – $100' },
        { value: '100+', label: '$100+' },
    ];
    const ratings = [
        { value: 'all', label: 'All Ratings' },
        { value: '4+', label: '4+ Stars' },
        { value: '3+', label: '3+ Stars' },
        { value: '2+', label: '2+ Stars' },
    ];

    const handleFilterChange = (key, value) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    const clearFilters = () => {
        const clearedFilters = {
            category: 'all',
            priceRange: 'all',
            rating: 'all',
            search: '',
        };
        setFilters(clearedFilters);
        onFilterChange(clearedFilters);
    };

    return (
        <div className="surface-card p-6 rounded-xl">
            <div className="flex flex-wrap items-center gap-4 mb-4">
                <h3 className="label-caps">Refine</h3>
                <button
                    type="button"
                    onClick={clearFilters}
                    className="text-xs text-muted hover:text-accent transition-colors"
                >
                    Clear all
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                    <label className="block text-xs text-muted mb-2">Search</label>
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={filters.search}
                        onChange={(e) => handleFilterChange('search', e.target.value)}
                        className="input-field"
                    />
                </div>

                <div>
                    <label className="block text-xs text-muted mb-2">Category</label>
                    <select
                        value={filters.category}
                        onChange={(e) => handleFilterChange('category', e.target.value)}
                        className="input-field"
                    >
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category === 'all'
                                    ? 'All Categories'
                                    : category.charAt(0).toUpperCase() + category.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-xs text-muted mb-2">Price</label>
                    <select
                        value={filters.priceRange}
                        onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                        className="input-field"
                    >
                        {priceRanges.map((range) => (
                            <option key={range.value} value={range.value}>
                                {range.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-xs text-muted mb-2">Rating</label>
                    <select
                        value={filters.rating}
                        onChange={(e) => handleFilterChange('rating', e.target.value)}
                        className="input-field"
                    >
                        {ratings.map((rating) => (
                            <option key={rating.value} value={rating.value}>
                                {rating.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default ProductFilter;
