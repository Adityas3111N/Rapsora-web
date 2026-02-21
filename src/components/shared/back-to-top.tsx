'use client';

import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export function BackToTopButton() {
    return (
        <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={cn(
                'flex h-8 w-8 items-center justify-center rounded-full',
                'bg-muted/60 text-muted-foreground',
                'transition-all duration-200',
                'hover:bg-primary/10 hover:text-primary hover:-translate-y-0.5'
            )}
            aria-label="Back to top"
        >
            <ArrowUp className="h-3.5 w-3.5" />
        </button>
    );
}
