'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion, type Variants } from 'framer-motion';
import {
    Moon, Sun, ArrowUpRight, ChevronRight,
    X, Menu, Globe, Palette, ShoppingBag, TrendingUp, Figma, Users, UserCircle, MessageSquare,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { useTheme } from '@/hooks/useTheme';
import { siteConfig } from '@/constants/site';

/* ─────────────────────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────────────────────── */
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Globe, Palette, ShoppingBag, TrendingUp, Figma, Users, UserCircle, MessageSquare,
};

/* ─────────────────────────────────────────────────────────────
   NAV DATA
───────────────────────────────────────────────────────────── */
const navLinks = [
    {
        label: 'Services',
        href: '/services',
        count: 5,
        children: [
            { label: 'Web Design', description: 'Deliver your business to a wider audience', href: '/services/web-design', icon: 'Globe' },
            { label: 'Branding', description: "Creating brands you're proud of", href: '/services/branding', icon: 'Palette' },
            { label: 'E-Commerce', description: 'Custom stores that turn browsers into buyers', href: '/services/ecommerce', icon: 'ShoppingBag' },
            { label: 'SEO', description: 'Get your brand seen online', href: '/services/seo', icon: 'TrendingUp' },
            { label: 'UI / UX', description: 'Intuitive experiences that drive engagement', href: '/services/ui-ux', icon: 'Figma' },
        ],
        viewAll: { label: 'View all Services', href: '/services' },
    },
    { label: 'Work', href: '/work' },
    {
        label: 'About',
        href: '/about',
        children: [
            { label: 'About us', description: 'An award winning agency in Manchester', href: '/about' },
            { label: 'Meet the Team', description: 'Putting faces to names', href: '/about/team' },
            { label: 'Culture', description: 'How we do things around here', href: '/about/culture' },
            { label: 'Testimonials', description: 'What our clients say about us', href: '/about/testimonials' },
        ],
        viewAll: {
            label: 'Watch our Showreel',
            href: '/about',
            description: "Want a snippet of our work in under a minute? We've got just the thing for ya...",
            image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop',
        },
    },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
];

type NavChild = { label: string; description: string; href: string; icon?: string };
type NavLinkItem = (typeof navLinks)[number];

/* ─────────────────────────────────────────────────────────────
   LOGO — Bold wordmark only, like "Shape."
───────────────────────────────────────────────────────────── */
function Logo() {
    return (
        <Link
            href="/"
            aria-label="RapSora — Home"
            className="group shrink-0 focus-visible:outline-none"
        >
            <span className="font-heading text-[1.2rem] font-extrabold tracking-[-0.04em] text-foreground transition-opacity duration-200 group-hover:opacity-70">
                RapSora
                <span className="text-primary">.</span>
            </span>
        </Link>
    );
}

/* ─────────────────────────────────────────────────────────────
   CTA BUTTON — Pill body + attached circle pocket (exact MadeByShape shape)
   Variant 'ghost' = subtle (scrolled), 'filled' = brand filled
───────────────────────────────────────────────────────────── */
function CtaButton({ className }: { className?: string }) {
    return (
        <Link
            href="/contact"
            className={cn(
                'group relative flex items-center focus-visible:outline-none select-none',
                'transition-all duration-200 active:scale-[0.97]',
                'hover:brightness-110 hover:[filter:brightness(1.12)]',
                className
            )}
        >
            {/* Pill body — fully rounded */}
            <span
                className={cn(
                    'flex h-[38px] items-center rounded-full pl-5 pr-7',
                    'bg-primary text-white',
                    'text-[14px] font-semibold tracking-[-0.01em]',
                )}
            >
                Start a project
            </span>

            {/* Circle bubble — overlaps the pill's right edge */}
            <span
                className={cn(
                    'flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full',
                    'bg-primary text-white',
                )}
                style={{ marginLeft: '-18px' }}
                aria-hidden="true"
            >
                <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:rotate-[15deg]" strokeWidth={2.5} />
            </span>
        </Link>
    );
}

