# Quick Start Guide

Get your Beauty Center website running in 5 minutes!

## Step 1: Install Dependencies (1 minute)

```bash
npm install
```

This installs all frontend and backend dependencies.

## Step 2: Setup MongoDB (2 minutes)

### Option A: MongoDB Atlas (Recommended - Cloud)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a free cluster
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Open `.env` file
7. Replace the `MONGODB_URI` value with your connection string:

```env
MONGODB_URI=mongodb+srv://youruser:yourpass@cluster.mongodb.net/beauty_center
```

### Option B: Local MongoDB

If you have MongoDB installed locally, the `.env` is already configured:

```env
MONGODB_URI=mongodb://localhost:27017/beauty_center
```

Just make sure MongoDB is running on your machine.

## Step 3: Add Your Logo (1 minute)

1. Place your logo file in the `public/` folder:
   ```
   public/logo.png
   ```

2. Open `src/components/Hero.tsx`

3. Find line 16-18 and replace:

```tsx
// Replace this:
<Sparkles className="w-16 h-16 text-white" strokeWidth={1.5} />

// With this:
<img src="/logo.png" alt="Logo" className="w-16 h-16 md:w-20 md:h-20 object-contain" />
```

4. Remove the Sparkles import at the top:
```tsx
// Remove this line:
import { Sparkles } from 'lucide-react';
```

**Skip this step for now?** The sparkles icon will work as a placeholder.

## Step 4: Start the Application (1 minute)

```bash
npm run start:all
```

This starts both frontend and backend servers.

You should see:
```
✅ MongoDB connected successfully
🚀 Server is running
📡 Port: 5000
🌍 Environment: development

VITE v5.4.2  ready in 500 ms
➜  Local:   http://localhost:5173/
```

## Step 5: Test Everything

1. Open your browser: http://localhost:5173
2. Scroll down to the contact form
3. Fill in all fields:
   - Name: Test User
   - Email: test@example.com
   - Subject: Test Message
   - Message: This is a test
4. Click "Send Message"
5. You should see: "Your message has been sent successfully!"

## Verify Database

### If using MongoDB Atlas:
1. Go to your cluster
2. Click "Collections"
3. Find `beauty_center` database
4. Find `contacts` collection
5. You should see your test message!

### If using local MongoDB:
1. Open MongoDB Compass
2. Connect to `mongodb://localhost:27017`
3. Find `beauty_center` database
4. Find `contacts` collection
5. You should see your test message!

## That's It!

Your website is now running with:
- ✅ React frontend
- ✅ Express backend
- ✅ MongoDB database
- ✅ Working contact form

## Next Steps

### Customize Your Website

1. **Update Business Info:**
   - Company name in `src/components/Hero.tsx` (line 21)
   - Phone number in `src/components/Contact.tsx` (line 103)
   - Email in `src/components/Contact.tsx` (line 111)
   - Address in `src/components/Contact.tsx` (line 119)

2. **Modify Services:**
   - Edit `src/components/Services.tsx` (lines 9-44)
   - Change titles, descriptions, or add new services

3. **Change Colors:**
   - Find all instances of `rgb(83,168,209)` and replace with your color
   - Or add custom colors to Tailwind config

### Deploy to Production

When ready to deploy:

1. **Build Frontend:**
   ```bash
   npm run build
   ```

2. **Deploy Backend:**
   - Update `NODE_ENV=production` in `.env`
   - Deploy to Heroku, DigitalOcean, Railway, etc.

3. **Update Environment Variables:**
   - Set production `MONGODB_URI`
   - Set production `FRONTEND_URL`
   - Never commit `.env` file!

## Troubleshooting

### "Cannot connect to MongoDB"
- Check your MongoDB connection string in `.env`
- Verify MongoDB service is running (if local)
- Whitelist your IP in MongoDB Atlas

### "Port 5173 already in use"
```bash
# Kill the process
lsof -ti:5173 | xargs kill -9
```

### "Port 5000 already in use"
```bash
# Kill the process
lsof -ti:5000 | xargs kill -9
```

### Form not submitting
- Check backend is running on port 5000
- Check browser console for errors
- Verify `VITE_API_URL` in `.env` is correct

## Need More Help?

- **Full Setup Guide:** See [README.md](README.md)
- **Logo Instructions:** See [LOGO_SETUP.md](LOGO_SETUP.md)
- **Project Overview:** See [PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md)
- **Code is Documented:** Every file has comments explaining what it does

## Development Commands

| Command | What it does |
|---------|--------------|
| `npm run dev` | Start frontend only |
| `npm run server:dev` | Start backend only |
| `npm run start:all` | Start both (recommended) |
| `npm run build` | Build for production |
| `npm run typecheck` | Check for TypeScript errors |
| `npm run lint` | Run code linter |

Enjoy your new website! 🎉
