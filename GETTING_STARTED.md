# Getting Started - Step by Step

Follow these steps to get your Orders Dashboard running locally and deployed to Firebase.

## Prerequisites Checklist

Before you begin, ensure you have:

- [ ] Node.js 18 or higher installed
- [ ] npm or yarn package manager
- [ ] A Supabase account and project
- [ ] A Firebase account and project
- [ ] Git installed (optional, for version control)
- [ ] A code editor (VS Code recommended)

## Part 1: Local Development Setup (15 minutes)

### Step 1: Install Dependencies (2 minutes)

Open terminal in the project directory and run:

```bash
npm install
```

Wait for all packages to install. You should see no errors.

### Step 2: Configure Supabase (5 minutes)

1. **Get your Supabase credentials:**
   - Go to https://supabase.com
   - Open your project
   - Click "Settings" → "API"
   - Copy your "Project URL" (SUPABASE_URL)
   - Copy your "service_role" key (SUPABASE_SERVICE_ROLE_KEY)
   - ⚠️ Use service_role key, NOT anon key

2. **Verify your orders table exists:**
   - Go to "Table Editor" in Supabase
   - Check if "orders" table exists
   - If not, create it using the SQL in README.md

### Step 3: Configure Environment Variables (3 minutes)

1. **Create .env.local file:**
   - Copy `.env.local.example` to `.env.local`
   - Or create a new file named `.env.local` in the root directory

2. **Fill in your credentials:**

```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
DASHBOARD_PASSWORD=MySecurePassword123
COOKIE_SECRET=random-string-at-least-32-characters-long
```

Replace:
- `your-project-id` with your actual Supabase project ID
- The service role key with your actual key
- `MySecurePassword123` with your chosen dashboard password
- `random-string...` with a random string (you can use a password generator)

### Step 4: Start Development Server (1 minute)

```bash
npm run dev
```

You should see:
```
▲ Next.js 14.1.0
- Local:        http://localhost:3000
- Ready in 2.5s
```

### Step 5: Test the Application (4 minutes)

1. **Open your browser:**
   - Navigate to http://localhost:3000
   - You should see the login page

2. **Login:**
   - Enter the password you set in DASHBOARD_PASSWORD
   - Click "Login"
   - You should be redirected to the dashboard

3. **Test All Orders tab:**
   - Click "All Orders" tab
   - Try different time filters
   - Try searching for an order

4. **Test Orders in Progress tab:**
   - Click "Orders in Progress" tab
   - If you have orders with status "PACKAGING", they should appear
   - Try clicking "Dropped-off" or "Collected" buttons

✅ **Local setup complete!** Your dashboard is now running locally.

---

## Part 2: Firebase Hosting Deployment (20 minutes)

### Step 1: Install Firebase CLI (2 minutes)

```bash
npm install -g firebase-tools
```

Verify installation:
```bash
firebase --version
```

### Step 2: Login to Firebase (1 minute)

```bash
firebase login
```

This will open a browser window. Login with your Google account.

### Step 3: Create Firebase Project (3 minutes)

If you don't have a Firebase project yet:

1. Go to https://console.firebase.google.com
2. Click "Add project"
3. Enter project name (e.g., "mutilife-orders")
4. Follow the setup wizard
5. Note your project ID

### Step 4: Initialize Firebase in Your Project (2 minutes)

In your project directory:

```bash
firebase init hosting
```

