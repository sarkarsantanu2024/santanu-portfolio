# Santanu Sarkar – Portfolio (Next.js)

## Quick Start

```bash
npm install
npm run dev
# Open http://localhost:3000
```

## Add Your Photos

### Profile Photo
Drop your photo into:
```
public/images/profile/profile.jpg
```
Then in `components/Hero.jsx` change:
```jsx
// FROM:
src="https://picsum.photos/seed/santanu-pro/400/480"
// TO:
src="/images/profile/profile.jpg"
```

### Project Screenshots
Drop screenshots into `public/images/projects/` and update `components/Projects.jsx`:
```
public/images/projects/ipi-singapore.jpg
public/images/projects/spiderx.jpg
public/images/projects/peerlessone.jpg
public/images/projects/sginnovate.jpg
public/images/projects/affinidi.jpg
```

Recommended size: **1200×675px** (16:9)

Then update each project's `imgSeed` in `components/Projects.jsx` to use a local path:
```jsx
// Change the <img> src from:
src={`https://picsum.photos/seed/${p.imgSeed}/800/450`}
// To:
src={p.localImg}   // and add localImg field to each project object
```

## Folder Structure
```
santanu-portfolio-next/
├── app/
│   ├── layout.jsx       ← SEO metadata, Material Icons CDN
│   ├── page.jsx         ← Main page (server component)
│   └── globals.css      ← Tailwind + custom styles
├── components/
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── About.jsx
│   ├── Skills.jsx
│   ├── Experience.jsx
│   ├── Projects.jsx
│   ├── Contact.jsx
│   └── Footer.jsx
├── public/
│   └── images/
│       ├── profile/     ← Add profile.jpg here
│       └── projects/    ← Add project screenshots here
├── next.config.mjs
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## Deploy to Vercel
```bash
npm i -g vercel
vercel
```
Or drag the project folder to https://vercel.com/new
