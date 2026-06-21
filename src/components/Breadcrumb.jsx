import { Link } from 'react-router-dom';

const Breadcrumb = ({ items }) => {
    return (
        <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-stone-muted dark:text-latte/60">
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;

                    return (
                        <li key={item.label} className="flex items-center gap-2">
                            {index > 0 && (
                                <span className="text-stone-muted/50 dark:text-latte/30" aria-hidden="true">
                                    /
                                </span>
                            )}
                            {isLast || !item.href ? (
                                <span
                                    className={isLast ? 'text-coffee dark:text-latte font-medium' : undefined}
                                    aria-current={isLast ? 'page' : undefined}
                                >
                                    {item.label}
                                </span>
                            ) : (
                                <Link
                                    to={item.href}
                                    className="hover:text-coffee dark:hover:text-latte transition-colors"
                                >
                                    {item.label}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumb;
