import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import * as api from '../../services/apiService';

export default function AdminProfile() {
  const [admin, setAdmin] = useState(null);
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
      const result = await api.getAdminProfile();
      
      if (result.success) {
        setAdmin(result.data);
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
    <div className="admin-profile">
      <h2>Admin Dashboard</h2>
      <button onClick={logout} className="logout-btn">Logout</button>
      
      {admin && (
        <div>
          <p><strong>Admin Name:</strong> {admin.firstname} {admin.lastname}</p>
          <p><strong>Email:</strong> {admin.email}</p>
        </div>
      )}
      
      <div className="admin-controls">
        <h3>Admin Controls</h3>
        <Link to="/users-list">Manage Users</Link>
        <Link to="/authors-list">Manage Authors</Link>
      </div>
    </div>
  );
}