Answer the prompts:
- **Select a default Firebase project:** Choose your project or create new
- **Detected Next.js. Do you want to set up?** Yes
- **In which region?** Choose closest to your users (e.g., us-central1)
- **Set up automatic builds?** No (we'll deploy manually)

### Step 5: Update Firebase Configuration (1 minute)

Edit `.firebaserc` file and replace `your-firebase-project-id` with your actual project ID:

```json
{
  "projects": {
    "default": "mutilife-orders"
  }
}
```

### Step 6: Set Environment Variables in Firebase (5 minutes)

You have two options:

#### Option A: Using Firebase Console (Easier)

1. Go to https://console.firebase.google.com
2. Select your project
3. Click "Functions" in the left menu
4. Click "Configuration" tab
5. Add these environment variables:
   - `SUPABASE_URL`: Your Supabase URL
   - `SUPABASE_SERVICE_ROLE_KEY`: Your service role key
   - `DASHBOARD_PASSWORD`: Your dashboard password
   - `COOKIE_SECRET`: Your cookie secret

#### Option B: Using Firebase CLI

```bash
firebase functions:secrets:set SUPABASE_URL
# Enter your Supabase URL when prompted

firebase functions:secrets:set SUPABASE_SERVICE_ROLE_KEY
# Enter your service role key when prompted

firebase functions:secrets:set DASHBOARD_PASSWORD
# Enter your dashboard password when prompted

firebase functions:secrets:set COOKIE_SECRET
# Enter your cookie secret when prompted
```

### Step 7: Build Your Application (2 minutes)

```bash
npm run build
```

Wait for the build to complete. You should see:
```
✓ Compiled successfully
```

### Step 8: Deploy to Firebase (4 minutes)

```bash
firebase deploy --only hosting
```

This will:
1. Upload your application to Firebase
2. Set up Cloud Functions for API routes
3. Configure hosting

Wait for deployment to complete. You should see:
```
✔ Deploy complete!

Project Console: https://console.firebase.google.com/project/your-project/overview
Hosting URL: https://your-project.web.app
```

### Step 9: Test Your Deployed Application (2 minutes)

1. **Open the Hosting URL** in your browser
2. **Login** with your dashboard password
3. **Test all features:**
   - All Orders tab
   - Orders in Progress tab
   - Search functionality
   - Action buttons

✅ **Deployment complete!** Your dashboard is now live on Firebase.

---

## Part 3: Post-Deployment

### Share Your Dashboard

Your dashboard is now accessible at:
```
https://your-project.web.app
```

Share this URL with your team. They'll need the dashboard password to login.

### Set Up Custom Domain (Optional)

1. Go to Firebase Console → Hosting
2. Click "Add custom domain"
3. Enter your domain (e.g., orders.yourdomain.com)
4. Follow DNS configuration instructions
5. Wait for SSL certificate (up to 24 hours)

### Monitor Your Application

- **Firebase Console:** https://console.firebase.google.com
  - View hosting metrics
  - Check function logs
  - Monitor usage

- **Supabase Dashboard:** https://supabase.com
  - Monitor database queries
  - Check table data
  - View API usage

### Update Your Application

When you make changes:

```bash
# 1. Test locally
npm run dev

# 2. Build
npm run build

# 3. Deploy
firebase deploy --only hosting
```

---

## Troubleshooting

### Issue: "Module not found" errors

**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: "Unauthorized" errors in dashboard

**Solution:**
- Clear browser cookies
- Check DASHBOARD_PASSWORD is set correctly
- Try logging in again

### Issue: Orders not loading

**Solution:**
- Check Supabase credentials in .env.local (local) or Firebase Console (production)
- Verify table name is exactly "orders" (lowercase)
- Check browser console for errors
- Verify service_role key is used (not anon key)

### Issue: Firebase deployment fails

**Solution:**
- Update Firebase CLI: `npm install -g firebase-tools@latest`
- Check you're logged in: `firebase login`
- Verify project ID in .firebaserc
- Check all environment variables are set in Firebase

### Issue: API routes return 500 errors

**Solution:**
- Check Firebase Functions logs: `firebase functions:log`
- Verify environment variables are set correctly
- Check Supabase connection

---

## Next Steps

Now that your dashboard is running:

1. **Add test data** to your Supabase orders table
2. **Customize the UI** to match your brand
3. **Add more features** (see PROJECT_SUMMARY.md for ideas)
4. **Set up monitoring** and alerts
5. **Train your team** on how to use the dashboard

---

## Need Help?

- Check **README.md** for detailed documentation
- Review **DEPLOYMENT.md** for deployment specifics
- See **QUICK_REFERENCE.md** for common commands
- Read **PROJECT_SUMMARY.md** for architecture details

---

## Success Checklist

- [ ] Local development server runs without errors
- [ ] Can login with dashboard password
- [ ] All Orders tab displays orders
- [ ] Time filters work correctly
- [ ] Search functionality works
- [ ] Orders in Progress tab shows packaging orders
- [ ] Action buttons update order status
- [ ] Firebase deployment successful
- [ ] Production URL accessible
- [ ] Production dashboard works correctly
- [ ] Team members can access dashboard

🎉 **Congratulations!** Your Orders Dashboard is now live and ready to use!
