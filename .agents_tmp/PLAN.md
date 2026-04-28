# PLAN: Sistem Profesional de Administrare Satoris

## 1. OBJECTIVE

Implementez sistem complet de administrare profesionist pentru Satoris cu:
- Sistem de autentificare/înregistrare utilizatori cu roluri (admin, user)
- Dashboard cu metrici și analytics (activitate site, erori, top pagini)
- Pagini de administrare pentru toate tipurile de conținut
- Arhitectură pregătită pentru e-commerce (produse, comenzi)

---

## 2. CONTEXT SUMMARY

### Stack tehnologic actual
- **Frontend:** React + Vite + TypeScript + Framer Motion
- **Backend:** PHP API (file-based JSON storage)
- **Database:** MySQL (schema disponibilă dar nefolosită)

### Componente existente de integrat în admin
- Blog posts, Comments, Tags
- Services
- Projects
- Testimonials
- Settings
- Contact submissions
- Newsletter subscribers

---

## 3. APPROACH OVERVIEW

### Arhitectura aleasă:
1. **Backend PHP** - Extind API cu autentificare JWT și endpoints noi CRUD
2. **Database MySQL** - Tabele noi pentru users, products, orders, analytics  
3. **Frontend React** - Admin layout profesional cu sidebar, dashboard, pagini CRUD

### Model de date:
- **users** - id, email, password_hash, name, role, is_active, created_at
- **products** - pregătire e-commerce
- **orders / order_items** - pregătire e-commerce
- **activity_log** - analytics și erori

---

## 4. IMPLEMENTATION STEPS

### Faza 1: Database & Backend Core

#### 1.1 Actualizare Schema MySQL (`database/schema.sql`)
- Adaugare tabel `users` cu câmpuri: id, email, password_hash, name, role (admin/user), is_active, created_at
- Adaugare tabel `products` pentru e-commerce pregătire
- Adaugare tabele `orders`, `order_items` pentru e-commerce
- Adaugare tabel `activity_log` pentru analytics și tracking erori

#### 1.2 Extend Backend API (`backend/api.php`)

**Auth endpoints:**
- POST /api/auth/register - Înregistrare utilizator
- POST /api/auth/login - Login (return JWT)
- POST /api/auth/logout - Logout
- GET /api/auth/me - Get current user
- PUT /api/auth/profile - Update profil

**Dashboard endpoints:**
- GET /api/dashboard/stats - Statistici generale
- GET /api/dashboard/activity - Activitate recentă
- GET /api/dashboard/errors - Erori recente
- GET /api/dashboard/top-pages - Top pagini vizitate

**Users (admin only):**
- GET /api/users - Lista users
- PUT /api/users/:id/role - Schimbare rol
- DELETE /api/users/:id - Stergere user

**Products (e-commerce prep):**
- GET /api/products - Lista produse
- POST /api/products - Creare produs
- PUT /api/products/:id - Update produs
- DELETE /api/products/:id - Stergere produs

**Orders:**
- GET /api/orders - Lista comenzi
- PUT /api/orders/:id/status - Update status

**Analytics:**
- POST /api/analytics/page-view - Log page view
- POST /api/analytics/error - Log error
- GET /api/analytics/summary - Statistici

---

### Faza 2: Frontend Admin Core

#### 2.1 Admin Layout Component
**Files:** `frontend/src/components/AdminLayout/`
- AdminLayout.tsx - Layout principal cu sidebar
- Sidebar.tsx - Navigare sidebar
- Header.tsx - Header cu user menu
- AdminLayout.css - Stiluri

**Caracteristici:**
- Sidebar cu links la toate secțiunile admin
- Responsive (mobile hamburger menu)
- User dropdown cu logout
- Notifications bell
- Active route highlighting

#### 2.2 Auth Pages
**Files:** `frontend/src/pages/Admin/Auth/`
- Login.tsx - Login form
- Register.tsx - Registration form
- ProtectedRoute.tsx - Route guard (verifică auth și rol)

**Caracteristici:**
- Validare formulare
- Remember me option
- Password visibility toggle
- Error messages
- Redirect după login

#### 2.3 Dashboard Page Principal
**File:** `frontend/src/pages/Admin/Dashboard/Dashboard.tsx`
- StatsCard.tsx - Card metric individual
- ActivityChart.tsx - Grafic activitate (opțional)
- RecentActivity.tsx - Lista activitate recentă

**Metrici de afișat:**
- Total vizite / vizite azi
- Comentarii noi (pending)
- Articole publicate
- Produse (dacă există)
- Utilizatori înregistrați
- Erori recente

