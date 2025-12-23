# The Fortune Tech - IT Consulting Website

A modern, production-ready IT consulting and software development website built with Next.js and custom CSS.

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Pure Custom CSS (No Tailwind/Bootstrap)
- **Icons**: react-icons
- **Data**: Static JSON files

## 📁 Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with Navbar & Footer
│   ├── page.tsx           # Home page (Server Component)
│   ├── loading.tsx        # Loading state component
│   ├── robots.ts          # SEO - Search engine crawling rules
│   ├── sitemap.ts         # SEO - Dynamic sitemap generation
│   ├── about/             # About page
│   ├── services/          # Services page
│   ├── technologies/      # Technologies page
│   ├── portfolio/         # Portfolio page
│   ├── contact/           # Contact page
│   └── admin/             # Admin Dashboard (Users, Services, Portfolio)
├── components/
│   ├── ErrorBoundary.tsx  # Error boundary for production resilience
│   ├── layout/            # Layout components (Navbar, Footer)
│   ├── ui/                # Reusable UI components (Button, Card, etc.)
│   └── home/              # Home page sections
├── lib/                   # Shared utilities and hooks
│   ├── constants.ts       # Centralized constants (routes, durations, patterns)
│   ├── utils.ts           # Common utilities (formatting, string, array ops)
│   ├── validation.ts      # Form validation & input sanitization
│   ├── icons.ts           # Centralized icon utility (DRY)
│   └── hooks.ts           # Custom React hooks
├── types/
│   └── index.ts           # Shared TypeScript type definitions
├── styles/
│   ├── variables.css      # CSS custom properties
│   ├── globals.css        # Global styles & resets
│   ├── layout.css         # Layout utilities & grid
│   └── components.css     # All component-specific styles
├── data/                  # Static JSON data files
│   ├── services.json
│   ├── technologies.json
│   ├── portfolio.json
│   ├── testimonials.json
│   ├── users.json
│   ├── career.json
│   ├── cms.json
│   └── website-config.json
├── public/                # Static assets
└── .env.example           # Environment variables template

```

## 🎨 Design Features

- **Modern Premium Design**: Clean, professional IT-corporate aesthetic
- **Fully Responsive**: Mobile-first approach with breakpoints
- **Dark/Light Theme**: Seamless theme switching with persistent preferences
- **Custom CSS Variables**: Easy theming with CSS custom properties
- **Smooth Animations**: Hover effects, transitions, and scroll-triggered animations
- **SEO Optimized**: Meta tags, robots.txt, sitemap.xml, and semantic HTML
- **AEO/GEO Ready**: Optimized for AI search engines (ChatGPT, Gemini, Copilot)
- **Accessible**: ARIA labels and keyboard navigation
- **Type-Safe**: Full TypeScript coverage with strict mode
- **Secure by Design**: Input validation, sanitization, XSS prevention

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd The-Fortune-Tech
```

2. Install dependencies
```bash
npm install
```

3. Run development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## 📄 Pages

### Home Page
- Hero section with CTA
- Services overview (first 3 services)
- Why Choose Us section
- Technologies showcase
- Client testimonials
- CTA banner

### About Page
- Company overview
- Mission & Vision
- Core values
- Team section

### Services Page
- Detailed service descriptions
- Key features & benefits for each service
- CTA for custom solutions

### Technologies Page
- Categorized tech stack display
- Frontend, Backend, Database, Cloud & Tools

### Portfolio Page
- Project showcase cards
- Category, tech stack, and descriptions

### Contact Page
- Contact form (UI only, backend-ready)
- Contact information
- Google Maps embed

### Admin Panel (Protected)
- **Dashboard**: Real-time summary of Users, Projects, Services, and Careers
- **User Management**: View, Edit, and Manage user accounts and roles
- **Content Management**: Dedicated interfaces for Portfolio, Services, and Testimonials
- **Settings**: Global website configuration and SEO management
- **Dark Mode Support**: Fully themed admin interface with glassmorphism

## ⚡ Performance Optimizations

The following performance optimizations have been applied following [ENGINEERING_PRINCIPLES.md](./ENGINEERING_PRINCIPLES.md):

### 1. Server/Client Component Optimization

- **Home page (`app/page.tsx`)** is a Server Component, reducing client-side JavaScript
- Child components explicitly declare `'use client'` only when interactivity is needed
- This reduces bundle size and improves initial load time

### 2. Icon Library Optimization

