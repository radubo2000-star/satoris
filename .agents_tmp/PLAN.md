# PLAN: Refactor api.php - Modularization, Cleanup & Security

## 1. OBJECTIVE

Refactor the monolithic `backend/api.php` (~400 lines) to improve maintainability while maintaining:
- Full backward API compatibility (all existing endpoints work the same)
- PHP 8.0+ compatibility
- cPanel/PHP hosting compatibility

Goals:
1. **Modularization** - Split into organized modules/handlers by feature
2. **Code cleanup** - Remove debug comments, improve code style
3. **Security hardening** - Better input validation, remove hardcoded secrets

---

## 2. CONTEXT SUMMARY

### Current Structure
- **File:** `backend/api.php` (~400 lines, monolithic)
- **Endpoints handled:**
  - `/api/` - API info
  - `/api/auth/*` - Login, register, logout
  - `/api/blog*` - Blog posts CRUD
  - `/api/services*` - Services list
  - `/api/contact` - Contact form submissions
  - `/api/join-team` - Job applications
  - `/api/newsletter` - Newsletter subscriptions
  - `/api/testimonials` - Testimonials list
  - `/api/settings` - Site settings
  - `/api/images/*` - Image serving
- **Storage:** JSON files in `backend/` (users.json, data.json, etc.)

### Constraints
- PHP 8.0+ compatible
- Same URLs/endpoints must work
- File-based storage (keep JSON files)
- No composer dependencies (cPanel compatibility)

---

## 3. APPROACH OVERVIEW

### Architecture
Restructure into a simple router with feature modules:

```
backend/
  api.php           # Main entry point (router only)
  includes/
    helpers.php    # Shared helper functions
    auth.php       # Authentication handlers
  handlers/
    blog.php       # Blog endpoints
    services.php   # Services endpoints
    contact.php    # Contact form handler
    ...
```

### Key Changes
1. **Router in api.php** - Parse routes, include appropriate handler
2. **Feature modules** - Each endpoint in its own file
3. **Shared helpers** - JWT, user management, logging functions
4. **Input validation** - Sanitize all inputs in one place
5. **Remove hardcoded secrets** - Use environment/config

---

## 4. IMPLEMENTATION STEPS

### Step 1: Create directory structure
**Goal:** Set up modular directory structure

**Method:**
1. Create `backend/includes/` directory
2. Create `backend/handlers/` directory
3. Create `backend/config/` directory (for config)

**Reference:** `backend/`

### Step 2: Extract and organize helpers
**Goal:** Move shared functions to includes/helpers.php

**Method:**
1. Move polyfill functions (str_starts_with, str_contains)
2. Move JWT functions (generateJWT, verifyJWT, getCurrentUser)
3. Move user functions (saveUsers, findUserByEmail, findUserById)
4. Move logging functions (logActivity, logPageView)
5. Move settings function (get_settings)

**Reference:** 
- `backend/api.php` lines 8-17, 82-99, 118-145, 175-194, 196-213, 215-227

### Step 3: Create config handling
**Goal:** Move hardcoded secrets to config

**Method:**
1. Create `backend/config/settings.php` with config array
2. Move JWT secret 'satoris_secret_key_2024' to config
3. Create default admin credentials in config

**Reference:** `backend/config/` (new)

### Step 4: Create image handler
**Goal:** Extract image serving to separate handler

**Method:**
1. Create `backend/handlers/images.php`
2. Move image serving logic from api.php
3. Include from api.php after routes are parsed

**Reference:** `backend/api.php` lines 38-65

### Step 5: Create blog handler
**Goal:** Extract blog endpoints to handler file

**Method:**
1. Create `backend/handlers/blog.php`
2. Move blog endpoints (/, /:id, /:slug)
3. Include data store handling

**Reference:** `backend/api.php` blog case (around line 830+)

### Step 6: Create services handler
**Goal:** Extract services endpoints

**Method:**
1. Create `backend/handlers/services.php`
2. Move services endpoints
3. Include data handling

### Step 7: Create auth handler
**Goal:** Extract authentication endpoints

**Method:**
1. Create `backend/includes/auth.php`
2. Move login, register, logout
3. Include user management

**Reference:** auth case in api.php

### Step 8: Create remaining handlers
**Goal:** Extract all other endpoints

**Method:**
1. Create `backend/handlers/contact.php`
2. Create `backend/handlers/join-team.php`
3. Create `backend/handlers/newsletter.php`
4. Create `backend/handlers/testimonials.php`
5. Create `backend/handlers/settings.php`

### Step 9: Refactor main api.php router
**Goal:** Simplify to pure router

**Method:**
1. Remove all endpoint logic (now in handlers)
2. Keep CORS headers
3. Keep route parsing
4. Include appropriate handler based on route
5. Remove debug comments
6. Add proper input sanitization

**Reference:** `backend/api.php`

### Step 10: Test all endpoints
**Goal:** Verify backward compatibility

**Method:**
1. Test `/api/` - API info works
2. Test `/api/auth/*` - Login/register work
3. Test `/api/blog*` - Blog CRUD works
4. Test `/api/services*` - Services work
5. Test `/api/contact` - Contact form works
6. Test `/api/join-team` - Join team works
7. Test `/api/newsletter` - Newsletter works
8. Test `/api/testimonials` - Testimonials work
9. Test `/api/settings` - Settings work
10. Test `/api/images/*` - Images serve correctly

---

## 5. TESTING AND VALIDATION

### Backward Compatibility Tests
- [ ] `/api/` returns API info JSON
- [ ] `/api/auth/login` accepts credentials, returns JWT
- [ ] `/api/auth/register` creates new user
- [ ] `/api/blog` returns blog posts list
- [ ] `/api/blog/:slug` returns single post
- [ ] `/api/services` returns services list
- [ ] `/api/contact` POST saves submission
- [ ] `/api/join-team` POST saves application
- [ ] `/api/newsletter` POST accepts email
- [ ] `/api/testimonials` returns testimonials
- [ ] `/api/settings` GET returns settings
- [ ] `/api/settings` POST saves settings
- [ ] `/api/images/*` serves images with correct MIME type

### Code Quality Checks
- [ ] No debug comments in code
- [ ] All inputs sanitized
- [ ] No hardcoded secrets in handlers
- [ ] PHP 8.0 compatible (no PHP 8.1+ features)
- [ ] Works on cPanel hosting
