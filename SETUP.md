# Smart Reminder App - Environment Setup Guide

## Quick Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/shellyjain0712/smart-reminder-app.git
   cd smart-reminder-app
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` with your actual values (see below).

4. **Set up the database:**
   ```bash
   pnpm prisma generate
   pnpm prisma db push
   ```

5. **Start the development server:**
   ```bash
   pnpm dev
   ```

## Environment Variables Setup

### Required Variables

#### 1. NextAuth Secret
Generate a secret for NextAuth:
```bash
npx auth secret
```
Add the generated secret to your `.env` file as `AUTH_SECRET`.

#### 2. Google OAuth (Required for Google Sign-in)
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (for development)
   - `https://yourdomain.com/api/auth/callback/google` (for production)
6. Copy Client ID and Client Secret to your `.env` file

#### 3. Email Configuration (Required for Password Reset)
For Gmail (recommended):
1. Enable 2-Factor Authentication on your Google account
2. Generate an App Password: [How to create App Password](https://support.google.com/accounts/answer/185833)
3. Use your Gmail address and the App Password in `.env`

### Example .env Configuration
```bash
AUTH_SECRET="your-generated-secret"

GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

DATABASE_URL="file:./dev.db"

EMAIL_SERVER_USER="your-email@gmail.com"
EMAIL_SERVER_PASSWORD="your-app-password"
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT="587"
EMAIL_FROM="your-email@gmail.com"
```

## Features

- ✅ **Authentication**: Google OAuth + Email/Password
- ✅ **Database**: SQLite with Prisma ORM
- ✅ **Password Reset**: Email-based secure token system
- ✅ **UI**: Modern design with Tailwind CSS and shadcn/ui
- ✅ **Theme**: Dark/Light mode support
- ✅ **Deployment**: Optimized for Vercel

## Development

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm prisma studio` - Open database GUI
- `pnpm prisma db push` - Push schema changes to database

## Production Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Important Security Notes
- Never commit `.env` files to git
- Use different `AUTH_SECRET` for production
- Update Google OAuth redirect URIs for your production domain
- Use environment-specific email credentials
