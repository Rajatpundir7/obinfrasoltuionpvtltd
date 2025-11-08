# Vercel Deployment Guide for OMBALAJI Infra Website

## Prerequisites

1. **GitHub Account** (recommended) or GitLab/Bitbucket
2. **Vercel Account** - Sign up at [vercel.com](https://vercel.com)
3. **Git** installed on your computer

## Step 1: Prepare Your Repository

### Option A: Using GitHub (Recommended)

1. **Create a GitHub Repository**
   - Go to [GitHub](https://github.com) and create a new repository
   - Name it: `ombalaji-infra-website`
   - Make it public or private (your choice)
   - Don't initialize with README (we already have files)

2. **Initialize Git and Push to GitHub**
   ```bash
   # Navigate to your project directory
   cd "C:\Users\kulde\om infastructure"

   # Initialize git repository
   git init

   # Add all files
   git add .

   # Commit files
   git commit -m "Initial commit - OMBALAJI Infra website"

   # Add GitHub remote (replace YOUR_USERNAME with your GitHub username)
   git remote add origin https://github.com/YOUR_USERNAME/ombalaji-infra-website.git

   # Push to GitHub
   git branch -M main
   git push -u origin main
   ```

### Option B: Direct Vercel CLI Deployment

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   # Navigate to your project directory
   cd "C:\Users\kulde\om infastructure"

   # Deploy to Vercel
   vercel

   # Follow the prompts:
   # - Set up and deploy? Yes
   # - Which scope? Your account
   # - Link to existing project? No
   # - Project name? ombalaji-infra-website
   # - Directory? ./
   # - Override settings? No
   ```

## Step 2: Deploy via Vercel Dashboard

1. **Go to Vercel Dashboard**
   - Visit [vercel.com/new](https://vercel.com/new)
   - Sign in with GitHub (recommended) or email

2. **Import Your Repository**
   - Click "Import Project"
   - Select your GitHub repository (`ombalaji-infra-website`)
   - Or drag and drop your project folder

3. **Configure Project**
   - **Framework Preset**: Other
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: (leave empty - static site)
   - **Output Directory**: (leave empty)
   - **Install Command**: (leave empty)

4. **Environment Variables** (Optional - for email service)
   - If you want to use email service, add:
     - `RESEND_API_KEY` (if using Resend)
     - `SENDGRID_API_KEY` (if using SendGrid)
   - Click "Add" for each variable

5. **Deploy**
   - Click "Deploy" button
   - Wait for deployment to complete (usually 1-2 minutes)

## Step 3: Configure Custom Domain (Optional)

1. **Add Domain in Vercel**
   - Go to your project dashboard
   - Click "Settings" → "Domains"
   - Enter your domain name (e.g., `ombalajiinfra.com`)
   - Follow the DNS configuration instructions

2. **Update DNS Records**
   - Add the DNS records provided by Vercel to your domain registrar
   - Wait for DNS propagation (can take up to 24 hours)

## Step 4: Set Up Email Service (Optional but Recommended)

The contact form currently logs submissions. To enable email sending:

### Option 1: Use Resend (Recommended)

1. **Sign up for Resend**
   - Go to [resend.com](https://resend.com)
   - Create a free account (100 emails/day free)

2. **Get API Key**
   - Go to API Keys section
   - Create a new API key
   - Copy the key

3. **Install Resend Package**
   ```bash
   npm install resend
   ```

4. **Update Vercel Environment Variables**
   - Go to Vercel Dashboard → Project → Settings → Environment Variables
   - Add: `RESEND_API_KEY` = your API key
   - Redeploy the project

5. **Update API Code**
   - Uncomment the Resend code in `api/contact.js`
   - Remove the console.log fallback

### Option 2: Use SendGrid

1. **Sign up for SendGrid**
   - Go to [sendgrid.com](https://sendgrid.com)
   - Create a free account (100 emails/day free)

2. **Get API Key**
   - Go to Settings → API Keys
   - Create a new API key
   - Copy the key

3. **Install SendGrid Package**
   ```bash
   npm install @sendgrid/mail
   ```

4. **Update Vercel Environment Variables**
   - Add: `SENDGRID_API_KEY` = your API key
   - Redeploy the project

5. **Update API Code**
   - Uncomment the SendGrid code in `api/contact.js`

### Option 3: Use Formspree (Easiest - No Code Changes)

1. **Sign up for Formspree**
   - Go to [formspree.io](https://formspree.io)
   - Create a free account

2. **Create a Form**
   - Create a new form
   - Copy the form endpoint URL

3. **Update Contact Form**
   - Change the fetch URL in `assets/js/main.js` to your Formspree URL
   - No backend code needed!

## Step 5: Verify Deployment

1. **Check Your Site**
   - Visit your Vercel deployment URL (e.g., `ombalaji-infra-website.vercel.app`)
   - Test all pages and features

2. **Test Contact Form**
   - Fill out the contact form
   - Submit and verify you get a success message
   - Check your email (if email service is configured)

3. **Test Gallery Lightbox**
   - Click on gallery images
   - Verify lightbox opens correctly

4. **Test Chatbot**
   - Click the chatbot button
   - Test some queries

## Troubleshooting

### Contact Form Not Working

1. **Check Vercel Function Logs**
   - Go to Vercel Dashboard → Project → Functions
   - Check the logs for errors

2. **Verify API Route**
   - The API should be at `/api/contact.js`
   - Check browser console for errors

3. **Test API Directly**
   - Use Postman or curl to test the API endpoint
   - Check if it returns proper responses

### Images Not Loading

1. **Check Image Paths**
   - Ensure all images are in the root directory
   - Check that paths start with `/` (absolute paths)

2. **Verify File Names**
   - Make sure image file names match exactly (case-sensitive)

### Build Errors

1. **Check Vercel Build Logs**
   - Go to Deployment → View Build Logs
   - Look for any error messages

2. **Verify vercel.json**
   - Ensure `vercel.json` is properly formatted
   - Check for syntax errors

## Quick Deploy Commands

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy to production
vercel --prod

# View deployments
vercel ls

# View logs
vercel logs
```

## Support

For issues or questions:
- Vercel Documentation: [vercel.com/docs](https://vercel.com/docs)
- Vercel Support: [vercel.com/support](https://vercel.com/support)

## Next Steps After Deployment

1. ✅ Set up custom domain
2. ✅ Configure email service
3. ✅ Test all functionality
4. ✅ Set up monitoring/analytics
5. ✅ Optimize images if needed
6. ✅ Set up SSL (automatically done by Vercel)

Your website is now live on Vercel! 🚀

