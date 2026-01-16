# Orders Dashboard - Production Ready

A Next.js dashboard for managing orders stored in Supabase, deployable to Firebase Hosting.

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Supabase JS v2**
- **Firebase Hosting**

## Features

### Authentication
- Simple password gate using environment variable
- Secure httpOnly cookies
- Protected routes with middleware

### All Orders Tab
- View all orders in a table
- Time filters: Today, Last 7 days, Last 30 days, Custom range
- Search by order number, customer name, or phone
- Pagination with "Load More"
- Sorted by newest first

### Orders in Progress Tab
- Two sections: Delivery and Collection
- Shows only orders with `order_status = "PACKAGING"`
- Action buttons to update status:
  - Delivery: "Dropped-off" → sets status to "processed"
  - Collection: "Collected" → sets status to "collected"
- Optimistic UI updates
- Toast notifications

## Local Development Setup

### Prerequisites
- Node.js 18+ installed
- Supabase account with orders table
- npm or yarn

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
# Supabase Configuration (Server-side only)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Dashboard Password
DASHBOARD_PASSWORD=your_secure_password_here

# Cookie Secret (generate a random string)
COOKIE_SECRET=your_random_secret_key_here
```

**Important:** 
- Get your Supabase URL and Service Role Key from your Supabase project settings
- Never commit `.env.local` to version control
- Use a strong password for `DASHBOARD_PASSWORD`

### Step 3: Verify Supabase Table

Ensure your Supabase database has an `orders` table with this schema:

```sql
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  order_number TEXT NOT NULL,
  custom_tracking_reference TEXT,
  order_status TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT,
  entered_address TEXT,
  bottles INTEGER DEFAULT 0,
  collection_method TEXT CHECK (collection_method IN ('delivery', 'collection')),
  waybill_no TEXT,
  pin TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Step 4: Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Step 5: Login

Enter the password you set in `DASHBOARD_PASSWORD` to access the dashboard.

## Firebase Hosting Deployment

### Prerequisites
- Firebase CLI installed: `npm install -g firebase-tools`
- Firebase project created

### Step 1: Login to Firebase

```bash
firebase login
```

### Step 2: Initialize Firebase

```bash
firebase init hosting
```

Select:
- Use an existing project or create a new one
- Choose "Next.js" as the framework
- Set up automatic builds and deploys with GitHub (optional)

### Step 3: Configure Firebase

Create `firebase.json` in the root:

```json
{
  "hosting": {
    "source": ".",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "frameworksBackend": {
      "region": "us-central1"
    }
  }
}
```

### Step 4: Set Environment Variables in Firebase

```bash
firebase functions:secrets:set SUPABASE_URL
firebase functions:secrets:set SUPABASE_SERVICE_ROLE_KEY
firebase functions:secrets:set DASHBOARD_PASSWORD
firebase functions:secrets:set COOKIE_SECRET
```

Or use Firebase Console to set environment variables.

### Step 5: Build and Deploy

```bash
npm run build
firebase deploy --only hosting
```

### Step 6: Access Your Dashboard

After deployment, Firebase will provide a URL like:
```
https://your-project.web.app
```

Visit this URL and login with your dashboard password.

## Alternative: Static Export to Firebase (API Routes via Functions)

If you prefer a static export approach:

### Step 1: Modify `next.config.js`

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
```

### Step 2: Move API Routes to Firebase Functions

This requires converting API routes to Firebase Cloud Functions. The recommended approach is using Firebase's Next.js framework support (default in this project).

## Project Structure

```
mutilife_dashboard/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/route.ts
│   │   │   └── logout/route.ts
│   │   └── orders/
│   │       ├── [id]/route.ts
│   │       ├── in-progress/route.ts
│   │       └── route.ts
│   ├── components/
│   │   ├── AllOrdersTab.tsx
│   │   └── InProgressTab.tsx
│   ├── dashboard/
│   │   ├── DashboardClient.tsx
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── lib/
│   ├── auth.ts
│   └── supabaseServer.ts
├── middleware.ts
├── .env.local.example
├── .gitignore
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login with password
- `POST /api/auth/logout` - Logout and clear cookie

### Orders
- `GET /api/orders` - Get all orders with filters
  - Query params: `from`, `to`, `search`, `limit`, `offset`
- `GET /api/orders/in-progress` - Get packaging orders
- `PATCH /api/orders/:id` - Update order status
  - Body: `{ order_status: "processed" | "collected" }`

## Security Notes

- All Supabase credentials are server-side only
- API routes validate authentication via httpOnly cookies
- No sensitive data exposed to client
- CORS and CSRF protection via Next.js defaults

## Troubleshooting

### Orders not loading
- Check Supabase credentials in `.env.local`
- Verify table name is exactly `orders`
- Check browser console for errors

### Authentication issues
- Clear browser cookies
- Verify `DASHBOARD_PASSWORD` is set correctly
- Check middleware is running

### Firebase deployment fails
- Ensure Firebase CLI is up to date
- Check that all environment variables are set
- Review Firebase logs: `firebase functions:log`

## Support

For issues or questions, check:
- Next.js documentation: https://nextjs.org/docs
- Supabase documentation: https://supabase.com/docs
- Firebase Hosting: https://firebase.google.com/docs/hosting