- **Centralized icon utility** (`lib/icons.ts`) eliminates duplicate imports across components
- Uses Next.js `optimizePackageImports` for react-icons tree-shaking
- Reduces bundle size by avoiding full library imports

### 3. React.memo for Expensive Components

- **StatCard component** wrapped with `React.memo` to prevent unnecessary re-renders during counting animation
- Applied selectively where actual performance benefit exists (not over-applied)

### 4. Custom Hooks Centralization

- **`lib/hooks.ts`** contains reusable hooks:
  - `useCountUp` - Animated counter with easing
  - `useIntersectionObserver` - Scroll-triggered animations
  - `useScrolled` - Navbar scroll state
  - `useDebounce` - Input debouncing
- Follows DRY principle without over-abstracting

### 5. Memoized Callbacks

- Navbar uses `useCallback` for `toggleMenu` and `closeMenu` functions
- Prevents recreation of callback references on each render
- Applied only where it provides clear benefit (event handlers passed to child components)

### 6. Static Data Extraction

- Configuration data (nav links, stats, services) extracted to module level
- Computed once at module load, not on every render
- Improves render performance for data-driven components

### 7. Next.js Configuration Optimizations

```typescript
// next.config.ts
{
  images: {
    formats: ['image/avif', 'image/webp'], // Modern image formats
  },
  compiler: {
    removeConsole: { exclude: ['error', 'warn'] }, // Production only
  },
  experimental: {
    optimizePackageImports: ['react-icons'], // Tree-shaking
  },
  reactStrictMode: true,
  poweredByHeader: false, // Security
}
```

### 8. Passive Event Listeners

- Scroll event listeners use `{ passive: true }` for better scroll performance

## 🏗️ Architectural Decisions

### What We Applied (Following Engineering Principles)

| Principle | Implementation | Rationale |
|-----------|----------------|-----------|
| **DRY** | Centralized `lib/constants.ts`, `lib/utils.ts`, `lib/validation.ts` | Eliminated duplicate code, magic numbers, and validation logic |
| **KISS** | Simple utility functions, no over-abstraction | Easy to understand and maintain |
| **Type Safety** | Shared `types/index.ts` with strict TypeScript | Frontend-backend type contracts, compile-time safety |
| **Secure by Design** | Input validation and sanitization in `lib/validation.ts` | XSS prevention, rate limiting, safe form handling |
| **Fail Fast** | Early validation with clear error messages | Better UX, prevents invalid data propagation |
| **SEO/AEO/GEO** | `robots.ts`, `sitemap.ts`, semantic HTML | Optimized for Google, ChatGPT, Gemini, and AI crawlers |
| **React.memo** | Applied to StatCard only | Clear performance benefit during animations |
| **useCallback** | Applied to Navbar toggle functions | Prevents re-creation when passed to children |
| **Server Components** | Home page as Server Component | Reduces client bundle size |
| **Error Boundaries** | `ErrorBoundary.tsx` wrapping app | Production resilience, graceful error handling |

### What We Intentionally Did NOT Apply

| Pattern | Reason for Skipping |
|---------|---------------------|
| **useMemo everywhere** | Most computations are simple; memoization overhead not justified |
| **Redux/Zustand** | Theme context sufficient; no complex global state needed |
| **Code splitting for home sections** | All sections visible on initial load; would add network overhead |
| **Lazy loading for above-the-fold** | Hero section needs immediate display |
| **Service Worker caching** | YAGNI - not needed for current use case |

## 🔧 Customization

### Update Colors

Edit `styles/variables.css`:

```css
:root {
  --primary-color: #0F172A;
  --secondary-color: #0EA5E9;
  --accent-color: #6366F1;
  /* ... */
}
```

### Add New Services

Edit `data/services.json`:

```json
{
  "id": "new-service",
  "title": "Service Name",
  "description": "Description",
  "icon": "FaIconName",
  "features": ["Feature 1", "Feature 2"],
  "benefits": ["Benefit 1", "Benefit 2"]
}
```

### Add Technologies

Edit `data/technologies.json` and add items to existing categories or create new ones.

## 🧰 Utilities & Helpers

### Constants (`lib/constants.ts`)

Centralized constants eliminate magic numbers and strings:

```typescript
import { ROUTES, ANIMATION_DURATION, PATTERNS, ERROR_MESSAGES } from '@/lib/constants';

// Use consistent routes
<Link href={ROUTES.ABOUT}>About</Link>

// Use consistent animation timings
setTimeout(() => {}, ANIMATION_DURATION.BASE); // 300ms

// Use regex patterns
const isValid = PATTERNS.EMAIL.test(email);

// Use error messages
toast.error(ERROR_MESSAGES.INVALID_EMAIL);
```

