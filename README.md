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
│   ├── about/             # About page
│   ├── services/          # Services page
│   ├── technologies/      # Technologies page
│   ├── portfolio/         # Portfolio page
│   └── contact/           # Contact page
├── components/
│   ├── layout/            # Layout components (Navbar, Footer)
│   ├── ui/                # Reusable UI components (Button, Card, etc.)
│   └── home/              # Home page sections
├── lib/                   # Shared utilities and hooks
│   ├── icons.ts           # Centralized icon utility (DRY)
│   └── hooks.ts           # Custom React hooks
├── styles/
│   ├── variables.css      # CSS custom properties
│   ├── globals.css        # Global styles & resets
│   ├── layout.css         # Layout utilities & grid
│   └── components.css     # Component styles
├── data/                  # Static JSON data files
│   ├── services.json
│   ├── technologies.json
│   ├── portfolio.json
│   └── testimonials.json
└── public/                # Static assets

```

## 🎨 Design Features

- **Modern Premium Design**: Clean, professional IT-corporate aesthetic
- **Fully Responsive**: Mobile-first approach with breakpoints
- **Custom CSS Variables**: Easy theming with CSS custom properties
- **Smooth Animations**: Hover effects and transitions
- **SEO Optimized**: Proper meta tags and semantic HTML
- **Accessible**: ARIA labels and keyboard navigation

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

### What We Applied (Following ENGINEERING_PRINCIPLES.md)

| Principle | Implementation | Rationale |
|-----------|---------------|-----------|
| **DRY** | Centralized `lib/icons.ts` and `lib/hooks.ts` | Eliminated 4+ duplicate icon import patterns |
| **KISS** | Simple utility functions, no over-abstraction | Easy to understand and maintain |
| **React.memo** | Applied to StatCard only | Clear performance benefit during animations |
| **useCallback** | Applied to Navbar toggle functions | Prevents re-creation when passed to children |
| **Server Components** | Home page as Server Component | Reduces client bundle size |

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

- All components use custom CSS classes (no inline styles)
- Icons are dynamically loaded from react-icons via centralized utility
- Forms are controlled components ready for validation
- TypeScript for type safety
- ESLint configured for code quality
- Custom hooks in `lib/hooks.ts` for reusable logic

## 🔮 Future Enhancements

- [x] Dark/Light theme toggle
- [ ] Blog section
- [ ] Case study detail pages
- [ ] Contact form backend integration
- [ ] Animation library (Framer Motion)
- [x] Image optimization with next/image
- [ ] Analytics integration
- [ ] CMS integration (Contentful/Sanity)
- [ ] Error boundaries for production resilience

---

Built with ❤️ by The Fortune Tech Team

