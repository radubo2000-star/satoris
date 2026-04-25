# PLAN: Blog Profesional Satoris

## 1. OBJECTIVE

Implementare blog profesional complet pentru Satoris cu sistem de comentarii, tags, categorii, admin dashboard și toate funcționalitățile cerute.

---

## 2. DATABASE (Faza 1)

### 2.1 Schema MySQL

```sql
-- Comments table
CREATE TABLE comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    blog_post_id INT NOT NULL,
    author_name VARCHAR(255) NOT NULL,
    author_email VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    is_approved TINYINT(1) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (blog_post_id) REFERENCES blog_posts(id) ON DELETE CASCADE
);

-- Tags table
CREATE TABLE tags (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL
);

-- Blog-Tags relationship (many-to-many)
CREATE TABLE blog_tags (
    blog_post_id INT NOT NULL,
    tag_id INT NOT NULL,
    PRIMARY KEY (blog_post_id, tag_id),
    FOREIGN KEY (blog_post_id) REFERENCES blog_posts(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);

-- Add author field to blog_posts
ALTER TABLE blog_posts ADD COLUMN author VARCHAR(255) DEFAULT 'Satoris Team';
```

---

## 3. BACKEND PHP API (Faza 2)

### 3.1 Endpoints

```
GET    /api/blog              - Lista articole (cu paginare, filtrare)
GET    /api/blog/:slug        - Articol detaliu (cu comments, tags)
POST   /api/blog              - Creare articol (admin)
PUT    /api/blog/:id          - Update articol (admin)
DELETE /api/blog/:id          - Ștergere articol (admin)
POST   /api/blog/:id/publish  - Publicare (admin)

GET    /api/comments          - Lista comentarii (admin)
POST   /api/comments          - Adaugă comentariu (public)
PUT    /api/comments/:id      - Aprobare comentariu (admin)
DELETE /api/comments/:id      - Stergere comentariu (admin)

GET    /api/tags              - Lista tags
POST   /api/tags              - Creare tag (admin)
```

### 3.2 Funcționalități

- Conectare PDO la MySQL
- Upload imagini pe server (local storage)
- Căutare articole (titlu, conținut)
- Validare și sanitization input

---

## 4. FRONTEND REACT (Faza 3)

### 4.1 Pagini

- `/blog` - Blog listing cu search și filtrare categorii
- `/blog/:slug` - Blog post detail cu comentarii
- `/admin/posts` - Lista toate articolele
- `/admin/posts/new` - Creare articol nou
- `/admin/posts/edit/:id` - Editare articol

### 4.2 Componente

- SearchBar cu debounce
- CategoryFilter
- TagSelector
- ImageUploader cu drag & drop
- CommentForm
- CommentList

---

## 5. ADMIN DASHBOARD (Faza 4)

### 5.1 Funcționalități

- Auth simplu (admin password)
- CRUD complet pentru posts
- Image upload cu preview
- Publish/Unpublish toggle
- Aprobare comentarii

### 5.2 UI Components

- Sidebar navigare
- DataTable pentru posts
- Rich Text Editor pentru conținut
- Drag & drop image uploader

---

## 6. EXTRA FEATURES (Faza 5)

### 6.1 Comentarii

- Formular public cu validare
- Aprobare admin înainte de afișare
- Notificare pentru comentarii noi (console log pentru demo)

### 6.2 Căutare

- Debounce 300ms
- Caută în titlu și conținut
- Rezultate în timp real

### 6.3 Categorii și Tags

- Filtrare pe blog listing
- Tag cloud pe sidebar
- Link căutare per tag

---

## 7. IMPLEMENTATION STEPS

### Faza 1: Database
1. Update schema.sql cu tables noi
2. Populare date de test

### Faza 2: Backend
1. Update api.php cu endpoints noi
2. Implementare upload imagini
3. Implementare search
4. Implementare comments CRUD

### Faza 3: Frontend
1. Blog listing page cu search/filter
2. Blog post detail cu comments
3. Testare API integration

### Faza 4: Admin
1. Admin layout și auth
2. Posts CRUD pages
3. Image uploader component
4. Comments approval UI

### Faza 5: Polish
1. Debounce search
2. Error handling
3. Loading states
4. Empty states

---

## 8. TESTING

- [ ] Blog listing afișează articole
- [ ] Căutare funcționează cu debounce
- [ ] Filtrare categorii funcționează
- [ ] Blog post detail afișează comentarii
- [ ] Adăugare comentariu funcționează
- [ ] Admin: creare articol cu imagine
- [ ] Admin: editare articol
- [ ] Admin: aprobare comentarii
- [ ] Publish/Unpublish funcționează
