# MO-TOUCH

> Modern touch-optimized web application with advanced animations and interactions

A sophisticated React-based web application featuring smooth GSAP animations, draggable image galleries, and an immersive user experience. Built with modern web technologies and best practices.

## ✨ Features

- **Advanced Animations**: Smooth GSAP-powered transitions and micro-interactions
- **Draggable Gallery**: Interactive image gallery with drag-and-drop functionality
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Touch-Optimized**: Enhanced touch interactions and gestures
- **Modern UI**: Dark theme with elegant visual design
- **Smooth Routing**: Seamless page transitions with React Router

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/sliiqque/mo-touch.git
cd mo-touch

# Install dependencies
npm install

# Start development server
npm run dev
```

### Development

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🛠️ Tech Stack

### Core Technologies

- **React 19.2.0** - Modern React with latest features
- **TypeScript 5.9.3** - Type-safe development
- **Vite 7.3.1** - Fast build tool and dev server
- **React Router 7.13.0** - Client-side routing

### Animation & UI

- **GSAP 3.14.2** - Professional animation library
- **GSAP Plugins**: Draggable, Flip, ScrollTrigger, CustomEase
- **CSS3** - Modern CSS with custom properties

### Development Tools

- **ESLint 9.39.1** - Code linting and quality
- **TypeScript ESLint** - Type-aware linting rules
- **React Hooks Plugin** - React best practices

## 📁 Project Structure

```
mo-touch/
├── public/                 # Static assets
│   ├── vite.svg            # Default Vite icon
│   └── ...                 # Other static files
├── src/
│   ├── components/          # React components
│   │   ├── About.tsx       # About page component
│   │   ├── Contact.tsx      # Contact page component
│   │   ├── CustomCursor.tsx # Custom cursor component
│   │   ├── Footer.tsx       # Footer component
│   │   ├── Gallery.tsx      # Main gallery component
│   │   ├── Header.tsx       # Navigation header
│   │   ├── Layout.tsx       # Page layout wrapper
│   │   ├── Preloader.tsx    # Loading preloader
│   │   └── Services.tsx     # Services page component
│   ├── context/             # React context
│   │   └── UIContext.tsx    # UI state management
│   ├── styles/              # CSS stylesheets
│   │   └── pages.css        # Page-specific styles
│   ├── assets/              # Static assets
│   │   ├── react.svg        # React logo
│   │   └── placeholder-*.svg # Placeholder images
│   ├── App.tsx              # Main application component
│   ├── main.tsx             # Application entry point
│   ├── index.css            # Global styles
│   ├── theme.css            # Theme variables
│   └── data.ts             # Static data and configurations
├── index.html               # HTML template
├── package.json            # Dependencies and scripts
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript configuration
├── eslint.config.js        # ESLint configuration
└── README.md               # This file
```

## 🎯 Key Components

### Gallery Component

The heart of the application featuring:

- **Draggable Images**: Smooth drag-and-drop functionality
- **Grid Layout**: Responsive grid system
- **Zoom Functionality**: Image zoom with smooth transitions
- **Flip Animations**: Advanced layout animations
- **Touch Gestures**: Mobile-optimized interactions

### About Page

Professional artist portfolio with:

- **Hero Section**: Eye-catching introduction
- **Artist Profile**: Professional presentation
- **Partners Section**: Collaborations showcase
- **Testimonials**: Client feedback and reviews
- **Smooth Scrolling**: ScrollTrigger animations

### Services Page

Service offerings with:

- **Service Cards**: Interactive service presentations
- **Hover Effects**: Sophisticated hover states
- **Responsive Layout**: Mobile-friendly design
- **Call-to-Action**: Clear conversion paths

## 🎨 Design System

### Color Palette

- **Primary**: Dark theme with gold accents (#a64b23)
- **Background**: Deep blacks (#0a0a0a)
- **Text**: Off-white (#e0e0e0)
- **Accent**: Gold (#d4af37)

### Typography

- **Headings**: "TheGoodMonolith" monospace
- **Body**: "PPNeueMontreal" sans-serif
- **Responsive**: Fluid typography with clamp()

### Animation Principles

- **Duration**: 150-300ms for micro-interactions
- **Easing**: Custom GSAP easings for natural motion
- **Performance**: Transform and opacity for 60fps
- **Accessibility**: Respects `prefers-reduced-motion`

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file for local development:

```env
# API endpoints
VITE_API_URL=https://api.example.com

# Feature flags
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_DEBUG=true
```

### Build Configuration

The project uses Vite with React plugin. Key configurations in `vite.config.ts`:

```typescript
export default defineConfig({
  plugins: [react()],
  // Additional configuration can be added here
});
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Environment Setup

Ensure your hosting environment supports:

- **Node.js 18+** (for SSR if needed)
- **HTTPS** for secure connections
- **Static file serving** for assets

## 🧪 Testing

### Linting

```bash
# Run ESLint
npm run lint

# Fix linting issues
npm run lint -- --fix
```

### Manual Testing Checklist

- [ ] All pages load without errors
- [ ] Animations are smooth on target devices
- [ ] Touch interactions work on mobile
- [ ] Responsive design works on all screen sizes
- [ ] No console errors in production build

## 📊 Performance

### Optimization Techniques Used

- **Code Splitting**: Lazy loading of components
- **Tree Shaking**: Unused code elimination
- **Asset Optimization**: Compressed images and assets
- **GSAP Optimization**: Efficient animation performance

### Performance Metrics

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Time to Interactive**: < 3.5s
- **Cumulative Layout Shift**: < 0.1

## 🔒 Security

### Implemented Measures

- **TypeScript**: Type safety prevents runtime errors
- **ESLint**: Code quality and security rules
- **Dependency Updates**: Regular security patches

### Recommendations for Production

- **HTTPS**: Enforce secure connections
- **CSP Headers**: Content Security Policy
- **Security Headers**: X-Frame-Options, X-Content-Type-Options
- **Input Validation**: Sanitize user inputs

## 🌐 Browser Support

### Modern Browsers

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Mobile Browsers

- iOS Safari 14+
- Chrome Mobile 90+
- Samsung Internet 15+

## 🤝 Contributing

1. Fork repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use ESLint configuration
- Write meaningful commit messages
- Test on multiple devices
- Maintain responsive design
- Ensure accessibility compliance

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **GSAP Team** - Amazing animation library
- **React Team** - Excellent UI framework
- **Vite Team** - Fast build tool
- **TypeScript Team** - Type-safe JavaScript

## 📞 Support

For questions and support:

- Create an issue in the GitHub repository
- Check existing documentation
- Review the code comments

---

**Built with ❤️ by [Sliiqque](https://github.com/sliiqque)**
