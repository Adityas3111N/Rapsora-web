import type { NavItem } from '@/types';

export const mainNavItems: NavItem[] = [
    {
        label: 'Services',
        href: '/services',
        children: [
            {
                label: 'Web Design & Development',
                description: 'Beautiful, high-performance websites built to convert',
                href: '/services/web-design',
                icon: 'Globe',
            },
            {
                label: 'Branding & Identity',
                description: 'Memorable brands that connect with your audience',
                href: '/services/branding',
                icon: 'Palette',
            },
            {
                label: 'E-Commerce',
                description: 'Online stores that turn browsers into buyers',
                href: '/services/ecommerce',
                icon: 'ShoppingBag',
            },
            {
                label: 'SEO & Marketing',
                description: 'Get found, get clicks, get customers',
                href: '/services/seo',
                icon: 'TrendingUp',
            },
            {
                label: 'UI/UX Design',
                description: 'Intuitive experiences that drive engagement',
                href: '/services/ui-ux',
                icon: 'Figma',
            },
        ],
    },
    {
        label: 'Work',
        href: '/work',
    },
    {
        label: 'About',
        href: '/about',
        children: [
            {
                label: 'About Us',
                description: 'Our story, mission, and what drives us',
                href: '/about',
                icon: 'Users',
            },
            {
                label: 'Meet the Team',
                description: 'The people behind the pixels',
                href: '/about/team',
                icon: 'UserCircle',
            },
            {
                label: 'Testimonials',
                description: 'What our clients say about us',
                href: '/testimonials',
                icon: 'MessageSquare',
            },
        ],
    },
    {
        label: 'Blog',
        href: '/blog',
    },
    {
        label: 'Contact',
        href: '/contact',
    },
];

export const footerNavItems = {
    navigation: [
        { label: 'Home', href: '/' },
        { label: 'Work', href: '/work' },
        { label: 'About', href: '/about' },
        { label: 'Blog', href: '/blog' },
        { label: 'Contact', href: '/contact' },
        { label: 'Careers', href: '/careers' },
    ],
    services: [
        { label: 'Web Design', href: '/services/web-design' },
        { label: 'Branding', href: '/services/branding' },
        { label: 'E-Commerce', href: '/services/ecommerce' },
        { label: 'SEO & Marketing', href: '/services/seo' },
        { label: 'UI/UX Design', href: '/services/ui-ux' },
    ],
};
