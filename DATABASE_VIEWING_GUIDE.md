# Database Viewing Guide

## Method 1: Prisma Studio (Recommended)
The easiest way to view your SQLite database:

```bash
npx prisma studio
```

This will open a web interface at `http://localhost:5555` where you can:
- View all tables
- Browse data
- Add/edit/delete records
- Run queries

## Method 2: VS Code SQLite Extension
1. Install the "SQLite" extension by alexcvzz in VS Code
2. Open the Command Palette (Ctrl+Shift+P)
3. Type "SQLite: Open Database"
4. Select your `prisma/dev.db` file
5. View tables in the SQLite Explorer panel

## Method 3: DB Browser for SQLite (External Tool)
1. Download from: https://sqlitebrowser.org/
2. Install and open the application
3. Click "Open Database"
4. Navigate to your project folder
5. Open `prisma/dev.db`

## Method 4: Command Line SQLite
If you have SQLite installed:

```bash
sqlite3 prisma/dev.db
```

Common commands:
- `.tables` - List all tables
- `.schema User` - Show User table structure
- `SELECT * FROM User;` - View all users
- `SELECT * FROM PasswordResetToken;` - View reset tokens
- `.quit` - Exit

## Database Location
Your SQLite database file is located at:
```
prisma/dev.db
```

## Current Tables
Based on your schema, you should see these tables:
- User
- Account
- Session
- Post
- VerificationToken
- PasswordResetToken

## Quick Check Script
Run this to see if your database is working:

```bash
npx prisma db seed
```

Or create a simple query:

```bash
npx prisma studio
```

## For Production (Vercel)
Note: On Vercel, you'll need to use a cloud database like:
- PostgreSQL (Neon, Supabase)
- MySQL (PlanetScale)
- MongoDB (Atlas)

SQLite files are ephemeral on Vercel and will be reset on each deployment.
