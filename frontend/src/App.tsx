import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import Services from './pages/Services/Services';
import Work from './pages/Work/Work';
import Blog from './pages/Blog/Blog';
import BlogPostDetail from './pages/BlogPostDetail/BlogPostDetail';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import AdminLayout from './components/AdminLayout/AdminLayout';
import Login from './pages/Admin/Auth/Login';
import Dashboard from './pages/Admin/Dashboard/Dashboard';
import BlogList from './pages/Admin/Blog/BlogList';
import BlogForm from './pages/Admin/Blog/BlogForm';
import ProjectsList from './pages/Admin/Projects/ProjectsList';
import ProjectsForm from './pages/Admin/Projects/ProjectsForm';
import CommentsList from './pages/Admin/Comments/CommentsList';
import UsersList from './pages/Admin/Users/UsersList';
import ProductsList from './pages/Admin/Products/ProductsList';
import ProductsForm from './pages/Admin/Products/ProductsForm';
import OrdersList from './pages/Admin/Orders/OrdersList';
import Settings from './pages/Admin/Settings/Settings';
import Analytics from './pages/Admin/Analytics/Analytics';
import { trackPageView } from './api/analytics';

function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
    // Track page view on navigation
    trackPageView(pathname);
  }, [pathname]);
  
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Admin Login - simple page without header/footer */}
        <Route path="/admin/login" element={<Login />} />
        
        {/* Public routes with Layout (Header + Footer) */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="work" element={<Work />} />
          <Route path="work/:slug" element={<Work />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:slug" element={<BlogPostDetail />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          
          {/* Admin Routes with AdminLayout */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="blog" element={<BlogList />} />
            <Route path="blog/new" element={<BlogForm />} />
            <Route path="blog/:id" element={<BlogForm />} />
            <Route path="projects" element={<ProjectsList />} />
            <Route path="projects/new" element={<ProjectsForm />} />
            <Route path="projects/:id" element={<ProjectsForm />} />
            <Route path="comments" element={<CommentsList />} />
            <Route path="users" element={<UsersList />} />
            <Route path="products" element={<ProductsList />} />
            <Route path="products/new" element={<ProductsForm />} />
            <Route path="products/:id" element={<ProductsForm />} />
            <Route path="orders" element={<OrdersList />} />
            <Route path="settings" element={<Settings />} />
            <Route path="analytics" element={<Analytics />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;