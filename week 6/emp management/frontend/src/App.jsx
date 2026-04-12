import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './context/AuthContext';

// Pages
import HomePage from './pages/HomePage';

// Auth Components
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';

// Profile Components
import UserProfile from './components/Profile/UserProfile';
import AuthorProfile from './components/Profile/AuthorProfile';
import AdminProfile from './components/Profile/AdminProfile';

// Articles Components
import Articles from './components/Articles/Articles';
import WriteArticle from './components/Articles/WriteArticle';
import AuthorArticles from './components/Articles/AuthorArticles';
import EditArticle from './components/Articles/EditArticle';

// Lists Components
import UsersList from './components/Lists/UsersList';
import AuthorsList from './components/Lists/AuthorsList';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
        <header className="app-header">
          <h1>Blog App</h1>
          <nav className="app-nav">
            <a href="/">Home</a>
            <a href="/login">Login</a>
            <a href="/register">Register</a>
          </nav>
        </header>

        <main className="app-main">
          <Routes>
            {/* Home Route */}
            <Route path="/" element={<HomePage />} />

            {/* Auth Routes */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            {/* Profile Routes */}
            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="/author-profile" element={<AuthorProfile />} />
            <Route path="/admin-profile" element={<AdminProfile />} />

            {/* Articles Routes */}
            <Route path="/articles" element={<Articles />} />
            <Route path="/write-article" element={<WriteArticle />} />
            <Route path="/author-articles" element={<AuthorArticles />} />
            <Route path="/edit-article/:id" element={<EditArticle />} />

            {/* Lists Routes */}
            <Route path="/users-list" element={<UsersList />} />
            <Route path="/authors-list" element={<AuthorsList />} />

            {/* 404 Route */}
            <Route path="*" element={<div><h2>404 - Page Not Found</h2></div>} />
          </Routes>
        </main>

        <footer className="app-footer">
          <p>&copy; 2024 Blog App. All rights reserved.</p>
        </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}
