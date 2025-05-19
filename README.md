# Nodebridge Africa Web App

A modern, modular, and scalable web application for Nodebridge Africa, built with Next.js, TypeScript, Tailwind CSS, Framer Motion, and Radix UI. This project powers the Nodebridge Africa landing page, blog, documentation, and community resources.

---

## 🚀 Features

- **Landing Page**: Modular, animated sections (Hero, Features, Gallery, Testimonials, etc.)
- **Gallery**: Showcases images from past events and workshops (Unsplash-powered)
- **Blog**: Dynamic blog with filters, featured posts, and pagination
- **About, Privacy, Terms, Sponsor**: Dedicated pages with modular content
- **UI Components**: Reusable, accessible components styled with Tailwind CSS and Radix UI
- **TypeScript**: Type-safe codebase
- **Framer Motion**: Smooth animations for sections and UI elements
- **Dark Mode**: Fully supported

---

## 📁 Folder Structure

```
.
├── app/                        # Main application routes and pages
│   ├── (landing)/              # Landing page sections
│   │   └── sections/
│   │       ├── CoreFeatures.tsx
│   │       ├── CtaBanner.tsx
│   │       ├── EducationHub.tsx
│   │       ├── FAQ.tsx
│   │       ├── Gallery.tsx
│   │       ├── Hero.tsx
│   │       ├── PartnersMarquee.tsx
│   │       ├── SupportedNetworks.tsx
│   │       └── Testimonials.tsx
│   ├── about/                  # About page and sections
│   │   ├── page.tsx
│   │   └── sections/
│   │       └── AboutContent.tsx
│   ├── blog/                   # Blog page and sections
│   │   ├── page.tsx
│   │   └── sections/
│   │       ├── BlogFeatured.tsx
│   │       ├── BlogFilters.tsx
│   │       ├── BlogGrid.tsx
│   │       ├── BlogHero.tsx
│   │       ├── BlogNewsletter.tsx
│   │       └── BlogPagination.tsx
│   ├── privacy/                # Privacy policy page and content
│   │   ├── page.tsx
│   │   └── sections/
│   │       └── PrivacyContent.tsx
│   ├── terms/                  # Terms of service page and content
│   │   ├── page.tsx
│   │   └── sections/
│   │       └── TermsContent.tsx
│   ├── sponsor/                # Sponsorship page and sections
│   │   ├── page.tsx
│   │   └── sections/
│   │       ├── SponsorBenefits.tsx
│   │       ├── SponsorContact.tsx
│   │       ├── SponsorHero.tsx
│   │       ├── SponsorPackages.tsx
│   │       └── SponsorTestimonials.tsx
│   ├── launch/                 # Launch page for RPC endpoints
│   │   └── page.tsx
│   ├── globals.css             # Global styles (Tailwind)
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Main landing page
├── components/                 # Shared React components
│   ├── layout/                 # Layout components (Header, Footer)
│   ├── providers/              # Context providers
│   └── ui/                     # UI components (buttons, cards, etc.)
├── constant/                   # App-wide constants
├── data/                       # Static data (e.g., blog entries)
├── hooks/                      # Custom React hooks
├── lib/                        # Utility functions and libraries
├── public/                     # Static assets (if any)
├── package.json                # Project metadata and dependencies
├── tailwind.config.ts          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
└── ...                         # Other config and system files
```

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 13+](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/), [Radix UI](https://www.radix-ui.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Forms**: [React Hook Form](https://react-hook-form.com/)
- **Linting**: ESLint

---

## ⚡ Getting Started

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd nodebridge
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```
3. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
4. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

---

## 🖼️ Customization & Extending

- **Gallery Images**: Update `app/(landing)/sections/Gallery.tsx` to change event/workshop images (uses Unsplash by default).
- **UI Components**: Add or modify components in `components/ui/`.
- **Content**: Edit section files in `app/(landing)/sections/` or other page directories.
- **Theming**: Adjust Tailwind config and CSS variables in `app/globals.css`.
- **Add New Pages**: Create a new folder in `app/` and add a `page.tsx` file.

---

## 🧩 Notable Components & Patterns

- **Modular Sections**: Each landing page section is a standalone React component for easy reordering and reuse.
- **Gallery**: Responsive, animated grid of Unsplash images with captions.
- **Blog**: Filterable, paginated, and supports featured posts.
- **Accessibility**: Uses Radix UI primitives for accessible UI elements.
- **Dark Mode**: Fully supported via Tailwind and CSS variables.

---

## 📝 Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run start` — Start production server
- `npm run lint` — Lint codebase

---

## 🧪 Testing & Linting

- **Linting**: ESLint is configured for TypeScript and Next.js best practices.
- **Testing**: (Add your preferred testing setup, e.g., Jest, React Testing Library)

---

## 🌐 Deployment

- **Static Export**: The app is configured for static export (`output: 'export'` in `next.config.js`).
- **Image Optimization**: Images are unoptimized for static export (`images: { unoptimized: true }`).
- **Recommended**: Deploy on [Vercel](https://vercel.com/) or any static hosting provider.

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙋 FAQ

- **How do I add a new section to the landing page?**
  - Create a new component in `app/(landing)/sections/` and import it in `app/page.tsx`.
- **How do I update the gallery?**
  - Edit the `galleryImages` array in `Gallery.tsx`.
- **How do I add a new blog post?**
  - Add your post data to the appropriate file in `data/blog/`.

---

For more information, see the code comments and explore the modular structure. If you have questions, open an issue or reach out to the maintainers.
