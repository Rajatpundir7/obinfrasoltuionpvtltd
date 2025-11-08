# 🚀 Start Vercel Deployment - Quick Guide

## ✅ Pre-Deployment Checklist

Your website is ready for Vercel! Here's what's been set up:

- ✅ Vercel configuration (`vercel.json`)
- ✅ Serverless function for contact form (`api/contact.js`)
- ✅ Package.json with dependencies
- ✅ All HTML, CSS, and JS files
- ✅ Git ignore file

## 🎯 Choose Your Deployment Method

### Method 1: Vercel CLI (Fastest - 2 minutes)

**Step 1: Install Vercel CLI**
```bash
npm install -g vercel
```

**Step 2: Login to Vercel**
```bash
vercel login
```
(Follow the prompts in your browser)

**Step 3: Deploy**
```bash
cd "C:\Users\kulde\om infastructure"
vercel
```

**Step 4: Deploy to Production**
```bash
vercel --prod
```

**Done!** Your site will be live at: `https://your-project-name.vercel.app`

---

### Method 2: GitHub + Vercel (Recommended - 10 minutes)

**Step 1: Create GitHub Repository**
1. Go to [github.com](https://github.com) and sign in
2. Click "New repository"
3. Name it: `ombalaji-infra-website`
4. Don't initialize with README
5. Click "Create repository"

**Step 2: Push Your Code to GitHub**
```bash
# Open PowerShell or Command Prompt in your project folder
cd "C:\Users\kulde\om infastructure"

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - OMBALAJI Infra website"

# Add GitHub remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/ombalaji-infra-website.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Step 3: Deploy on Vercel**
1. Go to [vercel.com/new](https://vercel.com/new)
2. Sign in with GitHub
3. Click "Import" next to your repository
4. Click "Deploy"
5. Wait 1-2 minutes
6. **Done!** Your site is live!

---

### Method 3: Drag & Drop (Easiest - 1 minute)

1. Go to [vercel.com/new](https://vercel.com/new)
2. Sign in to Vercel
3. Drag your entire project folder into the browser
4. Click "Deploy"
5. **Done!** 

⚠️ Note: Drag & drop doesn't auto-deploy on changes. Use GitHub method for automatic deployments.

---

## 📧 Contact Form Setup (Optional)

Your contact form will work immediately, but emails won't be sent. To enable email:

### Quick Option: Formspree (5 minutes, no code)

1. Go to [formspree.io](https://formspree.io) and sign up
2. Create a new form
3. Copy your form URL (e.g., `https://formspree.io/f/YOUR_FORM_ID`)
4. Open `assets/js/main.js`
5. Find line 206 and change:
   ```javascript
   const response = await fetch('/api/contact', {
   ```
   To:
   ```javascript
   const response = await fetch('YOUR_FORMSPREE_URL', {
   ```
6. Save and redeploy

### Advanced Option: Resend (Requires API key)

1. Sign up at [resend.com](https://resend.com)
2. Get API key from dashboard
3. In Vercel: Go to Project → Settings → Environment Variables
4. Add: `RESEND_API_KEY` = your key
5. Install Resend: `npm install resend`
6. Uncomment Resend code in `api/contact.js`
7. Redeploy

---

## 🎉 After Deployment

1. **Test Your Site**
   - Visit your Vercel URL
   - Test all pages
   - Test contact form
   - Test gallery lightbox
   - Test chatbot

2. **Custom Domain (Optional)**
   - Go to Vercel Dashboard → Settings → Domains
   - Add your domain
   - Update DNS records as instructed

3. **Monitor**
   - Check Vercel dashboard for deployment status
   - View function logs if contact form has issues

---

## 🆘 Need Help?

- **Deployment Issues**: Check `DEPLOYMENT.md` for detailed instructions
- **Contact Form Issues**: Check Vercel function logs in dashboard
- **Vercel Support**: [vercel.com/support](https://vercel.com/support)

---

## 📝 Quick Commands Reference

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy (preview)
vercel

# Deploy (production)
vercel --prod

# View deployments
vercel ls

# View logs
vercel logs
```

---

## ✅ Ready to Deploy?

**Choose one method above and start deploying!**

Your website is fully configured and ready for Vercel! 🚀