### Utilities (`lib/utils.ts`)

30+ utility functions for common operations:

```typescript
import { cn, formatDate, truncate, slugify, copyToClipboard } from '@/lib/utils';

// Conditional classNames
<div className={cn('btn', isActive && 'active', className)} />

// Date formatting
<p>{formatDate(createdAt)}</p> // "December 23, 2025"

// String truncation
<p>{truncate(description, 100)}</p> // "Lorem ipsum..."

// Slug generation
const slug = slugify('Hello World!'); // "hello-world"

// Copy to clipboard
await copyToClipboard(text);
```

### Validation (`lib/validation.ts`)

Form validation and input sanitization:

```typescript
import { validateEmail, validateContactForm, sanitizeInput } from '@/lib/validation';

// Email validation
const { isValid, error } = validateEmail(email);
if (!isValid) setError(error);

// Form validation
const errors = validateContactForm(formData);

// Input sanitization (XSS prevention)
const clean = sanitizeInput(userInput);
```

### TypeScript Types (`types/index.ts`)

Shared type definitions for type safety:

```typescript
import type { Service, Portfolio, ContactFormData } from '@/types';

interface ServiceCardProps {
    service: Service;
    featured?: boolean;
}
```

## 🎯 Backend Integration (Future)

The architecture is designed to be backend-ready:

1. **Contact Form**: Replace `handleSubmit` in `app/contact/page.tsx` with API call
2. **Data Fetching**: Replace JSON imports with API calls
3. **Dynamic Routes**: Add dynamic routes for individual portfolio items/services

Example API integration:

```typescript
// Instead of:
import serviceData from '../../data/services.json';

// Use:
const response = await fetch('/api/services');
const serviceData = await response.json();
```

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🎨 CSS Architecture

- **variables.css**: Design tokens (colors, spacing, shadows)
- **globals.css**: Resets, base typography
- **layout.css**: Container, grid, navbar, footer
- **components.css**: All component-specific styles

## 🚀 Performance Summary

| Optimization | Impact |
|-------------|--------|
| Server Components | Reduced client JS bundle |
| Icon tree-shaking | Smaller bundle (~30-40% reduction for icons) |
| React.memo on StatCard | Smooth counting animation |
| Module-level static data | Faster re-renders |
| Modern image formats | 25-50% smaller images |
| Passive event listeners | Smoother scrolling |

## 📝 License

This project is private and proprietary.

## 👨‍💻 Development Notes

### Code Organization

- All components use custom CSS classes (no inline styles)
- Icons are dynamically loaded from react-icons via centralized utility
- Forms are controlled components with built-in validation
- TypeScript with strict mode for type safety
- ESLint configured for code quality

### Utilities & Helpers

- **`lib/constants.ts`**: All magic numbers, routes, patterns, and messages
- **`lib/utils.ts`**: 30+ utility functions (date, string, array, clipboard operations)
- **`lib/validation.ts`**: Form validation, input sanitization, rate limiting
- **`lib/hooks.ts`**: Custom React hooks for reusable logic
- **`lib/icons.ts`**: Centralized icon imports

### Type Safety

- Shared TypeScript types in `types/index.ts`
- Full coverage across all components
- Type-safe API response handling
- Frontend-backend type contracts

### Security Features

- Input validation with comprehensive error messages
- HTML/text sanitization to prevent XSS attacks
- Rate limiting helpers for form submissions
- Environment variables template (`.env.example`)

### SEO & Discoverability

- Dynamic sitemap generation (`app/sitemap.ts`)
- Search engine crawling rules (`app/robots.ts`)
- Optimized for traditional SEO (Google, Bing)
- AEO ready (Voice assistants, featured snippets)
- GEO optimized (ChatGPT, Gemini, AI search engines)

## 🔮 Future Enhancements

- [x] Dark/Light theme toggle
- [x] Error boundaries for production resilience
- [x] SEO files (robots.txt, sitemap.xml)
- [x] Form validation and sanitization
- [x] Image optimization with next/image
- [ ] Blog section
- [ ] Case study detail pages
- [ ] Contact form backend integration
- [ ] Animation library (Framer Motion)
- [ ] Analytics integration
- [ ] CMS integration (Contentful/Sanity)
- [ ] Unit tests (Jest + React Testing Library)
- [ ] E2E tests (Playwright)

---

Built with ❤️ by The Fortune Tech Team

