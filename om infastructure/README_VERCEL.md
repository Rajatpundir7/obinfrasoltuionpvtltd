# Quick Vercel Deployment

## Fastest Way to Deploy

### Method 1: Vercel CLI (5 minutes)

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Login to Vercel
vercel login

# 3. Navigate to project folder
cd "C:\Users\kulde\om infastructure"

# 4. Deploy
vercel

# 5. Follow prompts and deploy!
```

### Method 2: GitHub + Vercel (10 minutes)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/ombalaji-infra-website.git
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Click Deploy
   - Done! 🎉

### Method 3: Drag & Drop (2 minutes)

1. Go to [vercel.com/new](https://vercel.com/new)
2. Drag your project folder
3. Click Deploy
4. Done!

## Contact Form Setup

The contact form works without any setup (logs submissions). To enable email:

### Quick Option: Formspree (No code changes)

1. Sign up at [formspree.io](https://formspree.io)
2. Create a form
3. Update the fetch URL in `assets/js/main.js`:
   ```javascript
   const response = await fetch('YOUR_FORMSPREE_URL', {
   ```

### Advanced Option: Resend (Requires code)

1. Sign up at [resend.com](https://resend.com)
2. Get API key
3. Add to Vercel: Settings → Environment Variables → `RESEND_API_KEY`
4. Install: `npm install resend`
5. Uncomment Resend code in `api/contact.js`
6. Redeploy

## Your Site Will Be Live At:

- `https://ombalaji-infra-website.vercel.app` (or your custom domain)

## Need Help?

Check `DEPLOYMENT.md` for detailed instructions.

