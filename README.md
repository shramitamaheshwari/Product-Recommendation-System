# Setup Guide - AI Product Recommendation System

## 📋 Complete File Structure

Create this exact folder structure:

```
ai-product-recommendation/
├── public/
│   └── index.html
├── src/
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── .gitignore
├── package.json
└── README.md
```

## 🚀 Step-by-Step Setup

### Step 1: Create Project Directory
```bash
mkdir ai-product-recommendation
cd ai-product-recommendation
```

### Step 2: Create Folder Structure
```bash
mkdir public src
```

### Step 3: Create Files

#### 3.1 Create package.json
```bash
touch package.json
```
Copy the content from the `package.json` artifact.

#### 3.2 Create public/index.html
```bash
touch public/index.html
```
Copy the content from the `public/index.html` artifact.

#### 3.3 Create src/index.js
```bash
touch src/index.js
```
Copy the content from the `src/index.js` artifact.

#### 3.4 Create src/index.css
```bash
touch src/index.css
```
Copy the content from the `src/index.css` artifact.

#### 3.5 Create src/App.js
```bash
touch src/App.js
```
Copy the React component code from the main artifact.

**IMPORTANT**: Add this line at the top after the imports:
```javascript
import './App.css';
```

#### 3.6 Create src/App.css
```bash
touch src/App.css
```
Copy your CSS file content (the one you provided).

#### 3.7 Create .gitignore
```bash
touch .gitignore
```
Copy the content from the `.gitignore` artifact.

#### 3.8 Create README.md
```bash
touch README.md
```
Copy the content from the README artifact.

### Step 4: Install Dependencies
```bash
npm install
```

This will install:
- React
- React DOM
- React Scripts
- Lucide React (for icons)

### Step 5: Configure API Key (Optional)

Open `src/App.js` and find this line:
```javascript
const HF_API_KEY = 'YOUR_HUGGINGFACE_API_KEY';
```

**Option A: Use Hugging Face API**
1. Go to https://huggingface.co/settings/tokens
2. Create a new access token
3. Replace `YOUR_HUGGINGFACE_API_KEY` with your token

**Option B: Use Fallback Mode**
- Leave it as is - the system will use local processing

### Step 6: Start Development Server
```bash
npm start
```

The app will open automatically at `http://localhost:3000`

## ✅ Verification Checklist

- [ ] All files created in correct locations
- [ ] Dependencies installed successfully
- [ ] No console errors
- [ ] App loads in browser
- [ ] Search functionality works
- [ ] Products display correctly
- [ ] Responsive on mobile

## 🐛 Common Issues & Solutions

### Issue: Module not found errors
**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: Port 3000 already in use
**Solution:**
```bash
# Kill the process
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 npm start
```

### Issue: CSS not loading
**Solution:** Make sure you have this in `src/App.js`:
```javascript
import './App.css';
```

### Issue: Icons not showing
**Solution:**
```bash
npm install lucide-react
```

## 📦 Building for Production

### Create Production Build
```bash
npm run build
```

This creates a `build/` folder with optimized files.

### Test Production Build
```bash
npm install -g serve
serve -s build
```

## 🌐 Deployment Options

### Option 1: Vercel (Recommended)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### Option 2: Netlify
```bash
# Build the project
npm run build

# Drag and drop the 'build' folder to netlify.com
```

### Option 3: GitHub Pages
```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts:
"predeploy": "npm run build",
"deploy": "gh-pages -d build"

# Add homepage to package.json:
"homepage": "https://yourusername.github.io/ai-product-recommendation"

# Deploy
npm run deploy
```

## 🔄 Git Repository Setup

### Initialize Git
```bash
git init
git add .
git commit -m "Initial commit: AI Product Recommendation System"
```

### Create GitHub Repository
1. Go to github.com and create new repository
2. Copy the repository URL

### Push to GitHub
```bash
git remote add origin https://github.com/yourusername/ai-product-recommendation.git
git branch -M main
git push -u origin main
```

## 📝 Environment Variables (Optional)

Create `.env` file in root:
```env
REACT_APP_HF_API_KEY=your_api_key_here
REACT_APP_HF_MODEL=mistralai/Mistral-7B-Instruct-v0.2
```

Update `src/App.js`:
```javascript
const HF_API_KEY = process.env.REACT_APP_HF_API_KEY || 'YOUR_HUGGINGFACE_API_KEY';
const HF_MODEL = process.env.REACT_APP_HF_MODEL || 'mistralai/Mistral-7B-Instruct-v0.2';
```

## 🧪 Testing the Application

### Test Queries to Try
1. "Phone under $500"
2. "Best laptop for work"
3. "Budget headphones"
4. "Premium smartwatch under $300"
5. "Cheap laptop"

### Expected Results
- Search should return 1-5 products
- Products should match the query criteria
- Price filters should work correctly
- Category filters should work correctly

## 📊 Performance Optimization

### Lazy Loading
Add to `src/App.js`:
```javascript
import React, { useState, lazy, Suspense } from 'react';
```

### Code Splitting
```javascript
const ProductCard = lazy(() => import('./components/ProductCard'));
```

## 🎨 Customization Guide

### Change Primary Color
In `src/App.css`, find and replace:
```css
#2563eb  /* Blue - replace with your color */
```

### Add More Products
In `src/App.js`, add to the `products` array:
```javascript
{
  id: 19,
  name: 'Your Product',
  category: 'phone',
  price: 599,
  features: ['Feature 1', 'Feature 2'],
  rating: 4.5,
  icon: Smartphone
}
```

### Change AI Model
In `src/App.js`:
```javascript
const HF_MODEL = 'google/flan-t5-large'; // Free alternative
```

## 📞 Support

If you encounter issues:
1. Check this guide first
2. Search GitHub issues
3. Create a new issue with error details
4. Include your Node version: `node --version`

## 🎉 Success!

If everything works:
- ✅ App runs on localhost:3000
- ✅ Search returns products
- ✅ UI looks good on mobile
- ✅ No console errors

**You're ready to customize and deploy!**