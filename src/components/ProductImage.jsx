const ProductImage = ({
    src,
    alt,
    className = '',
    eager = false,
    ...props
}) => {
    return (
        <img
            src={src}
            alt={alt}
            className={className}
            loading={eager ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={eager ? 'high' : 'auto'}
            {...props}
        />
    );
};

export default ProductImage;
