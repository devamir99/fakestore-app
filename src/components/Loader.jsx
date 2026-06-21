const Loader = () => {
    return (
        <div className="flex justify-center items-center h-64">
            <div className="surface-card rounded-xl p-8 flex flex-col items-center">
                <div className="relative">
                    <div className="animate-spin rounded-full h-12 w-12 border-2 border-cream-dark dark:border-espresso-light" />
                    <div className="animate-spin rounded-full h-12 w-12 border-2 border-coffee dark:border-latte border-t-transparent absolute top-0 left-0" />
                </div>
                <p className="mt-4 text-sm text-stone-muted dark:text-latte/60">
                    Loading collection...
                </p>
            </div>
        </div>
    );
};

export default Loader;
