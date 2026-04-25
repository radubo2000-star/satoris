# Satoris Events - Website Rebuild

Modern React + PHP website rebuild for Satoris Events — MICE & Events Agency in Bucharest, Romania.

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: PHP 8.x (Vanilla REST API)
- **Routing**: React Router v6
- **Animations**: Framer Motion
- **HTTP**: Axios

## Project Structure

```
/workspace/project/satoris/
├── frontend/          # React frontend (Vite)
│   ├── src/
│   │   ├── api/         # API client
│   │   ├── components/  # Reusable components
│   │   │   ├── Header/
│   │   │   ├── Footer/
│   │   │   └── Layout/
│   │   ├── pages/       # Page components
│   │   │   ├── Home/
│   │   │   ├── Services/
│   │   │   ├── Work/
│   │   │   ├── Blog/
│   │   │   ├── About/
│   │   │   └── Contact/
│   │   └── styles/      # Global styles
├── backend/           # PHP API
│   ├── public/         # Public entry point
│   └── src/
│       └── Routes/     # API routes
├── database/          # SQL schemas
└── docs/             # Documentation
```

## Development

### Frontend (Port 12000)

```bash
cd frontend
npm install
npm run dev
```

### Backend (Port 12001)

```bash
cd backend/public
php -S localhost:12001
```

## Features

- **Home Page**: Hero, Services overview, Featured projects, Testimonials, CTA
- **Services Page**: All services with details
- **Work/Portfolio**: Project gallery with filtering
- **Blog**: Article listing
- **About**: Company info, values
- **Contact**: Contact form with validation

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/services | List all services |
| GET | /api/projects | List all projects |
| GET | /api/blog | List blog posts |
| POST | /api/contact | Submit contact form |
| POST | /api/newsletter | Subscribe newsletter |
| GET | /api/testimonials | Get testimonials |
| GET | /api/settings | Get site settings |

## Design

Based on satoris.ro brand:
- Primary: Professional purple/blue tones
- Clean, modern, professional aesthetic
- Responsive design (mobile, tablet, desktop)
- Smooth animations with Framer Motion

## Deployment

### Frontend (cPanel/Vercel)
- Build: `npm run build`
- Output: `dist/` folder

### Backend (cPanel)
- Point document root to `backend/public/`
- Ensure PHP 8.x is available
- Configure MySQL database

## License

Copyright © 2026 Satoris PR&Digital