/* Mobile full-width CTA */
function CtaButtonFull() {
    return (
        <Link
            href="/contact"
            className="group relative flex items-center w-full focus-visible:outline-none active:scale-[0.98] transition-all duration-200"
        >
            <span
                className="flex flex-1 h-[52px] items-center justify-center bg-primary text-white text-[14px] font-semibold tracking-[-0.01em] transition-colors group-hover:bg-primary/90 shadow-lg shadow-primary/20"
                style={{ borderRadius: '999px 0 0 999px' }}
            >
                Start a project
            </span>
            <span
                className="flex h-[52px] w-[52px] shrink-0 items-center justify-center bg-primary text-white transition-all shadow-lg shadow-primary/20 group-hover:bg-primary/90"
                style={{
                    borderRadius: '50%',
                    marginLeft: '-1px',
                    transition: 'background 0.2s, transform 0.25s cubic-bezier(0.34,1.56,0.64,1)',
                }}
                aria-hidden="true"
            >
                <ArrowUpRight className="h-5 w-5 group-hover:rotate-[15deg] transition-transform duration-300" strokeWidth={2.5} />
            </span>
        </Link>
    );
}

/* ─────────────────────────────────────────────────────────────
   THEME TOGGLE
───────────────────────────────────────────────────────────── */
function ThemeToggle() {
    const { theme, toggleTheme, mounted } = useTheme();
    if (!mounted) return <div className="h-9 w-9" aria-hidden />;

    return (
        <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-full text-foreground/50 transition-all duration-200 hover:bg-foreground/[0.06] hover:text-foreground active:scale-90"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
            <AnimatePresence mode="wait" initial={false}>
                <motion.span
                    key={theme}
                    initial={{ rotate: -90, scale: 0.6, opacity: 0 }}
                    animate={{ rotate: 0, scale: 1, opacity: 1 }}
                    exit={{ rotate: 90, scale: 0.6, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="flex items-center justify-center"
                >
                    {theme === 'dark'
                        ? <Sun className="h-[17px] w-[17px]" strokeWidth={1.75} />
                        : <Moon className="h-[17px] w-[17px]" strokeWidth={1.75} />
                    }
                </motion.span>
            </AnimatePresence>
        </button>
    );
}

/* ─────────────────────────────────────────────────────────────
   DROPDOWN ITEM — simple title + description, no icon
───────────────────────────────────────────────────────────── */
function DropdownRow({ child, index }: { child: NavChild; index: number }) {
    const pathname = usePathname();
    const isActive = pathname === child.href;

    return (
        <motion.li
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: index * 0.04, ease: EASE }}
        >
            <Link
                href={child.href}
                className={cn(
                    'group/row block rounded-xl px-4 py-3',
                    'transition-colors duration-150 hover:bg-foreground/[0.04]',
                    isActive && 'bg-primary/[0.06]'
                )}
            >
                <p className={cn('text-[15px] font-semibold', isActive ? 'text-primary' : 'text-foreground')}>
                    {child.label}
                </p>
                <p className="mt-0.5 text-[13px] leading-relaxed text-muted-foreground">
                    {child.description}
                </p>
            </Link>
        </motion.li>
    );
}

