# PLAN: Fix Blog Comments Error & Blog Post Detail Display

## 1. OBJECTIVE

Fix two bugs on the blog post detail page (`/blog/t-rg-de-cr-ciun-dalles-2025`):

1. **Comment submission error:** When posting a comment with all fields filled (author_name, author_email, content), the API returns `{"error":"All fields are required"}`
2. **Missing blog details:** The blog post content/tags are not showing on the page, only the comment form is visible

---

## 2. CONTEXT SUMMARY

### Current stack
- **Frontend:** React + Vite (port 12000) + TypeScript + Axios
- **Backend:** PHP API (file-based JSON storage in `backend/data.json`)

### Relevant files identified
- `frontend/src/pages/BlogPostDetail/BlogPostDetail.tsx` - Blog detail page with comment form
- `frontend/src/api/client.ts` - API client with `addComment()` function  
- `backend/api.php` - PHP backend handling comments endpoint (lines 936-973)
- `backend/data.json` - Contains blog posts, comments, tags

### How comment submission works
1. Frontend `BlogPostDetail.tsx` calls `addComment({ blog_post_id: post.id, ...commentForm })`
2. Axios makes POST request to `/api/comments`
3. PHP API receives JSON body, validates fields (blog_post_id, author_name, author_email, content)
4. Returns success or "All fields are required" error

---

## 3. APPROACH OVERVIEW

Two potential root causes identified:

### Issue 1: Comment Submission
- May be caused by frontend not properly awaiting/passing data
- May be caused by PHP not parsing JSON body correctly
- Need to verify API receives all fields and returns proper response

### Issue 2: Blog Details Not Showing  
- The blog/:slug endpoint at line 874 in api.php returns post with comments and tags
- Frontend displays `post.content` via dangerouslySetInnerHTML at line 141
- May be a data loading issue or render condition problem

---

## 4. IMPLEMENTATION STEPS

### Step 1: Debug comment submission
**Goal:** Fix the "All fields are required" error when posting comments

**Method:** 
1. Review frontend `handleCommentSubmit` function in BlogPostDetail.tsx
2. Verify axios is sending JSON with correct Content-Type header
3. Add console logging to debug what data is being sent
4. Verify PHP receives all fields correctly in api.php comments POST handler
5. Fix any data parsing issues in the PHP code

**Reference:** 
- `frontend/src/pages/BlogPostDetail/BlogPostDetail.tsx` lines 32-50
- `backend/api.php` lines 936-973 (comments case)

---

### Step 2: Debug blog post detail rendering  
**Goal:** Fix blog content and tags not displaying on the page

**Method:**
1. Check if `post` data is properly loaded in the component
2. Verify API response contains `content` and `tags` fields  
3. Add error handling for missing data
4. Ensure content renders with dangerouslySetInnerHTML
5. Ensure tags render correctly (handle both string and object formats)

**Reference:**
- `frontend/src/pages/BlogPostDetail/BlogPostDetail.tsx` lines 69-99, 133-146
- `backend/api.php` lines 873-892 (blog/:slug case)

---

## 5. TESTING AND VALIDATION

### Comment submission test:
- [ ] Fill in author_name, author_email, content fields
- [ ] Submit comment form
- [ ] Verify API returns success (not error)
- [ ] Verify comment appears in backend data.json after approval

### Blog detail page test:
- [ ] Navigate to `/blog/t-rg-de-cr-ciun-dalles-2025`
- [ ] Verify blog title displays
- [ ] Verify blog content renders
- [ ] Verify tags display correctly
- [ ] Verify existing approved comments display
