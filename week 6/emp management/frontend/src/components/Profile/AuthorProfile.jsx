import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import * as api from '../../services/apiService';

export default function AuthorProfile() {
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!isAuthenticated) {
        setError('Please login first');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      const result = await api.getAuthorProfile();
      
      if (result.success) {
        setAuthor(result.data);
      } else {
        setError(result.error);
      }
      setLoading(false);
    };

    fetchProfile();
  }, [isAuthenticated]);

  if (loading) return <div><p>Loading profile...</p></div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="author-profile">
      <h2>Author Profile</h2>
      <button onClick={logout} className="logout-btn">Logout</button>
      
      {author && (
        <div>
          <p><strong>Name:</strong> {author.firstname} {author.lastname}</p>
          <p><strong>Email:</strong> {author.email}</p>
          <p><strong>Bio:</strong> {author.bio || 'No bio added yet'}</p>
        </div>
      )}
      
      <div className="author-articles">
        <h3>My Articles</h3>
        <Link to="/author-articles">View My Articles</Link>
        <Link to="/write-article">Write New Article</Link>
      </div>
    </div>
  );
}