/* ─────────────────────────────────────────────────────────────
   DESKTOP DROPDOWN PANEL — wide two-column like MadeByShape
───────────────────────────────────────────────────────────── */
function DesktopDropdown({
    link, isOpen, onOpen, onClose,
}: {
    link: NavLinkItem & { children: NavChild[] };
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}) {
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const pathname = usePathname();
    const isActive = pathname.startsWith(link.href);

    const enter = () => { if (timerRef.current) clearTimeout(timerRef.current); onOpen(); };
    const leave = () => { timerRef.current = setTimeout(onClose, 140); };

    useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

    const hasViewAll = 'viewAll' in link && link.viewAll;

    return (
        <div className="relative" onMouseEnter={enter} onMouseLeave={leave}>
            {/* ── Trigger ── */}
            <button
                aria-expanded={isOpen}
                aria-haspopup="true"
                className={cn(
                    'relative flex items-center gap-1 text-[15px] font-medium tracking-[-0.01em]',
                    'transition-colors duration-150 hover:text-foreground focus-visible:outline-none',
                    isActive ? 'text-foreground' : 'text-foreground/60'
                )}
            >
                {link.label}

                {/* Count badge */}
                {'count' in link && (
                    <span
                        className="absolute -right-4 -top-3 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-primary px-1 text-[9px] font-bold leading-none text-white shadow-sm"
                        aria-label={`${link.count} services`}
                    >
                        {link.count}
                    </span>
                )}
            </button>

            {/* ── Panel ── */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.97 }}
                        transition={{ duration: 0.22, ease: EASE }}
                        className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-5"
                        style={{ width: hasViewAll ? 620 : 320 }}
                    >
                        {/* Arrow tip */}
                        <div
                            className="absolute left-1/2 top-5 -translate-x-1/2 -translate-y-[1px] h-0 w-0 border-x-[7px] border-b-[8px] border-x-transparent"
                            style={{ borderBottomColor: 'var(--color-background, hsl(var(--background)))' }}
                            aria-hidden="true"
                        />

                        <div className="overflow-hidden rounded-2xl border border-border/50 bg-background shadow-[0_12px_48px_-8px_rgba(0,0,0,0.15)] dark:shadow-[0_12px_48px_-8px_rgba(0,0,0,0.55)]">
                            <div className={cn(
                                'flex',
                                hasViewAll ? 'flex-row' : 'flex-col'
                            )}>
                                {/* Left column — service items */}
                                <ul className={cn(
                                    'flex-1 px-3 py-3',
                                    hasViewAll && 'border-r border-border/30'
                                )}>
                                    {link.children.map((child, i) => (
                                        <DropdownRow key={child.href} child={child} index={i} />
                                    ))}
                                </ul>

                                {/* Right column — card with image */}
                                {hasViewAll && (() => {
                                    const va = link.viewAll as { label: string; href: string; description?: string; image?: string };
                                    return (
                                        <div className="flex w-[260px] flex-col p-5">
                                            <Link href={va.href} className="group/va block">
                                                <p className="text-[16px] font-bold text-foreground">
                                                    {va.label}
                                                </p>
                                                <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
                                                    {va.description || `Check out everything we offer here at RapSora`}
                                                </p>
                                            </Link>

                                            {/* Image with optional play button overlay */}
                                            <div className="group/img relative mt-4 overflow-hidden rounded-xl">
                                                <img
                                                    src={va.image || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop'}
                                                    alt={va.label}
                                                    className="h-[160px] w-full object-cover transition-transform duration-300 hover:scale-105"
                                                />
                                                {/* Play button — only for showreel-type cards */}
                                                {va.label.toLowerCase().includes('showreel') && (
                                                    <div className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#c8f547] shadow-lg">
                                                        <svg className="ml-0.5 h-4 w-4 text-[#111]" viewBox="0 0 24 24" fill="currentColor">
                                                            <path d="M8 5v14l11-7z" />
                                                        </svg>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })()}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

/* ─────────────────────────────────────────────────────────────
   PLAIN DESKTOP NAV LINK
───────────────────────────────────────────────────────────── */
function DesktopNavLink({ link }: { link: NavLinkItem }) {
    const pathname = usePathname();
    const isActive = pathname === link.href;

    return (
        <Link
            href={link.href}
            className={cn(
                'relative text-[15px] font-medium tracking-[-0.01em]',
                'transition-colors duration-150 hover:text-foreground focus-visible:outline-none',
                isActive ? 'text-foreground' : 'text-foreground/60'
            )}
        >
            {link.label}
            {isActive && (
                <motion.span
                    layoutId="nav-pill"
                    className="absolute -bottom-0.5 left-0 right-0 h-[1.5px] rounded-full bg-foreground"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                />
            )}
        </Link>
    );
}

/* ─────────────────────────────────────────────────────────────
   MOBILE MENU
───────────────────────────────────────────────────────────── */
function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const pathname = usePathname();
    const [expanded, setExpanded] = useState<string | null>(null);
    const reduceMotion = useReducedMotion();

    useEffect(() => { onClose(); }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 10 },
        visible: (i: number) => ({
            opacity: 1, y: 0,
            transition: { duration: 0.28, delay: 0.06 + i * 0.045, ease: EASE },
        }),
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        transition={{ duration: 0.22 }}
                        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
                        onClick={onClose}
                        aria-hidden="true"
                    />

                    {/* Panel */}
                    <motion.div
                        initial={reduceMotion ? { opacity: 0 } : { x: '100%' }}
                        animate={reduceMotion ? { opacity: 1 } : { x: 0 }}
                        exit={reduceMotion ? { opacity: 0 } : { x: '100%' }}
                        transition={{ duration: 0.3, ease: EASE }}
                        style={{ willChange: 'transform' }}
                        className="fixed right-0 top-0 z-50 flex h-full w-full max-w-[min(400px,100vw)] flex-col bg-background"
                        role="dialog" aria-modal="true" aria-label="Site navigation"
                    >
                        {/* Top bar */}
                        <div className="flex items-center justify-between px-6 py-5">
                            <Logo />
                            <button
                                onClick={onClose}
                                className="flex h-9 w-9 items-center justify-center rounded-full bg-muted/80 text-foreground/60 transition-colors hover:bg-muted hover:text-foreground"
                                aria-label="Close"
                            >
                                <X className="h-5 w-5" strokeWidth={1.75} />
                            </button>
                        </div>

                        <div className="mx-6 h-px bg-border/40" />

                        {/* Links */}
                        <nav className="flex-1 overflow-y-auto px-4 py-4">
                            <ul className="space-y-0.5">
                                {navLinks.map((link, i) => {
                                    const hasKids = 'children' in link;
                                    const isExp = expanded === link.label;
                                    const isActive = hasKids ? pathname.startsWith(link.href) : pathname === link.href;

                                    return (
                                        <motion.li key={link.href} custom={i} variants={itemVariants} initial="hidden" animate="visible">
                                            {hasKids ? (
                                                <div>
                                                    <button
                                                        onClick={() => setExpanded(isExp ? null : link.label)}
                                                        className={cn(
                                                            'flex w-full items-center justify-between rounded-lg px-3 py-3',
                                                            'text-[15px] font-medium transition-colors hover:bg-foreground/[0.04]',
                                                            isActive ? 'text-foreground' : 'text-foreground/60'
                                                        )}
                                                    >
                                                        <span className="flex items-center gap-2">
                                                            {link.label}
                                                            {'count' in link && (
                                                                <span className="flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-primary px-1 text-[9px] font-bold text-white">
                                                                    {link.count}
                                                                </span>
                                                            )}
                                                        </span>
                                                        <motion.div animate={{ rotate: isExp ? 90 : 0 }} transition={{ duration: 0.18 }}>
                                                            <ChevronRight className="h-4 w-4 opacity-40" strokeWidth={1.75} />
                                                        </motion.div>
                                                    </button>

                                                    <AnimatePresence initial={false}>
                                                        {isExp && (
                                                            <motion.ul
                                                                initial={{ height: 0, opacity: 0 }}
                                                                animate={{ height: 'auto', opacity: 1 }}
                                                                exit={{ height: 0, opacity: 0 }}
                                                                transition={{ duration: 0.22, ease: EASE }}
                                                                className="overflow-hidden"
                                                            >
                                                                {(link as typeof navLinks[0]).children!.map((child) => {
                                                                    const iconKey = 'icon' in child ? (child as { icon?: string }).icon : undefined;
                                                                    const Icon = iconKey ? iconMap[iconKey] : null;
                                                                    return (
                                                                        <li key={child.href}>
                                                                            <Link
                                                                                href={child.href}
                                                                                className={cn(
                                                                                    'flex items-center gap-3 rounded-lg py-2.5 pl-5 pr-3',
                                                                                    'transition-colors hover:bg-foreground/[0.04]',
                                                                                    pathname === child.href ? 'text-primary' : 'text-foreground/55'
                                                                                )}
                                                                            >
                                                                                {Icon && (
                                                                                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                                                                                        <Icon className="h-3.5 w-3.5" />
                                                                                    </div>
                                                                                )}
                                                                                <div>
                                                                                    <p className="text-[13px] font-medium text-foreground/90">{child.label}</p>
                                                                                    <p className="text-[11px] text-muted-foreground">{child.description}</p>
                                                                                </div>
                                                                            </Link>
                                                                        </li>
                                                                    );
                                                                })}
                                                            </motion.ul>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            ) : (
                                                <Link
                                                    href={link.href}
                                                    className={cn(
                                                        'flex items-center rounded-lg px-3 py-3',
                                                        'text-[15px] font-medium transition-colors hover:bg-foreground/[0.04]',
                                                        isActive ? 'text-foreground' : 'text-foreground/60'
                                                    )}
                                                >
                                                    {link.label}
                                                </Link>
                                            )}
                                        </motion.li>
                                    );
                                })}
                            </ul>
                        </nav>

                        {/* CTA */}
                        <div className="border-t border-border/30 px-6 py-5">
                            <CtaButtonFull />
                            <p className="mt-2.5 text-center text-[11px] text-muted-foreground">
                                or email us at{' '}
                                <a href={`mailto:${siteConfig.email}`} className="text-primary hover:underline underline-offset-2">
                                    {siteConfig.email}
                                </a>
                            </p>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN HEADER — Layout matches MadeByShape exactly:
   [Logo]  [Nav links centered]  [Theme]  [CTA pill+circle]
═══════════════════════════════════════════════════════════════ */
export function Header() {
    const { isScrolled, isHidden } = useScrollPosition(40, 0.6);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [mobileOpen, setMobileOpen] = useState(false);
    const closeMobile = useCallback(() => setMobileOpen(false), []);
    const navHidden = isHidden && !mobileOpen && openDropdown === null;

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') { setOpenDropdown(null); setMobileOpen(false); }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, []);

    return (
        <>
            {/* Outer wrapper — handles centering + slide hide/show */}
            <div
                className={cn(
                    'fixed inset-x-0 top-0 z-50 flex justify-center px-4 sm:px-6',
                    'transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
                    navHidden ? '-translate-y-full' : 'translate-y-0'
                )}
            >
                <header
                    className={cn(
                        // Smooth morph — 500ms expo-out on everything
                        'w-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
                        isScrolled
                            ? [
                                // ── Floating capsule ──
                                'h-[80px]',
                                'rounded-full',
                                'bg-[#F5F5F5] dark:bg-[#25262A] backdrop-blur-xl',
                                'border border-border/70',
                                'shadow-[0_8px_32px_-4px_rgba(0,0,0,0.18),0_2px_6px_-1px_rgba(0,0,0,0.08)]',
                                'dark:shadow-[0_8px_40px_-4px_rgba(0,0,0,0.6),0_2px_8px_-1px_rgba(0,0,0,0.35)]',
                            ]
                            : [
                                // ── Full-width transparent ──
                                'h-[80px]',
                                'rounded-none',
                                'bg-transparent',
                                'border border-transparent',
                                'shadow-none',
                            ]
                    )}
                    // Inline styles for maxWidth + marginTop so CSS can interpolate concrete px→px
                    style={{
                        maxWidth: isScrolled ? 880 : 9999,
                        marginTop: isScrolled ? 8 : 0,
                    }}
                >
                    <div className={cn(
                        'flex h-full items-center transition-[padding] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
                        isScrolled ? 'px-6 sm:px-8' : 'px-8 sm:px-12'
                    )}>

                        {/* ── LEFT: Logo ────────────────────────────── */}
                        <Logo />

                        {/* ── CENTRE: Nav links ────────────────────── */}
                        <nav
                            className="hidden flex-1 items-center justify-center gap-10 lg:flex"
                            aria-label="Primary navigation"
                        >
                            {navLinks.map((link) => {
                                const hasKids = 'children' in link && Array.isArray((link as { children?: unknown }).children);
                                return hasKids ? (
                                    <DesktopDropdown
                                        key={link.href}
                                        link={link as Parameters<typeof DesktopDropdown>[0]['link']}
                                        isOpen={openDropdown === link.label}
                                        onOpen={() => setOpenDropdown(link.label)}
                                        onClose={() => setOpenDropdown(null)}
                                    />
                                ) : (
                                    <DesktopNavLink key={link.href} link={link} />
                                );
                            })}
                        </nav>

                        {/* ── RIGHT: Controls ──────────────────────── */}
                        <div className="flex items-center gap-3">
                            <ThemeToggle />

                            {/* CTA — desktop */}
                            <div className="hidden lg:block">
                                <CtaButton />
                            </div>

                            {/* Hamburger — mobile */}
                            <button
                                className="flex h-9 w-9 items-center justify-center rounded-full text-foreground/60 transition-colors hover:bg-foreground/[0.06] hover:text-foreground lg:hidden"
                                onClick={() => setMobileOpen(true)}
                                aria-label="Open menu"
                                aria-expanded={mobileOpen}
                            >
                                <Menu className="h-5 w-5" strokeWidth={1.75} />
                            </button>
                        </div>

                    </div>
                </header>
            </div>

            <MobileMenu isOpen={mobileOpen} onClose={closeMobile} />
        </>
    );
}
