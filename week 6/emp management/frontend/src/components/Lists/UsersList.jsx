import { useState, useEffect } from 'react';
import * as api from '../../services/apiService';

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      const result = await api.getUsersList();
      
      if (result.success) {
        setUsers(result.data.users || []);
      } else {
        setError(result.error);
      }
      setLoading(false);
    };

    fetchUsers();
  }, []);

  const handleRemoveUser = async (id) => {
    if (window.confirm('Are you sure you want to remove this user?')) {
      const result = await api.deleteUser(id);
      if (result.success) {
        setUsers(users.filter(user => user._id !== id && user.id !== id));
      } else {
        setError(result.error);
      }
    }
  };

  return (
    <div className="users-list">
      <h2>Users List</h2>
      {error && <div className="error-message">{error}</div>}
      {loading ? (
        <p>Loading users...</p>
      ) : users.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id || user.id}>
                <td>{user._id || user.id}</td>
                <td>{user.firstname} {user.lastname}</td>
                <td>{user.email}</td>
                <td>
                  <button onClick={() => handleRemoveUser(user._id || user.id)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users found</p>
      )}
    </div>
  );
}
