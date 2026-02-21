// ============================================================
// RAPSORA — Core Type Definitions
// ============================================================

// ─── Navigation ─────────────────────────────────────────────

export interface NavSubItem {
    label: string;
    description?: string;
    href: string;
    icon?: string;
    badge?: string;
}

export interface NavItem {
    label: string;
    href: string;
    children?: NavSubItem[];
    badge?: string;
}

// ─── Services ───────────────────────────────────────────────

export interface Service {
    id: string;
    number: string;
    title: string;
    shortDescription: string;
    longDescription?: string;
    icon: string;
    href: string;
    features?: string[];
}

// ─── Projects / Work ────────────────────────────────────────

export interface Project {
    id: string;
    slug: string;
    title: string;
    client: string;
    tagline: string;
    description: string;
    year: number;
    tags: string[];
    image: string;
    thumbnail?: string;
    featured: boolean;
    href: string;
    results?: {
        metric: string;
        value: string;
    }[];
}

// ─── Testimonials ───────────────────────────────────────────

export interface Testimonial {
    id: string;
    quote: string;
    author: string;
    role: string;
    company: string;
    avatar?: string;
    rating: number;
    result?: string;
}

// ─── Blog ───────────────────────────────────────────────────

export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    image: string;
    readTime: string;
    publishedAt: string;
    author: string;
}

// ─── Team ───────────────────────────────────────────────────

export interface TeamMember {
    id: string;
    name: string;
    role: string;
    bio: string;
    avatar: string;
    socials?: {
        twitter?: string;
        linkedin?: string;
        github?: string;
    };
}

// ─── Site Config ────────────────────────────────────────────

export interface SiteConfig {
    name: string;
    description: string;
    url: string;
    email: string;
    phone?: string;
    address?: {
        line1: string;
        line2?: string;
        city: string;
        state?: string;
        zip?: string;
        country: string;
    };
    socials: {
        twitter?: string;
        linkedin?: string;
        instagram?: string;
        github?: string;
        dribbble?: string;
    };
}

// ─── Process Steps ──────────────────────────────────────────

export interface ProcessStep {
    number: string;
    title: string;
    description: string;
    icon?: string;
}

// ─── Stats ──────────────────────────────────────────────────

export interface Stat {
    label: string;
    value: string;
    suffix?: string;
}
