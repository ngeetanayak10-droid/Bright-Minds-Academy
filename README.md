# . — Website

A complete multi-page website for ., including a Node.js/Express backend that handles contact form submissions via email.

---

## 📁 File Structure

```
bright-minds-academy/
├── index.html              ← Homepage (main landing page)
├── css/
│   └── style.css           ← All styles
├── js/
│   └── main.js             ← Frontend interactivity
├── pages/
│   ├── tutoring.html       ← Tutoring service page
│   ├── courses.html        ← Complete courses page
│   ├── consulting.html     ← Parent consulting page
│   ├── languages.html      ← Language classes page
│   └── contact.html        ← Contact page with form
├── images/                 ← Place your logo and images here
│   └── (add logo.png here when ready)
├── server.js               ← Node.js/Express backend
├── package.json            ← Node dependencies
├── .env.example            ← Template for your secret config
├── .gitignore              ← Protects secrets from git
└── README.md               ← This file
```

---

## ✏️ Before You Deploy: Fill in Your Content

Search the code for `✏️ FILL IN:` and `✏️ LOGO:` comments — these mark every place you need to add your real information.

Key things to fill in:
- Company description and mission (About section on `index.html`)
- Contact details: email, phone, address, hours
- Stats (number of students, satisfaction rate, etc.)
- Social media links (Facebook, Instagram, X)
- Service descriptions on each service page
- Languages offered on `languages.html`
- Courses offered on `courses.html`

### Adding Your Logo
Once your logo is ready:
1. Save it as `images/logo.png` (or `.svg`)
2. Find every `<!-- ✏️ LOGO: Replace... -->` comment in each HTML file
3. Replace the `<span class="logo-text">...</span>` line with:
   ```html
   <img src="../images/logo.png" alt="." class="logo-img" />
   ```
   (Use `src="images/logo.png"` without the `../` on `index.html`)

---

## 🚀 Deployment Guide

### Option A — Netlify (Easiest, Free — Recommended for static-first)

> This option is perfect if you don't need the Node.js backend immediately.
> Netlify has built-in form handling, so the contact form works without a server.

#### Steps:
1. Go to [netlify.com](https://netlify.com) and sign up (free)
2. Click **"Add new site → Deploy manually"**
3. Drag and drop your entire project folder into the Netlify deploy area
4. Netlify gives you a URL like `bright-minds-academy.netlify.app`

#### Connect your domain:
1. In Netlify → Site Settings → Domain management → Add custom domain
2. Enter your domain (e.g. `brightmindsacademy.com`)
3. Netlify shows you nameservers or DNS records to add
4. Log in to where you bought your domain (GoDaddy, Namecheap, Google Domains, etc.)
5. Update the DNS records as instructed by Netlify
6. Wait 10–60 minutes for DNS to propagate — your site is live!

#### Enable Netlify Forms (contact form without a server):
1. In `pages/contact.html`, add `netlify` attribute to the `<form>` tag:
   ```html
   <form id="contactForm" name="contact" netlify>
   ```
2. Add a hidden input inside the form:
   ```html
   <input type="hidden" name="form-name" value="contact" />
   ```
3. In `js/main.js`, replace the `fetch('/api/contact', ...)` call with:
   ```js
   const res = await fetch('/', {
     method: 'POST',
     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
     body: new URLSearchParams(formData).toString(),
   });
   ```
4. Netlify automatically emails you when submissions come in (configure in Site → Forms)

---

### Option B — Railway (Node.js backend + email, ~$5/month)

> Use this if you want the full Node.js server with nodemailer email sending.

#### Steps:
1. Install [Node.js](https://nodejs.org) on your computer if you haven't
2. Open a terminal in your project folder and run:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and fill in your email credentials:
   ```bash
   cp .env.example .env
   ```
4. Test locally:
   ```bash
   npm start
   ```
   Open `http://localhost:3000` — your site should appear.

5. Push to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   # Create a new repo on github.com, then:
   git remote add origin https://github.com/YOUR_USERNAME/bright-minds-academy.git
   git push -u origin main
   ```

6. Go to [railway.app](https://railway.app), sign up with GitHub, click **"New Project → Deploy from GitHub"**, select your repo

7. In Railway → Variables tab, add:
   - `EMAIL_USER` = your Gmail
   - `EMAIL_PASS` = your Gmail App Password
   - `EMAIL_TO`   = where you want contact forms sent

8. Railway gives you a URL like `bright-minds-academy.up.railway.app`

#### Connect your domain on Railway:
1. Railway → Settings → Domains → Add Custom Domain
2. Enter your domain and follow the DNS instructions
3. Update your domain registrar's DNS settings accordingly

---

### Option C — Any cPanel/shared hosting

> If your domain registrar provides web hosting (GoDaddy, Bluehost, etc.)

1. Log into your hosting control panel (cPanel)
2. Open **File Manager** → navigate to `public_html`
3. Upload all your files (index.html, css/, js/, pages/, images/)
4. For the Node backend, you'd need a VPS or cloud server — contact your host about Node.js support, or use Netlify Forms instead (Option A)

---

## 📧 Gmail App Password Setup (for contact form emails)

1. Log into your Google account
2. Go to **Security → 2-Step Verification** and enable it
3. Go to **Security → App Passwords**
4. Select "Mail" and "Other device", name it "."
5. Copy the 16-character password Google generates
6. Paste it as `EMAIL_PASS` in your `.env` file

---

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Copy environment template
cp .env.example .env
# Then edit .env with your email credentials

# Start the server
npm start

# Or for auto-restart on file changes (development)
npm run dev
```

Visit `http://localhost:3000`

---

## 🎨 Customization Tips

- **Colors**: All colors are CSS variables in `css/style.css` under `:root { }` — change `--blue-600` etc. to adjust the palette
- **Fonts**: Change the Google Fonts import URL in each HTML file's `<head>`
- **Adding pages**: Copy any service page as a template, update the nav `active` class, and link it from the navbar
- **Logo sizing**: Edit `.logo-img { height: 44px; }` in `style.css` to resize your logo

---

## 📞 Need Help?

If you get stuck on deployment, most hosting providers have live chat support. For DNS issues, give it up to 24 hours — propagation takes time.
