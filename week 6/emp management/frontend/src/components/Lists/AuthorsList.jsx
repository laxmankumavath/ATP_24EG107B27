import { useState, useEffect } from 'react';
import * as api from '../../services/apiService';

export default function AuthorsList() {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAuthors = async () => {
      setLoading(true);
      setError(null);
      const result = await api.getAuthorsList();
      
      if (result.success) {
        setAuthors(result.data.authors || []);
      } else {
        setError(result.error);
      }
      setLoading(false);
    };

    fetchAuthors();
  }, []);

  const handleRemoveAuthor = async (id) => {
    if (window.confirm('Are you sure you want to remove this author?')) {
      const result = await api.deleteAuthor(id);
      if (result.success) {
        setAuthors(authors.filter(author => author._id !== id && author.id !== id));
      } else {
        setError(result.error);
      }
    }
  };

  return (
    <div className="authors-list">
      <h2>Authors List</h2>
      {error && <div className="error-message">{error}</div>}
      {loading ? (
        <p>Loading authors...</p>
      ) : authors.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Articles</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {authors.map((author) => (
              <tr key={author._id || author.id}>
                <td>{author._id || author.id}</td>
                <td>{author.firstname} {author.lastname}</td>
                <td>{author.email}</td>
                <td>{author.articleCount || 0}</td>
                <td>
                  <button onClick={() => handleRemoveAuthor(author._id || author.id)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No authors found</p>
      )}
    </div>
  );
}
