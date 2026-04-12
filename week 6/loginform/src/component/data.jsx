import { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/users/${userId}`);

        if (!response.ok) {
          throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        const userData = await response.json();
        setUser(userData);
      } catch (err) {
        setError(err.message || 'Unknown error occurred while fetching user');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    if (userId != null) {
      fetchUser();
    }
  }, [userId]); // Re-fetch when userId changes

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;
  if (!user) return <div>No user data found.</div>;

  return (
    <div>
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Username: {user.username}</p>
    </div>
  );
}
export default UserProfile