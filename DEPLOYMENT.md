# Firebase Hosting Deployment Guide

## Quick Start

### 1. Install Firebase CLI
```bash
npm install -g firebase-tools
```

### 2. Login to Firebase
```bash
firebase login
```

### 3. Initialize Firebase Project
```bash
firebase init hosting
```

When prompted:
- Select "Use an existing project" or create a new one
- Choose your Firebase project
- Select "Next.js" as the framework
- Accept default build settings

### 4. Update .firebaserc
Edit `.firebaserc` and replace `your-firebase-project-id` with your actual Firebase project ID.

### 5. Set Environment Variables

You have two options:

#### Option A: Using Firebase Console
1. Go to Firebase Console → Your Project → Hosting
2. Navigate to Environment Configuration
3. Add these variables:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `DASHBOARD_PASSWORD`
   - `COOKIE_SECRET`

#### Option B: Using Firebase CLI
```bash
firebase functions:secrets:set SUPABASE_URL
firebase functions:secrets:set SUPABASE_SERVICE_ROLE_KEY
firebase functions:secrets:set DASHBOARD_PASSWORD
firebase functions:secrets:set COOKIE_SECRET
```

### 6. Deploy
```bash
firebase deploy --only hosting
```

### 7. Access Your Dashboard
After deployment completes, Firebase will provide a URL:
```
https://your-project.web.app
```

## Important Notes

### Environment Variables
- Never commit `.env.local` to version control
- Set all environment variables in Firebase before deploying
- Use strong passwords and keep credentials secure

### First Deployment
The first deployment may take 5-10 minutes as Firebase sets up the Next.js backend.

### Subsequent Deployments
```bash
npm run build
firebase deploy --only hosting
```

### View Logs
```bash
firebase functions:log
```

### Rollback Deployment
```bash
firebase hosting:rollback
```

## Troubleshooting

### Deployment fails with "Missing environment variables"
- Ensure all environment variables are set in Firebase
- Check variable names match exactly

### 404 errors after deployment
- Wait a few minutes for DNS propagation
- Clear browser cache
- Check Firebase Console for deployment status

### API routes not working
- Verify `firebase.json` includes `frameworksBackend`
- Check that Next.js is using App Router (not Pages Router)
- Review Firebase Functions logs

### Authentication not persisting
- Check that cookies are enabled in browser
- Verify `COOKIE_SECRET` is set
- Ensure `secure` cookie flag is appropriate for your environment

## Cost Considerations

Firebase Hosting with Next.js uses:
- **Hosting**: Free tier includes 10GB storage, 360MB/day transfer
- **Cloud Functions**: Free tier includes 2M invocations/month
- **Cloud Run**: Used for Next.js backend, billed per request

For production apps with moderate traffic, expect $0-25/month.

## Custom Domain

To use a custom domain:

1. Go to Firebase Console → Hosting
2. Click "Add custom domain"
3. Follow the DNS configuration steps
4. Wait for SSL certificate provisioning (up to 24 hours)

## CI/CD with GitHub Actions

Create `.github/workflows/firebase-deploy.yml`:

```yaml
name: Deploy to Firebase

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run build
      - uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: '${{ secrets.GITHUB_TOKEN }}'
          firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT }}'
          channelId: live
          projectId: your-project-id
```

Add environment variables as GitHub Secrets.
