import Link from 'next/link';
import {
    Twitter,
    Linkedin,
    Instagram,
    Github,
    Dribbble,
    Mail,
    Phone,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { siteConfig } from '@/constants/site';
import { footerNavItems } from '@/constants/navigation';
import { BackToTopButton } from '@/components/shared/back-to-top';

const socialLinks = [
    { icon: Twitter, href: siteConfig.socials.twitter, label: 'Twitter' },
    { icon: Linkedin, href: siteConfig.socials.linkedin, label: 'LinkedIn' },
    { icon: Instagram, href: siteConfig.socials.instagram, label: 'Instagram' },
    { icon: Github, href: siteConfig.socials.github, label: 'GitHub' },
    { icon: Dribbble, href: siteConfig.socials.dribbble, label: 'Dribbble' },
];

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer
            className="border-t border-border/40 bg-background"
            aria-label="Site footer"
        >
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* ─── Main Footer Content ─────────────────────────────── */}
                <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
                    {/* Brand Column */}
                    <div className="lg:col-span-4">
                        {/* Logo */}
                        <Link href="/" className="group inline-flex items-center gap-2.5">
                            <svg
                                viewBox="0 0 40 40"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-8 w-8"
                                aria-hidden="true"
                            >
                                <path
                                    d="M8 28L20 16L32 28H24L20 24L16 28H8Z"
                                    className="fill-primary"
                                />
                                <path
                                    d="M12 20L20 12L28 20H22L20 18L18 20H12Z"
                                    className="fill-primary opacity-70"
                                />
                            </svg>
                            <span className="font-heading text-xl font-bold tracking-tight text-foreground">
                                Rap<span className="text-primary">Sora</span>
                            </span>
                        </Link>

                        <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
                            {siteConfig.description}
                        </p>

                        {/* Contact */}
                        <div className="mt-6 space-y-2">
                            <a
                                href={`mailto:${siteConfig.email}`}
                                className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                            >
                                <Mail className="h-4 w-4" />
                                {siteConfig.email}
                            </a>
                            {siteConfig.phone && (
                                <a
                                    href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
                                    className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                                >
                                    <Phone className="h-4 w-4" />
                                    {siteConfig.phone}
                                </a>
                            )}
                        </div>

                        {/* Socials */}
                        <div className="mt-6 flex items-center gap-3">
                            {socialLinks.map(
                                (social) =>
                                    social.href && (
                                        <a
                                            key={social.label}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={cn(
                                                'flex h-9 w-9 items-center justify-center rounded-full',
                                                'bg-muted/60 text-muted-foreground',
                                                'transition-all duration-200',
                                                'hover:bg-primary/10 hover:text-primary hover:scale-110'
                                            )}
                                            aria-label={social.label}
                                        >
                                            <social.icon className="h-4 w-4" />
                                        </a>
                                    )
                            )}
                        </div>
                    </div>

                    {/* Navigation Column */}
                    <div className="lg:col-span-3 lg:col-start-6">
                        <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-foreground">
                            Navigation
                        </h3>
                        <ul className="mt-4 space-y-2.5">
                            {footerNavItems.navigation.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className={cn(
                                            'text-sm text-muted-foreground transition-colors duration-200',
                                            'hover:text-foreground'
                                        )}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services Column */}
                    <div className="lg:col-span-3">
                        <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-foreground">
                            Services
                        </h3>
                        <ul className="mt-4 space-y-2.5">
                            {footerNavItems.services.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className={cn(
                                            'text-sm text-muted-foreground transition-colors duration-200',
                                            'hover:text-foreground'
                                        )}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* ─── Bottom Bar ──────────────────────────────────────── */}
                <div className="flex flex-col items-center justify-between gap-4 border-t border-border/30 py-6 sm:flex-row">
                    <p className="text-xs text-muted-foreground">
                        &copy; {currentYear} {siteConfig.name}. All rights reserved.
                    </p>

                    <div className="flex items-center gap-4">
                        <Link
                            href="/privacy"
                            className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            href="/terms"
                            className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                        >
                            Terms
                        </Link>

                        <BackToTopButton />
                    </div>
                </div>
            </div>
        </footer>
    );
}
