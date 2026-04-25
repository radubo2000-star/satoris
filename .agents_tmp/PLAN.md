# 1. OBJECTIVE

**Refacerea completă a site-ului https://satoris.ro/** folosind o arhitectură modernă React + PHP/MySQL, păstrând structura actuală dar îmbunătățind designul cu elemente interactive React și adăugând funcționalități complete (CMS, blog, portofoliu, newsletter, contact).

---

# 2. CONTEXT SUMMARY

## Structura actuală a site-ului (extrată din satoris.ro):
- **Hero**: "We make brands Visible & Digital"
- **Despre noi**: Satoris Events — MICE & Events Agency
- **Servicii**: Event Management, Expo Strategy, Print Design, Content Strategy, Digital Audit, Market Research, UX, Packaging, Branding, Email Marketing
- **Parteneri**: Omi, Holandria
- **Portofoliu**: Proiecte (marie, softy, cela, omi)
- **Blog**: Articole (ex: "Târg de Crăciun Dalles 2025")
- **Newsletter + Contact**
- **Client testimonials + Logo-clients**

## Tehnologii alese:
- **Frontend**: React (Vite) + CSS Modules / Styled Components
- **Backend**: PHP 8.x + Laravel sau vanilla PHP API
- **Bază de date**: MySQL
- **Deployment local**: Port 12000 (React FE), 12001 (PHP API)

---

# 3. APPROACH OVERVIEW

**Abordare:** Redesign progresiv cu păstrarea identității vizuale existente

1. **Setup proiect** - Creare repo, configurare React + PHP
2. **Design system** - Extracting culori, tipografie, componente
3. **Frontend React** - Pagini cu design îmbunătățit + animări
4. **Backend PHP** - REST API + MySQL pentru CRUD
5. **Integrări** - Formulare, newsletter, portofoliu, blog
6. **Testare** - Validare funcționalități pe work-hosts

**De ce React + PHP:** Permite interactivitate modernă (animări, lazy loading) păstrând simplitatea unui CMS custom cu PHP, ideal pentru hosting cPanel.

---

# 4. IMPLEMENTATION STEPS

## Faza 1: Setup și Configurare

### 1.1 Creare structură proiect
```
/workspace/project/satoris/
├── frontend/          # React app (Vite)
├── backend/           # PHP API
├── database/           # SQL schemas
└── docs/               # Documentație
```

### 1.2 Setup Frontend React (port 12000)
- Inițializare Vite + React + TypeScript
- Configurare routing (React Router)
- Setup styled-components sau CSS Modules
- Configurare proxy către backend (port 12001)

### 1.3 Setup Backend PHP (port 12001)
- Structură Laravel-style (controllers, models, routes)
- Configurare conexiune MySQL
- Setup CORS pentru React

### 1.4 Creare schema MySQL
```sql
-- Tabel: contacts (formular contact)
-- Tabel: projects (portofoliu)
-- Tabel: blog_posts (articole blog)
-- Tabel: newsletter_subscribers
-- Tabel: services (servicii)
-- Tabel: testimonials (client feedback)
-- Tabel: settings (configurări site)
```

---

## Faza 2: Design System și Componente

### 2.1 Design Tokens
- Culori principale din site-ul actual
- Tipografie (Google Fonts)
- Spacing, breakpoints responsive
- Animations/transitions

### 2.2 Componente React de bază
- Layout (Header, Footer, Navigation)
- Button, Card, Section
- Form inputs
- Image lazy loading
- Scroll animations (Framer Motion)

---

## Faza 3: Pagini Frontend

### 3.1 Pagina Acasă (Home)
- Hero section cu text animat
- About us preview
- Servicii grid
- Featured projects carousel
- Client testimonials
- Newsletter signup
- CTA "Get Free Digital Audit"

### 3.2 Pagina Servicii
- Lista servicii cu descrieri
- Categorii: Events, Digital, Branding
- Detalii per serviciu

### 3.3 Pagina Portofoliu
- Grid proiecte cu filtru
- Detalii proiect (lightbox/modal)
- Galerie imagini

### 3.4 Pagina Blog
- Lista articole cu paginare
- Articol individual cu conținut Rich Text
- Categorii și tags

### 3.5 Pagina Contact
- Formular contact cu validare
- Hărță / info contact
- Social links

### 3.6 Pagina Despre Noi
- Echipa (dacă e cazul)
- Istoric, valori
- Parteneri/clients grid

---

## Faza 4: Backend PHP API

### 4.1 REST API Endpoints
```
GET    /api/services          - Lista servicii
GET    /api/projects          - Lista proiecte
GET    /api/projects/{id}     - Detalii proiect
GET    /api/blog              - Lista articole
GET    /api/blog/{slug}       - Articol by slug
POST   /api/contact           - Trimite mesaj contact
POST   /api/newsletter        - Subscribe newsletter
GET    /api/testimonials      - Lista testimonials
GET    /api/settings          - Setări site
```

### 4.2 Admin Panel (basic)
- Dashboard admin
- CRUD pentru proiecte, articole blog
- Încărcare imagini
- Export date contact

---

## Faza 5: Conținut și Migrare

### 5.1 Migrare conținut existent
- Text servicii din site-ul actual
- Proiecte (marie, softy, cela, omi)
- Articol blog "Târg de Crăciun Dalles 2025"
- Testimonials existente

### 5.2 Setup imagini/media
- Folder uploads pentru proiecte
- Optimizare imagini
- Lazy loading implementation

---

## Faza 6: Deploy și Testare

### 6.1 Configurare work-hosts
- Frontend React pe port 12000
- PHP API pe port 12001
- MySQL pentru testare locală

### 6.2 Testare funcționalități
- Navigare între pagini
- Formulare (contact, newsletter)
- CMS operations
- Responsive design
- Performance (Lighthouse)

---

# 5. TESTING AND VALIDATION

## Checklist de validare:

### Funcțional:
- [ ] Toate paginile se încarcă corect
- [ ] Navigarea între pagini funcționează
- [ ] Formular contact trimite date
- [ ] Newsletter subscription funcționează
- [ ] CRUD pentru proiecte/blog (admin)
- [ ] Încărcare imagini funcționează

### Design:
- [ ] Design responsive (mobile, tablet, desktop)
- [ ] Animații smooth
- [ ] Font-uri și culori consistente
- [ ] Imagini se încarcă lazy

### Performanță:
- [ ] Lighthouse score > 80
- [ ] Timp încărcare < 3s
- [ ] Bundle size optimizat

### Securitate:
- [ ] Input sanitization pe formuri
- [ ] Prepared statements pentru SQL
- [ ] CSRF protection (dacă e cazul)

---

## Output final:
- Repository complet cu README
- Documentație API
- Instrucțiuni deploy pe cPanel
- Date de test populate în MySQL
