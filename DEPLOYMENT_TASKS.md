# MERN Stack Deployment Tasks

This guide contains the step-by-step tasks to host your MERN application online.

## 1. Preparation (Already Started)
- [x] **Backend Configuration**: Ensure `server.js` uses `process.env.PORT`. (Verified)
- [x] **Frontend Configuration**: Update Axios to use `VITE_API_URL` environment variable. (Done automatically)
- [x] **Secrets Safety**: Create `.gitignore` in `backend/` to prevent uploading `.env` and `node_modules`. (Done automatically)

## 2. GitHub Setup
- [ ] **Create Repository**: Go to [GitHub](https://github.com/new) and create a new repository (e.g., `mern-fleet-app`).
- [ ] **Push Code**: Run the following commands in your `mern-login` folder terminal:
  ```bash
  git init
  # If you already have a git repo, skip init
  git add .
  git commit -m "Prepare for deployment"
  git branch -M main
  git remote add origin https://github.com/YOUR_USERNAME/mern-fleet-app.git
  git push -u origin main
  ```

## 3. Database (MongoDB Atlas)
- [ ] **Network Access**: Go to MongoDB Atlas -> Network Access.
- [ ] **Allow All IPs**: Add IP Address `0.0.0.0/0` (In "Allow Access from Anywhere"). This allows Render/Vercel to connect. (Note: For stricter security, this can be refined later, but this is standard for serverless hosts).

## 4. Backend Deployment (Render.com)
Render offers a free tier for Node.js services.

- [ ] **Sign Up/Login**: Go to [Render](https://render.com) and login with GitHub.
- [ ] **New Web Service**: Click **"New +"** -> **"Web Service"**.
- [ ] **Select Repo**: Connect your GitHub account and select your `mern-fleet-app` repository.
- [ ] **Configure Service**:
    - **Name**: `mern-backend-api` (or similar)
    - **Root Directory**: `backend` (Important! Since your server is in a subfolder)
    - **Runtime**: `Node`
    - **Build Command**: `npm install`
    - **Start Command**: `node server.js` (or `npm start`)
- [ ] **Environment Variables**:
    Scroll down to "Environment Variables" and add:
    - `MONGO_URI`: (Copy from your local `backend/.env`)
    - `JWT_SECRET`: (Copy from your local `backend/.env`)
    - `GOOGLE_CLIENT_ID`: (If needed by backend)
- [ ] **Deploy**: Click "Create Web Service". Wait for it to show "Live".
- [ ] **Copy URL**: Copy the backend URL (e.g., `https://mern-backend-api.onrender.com`). You will need this for the frontend.

## 5. Frontend Deployment (Vercel)
Vercel is excellent for Vite/React apps.

- [ ] **Sign Up/Login**: Go to [Vercel](https://vercel.com) and login with GitHub.
- [ ] **Add New Project**: Click **"Add New..."** -> **"Project"**.
- [ ] **Import Repo**: Import `mern-fleet-app` from GitHub.
- [ ] **Configure Project**:
    - **Framework Preset**: Vite (should detect automatically).
    - **Root Directory**: Click "Edit" and select `frontend`.
- [ ] **Build Settings**: (Defaults should be fine: `vite build` and `dist`).
- [ ] **Environment Variables**:
    - Add `VITE_API_URL` with value: `https://mern-backend-api.onrender.com` (The URL you copied from Step 4). Do not add a trailing slash.
    - Add `VITE_GOOGLE_CLIENT_ID`: (Copy from `frontend/.env`).
- [ ] **Deploy**: Click "Deploy".
- [ ] **Success**: Once deployed, visit the URL provided by Vercel.

## 6. Final Test
- [ ] **Login/Register**: Try to register a new user on the deployed site.
- [ ] **Check Auth**: Ensure Google Login works (You might need to add the Vercel Domain to your Google Cloud Console "Authorized Javascript Origins" and "Authorized Redirect URIs").

> **Note on Google Login**: Go to [Google Cloud Console](https://console.cloud.google.com/), select your project, go to APIs & Services -> Credentials. Edit your OAuth 2.0 Client ID.
> - Add your **Vercel URL** (e.g., `https://mern-fleet-app.vercel.app`) to **Authorized JavaScript origins**.
> - Add it to **Authorized redirect URIs** as well (if using redirect mode, though strictly JS origins is usually enough for the pop-up).
