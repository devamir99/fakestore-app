export const brand = {
    name: 'devamir',
    tagline: 'Curated goods for modern living',
    description:
        'A minimal storefront experience built to showcase product discovery, cart flow, and responsive design.',
    author: {
        name: 'Amir Fallahi',
        role: 'Frontend Developer',
        phone: '+98 920 500 7494',
        phoneHref: 'tel:+989205007494',
        email: 'devamir99@gmail.com',
        emailHref: 'mailto:devamir99@gmail.com',
        linkedin: 'https://www.linkedin.com/in/devamir',
        github: 'https://github.com/devamir99',
        telegram: 'https://t.me/devamir9',
        instagram: 'https://www.instagram.com/devamirr',
    },
    demo: {
        label: 'Storefront demo',
        message: 'Custom e-commerce builds available for your brand.',
        checkoutTitle: 'Demo checkout',
        checkoutMessage:
            'This is a front-end demonstration. No orders are processed or stored. For a production-ready storefront built around your brand, reach out directly.',
    },
    cta: {
        headline: 'Need a storefront like this?',
        subline: 'Reach out to discuss a tailored version for your business.',
        primary: {
            label: 'Call now',
            href: 'tel:+989205007494',
        },
        secondary: {
            label: 'LinkedIn',
            href: 'https://www.linkedin.com/in/devamir',
        },
    },
};

export const categoryLabels = {
    "men's clothing": "Men's",
    "women's clothing": "Women's",
    electronics: 'Electronics',
    jewelery: 'Jewelry',
};

export const formatCategory = (category) =>
    categoryLabels[category] ??
    category.charAt(0).toUpperCase() + category.slice(1);
