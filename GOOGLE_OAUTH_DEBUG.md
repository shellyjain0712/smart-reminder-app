# Google OAuth Setup & Troubleshooting Guide

## Current Issue: Google OAuth Not Working

The app has been updated with:
- ✅ PrismaAdapter for saving users to Neon database
- ✅ JWT sessions for better performance
- ✅ Enhanced debugging and logging
- ✅ Proper OAuth flow configuration

## Google Cloud Console Setup Required

### 1. OAuth Consent Screen
Go to Google Cloud Console → APIs & Services → OAuth consent screen

**Required Settings:**
- User Type: External (for public app)
- App name: Smart Reminder App
- User support email: your-email@gmail.com
- Developer contact: your-email@gmail.com

### 2. OAuth 2.0 Client Configuration
Go to APIs & Services → Credentials → Create OAuth 2.0 Client ID

**Application Type:** Web application

**Authorized JavaScript Origins:**
```
http://localhost:3000
https://your-vercel-app.vercel.app
```

**Authorized Redirect URIs:**
```
http://localhost:3000/api/auth/callback/google
https://your-vercel-app.vercel.app/api/auth/callback/google
```

### 3. Environment Variables Check

Make sure your `.env` file has:
```bash
# Google OAuth (from Google Cloud Console)
GOOGLE_CLIENT_ID="420841585528-iihjli7mh8e2k150esl2hhm1606e7ge7.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="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vMoYcAICU"

# Neon Database
DATABASE_URL="postgresql://neondb_owner:npg_PXZVjw6pOqJZ5O8jDYGYf9oL2a3Y8lLZ@ep-shy-unit-a1aff7rb-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"

# NextAuth
AUTH_SECRET="vXpHIyl8RpDRofC0YAk2PMgp8teWJoQTHrvMoYcAICU="
```

## Testing Steps

### 1. Local Development
```bash
npm run dev
# Go to http://localhost:3000
# Try Google OAuth signup/signin
# Check console for debug logs
```

### 2. Check Database
```bash
npx prisma studio
# Verify User, Account, Session tables exist
# Check if users are being created
```

### 3. Debug Logs
The app now logs detailed OAuth flow information:
- SignIn callback data
- JWT token creation
- Session management
- User persistence

## Common Issues & Solutions

### Issue 1: "redirect_uri_mismatch"
- Update Google Cloud Console redirect URIs
- Ensure exact match with your domain

### Issue 2: "OAuth app not verified"
- Submit for verification or add test users
- Use verified domains

### Issue 3: "User data not saved"
- Check Neon database connection
- Verify Prisma schema is pushed
- Check console logs for errors

### Issue 4: "Session not persisting"
- Clear browser cookies
- Check JWT secret configuration
- Verify session callback

## Vercel Environment Variables

Make sure to set in Vercel dashboard:
```
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
DATABASE_URL=your-neon-url
AUTH_SECRET=your-auth-secret
EMAIL_SERVER_USER=your-email
EMAIL_SERVER_PASSWORD=your-app-password
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_FROM=your-email
```

## Next Steps

1. **Update Google Cloud Console** with correct redirect URIs
2. **Test locally** with `npm run dev`
3. **Check debug logs** in browser console and terminal
4. **Verify database** with Prisma Studio
5. **Deploy to Vercel** with environment variables

The debugging logs will show exactly where the OAuth flow is failing!
