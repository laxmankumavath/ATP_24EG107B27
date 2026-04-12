import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import * as api from '../../services/apiService';

export default function UserProfile() {
  const [user, setUser] = useState(null);
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
      const result = await api.getUserProfile();
      
      if (result.success) {
        setUser(result.data);
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
    <div className="user-profile">
      <h2>User Profile</h2>
      <button onClick={logout} className="logout-btn">Logout</button>
      
      {user && (
        <div>
          <p><strong>Name:</strong> {user.firstname} {user.lastname}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role || 'User'}</p>
        </div>
      )}
      
      <div className="user-articles">
        <h3>Saved Articles</h3>
        <Link to="/articles">View All Articles</Link>
      </div>
    </div>
  );
}
