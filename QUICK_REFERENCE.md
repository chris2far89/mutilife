# Quick Reference Guide

## Local Development

### First Time Setup
```bash
# 1. Install dependencies
npm install

# 2. Create .env.local file (copy from .env.local.example)
# Edit .env.local with your actual credentials

# 3. Run development server
npm run dev

# 4. Open browser
# http://localhost:3000
```

### Daily Development
```bash
# Start dev server
npm run dev

# Build for production (test locally)
npm run build
npm start
```

## Firebase Deployment

### First Time Deployment
```bash
# 1. Install Firebase CLI (if not installed)
npm install -g firebase-tools

# 2. Login to Firebase
firebase login

# 3. Initialize project
firebase init hosting
# Select: Next.js framework
# Accept defaults

# 4. Update .firebaserc with your project ID

# 5. Set environment variables in Firebase Console
# Or use: firebase functions:secrets:set VARIABLE_NAME

# 6. Deploy
firebase deploy --only hosting
```

### Subsequent Deployments
```bash
# Build and deploy
npm run build
firebase deploy --only hosting
```

## Common Commands

### Development
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
```

### Firebase
```bash
firebase login                    # Login to Firebase
firebase projects:list            # List your projects
firebase use <project-id>         # Switch project
firebase deploy --only hosting    # Deploy hosting
firebase hosting:rollback         # Rollback deployment
firebase functions:log            # View logs
```

### Git
```bash
git add .
git commit -m "Your message"
git push origin main
```

## Environment Variables

### Local (.env.local)
```env
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
DASHBOARD_PASSWORD=your_password
COOKIE_SECRET=random_string_here
```

### Firebase (Set via Console or CLI)
- SUPABASE_URL
- SUPABASE_SERVICE_ROLE_KEY
- DASHBOARD_PASSWORD
- COOKIE_SECRET

## Troubleshooting

### "Module not found" errors
```bash
rm -rf node_modules package-lock.json
npm install
```

### Port 3000 already in use
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use different port
npm run dev -- -p 3001
```

### Firebase deployment fails
```bash
# Check Firebase CLI version
firebase --version

# Update Firebase CLI
npm install -g firebase-tools@latest

# Check project configuration
firebase projects:list
firebase use <project-id>
```

### Supabase connection issues
- Verify SUPABASE_URL is correct
- Check SUPABASE_SERVICE_ROLE_KEY (not anon key)
- Test connection in Supabase dashboard
- Check table name is exactly "orders"

### Authentication not working
- Clear browser cookies
- Check DASHBOARD_PASSWORD in .env.local
- Verify middleware.ts is in root directory
- Check browser console for errors

## File Locations

### Configuration Files
- `.env.local` - Environment variables (root)
- `firebase.json` - Firebase config (root)
- `.firebaserc` - Firebase project (root)
- `next.config.js` - Next.js config (root)
- `tailwind.config.js` - Tailwind config (root)

### Source Code
- `app/page.tsx` - Login page
- `app/dashboard/page.tsx` - Dashboard
- `app/api/` - API routes
- `lib/` - Utilities
- `middleware.ts` - Auth middleware

## URLs

### Local Development
- Dashboard: http://localhost:3000
- API: http://localhost:3000/api/*

### Production (Firebase)
- Dashboard: https://your-project.web.app
- API: https://your-project.web.app/api/*

## Default Credentials

Set your own password in `.env.local`:
```env
DASHBOARD_PASSWORD=your_secure_password_here
```

## API Endpoints

### Authentication
- POST `/api/auth/login` - Login
- POST `/api/auth/logout` - Logout

### Orders
- GET `/api/orders` - All orders (with filters)
- GET `/api/orders/in-progress` - Packaging orders
- PATCH `/api/orders/:id` - Update order status

## Query Parameters (GET /api/orders)

```
?from=2024-01-01T00:00:00.000Z
&to=2024-01-31T23:59:59.999Z
&search=Sarah
&limit=50
&offset=0
```

## Status Values

### Order Status
- `PACKAGING` - In progress
- `processed` - Delivery completed
- `collected` - Collection completed
- (Any other custom status)

### Collection Method
- `delivery`
- `collection`

## Useful Links

- Next.js Docs: https://nextjs.org/docs
- Supabase Docs: https://supabase.com/docs
- Firebase Docs: https://firebase.google.com/docs
- Tailwind Docs: https://tailwindcss.com/docs
- TypeScript Docs: https://www.typescriptlang.org/docs

## Support

For issues:
1. Check browser console for errors
2. Check Firebase Functions logs
3. Check Supabase dashboard
4. Review README.md and DEPLOYMENT.md
5. Check PROJECT_SUMMARY.md for architecture details
