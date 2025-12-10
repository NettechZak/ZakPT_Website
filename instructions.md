# Website Management Instructions

**Quick Start Guide** for maintaining the ZakPT website.

> **For detailed customization instructions**, see [`CUSTOMIZATION_GUIDE.md`](file:///Users/macbookpro/Documents/My%20Websit%20/CUSTOMIZATION_GUIDE.md) - covers every element you can change!

---

## Quick Links

- **[CUSTOMIZATION_GUIDE.md](file:///Users/macbookpro/Documents/My%20Websit%20/CUSTOMIZATION_GUIDE.md)** - Complete guide to customize everything
- **[INTEGRATION_SUMMARY.md](file:///Users/macbookpro/Documents/My%20Websit%20/INTEGRATION_SUMMARY.md)** - Technical overview
- **[walkthrough.md](file:///Users/macbookpro/.gemini/antigravity/brain/5f715be2-481a-49e7-b646-ecdadf3ff9ba/walkthrough.md)** - Interactive modals walkthrough

---

## Table of Contents

1. [Navigation Bar](#1-navigation-bar)
2. [Page-Specific Edits](#2-page-specific-edits)
3. [Interactive Modals](#3-interactive-modals)
4. [Search Functionality](#4-search-functionality)
5. [Forms](#5-forms)
6. [Missing Features](#6-missing-features-checklist)
7. [File Structure](#7-file-structure)
8. [Deployment](#8-deployment)

---

## 1. Navigation Bar

**Location**: All HTML files `<header>` → `<nav>`

### Adding a New Page

1. Create `newpage.html`
2. Add to **every HTML file**:
```html
<li><a href="newpage.html">NEW PAGE</a></li>
```
3. On the new page, add `class="active"`:
```html
<li><a href="newpage.html" class="active">NEW PAGE</a></li>
```

### Changing Brand Name

Find in all HTML files:
```html
<div class="logo">
    <span class="bracket">[</span>
    <span class="accent-orange">YOUR</span>
    <span class="accent-purple">NAME</span>
    <span class="bracket">]</span>
</div>
```

---

## 2. Page-Specific Edits

### Home Page (`index.html`)
- **Hero title**: Line ~79
- **Workbench projects**: `enhanced.js` lines 19-55
- **Stats**: Lines 117-131

### Content Page (`content.html`)
- **YouTube Channel ID**: `enhanced.js` CONFIG (line 12)
- **Newsletter form**: Lines 80-84

### Homelab Page (`homelab.html`)
- **Servers**: See [Section 3](#3-interactive-modals)
- **Network topology**: See [Section 3](#3-interactive-modals)
- **Services**: See [Section 3](#3-interactive-modals)

### Photography Page (`photography.html`)
- **Add photos**: Place in `/photos/` folder
- **Gallery items**: Lines 60-150

### About Page (`about.html`)
- **Bio**: Lines 60-70
- **Skills**: Lines 80-120
- **Timeline**: Lines 130-200
- **Social links**: Lines 210-250
- **Contact form**: Line 270 (needs Formspree ID)

### Gear Page (`gear.html`)
- **Items**: Lines 60-280
- **Or edit**: `gear.md` (markdown source)

### Sponsors Page (`sponsors.html`)
- **Support links**: Lines 75-100
- **Sponsor tiers**: Lines 110-180
- **Or edit**: `sponsors.md`

### Links Page (`links.html`)
- **Resource links**: Lines 60-280
- **Or edit**: `links.md`

---

## 3. Interactive Modals

All modals auto-populate from data in `enhanced.js`.

### Server Modals

**To add/edit a server** (`enhanced.js` lines 61-131):

```javascript
const SERVER_DATA = {
    'server-id': {
        name: 'SERVER-NAME',
        type: 'Server Type',
        specs: {
            cpu: 'CPU model',
            ram: 'RAM amount',
            storage: 'Storage config',
            network: 'Network interfaces',
            psu: 'Power supply'
        },
        services: ['Service1', 'Service2'],
        uptime: '99.99%',
        powerDraw: '280W avg'
    }
};
```

**In HTML**: Add `data-server="server-id"` to server element
**(Currently 5 servers: proxmox-01, truenas-core, unifi-udm-pro, udm-enterprise-poe, nuc-cluster-01)**

### Network Node Modals

**To add/edit network nodes** (`enhanced.js` lines 153-228):

```javascript
const NETWORK_NODES = {
    'node-id': {
        name: 'Node Name',
        type: 'Device Type',
        specs: { /* ... */ },
        features: ['Feature1', 'Feature2']
    }
};
```

**In HTML**: Add `data-node="node-id"` to topology element

### Service Modals

**To add/edit services** (`enhanced.js` lines 230-302):

```javascript
const SERVICE_DATA = {
    'service-id': {
        name: 'Service Name',
        description: 'What it does',
        container: 'container-name',
        host: 'proxmox-01',
        ports: [8080],
        resources: { cpu: '10%', ram: '512MB', storage: '2GB' },
        uptime: '30 days',
        url: 'https://service.local',
        stats: { key: 'value' }  // Optional
    }
};
```

**In HTML**: Add `data-service="service-id"` to service card

### Modal Controls
- **Close**: X button, click overlay, or press ESC
- **Search**: Results can open modals directly

---

## 4. Search Functionality

Search is **auto-populated** from:
- Pages
- Workbench projects (`WORKBENCH_DATA`)
- Servers (`SERVER_DATA`)
- Services (`SERVICE_DATA`)
- Network nodes (`NETWORK_NODES`)

**No configuration needed** - just add data to the above structures!

**To customize search**:
- Threshold: `enhanced.js` line ~463
- Result count: `enhanced.js` line ~492

---

## 5. Forms

### Newsletter Form (`content.html` line ~80)

**Mailchimp example**:
```html
<form action="https://yourlist.us1.list-manage.com/subscribe/post?u=xxx&id=xxx" method="POST">
    <input type="email" name="EMAIL" placeholder="your@email.com" required>
    <button type="submit">SUBSCRIBE</button>
</form>
```

### Contact Form (`about.html` line ~270)

**Formspree setup**:
1. Create form at https://formspree.io/
2. Replace `YOUR_FORM_ID`:
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

---

## 6. Missing Features Checklist

Features documented but **not yet implemented**:

- [ ] **Tag/Category filtering** - Add tags to content and filter UI
- [ ] **Comments** - Embed Disqus/Utterances/Giscus
- [ ] **Dark/Light mode toggle** - Theme switcher button
- [ ] **Analytics** - Google Analytics or Plausible
- [ ] **Sitemap (`sitemap.xml`)** - For SEO
- [ ] **RSS feed (`feed.xml`)** - For blog posts
- [ ] **404 error page** - Custom not-found page
- [ ] **Breadcrumb navigation** - Show page hierarchy
- [ ] **Reading time estimates** - "X min read" on posts

---

## 7. File Structure

```
My Websit/
├── index.html              ← Home page
├── content.html            ← Content/blog page
├── homelab.html            ← Homelab showcase
├── photography.html        ← Photo gallery
├── about.html              ← About/contact page
├── gear.html               ← Gear/equipment list
├── sponsors.html           ← Sponsors & support
├── links.html              ← Curated resources
├── style.css               ← All styles & colors
├── enhanced.js             ← Interactive features & data
├── main.js                 ← Core functionality
├── photography.js          ← Gallery logic
│
├── CUSTOMIZATION_GUIDE.md  ← 📘 Complete customization guide
├── instructions.md         ← 📄 This file
├── INTEGRATION_SUMMARY.md  ← Technical overview
│
├── gear.md                 ← Markdown source for gear page
├── sponsors.md             ← Markdown source for sponsors
├── links.md                ← Markdown source for links
│
└── photos/                 ← Photo gallery images
```

---

## 8. Deployment

### Pre-Deployment Checklist

- [ ] Replace all placeholder text (YOUR_NAME, YOUR_HANDLE)
- [ ] Update social media URLs
- [ ] Replace demo images with your photos
- [ ] Update `SERVER_DATA`, `SERVICE_DATA` with real info
- [ ] Configure newsletter form
- [ ] Configure contact form (Formspree ID)
- [ ] Set `USE_REAL_DATA: true` in `enhanced.js` CONFIG
- [ ] Add SEO meta tags to all pages
- [ ] Compress images (< 500KB each)
- [ ] Test all links
- [ ] Test on mobile
- [ ] Check browser console for errors

### Hosting Options (Free)

- **Netlify**: https://app.netlify.com/drop (drag & drop)
- **Vercel**: https://vercel.com (GitHub integration)
- **GitHub Pages**: Free static hosting
- **Cloudflare Pages**: Fast CDN hosting

### Quick Deploy (Netlify)

1. Go to https://app.netlify.com/drop
2. Drag your entire website folder
3. Get your live URL
4. (Optional) Configure custom domain

---

## Common Tasks Quick Reference

| Task | Location | Notes |
|------|----------|-------|
| Change colors | `style.css` line 1-30 | Edit CSS variables |
| Change fonts | All HTML `<head>` + CSS | Google Fonts |
| Add navigation link | All HTML `<nav>` | Add to every page |
| Edit hero title | `index.html` line ~79 | Home page title |
| Add workbench project | `enhanced.js` line 19-59 | WORKBENCH_DATA |
| Add server | `enhanced.js` line 61-131 | SERVER_DATA (5 servers) |
| Add service | `enhanced.js` line 230-302 | SERVICE_DATA |
| Add gear item | `gear.html` or `gear.md` | Copy existing card |
| Add photo | `/photos/` + `photography.html` | WebP/JPEG < 500KB |
| Update social links | `about.html` line ~220 | Social cards |
| Configure newsletter | `content.html` line ~80 | Mailchimp/ConvertKit |
| Configure contact form | `about.html` line ~270 | Formspree ID |

---

## Need Help?

1. **Detailed instructions**: See [CUSTOMIZATION_GUIDE.md](file:///Users/macbookpro/Documents/My%20Websit%20/CUSTOMIZATION_GUIDE.md)
2. **Technical details**: See [INTEGRATION_SUMMARY.md](file:///Users/macbookpro/Documents/My%20Websit%20/INTEGRATION_SUMMARY.md)
3. **Modal features**: See [walkthrough.md](file:///Users/macbookpro/.gemini/antigravity/brain/5f715be2-481a-49e7-b646-ecdadf3ff9ba/walkthrough.md)
4. **Check browser console**: F12 → Console for errors
5. **Validate HTML**: https://validator.w3.org

**Tip**: Keep a backup before making major changes!

---

## 9. Troubleshooting Common Issues

### JavaScript Errors
- **Console Errors**: Open browser DevTools (F12) → Console tab. Look for red error messages.
- **Modal Not Opening**: Check if `data-server`, `data-node`, or `data-service` attributes match keys in `enhanced.js` data structures.
- **Search Not Working**: Ensure Fuse.js is loaded (check Network tab in DevTools). Verify `SEARCH_DATA` is populated.
- **Animations Not Playing**: Check if Intersection Observer is supported (modern browsers only).

### API Issues
- **YouTube Videos Not Loading**: Verify `YOUTUBE_CHANNEL_ID` in `enhanced.js` CONFIG. Check API quota limits.
- **RSS Feed Errors**: Ensure the RSS URL is valid and accessible. Set `USE_REAL_DATA: false` for demo content.
- **Formspree Contact Form**: Replace `YOUR_FORM_ID` with actual Formspree ID. Test form submission.

### Styling Problems
- **Colors Not Changing**: Clear browser cache or hard refresh (Ctrl+F5). Check CSS variable names in `:root`.
- **Responsive Issues**: Test on different screen sizes. Check media queries in `style.css`.
- **Fonts Not Loading**: Verify Google Fonts links in HTML `<head>`. Check network connectivity.

### Content Loading
- **Photos Not Showing**: Ensure images are in `/photos/` folder and paths are correct in `photography.html`.
- **Server Data Not Updating**: Edit `SERVER_DATA` in `enhanced.js` and refresh. Check for syntax errors.
- **Navigation Broken**: Verify all HTML files have matching `<nav>` sections.

### Performance Issues
- **Slow Loading**: Compress images (< 500KB). Enable browser caching. Minimize unused CSS/JS.
- **Animations Laggy**: Reduce particle count in `enhanced.js` (line ~571). Disable heavy effects on mobile.
- **Memory Leaks**: Check for infinite loops in custom JavaScript. Use browser Task Manager.

### Deployment Problems
- **404 Errors**: Ensure all files are uploaded. Check file paths and case sensitivity.
- **HTTPS Issues**: Use HTTPS hosting (Netlify/Vercel). Update all internal links to HTTPS.
- **CORS Errors**: For APIs, ensure proper CORS headers or use proxy if needed.

**Debug Steps**:
1. Open browser DevTools (F12)
2. Check Console for errors
3. Check Network tab for failed requests
4. Test on incognito mode (cache issues)
5. Validate HTML at https://validator.w3.org

---

## 10. Backup and Version Control

### Git Best Practices
- **Initialize Repository**: `git init` in project folder
- **First Commit**: `git add . && git commit -m "Initial commit"`
- **Regular Commits**: Commit after major changes with descriptive messages
- **Branching**: Use branches for new features: `git checkout -b feature/new-page`
- **Remote Repository**: Push to GitHub: `git remote add origin <url> && git push -u origin main`

### Backup Strategy
- **Local Backups**: Copy entire folder weekly to external drive
- **Cloud Backups**: Use GitHub for version control, or services like Dropbox/Google Drive
- **Pre-Change Backup**: Always backup before major edits
- **Version Tags**: Tag releases: `git tag v1.0 && git push --tags`

### Rollback Procedures
- **Undo Changes**: `git checkout -- file.md` to discard changes
- **Revert Commit**: `git revert <commit-hash>` for safe rollback
- **Reset to Previous**: `git reset --hard HEAD~1` (destructive, use carefully)

### Collaboration
- **Pull Requests**: Use GitHub PRs for changes review
- **Issues**: Track bugs and features in GitHub Issues
- **Wiki**: Document customizations in GitHub Wiki

---

*Last Updated: 2024 - After implementing interactive modals, search, and complete customization system*
