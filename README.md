# ZakPT - Digital Workshop

A modern, interactive personal website showcasing homelabs, content creation, photography, and tech projects. Built with vanilla HTML, CSS, and JavaScript featuring a cyber-terminal aesthetic.

![Website Preview]((https://nettechzak.github.io/ZakPT_Website/))

---

## 🚀 Features

### Interactive Components
- **🔍 Smart Search** - Fuse.js-powered fuzzy search across all content
- **📊 Live Modals** - Click servers, network nodes, and services for detailed specs
- **🎨 Dynamic Content** - YouTube videos and blog posts auto-loaded via APIs
- **🖼️ Photo Gallery** - Filterable photography portfolio with categories
- **✨ Animations** - Scroll-triggered effects, particles, glitch text, typing animations

### Pages
1. **Home** - Hero section, workbench projects, server rack preview
2. **Content** - Videos, blog posts, newsletter signup
3. **Homelab** - Interactive server rack, network topology, services dashboard
4. **Photography** - Masonry gallery with category filters
5. **About** - Bio, skills, timeline, contact form
6. **Gear** - Equipment and software stack
7. **Sponsors** - Support options and affiliate products
8. **Links** - Curated resource collection

### Data-Driven
- **5 Servers** - PROXMOX-01, TRUENAS-CORE, UNIFI-UDM-PRO, UDM-ENTERPRISE-POE, NUC-CLUSTER-01
- **6 Network Nodes** - UDM-PRO, USW-PRO, UDM-ENTERPRISE-POE, U6-PRO, Server VLAN, IoT VLAN
- **6 Services** - Plex, Pi-hole, Home Assistant, Grafana, Portainer, Nginx
- **Cybersecurity Hub** - Projects, Cheatsheets, Tools
- **Auto Search Index** - Everything automatically searchable across all 8 pages

---

## 📚 Documentation

### 🎯 Start Here
- **[README.md](file:///Users/macbookpro/Documents/My%20Websit%20/README.md)** - This file (overview)
- **[instructions.md](file:///Users/macbookpro/Documents/My%20Websit%20/instructions.md)** - Quick start guide

### 📖 Complete Guides
- **[CUSTOMIZATION_GUIDE.md](file:///Users/macbookpro/Documents/My%20Websit%20/CUSTOMIZATION_GUIDE.md)** - How to customize EVERYTHING (500+ lines)
- **[INTEGRATION_SUMMARY.md](file:///Users/macbookpro/Documents/My%20Websit%20/INTEGRATION_SUMMARY.md)** - Technical architecture & features
- **[walkthrough.md](file:///Users/macbookpro/.gemini/antigravity/brain/5f715be2-481a-49e7-b646-ecdadf3ff9ba/walkthrough.md)** - Modal system implementation walkthrough

---

## 🎨 Quick Start

### 1. Clone or Download
```bash
git clone https://github.com/yourusername/zakpt-website.git
cd zakpt-website
```

### 2. Open Locally
- Simply open `index.html` in your browser
- No build process or server required!

### 3. Customize
See **[CUSTOMIZATION_GUIDE.md](file:///Users/macbookpro/Documents/My%20Websit%20/CUSTOMIZATION_GUIDE.md)** for detailed instructions on changing:
- Colors & Theme
- Content & Text
- Navigation
- Server/Service Data
- Photos
- Forms
- And more!

### 4. Deploy
Upload to any static hosting:
- **Netlify**: Drag & drop at https://app.netlify.com/drop
- **Vercel**: GitHub integration
- **GitHub Pages**: Free hosting
- **Cloudflare Pages**: Fast CDN

---

## 🛠️ Technology Stack

### Core
- **HTML5** - Semantic markup
- **CSS3** - Custom properties, Grid, Flexbox, Animations
- **JavaScript (ES6+)** - Vanilla JS, no frameworks

### Libraries
- **[Fuse.js](https://fusejs.io/)** - Fuzzy search (6.6.2)
- **[Font Awesome](https://fontawesome.com/)** - Icons
- **[Google Fonts](https://fonts.google.com/)** - Outfit, JetBrains Mono

### APIs (Optional)
- **YouTube Data API v3** - Video fetching
- **RSS Feeds** - Blog post integration
- **Formspree** - Contact form
- **Mailchimp** - Newsletter

---

## 📁 File Structure

```
My Websit/
│
├── 📄 HTML Pages (8)
│   ├── index.html              Home page
│   ├── content.html            Content/blog
│   ├── homelab.html            Homelab showcase
│   ├── photography.html        Photo gallery
│   ├── about.html              About/contact
│   ├── gear.html               Equipment list
│   ├── sponsors.html           Support options
│   └── links.html              Resource links
│
├── 🎨 Styles & Scripts
│   ├── style.css               All styling (5000+ lines)
│   ├── data.js                 Configuration & Static Data
│   ├── enhanced.js             Interactive features (Logic only)
│   ├── main.js                 Core functionality
│   └── photography.js          Gallery logic
│
├── 📚 Documentation
│   ├── README.md               This file
│   ├── CUSTOMIZATION_GUIDE.md  Complete customization guide
│   ├── instructions.md         Quick start & common tasks
│   ├── INTEGRATION_SUMMARY.md  Technical overview
│   ├── gear.md                 Gear page source
│   ├── sponsors.md             Sponsors page source
│   └── links.md                Links page source
│
└── 🖼️ Media
    └── photos/                 Gallery images
```

---

## 🎯 Customization Overview

### Colors (5 minutes)
```css
/* style.css - lines 1-30 */
:root {
    --accent-orange: #FF9900;   /* Change primary accent */
    --accent-purple: #9D00FF;   /* Change secondary accent */
    --bg-primary: #0a0a0a;      /* Change background */
}
```

### Content (10 minutes)
```javascript
// enhanced.js - lines 19-55
const WORKBENCH_DATA = [
    {
        title: 'Your Project',
        description: 'Your description',
        // ... edit project cards
    }
];
```

### Servers (15 minutes)
```javascript
// enhanced.js - lines 61-131
const SERVER_DATA = {
    'your-server': {
        name: 'YOUR-SERVER',
        specs: { /* ... */ },
        // ... add/edit servers (5 total)
    }
};
```

**Full details**: See [CUSTOMIZATION_GUIDE.md](file:///Users/macbookpro/Documents/My%20Websit%20/CUSTOMIZATION_GUIDE.md)

---

## 🚢 Deployment Checklist

Before deploying:

- [ ] Replace all `YOUR_NAME`, `YOUR_HANDLE` placeholders
- [ ] Update social media URLs in About page
- [ ] Add real YouTube Channel ID in `enhanced.js`
- [ ] Configure newsletter form (Mailchimp)
- [ ] Configure contact form (Formspree ID)
- [ ] Update `SERVER_DATA` with real specifications
- [ ] Update `SERVICE_DATA` with running services
- [ ] Replace demo photos in `/photos/` folder
- [ ] Add SEO meta tags to all pages
- [ ] Compress images (< 500KB each)
- [ ] Test all links (navigation, external, affiliate)
- [ ] Test modals (servers, nodes, services)
- [ ] Test search functionality
- [ ] Check mobile responsiveness
- [ ] Review browser console for errors

---

## 💡 Common Tasks

| Task | Location | Time |
|------|----------|------|
| Change brand name | All HTML `<nav>` | 2 min |
| Change colors | `style.css` lines 1-30 | 5 min |
| Add project | `enhanced.js` WORKBENCH_DATA | 10 min |
| Add server | `enhanced.js` SERVER_DATA | 15 min |
| Add service | `enhanced.js` SERVICE_DATA | 10 min |
| Add photo | `/photos/` + `photography.html` | 5 min |
| Update social links | `about.html` social cards | 5 min |
| Configure forms | Form action attributes | 10 min |

**Full guide**: [instructions.md](file:///Users/macbookpro/Documents/My%20Websit%20/instructions.md)

---

## 🔧 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

**Note**: Some animations may be reduced on older devices for performance.

---

## 📱 Responsive Design

- **Desktop** (> 1024px) - Full layout with all features
- **Tablet** (768px - 1024px) - Adjusted grids and spacing
- **Mobile** (< 768px) - Stacked layout, simplified navigation

---

## 🎓 Learn More

### Included Features
- Intersection Observer for scroll animations
- CSS Grid and Flexbox layouts
- CSS custom properties (variables)
- ES6+ JavaScript features
- Modal system architecture
- Search integration with Fuse.js
- API integration patterns
- Responsive image handling

### Tutorials Referenced
- [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [Fuse.js Documentation](https://fusejs.io/)
- [Font Awesome Icons](https://fontawesome.com/icons)

---

## 📝 License

This project is provided as-is for personal and educational use. Feel free to customize and deploy for your own website.

---

## 🙏 Credits

- **Design Inspiration**: Cyber/terminal aesthetics, modern tech portfolios
- **Icons**: Font Awesome
- **Fonts**: Google Fonts (Outfit, JetBrains Mono)
- **Search**: Fuse.js library
- **Hosting**: Netlify/Vercel/GitHub Pages

---

## 📧 Contact

- **Website**: [zakpt.com](https://zakpt.com)
- **YouTube**: [@ZakPT](https://youtube.com/@zakpt)
- **GitHub**: [@zakpt](https://github.com/zakpt)
- **Twitter**: [@zakpt](https://twitter.com/zakpt)

---

## 🚀 Get Started Now!

1. **Read**: [instructions.md](file:///Users/macbookpro/Documents/My%20Websit%20/instructions.md) for quick start
2. **Customize**: [CUSTOMIZATION_GUIDE.md](file:///Users/macbookpro/Documents/My%20Websit%20/CUSTOMIZATION_GUIDE.md) for details
3. **Deploy**: Upload to Netlify and go live!

---

*Built with ❤️ using vanilla HTML, CSS, and JavaScript*

---

## 🔧 Advanced Setup & Configuration

### Environment Setup

#### Local Development Server
```bash
# Using Python (if installed)
python -m http.server 8000

# Using Node.js
npx http-server -p 8000

# Using PHP
php -S localhost:8000

# Then visit http://localhost:8000
```

#### Development Tools
- **VS Code Extensions**: HTML CSS Support, JavaScript (ES6) code snippets, Live Server
- **Browser DevTools**: Chrome DevTools for debugging
- **Validators**: HTML Validator, CSS Validator, JavaScript Linter

### Configuration Management

#### Environment Variables
Create `config.js` for sensitive data:
```javascript
// config.js (don't commit to git)
const CONFIG = {
    YOUTUBE_API_KEY: 'your_api_key_here',
    FORMSPREE_ID: 'your_form_id_here',
    ANALYTICS_ID: 'your_analytics_id_here'
};
```

#### Feature Flags
Control experimental features:
```javascript
// In enhanced.js
const FEATURES = {
    ENABLE_ANALYTICS: true,
    ENABLE_PWA: false,
    ENABLE_COMMENTS: false,
    DEBUG_MODE: false
};
```

### API Integration

#### YouTube API Setup
1. **Create Project**: https://console.cloud.google.com/
2. **Enable API**: YouTube Data API v3
3. **Create Credentials**: API Key
4. **Restrict Key**: HTTP referrer restriction for your domain
5. **Update CONFIG**: Add key to `enhanced.js`

#### RSS Feed Integration
```javascript
// Add to enhanced.js
async function fetchRSSFeed(url) {
    try {
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`);
        const data = await response.json();
        return data.items;
    } catch (error) {
        console.error('RSS fetch failed:', error);
        return [];
    }
}
```

### Performance Monitoring

#### Lighthouse Audit
```bash
# Install Lighthouse
npm install -g lighthouse

# Run audit
lighthouse https://yourdomain.com --output html --output-path ./report.html
```

#### WebPageTest
- **URL**: https://www.webpagetest.org/
- **Test Settings**: Simple test, Chrome browser
- **Advanced**: Test from multiple locations

### Accessibility Testing

#### Automated Tools
- **WAVE**: https://wave.webaim.org/
- **Lighthouse Accessibility**: Built into Chrome DevTools
- **axe DevTools**: Browser extension

#### Manual Testing
- **Keyboard Navigation**: Tab through all interactive elements
- **Screen Reader**: Use NVDA or JAWS
- **Color Contrast**: Check with contrast ratio tools
- **Focus Indicators**: Ensure visible focus outlines

### Cross-Browser Testing

#### BrowserStack (Paid)
- Test on real devices and browsers
- Automated screenshot comparison
- JavaScript error monitoring

#### Free Alternatives
- **Browserling**: Limited free tests
- **LambdaTest**: Limited free minutes
- **Manual Testing**: Test on available devices

### Error Monitoring

#### Sentry Integration
```javascript
// Add to enhanced.js
import * as Sentry from "@sentry/browser";

Sentry.init({
  dsn: "your_dsn_here",
  integrations: [new Sentry.BrowserTracing()],
  tracesSampleRate: 1.0,
});
```

#### Custom Error Handling
```javascript
window.addEventListener('error', (event) => {
    // Log to monitoring service
    console.error('JavaScript Error:', event.error);
    // Send to analytics or error tracking
});

window.addEventListener('unhandledrejection', (event) => {
    // Handle promise rejections
    console.error('Unhandled Promise Rejection:', event.reason);
});
```

### Content Management

#### Markdown Processing
For dynamic content from markdown files:
```javascript
// Add marked.js library
// https://github.com/markedjs/marked

function renderMarkdown(content) {
    return marked.parse(content);
}

// Usage
fetch('content.md')
    .then(response => response.text())
    .then(text => {
        document.getElementById('content').innerHTML = renderMarkdown(text);
    });
```

#### Static Site Generation
Consider tools like:
- **Eleventy**: Simple static site generator
- **Hugo**: Fast Go-based generator
- **Jekyll**: GitHub Pages native

### Internationalization (i18n)

#### Basic Multi-language Support
```javascript
// translations.js
const translations = {
    en: {
        home: 'Home',
        about: 'About',
        contact: 'Contact'
    },
    es: {
        home: 'Inicio',
        about: 'Acerca de',
        contact: 'Contacto'
    }
};

function translate(key, lang = 'en') {
    return translations[lang][key] || key;
}

// Usage
document.querySelector('.nav-home').textContent = translate('home', currentLang);
```

### Progressive Enhancement

#### Core Functionality First
- Ensure site works without JavaScript
- Add enhancements progressively
- Graceful degradation for older browsers

#### Feature Detection
```javascript
// Check for modern features
const supportsIntersectionObserver = 'IntersectionObserver' in window;
const supportsFetch = 'fetch' in window;
const supportsWebGL = (() => {
    try {
        const canvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && canvas.getContext('webgl'));
    } catch (e) {
        return false;
    }
})();
```

### Continuous Integration

#### GitHub Actions Workflow
```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    - name: Install dependencies
      run: npm install
    - name: Run tests
      run: npm test
    - name: Build
      run: npm run build
    - name: Deploy to staging
      if: github.ref != 'refs/heads/main'
      run: echo "Deploy to staging"
    - name: Deploy to production
      if: github.ref == 'refs/heads/main'
      run: echo "Deploy to production"
```

### Backup and Recovery

#### Automated Backups
```bash
# Backup script (backup.sh)
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
tar -czf "backup_$DATE.tar.gz" /path/to/website
# Upload to cloud storage
aws s3 cp "backup_$DATE.tar.gz" s3://your-backup-bucket/
```

#### Disaster Recovery Plan
1. **Code Repository**: GitHub provides redundancy
2. **Assets**: Images and files in cloud storage
3. **Database**: No database, all static
4. **DNS**: Multiple DNS providers as backup
5. **Monitoring**: Uptime monitoring services

### Scaling Strategies

#### Content Delivery Network (CDN)
- **Cloudflare**: Free tier with CDN, security, optimization
- **Fastly**: High-performance CDN
- **AWS CloudFront**: Scalable CDN with global edge locations

#### Load Balancing
For high-traffic scenarios:
- **Netlify**: Built-in load balancing
- **Cloudflare Load Balancing**: Intelligent routing
- **AWS ELB**: Elastic Load Balancing

#### Database Integration
When static site limitations are reached:
- **Supabase**: Open source Firebase alternative
- **PlanetScale**: MySQL-compatible serverless database
- **Firebase**: Google's backend-as-a-service

### Legal and Compliance

#### Privacy Policy
Required if collecting personal data:
```html
<!-- Add to footer -->
<a href="/privacy-policy.html">Privacy Policy</a>
```

#### Terms of Service
```html
<!-- Add to footer -->
<a href="/terms-of-service.html">Terms of Service</a>
```

#### Cookie Policy
If using cookies/analytics:
```html
<!-- Cookie consent banner -->
<div id="cookie-consent">
    This site uses cookies. <button onclick="acceptCookies()">Accept</button>
</div>
```

### Community Building

#### GitHub Integration
- **Issues**: Bug reports and feature requests
- **Discussions**: Community questions and answers
- **Wiki**: Detailed documentation and tutorials
- **Projects**: Roadmap and task management

#### Social Media Automation
- **Buffer**: Schedule social media posts
- **IFTTT**: Automate social media sharing
- **Zapier**: Connect different services

### Future-Proofing

#### Web Standards
- Follow HTML5, CSS3, ES6+ standards
- Use semantic HTML elements
- Implement responsive design
- Ensure accessibility compliance

#### Technology Trends
- Monitor Web Components adoption
- Consider CSS-in-JS for larger projects
- Evaluate framework migration (React/Vue) for complex features
- Watch for new browser APIs

---

## 📊 Analytics & Metrics

### Key Performance Indicators (KPIs)

#### User Engagement
- **Page Views**: Total visits to each page
- **Session Duration**: Average time spent on site
- **Bounce Rate**: Percentage of single-page visits
- **Pages per Session**: Average pages viewed

#### Technical Performance
- **Core Web Vitals**: LCP, FID, CLS scores
- **Page Load Time**: Time to fully load
- **Time to Interactive**: When page becomes usable
- **Error Rate**: JavaScript and network errors

#### Content Performance
- **Popular Pages**: Most visited sections
- **Search Queries**: What users are looking for
- **Modal Interactions**: Which servers/services are clicked
- **Form Submissions**: Contact form conversion rate

### Tools for Tracking

#### Free Analytics
- **Google Analytics 4**: Comprehensive analytics
- **Plausible**: Privacy-focused analytics
- **Fathom**: Simple, privacy-first analytics
- **Umami**: Self-hosted analytics

#### Performance Monitoring
- **Google PageSpeed Insights**: Performance scores
- **WebPageTest**: Detailed performance analysis
- **Lighthouse**: Automated audits
- **Sentry**: Error tracking

#### User Feedback
- **Hotjar**: Heatmaps and session recordings
- **UserTesting**: User experience testing
- **SurveyMonkey**: User surveys
- **Google Forms**: Quick feedback collection

---

## 🎯 Roadmap & Future Development

### Phase 1: Enhancement (Current)
- [x] Interactive modal system
- [x] Search functionality
- [x] Responsive design optimization
- [x] Performance improvements
- [x] SEO optimization

### Phase 2: Advanced Features (Next 3-6 months)
- [ ] CMS integration for content management
- [ ] Dark/light mode toggle
- [ ] Comments system (Disqus/Utterances)
- [ ] Advanced analytics integration
- [ ] RSS feed generation
- [ ] Sitemap auto-generation
- [ ] 404 error page
- [ ] Breadcrumb navigation

### Phase 3: Scaling (6-12 months)
- [ ] Progressive Web App (PWA) features
- [ ] Multi-language support (i18n)
- [ ] E-commerce integration
- [ ] Advanced search with filters
- [ ] Real-time content updates
- [ ] API integrations expansion

### Phase 4: Ecosystem (1+ year)
- [ ] Plugin system for extensibility
- [ ] Theme marketplace
- [ ] Mobile app companion
- [ ] API for third-party integrations
- [ ] White-label solutions

### Community Contributions
- [ ] Open source component library
- [ ] Documentation improvements
- [ ] Tutorial creation
- [ ] Plugin development
- [ ] Translation contributions

---

## 🤝 Contributing

### Development Setup
1. Fork the repository
2. Clone your fork: `git clone https://github.com/yourusername/zakpt-website.git`
3. Create feature branch: `git checkout -b feature/new-feature`
4. Make changes and test locally
5. Commit changes: `git commit -am 'Add new feature'`
6. Push to branch: `git push origin feature/new-feature`
7. Create Pull Request

### Code Standards
- Use semantic HTML5 elements
- Follow BEM CSS methodology
- Write clean, readable JavaScript (ES6+)
- Add comments for complex logic
- Test on multiple browsers

### Documentation
- Update README for new features
- Add code comments for functions
- Update customization guides
- Create tutorials for complex features

---

## 📄 License & Attribution

### MIT License
```
Copyright (c) 2024 ZakPT

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

### Attributions
- **Icons**: Font Awesome (CC BY 4.0)
- **Fonts**: Google Fonts (Open source licenses)
- **Search**: Fuse.js (Apache 2.0)
- **Inspiration**: Various open source projects and design patterns

---

## 📞 Support & Contact

### Getting Help
1. **Documentation**: Check the comprehensive guides first
2. **GitHub Issues**: Search existing issues or create new ones
3. **Discussions**: Ask questions in GitHub Discussions
4. **Community**: Join the homelab community on Discord/Reddit

### Professional Services
- **Customization**: Hire for custom development
- **Consulting**: Technical architecture advice
- **Training**: Workshops and tutorials
- **Support**: Priority support packages

### Contact Information
- **Email**: contact@zakpt.com
- **YouTube**: [@ZakPT](https://youtube.com/@zakpt)
- **GitHub**: [@zakpt](https://github.com/zakpt)
- **Twitter**: [@zakpt](https://twitter.com/zakpt)

---

**Version**: 2.0  
**Last Updated**: November 26, 2024  
**Status**: Production Ready ✅
