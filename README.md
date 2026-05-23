# Pretty Polaroid 📸

Pretty Polaroid is a browser-based multi-themed photobooth that lets you capture photos from your camera and turn them into cozy, polaroid-style shots with tints and stickers — all in the browser, powered by **Next.js** and **TypeScript**.

> Live demo: https://pretty-polaroid.vercel.app  

---

## ✨ Features

- **Camera-powered photobooth**  
  - Uses the browser camera (via `MediaDevices.getUserMedia`) to capture photos in real time.  
  - Lets you choose how many shots you want before entering the booth.

- **2-step editing flow**  
  1. **Capture** – Take your shots in the camera view.  
  2. **Customize** – Polaroid-style framing, tints and decorations are auto-applied based on current app theme.

- **Sticker overlays & interactions**  
  - Add decorative stickers to your photos.   
  - Designed to work across desktop and touch devices.

- **Clean, responsive UI**  
  - Layout adapts between desktop and smaller mobile viewports.  
  - Split camera + customize sections for larger screens, stacked layout for smaller ones.  

- **Modern frontend stack**  
  - Built with **Next.js (App Router)** and **TypeScript**.  
  - Uses modular components and React context for camera state, shots and editor data.  
  - Deployed on **Vercel**.

---

## 🧰 Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS, ShadcnUI
- **State management**: React context for shared camera state
- **Deployment**: Vercel

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- A package manager: **npm**, **yarn**, **pnpm**, or **bun**
- A browser that supports `navigator.mediaDevices.getUserMedia` (Chrome, Edge, Firefox, etc.)

> ⚠️ Because the app uses the camera, some browsers may require **HTTPS** or `localhost` for permissions to work.

### 1. Clone the repository

```bash
git clone https://github.com/ankanaghosh2001/polaroid_camera.git
cd polaroid_camera
```

### 2. Install the dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```
### 3. Run the development server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
> Open http://localhost:3000 in your browser to view the app.

### 4. Build for production
```bash
npm run build
npm start
```


*`Built with ❤️ by @ankanaghosh2001`*
