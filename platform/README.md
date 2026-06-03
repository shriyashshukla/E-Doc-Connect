# E-Doc Platform (Rebuild)

This workspace contains a rebuilt minimal platform with frontend and backend to serve as a clean, maintainable starting point.

Backend (platform/backend)
- Port: 5001
- Run:

```bash
cd platform/backend
npm install
npm run seed    # optional, seeds mock data into MongoDB
npm run dev
```

Frontend (platform/frontend)
- Port: 3000
- Uses Next.js and proxies `/api` to backend during development.

```bash
cd platform/frontend
npm install
npm run dev
```

Notes:
- Backend expects `MONGO_URI` env var for Mongo Atlas; otherwise it will attempt to connect to local MongoDB at mongodb://127.0.0.1:27017/edoc_platform.
- Authentication is mocked; replace with real auth later.
