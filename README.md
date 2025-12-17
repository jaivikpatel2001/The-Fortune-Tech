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
│   ├── page.tsx           # Home page
│   ├── about/             # About page
│   ├── services/          # Services page
│   ├── technologies/      # Technologies page
│   ├── portfolio/         # Portfolio page
│   └── contact/           # Contact page
├── components/
│   ├── layout/            # Layout components (Navbar, Footer)
│   ├── ui/                # Reusable UI components (Button, Card, etc.)
│   └── home/              # Home page sections
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

## 🚀 Performance

- Server Components by default (faster initial load)
- Client Components only where needed (Navbar, Contact form)
- Optimized CSS (no unused styles)
- Semantic HTML for better SEO

## 📝 License

This project is private and proprietary.

## 👨‍💻 Development Notes

- All components use custom CSS classes (no inline styles)
- Icons are dynamically loaded from react-icons
- Forms are controlled components ready for validation
- TypeScript for type safety
- ESLint configured for code quality

## 🔮 Future Enhancements

- [ ] Dark/Light theme toggle
- [ ] Blog section
- [ ] Case study detail pages
- [ ] Contact form backend integration
- [ ] Animation library (Framer Motion)
- [ ] Image optimization with next/image
- [ ] Analytics integration
- [ ] CMS integration (Contentful/Sanity)

---

Built with ❤️ by The Fortune Tech Team