**Topuri:**
- Top pagini vizitate
- Activitate recentă (listă cu timestamp)
- Erori recente (listă)

---

### Faza 3: Admin CRUD Pages

#### 3.1 Blog Management
**Files:** `frontend/src/pages/Admin/Blog/`
- BlogList.tsx - Lista articole (tabel cu search/filter)
- BlogCreate.tsx - Creare articol
- BlogEdit.tsx - Editare articol
- BlogForm.tsx - Formular comun (shared)

**Caracteristici:**
- Tabel cu search, sort, pagination
- Bulk actions (delete, publish)
- Image upload pentru cover
- Rich text editor pentru content
- Tag/Categorie selector

#### 3.2 Services Management  
**Files:** `frontend/src/pages/Admin/Services/`
- ServicesList.tsx - Lista servicii
- ServiceCreate.tsx - Creare serviciu
- ServiceEdit.tsx - Editare serviciu
- ServiceForm.tsx - Formular

**Campuri:** Icon (emoji), Title, Description, Category, Sort order, Active toggle

#### 3.3 Projects Management
**Files:** `frontend/src/pages/Admin/Projects/`
- ProjectsList.tsx - Lista proiecte
- ProjectCreate.tsx - Creare proiect
- ProjectEdit.tsx - Editare proiect
- ProjectForm.tsx - Formular

**Campuri:** Name, Slug, Category, Description, Image, Featured toggle

#### 3.4 Comments Management
**Files:** `frontend/src/pages/Admin/Comments/`
- CommentsList.tsx - Lista comentarii
- CommentItem.tsx - Comentariu individual

**Caracteristici:**
- Filtru: all/approved/pending
- Aprobare cu 1 click
- Stergere cu confirmare

#### 3.5 Users Management (Admin only)
**Files:** `frontend/src/pages/Admin/Users/`
- UsersList.tsx - Lista utilizatori
- UserEdit.tsx - Editare utilizator

**Caracteristici:**
- Schimbare rol (admin/user)
- Activare/Dezactivare cont
- Stergere user

#### 3.6 Settings Page
**File:** `frontend/src/pages/Admin/Settings/Settings.tsx`

**Campuri:** Site name, Tagline, Email, Phone, Address, Social links

---

### Faza 4: Products & E-commerce Prep

#### 4.1 Products Management
**Files:** `frontend/src/pages/Admin/Products/`
- ProductsList.tsx - Lista produse
- ProductCreate.tsx - Creare produs
- ProductEdit.tsx - Editare produs
- ProductForm.tsx - Formular

**Campuri:** Name, Slug, Description, Price, Category, Stock, Images, Active toggle

#### 4.2 Orders Management
**Files:** `frontend/src/pages/Admin/Orders/`
- OrdersList.tsx - Lista comenzi
- OrderDetail.tsx - Detalii comandă
- OrderStatus.tsx - Status updater

**Status workflow:** pending → processing → completed / cancelled

---

### Faza 5: Analytics & Monitoring

#### 5.1 Activity Logging (Backend)
- Page views tracking (automat pe fiecare request)
- Errors (JS errors, API errors)
- User actions (login, logout, create, update, delete)
- Form submissions

#### 5.2 Dashboard Metrics
- Vizite total / azi / saptamana
- Top 5 pagini vizitate
- Error count (recent)
- Ultimii utilizatori activi
- Activitate pe site (grafice optional)

---

## 5. TESTING AND VALIDATION

### Funcționalități de testat:

#### Autentificare
- [ ] Înregistrare cu email valid
- [ ] Înregistrare cu email existent (eroare)
- [ ] Login cu credențiale corecte
- [ ] Login cu credențiale greșite (eroare)
- [ ] Logout șterge token-ul
- [ ] Protected routes nu permit neautentificat

#### Autorizare
- [ ] User normal nu poate accesa pagini admin
- [ ] User normal nu poate crea/șterge conținut
- [ ] Admin poate accesa tot
- [ ] Schimbare rol funcționează

#### Dashboard
- [ ] Stats se încarcă corect
- [ ] Activitate recentă afișează
- [ ] Top pages afișează corect
- [ ] Errors afișează corect

#### CRUD Operations
- [ ] Blog: Create, Read, Update, Delete
- [ ] Services: Create, Read, Update, Delete
- [ ] Projects: Create, Read, Update, Delete
- [ ] Comments: Approve, Delete
- [ ] Products: Create, Read, Update, Delete (prep)
- [ ] Users: View, Change role, Delete (admin only)

#### UX
- [ ] Loading states
- [ ] Error messages
- [ ] Success notifications
- [ ] Responsive design
- [ ] Form validation
