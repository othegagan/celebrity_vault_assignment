export const shimmer =
    'relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-black/10 before:to-transparent';

export function CelebritySkeleton({ cardCount = 5 }: { cardCount?: number }) {
    return (
        <div className='flex flex-col gap-4'>
            {[Array(cardCount).fill(null)].map((_, i) => (
                <div key={i} className={`h-16 rounded-md ${shimmer} bg-neutral-200 dark:bg-neutral-800`} />
            ))}
        </div>
    );
}
