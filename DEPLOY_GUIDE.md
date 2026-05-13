# 🚀 ParkEase - Deployment Guide (GitHub + Vercel)

## Step 1: Push to GitHub

```bash
cd "C:\Users\hh\Desktop\بروجيكت اتصال\zed 1\parkease"

# Create repo on GitHub first (go to github.com -> New Repository)
# Then run:

git remote add origin https://github.com/YOUR_USERNAME/parkease.git
git branch -M main
git push -u origin main
```

---

## Step 2: Deploy to Vercel (EASIEST WAY)

### Option A: Direct from dist/ folder (No Build Required)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy the dist folder directly:
```bash
cd parkease
vercel dist --prod
```

That's it! Vercel will give you a URL like:
**https://parkease.vercel.app**

Send this URL to friends and they can use it!

---

### Option B: Connect GitHub to Vercel (Auto-Deploy)

1. Go to **vercel.com** and sign up with GitHub
2. Click **"Add New Project"**
3. Select your **parkease** repo
4. Configure:
   - **Framework**: Other
   - **Build Command**: `npm install --legacy-peer-deps && npx expo export --platform web`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install --legacy-peer-deps`
5. Click **Deploy**

Now every time you `git push`, Vercel auto-deploys!

---

## Step 3: Share with Friends

Once deployed, your friends can access:
- **Web**: https://parkease.vercel.app
- They'll see the live map with Qassim University parking
- Dark/light mode toggle
- All 10 parking lots with availability

---

## Quick Start Summary

```bash
# 1. Push to GitHub
git remote add origin https://github.com/YOUR_USERNAME/parkease.git
git branch -M main
git push -u origin main

# 2. Deploy to Vercel
npm i -g vercel
vercel dist --prod

# 3. Share the URL Vercel gives you!
```

---

## Alternative: Deploy using Vercel Dashboard

1. Go to **vercel.com**
2. Login with GitHub
3. Click **Import Project**
4. Paste your GitHub repo URL
5. Set Output Directory to **dist**
6. Deploy!
