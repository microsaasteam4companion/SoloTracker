# OAuth Integration Setup Guide

## Prerequisites

Aapko ye karna hoga OAuth integration ke liye:

### 1. Reddit OAuth Setup

**Step 1: Reddit App Create Karo**
1. Reddit account se login karo: https://www.reddit.com
2. Preferences > Apps > "Create App" pe jao
3. Fill karo:
   - **Name**: Flow Dashboard (ya koi bhi naam)
   - **App type**: Select "web app"
   - **Description**: Social analytics dashboard
   - **About URL**: http://localhost:5173 (development ke liye)
   - **Redirect URI**: `http://localhost:5173/auth/reddit/callback`
4. "Create app" click karo

**Step 2: Credentials Copy Karo**
- **Client ID**: App ke neeche dikhega (14 characters)
- **Client Secret**: "secret" ke neeche dikhega

**Step 3: .env.local me Add Karo**
```
VITE_REDDIT_CLIENT_ID=your_client_id_here
VITE_REDDIT_CLIENT_SECRET=your_client_secret_here
VITE_REDDIT_REDIRECT_URI=http://localhost:5173/auth/reddit/callback
```

---

### 2. Twitter/X OAuth Setup

**Step 1: Twitter Developer Account**
1. https://developer.twitter.com pe jao
2. "Sign up" karo (free tier available)
3. Developer Portal me jao

**Step 2: Create Project & App**
1. "Projects & Apps" > "Create Project"
2. Project name do (e.g., "Flow Dashboard")
3. Use case select karo: "Making a bot"
4. App name do (e.g., "Flow Social Analytics")

**Step 3: App Settings**
1. App ke "Keys and tokens" tab me jao
2. **API Key** aur **API Secret Key** copy karo
3. "User authentication settings" > "Set up" click karo
4. Configure:
   - **App permissions**: Read
   - **Type of App**: Web App
   - **Callback URI**: `http://localhost:5173/auth/twitter/callback`
   - **Website URL**: http://localhost:5173

**Step 4: .env.local me Add Karo**
```
VITE_TWITTER_API_KEY=your_api_key_here
VITE_TWITTER_API_SECRET=your_api_secret_here
VITE_TWITTER_REDIRECT_URI=http://localhost:5173/auth/twitter/callback
```

---

### 3. Google OAuth Setup

**Step 1: Google Cloud Console**
1. [Google Cloud Console](https://console.cloud.google.com/) pe jao.
2. Ek project select/create karo.
3. **APIs & Services > Credentials** me jao.
4. "Create Credentials" > "OAuth client ID" click karo.
5. Application type: "Web application".
6. Configure karo:
   - **Authorized JavaScript origins**:
     - `http://localhost:5173`
     - `https://solopilot.entrext.com`
   - **Authorized redirect URIs**:
     - `https://vcqwzdfdnkvvvzooealy.supabase.co/auth/v1/callback`

**Step 2: Supabase Dashboard**
1. [Supabase Dashboard](https://app.supabase.com/) me jao.
2. Project select karo: **Authentication > Providers > Google**.
3. "Enable Google" turn on karo.
4. Paste karo:
   - **Client ID**: (Google Cloud Console se milega)
   - **Client Secret**: (Google Cloud Console se milega)
5. Save karo.

---

### 4. Grok API Setup

**Step 1: xAI Account**
1. https://x.ai pe jao
2. "Get API Key" click karo
3. Sign up karo (free tier: 25 requests/minute)

**Step 2: API Key Copy Karo**
1. Dashboard me API key generate karo
2. Copy karo (sirf ek baar dikhega!)

**Step 3: .env.local me Add Karo**
```
VITE_GROK_API_KEY=your_grok_api_key_here
```

---

## Complete .env.local File

Aapki final `.env.local` file aise dikhni chahiye:

```env
# Supabase (Already exists)
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Reddit OAuth
VITE_REDDIT_CLIENT_ID=your_reddit_client_id
VITE_REDDIT_CLIENT_SECRET=your_reddit_client_secret
**Step 3: Site URL Setting (IMPORTANT)**
1. Supabase Dashboard me **Authentication > Settings** memo jao.
2. **Site URL** ko `https://solopilot.entrext.com` set karo.
3. (Optional) **Redirect URIs** me `http://localhost:5173` bhi add karo.

---

### 4. Deployment Check (Vercel/Hosting)

Agar aap Vercel ya kisi aur platform pe deploy kar rahe hain:
1. **Environment Variables**: Local `.env.local` file git me nahi jati. Isliye platform dashboard (Vercel Settings > Environment Variables) me ye variables manually add karo:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
2. **Client ID/Secret**: Ensure karo ki aapne Supabase dashboard me correct credentials dale hain.

---

### 5. Grok API Setup

Jab aap ye sab credentials add kar lo, tab mujhe batao. Main:
1. OAuth flow implement karunga (Reddit + Twitter)
2. Grok AI integration karunga
3. Social Signals dashboard ko functional banaunga

**Important Notes:**
- Development ke liye `localhost:5173` use kar rahe hain
- Production deployment ke liye redirect URIs update karne padenge
- API keys ko **kabhi bhi** git me commit mat karo
- `.env.local` already `.gitignore` me hai (safe)

Batao jab credentials ready ho jayein! 🚀
